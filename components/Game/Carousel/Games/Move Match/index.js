import { memo, Suspense } from "react";
import Ground from "../Memory Game/Ground";
import GrassArea from "../Memory Game/GrassArea";
import WoodenPicketFence from "../Memory Game/WoodenPicketFence";
import DeferredPreview from "../shared/DeferredPreview";
import LandingAnimation from "./LandingAnimation";

const FENCE_RADIUS = 30;
const GROUND_RADIUS = 35;

function MoveMatchScene() {
    return (
        <group
            position={[5, 1, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.13}
        >
            <Suspense fallback={null}>
                <Ground
                    shape="circle"
                    radius={GROUND_RADIUS}
                />
                <GrassArea
                    shape="circle"
                    inner={FENCE_RADIUS}
                    outer={GROUND_RADIUS}
                    count={1800}
                />
                <WoodenPicketFence
                    shape="circle"
                    radius={FENCE_RADIUS}
                />
            </Suspense>
            <DeferredPreview>
                <LandingAnimation landingAnimationMode />
            </DeferredPreview>
        </group>
    );
}

export default memo(MoveMatchScene);
