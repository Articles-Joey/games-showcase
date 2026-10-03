"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useStore } from "@/components/hooks/useStore";
import ArticlesButton from "../Button";
import useGameComments from "@/components/hooks/Articles Media/useGameComments";

export default function GameComments() {
    const gameInfoModal = useStore((state) => state.gameInfoModal);
    const { data: fetchedGameComments, isLoading, isError, mutate } = useGameComments({ game_id: gameInfoModal?._id });

    return (
        <Card sx={{ mt: 3, borderRadius: 0 }}>
            <Box sx={{ p: 1, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: 1, borderColor: "divider" }}>
                <Box>User Comments</Box><ArticlesButton size="small" aria-label="Refresh comments" onClick={() => mutate()}><RefreshIcon fontSize="small" /></ArticlesButton>
            </Box>
            <CardContent>
                {fetchedGameComments?.length > 0 ? fetchedGameComments.map((comment, index) => <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ fontSize: "0.85rem" }}>{new Date(comment.date).toLocaleString()}</Box>
                    <Box><b>{comment.user_id}</b> says:</Box><Box>{comment.comment}</Box>
                </Box>) : <Box>{isLoading ? "Loading comments..." : "No comments found."}{isError && "Error loading comments."}</Box>}
            </CardContent>
        </Card>
    );
}

