"use client";

import Box from "@mui/material/Box";
import { useSocketStore } from "@/components/hooks/useSocketStore";
import { useStore } from "@/components/hooks/useStore";

export default function OnlinePlayerCount() {
    const lobbyDetails = useStore((state) => state.lobbyDetails);
    const connected = useSocketStore((state) => state.connected);

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", mb: 2, bgcolor: "#000", color: "#fff", p: "0.5rem 1rem", borderRadius: "5px", width: "100%" }}>
            {connected ? <>
                <Box>Players Online: {lobbyDetails?.players_online || 0}</Box>
                <Box sx={{ px: 0.5 }}>|</Box>
                <Box>Players In Game: {lobbyDetails?.players_in_game || 0}</Box>
            </> : <Box>Loading server details...</Box>}
        </Box>
    );
}

