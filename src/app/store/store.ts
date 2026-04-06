import { configureStore } from '@reduxjs/toolkit'
import { planApi } from '@/entities/plan'

export const store = configureStore({
  reducer: {
    [planApi.reducerPath]: planApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(planApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

