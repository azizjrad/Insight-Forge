import React from "react";
import {
  User,
  LogOut,
  Bell,
  Search,
  Menu,
  Settings,
  HelpCircle,
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
import NotificationCenter from "@/components/notifications/NotificationCenter";
import LanguageSelector from "@/components/layout/LanguageSelector";

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/30 shadow-lg shadow-gray-100/50 sticky top-0 z-50 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl opacity-40 animate-bounce"></div>

      <div className="relative flex items-center justify-between px-6 py-4">
        {/* Left Section - Title and Welcome */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-300"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-gray-800 to-secondary bg-clip-text text-transparent tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-600 text-sm leading-tight">
              Welcome back,{" "}
              <span className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
              <Search className="text-gray-400 h-5 w-5 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300 drop-shadow-sm" />
            </div>
            <Input
              placeholder="Search dashboard, bookings, guests..."
              className="pl-12 pr-4 py-3 bg-gray-50/80 border-2 border-gray-200/50 hover:border-primary/30 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-white rounded-2xl transition-all duration-300 text-gray-700 placeholder:text-gray-500 shadow-sm backdrop-blur-sm"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
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
            className="md:hidden hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-300"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <NotificationCenter />
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-11 w-11 rounded-2xl hover:ring-4 hover:ring-primary/20 hover:ring-offset-2 hover:bg-primary/5 transition-all duration-300 group"
              >
                <Avatar className="h-10 w-10 border-2 border-gray-200 group-hover:border-primary/40 transition-all duration-300 shadow-md">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-bold text-lg backdrop-blur-sm">
                    {user?.email ? getUserInitials(user.email) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl p-2"
              align="end"
              forceMount
            >
              <div className="flex flex-col space-y-2 p-3 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl mb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-bold">
                      {user?.email ? getUserInitials(user.email) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      {user?.email}
                    </p>
                    <p className="text-xs text-gray-600 leading-tight">
                      Hotel Manager
                    </p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-gray-200/50" />
              <DropdownMenuItem className="hover:bg-primary/5 hover:text-primary transition-all duration-200 rounded-xl p-3 cursor-pointer">
                <User className="mr-3 h-4 w-4" />
                <span className="font-medium">Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/5 hover:text-primary transition-all duration-200 rounded-xl p-3 cursor-pointer">
                <Settings className="mr-3 h-4 w-4" />
                <span className="font-medium">Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/5 hover:text-primary transition-all duration-200 rounded-xl p-3 cursor-pointer">
                <HelpCircle className="mr-3 h-4 w-4" />
                <span className="font-medium">Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200/50 my-2" />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-xl p-3 cursor-pointer font-medium"
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
