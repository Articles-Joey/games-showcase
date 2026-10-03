"use client";

import { Suspense, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import WebIcon from "@mui/icons-material/Web";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import PieMenu from "@articles-media/articles-gamepad-helper/PieMenu";
import GameMenuPrimaryButtonGroup from "@articles-media/articles-dev-box/GameMenuPrimaryButtonGroup";
import ArticlesButton from "@/components/UI/Button";
import { useStore } from "@/components/hooks/useStore";
import { useLandingNavigation } from "@/components/hooks/useLandingNavigation";
import OnlinePlayerCount from "@/components/UI/OnlinePlayerCount";
import SearchParamsHandler from "@/components/Handlers/SearchParamsHandler";

const SynthwaveAnimation = dynamic(() => import("@/components/Game/Synthwave/SynthwaveAnimation"), { ssr: false });

export default function LandingPage() {
    const elementsRef = useRef([]);
    useLandingNavigation(elementsRef);
    const darkMode = useStore((state) => state.darkMode);
    const landingAnimation = useStore((state) => state.landingAnimation);
    const setLandingAnimation = useStore((state) => state.setLandingAnimation);
    const setShowSettingsModal = useStore((state) => state.setShowSettingsModal);
    const setShowCreditsModal = useStore((state) => state.setShowCreditsModal);

    return (
        <Box sx={{
            position: "relative", isolation: "isolate", width: "100%", display: "flex",
            justifyContent: "center", alignItems: "center", p: 2, minHeight: "100vh",
            "& button:focus, & input:focus, & a:focus": {
                outline: "3px solid #fff", outlineOffset: 2,
                boxShadow: "0 0 15px rgba(255,255,255,0.8)", zIndex: 10, position: "relative",
            },
        }}>
            <Suspense><SearchParamsHandler /></Suspense>
            <Suspense>
                <PieMenu
                    options={[
                        { label: "Settings", Icon: SettingsIcon, callback: () => setShowSettingsModal((prev) => !prev) },
                        { label: "Credits", Icon: InfoIcon, callback: () => setShowCreditsModal(true) },
                        { label: "Toggle Animation", Icon: CameraAltIcon, callback: () => setLandingAnimation(!landingAnimation) },
                    ].map(({ label, Icon, callback }) => ({
                        label: <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}><Icon fontSize="small" />{label}</Box>,
                        callback,
                    }))}
                    onFinish={(event) => event.callback?.()}
                />
            </Suspense>
            <Box sx={{
                position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: -1,
                "& img": { objectFit: "cover", filter: darkMode ? "blur(10px) brightness(0.75)" : "blur(10px)", transform: "scale(1.05)" },
            }}>
                <Image src="https://cdn.articles.media/games/synth.jpg" fill alt="" />
            </Box>
            {landingAnimation && <Box sx={{
                position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: -1,
                "& canvas": { position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: -1 },
            }}><SynthwaveAnimation /></Box>}
            <Box sx={{ width: "20rem", maxWidth: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Box component="img" src="img/icon.svg" width={200} alt="" sx={{ mb: "-2.5rem" }} />
                <Typography component="h1" sx={{
                    color: "#fff", fontFamily: "var(--font-tiny5), sans-serif", fontWeight: 400,
                    fontSize: "2rem", textAlign: "center", textShadow: "0 0 5px black",
                    "@media (min-width: 992px)": { fontSize: "3rem" },
                }}>games.articles.media</Typography>
                <OnlinePlayerCount />
                <Card sx={{ width: "100%", mb: 6, borderRadius: 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 1, borderBottom: 1, borderColor: "divider" }}>Select Launcher Mode</Box>
                    <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                        {[
                            { label: "Original", href: "/original", Icon: WebIcon, description: "Browse and launch games just how they are showed via articles.media." },
                            { label: "Carousel", href: "/carousel", Icon: SportsEsportsIcon, description: "Browse and launch games in a 3D carousel environment." },
                            { label: "Wall", href: "/wall", Icon: ViewModuleIcon, description: "Browse and launch games in a 2D scrolling wall environment." },
                        ].map(({ label, href, Icon, description }, index) => (
                            <Tooltip key={href} placement="right" title={<><Typography component="strong">{label}</Typography><Box>{description}</Box></>}>
                                <ArticlesButton component={Link} href={href} prefetch={false} ref={(el) => { elementsRef.current[index] = el; }} fullWidth small startIcon={<Icon fontSize="small" />} sx={{ mb: 1 }}>
                                    {label}
                                </ArticlesButton>
                            </Tooltip>
                        ))}
                    </CardContent>
                    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", p: 1, borderTop: 1, borderColor: "divider" }}>
                        <GameMenuPrimaryButtonGroup useStore={useStore} type="Landing" useRouter={useRouter} />
                        <ArticlesButton ref={(el) => { elementsRef.current[6] = el; }} small startIcon={<CameraAltIcon fontSize="small" />} sx={{ width: "50%", mt: 1, fontSize: "0.6rem" }} onClick={() => setLandingAnimation(!landingAnimation)}>
                            {landingAnimation ? "Disable" : "Enable"} Animation
                        </ArticlesButton>
                    </Box>
                </Card>
                <ArticlesButton component={Link} href="https://articles.media?utm_source=games.articles.media&utm_medium=landing" target="_blank" rel="noopener noreferrer" ref={(el) => { elementsRef.current[7] = el; }}>
                    <Box component="img" src="https://cdn.articles.media/profile_photos/starter/articles.jpg" width={10} alt="" sx={{ mr: 2, transform: "scale(3) translateX(-1px)" }} />
                    Visit articles.media
                </ArticlesButton>
            </Box>
        </Box>
    );
}

