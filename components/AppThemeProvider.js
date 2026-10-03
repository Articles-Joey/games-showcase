"use client";

import { useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useStore } from "@/components/hooks/useStore";
import { createAppTheme } from "@/components/theme";

export default function AppThemeProvider({ children }) {
    const darkMode = useStore((state) => state.darkMode);
    const theme = useMemo(
        () => createAppTheme(darkMode === false ? "light" : "dark"),
        [darkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
