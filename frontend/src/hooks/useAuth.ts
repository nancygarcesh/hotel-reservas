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
  const navigate = useNavigate()

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

  const requireAuth = (redirectTo = '/login') => {
    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        navigate(redirectTo)
      }
    }, [isAuthenticated, isLoading, navigate, redirectTo])
  }

  const requireRole = (roles: string | string[], redirectTo = '/unauthorized') => {
    useEffect(() => {
      if (!isLoading && isAuthenticated && !hasRole(roles)) {
        navigate(redirectTo)
      }
    }, [isAuthenticated, isLoading, navigate, redirectTo, roles])
  }

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
    isCliente,
    requireAuth,
    requireRole
  }
}