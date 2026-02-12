import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/services/api";

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: async (email, password) => {
        const res = await api.post("/auth/login", { email, password });

        set({
          user: res.data.usuario,
          token: res.data.token
        });
      },

      logout: () => {
        set({ user: null, token: null });
      }
    }),
    { name: "auth-storage" }
  )
);