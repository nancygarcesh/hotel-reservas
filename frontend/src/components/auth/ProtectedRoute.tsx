import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: ReactNode;
  roles?: string[];
}

export default function ProtectedRoute({ children, roles }: Props) {
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }

    if (roles && user && !roles.includes(user.rol)) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) return null;

  if (roles && user && !roles.includes(user.rol)) return null;

  return <>{children}</>;
}