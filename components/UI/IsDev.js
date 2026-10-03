"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

export default function IsDev({ className, noOutline, children, inline }) {
    const userDetails = {};
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    if (!children || !userDetails?.roles?.isDev || !isMounted) return null;

    return (
        <Box
            className={className}
            sx={{
                display: inline ? "inline-block" : "block",
                ...(!noOutline && { border: 1, borderColor: "divider" }),
            }}
        >
            {children}
        </Box>
    );
}
