import { Role } from "./roles";

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: Role;
}