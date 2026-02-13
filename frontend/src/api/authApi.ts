import api from "./axios";
import { LoginForm, RegisterForm, AuthResponse } from "../types/auth";

export const loginRequest = async (data: LoginForm): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerRequest = async (data: RegisterForm): Promise<void> => {
  await api.post("/auth/register", data);
};