import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { DataProvider } from "../../contexts/DataContext";

const DashboardLayout: React.FC = () => {
  return (
    <DataProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary via-gray-900 to-primary">
        <Sidebar />
        <div className="pl-16 md:pl-64">
          <Header />
          <main className="p-4 lg:p-6 min-h-screen bg-gradient-to-br from-primary via-gray-900 to-primary">
            <Outlet />
          </main>
        </div>
      </div>
    </DataProvider>
  );
};

export default DashboardLayout;
