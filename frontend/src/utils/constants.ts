export const ROLES = {
  ADMIN: 'ADMIN',
  TRABAJADOR: 'TRABAJADOR',
  CLIENTE: 'CLIENTE'
} as const

export const ROOM_STATUS = {
  LIBRE: 'libre',
  OCUPADA: 'ocupada',
  MANTENIMIENTO: 'mantenimiento',
  RESERVADA: 'reservada'
} as const

export const RESERVATION_STATUS = {
  PENDIENTE: 'pendiente',
  CONFIRMADA: 'confirmada',
  CANCELADA: 'cancelada',
  COMPLETADA: 'completada'
} as const

export const ROOM_TYPES = [
  'individual',
  'doble',
  'suite',
  'familiar',
  'presidencial'
] as const

export const AMENITIES = [
  'wifi',
  'tv',
  'aire acondicionado',
  'calefaccion',
  'caja fuerte',
  'minibar',
  'cafetera',
  'escritorio',
  'jacuzzi',
  'vista al mar',
  'vista a la montaña',
  'balcon',
  'terraza',
  'cocina'
] as const

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Hotel Reservation System'
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export const DATE_FORMAT = 'yyyy-MM-dd'
export const DISPLAY_DATE_FORMAT = 'dd/MM/yyyy'
export const DISPLAY_DATETIME_FORMAT = 'dd/MM/yyyy HH:mm'