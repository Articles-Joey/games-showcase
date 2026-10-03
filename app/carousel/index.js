"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import GameMenu from "@articles-media/articles-dev-box/GameMenu";
import GamepadKeyboard from "@articles-media/articles-gamepad-helper/GamepadKeyboard";
import { useStore } from "@/components/hooks/useStore";
import LeftPanelContent from "@/components/UI/GameMenu";
import TouchControls from "@/components/UI/TouchControls";

const GameCanvas = dynamic(() => import("@/components/Game/GameCanvas"), { ssr: false });

export default function PageContent() {
    const [mounted, setMounted] = useState(false);
    const sceneKey = useStore((state) => state.sceneKey);

    useEffect(() => setMounted(true), []);

    return (
        <Box sx={{ position: "relative", display: "flex" }}>
            <GamepadKeyboard />
            <GameMenu
                useStore={useStore}
                LeftPanelContent={LeftPanelContent}
                menuBarConfig={{ style: "Bar", menuBarButtonPosition: "Center", settingsWithMenuButton: true, darkModeButton: true }}
                sidebarConfig={{ style: "Static Panel" }}
            />
            <Box sx={{
                position: "relative", width: "100vw", height: "100vh",
                "& canvas": { position: "absolute", width: "100%", height: "100%", left: 0, top: 0 },
            }}>
                <TouchControls />
                <Box className="controller-only" sx={{ position: "absolute", bottom: 0, right: 0, fontSize: "0.9rem", zIndex: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box component="img" id="controls-helper-dpad-left" src="img/Xbox UI/DpadL.svg" alt="Control Keys" className="only-controller" loading="lazy" sx={{ mx: "0.25rem", height: 40, width: 40, "@media (min-width: 992px)": { mx: "0.5rem", height: 70, width: 70 } }} />
                    {[
                        { src: "img/Xbox UI/A.svg", label: "Select" },
                        { src: "img/Xbox UI/X.svg", label: "Details" },
                    ].map(({ src, label }) => (
                        <Box key={label} sx={{ borderRadius: "8px", mx: "0.25rem", bgcolor: "rgba(0,0,0,0.5)", color: "#fff", p: "0.25rem 0.5rem", display: "flex", alignItems: "center", fontSize: "0.8rem", "@media (min-width: 992px)": { fontSize: "1rem", p: "0.5rem 1rem" } }}>
                            <Box component="img" height={30} width={30} src={src} alt="Control Keys" loading="lazy" sx={{ mr: 1 }} /><strong>{label}</strong>
                        </Box>
                    ))}
                    <Box component="img" id="controls-helper-dpad-right" src="img/Xbox UI/DpadR.svg" alt="Control Keys" className="only-controller" loading="lazy" sx={{ mx: "0.25rem", height: 40, width: 40, "@media (min-width: 992px)": { mx: "0.5rem", height: 70, width: 70 } }} />
                </Box>
                {mounted && <GameCanvas key={sceneKey} />}
            </Box>
        </Box>
    );
}

