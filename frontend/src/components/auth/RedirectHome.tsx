import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function RedirectHome() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/login";
    }
  }, []);

  return null;
}