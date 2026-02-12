import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();

  const adminLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/users", label: "Usuarios" },
    { to: "/rooms", label: "Habitaciones" },
    { to: "/reservations", label: "Reservas" },
    { to: "/settings", label: "Configuración" }
  ];

  const workerLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/rooms", label: "Habitaciones" },
    { to: "/reservations", label: "Reservas" }
  ];

  const clientLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/my-reservations", label: "Mis Reservas" },
    { to: "/profile", label: "Perfil" }
  ];

  const links = user?.role === "ADMIN" ? adminLinks : user?.role === "TRABAJADOR" ? workerLinks : clientLinks;

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
      <nav className="flex flex-col gap-2">
        {links?.map((link) => (
          <Link key={link.to} to={link.to} className="text-gray-900 dark:text-white hover:underline">{link.label}</Link>
        ))}
      </nav>
    </aside>
  );
};