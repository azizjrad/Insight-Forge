import React, { useState } from "react";
import {
  User,
  LogOut,
  Bell,
  Search,
  Menu,
  Settings,
  HelpCircle,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import LanguageSelector from "@/components/layout/LanguageSelector";

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to home page after successful logout
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAdminAccess = () => {
    navigate("/admin");
  };

  const isAdmin = user?.email === "demo@example.com";

  const handleProfileDropdownOpen = (open: boolean) => {
    setIsProfileOpen(open);
    if (open && isNotificationOpen) {
      setIsNotificationOpen(false);
    }
  };

  const handleNotificationToggle = (open: boolean) => {
    setIsNotificationOpen(open);
    if (open && isProfileOpen) {
      setIsProfileOpen(false);
    }
  };

  const handleSearchClick = () => {
    if (isNotificationOpen) {
      setIsNotificationOpen(false);
    }
    if (isProfileOpen) {
      setIsProfileOpen(false);
    }
  };

  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-primary/95 backdrop-blur-xl border-b border-gray-800/50 shadow-lg shadow-black/20 sticky top-0 z-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-transparent to-accent/5"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-secondary/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-1/4 w-24 h-24 bg-accent/15 rounded-full blur-2xl opacity-40 animate-bounce"></div>

      <div className="relative flex items-center justify-between px-6 py-4">
        {/* Left Section - Title and Welcome */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover:bg-secondary/20 hover:text-secondary rounded-xl transition-all duration-300 text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary via-white to-accent bg-clip-text text-transparent tracking-tight">
              Grand Palace Hotel
            </h1>
            <p className="text-gray-300 text-sm leading-tight">
              Welcome back,{" "}
              <span className="font-semibold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {user?.email}
              </span>
            </p>
          </div>
        </div>

        {/* Center Section - Enhanced Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <div className="relative w-full group">
            {/* Enhanced Magnifying Glass Icon */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <Search className="text-gray-400 h-5 w-5 group-focus-within:text-secondary group-focus-within:scale-110 transition-all duration-300 drop-shadow-sm" />
            </div>
            <Input
              placeholder="Search dashboard, bookings, guests..."
              className="pl-12 pr-4 py-3 bg-gray-800/60 border-2 border-gray-700/50 hover:border-secondary/30 focus:border-secondary/50 focus:ring-4 focus:ring-secondary/10 focus:bg-gray-800/80 rounded-2xl transition-all duration-300 text-white placeholder:text-gray-400 shadow-sm backdrop-blur-sm"
              onFocus={handleSearchClick}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary/5 to-accent/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        </div>

        {/* Right Section - Enhanced Actions and Profile */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="hidden sm:block">
            <LanguageSelector variant="dashboard" />
          </div>

          {/* Search Button for Mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover:bg-secondary/20 hover:text-secondary rounded-xl transition-all duration-300 text-white"
            onClick={handleSearchClick}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <NotificationCenter
              isOpen={isNotificationOpen}
              onToggle={handleNotificationToggle}
            />
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu
            open={isProfileOpen}
            onOpenChange={handleProfileDropdownOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-11 w-11 rounded-2xl hover:ring-4 hover:ring-secondary/20 hover:ring-offset-2 hover:ring-offset-primary hover:bg-secondary/10 transition-all duration-300 group"
              >
                <Avatar className="h-10 w-10 border-2 border-gray-600 group-hover:border-secondary/40 transition-all duration-300 shadow-md">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-secondary/30 to-accent/20 text-white font-bold text-lg backdrop-blur-sm">
                    {user?.email ? getUserInitials(user.email) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 bg-primary/95 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl p-2"
              align="end"
              forceMount
            >
              <div className="flex flex-col space-y-2 p-3 bg-gradient-to-br from-secondary/10 to-accent/5 rounded-xl mb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-secondary/30">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-secondary/30 to-accent/20 text-white font-bold">
                      {user?.email ? getUserInitials(user.email) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">
                      {user?.email}
                    </p>
                    <p className="text-xs text-gray-300 leading-tight">
                      Hotel Manager
                    </p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-gray-600/50" />
              <DropdownMenuItem className="hover:bg-secondary/10 hover:text-secondary transition-all duration-200 rounded-xl p-3 cursor-pointer text-gray-300">
                <User className="mr-3 h-4 w-4" />
                <span className="font-medium">Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-secondary/10 hover:text-secondary transition-all duration-200 rounded-xl p-3 cursor-pointer text-gray-300">
                <Settings className="mr-3 h-4 w-4" />
                <span className="font-medium">Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-secondary/10 hover:text-secondary transition-all duration-200 rounded-xl p-3 cursor-pointer text-gray-300">
                <HelpCircle className="mr-3 h-4 w-4" />
                <span className="font-medium">Help & Support</span>
              </DropdownMenuItem>
              {isAdmin && (
                <>
                  <DropdownMenuSeparator className="bg-gray-600/50 my-2" />
                  <DropdownMenuItem
                    onClick={handleAdminAccess}
                    className="hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-200 rounded-xl p-3 cursor-pointer font-medium text-gray-300"
                  >
                    <Shield className="mr-3 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator className="bg-gray-600/50 my-2" />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 rounded-xl p-3 cursor-pointer font-medium text-gray-300"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
