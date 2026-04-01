const normalizeBaseUrl = (value: string) => value.replace(/\/+$/, '')

export const env = {
    apiBaseUrl: normalizeBaseUrl(import.meta.env.VITE_API_URL ?? ''),
    apiV1Prefix: '/api/v1',
}

