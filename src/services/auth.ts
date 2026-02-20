import api from './api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },
}

