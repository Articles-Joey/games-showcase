import { useGLTF } from "@react-three/drei";
import {
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
} from "react";
import { AnimationMixer, Vector3 } from "three";
import { SkeletonUtils } from "three-stdlib";
import { usePreviewFrame } from "../shared/PreviewActivity";
import {
    BARREL_POSITIONS,
    BARREL_URL,
    ENEMY_EXIT_RADIUS,
    ENEMY_SPAWN_RADIUS,
    ENEMY_SPEED,
    FENCE_RADIUS,
} from "./layout";

const ENEMY_URL = "/models/shared/Spacesuit-transformed.glb";
const PICKUP_DURATION = 0.65;
const SPAWN_DELAY = 0.7;
const BARREL_SCALE = 1.5;
const ENEMY_SCALE = 1.5;

function createTrip(serial) {
    // Vary the entrance around the ring without creating/remounting any objects.
    const angle = Math.PI * 0.22 + serial * 2.399963229728653;
    const x = Math.cos(angle) * ENEMY_SPAWN_RADIUS;
    const z = Math.sin(angle) * ENEMY_SPAWN_RADIUS;
    let barrelIndex = 0;
    let distance = Infinity;
    BARREL_POSITIONS.forEach(([barrelX, , barrelZ], index) => {
        const candidate = (barrelX - x) ** 2 + (barrelZ - z) ** 2;
        if (candidate < distance) {
            distance = candidate;
            barrelIndex = index;
        }
    });
    const [barrelX, , barrelZ] = BARREL_POSITIONS[barrelIndex];
    const length = Math.max(Math.hypot(x - barrelX, z - barrelZ), 0.01);
    return {
        serial,
        barrelIndex,
        phase: "approach",
        remaining: 0,
        x,
        z,
        // Stop just short of the barrel, then lift it into the character's hands.
        targetX: barrelX + (x - barrelX) / length,
        targetZ: barrelZ + (z - barrelZ) / length,
        exitX: Math.cos(angle) * ENEMY_EXIT_RADIUS,
        exitZ: Math.sin(angle) * ENEMY_EXIT_RADIUS,
        pickupOrigin: new Vector3(...BARREL_POSITIONS[barrelIndex]),
    };
}

