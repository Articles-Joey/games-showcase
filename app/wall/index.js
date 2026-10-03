"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import ArticlesButton from "@/components/UI/Button";
import useAllGames from "@/components/hooks/useAllGames";
import GameItem from "../original/GameItem";
import FilterDropdowns from "@/components/UI/FilterDropdowns";
import { useFilterStore } from "@/components/hooks/useFilterStore";

export default function PageContent() {
    const { filteredGames } = useAllGames();
    const search = useFilterStore((state) => state.search);
    const setSearch = useFilterStore((state) => state.setSearch);

    return (
        <Box sx={{ bgcolor: "#272727", color: "#fff", minHeight: "100vh" }}>
            <Box component="nav" sx={{
                position: "sticky", top: 0, left: 0, width: "100%", px: 2, py: 0, zIndex: 100,
                height: 50, minHeight: 50, maxHeight: 50, bgcolor: "#000", display: "flex", alignItems: "center", justifyContent: "space-between",
                flexDirection: "row", gap: 2, overflowX: "auto", scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" },
            }}>
                <Box component={Link} href="/" sx={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: 1, fontSize: "1.5rem", fontWeight: "bold", textShadow: "0 0 5px black", whiteSpace: "nowrap", flexShrink: 0 }}>
                    <span>🎮</span><span>Games Showcase</span><span> - </span><span>{filteredGames?.length} games</span>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0, flexWrap: "nowrap", gap: 0.5 }}>
                    <Box sx={{ minWidth: 240 }}><FilterDropdowns /></Box>
                    <TextField placeholder="Search games..." value={search} size="small" onChange={(event) => setSearch(event.target.value)} slotProps={{ htmlInput: { "aria-label": "Search games" } }} sx={{ minWidth: 120 }} />
                    <ArticlesButton aria-label="Clear search" onClick={() => setSearch("")}><CloseIcon fontSize="small" /></ArticlesButton>
                </Box>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
                {filteredGames?.map((game) => <GameItem key={game.name} item={game} />)}
            </Box>
        </Box>
    );
}

