import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Layout } from "@/components/Layout/Layout";
import { AdminDashboard } from "@/components/Dashboard/AdminDashboard";
import { WorkerDashboard } from "@/components/Dashboard/WorkerDashboard";
import { ClientDashboard } from "@/components/Dashboard/ClientDashboard";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <ProtectedRoute roles={["ADMIN","TRABAJADOR","CLIENTE"]}>
      <Layout>
        {user?.role === "ADMIN" && <AdminDashboard />}
        {user?.role === "TRABAJADOR" && <WorkerDashboard />}
        {user?.role === "CLIENTE" && <ClientDashboard />}
      </Layout>
    </ProtectedRoute>
  );
};