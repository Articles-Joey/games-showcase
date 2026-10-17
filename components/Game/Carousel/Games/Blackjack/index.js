import { memo } from "react";
import GameRoom from "./GameRoom";
import SeatedCharacters from "./SeatedCharacters";
import Table from "./Table";
import { PREVIEW_SCALE } from "./roomLayout";
import DeferredPreview from "../shared/DeferredPreview";

function BlackjackScene() {
    return (
        <group
            position={[4, 0.65, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={PREVIEW_SCALE}
        >
            {/* Positive Z is behind the starting player chair. Facing that side
                toward the carousel camera gives a raised view from outside the room. */}
            <DeferredPreview>
                <GameRoom reducedMotion />
            </DeferredPreview>
            <DeferredPreview>
                <Table />
            </DeferredPreview>
            <DeferredPreview>
                <SeatedCharacters />
            </DeferredPreview>
            {[-1, 1].map((side) => (
                <pointLight
                    key={side}
                    position={[side * 9, 4.5, side * 8]}
                    color={side < 0 ? "#ffd8a4" : "#ffe6be"}
                    intensity={65 * PREVIEW_SCALE ** 2}
                    distance={30 * PREVIEW_SCALE}
                    decay={2}
                />
            ))}
        </group>
    );
}

export default memo(BlackjackScene);
