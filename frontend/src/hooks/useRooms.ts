import { useRoomStore } from '@/store/roomStore'
import { useEffect } from 'react'
import { RoomFilters } from '@/types'

export const useRooms = (initialFilters?: RoomFilters) => {
  const { 
    rooms,
    currentRoom,
    isLoading,
    error,
    filters,
    fetchRooms,
    fetchRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    setFilters,
    clearFilters,
    clearCurrentRoom,
    setError
  } = useRoomStore()

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters)
    }
  }, [initialFilters])

  return {
    rooms,
    currentRoom,
    isLoading,
    error,
    filters,
    fetchRooms,
    fetchRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    setFilters,
    clearFilters,
    clearCurrentRoom,
    setError
  }
}