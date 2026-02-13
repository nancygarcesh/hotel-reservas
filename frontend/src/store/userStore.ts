import { create } from 'zustand'
import { AxiosError } from 'axios'
import { User, UpdateUserData } from '@/types'
import { userService } from '@/services/userService'

interface ApiError {
  message: string
}

const getErrorMessage = (error: unknown, defaultMsg: string): string => {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data as ApiError
    return data.message || defaultMsg
  }
  return defaultMsg
}

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

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al cargar usuarios'),
        isLoading: false
      })
    }
  },

  fetchUserById: async (id: number) => {
    try {
      set({ isLoading: true, error: null })

      const user = await userService.getUserById(id)

      set({
        currentUser: user,
        isLoading: false
      })

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al cargar usuario'),
        isLoading: false
      })
    }
  },

  updateUser: async (id: number, data: UpdateUserData) => {
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

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al actualizar usuario'),
        isLoading: false
      })
      throw error
    }
  },

  deleteUser: async (id: number) => {
    try {
      set({ isLoading: true, error: null })

      await userService.deleteUser(id)

      set((state) => ({
        users: state.users.filter(user => user.id !== id),
        totalUsers: state.totalUsers - 1,
        isLoading: false
      }))

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al eliminar usuario'),
        isLoading: false
      })
      throw error
    }
  },

  clearCurrentUser: () => set({ currentUser: null }),

  setError: (error: string | null) => set({ error })

}))