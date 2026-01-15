// import { Geist, Geist_Mono } from "next/font/google";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/components/theme';

import "bootstrap/dist/css/bootstrap.min.css";

// import "./globals.css";
import "@/styles/index.scss";
// import SocketLogicHandler from "@/components/SocketLogicHandler";
// import PeerHandler from '@/components/PeerHandler';
import AudioHandler from '@/components/AudioHandler';
// import PeerHandlerTest from '@/components/PeerHandlerTest';
import GlobalClientModals from '@/components/UI/GlobalClientModals';
import DarkModeHandler from '@/components/UI/DarkModeHandler';
import { Suspense } from 'react';
// import CustomControlsLogic from '@/components/Game/CustomControlsLogic';
// import dynamic from 'next/dynamic';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// import InfoModal from '@/components/UI/InfoModal';
// const InfoModal = dynamic(
//     () => import('@/components/UI/InfoModal'),
//     { ssr: false }
// )

export const metadata = {
  title: "Games Showcase",
  description: "A 3D collection of games I developed, this serves as a portfolio/another 3D example project/game launcher.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <head>

        <link
          rel="stylesheet"
          href={`${process.env.NEXT_PUBLIC_CDN}fonts/fontawsome/css/all.min.css`}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Road+Rage&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Tiny5&display=swap" rel="stylesheet"></link>

      </head>

      <body
        id="carousel-game-page"
      // className={`${geistSans.variable} ${geistMono.variable}`}
      >

        {/* <SocketLogicHandler /> */}
        {/* <PeerHandler /> */}
        {/* <PeerHandlerTest /> */}
        {/* <CustomControlsLogic /> */}

        <Suspense>
          <AudioHandler />
          <DarkModeHandler />
          <GlobalClientModals />
        </Suspense>

        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>

            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            {children}

          </ThemeProvider>
        </AppRouterCacheProvider>

      </body>
    </html>
  );
}
