import { Suspense, useRef } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";
import RopeMesh from "./RopeMesh";
import SwingingPlayer from "./SwingingPlayer";

const ANCHOR_Y = 16;
const ROPE_LENGTH = 12;
const PLAYER_ROPE_DISTANCE = ROPE_LENGTH / 2;
const SWING_AMPLITUDE = Math.PI / 6;

export default function RopeSwing() {
    const rope = useRef();
    const player = useRef();

    usePreviewFrame((_, delta, elapsed) => {
        const phase = elapsed * 1.7;
        const angle = Math.sin(phase) * SWING_AMPLITUDE;
        if (rope.current) rope.current.rotation.z = angle;
        if (player.current) {
            // Keep the hands attached halfway down the full swinging rope.
            player.current.position.set(
                PLAYER_ROPE_DISTANCE * Math.sin(angle),
                ANCHOR_Y - PLAYER_ROPE_DISTANCE * Math.cos(angle),
                0,
            );
            player.current.rotation.z = -angle * 0.12;
            const facing = Math.cos(phase) >= 0 ? Math.PI / 2 : -Math.PI / 2;
            const turn = facing - player.current.rotation.y;
            player.current.rotation.y +=
                Math.atan2(Math.sin(turn), Math.cos(turn)) *
                (1 - Math.exp(-7 * delta));
        }
    });

    return (
        <group>
            <mesh position={[0, ANCHOR_Y, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="saddlebrown" />
            </mesh>
            <group
                ref={rope}
                position={[0, ANCHOR_Y, 0]}
            >
                <Suspense fallback={null}>
                    <RopeMesh
                        length={ROPE_LENGTH}
                        radius={0.2}
                    />
                </Suspense>
            </group>
            <group
                ref={player}
                position={[0, ANCHOR_Y - PLAYER_ROPE_DISTANCE, 0]}
                rotation={[0, Math.PI / 2, 0]}
            >
                <Suspense fallback={null}>
                    <SwingingPlayer />
                </Suspense>
            </group>
        </group>
    );
}
