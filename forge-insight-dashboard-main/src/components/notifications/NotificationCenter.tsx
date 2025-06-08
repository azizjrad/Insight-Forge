import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Bell, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  created_at: string;
}

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // Helper to get the button position for the portal dropdown
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

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
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-300"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[1.25rem] shadow-lg">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </Button>

      {isOpen && buttonRect && createPortal(
        <div
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
          <Card className="bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Notifications
              </CardTitle>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto p-4">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No notifications</p>
                  <p className="text-gray-400 text-sm">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                        notification.read
                          ? "bg-gray-50/80 border-gray-200"
                          : "bg-white border-primary/20 shadow-sm ring-1 ring-primary/10"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="text-sm font-semibold text-gray-800">
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
                          <p className="text-sm text-gray-600 leading-relaxed">
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
                            className="hover:bg-primary/10 hover:text-primary rounded-lg ml-2 transition-all duration-200"
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
