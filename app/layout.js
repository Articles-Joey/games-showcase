import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { GoogleAnalytics } from '@next/third-parties/google'

import theme from '@/components/theme';

import "bootstrap/dist/css/bootstrap.min.css";

import "@/styles/index.scss";

import "@articles-media/articles-dev-box/dist/style.css";

import "@articles-media/articles-gamepad-helper/dist/articles-gamepad-helper.css";

import AudioHandler from '@/components/Handlers/AudioHandler';
// import GlobalClientModals from '@/components/UI/GlobalClientModals';
// import DarkModeHandler from '@/components/UI/DarkModeHandler';
import { Suspense } from 'react';
import LayoutClient from './layout-client';
import SocketLogicHandler from '@/components/Handlers/SocketLogicHandler';

export const metadata = {
  title: "Games Showcase",
  description: "A 3D collection of games I developed, this serves as a portfolio/another 3D example project/game launcher.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <head>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Tiny5&display=swap" rel="stylesheet"></link>

      </head>

      <GoogleAnalytics gaId="G-BSWV4HR4VG" />

      <body
        id="carousel-game-page"
      // className={`${geistSans.variable} ${geistMono.variable}`}
      >

        <LayoutClient />

        <Suspense>
          <AudioHandler />
          {/* <DarkModeHandler /> */}
          {/* <GlobalClientModals /> */}
          <SocketLogicHandler />
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
