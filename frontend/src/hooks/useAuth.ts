import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError
  } = useAuthStore()

  const hasRole = (roles: string | string[]) => {
    if (!user?.Role) return false

    const userRole = user.Role.name

    if (Array.isArray(roles)) {
      return roles.includes(userRole)
    }

    return userRole === roles
  }

  const isAdmin = () => hasRole('ADMIN')
  const isTrabajador = () => hasRole('TRABAJADOR')
  const isCliente = () => hasRole('CLIENTE')

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    hasRole,
    isAdmin,
    isTrabajador,
    isCliente
  }
}

export const useRequireAuth = (redirectTo = '/login') => {

  const { isAuthenticated, isLoading } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(redirectTo)
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo])
}

export const useRequireRole = (
  roles: string | string[],
  redirectTo = '/unauthorized'
) => {

  const { user, isAuthenticated, isLoading } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {

    if (!user?.Role) return

    const userRole = user.Role.name
    const hasRole = Array.isArray(roles)
      ? roles.includes(userRole)
      : userRole === roles

    if (!isLoading && isAuthenticated && !hasRole) {
      navigate(redirectTo)
    }

  }, [user, isAuthenticated, isLoading, navigate, redirectTo, roles])
}