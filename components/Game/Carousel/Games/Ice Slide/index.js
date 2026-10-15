import { memo, Suspense, useRef } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";
import PreviewWater from "../shared/PreviewWater";
import Board from "./Board";
import SlidingPlayer from "./SlidingPlayer";
import { ModelBoat } from "./Models";

function FloatingBoat() {
    const boat = useRef();
    usePreviewFrame((_, delta, elapsed) => {
        if (!boat.current) return;
        boat.current.position.y = 2 + Math.sin(elapsed * 0.7) * 0.5;
        boat.current.rotation.z = Math.sin(elapsed * 0.55) * 0.025;
    });
    return (
        <group
            ref={boat}
            position={[-70, 2, -20]}
            rotation={[0, Math.PI / 4, 0]}
        >
            <ModelBoat />
        </group>
    );
}

function IceSlideScene() {
    return (
        <group
            position={[4.5, 1.15, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.055}
        >
            <Board />
            <Suspense fallback={null}>
                <SlidingPlayer />
            </Suspense>
            <Suspense fallback={null}>
                <FloatingBoat />
            </Suspense>
            <Suspense fallback={null}>
                <PreviewWater
                    radius={95}
                    position={[0, -0.65, 0]}
                    speed={0.4}
                    waterColor={0x00aaff}
                />
            </Suspense>
        </group>
    );
}

export default memo(IceSlideScene);
