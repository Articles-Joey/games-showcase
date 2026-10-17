import { memo } from "react";
import PreviewWater from "../shared/PreviewWater";
import WanderingCharacter from "../shared/WanderingCharacter";
import Terrain from "./Terrain";
import FenceSquare from "./FenceSquare";
import FallingProps from "./FallingProps";
import { DEFAULT_TERRAIN } from "./terrainGeometry";

function CatchingGameScene() {
    return (
        <group
            position={[4.5, 1.3, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.12}
        >
            <PreviewWater
                size={62}
                position={[0, DEFAULT_TERRAIN.waterHeight, 0]}
            />
            <Terrain />
            <FenceSquare
                size={60}
                getTerrainHeight={DEFAULT_TERRAIN.getHeight}
            />
            <WanderingCharacter
                url="/models/shared/Spacesuit-transformed.glb"
                action="Run"
                bounds={13}
                speed={6}
                getHeight={DEFAULT_TERRAIN.getHeight}
            />
            <FallingProps />
        </group>
    );
}

export default memo(CatchingGameScene);
