import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, User, LoginCredentials, RegisterData } from '@/types'
import { authService } from '@/services/authService'
import { api } from '@/services/api'

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  setUser: (user: User | null) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null })
          const response = await authService.login(credentials)
          const { token, user } = response
          
          localStorage.setItem('token', token)
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          })
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Error al iniciar sesión',
            isLoading: false,
            isAuthenticated: false 
          })
          throw error
        }
      },

      register: async (data) => {
        try {
          set({ isLoading: true, error: null })
          await authService.register(data)
          set({ isLoading: false })
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Error al registrar usuario',
            isLoading: false 
          })
          throw error
        }
      },

      logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('auth-storage')
        delete api.defaults.headers.common['Authorization']
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false, 
          isLoading: false,
          error: null 
        })
      },

      checkAuth: async () => {
        const token = localStorage.getItem('token')
        const storedState = localStorage.getItem('auth-storage')
        
        if (!token) {
          set({ isAuthenticated: false, user: null, token: null, isLoading: false })
          return
        }

        try {
          set({ isLoading: true })
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          const user = await authService.getProfile()
          
          if (storedState) {
            const parsed = JSON.parse(storedState)
            set({ 
              user, 
              token: parsed.state.token,
              isAuthenticated: true, 
              isLoading: false 
            })
          }
        } catch (error) {
          localStorage.removeItem('token')
          delete api.defaults.headers.common['Authorization']
          set({ 
            isAuthenticated: false, 
            user: null, 
            token: null, 
            isLoading: false 
          })
        }
      },

      setUser: (user) => set({ user }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)