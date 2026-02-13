import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      <Sidebar open={open} toggle={() => setOpen(false)} />

      <div className="flex-1 md:ml-64">

        <Header toggleSidebar={toggleSidebar} />

        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default MainLayout;