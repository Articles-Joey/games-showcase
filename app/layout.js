import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Tiny5 } from 'next/font/google';

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

const tiny5 = Tiny5({
  subsets: ['latin'],
  variable: '--font-tiny5',
  weight: '400',
});

export const metadata = {
  title: "Games Showcase",
  description: "A 3D collection of games I developed, this serves as a portfolio/another 3D example project/game launcher.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={tiny5.variable}>

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
