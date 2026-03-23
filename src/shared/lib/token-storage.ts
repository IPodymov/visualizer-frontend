import Cookies from 'js-cookie'

const AUTH_TOKEN_KEY = 'auth_token'

export const tokenStorage = {
    getToken: () => Cookies.get(AUTH_TOKEN_KEY),
    setToken: (token: string) => Cookies.set(AUTH_TOKEN_KEY, token, { sameSite: 'strict', secure: window.location.protocol === 'https:' }), // Only use secure cookies on HTTPS
    clearToken: () => Cookies.remove(AUTH_TOKEN_KEY),
}