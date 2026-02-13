import { useReservationStore } from '@/store/reservationStore'
import { useAuthStore } from '@/store/authStore'

export const useReservations = () => {
  const { 
    reservations,
    currentReservation,
    isLoading,
    error,
    fetchReservations,
    fetchMyReservations,
    fetchReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
    checkAvailability,
    clearCurrentReservation,
    setError
  } = useReservationStore()

  const { user } = useAuthStore()
  const isAdminOrTrabajador = user?.Role?.name === 'ADMIN' || user?.Role?.name === 'TRABAJADOR'

  const loadReservations = async () => {
    if (isAdminOrTrabajador) {
      await fetchReservations()
    } else {
      await fetchMyReservations()
    }
  }

  return {
    reservations,
    currentReservation,
    isLoading,
    error,
    loadReservations,
    fetchReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
    checkAvailability,
    clearCurrentReservation,
    setError
  }
}