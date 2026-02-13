import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface Props {
  children: JSX.Element;
  roles?: string[];
}

const ProtectedRoute = ({ children, roles }: Props) => {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.rol)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;