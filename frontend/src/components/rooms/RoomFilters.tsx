import React, { useState } from 'react'
import { useRooms } from '@/hooks/useRooms'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { ROOM_STATUS, ROOM_TYPES } from '@/utils/constants'

export const RoomFilters: React.FC = () => {
  const { filters, setFilters, clearFilters } = useRooms()

  type FiltersType = typeof filters

  const [localFilters, setLocalFilters] = useState<FiltersType>(filters)

  const handleChange = <K extends keyof FiltersType>(
    name: K,
    value: FiltersType[K]
  ) => {
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const applyFilters = () => {
    setFilters(localFilters)
  }

  const handleClear = () => {
    setLocalFilters({} as FiltersType)
    clearFilters()
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Filtrar habitaciones
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <Select
          label="Estado"
          options={[
            { value: '', label: 'Todos' },
            ...Object.values(ROOM_STATUS).map(status => ({
              value: status,
              label: status.charAt(0).toUpperCase() + status.slice(1)
            }))
          ]}
          value={localFilters.status || ''}
          onChange={(e) =>
                handleChange('status', (e.target.value || undefined) as typeof filters.status)
          }
        />

        <Select
          label="Tipo"
          options={[
            { value: '', label: 'Todos' },
            ...ROOM_TYPES.map(type => ({
              value: type,
              label: type.charAt(0).toUpperCase() + type.slice(1)
            }))
          ]}
          value={localFilters.type || ''}
          onChange={(e) =>
            handleChange('type', e.target.value || undefined)
          }
        />

        <Input
          label="Capacidad mínima"
          type="number"
          min="1"
          value={localFilters.capacity ?? ''}
          onChange={(e) =>
            handleChange(
              'capacity',
              e.target.value ? Number(e.target.value) : undefined
            )
          }
        />

        <div className="flex items-end gap-2">
          <Button onClick={applyFilters} variant="primary" className="flex-1">
            Aplicar
          </Button>

          <Button onClick={handleClear} variant="secondary">
            Limpiar
          </Button>
        </div>

      </div>
    </div>
  )
}