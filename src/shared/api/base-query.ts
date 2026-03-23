import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '../config/env'

export const baseQuery = fetchBaseQuery({
  baseUrl: `${env.apiBaseUrl}${env.apiV1Prefix}`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

