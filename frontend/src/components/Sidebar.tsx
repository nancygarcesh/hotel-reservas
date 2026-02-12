import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const { user, isAdmin, isTrabajador } = useAuth();

  if (!user) return null;

  return (
    <aside className="w-64 bg-hotel-primary p-4 text-white">
      <h2 className="text-xl font-bold mb-6">
        Hotel Panel
      </h2>

      <nav className="flex flex-col gap-3">
        <a href="/dashboard">Dashboard</a>

        {(isAdmin || isTrabajador) && (
          <a href="/habitaciones">Habitaciones</a>
        )}

        <a href="/reservas">Reservas</a>

        {isAdmin && (
          <a href="/admin">Administración</a>
        )}
      </nav>
    </aside>
  );
}