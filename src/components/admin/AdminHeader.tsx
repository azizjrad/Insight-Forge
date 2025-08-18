import React, { useState } from "react";
import {
  User,
  LogOut,
  Menu,
  Search,
  Settings,
  HelpCircle,
  Bell,
  Activity,
  Users,
  Database,
  TrendingUp,
  Clock,
  Calendar,
  Globe,
  ChevronDown,
  BarChart3,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Remove auth import
import AdminNotificationCenter from "@/components/admin/AdminNotificationCenter";

interface AdminHeaderProps {
  title: string;
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, onMenuClick }) => {
  // Remove auth functionality
  const user = null;
  const signOut = () => {};
  const [searchQuery, setSearchQuery] = useState("");

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserInitials = (email: string) => {
    return email.split("@")[0].charAt(0).toUpperCase();
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Quick stats data
  const quickStats = [
    {
      label: "Active Users",
      value: "156",
      icon: Users,
      change: "+12%",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "System Load",
      value: "24%",
      icon: Activity,
      change: "-5%",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Data Sources",
      value: "8",
      icon: Database,
      change: "+2",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "Performance",
      value: "99.9%",
      icon: TrendingUp,
      change: "+0.1%",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="bg-gray-900 border-b border-gray-700 shadow-lg">
      {/* Main Header */}
      <header className="px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden hover:bg-gray-800 rounded-xl text-gray-300"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                    {title}
                  </h1>
                  <Badge
                    variant="secondary"
                    className="bg-green-900 text-green-300 border-green-700 px-3 py-1"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    Live
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2 bg-blue-900 px-3 py-1 rounded-lg border border-blue-700">
                    <Calendar size={16} className="text-blue-400" />
                    <span className="font-medium">{getCurrentDate()}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-900 px-3 py-1 rounded-lg border border-green-700">
                    <Clock size={16} className="text-green-400" />
                    <span className="font-medium">{getCurrentTime()}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-900 px-3 py-1 rounded-lg border border-purple-700">
                    <Globe size={16} className="text-purple-400" />
                    <span className="font-medium">Global Admin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search users, logs, settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-12 pr-4 py-3 bg-gray-800 border-gray-600 focus:bg-gray-700 focus:border-primary transition-all rounded-xl shadow-sm text-white placeholder-gray-400"
              />
            </div>

            {/* Quick Stats Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 focus:ring-2 focus:ring-primary/50"
                >
                  <BarChart3 size={16} className="text-blue-400" />
                  <span className="hidden sm:inline font-medium">
                    Quick Stats
                  </span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-96 p-4 rounded-xl shadow-xl border-gray-600 bg-gray-800"
              >
                <DropdownMenuLabel className="text-lg font-bold mb-4 text-white">
                  System Overview
                </DropdownMenuLabel>
                <div className="grid grid-cols-2 gap-4">
                  {quickStats.map((stat, index) => (
                    <Card
                      key={index}
                      className="border-gray-600 shadow-sm bg-gray-700"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className={`w-10 h-10 rounded-xl ${stat.bgColor
                              .replace("bg-", "bg-")
                              .replace(
                                "-100",
                                "-900"
                              )} flex items-center justify-center`}
                          >
                            <stat.icon
                              size={20}
                              className={stat.color.replace("600", "400")}
                            />
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs font-medium border-gray-600 text-gray-300"
                          >
                            {stat.change}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-300">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <AdminNotificationCenter />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-12 w-12 rounded-xl hover:bg-gray-800 shadow-sm"
                >
                  <Avatar className="h-12 w-12 ring-2 ring-gray-600 shadow-sm">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-blue-600 text-white font-bold text-lg">
                      {user?.email ? getUserInitials(user.email) : "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 shadow-sm"></div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-72 rounded-xl shadow-xl bg-gray-800 border-gray-600"
                align="end"
              >
                <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-t-xl border-b border-gray-600">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14 ring-2 ring-gray-600">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-r from-primary to-blue-600 text-white font-bold text-lg">
                        {user?.email ? getUserInitials(user.email) : "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-white">
                        {user?.email?.split("@")[0] || "Administrator"}
                      </p>
                      <p className="text-sm text-gray-300">{user?.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="secondary"
                          className="bg-blue-900 text-blue-300 border-blue-700 text-xs"
                        >
                          System Admin
                        </Badge>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-400">Online</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <DropdownMenuItem className="cursor-pointer p-3 rounded-lg text-gray-300 hover:bg-secondary/20 hover:text-secondary transition-all duration-300">
                    <User className="mr-3 h-5 w-5 text-secondary" />
                    <div className="flex flex-col">
                      <span className="font-medium">Profile Settings</span>
                      <span className="text-xs text-gray-400 group-hover:text-secondary/80">
                        Manage your account
                      </span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer p-3 rounded-lg text-gray-300 hover:bg-gray-700">
                    <Settings className="mr-3 h-5 w-5 text-purple-400" />
                    <div className="flex flex-col">
                      <span className="font-medium">Admin Settings</span>
                      <span className="text-xs text-gray-400">
                        System configuration
                      </span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer p-3 rounded-lg text-gray-300 hover:bg-gray-700">
                    <Shield className="mr-3 h-5 w-5 text-orange-400" />
                    <div className="flex flex-col">
                      <span className="font-medium">Security</span>
                      <span className="text-xs text-gray-400">
                        Manage security settings
                      </span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer p-3 rounded-lg text-gray-300 hover:bg-gray-700">
                    <HelpCircle className="mr-3 h-5 w-5 text-green-400" />
                    <div className="flex flex-col">
                      <span className="font-medium">Help & Support</span>
                      <span className="text-xs text-gray-400">
                        Get help and documentation
                      </span>
                    </div>
                  </DropdownMenuItem>
                </div>

                <div className="p-2 border-t border-gray-600">
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-400 focus:text-red-300 focus:bg-red-900/20 p-3 rounded-lg"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    <div className="flex flex-col">
                      <span className="font-medium">Sign Out</span>
                      <span className="text-xs text-gray-400">
                        End your admin session
                      </span>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Secondary Header with Breadcrumb and System Status */}
      <div className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 border-t border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">Admin</span>
              <span className="text-gray-500">/</span>
              <span className="text-white font-semibold">{title}</span>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-3 bg-green-900 px-4 py-2 rounded-lg border border-green-700">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-300">
                All systems operational
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-gray-300 hover:bg-gray-800 rounded-lg"
            >
              <Activity size={14} className="mr-2" />
              System Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
