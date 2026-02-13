import { useAuthStore } from "../../store/authStore";

interface Props {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: Props) => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex justify-between items-center">

      <button
        className="md:hidden text-xl"
        onClick={toggleSidebar}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      <div className="flex items-center gap-4">
        <span className="font-medium">
          Hola, {user?.name}
        </span>

        <button
          onClick={logout}
          className="bg-red-400 text-white px-4 py-2 rounded-xl hover:bg-red-500 transition"
        >
          Salir
        </button>
      </div>

    </header>
  );
};

export default Header;