import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/store/authStore'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor with retry logic
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        // Try to refresh token or just logout
        useAuthStore.getState().logout()
        window.location.href = '/login'
        return Promise.reject(error)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    
    if (error.response?.status === 403) {
      window.location.href = '/unauthorized'
    }
    
    if (error.response?.status === 404) {
      window.location.href = '/404'
    }
    
    if (error.response?.status === 500) {
      console.error('Server error:', error)
    }
    
    return Promise.reject(error)
  }
)

export const handleApiError = (error: any): string => {
  if (error.response) {
    return error.response.data?.message || 'Error en la petición'
  }
  if (error.request) {
    return 'No se pudo conectar al servidor'
  }
  return error.message || 'Error desconocido'
}