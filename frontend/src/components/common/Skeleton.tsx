import React from 'react'
import { cn } from '@/utils/helpers'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  count?: number
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height,
  count = 1
}) => {
  const baseStyles = 'animate-pulse bg-gray-200 dark:bg-gray-700'
  
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  }

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1rem' : undefined)
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(baseStyles, variants[variant], className)}
          style={style}
        />
      ))}
    </>
  )
}

export const RoomCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
      <Skeleton variant="rectangular" height={200} className="mb-4" />
      <Skeleton variant="text" width="60%" className="mb-2" />
      <Skeleton variant="text" width="40%" className="mb-2" />
      <Skeleton variant="text" width="80%" />
      <div className="flex justify-between mt-4">
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="text" width="20%" />
      </div>
    </div>
  )
}

export const ReservationCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
      <div className="flex justify-between mb-4">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="20%" />
      </div>
      <Skeleton variant="text" width="60%" className="mb-2" />
      <Skeleton variant="text" width="50%" className="mb-2" />
      <div className="flex gap-2 mt-4">
        <Skeleton variant="rectangular" width={80} height={32} />
        <Skeleton variant="rectangular" width={80} height={32} />
      </div>
    </div>
  )
}