import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";

export default function Header() {
  const logout = useAuthStore((s) => s.logout);
  const toggleDark = useUIStore((s) => s.toggleDark);

  return (
    <header className="flex justify-between p-4 shadow">
      <button onClick={toggleDark}>Toggle Theme</button>
      <button onClick={logout}>Logout</button>
    </header>
  );
}