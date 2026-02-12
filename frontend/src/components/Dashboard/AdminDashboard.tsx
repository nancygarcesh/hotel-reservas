import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ users: 0, rooms: 0, reservations: 0 });

  useEffect(() => {
    axiosInstance.get("/admin/stats").then(res => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Dashboard ADMIN</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
          <p className="text-gray-500 dark:text-gray-200">Usuarios</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.users}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
          <p className="text-gray-500 dark:text-gray-200">Habitaciones</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.rooms}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
          <p className="text-gray-500 dark:text-gray-200">Reservas</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.reservations}</p>
        </div>
      </div>
    </div>
  );
};