import { create } from 'zustand'
import { AxiosError } from 'axios'
import { Reservation, CreateReservationData, UpdateReservationData } from '@/types'
import { reservationService } from '@/services/reservationService'

interface ApiError {
  message: string
}

const getErrorMessage = (error: unknown, defaultMsg: string): string => {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<ApiError>
    return axiosError.response?.data?.message || defaultMsg
  }

  return defaultMsg
}

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

export const useReservationStore = create<ReservationStore>((set) => ({

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

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al cargar reservas'),
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

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al cargar tus reservas'),
        isLoading: false
      })
    }
  },

  fetchReservationById: async (id: number) => {
    try {
      set({ isLoading: true, error: null })

      const reservation = await reservationService.getReservationById(id)

      set({
        currentReservation: reservation,
        isLoading: false
      })

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al cargar reserva'),
        isLoading: false
      })
    }
  },

  createReservation: async (data: CreateReservationData) => {
    try {
      set({ isLoading: true, error: null })

      const newReservation = await reservationService.createReservation(data)

      set((state) => ({
        reservations: [...state.reservations, newReservation],
        totalReservations: state.totalReservations + 1,
        isLoading: false
      }))

      return newReservation

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al crear reserva'),
        isLoading: false
      })
      throw error
    }
  },

  updateReservation: async (id: number, data: UpdateReservationData) => {
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

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al actualizar reserva'),
        isLoading: false
      })
      throw error
    }
  },

  deleteReservation: async (id: number) => {
    try {
      set({ isLoading: true, error: null })

      await reservationService.deleteReservation(id)

      set((state) => ({
        reservations: state.reservations.filter(res => res.id !== id),
        totalReservations: state.totalReservations - 1,
        isLoading: false
      }))

    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, 'Error al eliminar reserva'),
        isLoading: false
      })
      throw error
    }
  },

  checkAvailability: async (roomId: number, startDate: string, endDate: string) => {
    try {
      return await reservationService.checkAvailability(roomId, startDate, endDate)
    } catch {
      return false
    }
  },

  clearCurrentReservation: () => set({ currentReservation: null }),

  setError: (error: string | null) => set({ error })

}))