"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useStore } from "@/components/hooks/useStore";
import ArticlesButton from "../Button";

export default function GameAchievements() {
    const gameInfoModal = useStore((state) => state.gameInfoModal);

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
                <Box>Game Achievements</Box>
                <ArticlesButton
                    size="small"
                    sx={{ visibility: "hidden" }}
                    aria-hidden
                    tabIndex={-1}
                >
                    <RefreshIcon fontSize="small" />
                </ArticlesButton>
            </Box>
            <CardContent>
                {gameInfoModal?.achievements?.length > 0 ? (
                    gameInfoModal.achievements.map((achievement, index) => (
                        <Box
                            key={index}
                            sx={{ mb: 2 }}
                        >
                            <Box>
                                <b>{achievement.name}</b>
                            </Box>
                            <Box>{achievement.description}</Box>
                        </Box>
                    ))
                ) : (
                    <Box>
                        No achievements available for this game yet. Check back
                        later.
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
