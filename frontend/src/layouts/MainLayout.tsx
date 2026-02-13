import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="flex h-full bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;