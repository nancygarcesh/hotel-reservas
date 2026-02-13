import React from 'react'
import { Link } from 'react-router-dom'
import { Room } from '@/types'
import { formatCurrency, truncateText } from '@/utils/helpers'
import { Badge, BadgeProps } from '../ui/Badge'
import { Button } from '../ui/Button'

interface RoomCardProps {
  room: Room
  isAdmin?: boolean
  onDelete?: (id: number) => void
  onEdit?: (id: number) => void
}

type BadgeVariant = NonNullable<BadgeProps['variant']>

const statusColors: Record<Room['status'], BadgeVariant> = {
  libre: 'success',
  ocupada: 'danger',
  mantenimiento: 'warning',
  reservada: 'info'
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  isAdmin = false,
  onDelete,
  onEdit
}) => {

  const firstImage = room.images?.split(',')[0]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      
      <div className="relative h-48 overflow-hidden">
        <img
          src={firstImage ? `http://localhost:4000/${firstImage}` : '/default-room.jpg'}
          alt={`Habitación ${room.room_number}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />

        <div className="absolute top-2 right-2">
          <Badge variant={statusColors[room.status]}>
            {room.status}
          </Badge>
        </div>
      </div>

      <div className="p-4">

        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Habitación {room.room_number}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              {room.type} • {room.capacity}{' '}
              {room.capacity === 1 ? 'persona' : 'personas'}
            </p>
          </div>

          <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
            {formatCurrency(Number(room.price_per_night))}
            <span className="text-sm font-normal text-gray-500">
              /noche
            </span>
          </p>
        </div>

        {room.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {truncateText(room.description, 100)}
          </p>
        )}

        {room.amenities && (
          <div className="flex flex-wrap gap-1 mb-4">

            {room.amenities
              .split(',')
              .slice(0, 3)
              .map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                >
                  {amenity.trim()}
                </span>
              ))}

            {room.amenities.split(',').length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                +{room.amenities.split(',').length - 3}
              </span>
            )}

          </div>
        )}

        <div className="flex gap-2">

          <Link to={`/rooms/${room.id}`} className="flex-1">
            <Button variant="secondary" fullWidth>
              Ver detalles
            </Button>
          </Link>

          {isAdmin && (
            <>
              <Button
                variant="ghost"
                onClick={() => onEdit?.(room.id)}
                className="px-3"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </Button>

              <Button
                variant="danger"
                onClick={() => onDelete?.(room.id)}
                className="px-3"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </Button>
            </>
          )}

        </div>

      </div>
    </div>
  )
}