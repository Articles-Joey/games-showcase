import { memo, useRef } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";
import { ToonCannonBase, ToonCannonBarrel } from "./ToonCannon";
import { WaterTower } from "./WaterTower";
import GrassPatch from "./GrassPatch";

function AimingCannon() {
    const base = useRef();
    const barrel = useRef();

    usePreviewFrame((_, delta, time) => {
        if (!base.current || !barrel.current) return;
        const yaw = 2.2 + Math.sin(time * 0.45) * 0.5;
        const pitch = -0.65 + Math.sin(time * 0.72 + 0.7) * 0.22;
        base.current.rotation.y = yaw;
        barrel.current.rotation.set(pitch, yaw, 0, "YXZ");
    });

    return (
        <group
            position={[-1.7, 0.02, 1.2]}
            scale={0.9}
        >
            <ToonCannonBase
                ref={base}
                rotation={[0, 2.2, 0]}
            />
            <ToonCannonBarrel
                ref={barrel}
                rotation={[-0.65, 2.2, 0]}
            />
        </group>
    );
}

function CannonScene() {
    return (
        <group
            position={[4, 0.5, 0]}
            rotation={[0, Math.PI / 2, 0]}
        >
            <GrassPatch />
            <AimingCannon />
            <WaterTower
                position={[1.3, 0.02, -1.2]}
                scale={0.25}
            />
        </group>
    );
}

export default memo(CannonScene);
