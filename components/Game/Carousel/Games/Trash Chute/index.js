import { memo, useMemo, useRef, useState } from "react";
import { createPortal } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Scene } from "three";
import { usePreviewActive } from "../shared/PreviewActivity";
import ChuteMap, { MapColliders } from "./ChuteMap";
import { createObstacles, ObstaclePhysics, ObstacleVisuals } from "./Obstacles";
import { degToRad } from "three/src/math/MathUtils.js";

function TrashChuteScene() {
    const active = usePreviewActive();
    const [physicsScene] = useState(() => new Scene());
    const physicsObjects = useRef([]);
    const obstacles = useMemo(createObstacles, []);

    return (
        <>
            {/* Face the chute's negative-Z entrance toward the camera, accounting
                for the carousel item's -90 degree turn. This orientation is fixed. */}
            <group
                position={[4.7, 1.1, 0]}
                rotation={[0, degToRad(-30), 0]}
                scale={0.09}
            >
                <group position={[0, 0, -50]}>
                    <ChuteMap />
                    <ObstacleVisuals
                        obstacles={obstacles}
                        physicsObjects={physicsObjects}
                    />
                </group>
            </group>

            {/* Simulate in the original game's coordinates, outside the animated
                carousel transforms. Only the visible models are scaled above. */}
            {createPortal(
                <Physics
                    paused={!active}
                    colliders={false}
                    gravity={[0, -9.81, 0]}
                    timeStep={1 / 60}
                    updatePriority={-10}
                >
                    <MapColliders />
                    <ObstaclePhysics
                        obstacles={obstacles}
                        physicsObjects={physicsObjects}
                    />
                </Physics>,
                physicsScene,
            )}
        </>
    );
}

export default memo(TrashChuteScene);
