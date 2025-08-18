import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ChartBar,
  Calendar,
  BarChart,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  DoorOpen,
  Volume2,
  VolumeX,
  Bot,
} from "lucide-react";
// Remove auth import
import { toast } from "sonner";
import Logo from "../layout/Logo";
import { useDoorSoundEffects } from "@/hooks/useDoorSoundEffects";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLogoutAnimating, setIsLogoutAnimating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const signOut = () => {};

  // Sound effects hook
  const {
    playDoorAnimation,
    isPlaying: isSoundPlaying,
    isLoaded: soundsLoaded,
  } = useDoorSoundEffects();

  // Load sound effects on component mount
  useEffect(() => {
    // Preload sounds when component mounts for better UX
  }, []);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Reports",
      icon: <ChartBar size={20} />,
      path: "/dashboard/reports",
    },
    {
      title: "Bookings",
      icon: <Calendar size={20} />,
      path: "/dashboard/bookings",
    },
    {
      title: "Financial",
      icon: <BarChart size={20} />,
      path: "/dashboard/financial",
    },
    {
      title: "Guest Segments",
      icon: <Users size={20} />,
      path: "/dashboard/guests",
    },
    {
      title: "AI Assistant",
      icon: <Bot size={20} />,
      path: "/dashboard/ai-assistant",
      badge: "NEW",
      isAI: true,
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    setIsLogoutAnimating(true);

    // Play door animation sound effects if enabled and loaded
    if (soundEnabled && soundsLoaded) {
      playDoorAnimation().catch((error) => {
        console.warn("Failed to play door animation sounds:", error);
      });
    }

    // Show door opening toast with sound indicator
    toast.success(
      soundEnabled && soundsLoaded
        ? "🔊 Opening the door..."
        : "Opening the door...",
      {
        duration: 2000,
      }
    );

    // Wait for door animation
    setTimeout(async () => {
      try {
        await signOut();
        toast.success("See you soon! 👋", {
          duration: 2000,
        });
        navigate("/");
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("Failed to logout. Please try again.");
        setIsLogoutAnimating(false);
      }
    }, 2500); // Wait for animation to complete
  };

  return (
    <aside
      className={`bg-primary text-white h-screen fixed top-0 left-0 z-30 flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } ${isLogoutAnimating ? "animate-pulse" : ""}`}
    >
      {/* Door Opening Overlay Effect */}
      {isLogoutAnimating && (
        <div className="absolute inset-0 z-50 overflow-hidden">
          {/* Left Door */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-gray-800 to-gray-700 transform origin-left animate-door-open-left shadow-2xl">
            <div className="absolute top-1/2 right-4 w-3 h-3 bg-yellow-400 rounded-full transform -translate-y-1/2 shadow-lg"></div>
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-gray-600"></div>
          </div>

          {/* Right Door */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-800 to-gray-700 transform origin-right animate-door-open-right shadow-2xl">
            <div className="absolute top-1/2 left-4 w-3 h-3 bg-yellow-400 rounded-full transform -translate-y-1/2 shadow-lg"></div>
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gray-600"></div>
          </div>

          {/* Light Coming Through */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent animate-light-sweep"></div>

          {/* Enhanced Hotel Manager Walking Out */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-walk-out">
            {/* Professional Hotel Manager Figure */}
            <div className="relative scale-110 filter drop-shadow-lg">
              {/* Head with professional styling */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-b from-amber-100 to-amber-200 rounded-full border border-amber-300 shadow-sm">
                {/* Professional manager cap with emblem */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-7 h-3 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full border border-gray-700 shadow-md"></div>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full shadow-sm border border-yellow-600"></div>
                {/* Face features */}
                <div className="absolute top-1 left-1 w-1 h-1 bg-gray-800 rounded-full"></div>
                <div className="absolute top-1 right-1 w-1 h-1 bg-gray-800 rounded-full"></div>
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-gray-700 rounded-full"></div>
              </div>

              {/* Premium Business Suit Body */}
              <div className="w-8 h-20 bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-t-lg relative shadow-lg border border-gray-700">
                {/* Suit jacket with lapels */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-5 h-10 bg-gradient-to-b from-gray-700 to-gray-800 rounded border border-gray-600 shadow-inner"></div>

                {/* Shirt collar */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-white rounded-t border border-gray-300"></div>

                {/* Premium tie with pattern */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1.5 h-8 bg-gradient-to-b from-red-600 to-red-700 rounded-sm shadow-sm border border-red-800">
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-red-400 rounded-full"></div>
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-red-400 rounded-full"></div>
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-red-400 rounded-full"></div>
                </div>

                {/* Gold suit buttons */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full shadow-sm border border-yellow-600"></div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full shadow-sm border border-yellow-600"></div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full shadow-sm border border-yellow-600"></div>

                {/* Breast pocket with name tag */}
                <div className="absolute top-3 left-1 w-2 h-1.5 bg-gray-600 rounded border border-gray-500">
                  <div className="absolute inset-0.5 bg-white rounded text-xs"></div>
                </div>

                {/* Professional arms with gestures */}
                <div className="absolute top-4 -left-3 w-4 h-12 bg-gradient-to-b from-gray-800 to-gray-900 rounded transform rotate-12 animate-arm-swing shadow-md">
                  {/* Shirt cuff */}
                  <div className="absolute bottom-2 w-full h-2 bg-white rounded border border-gray-300"></div>
                  {/* Professional hand */}
                  <div className="absolute bottom-0 w-3 h-3 bg-gradient-to-b from-amber-100 to-amber-200 rounded-full border border-amber-300"></div>
                </div>

                <div className="absolute top-4 -right-3 w-4 h-12 bg-gradient-to-b from-gray-800 to-gray-900 rounded transform -rotate-12 animate-arm-swing-reverse shadow-md">
                  {/* Shirt cuff */}
                  <div className="absolute bottom-2 w-full h-2 bg-white rounded border border-gray-300"></div>
                  {/* Hand holding premium briefcase */}
                  <div className="absolute bottom-0 w-3 h-3 bg-gradient-to-b from-amber-100 to-amber-200 rounded-full border border-amber-300"></div>
                  {/* Luxury briefcase */}
                  <div className="absolute bottom-0 -right-2 w-4 h-3 bg-gradient-to-b from-amber-800 to-amber-900 rounded border-2 border-amber-700 shadow-lg">
                    <div className="absolute top-0.5 left-0.5 w-3 h-0.5 bg-amber-600 rounded"></div>
                    <div className="absolute top-1 right-0.5 w-1 h-1 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>

                {/* Professional trousers */}
                <div className="absolute bottom-0 left-1 w-3 h-10 bg-gradient-to-b from-gray-900 to-black rounded-b transform animate-leg-walk shadow-md"></div>
                <div className="absolute bottom-0 right-1 w-3 h-10 bg-gradient-to-b from-gray-900 to-black rounded-b transform animate-leg-walk-reverse shadow-md"></div>

                {/* Premium leather shoes */}
                <div className="absolute -bottom-2 left-0.5 w-5 h-3 bg-gradient-to-b from-gray-900 to-black rounded-full shadow-lg border border-gray-800"></div>
                <div className="absolute -bottom-2 right-0.5 w-5 h-3 bg-gradient-to-b from-gray-900 to-black rounded-full shadow-lg border border-gray-800"></div>

                {/* Shoe shine effect */}
                <div className="absolute -bottom-1.5 left-1 w-2 h-1 bg-gray-400 rounded-full opacity-50"></div>
                <div className="absolute -bottom-1.5 right-1 w-2 h-1 bg-gray-400 rounded-full opacity-50"></div>
              </div>

              {/* Dynamic shadow with walking effect */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-black/40 rounded-full animate-pulse shadow-sm"></div>

              {/* Professional confidence aura */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/10 to-orange-400/10 blur-sm animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      <div className={`p-4 ${collapsed ? "justify-center" : ""} flex`}>
        {collapsed ? (
          <BarChart className="h-8 w-8 text-secondary" />
        ) : (
          <Logo variant="white" />
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="mt-6 px-2">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg relative group ${
                    isActive(item.path)
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5"
                  } ${
                    item.isAI
                      ? "hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:border hover:border-blue-400/30"
                      : ""
                  } transition duration-150`}
                >
                  <span
                    className={`${
                      item.isAI
                        ? "text-blue-400 group-hover:text-blue-300 group-hover:animate-pulse"
                        : "text-secondary"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <div className="flex items-center justify-between w-full ml-3">
                      <span className={item.isAI ? "font-medium" : ""}>
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full animate-pulse shadow-lg">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                  {collapsed && item.badge && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-gray-300 hover:bg-white/5 transition duration-150"
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <div className="flex items-center justify-between w-full">
              <span>Collapse Sidebar</span>
              <ChevronLeft size={20} />
            </div>
          )}
        </button>

        <button
          onClick={handleLogout}
          disabled={isLogoutAnimating}
          className={`mt-2 w-full flex items-center justify-center p-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
            isLogoutAnimating
              ? "bg-secondary text-white cursor-not-allowed"
              : "text-gray-300 hover:bg-secondary hover:text-white hover:shadow-lg hover:scale-105"
          }`}
        >
          {/* Animated Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/50 to-secondary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

          {collapsed ? (
            <div className="relative z-10 flex items-center">
              {isLogoutAnimating ? (
                <DoorOpen className="animate-bounce" size={20} />
              ) : (
                <LogOut
                  className="group-hover:scale-110 transition-transform duration-300"
                  size={20}
                />
              )}
            </div>
          ) : (
            <div className="relative z-10 flex items-center justify-between w-full">
              <span className="font-medium group-hover:font-bold transition-all duration-300">
                {isLogoutAnimating ? "Opening Door..." : "Logout"}
              </span>
              {isLogoutAnimating ? (
                <DoorOpen className="animate-bounce ml-2" size={20} />
              ) : (
                <LogOut
                  className="group-hover:scale-110 transition-transform duration-300 ml-2"
                  size={20}
                />
              )}
            </div>
          )}
        </button>

        {/* Sound Toggle Button - Positioned below logout */}
        {!collapsed && (
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`mt-2 w-full flex items-center justify-center p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
              soundEnabled
                ? "text-green-400 hover:bg-green-600/20 hover:text-green-300"
                : "text-gray-400 hover:bg-orange-500/20 hover:text-orange-400"
            }`}
            title={`Sound Effects: ${soundEnabled ? "ON" : "OFF"}`}
          >
            <div className="flex items-center space-x-2">
              {soundEnabled ? (
                <Volume2
                  size={16}
                  className="transition-transform duration-300 hover:scale-110"
                />
              ) : (
                <VolumeX
                  size={16}
                  className="transition-transform duration-300 hover:scale-110"
                />
              )}
              <span className="text-xs font-medium">
                {soundsLoaded
                  ? soundEnabled
                    ? "Sound ON"
                    : "Sound OFF"
                  : "Loading..."}
              </span>
            </div>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

