import { api } from './api'
import { AuthResponse, LoginCredentials, RegisterData, User } from '@/types'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },

  async register(data: RegisterData): Promise<User> {
    const response = await api.post<User>('/auth/register', data)
    return response.data
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>('/users/me')
    return response.data
  },

  logout(): void {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }
}