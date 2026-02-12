import { useAuthStore } from "@/store/authStore";

export default function Sidebar() {
  const user = useAuthStore((s) => s.user);

  if (!user) return null;

  return (
    <aside className="w-64 bg-hotel-primary p-4 text-white">
      <h2 className="text-xl font-bold mb-6">Hotel Panel</h2>

      <nav className="flex flex-col gap-3">
        <a href="/dashboard">Dashboard</a>

        {(user.rol === "ADMIN" || user.rol === "TRABAJADOR") && (
          <a href="/habitaciones">Habitaciones</a>
        )}

        <a href="/reservas">Reservas</a>

        {user.rol === "ADMIN" && (
          <a href="/admin">Administración</a>
        )}
      </nav>
    </aside>
  );
}