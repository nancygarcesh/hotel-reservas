import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "../UI/Button";

export const Header: React.FC = () => {
  const { user, clearAuth } = useAuthStore();

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hotel Reservas</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 dark:text-gray-200">{user?.name}</span>
        <Button onClick={toggleTheme} variant="secondary">Toggle Dark</Button>
        <Button onClick={clearAuth} variant="secondary">Logout</Button>
      </div>
    </header>
  );
};