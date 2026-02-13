import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import { useThemeStore } from './store/uiStore'
import Layout from './components/layout/Layout'
import PrivateRoute from './components/common/PrivateRoute'
import ErrorBoundary from './components/common/ErrorBoundary'

//pages
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import CreateRoom from './pages/CreateRoom'
import EditRoom from './pages/EditRoom'
import Reservations from './pages/Reservations'
import CreateReservation from './pages/CreateReservation'
import ReservationDetail from './pages/ReservationDetail'
import Profile from './pages/Profile'
import AdminPanel from './pages/AdminPanel'
import NotFound from './pages/NotFound'
import Unauthorized from './pages/Unauthorized'

function App() {
  const { checkAuth, isLoading } = useAuthStore()
  const { theme } = useThemeStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Rooms Routes */}
          <Route path="rooms">
            <Route index element={<Rooms />} />
            <Route path=":id" element={<RoomDetail />} />
            <Route path="create" element={
              <PrivateRoute allowedRoles={['ADMIN', 'TRABAJADOR']}>
                <CreateRoom />
              </PrivateRoute>
            } />
            <Route path="edit/:id" element={
              <PrivateRoute allowedRoles={['ADMIN', 'TRABAJADOR']}>
                <EditRoom />
              </PrivateRoute>
            } />
          </Route>

          {/* Reservations Routes */}
          <Route path="reservations">
            <Route index element={<Reservations />} />
            <Route path="create" element={<CreateReservation />} />
            <Route path=":id" element={<ReservationDetail />} />
          </Route>

          {/* Profile Route */}
          <Route path="profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route path="admin">
            <Route index element={
              <PrivateRoute allowedRoles={['ADMIN']}>
                <AdminPanel />
              </PrivateRoute>
            } />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App