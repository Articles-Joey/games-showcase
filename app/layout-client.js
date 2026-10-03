"use client";

import { Suspense } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import packageInfo from "@/package.json";
import GlobalBody from "@articles-media/articles-dev-box/GlobalBody";
import DarkModeHandler from "@articles-media/articles-dev-box/DarkModeHandler";
import GlobalClientModals from "@articles-media/articles-dev-box/GlobalClientModals";
import { useStore } from "@/components/hooks/useStore";
import { useAudioStore } from "@/components/hooks/useAudioStore";
import { useSocketStore } from "@/components/hooks/useSocketStore";
import useTouchControlsStore from "@/components/hooks/useTouchControlsStore";
import ArticlesButton from "@/components/UI/Button";
import ControlsSetting from "@/components/UI/ControlsSetting";
import GameInfoModal from "@/components/UI/GameInfoModal";
import FloatingDarkModeButton from "@/components/UI/FloatingDarkModeButton";

export default function LayoutClient() {
    const pathname = usePathname();
    const darkMode = useStore((state) => state.darkMode);
    const renderUniqueGameSceneRange = useStore((state) => state.renderUniqueGameSceneRange);
    const setRenderUniqueGameSceneRange = useStore((state) => state.setRenderUniqueGameSceneRange);
    const gameInfoModal = useStore((state) => state.gameInfoModal);
    const setGameInfoModal = useStore((state) => state.setGameInfoModal);

    useHotkeys("r", () => useStore.getState().reloadScene(), []);

    return (
        <>
            <GlobalBody />
            <DarkModeHandler useStore={useStore} />
            <Suspense>
                <GlobalClientModals
                    useStore={useStore}
                    useAudioStore={useAudioStore}
                    useTouchControlsStore={useTouchControlsStore}
                    useSocketStore={useSocketStore}
                    packageInfo={packageInfo}
                    settingsModalConfig={{
                        tabs: {
                            Graphics: {
                                darkMode: true,
                                landingAnimation: true,
                                children: <Box sx={{ mb: 2 }}>
                                    <Box>Render Unique Game Scene Range</Box>
                                    <Box sx={{ display: "flex", mb: 2 }}>
                                        <ArticlesButton small sx={{ flex: 1 }} aria-label="Decrease scene range" onClick={() => setRenderUniqueGameSceneRange(renderUniqueGameSceneRange - 1)}>
                                            <ArrowDownwardIcon fontSize="small" />
                                        </ArticlesButton>
                                        <ArticlesButton small sx={{ flex: 1 }}>{renderUniqueGameSceneRange}</ArticlesButton>
                                        <ArticlesButton small sx={{ flex: 1 }} aria-label="Increase scene range" onClick={() => setRenderUniqueGameSceneRange(renderUniqueGameSceneRange + 1)}>
                                            <ArrowUpwardIcon fontSize="small" />
                                        </ArticlesButton>
                                    </Box>
                                </Box>,
                            },
                            Audio: {
                                sliders: Object.keys(useAudioStore.getState().audioSettings || {})
                                    .filter((key) => key !== "enabled")
                                    .map((key) => ({
                                        key,
                                        label: key.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
                                    })),
                            },
                            Controls: { touchControls: true, children: <ControlsSetting /> },
                            Multiplayer: { serverUrl: true },
                            Other: {},
                            Debug: { showStats: true },
                        },
                        reset: () => {
                            useAudioStore.getState().resetAudioSettings();
                            useStore.getState().setControlSettings(useStore.getState().initialControlSettings);
                        },
                    }}
                    infoModalConfig={{ previewImage: darkMode ? "img/preview.webp" : "img/preview.webp" }}
                />
                {gameInfoModal && <GameInfoModal show={gameInfoModal} setShow={setGameInfoModal} />}
                {(pathname === "/wall" || pathname === "/original") && <FloatingDarkModeButton />}
            </Suspense>
        </>
    );
}

