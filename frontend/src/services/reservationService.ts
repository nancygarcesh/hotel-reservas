import { api, handleApiError } from './api'
import { Reservation, CreateReservationData, UpdateReservationData } from '@/types'

export const reservationService = {
  async getAllReservations(): Promise<Reservation[]> {
    try {
      const response = await api.get<Reservation[]>('/reservations')
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async getMyReservations(): Promise<Reservation[]> {
    try {
      const response = await api.get<Reservation[]>('/reservations/my')
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async getReservationById(id: number): Promise<Reservation> {
    try {
      const response = await api.get<Reservation>(`/reservations/${id}`)
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async createReservation(data: CreateReservationData): Promise<Reservation> {
    try {
      const response = await api.post<Reservation>('/reservations', data)
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async updateReservation(id: number, data: UpdateReservationData): Promise<Reservation> {
    try {
      const response = await api.put<Reservation>(`/reservations/${id}`, data)
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async deleteReservation(id: number): Promise<void> {
    try {
      await api.delete(`/reservations/${id}`)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async checkAvailability(roomId: number, startDate: string, endDate: string): Promise<boolean> {
    try {
      const response = await api.get('/reservations/check-availability', {
        params: { roomId, startDate, endDate }
      })
      return response.data.available
    } catch (error) {
      return false
    }
  }
}