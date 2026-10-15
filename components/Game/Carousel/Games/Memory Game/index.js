import { memo } from "react";
import Cards from "./Cards";
import Ground from "./Ground";
import GrassArea from "./GrassArea";
import FenceSquare from "./FenceSquare";

function MemoryGameScene() {
    return (
        <group
            position={[5, 1, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.13}
        >
            <Ground />
            <GrassArea count={1800} />
            <FenceSquare size={60} />
            <Cards />
        </group>
    );
}

export default memo(MemoryGameScene);
