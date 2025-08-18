import React, { useState } from "react";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import {
  Bell,
  Mail,
  AlertTriangle,
  Info,
  Smartphone,
  Calendar,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface NotificationSettingsProps {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  };
  setNotifications: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      push: boolean;
      sms: boolean;
      marketing: boolean;
    }>
  >;
}

interface ExtendedNotifications {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
  security: boolean;
  updates: boolean;
  reminders: boolean;
  analytics: boolean;
  teamActivity: boolean;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  notifications,
  setNotifications,
}) => {
  const [extendedNotifications, setExtendedNotifications] =
    useState<ExtendedNotifications>({
      ...notifications,
      security: true,
      updates: true,
      reminders: false,
      analytics: true,
      teamActivity: false,
    });

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleNotificationChange = (
    key: keyof ExtendedNotifications,
    value: boolean
  ) => {
    setExtendedNotifications((prev) => ({ ...prev, [key]: value }));

    // Update parent state for basic notifications
    if (key in notifications) {
      setNotifications((prev) => ({ ...prev, [key]: value }));
    }

    setSaveStatus("idle");
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const notificationCategories = [
    {
      title: "Communication",
      items: [
        {
          key: "email" as keyof ExtendedNotifications,
          icon: Mail,
          label: "Email Notifications",
          description: "Receive updates via email",
          color: "text-blue-600",
        },
        {
          key: "push" as keyof ExtendedNotifications,
          icon: Bell,
          label: "Push Notifications",
          description: "Real-time browser notifications",
          color: "text-purple-600",
        },
        {
          key: "sms" as keyof ExtendedNotifications,
          icon: Smartphone,
          label: "SMS Alerts",
          description: "Critical alerts via SMS",
          color: "text-green-600",
        },
      ],
    },
    {
      title: "Content & Updates",
      items: [
        {
          key: "marketing" as keyof ExtendedNotifications,
          icon: Info,
          label: "Marketing Updates",
          description: "Product news and updates",
          color: "text-orange-600",
        },
        {
          key: "updates" as keyof ExtendedNotifications,
          icon: TrendingUp,
          label: "System Updates",
          description: "Platform updates and new features",
          color: "text-indigo-600",
        },
        {
          key: "analytics" as keyof ExtendedNotifications,
          icon: TrendingUp,
          label: "Analytics Reports",
          description: "Weekly and monthly reports",
          color: "text-emerald-600",
        },
      ],
    },
    {
      title: "Security & Activity",
      items: [
        {
          key: "security" as keyof ExtendedNotifications,
          icon: AlertTriangle,
          label: "Security Alerts",
          description: "Login attempts and security events",
          color: "text-red-600",
        },
        {
          key: "teamActivity" as keyof ExtendedNotifications,
          icon: Users,
          label: "Team Activity",
          description: "Team member actions and updates",
          color: "text-cyan-600",
        },
        {
          key: "reminders" as keyof ExtendedNotifications,
          icon: Calendar,
          label: "Reminders",
          description: "Task and deadline reminders",
          color: "text-amber-600",
        },
      ],
    },
  ];
  return (
    <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-secondary/20 rounded-xl">
          <Bell className="w-6 h-6 text-secondary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Notification Settings
          </h3>
          <p className="text-sm text-gray-400">
            Control how you receive notifications
          </p>
        </div>
        {saveStatus === "success" && (
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Saved!</span>
          </div>
        )}
        {saveStatus === "error" && (
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle size={16} />
            <span className="text-sm font-medium">Save failed</span>
          </div>
        )}
      </div>{" "}
      <div className="space-y-6">
        {notificationCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-600/50 pb-2">
              {category.title}
            </h4>
            <div className="space-y-3">
              {category.items.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 bg-gray-700/40 backdrop-blur-sm rounded-lg hover:bg-gray-700/60 transition-all duration-200 border border-gray-600/30"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent
                        className={`w-5 h-5 ${item.color.replace(
                          "600",
                          "400"
                        )}`}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-200">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={extendedNotifications[item.key]}
                      onCheckedChange={(checked) =>
                        handleNotificationChange(item.key, checked)
                      }
                      className="data-[state=checked]:bg-secondary"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}{" "}
        <div className="pt-4 border-t border-gray-600/50">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 disabled:from-gray-600 disabled:to-gray-700 text-white py-2 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Preferences...
              </>
            ) : (
              "Save Notification Preferences"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NotificationSettings;
