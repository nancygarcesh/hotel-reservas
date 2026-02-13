import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import { useTheme } from "./hooks/useTheme";
import { useAuthStore } from "./store/authStore";
import { ReactNode } from "react";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((s) => s.user);
  return user ? <Navigate to="/dashboard" /> : <>{children}</>;
};

function App() {
  useTheme();

  return (
    <BrowserRouter>
      <Routes>
        {/* rutas publicas */}
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/registro" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        {/* rutas protegidas */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* nueva ruta solo para ADMIN */}
          <Route
            path="/usuarios"
            element={
              <RoleRoute allowed={["ADMIN"]}>
                <div>Gestión usuarios</div>
              </RoleRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;