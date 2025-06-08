import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { DataProvider } from "../../contexts/DataContext";

const DashboardLayout: React.FC = () => {
  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="pl-16 md:pl-64">
          <Header />
          <main className="p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </DataProvider>
  );
};

export default DashboardLayout;
