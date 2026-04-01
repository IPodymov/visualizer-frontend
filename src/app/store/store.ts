import { configureStore } from '@reduxjs/toolkit'
import { planApi } from '@/entities/plan'
import { userPreferencesSlice } from '@/features/user-preferences/model/slice'

export const store = configureStore({
  reducer: {
    [planApi.reducerPath]: planApi.reducer,
    [userPreferencesSlice.name]: userPreferencesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(planApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

