import { Link, useLocation } from "react-router-dom";
import { menuItems } from "../../config/menuConfig";
import { useAuthStore } from "../../store/authStore";

interface Props {
  open: boolean;
  toggle: () => void;
}

const Sidebar = ({ open, toggle }: Props) => {
  const location = useLocation();
  const user = useAuthStore((s) => s.user);

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform z-50
      ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-teal-600">
          🌴 Paradise Hotel
        </h2>
      </div>

      <nav className="p-4 flex flex-col gap-2">
        {menuItems
          .filter((item) => item.roles.includes(user!.rol))
          .map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={toggle}
              className={`p-3 rounded-xl transition
              ${
                location.pathname === item.path
                  ? "bg-teal-500 text-white"
                  : "hover:bg-teal-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;