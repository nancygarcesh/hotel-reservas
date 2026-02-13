import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { MobileMenu } from './MobileMenu'
import { useUIStore } from '@/store/uiStore'
import { cn } from '@/utils/helpers'

const Layout: React.FC = () => {
  const { sidebarOpen } = useUIStore()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MobileMenu />
      <Sidebar />
      
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
        )}
      >
        <Header />
        
        <main className="container-custom py-6 sm:py-8 lg:py-10">
          <Outlet />
        </main>

        <footer className="container-custom py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
          <p>© {new Date().getFullYear()} Hotel Reservation System. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  )
}

export default Layout