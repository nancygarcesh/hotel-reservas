import { ROLES } from '@/utils/constants'

export interface RoutePermission {
  path: string
  roles: string[]
  exact?: boolean
}

export const rolePermissions: RoutePermission[] = [
  {
    path: '/admin',
    roles: [ROLES.ADMIN],
    exact: false
  },
  {
    path: '/rooms/create',
    roles: [ROLES.ADMIN, ROLES.TRABAJADOR],
    exact: true
  },
  {
    path: '/rooms/edit',
    roles: [ROLES.ADMIN, ROLES.TRABAJADOR],
    exact: false
  },
  {
    path: '/rooms/delete',
    roles: [ROLES.ADMIN],
    exact: false
  },
  {
    path: '/reservations/all',
    roles: [ROLES.ADMIN, ROLES.TRABAJADOR],
    exact: true
  },
  {
    path: '/users',
    roles: [ROLES.ADMIN],
    exact: false
  }
]

export const menuItems = {
  [ROLES.ADMIN]: [
    { path: '/dashboard', label: 'Dashboard', icon: 'ChartBarIcon' },
    { path: '/rooms', label: 'Habitaciones', icon: 'HomeIcon' },
    { path: '/reservations', label: 'Reservas', icon: 'CalendarIcon' },
    { path: '/admin', label: 'Administración', icon: 'CogIcon' },
    { path: '/profile', label: 'Perfil', icon: 'UserIcon' }
  ],
  [ROLES.TRABAJADOR]: [
    { path: '/dashboard', label: 'Dashboard', icon: 'ChartBarIcon' },
    { path: '/rooms', label: 'Habitaciones', icon: 'HomeIcon' },
    { path: '/reservations', label: 'Reservas', icon: 'CalendarIcon' },
    { path: '/profile', label: 'Perfil', icon: 'UserIcon' }
  ],
  [ROLES.CLIENTE]: [
    { path: '/dashboard', label: 'Dashboard', icon: 'ChartBarIcon' },
    { path: '/rooms', label: 'Buscar Habitaciones', icon: 'HomeIcon' },
    { path: '/reservations', label: 'Mis Reservas', icon: 'CalendarIcon' },
    { path: '/profile', label: 'Mi Perfil', icon: 'UserIcon' }
  ]
}

export const canAccessRoute = (userRole: string, path: string): boolean => {
  const permission = rolePermissions.find(p => 
    p.exact ? p.path === path : path.startsWith(p.path)
  )
  
  if (!permission) return true
  return permission.roles.includes(userRole)
}

export const canPerformAction = (userRole: string, action: string): boolean => {
  const permissions: Record<string, string[]> = {
    'create:room': [ROLES.ADMIN, ROLES.TRABAJADOR],
    'edit:room': [ROLES.ADMIN, ROLES.TRABAJADOR],
    'delete:room': [ROLES.ADMIN],
    'view:all-reservations': [ROLES.ADMIN, ROLES.TRABAJADOR],
    'manage:users': [ROLES.ADMIN],
    'manage:roles': [ROLES.ADMIN],
    'manage:hotel-config': [ROLES.ADMIN],
    'cancel:reservation': [ROLES.ADMIN, ROLES.TRABAJADOR, ROLES.CLIENTE],
    'confirm:reservation': [ROLES.ADMIN, ROLES.TRABAJADOR],
    'complete:reservation': [ROLES.ADMIN, ROLES.TRABAJADOR]
  }

  const allowedRoles = permissions[action]
  return allowedRoles ? allowedRoles.includes(userRole) : true
}