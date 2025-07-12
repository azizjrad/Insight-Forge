import React, { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import ScrollToTop from "../../components/ui/ScrollToTop";
import { useLanguage } from "../../contexts/LanguageContext";
import ProfileSettings from "../../components/settings/ProfileSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import PrivacyAppearanceSettings from "../../components/settings/PrivacyAppearanceSettings";
import DataManagement from "../../components/settings/DataManagement";
import SettingsKpiCards from "../../components/settings/SettingsKpiCards";
import { Download, Clock } from "lucide-react";
import { Button } from "../../components/ui/button";

const Settings = () => {
  const { t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    dataSharing: false,
    analytics: true,
  });

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-primary via-gray-900 to-primary">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-secondary/8 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10 animate-fade-in space-y-8 p-8">
        {/* Enhanced Header */}
        <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-xl p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary via-white to-accent bg-clip-text text-transparent mb-2">
                {t("settings.title")}
              </h1>
              <p className="text-gray-300 text-lg">
                {t("settings.description")}
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 px-4 py-2 text-gray-300 bg-gray-700/60 backdrop-blur-md border border-gray-600/50 rounded-xl hover:bg-gray-600/60 hover:text-gray-200 hover:shadow-lg transition-all duration-200 text-sm"
              >
                <Download size={16} />
                <span className="font-medium">Export Settings</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Settings Overview */}
        <div className="w-full">
          <SettingsKpiCards />
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ProfileSettings />
            <NotificationSettings
              notifications={notifications}
              setNotifications={setNotifications}
            />
          </div>
          <div className="space-y-6">
            <SecuritySettings
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <PrivacyAppearanceSettings
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              privacy={privacy}
              setPrivacy={setPrivacy}
            />
          </div>
        </div>

        {/* Data Management - Full Width */}
        <div className="w-full">
          <DataManagement />
        </div>

        {/* Scroll to top button */}
        <ScrollToTop />
      </div>
    </div>
  );
};

export default Settings;
