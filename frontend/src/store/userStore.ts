import { create } from 'zustand'
import { User, UpdateUserData } from '@/types'
import { userService } from '@/services/userService'

interface UserStore {
  users: User[]
  currentUser: User | null
  isLoading: boolean
  error: string | null
  totalUsers: number

  fetchUsers: () => Promise<void>
  fetchUserById: (id: number) => Promise<void>
  updateUser: (id: number, data: UpdateUserData) => Promise<User>
  deleteUser: (id: number) => Promise<void>
  clearCurrentUser: () => void
  setError: (error: string | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
  totalUsers: 0,

  fetchUsers: async () => {
    try {
      set({ isLoading: true, error: null })
      const users = await userService.getAllUsers()
      set({ 
        users, 
        totalUsers: users.length,
        isLoading: false 
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al cargar usuarios',
        isLoading: false 
      })
    }
  },

  fetchUserById: async (id) => {
    try {
      set({ isLoading: true, error: null })
      const user = await userService.getUserById(id)
      set({ currentUser: user, isLoading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al cargar usuario',
        isLoading: false 
      })
    }
  },

  updateUser: async (id, data) => {
    try {
      set({ isLoading: true, error: null })
      const updatedUser = await userService.updateUser(id, data)
      set((state) => ({
        users: state.users.map(user => 
          user.id === id ? updatedUser : user
        ),
        currentUser: updatedUser,
        isLoading: false
      }))
      return updatedUser
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al actualizar usuario',
        isLoading: false 
      })
      throw error
    }
  },

  deleteUser: async (id) => {
    try {
      set({ isLoading: true, error: null })
      await userService.deleteUser(id)
      set((state) => ({
        users: state.users.filter(user => user.id !== id),
        totalUsers: state.totalUsers - 1,
        isLoading: false
      }))
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al eliminar usuario',
        isLoading: false 
      })
      throw error
    }
  },

  clearCurrentUser: () => set({ currentUser: null }),
  setError: (error) => set({ error })
}))