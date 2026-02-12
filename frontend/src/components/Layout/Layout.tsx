import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistencia de tema
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};