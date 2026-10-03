"use client";

import { memo } from "react";
import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ArticlesButton from "./Button";
import useTouchControlsStore from "@/components/hooks/useTouchControlsStore";
import { useStore } from "@/components/hooks/useStore";
import useAllGames from "@/components/hooks/useAllGames";

function CarouselControlButtons() {
    const incrementActiveGameIndex = useStore((state) => state.incrementActiveGameIndex);
    const decrementActiveGameIndex = useStore((state) => state.decrementActiveGameIndex);
    const activeGameIndex = useStore((state) => state.activeGameIndex);
    const setGameInfoModal = useStore((state) => state.setGameInfoModal);
    const zoomLevel = useStore((state) => state.zoomLevel);
    const setZoomLevel = useStore((state) => state.setZoomLevel);
    const { filteredGames } = useAllGames();

    return (
        <>
            <ArticlesButton large aria-label="Previous game" onClick={decrementActiveGameIndex}><ChevronLeftIcon /></ArticlesButton>
            <ArticlesButton large onClick={() => setGameInfoModal(filteredGames[activeGameIndex])}>Select</ArticlesButton>
            <ArticlesButton large aria-label="Next game" onClick={incrementActiveGameIndex}><ChevronRightIcon /></ArticlesButton>
            <Box sx={{ position: "absolute", top: 0, left: "50%", transform: "translate(-50%, -50%)", display: "flex" }}>
                <ArticlesButton aria-label="Zoom out" onClick={() => setZoomLevel(zoomLevel - 1)}><ZoomOutIcon fontSize="small" /></ArticlesButton>
                <ArticlesButton disabled>{zoomLevel}</ArticlesButton>
                <ArticlesButton aria-label="Zoom in" onClick={() => setZoomLevel(zoomLevel + 1)}><ZoomInIcon fontSize="small" /></ArticlesButton>
            </Box>
        </>
    );
}

function TouchControls() {
    const enabled = useTouchControlsStore((state) => state.enabled);
    const sidebar = useStore((state) => state.sidebar);

    return (
        <Box data-hide-in-screenshot-mode="true" sx={{
            position: "fixed", bottom: 50, left: 0, width: "100%", height: 150, zIndex: 1,
            bgcolor: "rgba(0,0,0,0.5)", p: 2, display: enabled ? "flex" : "none", justifyContent: "space-between", alignItems: "center",
            ...(sidebar && { "@media (min-width: 992px)": { left: 300, bottom: 0, width: "calc(100% - 300px)" } }),
        }}>
            <CarouselControlButtons />
        </Box>
    );
}

export default memo(TouchControls);

