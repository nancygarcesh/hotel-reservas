export type RoomStatus = 'libre' | 'ocupada' | 'mantenimiento' | 'reservada'
export type RoomType = string

export interface Room {
  id: number
  room_number: string
  type: string
  capacity: number
  price_per_night: number
  description: string | null
  amenities: string | null
  images: string | null
  status: RoomStatus
  created_at: string
  updated_at: string
}

export interface RoomFilters {
  status?: RoomStatus
  type?: string
  capacity?: number
  minPrice?: number
  maxPrice?: number
  start_date?: string
  end_date?: string
}

export interface CreateRoomData {
  room_number: string
  type: string
  capacity: number
  price_per_night: number
  description?: string
  amenities?: string
  images?: File[]
}

export interface UpdateRoomData extends Partial<CreateRoomData> {
  status?: RoomStatus
}