function TheftLoop() {
    const { scene, animations } = useGLTF(ENEMY_URL);
    const barrel = useGLTF(BARREL_URL);
    const enemy = useRef();
    const barrels = useRef([]);
    const trip = useRef();
    const currentAction = useRef();
    const animation = useRef(null);
    const carryPosition = useMemo(() => new Vector3(), []);
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const clips = useMemo(
        () =>
            animations.filter(({ name }) => name === "Walk" || name === "Idle"),
        [animations],
    );
    const barrelGeometry = useMemo(() => {
        // Keep the game's sideways barrel orientation, centered on its floor position.
        const geometry = barrel.nodes.barrel_1.geometry
            .clone()
            .rotateZ(Math.PI / 2);
        geometry.computeBoundingBox();
        const center = geometry.boundingBox.getCenter(new Vector3());
        geometry.translate(-center.x, -geometry.boundingBox.min.y, -center.z);
        return geometry;
    }, [barrel.nodes]);

    const selectAction = useCallback((name, fade = true) => {
        const next = animation.current?.actions[name];
        if (!next || currentAction.current === next) return;
        currentAction.current?.fadeOut(0.15);
        next.reset()
            .stopFading()
            .setEffectiveWeight(1)
            .setEffectiveTimeScale(name === "Walk" ? 1.4 : 1)
            .play();
        if (fade) next.fadeIn(0.15);
        currentAction.current = next;
    }, []);

    const spawn = useCallback(
        (serial) => {
            const next = createTrip(serial);
            trip.current = next;
            enemy.current.visible = true;
            enemy.current.position.set(next.x, 0.02, next.z);
            enemy.current.rotation.y = Math.atan2(
                next.targetX - next.x,
                next.targetZ - next.z,
            );
            selectAction("Walk", false);
        },
        [selectAction],
    );

    useLayoutEffect(() => {
        // React can clean up and replay this effect while retaining the clone.
        // Fresh actions must belong to a fresh mixer after the old root is uncached.
        const mixer = new AnimationMixer(clone);
        const actions = {};
        clips.forEach((clip) => {
            actions[clip.name] = mixer.clipAction(clip);
        });
        animation.current = { mixer, actions };
        currentAction.current = undefined;
        BARREL_POSITIONS.forEach((position, index) => {
            barrels.current[index].position.set(...position);
            barrels.current[index].rotation.y = 0;
        });
        spawn(0);
        mixer.update(1 / 30);
        return () => {
            animation.current = null;
            trip.current = undefined;
            currentAction.current = undefined;
            mixer.stopAllAction();
            mixer.uncacheRoot(clone);
        };
    }, [clone, clips, spawn]);
    useEffect(() => () => barrelGeometry.dispose(), [barrelGeometry]);

    usePreviewFrame((_, delta, elapsed) => {
        const state = trip.current;
        const rig = animation.current;
        if (!state || !rig || !enemy.current) return;
        const object = enemy.current;
        const stolenBarrel = barrels.current[state.barrelIndex];

        if (state.phase === "hidden") {
            state.remaining -= delta;
            if (state.remaining <= 0) {
                spawn(state.serial + 1);
                rig.mixer.update(delta);
            }
            return;
        }

        if (state.phase === "approach" || state.phase === "escape") {
            const escaping = state.phase === "escape";
            const targetX = escaping ? state.exitX : state.targetX;
            const targetZ = escaping ? state.exitZ : state.targetZ;
            const dx = targetX - object.position.x;
            const dz = targetZ - object.position.z;
            const distance = Math.hypot(dx, dz);
            const step = ENEMY_SPEED * delta;
            if (distance > 0.00001) {
                const fraction = Math.min(1, step / distance);
                object.position.x += dx * fraction;
                object.position.z += dz * fraction;
                const turn = Math.atan2(dx, dz) - object.rotation.y;
                object.rotation.y +=
                    Math.atan2(Math.sin(turn), Math.cos(turn)) *
                    (1 - Math.exp(-12 * delta));
            }
            if (
                escaping &&
                Math.hypot(object.position.x, object.position.z) >=
                    FENCE_RADIUS + 1
            ) {
                // Restore the exact barrel that was taken before the next thief appears.
                stolenBarrel.position.set(
                    ...BARREL_POSITIONS[state.barrelIndex],
                );
                stolenBarrel.rotation.y = 0;
                object.visible = false;
                state.phase = "hidden";
                state.remaining = SPAWN_DELAY;
                selectAction("Idle");
                return;
            }
            if (!escaping && distance <= step) {
                state.phase = "pickup";
                state.remaining = PICKUP_DURATION;
                state.pickupOrigin.copy(stolenBarrel.position);
                selectAction("Idle");
            }
        }

        if (state.phase === "pickup" || state.phase === "escape") {
            const yaw = object.rotation.y;
            carryPosition.set(
                object.position.x + Math.sin(yaw) * 0.8,
                1.1 +
                    (state.phase === "escape"
                        ? Math.sin(elapsed * 9) * 0.06
                        : 0),
                object.position.z + Math.cos(yaw) * 0.8,
            );
            if (state.phase === "pickup") {
                state.remaining = Math.max(0, state.remaining - delta);
                const t = 1 - state.remaining / PICKUP_DURATION;
                stolenBarrel.position.lerpVectors(
                    state.pickupOrigin,
                    carryPosition,
                    t * t * (3 - 2 * t),
                );
                if (state.remaining <= 0) {
                    state.phase = "escape";
                    selectAction("Walk");
                }
            } else stolenBarrel.position.copy(carryPosition);
            stolenBarrel.rotation.y = yaw;
        }
        // This callback unsubscribes when inactive; hidden thieves need no mixing.
        rig.mixer.update(delta);
    });

    return (
        <group dispose={null}>
            {BARREL_POSITIONS.map((position, index) => (
                <mesh
                    key={index}
                    ref={(mesh) => {
                        barrels.current[index] = mesh;
                    }}
                    position={position}
                    scale={BARREL_SCALE}
                    geometry={barrelGeometry}
                    material={barrel.materials.colormap}
                    dispose={null}
                />
            ))}
            <group ref={enemy}>
                <primitive
                    object={clone}
                    scale={ENEMY_SCALE}
                />
            </group>
        </group>
    );
}

export default memo(TheftLoop);
