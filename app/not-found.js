"use client";

import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import HomeIcon from "@mui/icons-material/Home";
import ArticlesButton from "@/components/UI/Button";

export default function NotFound() {
    return (
        <Box
            sx={{
                position: "relative",
                isolation: "isolate",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
                minHeight: "calc(100vh - 100px)",
            }}
        >
            <Box
                sx={{
                    position: "fixed",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                }}
            >
                <Image
                    src="https://cdn.articles.media/games/synth.jpg"
                    fill
                    alt=""
                    style={{
                        objectFit: "cover",
                        filter: "blur(10px)",
                        transform: "scale(1.05)",
                    }}
                />
            </Box>
            <Card sx={{ borderRadius: 0, boxShadow: 6, textAlign: "center" }}>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
                    <b>404 - Not Found</b>
                </Box>
                <CardContent>Could not find the requested page</CardContent>
                <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
                    <ArticlesButton
                        component={Link}
                        href="/"
                        startIcon={<HomeIcon />}
                    >
                        Return to Home
                    </ArticlesButton>
                </Box>
            </Card>
        </Box>
    );
}
