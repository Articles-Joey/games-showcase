import { useEffect, useRef } from 'react';
// import { useGameStore } from '@/hooks/useGameStore';

import { usePieMenuStore } from '@articles-media/articles-gamepad-helper';
import { useStore } from './useStore';

export const useLandingNavigation = (elementsRef) => {

    const visible = usePieMenuStore((state) => state.visible);

    // const showInfoModal = useStore((state) => state.showInfoModal)
    const showSettingsModal = useStore((state) => state.showSettingsModal)
    const showCreditsModal = useStore((state) => state.showCreditsModal)

    const lastInputTime = useRef(0);
    const currentFocusIndex = useRef(-1);

    useEffect(() => {

        if (showSettingsModal || showCreditsModal || visible) return;

        let animationFrameId;

        const loop = () => {
            const gamepads = navigator.getGamepads();
            const gp = gamepads[0];

            if (gp) {
                const now = performance.now();

                // Only process input every 150ms
                if (now - lastInputTime.current > 150) {

                    const axes = gp.axes;
                    const buttons = gp.buttons;
                    const threshold = 0.5;

                    let dx = 0;
                    let dy = 0;

                    // D-Pad
                    if (buttons[12].pressed) dy = -1; // Up
                    if (buttons[13].pressed) dy = 1;  // Down
                    if (buttons[14].pressed) dx = -1; // Left
                    if (buttons[15].pressed) dx = 1;  // Right

                    // Left Stick
                    if (axes[1] < -threshold) dy = -1;
                    if (axes[1] > threshold) dy = 1;
                    if (axes[0] < -threshold) dx = -1;
                    if (axes[0] > threshold) dx = 1;

                    if (dx !== 0 || dy !== 0) {
                        lastInputTime.current = now;
                        navigate(dx, dy);
                    }

                    // A Button (Select)
                    if (buttons[0].pressed) {
                        lastInputTime.current = now; // Debounce click too
                        const active = document.activeElement;
                        // Check if active element is one of ours
                        if (active && elementsRef.current.includes(active)) {
                            active.click();
                        }
                    }
                }
            }
            animationFrameId = requestAnimationFrame(loop);
        };

        const navigate = (dx, dy) => {
            // Define the grid layout
            // 0: Original
            // 1: Carousel
            // 2: Wall
            
            // Footer Grid
            // 3: GitHub, 4: Credits
            // 5: Settings, 6: Animation
            
            // Bottom
            // 7: Visit Articles

            const els = elementsRef.current;

            // If nothing focused, focus first available
            if (currentFocusIndex.current === -1 || !els[currentFocusIndex.current]) {
                // Find first non-null
                const first = els.findIndex(e => e);
                if (first !== -1) focus(first);
                return;
            }

            const curr = currentFocusIndex.current;
            let next = curr;

            if (dy === 1) { // Down
                if (curr === 0) next = 1;
                else if (curr === 1) next = 2;
                else if (curr === 2) next = 3; // Go to GitHub
                else if (curr === 3) next = 5; // GitHub -> Settings
                else if (curr === 4) next = 6; // Credits -> Animation
                else if (curr === 5 || curr === 6) next = 7; // -> Visit Articles
            } else if (dy === -1) { // Up
                if (curr === 7) next = 5; // Visit Articles -> Settings
                else if (curr === 6) next = 4; // Animation -> Credits
                else if (curr === 5) next = 3; // Settings -> GitHub
                else if (curr === 4 || curr === 3) next = 2; // Footer Top -> Wall
                else if (curr === 2) next = 1;
                else if (curr === 1) next = 0;
            } else if (dx === 1) { // Right
                if (curr === 3) next = 4; // GitHub -> Credits
                else if (curr === 5) next = 6; // Settings -> Animation
            } else if (dx === -1) { // Left
                if (curr === 4) next = 3; // Credits -> GitHub
                else if (curr === 6) next = 5; // Animation -> Settings
            }

            // Ensure next exists
            if (els[next]) {
                focus(next);
            }
        };

        const focus = (index) => {
            if (elementsRef.current[index]) {
                elementsRef.current[index].focus();
                currentFocusIndex.current = index;
            }
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationFrameId);
    }, [elementsRef, showSettingsModal, showCreditsModal, visible]);
};
