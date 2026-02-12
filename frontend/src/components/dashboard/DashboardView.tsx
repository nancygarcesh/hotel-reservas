import { useAuth } from "@/hooks/useAuth";

export default function DashboardView() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Bienvenido {user?.nombre}
      </h1>

      <p className="mt-2">
        Rol actual: {user?.rol}
      </p>
    </div>
  );
}