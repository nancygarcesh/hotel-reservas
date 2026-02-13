import { Room } from '@/types'
export type ReservationStatus = 'pendiente' | 'confirmada' | 'cancelada' | 'completada'

export interface Reservation {
  id: number
  user_id: number
  room_id: number
  start_date: string
  end_date: string
  status: ReservationStatus
  created_at: string
  User?: {
    id: number
    name: string
    email: string
  }
  Room?: Room
}

export interface CreateReservationData {
  room_id: number
  start_date: string
  end_date: string
}

export interface UpdateReservationData {
  start_date?: string
  end_date?: string
  status?: ReservationStatus
}

export interface AvailabilityCheck {
  room_id: number
  start_date: string
  end_date: string
}