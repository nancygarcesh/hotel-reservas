import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";

const Header = () => {
  const { user, logout } = useAuthStore();
  const { toggle } = useThemeStore();

  return (
    <header className="bg-white dark:bg-gray-800 p-4 flex justify-between">
      <span>{user?.nombre}</span>

      <div className="flex gap-4">
        <button onClick={toggle}>Tema</button>
        <button onClick={logout}>Salir</button>
      </div>
    </header>
  );
};

export default Header;