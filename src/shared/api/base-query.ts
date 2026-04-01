import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '@/shared/config/env'
import { tokenStorage } from '@/shared/lib/token-storage'

export const baseQuery = fetchBaseQuery({
  baseUrl: `${env.apiBaseUrl}${env.apiV1Prefix}`,
  prepareHeaders: (headers) => {
    const token = tokenStorage.getToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

