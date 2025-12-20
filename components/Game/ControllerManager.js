import { useFrame } from "@react-three/fiber";
import { useStore } from "../hooks/useStore";
import { memo, useRef } from "react";

import { useHotkeys } from "react-hotkeys-hook";
import useGames from "../hooks/useGames";
import useGameControllerKeyboardStore from "../hooks/useGameControllerKeyboardStore";
import useAllGames from "../hooks/useAllGames";

const ControllerManager = () => {

    // const { games, publicGames } = useGames();
    const { games: allGames } = useAllGames();

    let activeGames = allGames;

    const visible = useGameControllerKeyboardStore((state) => state.visible);

    const audioSettings = useStore((state) => state?.audioSettings);

    const activeGameIndex = useStore((state) => state.activeGameIndex);
    const setActiveGameIndex = useStore((state) => state.setActiveGameIndex);

    const showSettingsModal = useStore((state) => state.showSettingsModal)
    const toggleSettingsModal = useStore((state) => state.toggleSettingsModal)

    const lastMoveTime = useRef(0);
    const lastHotkeyTime = useRef(0);
    const lastInputTime = useRef(0); // Added for Start button debounce
    const prevButton0 = useRef(false); // Track previous state of Button A
    const audioRef = useRef(typeof Audio !== "undefined" ? new Audio("/audio/noisy-switch.mp3") : null);
    // const audioRef = useRef(typeof Audio !== "undefined" ? new Audio("/audio/noisy-switch.mp3") : null);

    const playSound = () => {
        if (audioRef.current) {
            const sound = audioRef.current.cloneNode(true);
            sound.volume = audioSettings?.enabled ? (audioSettings?.game_volume / 100) : 0;
            sound.play().catch(() => { });
        }
    };

    const delayBetweenMoves = 100; // milliseconds

    useHotkeys(['a', 'ArrowLeft'], () => {
        if (visible || showSettingsModal) return; // Block input if modal is open

        const now = Date.now();
        if (now - lastHotkeyTime.current < delayBetweenMoves) return;

        if (activeGameIndex > 0) {
            setActiveGameIndex(activeGameIndex - 1);
            lastHotkeyTime.current = now;
            playSound();
        }

    }, {}, [activeGameIndex, audioSettings, visible, showSettingsModal]);
    useHotkeys(['d', 'ArrowRight'], () => {
        if (visible || showSettingsModal) return; // Block input if modal is open

        const now = Date.now();
        if (now - lastHotkeyTime.current < delayBetweenMoves) return;

        if (activeGameIndex < activeGames?.length - 1) {
            setActiveGameIndex(activeGameIndex + 1);
            lastHotkeyTime.current = now;
            playSound();
        }

    }, {}, [activeGameIndex, activeGames, audioSettings, visible, showSettingsModal]);

    useFrame((state) => {
        const gamepads = navigator.getGamepads();
        if (!gamepads) return;

        const gp = gamepads[0];
        if (!gp) return;

        const now = state.clock.elapsedTime;

        // Toggle Settings with Start (Button 9)
        if (gp.buttons[9].pressed) {
            // Use performance.now() for consistent timing with other inputs if needed, 
            // but state.clock.elapsedTime is in seconds, so we compare with seconds.
            // Let's stick to one time source if possible, but here we mix.
            // Using Date.now() for consistency with hotkeys is safer for "real time" debouncing.
            const realNow = Date.now();
            if (realNow - lastInputTime.current > 300) {
                toggleSettingsModal();
                playSound();
                lastInputTime.current = realNow;
            }
            return;
        }

        if (visible || showSettingsModal) return; // Block controller input if modal is open

        // Example: Detect 'A' Button (Index 0) Press
        const button0 = gp.buttons[0]?.pressed;
        if (button0 && !prevButton0.current) {
            console.log("A Button Pressed!");
            playSound();
            console.log("activeGameIndex:", activeGameIndex);

            if (activeGames && activeGames[activeGameIndex]) {
                const selectedGame = activeGames[activeGameIndex];
                console.log("Selected Game:", selectedGame);

                // Navigation logic - needs work
                if (selectedGame?.link) {
                    window.location.href = `${selectedGame.link}?controller=1&utm_source=games.articles.media&utm_medium=carousel`;
                }

                if (selectedGame?.launch_command) {
                    fetch('/api/launch-game', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ location: selectedGame.launch_command }),
                    }).then(response => {
                        
                        if (!response.ok) {
                            console.error("Failed to launch game:", response.statusText);
                        }

                        const data = response.json();
                        console.log("Launch response data:", data);

                        exitFullscreen();

                    });
                }

            }
            // Call your function here
        }
        prevButton0.current = button0;

        // Standard mapping: 14=Left, 15=Right
        const leftPressed = gp.buttons[14]?.pressed;
        const rightPressed = gp.buttons[15]?.pressed;

        // Axes 0 is Left Stick X
        const axisX = gp.axes[0];
        const stickLeft = axisX < -0.5;
        const stickRight = axisX > 0.5;

        const isLeft = leftPressed || stickLeft;
        const isRight = rightPressed || stickRight;

        // Throttle to avoid super fast scrolling (0.2s delay)
        if (now - lastMoveTime.current < 0.2) return;

        if (isLeft) {
            const currentIndex = useStore.getState().activeGameIndex;
            if (currentIndex > 0) {
                setActiveGameIndex(currentIndex - 1);
                lastMoveTime.current = now;
                playSound();
            }

        } else if (isRight) {
            const currentIndex = useStore.getState().activeGameIndex;
            if (currentIndex < activeGames?.length - 1) {
                setActiveGameIndex(currentIndex + 1);
                lastMoveTime.current = now;
                playSound();
            }

        }
    });

    return null;
}

export default memo(ControllerManager);