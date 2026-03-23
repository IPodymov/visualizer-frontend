import { env } from '../config/env'

type RequestConfig = Omit<RequestInit, 'body'> & {
  body?: BodyInit | null
}

export class ApiError extends Error {
  public readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const buildUrl = (path: string) => {
  return `${env.apiBaseUrl}${env.apiV1Prefix}${path}`
}

export const http = async <T>(path: string, config: RequestConfig = {}): Promise<T> => {
  const response = await fetch(buildUrl(path), {
    ...config,
    headers: {
      Accept: 'application/json',
      ...(config.headers ?? {}),
    },
    credentials: 'include',
  })

  if (!response.ok) {
    const fallbackError = `Request failed with status ${response.status}`
    const payload = await response.json().catch(() => null) as { detail?: string } | null
    throw new ApiError(payload?.detail ?? fallbackError, response.status)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

