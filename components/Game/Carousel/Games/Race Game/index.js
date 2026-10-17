import { lazy, memo } from "react";
import { degToRad } from "three/src/math/MathUtils.js";

const BleacherBox = lazy(
    () => import("@/components/Game/Carousel/Games/Race Game/BleacherBox"),
);
const GameGrid = lazy(
    () => import("@/components/Game/Carousel/Games/Race Game/GameGrid"),
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
