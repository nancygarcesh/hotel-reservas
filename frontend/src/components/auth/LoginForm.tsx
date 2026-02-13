import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { loginSchema } from '@/utils/validators'

export const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuth()
  const { showError, showSuccess } = useToast()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateField = (name: string, value: string) => {
    const { error } = loginSchema.validate({ [name]: value })
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

    const { error } = loginSchema.validate(formData)
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
      await login(formData)
      showSuccess('¡Bienvenido!')
      navigate('/dashboard')
    } catch (err: any) {
      showError(err.message || 'Error al iniciar sesión')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="********"
          autoComplete="current-password"
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
        Iniciar Sesión
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ¿No tienes cuenta?{' '}
          <a
            href="/register"
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            Regístrate aquí
          </a>
        </p>
      </div>
    </form>
  )
}