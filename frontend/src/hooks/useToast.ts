import { useToastStore } from '@/store/uiStore'
import toast from 'react-hot-toast'

export const useToast = () => {
  const { addToast, removeToast, clearToasts } = useToastStore()

  const showSuccess = (message: string, duration?: number) => {
    toast.success(message, { duration })
    addToast({ type: 'success', message, duration })
  }

  const showError = (message: string, duration?: number) => {
    toast.error(message, { duration })
    addToast({ type: 'error', message, duration })
  }

  const showInfo = (message: string, duration?: number) => {
    toast(message, { duration })
    addToast({ type: 'info', message, duration })
  }

  const showWarning = (message: string, duration?: number) => {
    toast(message, {
      duration,
      icon: '⚠️',
      style: {
        background: '#f59e0b',
        color: '#fff',
      },
    })
    addToast({ type: 'warning', message, duration })
  }

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeToast,
    clearToasts
  }
}