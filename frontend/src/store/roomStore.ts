import { create } from 'zustand'
import { AxiosError } from 'axios'
import { Room, RoomFilters, CreateRoomData, UpdateRoomData } from '@/types'
import { roomService } from '@/services/roomService'

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

interface RoomStore {
  rooms: Room[]
  currentRoom: Room | null
  isLoading: boolean
  error: string | null
  totalRooms: number
  filters: RoomFilters

  fetchRooms: (filters?: RoomFilters) => Promise<void>
  fetchRoomById: (id: number) => Promise<void>
  createRoom: (data: CreateRoomData) => Promise<Room>
  updateRoom: (id: number, data: UpdateRoomData) => Promise<Room>
  deleteRoom: (id: number) => Promise<void>
  setFilters: (filters: RoomFilters) => void
  clearFilters: () => void
  clearCurrentRoom: () => void
  setError: (error: string | null) => void
}

export const useRoomStore = create<RoomStore>((set, get) => ({

  rooms: [],
  currentRoom: null,
  isLoading: false,
  error: null,
  totalRooms: 0,
  filters: {},

  fetchRooms: async (filters?: RoomFilters) => {
    try {
      set({ isLoading: true, error: null })

      const currentFilters = filters || get().filters
      const response = await roomService.getRooms(currentFilters)

      set({
        rooms: response,
        totalRooms: response.length,
        isLoading: false,
        filters: currentFilters
      })

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al cargar habitaciones'),
        isLoading: false
      })
    }
  },

  fetchRoomById: async (id: number) => {
    try {
      set({ isLoading: true, error: null })

      const room = await roomService.getRoomById(id)

      set({
        currentRoom: room,
        isLoading: false
      })

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al cargar habitación'),
        isLoading: false
      })
    }
  },

  createRoom: async (data: CreateRoomData) => {
    try {
      set({ isLoading: true, error: null })

      const newRoom = await roomService.createRoom(data)

      set((state) => ({
        rooms: [...state.rooms, newRoom],
        totalRooms: state.totalRooms + 1,
        isLoading: false
      }))

      return newRoom

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al crear habitación'),
        isLoading: false
      })
      throw error
    }
  },

  updateRoom: async (id: number, data: UpdateRoomData) => {
    try {
      set({ isLoading: true, error: null })

      const updatedRoom = await roomService.updateRoom(id, data)

      set((state) => ({
        rooms: state.rooms.map(room =>
          room.id === id ? updatedRoom : room
        ),
        currentRoom: updatedRoom,
        isLoading: false
      }))

      return updatedRoom

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al actualizar habitación'),
        isLoading: false
      })
      throw error
    }
  },

  deleteRoom: async (id: number) => {
    try {
      set({ isLoading: true, error: null })

      await roomService.deleteRoom(id)

      set((state) => ({
        rooms: state.rooms.filter(room => room.id !== id),
        totalRooms: state.totalRooms - 1,
        isLoading: false
      }))

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al eliminar habitación'),
        isLoading: false
      })
      throw error
    }
  },

  setFilters: (filters: RoomFilters) => set({ filters }),

  clearFilters: () => set({ filters: {} }),

  clearCurrentRoom: () => set({ currentRoom: null }),

  setError: (error: string | null) => set({ error })

}))
