const DEFAULT_API_URL = 'https://visualizer-back-production.up.railway.app'

export const env = {
    apiBaseUrl: import.meta.env.VITE_API_URL ?? DEFAULT_API_URL,
    apiV1Prefix: '/api/v1',
}

