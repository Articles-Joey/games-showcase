import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import typicalZustandStoreExcludes from '@articles-media/articles-dev-box/typicalZustandStoreExcludes';
import typicalZustandStoreStateSlice from '@articles-media/articles-dev-box/typicalZustandStoreStateSlice';

function generateRandomNickname() {
  return null
}

const initialControlSettings = {
  "Move 1 Space": false,
  "Move 2 Space": false,
  "Move 3 Space": false,
  "Move 4 Space": false,
}

export const useStore = create()(
  persist(
    (set, get, store) => ({

      ...typicalZustandStoreStateSlice(set, get, generateRandomNickname),

      search: "",
      setSearch: (search) => set({ search }),

      filters: {
        launchers: {
          'Articles': true,
          'Steam': process.env.NODE_ENV === 'development' ? true : false,
          'Epic Games': process.env.NODE_ENV === 'development' ? true : false,
          'Itch.io': process.env.NODE_ENV === 'development' ? true : false,
          'GOG': process.env.NODE_ENV === 'development' ? true : false,
          // 'Custom': true,
          'User': process.env.NODE_ENV === 'development' ? true : false,
        },
      },
      setFilters: (filters) => set({ filters }),

      gameInfoModal: null,
      setGameInfoModal: (game) => set({ gameInfoModal: game }),
      launchGame: () => {

        const game = get().gameInfoModal;

        if (game?.link) {
          window.location.href = `${game.link}?controller=1&utm_source=games.articles.media&utm_medium=carousel`;
        }

      },

      activeGameIndex: 0,
      setActiveGameIndex: (index) => set({ activeGameIndex: index }),

      loginInfoModal: false,
      setLoginInfoModal: (value) => set({ loginInfoModal: value }),
      toggleLoginInfoModal: () => set({ loginInfoModal: !get().loginInfoModal }),

      // 2D or 3D
      renderMode: '3D',
      setRenderMode: (mode) => set({ renderMode: mode }),

      zoomLevel: 0,
      setZoomLevel: (level) => set({ zoomLevel: level }),

      renderUniqueGameSceneRange: 2,
      setRenderUniqueGameSceneRange: (range) => set({ renderUniqueGameSceneRange: range }),

      audioSettings: {
        enabled: false,
        // Stored as number from 0 to 100 and converted to 0 to 1 in AudioHandler
        game_volume: 50,
        music_volume: 50,
      },
      setAudioSettings: (settings) => set({ audioSettings: settings }),

      initialControlSettings: initialControlSettings,
      controlSettings: initialControlSettings,
      setControlSettings: (settings) => set({ controlSettings: settings }),

      reset: () => {
        set(store.getInitialState())
      },

      lobbyDetails: {
        players: [],
        games: [],
      },
      setLobbyDetails: (details) => set({ lobbyDetails: details }),

      listenForKey: false,
      setListenForKey: (value) => set({ listenForKey: value }),

    }),
    {
      name: 'games-showcase-storage',
      version: 4,
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true)
      },
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ![
            ...typicalZustandStoreExcludes,
            "gameInfoModal",
            "activeGameIndex",
            "loginInfoModal",
            "listenForKey",
            // "lobbyDetails",
          ].includes(key))
        ),
    },
  ),
)