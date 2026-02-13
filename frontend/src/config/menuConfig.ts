import { Role } from "../types/roles";

export interface MenuItem {
  label: string;
  path: string;
  roles: Role[];
}

export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    roles: ["ADMIN", "TRABAJADOR", "CLIENTE"]
  },
  {
    label: "Habitaciones",
    path: "/habitaciones",
    roles: ["ADMIN", "TRABAJADOR"]
  },
  {
    label: "Reservas",
    path: "/reservas",
    roles: ["ADMIN", "TRABAJADOR", "CLIENTE"]
  },
  {
    label: "Usuarios",
    path: "/usuarios",
    roles: ["ADMIN"]
  }
];