import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { registerSchema } from '@/utils/validators'

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const { register, isLoading, error, clearError } = useAuth()
  const { showError, showSuccess } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateField = (name: string, value: string) => {
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden' }))
      } else {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.confirmPassword
          return newErrors
        })
      }
      return
    }

    const { error } = registerSchema.validate({ [name]: value })
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error.details[0].message }))
    } else {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
    if (error) clearError()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden' }))
      return
    }

    const { confirmPassword, ...registerData } = formData
    const { error } = registerSchema.validate(registerData)

    if (error) {
      const validationErrors: Record<string, string> = {}
      error.details.forEach(detail => {
        if (detail.path[0]) {
          validationErrors[detail.path[0] as string] = detail.message
        }
      })
      setErrors(validationErrors)
      return
    }

    try {
      await register(registerData)
      showSuccess('¡Registro exitoso! Por favor inicia sesión')
      navigate('/login')
    } catch (err: any) {
      showError(err.message || 'Error al registrar usuario')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          label="Nombre completo"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Juan Pérez"
          autoComplete="name"
          required
        />
      </div>

      <div>
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="tu@email.com"
          autoComplete="email"
          required
        />
      </div>

      <div>
        <Input
          label="Teléfono"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="+34 600 000 000"
          autoComplete="tel"
        />
      </div>

      <div>
        <Input
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="********"
          autoComplete="new-password"
          required
        />
      </div>

      <div>
        <Input
          label="Confirmar contraseña"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="********"
          autoComplete="new-password"
          required
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        disabled={Object.keys(errors).length > 0}
      >
        Registrarse
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <a
            href="/login"
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </form>
  )
}