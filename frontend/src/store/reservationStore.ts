import { create } from 'zustand'
import { Reservation, CreateReservationData, UpdateReservationData } from '@/types'
import { reservationService } from '@/services/reservationService'

interface ReservationStore {
  reservations: Reservation[]
  currentReservation: Reservation | null
  isLoading: boolean
  error: string | null
  totalReservations: number

  fetchReservations: () => Promise<void>
  fetchMyReservations: () => Promise<void>
  fetchReservationById: (id: number) => Promise<void>
  createReservation: (data: CreateReservationData) => Promise<Reservation>
  updateReservation: (id: number, data: UpdateReservationData) => Promise<Reservation>
  deleteReservation: (id: number) => Promise<void>
  checkAvailability: (roomId: number, startDate: string, endDate: string) => Promise<boolean>
  clearCurrentReservation: () => void
  setError: (error: string | null) => void
}

export const useReservationStore = create<ReservationStore>((set, get) => ({
  reservations: [],
  currentReservation: null,
  isLoading: false,
  error: null,
  totalReservations: 0,

  fetchReservations: async () => {
    try {
      set({ isLoading: true, error: null })
      const reservations = await reservationService.getAllReservations()
      set({ 
        reservations, 
        totalReservations: reservations.length,
        isLoading: false 
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al cargar reservas',
        isLoading: false 
      })
    }
  },

  fetchMyReservations: async () => {
    try {
      set({ isLoading: true, error: null })
      const reservations = await reservationService.getMyReservations()
      set({ 
        reservations, 
        totalReservations: reservations.length,
        isLoading: false 
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al cargar tus reservas',
        isLoading: false 
      })
    }
  },

  fetchReservationById: async (id) => {
    try {
      set({ isLoading: true, error: null })
      const reservation = await reservationService.getReservationById(id)
      set({ currentReservation: reservation, isLoading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al cargar reserva',
        isLoading: false 
      })
    }
  },

  createReservation: async (data) => {
    try {
      set({ isLoading: true, error: null })
      const newReservation = await reservationService.createReservation(data)
      set((state) => ({
        reservations: [...state.reservations, newReservation],
        totalReservations: state.totalReservations + 1,
        isLoading: false
      }))
      return newReservation
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al crear reserva',
        isLoading: false 
      })
      throw error
    }
  },

  updateReservation: async (id, data) => {
    try {
      set({ isLoading: true, error: null })
      const updatedReservation = await reservationService.updateReservation(id, data)
      set((state) => ({
        reservations: state.reservations.map(reservation => 
          reservation.id === id ? updatedReservation : reservation
        ),
        currentReservation: updatedReservation,
        isLoading: false
      }))
      return updatedReservation
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al actualizar reserva',
        isLoading: false 
      })
      throw error
    }
  },

  deleteReservation: async (id) => {
    try {
      set({ isLoading: true, error: null })
      await reservationService.deleteReservation(id)
      set((state) => ({
        reservations: state.reservations.filter(reservation => reservation.id !== id),
        totalReservations: state.totalReservations - 1,
        isLoading: false
      }))
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Error al eliminar reserva',
        isLoading: false 
      })
      throw error
    }
  },

  checkAvailability: async (roomId, startDate, endDate) => {
    try {
      return await reservationService.checkAvailability(roomId, startDate, endDate)
    } catch (error) {
      return false
    }
  },

  clearCurrentReservation: () => set({ currentReservation: null }),
  setError: (error) => set({ error })
}))