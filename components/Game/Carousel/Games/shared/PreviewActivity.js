import { createContext, useContext, useLayoutEffect, useRef } from "react";
import { useStore as useThreeStore } from "@react-three/fiber";

// Standalone model usage keeps animating; each carousel item supplies its own flag.
const PreviewActivity = createContext(true);
const PreviewVisibility = createContext(true);

export function PreviewActivityProvider({ active, visible, children }) {
    const parentVisible = useContext(PreviewVisibility);
    return (
        <PreviewVisibility.Provider value={visible ?? parentVisible}>
            <PreviewActivity.Provider value={active}>
                {children}
            </PreviewActivity.Provider>
        </PreviewVisibility.Provider>
    );
}

export function usePreviewActive() {
    return useContext(PreviewActivity);
}

export function usePreviewVisible() {
    return useContext(PreviewVisibility);
}

// Like useFrame, but remove the subscription entirely while this preview is paused.
// The third callback argument is a local clock that only advances while active.
export function usePreviewFrame(callback, priority = 0, enabled = true) {
    const active = usePreviewActive();
    const store = useThreeStore();
    const subscribe = store.getState().internal.subscribe;
    const latest = useRef(callback);
    const elapsed = useRef(0);

    useLayoutEffect(() => {
        latest.current = callback;
    }, [callback]);
    useLayoutEffect(() => {
        if (!active || !enabled) return;
        // Use the same subscription mechanism and portal store as R3F's useFrame.
        const frame = {
            current: (state, delta) => {
                const step = Math.min(delta, 0.1);
                elapsed.current += step;
                latest.current(state, step, elapsed.current);
            },
        };
        return subscribe(frame, priority, store);
    }, [active, enabled, priority, store, subscribe]);
}
