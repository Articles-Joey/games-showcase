import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useStore = create()(
  persist(
    (set, get, store) => ({

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
          'User': true,
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

      darkMode: true,
      toggleDarkMode: () => set({ darkMode: !get().darkMode }),

      infoModal: false,
      setInfoModal: (value) => set({ infoModal: value }),
      toggleInfoModal: () => set({ infoModal: !get().infoModal }),

      loginInfoModal: false,
      setLoginInfoModal: (value) => set({ loginInfoModal: value }),
      toggleLoginInfoModal: () => set({ loginInfoModal: !get().loginInfoModal }),

      showSettingsModal: false,
      setShowSettingsModal: (value) => set({ showSettingsModal: value }),
      toggleSettingsModal: () => set({ showSettingsModal: !get().showSettingsModal }),

      showCreditsModal: false,
      setShowCreditsModal: (value) => set({ showCreditsModal: value }),
      toggleCreditsModal: () => set({ showCreditsModal: !get().showCreditsModal }),

      // 2D or 3D
      renderMode: '3D',
      setRenderMode: (mode) => set({ renderMode: mode }),

      zoomLevel: 0,
      setZoomLevel: (level) => set({ zoomLevel: level }),

      renderUniqueGameSceneRange: 2,
      setRenderUniqueGameSceneRange: (range) => set({ renderUniqueGameSceneRange: range }),

      devDebug: false,
      setDevDebug: (value) => set({ devDebug: value }),
      toggleDevDebug: () => set({ devDebug: !get().devDebug }),

      sidebar: true,
      setSidebar: (value) => set({ sidebar: value }),
      toggleSidebar: () => set({ sidebar: !get().sidebar }),

      showMenu: false,
      setShowMenu: (value) => set({ showMenu: value }),
      toggleShowMenu: () => set({ showMenu: !get().showMenu }),

      audioSettings: {
        enabled: false,
        // Stored as number from 0 to 100 and converted to 0 to 1 in AudioHandler
        game_volume: 50,
        music_volume: 50,
      },
      setAudioSettings: (settings) => set({ audioSettings: settings }),

      controlSettings: {
        "Move 1 Space": false,
        "Move 2 Space": false,
        "Move 3 Space": false,
        "Move 4 Space": false,
      },
      setControlSettings: (settings) => set({ controlSettings: settings }),

      // Automates end of game and starting new ones for hands off arcade fun
      arcadeMode: false,
      setArcadeMode: (arcadeMode) => set({ arcadeMode }),

      // Toontown mode changes graphics to be more ToonTown like
      toontownMode: false,
      setToontownMode: (toontownMode) => set({ toontownMode }),

      character: {
        model: 'Duck',
        color: '#FFD801'
      },
      setCharacter: (character) => set({ character }),

      nickname: "",
      setNickname: (nickname) => set({ nickname }),

      gameState: {},
      setGameState: (gameState) => set({ gameState }),

      kicked: null,
      setKicked: (reason) => set({ kicked: reason }),

      socketServerHost: process.env.NEXT_PUBLIC_NODE_SERVER,
      setSocketServerHost: (host) => set({ socketServerHost: host }),

      reset: () => {
        set(store.getInitialState())
      },

    }),
    {
      name: 'games-showcase-storage', // name of the item in the storage (must be unique)
      version: 1,
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)