import { User } from "./user";

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  nombre: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface FormErrors {
  [key: string]: string;
}