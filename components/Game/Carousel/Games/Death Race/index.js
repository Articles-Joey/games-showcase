import ModelBarn from "@/components/Models/Shared/Barn";
import { memo } from "react";
import { PreviewSuspense as Suspense } from "../shared/PreviewLoadTracker";
import Sand from "./Sand";
import FinishLine from "./FinishLine";
import Scenery from "./Scenery";
import RacePlayers from "./RacePlayers";

function DeathRaceScene() {
    return (
        <group
            scale={0.075}
            position={[4.5, 1.15, 0]}
            rotation={[0, Math.PI / 2, 0]}
        >
            {/* This cancels the card's rotation: +Z runs from the barn toward
                the carousel camera, rather than showing the course sideways. */}
            <Sand />
            <Suspense fallback={null}>
                <ModelBarn
                    scale={0.1}
                    position={[0, 0, -43]}
                    rotation={[0, Math.PI, 0]}
                />
            </Suspense>
            <FinishLine />
            <Suspense fallback={null}>
                <Scenery />
            </Suspense>
            <RacePlayers />
        </group>
    );
}

export default memo(DeathRaceScene);
