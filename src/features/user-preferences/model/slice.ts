import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AcademicPlan } from '../../../entities/plan/model/types'

// We store the full plan object + specialty name for offline/fast access
export interface FavoritePlan extends AcademicPlan {
  specialtyName?: string
}

interface UserPreferencesState {
  favorites: FavoritePlan[]
  history: FavoritePlan[]
}

// Load initial state from localStorage if available
const loadState = (): UserPreferencesState => {
  try {
    const serializedState = localStorage.getItem('user_preferences')
    if (serializedState === null) {
      return { favorites: [], history: [] }
    }
    return JSON.parse(serializedState)
  } catch {
    return { favorites: [], history: [] }
  }
}

const initialState: UserPreferencesState = loadState()

export const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoritePlan>) => {
      const exists = state.favorites.some((p) => p.id === action.payload.id)
      if (!exists) {
        state.favorites.push(action.payload)
        localStorage.setItem('user_preferences', JSON.stringify(state))
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((p) => p.id !== action.payload)
      localStorage.setItem('user_preferences', JSON.stringify(state))
    },
    addToHistory: (state, action: PayloadAction<FavoritePlan>) => {
        // Remove if exists to move to top
        const existingIndex = state.history.findIndex((p) => p.id === action.payload.id)
        if (existingIndex !== -1) {
            state.history.splice(existingIndex, 1)
        }
        // Add to beginning
        state.history.unshift(action.payload)
        // Limit to 10
        if (state.history.length > 10) {
            state.history.pop()
        }
        localStorage.setItem('user_preferences', JSON.stringify(state))
    },
    clearHistory: (state) => {
        state.history = []
        localStorage.setItem('user_preferences', JSON.stringify(state))
    }
  },
  selectors: {
    selectFavorites: (state) => state.favorites,
    selectHistory: (state) => state.history,
    selectIsFavorite: (state, planId: number) => state.favorites.some((p) => p.id === planId),
  }
})

export const { addFavorite, removeFavorite, addToHistory, clearHistory } = userPreferencesSlice.actions
export const { selectFavorites, selectHistory, selectIsFavorite } = userPreferencesSlice.selectors
