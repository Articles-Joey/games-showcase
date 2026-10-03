"use client";

import { useState } from "react";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import { useHotkeys } from "react-hotkeys-hook";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import ArticlesButton from "@/components/UI/Button";
import GameItem from "./GameItem";
import useGames from "@/components/hooks/useGames";
import FilterDropdowns from "@/components/UI/FilterDropdowns";
import { useFilterStore } from "@/components/hooks/useFilterStore";
import useAllGames from "@/components/hooks/useAllGames";
import OnlinePlayerCount from "@/components/UI/OnlinePlayerCount";
import PublishWithUsModal from "@/components/UI/PublishWithUsModal";

export default function GamesPage() {
    const { games, isLoading: isLoadingGames, isRemote } = useGames();
    const { filteredGames } = useAllGames();
    const [toontownImages, setToontownImages] = useState(false);
    const [modalPublishWithUs, setModalPublishWithUs] = useState(null);
    const search = useFilterStore((state) => state.search);
    const setSearch = useFilterStore((state) => state.setSearch);

    useHotkeys(["t"], () => setToontownImages((prev) => !prev));

    return (
        <Box sx={{ position: "relative", pb: "50px" }}>
            {modalPublishWithUs && <PublishWithUsModal show={modalPublishWithUs} setShow={setModalPublishWithUs} />}
            <Box sx={{
                position: "relative", height: "25vh", color: "#fff", bgcolor: "rgba(0,0,0,0.4)",
                textShadow: "0 0 7px #fff, 0 0 42px #0fa", "@media (min-width: 992px)": { height: "30vh" },
            }}>
                <Box sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, bgcolor: "rgba(0,0,0,0.5)" }} />
                <Box sx={{ position: "absolute", width: "100%", height: "100%", zIndex: 1 }}>
                    <Box component="img" src={`${process.env.NEXT_PUBLIC_CDN}games/synth.jpg`} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "0% 70%" }} />
                </Box>
                <Box sx={{ position: "relative", zIndex: 3, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%" }}>
                    <Typography variant="h3" component="h1">Games - {games?.filter((obj) => !obj.preview)?.length || 0}</Typography>
                    <Typography>Play some games with your friends or other users.</Typography>
                    <OnlinePlayerCount />
                    <Box component={Link} href="/" sx={{ color: "#fff" }}>Return to landing</Box>
                </Box>
            </Box>
            <Box sx={{
                position: "sticky", top: 0, left: 0, p: 1, width: "100%", zIndex: 10,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                bgcolor: "#17042a", mb: 2, borderTop: "2px solid #0f677e", borderBottom: "2px solid #0f677e", boxShadow: "0 0 2px 2px #7e007b",
            }}>
                <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 1 }}>
                    <Box sx={{ display: "flex", minWidth: 240 }}><FilterDropdowns /></Box>
                    <Box sx={{ display: "flex" }}>
                        <TextField type="text" size="small" placeholder="Search games..." value={search} id="games-search" onChange={(event) => setSearch(event.target.value)} slotProps={{ htmlInput: { "aria-label": "Search games" } }} sx={{ maxWidth: 160, "& .MuiInputBase-root": { borderRadius: 0, fontSize: "0.75rem" } }} />
                        <ArticlesButton aria-label="Clear search" onClick={() => setSearch("")}><CloseIcon fontSize="small" /></ArticlesButton>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ position: "relative", maxWidth: 1200, mx: "auto", px: 2, zIndex: 1 }}>
                {isLoadingGames && <Alert severity={isRemote ? "error" : "warning"} icon={false} sx={{ my: 2, "& .MuiAlert-message": { display: "flex", alignItems: "center", justifyContent: "center", width: "100%" } }}>
                    <CircularProgress /><Box sx={{ ml: 2 }}>Loading games...</Box>
                </Alert>}
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(11rem, 1fr))", gap: "10px", mb: 6, "@media (min-width: 992px)": { gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))" } }}>
                    {filteredGames?.map((item) => <GameItem key={item.name} item={item} toontownImages={toontownImages} />)}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Card sx={{ mx: 1, width: "100%", maxWidth: 400, mt: "10rem", boxShadow: "0 0 0 1px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.2)", "@media (min-width: 992px)": { mt: "3rem" } }}>
                        <Box sx={{ p: 1, bgcolor: "#260346", color: "#fff" }}><Typography variant="h6" component="h2">Publish your web game with us!</Typography></Box>
                        <CardContent sx={{ py: 1, fontSize: "0.875rem", display: "flex", flexDirection: "column" }}>
                            <Box component="span" sx={{ mb: 1 }}>Publish your React web game on Articles Media, easy to use multiplayer API and at cost hosting fees. We also provide three different NPM packages to help you get started.</Box>
                            <ArticlesButton small startIcon={<InfoIcon fontSize="small" />} sx={{ mt: "auto" }} onClick={() => {
                                setModalPublishWithUs(true);
                                sendGAEvent("event", "Clicked Publish With Us", { value: "" });
                            }}>Learn More</ArticlesButton>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}

