import dynamic from "next/dynamic";
import { memo } from "react";
import { degToRad } from "three/src/math/MathUtils.js";

const BleacherBox = dynamic(
    () => import("@/components/Game/Carousel/Games/Race Game/BleacherBox"),
    {
        ssr: false,
    },
);
const GameGrid = dynamic(
    () => import("@/components/Game/Carousel/Games/Race Game/GameGrid"),
    {
        ssr: false,
    },
);

function RaceGameScene() {
    return (
        <group
        // position={[4, 0.5, 0]}
        // rotation={[0, Math.PI / 2, 0]}
        >
            <BleacherBox
                scale={6}
                position={[1, -2.5, -0.75]}
            />
            <group
                position={[7, 0.5, 8]}
                rotation={[0, degToRad(90), 0]}
                scale={0.5}
            >
                <GameGrid />
            </group>
        </group>
    );
}

export default memo(RaceGameScene);
