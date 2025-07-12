import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Bell, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Remove auth import
import { toast } from "sonner";

interface NotificationCenterProps {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  created_at: string;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen: controlledIsOpen,
  onToggle,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  // Remove auth functionality
  const user = null;

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
    if (user) {
      // Set sample notifications for demo
      const sampleNotifications: Notification[] = [
        {
          id: "1",
          title: "Welcome to InsightForge",
          message: "Your account has been successfully set up.",
          type: "success",
          read: false,
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Data Sync Complete",
          message: "Your database has been synchronized successfully.",
          type: "info",
          read: false,
          created_at: new Date().toISOString(),
        },
      ];
      setNotifications(sampleNotifications);
      setUnreadCount(2);
    }
  }, [user]);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
  }, [isOpen]);

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    toast.success("All notifications marked as read");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-900/60 text-green-300 border-green-700";
      case "warning":
        return "bg-yellow-900/60 text-yellow-300 border-yellow-700";
      case "error":
        return "bg-red-900/60 text-red-300 border-red-700";
      default:
        return "bg-blue-900/60 text-blue-300 border-blue-700";
    }
  };

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:bg-secondary/20 hover:text-secondary rounded-xl transition-all duration-300 text-white"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[1.25rem] shadow-lg animate-pulse">
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
              top: buttonRect.bottom + 8, // 8px gap
              left: Math.min(
                buttonRect.left,
                window.innerWidth - 320 - 16 // 320px width + 16px margin
              ),
              width: 320,
            }}
          >
            <Card className="bg-primary/95 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-gray-700/50">
                <CardTitle className="text-lg font-semibold text-white">
                  Notifications
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs hover:bg-secondary/10 hover:text-secondary rounded-lg transition-all duration-200 text-gray-300"
                    >
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all duration-200 text-gray-300"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto p-4">
                {notifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-300 font-medium">
                      No notifications
                    </p>
                    <p className="text-gray-400 text-sm">
                      You're all caught up!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                          notification.read
                            ? "bg-gray-800/40 border-gray-700/50"
                            : "bg-gray-800/60 border-secondary/20 shadow-sm ring-1 ring-secondary/10"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-sm font-semibold text-white">
                                {notification.title}
                              </h4>
                              <Badge
                                className={`text-xs font-medium ${getTypeColor(
                                  notification.type
                                )}`}
                              >
                                {notification.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {new Date(
                                notification.created_at
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="hover:bg-secondary/10 hover:text-secondary rounded-lg ml-2 transition-all duration-200 text-gray-300"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
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

export default NotificationCenter;
