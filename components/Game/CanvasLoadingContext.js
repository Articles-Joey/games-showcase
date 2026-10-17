import { createContext, useContext, useState } from "react";
import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";
import { previewNames } from "./Carousel/previewRegistry";

const LoadingContext = createContext(null);
const readyStore = createStore(() => ({
    status: "ready",
    skipped: false,
    completed: 0,
    total: 0,
    current: "",
    phase: "",
    errors: [],
}));

export function CanvasLoadingProvider({ children }) {
    // A fresh WebGL canvas needs its own upload/compilation pass, even if the
    // browser still has the files cached after a scene reset.
    const [store] = useState(() =>
        createStore((set) => ({
            status: "loading",
            skipped: false,
            // Reveal the carousel without marking the preparation queue complete.
            skipPreload: () => set({ skipped: true }),
            completed: 0,
            total: previewNames.length,
            current: "",
            phase: "Loading game previews",
            errors: [],
        })),
    );
    return (
        <LoadingContext.Provider value={store}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useCanvasLoadingStore() {
    return useContext(LoadingContext) || readyStore;
}

export function useCanvasLoading(selector) {
    return useStore(useCanvasLoadingStore(), selector);
}
