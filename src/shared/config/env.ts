const normalizeBaseUrl = (value: string) => value.replace(/\/+$/, '')

const isDev = import.meta.env.DEV

export const env = {
    apiBaseUrl: isDev ? '' : normalizeBaseUrl(String(import.meta.env.VITE_API_URL ?? '')),
    apiV1Prefix: '/api/v1',
}

