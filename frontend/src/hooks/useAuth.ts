import { useAuthStore } from "@/store/useAuthStore";

export const useAuth = () => useAuthStore();
export const getToken = () => localStorage.getItem("token");
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};