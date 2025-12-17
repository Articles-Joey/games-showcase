import { useFrame } from "@react-three/fiber";
import { useStore } from "../hooks/useStore";
import { memo, useRef } from "react";

import { useHotkeys } from "react-hotkeys-hook";
import useGames from "../hooks/useGames";

const ControllerManager = () => {

    const { games, publicGames } = useGames();
    let activeGames = publicGames;

    const activeGameIndex = useStore((state) => state.activeGameIndex);
    const setActiveGameIndex = useStore((state) => state.setActiveGameIndex);

    const lastMoveTime = useRef(0);
    const audioRef = useRef(typeof Audio !== "undefined" ? new Audio("/audio/noisy-switch.mp3") : null);
    // const audioRef = useRef(typeof Audio !== "undefined" ? new Audio("/audio/noisy-switch.mp3") : null);

    useHotkeys(['a', 'ArrowLeft'], () => {

        if (activeGameIndex > 0) {
            setActiveGameIndex(activeGameIndex - 1)
            // if (audioRef.current) {
            //     audioRef.current.cloneNode(true).play().catch(() => { });
            // }
        }

    }, {}, [activeGameIndex]);
    useHotkeys(['d', 'ArrowRight'], () => {

        if (activeGameIndex < activeGames.length - 1) {
            setActiveGameIndex(activeGameIndex + 1)
            // if (audioRef.current) {
            //     audioRef.current.cloneNode(true).play().catch(() => { });
            // }
        }
        
    }, {}, [activeGameIndex, activeGames]);

    useFrame((state) => {
        const gamepads = navigator.getGamepads();
        if (!gamepads) return;

        const gp = gamepads[0];
        if (!gp) return;

        // Standard mapping: 14=Left, 15=Right
        const leftPressed = gp.buttons[14]?.pressed;
        const rightPressed = gp.buttons[15]?.pressed;

        // Axes 0 is Left Stick X
        const axisX = gp.axes[0];
        const stickLeft = axisX < -0.5;
        const stickRight = axisX > 0.5;

        const isLeft = leftPressed || stickLeft;
        const isRight = rightPressed || stickRight;

        const now = state.clock.elapsedTime;

        // Throttle to avoid super fast scrolling (0.2s delay)
        if (now - lastMoveTime.current < 0.2) return;

        if (isLeft) {
            const currentIndex = useStore.getState().activeGameIndex;
            if (currentIndex > 0) {
                setActiveGameIndex(currentIndex - 1);
                lastMoveTime.current = now;
                if (audioRef.current) {
                    audioRef.current.cloneNode(true).play().catch(() => { });
                }
            }

        } else if (isRight) {
            const currentIndex = useStore.getState().activeGameIndex;
            if (currentIndex < activeGames.length - 1) {
                setActiveGameIndex(currentIndex + 1);
                lastMoveTime.current = now;
                if (audioRef.current) {
                    audioRef.current.cloneNode(true).play().catch(() => { });
                }
            }

        }
    });

    return null;
}

export default memo(ControllerManager);