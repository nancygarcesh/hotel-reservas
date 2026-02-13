import { useAuthStore } from "../store/authStore";

const DashboardPage = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex flex-col gap-6">

      <h1 className="text-3xl font-bold">
        🌺 Dashboard
      </h1>

      {user?.rol === "ADMIN" && (
        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="font-semibold">Gestión Total</h3>
            <p>Control completo del sistema.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="font-semibold">Usuarios</h3>
            <p>Administrar usuarios y roles.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="font-semibold">Estadísticas</h3>
            <p>Resumen general del hotel.</p>
          </div>

        </div>
      )}

      {user?.rol === "TRABAJADOR" && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="font-semibold">
            Gestión de Reservas y Habitaciones
          </h3>
        </div>
      )}

      {user?.rol === "CLIENTE" && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="font-semibold">
            Tus Reservas
          </h3>
          <p>Aquí podrás ver tus reservas activas.</p>
        </div>
      )}

    </div>
  );
};

export default DashboardPage;