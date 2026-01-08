//Favorite drivers/teams store

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favoriteDrivers: string[]      // Driver IDs
  favoriteTeams: string[]        // Constructor IDs
  addFavoriteDriver: (id: string) => void
  removeFavoriteDriver: (id: string) => void
  toggleFavoriteDriver: (id: string) => void
  addFavoriteTeam: (id: string) => void
  removeFavoriteTeam: (id: string) => void
  toggleFavoriteTeam: (id: string) => void
  isFavoriteDriver: (id: string) => boolean
  isFavoriteTeam: (id: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteDrivers: [],
      favoriteTeams: [],

      addFavoriteDriver: (id: string) =>
        set((state) => ({
          favoriteDrivers: state.favoriteDrivers.includes(id)
            ? state.favoriteDrivers
            : [...state.favoriteDrivers, id],
        })),

      removeFavoriteDriver: (id: string) =>
        set((state) => ({
          favoriteDrivers: state.favoriteDrivers.filter((driverId) => driverId !== id),
        })),

      toggleFavoriteDriver: (id: string) => {
        const { favoriteDrivers, addFavoriteDriver, removeFavoriteDriver } = get()
        if (favoriteDrivers.includes(id)) {
          removeFavoriteDriver(id)
        } else {
          addFavoriteDriver(id)
        }
      },

      addFavoriteTeam: (id: string) =>
        set((state) => ({
          favoriteTeams: state.favoriteTeams.includes(id)
            ? state.favoriteTeams
            : [...state.favoriteTeams, id],
        })),

      removeFavoriteTeam: (id: string) =>
        set((state) => ({
          favoriteTeams: state.favoriteTeams.filter((teamId) => teamId !== id),
        })),

      toggleFavoriteTeam: (id: string) => {
        const { favoriteTeams, addFavoriteTeam, removeFavoriteTeam } = get()
        if (favoriteTeams.includes(id)) {
          removeFavoriteTeam(id)
        } else {
          addFavoriteTeam(id)
        }
      },

      isFavoriteDriver: (id: string) => get().favoriteDrivers.includes(id),

      isFavoriteTeam: (id: string) => get().favoriteTeams.includes(id),
    }),
    {
      name: 'favorites',
    }
  )
)