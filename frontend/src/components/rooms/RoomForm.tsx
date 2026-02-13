import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRooms } from '@/hooks/useRooms'
import { useToast } from '@/hooks/useToast'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { ROOM_TYPES, AMENITIES, ROOM_STATUS } from '@/utils/constants'
import { roomSchema } from '@/utils/validators'
import { Room } from '@/types'
import clsx from 'clsx'

const cn = clsx

interface RoomFormProps {
  initialData?: Room
  isEditing?: boolean
}

export const RoomForm: React.FC<RoomFormProps> = ({ initialData, isEditing = false }) => {
  const navigate = useNavigate()
  const { createRoom, updateRoom, isLoading } = useRooms()
  const { showSuccess, showError } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    room_number: initialData?.room_number || '',
    type: initialData?.type || '',
    capacity: initialData?.capacity || 1,
    price_per_night: initialData?.price_per_night || 0,
    description: initialData?.description || '',
    amenities: initialData?.amenities || '',
    status: initialData?.status || 'libre',
    images: [] as File[]
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    initialData?.amenities ? initialData.amenities.split(',') : []
  )
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    initialData?.images ? initialData.images.split(',').map(img => `http://localhost:4000/${img}`) : []
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (files.length + formData.images.length > 5) {
      showError('Máximo 5 imágenes permitidas')
      return
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }))

    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => {
      const newAmenities = prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
      
      setFormData(prev => ({
        ...prev,
        amenities: newAmenities.join(',')
      }))
      
      return newAmenities
    })
  }

  const validateForm = () => {
    const { error } = roomSchema.validate(formData)
    
    if (error) {
      const validationErrors: Record<string, string> = {}
      error.details.forEach(detail => {
        if (detail.path[0]) {
          validationErrors[detail.path[0] as string] = detail.message
        }
      })
      setErrors(validationErrors)
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      showError('Por favor, corrige los errores en el formulario')
      return
    }

    try {
      if (isEditing && initialData) {
        await updateRoom(initialData.id, formData)
        showSuccess('Habitación actualizada exitosamente')
      } else {
        await createRoom(formData)
        showSuccess('Habitación creada exitosamente')
      }
      navigate('/rooms')
    } catch (error) {
      showError(`Error al ${isEditing ? 'actualizar' : 'crear'} la habitación`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Número de habitación"
            name="room_number"
            value={formData.room_number}
            onChange={handleChange}
            error={errors.room_number}
            required
          />
        </div>

        <div>
          <Select
            label="Tipo"
            name="type"
            options={ROOM_TYPES.map(type => ({
              value: type,
              label: type.charAt(0).toUpperCase() + type.slice(1)
            }))}
            value={formData.type}
            onChange={handleChange}
            error={errors.type}
            required
          />
        </div>

        <div>
          <Input
            label="Capacidad"
            name="capacity"
            type="number"
            min="1"
            max="10"
            value={formData.capacity}
            onChange={handleChange}
            error={errors.capacity}
            required
          />
        </div>

        <div>
          <Input
            label="Precio por noche (€)"
            name="price_per_night"
            type="number"
            min="0"
            step="0.01"
            value={formData.price_per_night}
            onChange={handleChange}
            error={errors.price_per_night}
            required
          />
        </div>

        {isEditing && (
          <div>
            <Select
              label="Estado"
              name="status"
              options={Object.values(ROOM_STATUS).map(status => ({
                value: status,
                label: status.charAt(0).toUpperCase() + status.slice(1)
              }))}
              value={formData.status}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Descripción
        </label>
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          placeholder="Descripción de la habitación..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Amenities
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {AMENITIES.map((amenity) => (
            <button
              key={amenity}
              type="button"
              onClick={() => toggleAmenity(amenity)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg transition-colors',
                selectedAmenities.includes(amenity)
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              )}
            >
              {amenity}
            </button>
          ))}
        </div>
        {errors.amenities && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amenities}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Imágenes
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
          
          {imagePreviews.length < 5 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
            >
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="mt-1 text-xs text-gray-500">Agregar imagen</span>
            </button>
          )}
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Formatos permitidos: JPG, PNG, WEBP. Máximo 5MB por imagen. Máximo 5 imágenes.
        </p>
      </div>

      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate('/rooms')}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          {isEditing ? 'Actualizar' : 'Crear'} Habitación
        </Button>
      </div>
    </form>
  )
}