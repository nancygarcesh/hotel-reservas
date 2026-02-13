import { 
  format, 
  parseISO, 
  differenceInDays, 
  addDays, 
  isBefore, 
  isAfter, 
  isSameDay 
} from 'date-fns'
import { es } from 'date-fns/locale'

export const formatDate = (date: string | Date, formatStr: string = 'dd/MM/yyyy'): string => {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, formatStr, { locale: es })
}

export const formatDateISO = (date: Date): string => {
  return format(date, 'yyyy-MM-dd')
}

export const calculateNights = (startDate: string, endDate: string): number => {
  const start = parseISO(startDate)
  const end = parseISO(endDate)
  return differenceInDays(end, start)
}

export const getDateRange = (startDate: string, endDate: string): Date[] => {
  const dates: Date[] = []
  let currentDate = parseISO(startDate)
  const end = parseISO(endDate)
  
  while (isBefore(currentDate, end) || isSameDay(currentDate, end)) {
    dates.push(currentDate)
    currentDate = addDays(currentDate, 1)
  }
  
  return dates
}

export const isDateInRange = (date: Date, start: string, end: string): boolean => {
  const startDate = parseISO(start)
  const endDate = parseISO(end)
  return (
    (isAfter(date, startDate) || isSameDay(date, startDate)) &&
    (isBefore(date, endDate) || isSameDay(date, endDate))
  )
}

export const getMonthName = (date: Date): string => {
  return format(date, 'MMMM yyyy', { locale: es })
}

export const getDayName = (date: Date): string => {
  return format(date, 'EEEE', { locale: es })
}

export const getAvailableDates = (
  blockedDates: string[],
  startDate?: Date,
  endDate?: Date
): Date[] => {
  const dates: Date[] = []
  const start = startDate || new Date()
  const end = endDate || addDays(start, 30)
  
  let current = start
  while (isBefore(current, end)) {
    const dateStr = formatDateISO(current)
    if (!blockedDates.includes(dateStr)) {
      dates.push(current)
    }
    current = addDays(current, 1)
  }
  
  return dates
}

export const validateDateRange = (
  startDate: string,
  endDate: string
): { valid: boolean; message?: string } => {
  const start = parseISO(startDate)
  const end = parseISO(endDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (isBefore(start, today)) {
    return { valid: false, message: 'La fecha de inicio no puede ser anterior a hoy' }
  }

  if (isBefore(end, start) || isSameDay(end, start)) {
    return { valid: false, message: 'La fecha de fin debe ser posterior a la fecha de inicio' }
  }

  const nights = differenceInDays(end, start)
  if (nights > 30) {
    return { valid: false, message: 'No se pueden reservar más de 30 noches' }
  }

  return { valid: true }
}