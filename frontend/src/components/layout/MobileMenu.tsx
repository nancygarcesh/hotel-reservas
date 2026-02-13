import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { menuItems } from '@/config/roles'
import { cn } from '@/utils/helpers'

export const MobileMenu: React.FC = () => {
  const { user } = useAuthStore()
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore()

  if (!user?.Role || !mobileMenuOpen) return null

  const items = menuItems[user.Role.name as keyof typeof menuItems] || []

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 lg:hidden"
        onClick={() => setMobileMenuOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl lg:hidden">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400">
            Hotel RS
          </h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              className="h-5 w-5 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-5 px-2">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    )
                  }
                >
                  <span className="flex-shrink-0">{/* Icon */}</span>
                  <span className="ml-3">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}