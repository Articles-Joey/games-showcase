"use client";

import { memo, useId } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GameMenuPrimaryButtonGroup from "@articles-media/articles-dev-box/GameMenuPrimaryButtonGroup";
import { useGameControllerKeyboardStore } from "@articles-media/articles-gamepad-helper";
import ArticlesButton from "./Button";
import ButtonDropdown from "./ButtonDropdown";
import FilterDropdowns from "./FilterDropdowns";
import { useStore } from "@/components/hooks/useStore";
import useCameraStore from "@/components/hooks/useCameraStore";
import useAllGames from "@/components/hooks/useAllGames";
import { useFilterStore } from "@/components/hooks/useFilterStore";

function GameMenu() {
    const cameraPresetsId = useId();
    const { filteredGames } = useAllGames();
    const setCameraUpdate = useCameraStore((state) => state.setCameraUpdate);
    const visible = useGameControllerKeyboardStore((state) => state.visible);
    const activeGameIndex = useStore((state) => state.activeGameIndex);
    const setActiveGameIndex = useStore((state) => state.setActiveGameIndex);
    const zoomLevel = useStore((state) => state.zoomLevel);
    const setZoomLevel = useStore((state) => state.setZoomLevel);
    const search = useFilterStore((state) => state.search);
    const setSearch = useFilterStore((state) => state.setSearch);
    const setAvailabilityFilter = useFilterStore((state) => state.setAvailabilityFilter);
    const filters = useFilterStore((state) => state.filters);
    const setFilters = useFilterStore((state) => state.setFilters);
    const setPlayerFilter = useFilterStore((state) => state.setPlayerFilter);
    const reloadScene = useStore((state) => state.reloadScene);

    const resetFilters = () => {
        setSearch("");
        setAvailabilityFilter("Available");
        setPlayerFilter("All");
        setActiveGameIndex(0);
        reloadScene();
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", overflowY: "auto", height: "100%", width: "100%", bgcolor: "background.paper", fontSize: "0.8rem" }}>
            <Box sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
                <GameMenuPrimaryButtonGroup useStore={useStore} type="GameMenu" useRouter={useRouter} />
            </Box>
            <Box sx={{ p: 1, mt: "auto", display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                    <Box sx={{ display: "flex" }}>
                        <TextField type="text" id="game-search" size="small" placeholder="Search games..." value={search} onChange={(event) => {
                            setSearch(event.target.value);
                            setActiveGameIndex(0);
                        }} slotProps={{ htmlInput: { "aria-label": "Search games" } }} sx={{ flex: 1, "& .MuiInputBase-root": { borderRadius: 0, fontSize: "0.75rem" } }} />
                        <ArticlesButton small aria-label="Clear search" onClick={() => { setSearch(""); setActiveGameIndex(0); }}><CleaningServicesIcon fontSize="small" /></ArticlesButton>
                    </Box>
                    {process.env.NODE_ENV === "development" && <Box sx={{ bgcolor: "rgba(127,255,212,0.2)", border: 1, borderColor: "divider", p: 0.5, mb: 2 }}>
                        <Box>{visible ? "Visible Content" : "Hidden Content"}</Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                            <span>Launchers</span>
                            <ArticlesButton small aria-label="Reset launcher filters" onClick={() => {
                                setFilters({ ...filters, launchers: Object.fromEntries(Object.keys(filters.launchers).map((launcher) => [launcher, true])) });
                                setActiveGameIndex(0);
                            }}><CleaningServicesIcon fontSize="small" /></ArticlesButton>
                        </Box>
                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                            {Object.keys(filters.launchers).map((launcher) => (
                                <ArticlesButton key={launcher} sx={{ width: "50%" }} small active={filters.launchers[launcher]} onClick={() => {
                                    setFilters({ ...filters, launchers: { ...filters.launchers, [launcher]: !filters.launchers[launcher] } });
                                    setActiveGameIndex(0);
                                }}>{launcher}</ArticlesButton>
                            ))}
                        </Box>
                    </Box>}
                    <Box>Filters</Box>
                    <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}><FilterDropdowns /></Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 0.5 }}>
                        <Box sx={{ display: "flex" }}>
                            <ArticlesButton small aria-label="Previous game" onClick={() => setActiveGameIndex(activeGameIndex - 1)}><ArrowCircleLeftIcon fontSize="small" /></ArticlesButton>
                            <ArticlesButton small disabled>{activeGameIndex}/{(filteredGames?.length - 1) || 0}</ArticlesButton>
                            <ArticlesButton small aria-label="Next game" onClick={() => setActiveGameIndex(activeGameIndex + 1)}><ArrowCircleRightIcon fontSize="small" /></ArticlesButton>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <ArticlesButton small aria-label="Zoom out" onClick={() => setZoomLevel(zoomLevel - 1)}><ArrowCircleDownIcon fontSize="small" /></ArticlesButton>
                            <ArticlesButton small disabled>{zoomLevel}</ArticlesButton>
                            <ArticlesButton small aria-label="Zoom in" onClick={() => setZoomLevel(zoomLevel + 1)}><ArrowCircleUpIcon fontSize="small" /></ArticlesButton>
                        </Box>
                        <ArticlesButton small aria-label="Reset filters and reload scene" onClick={resetFilters}><CleaningServicesIcon fontSize="small" /></ArticlesButton>
                    </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                {process.env.NODE_ENV === "development" && <ButtonDropdown id={`camera-presets-${cameraPresetsId}`} label="Camera Presets" Icon={CameraAltIcon}>
                    {(closeMenu) => [
                        { name: "Starting", position: [19, 10, 15] },
                        { name: "Bleacher", position: [28.32, 5.38, -6.30] },
                        { name: "First Person", position: [0, 3.5, 0] },
                        { name: "Wind Turbine", position: [42.50, 16.94, -125.86] },
                    ].map(({ name, position }) => <MenuItem key={name} onClick={() => {
                        setCameraUpdate({ position });
                        closeMenu();
                    }}>{name}</MenuItem>)}
                </ButtonDropdown>}
            </Box>
        </Box>
    );
}

export default memo(GameMenu);

