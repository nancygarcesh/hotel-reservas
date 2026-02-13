import { api, handleApiError } from './api'
import { Room, RoomFilters, CreateRoomData, UpdateRoomData } from '@/types'

export const roomService = {
  async getRooms(filters?: RoomFilters): Promise<Room[]> {
    try {
      const response = await api.get<Room[]>('/rooms', { params: filters })
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async getRoomById(id: number): Promise<Room> {
    try {
      const response = await api.get<Room>(`/rooms/${id}`)
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async createRoom(data: CreateRoomData): Promise<Room> {
    try {
      const formData = new FormData()
      
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'images' && Array.isArray(value)) {
          value.forEach((file: File) => {
            formData.append('images', file)
          })
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      const response = await api.post<Room>('/rooms', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async updateRoom(id: number, data: UpdateRoomData): Promise<Room> {
    try {
      const formData = new FormData()
      
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'images' && Array.isArray(value)) {
          value.forEach((file: File) => {
            formData.append('images', file)
          })
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      const response = await api.put<Room>(`/rooms/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async deleteRoom(id: number): Promise<void> {
    try {
      await api.delete(`/rooms/${id}`)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }
}