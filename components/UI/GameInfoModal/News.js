"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useStore } from "@/components/hooks/useStore";
import ArticlesButton from "../Button";
import useGameNews from "@/components/hooks/Articles Media/useGameNews";

export default function GameNews() {
    const gameInfoModal = useStore((state) => state.gameInfoModal);
    const {
        data: fetchedGameNews,
        isLoading,
        isError,
        mutate,
    } = useGameNews({ game_id: gameInfoModal?._id });

    return (
        <Card sx={{ mt: 3, borderRadius: 0 }}>
            <Box
                sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "divider",
                }}
            >
                <Box>Game News</Box>
                <ArticlesButton
                    size="small"
                    aria-label="Refresh news"
                    onClick={() => mutate()}
                >
                    <RefreshIcon fontSize="small" />
                </ArticlesButton>
            </Box>
            <CardContent>
                {isError && (
                    <Box sx={{ color: "error.main" }}>Error loading news.</Box>
                )}
                {fetchedGameNews?.length > 0 ? (
                    fetchedGameNews.map((news, index) => (
                        <Box
                            key={index}
                            sx={{ mb: 2 }}
                        >
                            <Box>
                                <b>{news.title}</b> -{" "}
                                {new Date(news.date).toDateString()}
                            </Box>
                            <Box>{news.content}</Box>
                        </Box>
                    ))
                ) : (
                    <Box>
                        {isLoading ? "Loading news..." : "No news available."}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
