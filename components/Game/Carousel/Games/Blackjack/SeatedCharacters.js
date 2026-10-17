import { useLayoutEffect, useMemo, useRef } from "react";
import { Text, useGLTF } from "@react-three/drei";
import PreviewBillboard from "../shared/PreviewBillboard";
import { AnimationMixer, Box3, Vector3 } from "three";
import { SkeletonUtils } from "three-stdlib";
import {
    DEALER_SEAT,
    PLAYER_SEAT,
    PLAYER_HEIGHT,
    PLAYER_SCALE,
} from "./roomLayout";

const MODEL_URL = "/models/shared/UAL1_Standard.glb";

function SeatedCharacter({ seat, nickname }) {
    const { scene, animations } = useGLTF(MODEL_URL);
    const visual = useRef();
    const model = useMemo(() => {
        const clone = SkeletonUtils.clone(scene);
        let hips;
        clone.traverse((object) => {
            if (object.isBone && /hips|pelvis/i.test(object.name))
                hips = object;
        });
        clone.updateMatrixWorld(true);
        const bounds = new Box3().setFromObject(clone);
        const scale =
            PLAYER_HEIGHT / Math.max(bounds.max.y - bounds.min.y, 0.01);
        return { clone, hips, scale };
    }, [scene]);

    useLayoutEffect(() => {
        const mixer = new AnimationMixer(model.clone);
        // The same seated clip used by both the game's dealer and player.
        const clip =
            animations.find(({ name }) => name === "Sitting_Idle_Loop") ||
            animations[30];
        if (clip) {
            mixer.clipAction(clip).play();
            mixer.update(1 / 30);
        }
        model.clone.updateWorldMatrix(true, true);
        if (model.hips) {
            const hips = model.hips.getWorldPosition(new Vector3());
            model.clone.worldToLocal(hips);
            visual.current.position.set(
                -hips.x * model.scale,
                seat.height + 0.12 - hips.y * model.scale,
                -hips.z * model.scale,
            );
        } else {
            visual.current.position.y = seat.height - PLAYER_HEIGHT * 0.48;
        }
        // Leave the evaluated sitting pose in place; no per-frame controller/mixer.
        return () => {
            mixer.stopAllAction();
            mixer.uncacheRoot(model.clone);
        };
    }, [model, animations, seat]);

    return (
        <group
            position={seat.position}
            rotation={[0, seat.rotation, 0]}
            dispose={null}
        >
            <group ref={visual}>
                <primitive
                    object={model.clone}
                    scale={model.scale}
                />
            </group>
            {nickname && (
                <PreviewBillboard
                    position={[0, seat.height + 2.1 * PLAYER_SCALE, 0]}
                >
                    <Text
                        fontSize={0.38}
                        maxWidth={3.5}
                        color="white"
                        outlineColor="#111"
                        outlineWidth={0.025}
                        anchorX="center"
                    >
                        {nickname}
                    </Text>
                </PreviewBillboard>
            )}
        </group>
    );
}

export default function SeatedCharacters() {
    return (
        <>
            <SeatedCharacter
                seat={DEALER_SEAT}
                nickname="Dealer"
            />
            <SeatedCharacter seat={PLAYER_SEAT} />
            <group
                position={DEALER_SEAT.position}
                rotation={[0, DEALER_SEAT.chairRotation, 0]}
            >
                <Text
                    position={[0, 2.59, 0.71]}
                    fontSize={0.19}
                    maxWidth={1.08}
                    textAlign="center"
                    color="#fff2ca"
                    outlineColor="#231910"
                    outlineWidth={0.015}
                >
                    Dealer
                </Text>
            </group>
        </>
    );
}

useGLTF.preload(MODEL_URL);
