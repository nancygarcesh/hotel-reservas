export interface User {
  id: number
  uuid: string
  name: string
  email: string
  phone: string | null
  role_id: number
  created_at: string
  updated_at: string
  Role?: Role
}

export interface Role {
  id: number
  name: 'ADMIN' | 'TRABAJADOR' | 'CLIENTE'
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}