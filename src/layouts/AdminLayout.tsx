import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/admin") return "Overview";
    if (path.includes("/users")) return "User Management";
    if (path.includes("/data-sources")) return "Data Sources";
    if (path.includes("/activity")) return "Activity Logs";
    if (path.includes("/analytics")) return "Analytics";
    if (path.includes("/reports")) return "Reports";
    if (path.includes("/security")) return "Security";
    if (path.includes("/settings")) return "Settings";
    return "Dashboard";
  };

  // Set dark theme for admin pages
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.style.backgroundColor = "#0f172a";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="flex h-screen w-screen bg-slate-900 overflow-hidden">
      <AdminSidebar />

      <div className="flex flex-col flex-1 overflow-hidden min-h-screen w-full">
        <AdminHeader
          title={getPageTitle()}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto bg-slate-900 min-h-0 w-full">
          <div className="w-full min-h-full bg-slate-900">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
