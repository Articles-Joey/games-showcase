import { memo } from "react";
import { PreviewSuspense as Suspense } from "../shared/PreviewLoadTracker";
import Ground from "../Memory Game/Ground";
import DeferredPreview from "../shared/DeferredPreview";
import GrassArea from "./GrassArea";
import Pergolas from "./Pergolas";
import Scenery from "./Scenery";
import TheftLoop from "./TheftLoop";
import { GROUND_RADIUS } from "./layout";

function StopTheThievesScene() {
    return (
        <group
            position={[4.5, 1.15, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.14}
        >
            <Suspense fallback={null}>
                <Ground
                    shape="circle"
                    radius={GROUND_RADIUS}
                    height={0}
                />
            </Suspense>
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0.015, 0]}
            >
                <ringGeometry args={[15, 15.5, 64]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <GrassArea />
            <DeferredPreview>
                <Pergolas />
            </DeferredPreview>
            <DeferredPreview>
                <Scenery />
            </DeferredPreview>
            <DeferredPreview>
                <TheftLoop />
            </DeferredPreview>
        </group>
    );
}

export default memo(StopTheThievesScene);
