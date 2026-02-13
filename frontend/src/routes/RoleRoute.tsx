import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Role } from "../types/roles";

interface Props {
  allowed: Role[];
  children: React.ReactNode;
}

const RoleRoute = ({ allowed, children }: Props) => {
  const user = useAuthStore((s) => s.user);

  if (!user) return <Navigate to="/login" />;

  if (!allowed.includes(user.rol))
    return <Navigate to="/dashboard" />;

  return <>{children}</>;
};

export default RoleRoute;