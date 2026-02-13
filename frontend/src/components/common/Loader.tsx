import React from 'react'
import { cn } from '@/utils/helpers'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
  className?: string
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  fullScreen = false,
  className
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  const loader = (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-b-2 border-primary-600',
          sizes[size]
        )}
      />
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
        {loader}
      </div>
    )
  }

  return loader
}