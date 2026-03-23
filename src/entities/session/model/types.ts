export type User = {
  id: number
  email: string
  full_name: string | null
  is_active: boolean
  role: string
}

export type TokenResponse = {
  access_token: string
  token_type: string
}

export type RegisterPayload = {
  email: string
  password: string
  fullName: string
}

export type LoginPayload = {
  email: string
  password: string
}

