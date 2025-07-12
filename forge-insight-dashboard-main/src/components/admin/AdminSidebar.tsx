import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Database,
  Activity,
  LogOut,
  Settings,
  BarChart3,
  Shield,
  FileText,
  Zap,
  ChevronRight,
  Bell,
  TrendingUp,
  Server,
  Globe,
} from "lucide-react";
// Remove auth import
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Logo from "@/components/layout/Logo";

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const navigation = [
    {
      name: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
      description: "System dashboard",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      badge: "24",
      description: "User management",
      gradient: "from-green-500 to-green-600",
    },
    {
      name: "Data Sources",
      href: "/admin/data-sources",
      icon: Database,
      badge: null,
      description: "Connected sources",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      name: "Database Config",
      href: "/admin/database",
      icon: Server,
      badge: null,
      description: "Database management",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "Activity Logs",
      href: "/admin/activity",
      icon: Activity,
      badge: "New",
      description: "System activity",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      badge: null,
      description: "Performance metrics",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: FileText,
      badge: null,
      description: "Generated reports",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      name: "Security",
      href: "/admin/security",
      icon: Shield,
      badge: null,
      description: "Security settings",
      gradient: "from-red-500 to-red-600",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      badge: null,
      description: "System configuration",
      gradient: "from-gray-500 to-gray-600",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-72 h-screen">
        <div className="flex flex-col flex-grow bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 shadow-lg overflow-hidden">
          {/* Enhanced Header with Logo */}
          <div className="flex items-center flex-shrink-0 px-6 py-6 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
            <div className="flex items-center w-full">
              <Logo variant="admin" to="/" />
              <div className="ml-auto">
                <Badge
                  variant="secondary"
                  className="bg-blue-900 text-blue-300 border-blue-700 text-xs"
                >
                  Admin Panel
                </Badge>
              </div>
            </div>
          </div>

          {/* User Section */}
          <div className="px-6 py-6 border-b border-gray-700 flex-shrink-0">
            <Card className="bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg">
                    A
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-semibold text-white">Admin</p>
                    <p className="text-xs text-gray-300">
                      System Administrator
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 ml-1">
                        Online
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-900 text-green-300 border-green-700 text-xs"
                  >
                    Admin
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="px-6 py-4 border-b border-gray-700 flex-shrink-0">
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-gradient-to-r from-blue-900 to-blue-800 border-blue-700">
                <CardContent className="p-3">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="ml-2 text-xs font-medium text-blue-300">
                      Users
                    </span>
                  </div>
                  <p className="text-lg font-bold text-blue-100 mt-1">156</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-green-900 to-green-800 border-green-700">
                <CardContent className="p-3">
                  <div className="flex items-center">
                    <Server className="w-4 h-4 text-green-400" />
                    <span className="ml-2 text-xs font-medium text-green-300">
                      Uptime
                    </span>
                  </div>
                  <p className="text-lg font-bold text-green-100 mt-1">99.9%</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation - Scrollable */}
          <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Administration
            </h3>
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group block px-3 py-3 rounded-xl transition-all duration-200 hover:shadow-md",
                    active
                      ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg transform scale-[1.02]"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white hover:shadow-sm border border-transparent hover:border-gray-700"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all",
                          active
                            ? "bg-white/20 shadow-inner"
                            : `bg-gradient-to-r ${item.gradient} text-white shadow-sm group-hover:shadow-md`
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p
                          className={cn(
                            "text-sm font-medium",
                            active ? "text-white" : "text-gray-200"
                          )}
                        >
                          {item.name}
                        </p>
                        <p
                          className={cn(
                            "text-xs",
                            active ? "text-blue-100" : "text-gray-400"
                          )}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-xs",
                            active
                              ? "bg-white/20 text-white border-white/30"
                              : item.badge === "New"
                              ? "bg-green-900 text-green-300 border-green-700"
                              : "bg-blue-900 text-blue-300 border-blue-700"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {active && (
                        <ChevronRight className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* System Status */}
          <div className="px-6 py-4 border-t border-gray-700 flex-shrink-0">
            <Card className="bg-gradient-to-r from-green-900 to-emerald-900 border-green-700">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs font-medium text-green-300">
                        System Status
                      </p>
                      <p className="text-sm font-bold text-green-100">
                        All Systems Operational
                      </p>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Footer */}
          <div className="flex-shrink-0 p-6 border-t border-gray-700 bg-gray-800/50">
            <Link to="/dashboard">
              <Button className="w-full justify-start bg-gradient-to-r from-blue-900/80 to-blue-800/80 hover:from-blue-800 hover:to-blue-700 border-blue-700 text-blue-300 hover:text-blue-100 transition-all duration-300 group shadow-lg hover:shadow-blue-900/20">
                <LayoutDashboard className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
