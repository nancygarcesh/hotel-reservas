import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);

  const isAuthenticated = !!token;
  const isAdmin = user?.rol === "ADMIN";
  const isTrabajador = user?.rol === "TRABAJADOR";
  const isCliente = user?.rol === "CLIENTE";

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    isTrabajador,
    isCliente
  };
}