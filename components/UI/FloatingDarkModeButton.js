"use client";

import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useStore } from "@/components/hooks/useStore";

export default function FloatingDarkModeButton() {
    const darkMode = useStore((state) => state.darkMode);
    const toggleDarkMode = useStore((state) => state.toggleDarkMode);

    return (
        <IconButton
            aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={toggleDarkMode}
            sx={{
                position: "fixed",
                bottom: 20,
                right: 20,
                width: 50,
                height: 50,
                bgcolor: "#333",
                color: "#fff",
                zIndex: 2,
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                "&:hover": { bgcolor: "#444" },
            }}
        >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    );
}
