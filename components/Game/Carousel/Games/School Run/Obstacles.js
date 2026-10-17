import { useLayoutEffect, useRef } from "react";
import { PreviewSuspense as Suspense } from "../shared/PreviewLoadTracker";
import { usePreviewFrame } from "../shared/PreviewActivity";
import BlobShadow from "./BlobShadow";
import Drone from "./Drone";
import FireLine from "./FireLine";
import StaticModel from "./StaticModel";
import { OBSTACLES, sectionZ } from "./previewLayout";

function Obstacle({ type, time }) {
    switch (type) {
        case "WetFloor":
            return (
                <group rotation={[0, Math.PI / 6, 0]}>
                    <BlobShadow
                        position={[0, 0.02, 0]}
                        size={1.4}
                        opacity={0.4}
                    />
                    <Suspense fallback={null}>
                        {/* Native safe-mode replacement for the body obstacle. */}
                        <StaticModel
                            model="wetFloor"
                            position={[0, 0, 0.35]}
                            scale={0.03}
                        />
                        <StaticModel
                            model="wetFloor"
                            position={[0, 0, -0.35]}
                            scale={0.03}
                        />
                    </Suspense>
                </group>
            );
        case "Drone":
            return (
                <group>
                    <BlobShadow
                        position={[0, 0.02, 0]}
                        size={1.4}
                        scale={[1, 0.7, 1]}
                        opacity={0.4}
                    />
                    <Drone time={time} />
                </group>
            );
        case "Horizontal":
            return (
                <group>
                    <BlobShadow
                        position={[0, 0.02, 0]}
                        size={1.4}
                        scale={[3.4, 0.65, 1]}
                        opacity={0.4}
                    />
                    <Suspense fallback={null}>
                        {[-2.74, 0, 2.74].map((x) => (
                            <StaticModel
                                key={x}
                                model="support"
                                position={[x, 1.3, 0]}
                                rotation={[0, Math.PI / 2, 0]}
                                scale={0.5}
                            />
                        ))}
                    </Suspense>
                </group>
            );
        case "FireLine":
            return (
                <group>
                    <BlobShadow
                        position={[0, 0.02, 0]}
                        size={1.4}
                        scale={[3 / 1.4, 0.45, 1]}
                        opacity={0.4}
                    />
                    <FireLine time={time} />
                </group>
            );
        default:
            return null;
    }
}

export default function Obstacles({ time }) {
    const slots = useRef([]);
    function move() {
        OBSTACLES.forEach((obstacle, index) => {
            const slot = slots.current[index];
            if (!slot) return;
            slot.position.set(
                obstacle.x +
                    (obstacle.type === "Drone"
                        ? Math.sin(time.current * 2) * 2.5
                        : 0),
                0,
                sectionZ(obstacle.z, time.current),
            );
        });
    }
    useLayoutEffect(move, [time]);
    usePreviewFrame(move);

    return OBSTACLES.map((obstacle, index) => (
        <group
            key={obstacle.type}
            ref={(slot) => {
                slots.current[index] = slot;
            }}
            position={[obstacle.x, 0, obstacle.z]}
        >
            <Obstacle
                type={obstacle.type}
                time={time}
            />
        </group>
    ));
}
