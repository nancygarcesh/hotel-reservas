import { api, handleApiError } from './api'
import { User, UpdateUserData } from '@/types'

export const userService = {
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await api.get<User[]>('/users')
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async getUserById(id: number): Promise<User> {
    try {
      const response = await api.get<User>(`/users/${id}`)
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async getMyProfile(): Promise<User> {
    try {
      const response = await api.get<User>('/users/me')
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async updateUser(id: number, data: UpdateUserData): Promise<User> {
    try {
      const response = await api.put<User>(`/users/${id}`, data)
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async deleteUser(id: number): Promise<void> {
    try {
      await api.delete(`/users/${id}`)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }
}