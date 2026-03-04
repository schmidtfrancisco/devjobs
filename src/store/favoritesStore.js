import { create } from "zustand";

export const useFavoritesStore = create((set, get) => ({
  favorites: [],

  addFavorite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.includes(jobId)
        ? state
        : [...state.favorites, jobId]
    }))
  },

  removeFavorite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== jobId)
    }))
  },

  isFavorite: (jobId) => {
    return get().favorites.includes(jobId)
  },

  toggleFavorite: (jobId) => {
    const { addFavorite, removeFavorite, isFavorite } = get()
    isFavorite(jobId) ? removeFavorite(jobId) : addFavorite(jobId)
  },

  clearFavorites: () => {
    set({ favorites: [] })
  },
  
  countFavorites: () => get().favorites.length
}))