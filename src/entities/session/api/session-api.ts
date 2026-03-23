import {http} from '../../../shared/api/http'
import type {LoginPayload, RegisterPayload, TokenResponse, User} from '../model/types'

type RegisterRequest = {
    email: string
    password: string
    full_name: string
}

const withAuthHeader = (token: string | null): Record<string, string> => {
    return token ? {Authorization: `Bearer ${token}`} : {}
}

export const sessionApi = {
    login: async ({email, password}: LoginPayload) => {
        const body = new URLSearchParams({
            username: email,
            password,
        })

        return http<TokenResponse>('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
        })
    },
    register: async ({email, password, fullName}: RegisterPayload) => {
        const payload: RegisterRequest = {
            email,
            password,
            full_name: fullName,
        }

        return http<User>('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
    },
    getMe: async (token: string | null) => {
        return http<User>('/users/me', {
            method: 'GET',
            headers: withAuthHeader(token),
        })
    },
    logout: async (token: string | null) => {
        return http<{ message: string }>('/auth/logout', {
            method: 'POST',
            headers: withAuthHeader(token),
        })
    },
}

