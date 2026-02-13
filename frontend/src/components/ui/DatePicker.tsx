import React, { useState } from 'react'
import Calendar from 'react-calendar'
import { formatDate } from '@/utils/dateUtils'
import { cn } from '@/utils/helpers'
import 'react-calendar/dist/Calendar.css'

interface DatePickerProps {
  value?: Date
  onChange: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  className?: string
  disabled?: boolean
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  className,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'w-full px-4 py-2 text-left border border-gray-300 rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
          disabled && 'bg-gray-100 cursor-not-allowed',
          className
        )}
        disabled={disabled}
      >
        {value ? formatDate(value) : 'Seleccionar fecha'}
      </button>
      
      {isOpen && !disabled && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-40 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <Calendar
              onChange={(date) => {
                onChange(date as Date)
                setIsOpen(false)
              }}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              locale="es"
            />
          </div>
        </>
      )}
    </div>
  )
}