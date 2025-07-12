import React from "react";
import { Navigate } from "react-router-dom";
// Remove auth import

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = null; const loading = false;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check if user is logged in (either regular user or admin)
  const isLoggedIn =
    localStorage.getItem("user_logged_in") === "true" ||
    localStorage.getItem("admin_logged_in") === "true";

  if (!isLoggedIn && !user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

