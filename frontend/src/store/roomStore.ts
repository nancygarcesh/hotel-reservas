import { create } from 'zustand'
import { Room, RoomFilters, CreateRoomData, UpdateRoomData } from '@/types'
import { roomService } from '@/services/roomService'

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

  fetchRooms: async (filters) => {
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
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al cargar habitaciones',
        isLoading: false 
      })
    }
  },

  fetchRoomById: async (id) => {
    try {
      set({ isLoading: true, error: null })
      const room = await roomService.getRoomById(id)
      set({ currentRoom: room, isLoading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al cargar habitación',
        isLoading: false 
      })
    }
  },

  createRoom: async (data) => {
    try {
      set({ isLoading: true, error: null })
      const newRoom = await roomService.createRoom(data)
      set((state) => ({ 
        rooms: [...state.rooms, newRoom],
        totalRooms: state.totalRooms + 1,
        isLoading: false 
      }))
      return newRoom
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al crear habitación',
        isLoading: false 
      })
      throw error
    }
  },

  updateRoom: async (id, data) => {
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
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al actualizar habitación',
        isLoading: false 
      })
      throw error
    }
  },

  deleteRoom: async (id) => {
    try {
      set({ isLoading: true, error: null })
      await roomService.deleteRoom(id)
      set((state) => ({
        rooms: state.rooms.filter(room => room.id !== id),
        totalRooms: state.totalRooms - 1,
        isLoading: false
      }))
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al eliminar habitación',
        isLoading: false 
      })
      throw error
    }
  },

  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: {} }),
  clearCurrentRoom: () => set({ currentRoom: null }),
  setError: (error) => set({ error })
}))