import { memo, useRef } from "react";
import DeferredPreview from "../shared/DeferredPreview";
import { usePreviewFrame } from "../shared/PreviewActivity";
import Hall from "./Hall";
import Obstacles from "./Obstacles";
import Runner from "./Runner";

function SchoolRunScene() {
    const time = useRef(0);
    // A single paused clock keeps late-loading hall pieces and props in sync.
    usePreviewFrame((_, delta) => {
        time.current += delta;
    }, -0.5);

    return (
        <group
            position={[11.5, 1.15, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.38}
        >
            <DeferredPreview>
                <Hall time={time} />
            </DeferredPreview>
            <DeferredPreview>
                <Runner time={time} />
            </DeferredPreview>
            <DeferredPreview>
                <Obstacles time={time} />
            </DeferredPreview>
        </group>
    );
}

export default memo(SchoolRunScene);
