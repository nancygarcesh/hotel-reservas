import React, { useEffect } from 'react'
import { useRooms } from '@/hooks/useRooms'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { RoomCard } from './RoomCard'
import { RoomFilters } from './RoomFilters'
import { Loader } from '../common/Loader'
import { RoomCardSkeleton } from '../common/Skeleton'
import { ConfirmModal } from '../common/Modal'

export const RoomList: React.FC = () => {
  const { rooms, isLoading, error, fetchRooms, deleteRoom } = useRooms()
  const { isAdmin, isTrabajador } = useAuth()
  const { showSuccess, showError } = useToast()
  const [roomToDelete, setRoomToDelete] = React.useState<number | null>(null)

  useEffect(() => {
    fetchRooms()
  }, [])

  const handleDelete = async () => {
    if (!roomToDelete) return

    try {
      await deleteRoom(roomToDelete)
      showSuccess('Habitación eliminada exitosamente')
      setRoomToDelete(null)
    } catch (error) {
      showError('Error al eliminar la habitación')
    }
  }

  const canEdit = isAdmin() || isTrabajador()

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button
          onClick={() => fetchRooms()}
          className="mt-4 text-primary-600 hover:text-primary-700"
        >
          Intentar nuevamente
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <RoomFilters />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <RoomCardSkeleton key={i} />
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No se encontraron habitaciones
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              isAdmin={canEdit}
              onEdit={(id) => window.location.href = `/rooms/edit/${id}`}
              onDelete={setRoomToDelete}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!roomToDelete}
        onClose={() => setRoomToDelete(null)}
        onConfirm={handleDelete}
        title="Eliminar habitación"
        message="¿Estás seguro de que deseas eliminar esta habitación? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        variant="danger"
      />
    </div>
  )
}