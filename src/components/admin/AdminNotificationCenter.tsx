import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Check,
  X,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Users,
  Database,
  Shield,
  Activity,
  Settings,
  Clock,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface AdminNotificationCenterProps {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error" | "security" | "system";
  category: "users" | "data" | "security" | "system" | "analytics";
  read: boolean;
  priority: "low" | "medium" | "high" | "critical";
  created_at: string;
  icon?: React.ReactNode;
}

const AdminNotificationCenter: React.FC<AdminNotificationCenterProps> = ({
  isOpen: controlledIsOpen,
  onToggle,
}) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  // Use controlled state if provided, otherwise use internal state
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setIsOpen = useCallback(
    (open: boolean) => {
      if (onToggle) {
        onToggle(open);
      } else {
        setInternalIsOpen(open);
      }
    },
    [onToggle]
  );

  // Helper to get the button position for the portal dropdown
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return;

      const target = event.target as Node;
      const isClickOnButton = buttonRef.current?.contains(target);
      const isClickOnDropdown = dropdownRef.current?.contains(target);

      if (!isClickOnButton && !isClickOnDropdown) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    // Set admin-specific sample notifications
    const sampleNotifications: AdminNotification[] = [
      {
        id: "1",
        title: "Critical Security Alert",
        message:
          "Multiple failed login attempts detected from IP 192.168.1.100",
        type: "error",
        category: "security",
        priority: "critical",
        read: false,
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        icon: <Shield className="h-4 w-4" />,
      },
      {
        id: "2",
        title: "System Backup Complete",
        message:
          "Daily system backup completed successfully. 2.4 GB backed up.",
        type: "success",
        category: "system",
        priority: "low",
        read: false,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        icon: <Database className="h-4 w-4" />,
      },
      {
        id: "3",
        title: "New User Registration",
        message:
          "5 new users registered in the last hour. Review pending approvals.",
        type: "info",
        category: "users",
        priority: "medium",
        read: false,
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        icon: <Users className="h-4 w-4" />,
      },
      {
        id: "4",
        title: "Data Sync Warning",
        message:
          "External API sync taking longer than usual. Monitor connection.",
        type: "warning",
        category: "data",
        priority: "medium",
        read: true,
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        icon: <Activity className="h-4 w-4" />,
      },
      {
        id: "5",
        title: "System Performance Alert",
        message:
          "CPU usage above 85% for the last 15 minutes. Consider scaling.",
        type: "warning",
        category: "system",
        priority: "high",
        read: false,
        created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        icon: <Settings className="h-4 w-4" />,
      },
    ];

    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter((n) => !n.read).length);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
    toast.success("Notification marked as read");
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
    toast.success("All notifications marked as read");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "security":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "system":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-600 text-white";
      case "high":
        return "bg-orange-600 text-white";
      case "medium":
        return "bg-yellow-600 text-white";
      case "low":
        return "bg-green-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-400" />;
      case "security":
        return <Shield className="h-4 w-4 text-purple-400" />;
      default:
        return <Info className="h-4 w-4 text-blue-400" />;
    }
  };

  const handleButtonClick = () => {
    if (buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
    setIsOpen(!isOpen);
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.category === filter);

  const categories = [
    { id: "all", label: "All", count: notifications.length },
    {
      id: "security",
      label: "Security",
      count: notifications.filter((n) => n.category === "security").length,
    },
    {
      id: "system",
      label: "System",
      count: notifications.filter((n) => n.category === "system").length,
    },
    {
      id: "users",
      label: "Users",
      count: notifications.filter((n) => n.category === "users").length,
    },
    {
      id: "data",
      label: "Data",
      count: notifications.filter((n) => n.category === "data").length,
    },
  ];

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        onClick={handleButtonClick}
        className="relative h-12 w-12 rounded-xl hover:bg-gray-800 shadow-sm border border-gray-700/50 transition-all duration-200"
      >
        <Bell className="h-5 w-5 text-gray-300" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 min-w-[1.2rem] h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </Button>

      {isOpen &&
        buttonRect &&
        createPortal(
          <div
            ref={dropdownRef}
            className="z-[9999]"
            style={{
              position: "fixed",
              top: buttonRect.bottom + 8,
              left: Math.min(
                buttonRect.left - 350 + buttonRect.width,
                window.innerWidth - 400 - 16
              ),
              width: 400,
            }}
          >
            <Card className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Bell className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-white">
                      Admin Notifications
                    </CardTitle>
                    <p className="text-xs text-gray-400">
                      {unreadCount} unread of {notifications.length} total
                    </p>
                  </div>
                </div>{" "}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/dashboard");
                    }}
                    className="text-xs hover:bg-green-500/10 hover:text-green-400 rounded-lg transition-all duration-200 text-gray-300 px-3 py-1 flex items-center space-x-1"
                  >
                    <LayoutDashboard className="h-3 w-3" />
                    <span>Dashboard</span>
                  </Button>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs hover:bg-blue-500/10 hover:text-blue-400 rounded-lg transition-all duration-200 text-gray-300 px-3 py-1"
                    >
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all duration-200 text-gray-300 p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Category Filters */}
              <div className="px-4 py-3 border-b border-gray-700/50 bg-gray-800/30">
                <div className="flex items-center space-x-2 overflow-x-auto">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={filter === category.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setFilter(category.id)}
                      className={`text-xs whitespace-nowrap transition-all duration-200 ${
                        filter === category.id
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "hover:bg-gray-700 text-gray-300"
                      }`}
                    >
                      {category.label}
                      {category.count > 0 && (
                        <Badge className="ml-1 bg-gray-600 text-white text-xs">
                          {category.count}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              <CardContent className="max-h-96 overflow-y-auto p-0">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8 px-4">
                    <Bell className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-300 font-medium">
                      No notifications
                    </p>
                    <p className="text-gray-400 text-sm">
                      {filter === "all"
                        ? "You're all caught up!"
                        : `No ${filter} notifications`}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-700/50">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 transition-all duration-200 hover:bg-gray-800/50 ${
                          !notification.read ? "bg-gray-800/30" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between space-x-3">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="flex-shrink-0 mt-1">
                              {notification.icon ||
                                getTypeIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-sm font-semibold text-white truncate">
                                  {notification.title}
                                </h4>
                                <div className="flex items-center space-x-2 ml-2">
                                  <Badge
                                    className={`text-xs font-medium ${getPriorityColor(
                                      notification.priority
                                    )}`}
                                  >
                                    {notification.priority}
                                  </Badge>
                                  <Badge
                                    className={`text-xs font-medium border ${getTypeColor(
                                      notification.type
                                    )}`}
                                  >
                                    {notification.type}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-gray-300 leading-relaxed mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-xs text-gray-400">
                                  <Clock className="h-3 w-3" />
                                  <span>
                                    {new Date(
                                      notification.created_at
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="hover:bg-blue-500/10 hover:text-blue-400 rounded-lg transition-all duration-200 text-gray-300 p-1"
                                  >
                                    <Check className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>,
          document.body
        )}
    </div>
  );
};

export default AdminNotificationCenter;
