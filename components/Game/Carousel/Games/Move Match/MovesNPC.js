import { memo, useRef } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";
import PreviewBillboard from "../shared/PreviewBillboard";
import FlatArrow from "./FlatArrow";
import ModelMan from "./ModelMan";
import {
    ARROW_ANGLES,
    createRandom,
    MOVE_INTERVAL,
    pickNextMove,
} from "./moves";

function MovesNPC() {
    const move = useRef({ direction: "Up", index: 1 });
    const runtime = useRef({ tick: 0, random: createRandom(371) });
    const arrow = useRef();
    const pulse = useRef();

    usePreviewFrame((_, delta, elapsed) => {
        const tick = Math.floor(elapsed / MOVE_INTERVAL);
        if (tick !== runtime.current.tick) {
            runtime.current.tick = tick;
            move.current.direction = pickNextMove(
                move.current.direction,
                runtime.current.random,
            );
            move.current.index += 1;
            if (arrow.current)
                arrow.current.rotation.z = ARROW_ANGLES[move.current.direction];
        }
        const pulseTime = Math.max(
            0,
            Math.PI - (elapsed - tick * MOVE_INTERVAL) * 12,
        );
        pulse.current?.scale.setScalar(1 + Math.sin(pulseTime) * 0.5);
    }, -0.5);

    return (
        <group
            position={[-20, 0.25, 5]}
            rotation={[0, Math.PI / 4, 0]}
            scale={3}
        >
            <ModelMan
                position={[2, 0, -1]}
                moveRef={move}
                seed={7}
            />
            <PreviewBillboard position={[2, 6, -1]}>
                <group ref={pulse}>
                    <group ref={arrow}>
                        <FlatArrow rotation={[Math.PI / 2, Math.PI, 0]} />
                    </group>
                </group>
            </PreviewBillboard>
        </group>
    );
}

export default memo(MovesNPC);
