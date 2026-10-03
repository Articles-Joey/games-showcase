import { Suspense } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Tiny5 } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import AppThemeProvider from "@/components/AppThemeProvider";
import AudioHandler from "@/components/Handlers/AudioHandler";
import SocketLogicHandler from "@/components/Handlers/SocketLogicHandler";
import LayoutClient from "./layout-client";

import "@articles-media/articles-gamepad-helper/dist/articles-gamepad-helper.css";

const tiny5 = Tiny5({
    subsets: ["latin"],
    variable: "--font-tiny5",
    weight: "400",
});

export const metadata = {
    title: "Games Showcase",
    description:
        "A 3D collection of games I developed, this serves as a portfolio/another 3D example project/game launcher.",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={tiny5.variable}
        >
            <body id="carousel-game-page">
                <GoogleAnalytics gaId="G-BSWV4HR4VG" />
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <AppThemeProvider>
                        <LayoutClient />
                        <Suspense>
                            <AudioHandler />
                            <SocketLogicHandler />
                        </Suspense>
                        {children}
                    </AppThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
