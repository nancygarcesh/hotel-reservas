import { Role } from "./roles";

export interface User {
  id: number;
  name: string;
  email: string;
  rol: Role;
}