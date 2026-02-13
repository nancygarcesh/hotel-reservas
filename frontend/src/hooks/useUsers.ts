import { useUserStore } from '@/store/userStore'
import { useEffect } from 'react'

export const useUsers = () => {
  const { 
    users,
    currentUser,
    isLoading,
    error,
    fetchUsers,
    fetchUserById,
    updateUser,
    deleteUser,
    clearCurrentUser,
    setError
  } = useUserStore()

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users,
    currentUser,
    isLoading,
    error,
    fetchUsers,
    fetchUserById,
    updateUser,
    deleteUser,
    clearCurrentUser,
    setError
  }
}