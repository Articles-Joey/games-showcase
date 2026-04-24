// import { create } from "zustand";
import { createWithEqualityFn as create } from 'zustand/traditional'
import { persist } from 'zustand/middleware'

const devDefault = false

export const useFilterStore = create(
    persist(
        (set) => ({

            playerFilter: "All",
            setPlayerFilter: (filter) => set({ playerFilter: filter }),

            search: '',
            setSearch: (search) => set({ search }),

            availabilityFilter: "Available",
            setAvailabilityFilter: (filter) => set({ availabilityFilter: filter }),

            filters: {
                launchers: {
                    'Articles': true,
                    'Steam': process.env.NODE_ENV === 'development' ? devDefault : false,
                    'Epic Games': process.env.NODE_ENV === 'development' ? devDefault : false,
                    'Itch.io': process.env.NODE_ENV === 'development' ? devDefault : false,
                    'GOG': process.env.NODE_ENV === 'development' ? devDefault : false,
                    // 'Custom': true,
                    'User': process.env.NODE_ENV === 'development' ? devDefault : false,
                },
            },
            setFilters: (filters) => set({ filters }),

        }),
        {
            name: 'ice-slide-filters',
            version: 0,
            partialize: (state) => ({
                playerFilter: state.playerFilter,
                availabilityFilter: state.availabilityFilter,
                search: state.search,
                filters: state.filters,
            }),
        }
    )
);