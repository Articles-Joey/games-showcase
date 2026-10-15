import { useRef } from "react";
import { Vector3 } from "three";
import { usePreviewFrame } from "../shared/PreviewActivity";
import { ModelWheel } from "./Models";

const START = [-22, 1.5, 21];
const INITIAL_TARGET = [24, 1.5, -18];
const INITIAL_ANGLE = Math.atan2(
    INITIAL_TARGET[0] - START[0],
    INITIAL_TARGET[2] - START[2],
);

export default function SlidingPlayer() {
    const player = useRef();
    const wheel = useRef();
    const shaft = useRef();
    const arrowhead = useRef();
    const motionRef = useRef({
        from: new Vector3(...START),
        target: new Vector3(...INITIAL_TARGET),
        phase: "aim",
        elapsed: 0,
        aimDuration: 1.8,
        slideDuration: 3.4,
        angle: INITIAL_ANGLE,
        power: 14,
    });

    usePreviewFrame((_, delta) => {
        const motion = motionRef.current;
        const group = player.current;
        if (!group) return;
        motion.elapsed += delta;
        let power;

        if (motion.phase === "aim") {
            const progress = Math.min(motion.elapsed / motion.aimDuration, 1);
            const difference = motion.angle - group.rotation.y;
            group.rotation.y +=
                Math.atan2(Math.sin(difference), Math.cos(difference)) *
                (1 - Math.exp(-7 * delta));
            power = 6 + motion.power * progress;
            if (progress >= 1) {
                group.rotation.y = motion.angle;
                motion.phase = "slide";
                motion.elapsed = 0;
            }
        } else {
            const progress = Math.min(motion.elapsed / motion.slideDuration, 1);
            // Ease out like a tire slowing on the ice, without a physics world.
            group.position.lerpVectors(
                motion.from,
                motion.target,
                1 - (1 - progress) ** 3,
            );
            if (wheel.current)
                wheel.current.rotation.y += delta * (1 - progress) * 1.2;
            power = (6 + motion.power) * (1 - progress * 0.7);
            if (progress >= 1) {
                motion.from.copy(motion.target);
                for (let attempt = 0; attempt < 8; attempt++) {
                    motion.target.set(
                        (Math.random() * 2 - 1) * 34,
                        1.5,
                        (Math.random() * 2 - 1) * 34,
                    );
                    if (motion.from.distanceTo(motion.target) > 18) break;
                }
                motion.angle = Math.atan2(
                    motion.target.x - motion.from.x,
                    motion.target.z - motion.from.z,
                );
                motion.power = Math.min(
                    18,
                    5 + motion.from.distanceTo(motion.target) * 0.2,
                );
                motion.aimDuration = 1.3 + Math.random() * 1.1;
                motion.slideDuration = 2.5 + Math.random() * 1.6;
                motion.phase = "aim";
                motion.elapsed = 0;
            }
        }

        if (shaft.current) {
            shaft.current.scale.y = power;
            shaft.current.position.z = 3.5 + power / 2;
        }
        if (arrowhead.current) arrowhead.current.position.z = 3.5 + power + 2.2;
    });

    return (
        <group
            ref={player}
            position={START}
            rotation={[0, INITIAL_ANGLE, 0]}
        >
            <group ref={wheel}>
                <ModelWheel
                    scale={10}
                    position={[0, -1.1, 0]}
                />
            </group>
            {/* Same heading convention as hitRotation: sin(angle) along X,
                cos(angle) along Z. Both the arrow and slide share that heading. */}
            <mesh
                ref={shaft}
                position={[0, 0, 6.5]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[1, 6, 1]}
            >
                <cylinderGeometry args={[0.45, 0.45, 1, 12]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh
                ref={arrowhead}
                position={[0, 0, 11.7]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <coneGeometry args={[2.7, 5, 12]} />
                <meshStandardMaterial color="black" />
            </mesh>
        </group>
    );
}
