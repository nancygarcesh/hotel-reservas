import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Sidebar = () => {
  const { user } = useAuthStore();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-4">
      <h2 className="text-xl font-bold mb-6">Hotel App</h2>

      <nav className="flex flex-col gap-3">
        <Link to="/dashboard">Dashboard</Link>

        {(user?.rol === "ADMIN" || user?.rol === "TRABAJADOR") && (
          <>
            <Link to="/habitaciones">Habitaciones</Link>
            <Link to="/reservas">Reservas</Link>
          </>
        )}

        {user?.rol === "CLIENTE" && (
          <>
            <Link to="/habitaciones">Habitaciones</Link>
            <Link to="/mis-reservas">Mis Reservas</Link>
          </>
        )}

        {user?.rol === "ADMIN" && (
          <Link to="/admin">Administración</Link>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;