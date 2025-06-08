import React, { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import LanguageSelector from "../../components/layout/LanguageSelector";
import ScrollToTop from "../../components/ui/ScrollToTop";
import { useLanguage } from "../../contexts/LanguageContext";
import ProfileSettings from "../../components/settings/ProfileSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import PrivacyAppearanceSettings from "../../components/settings/PrivacyAppearanceSettings";
import DataManagement from "../../components/settings/DataManagement";
import SettingsKpiCards from "../../components/settings/SettingsKpiCards";
import { Download } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 animate-fade-in">
      <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-8">
        {/* Main content wrapper */}
        <PageHeader
          title={t("settings.title")}
          description={t("settings.description")}
          actions={
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 text-sm"
              >
                <Download size={16} />
                <span className="font-medium">Export Settings</span>
              </Button>
              <LanguageSelector variant="dashboard" />
            </div>
          }
        />

        {/* Quick Settings Overview */}
        <div className="w-full">
          <SettingsKpiCards />
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-4 sm:space-y-6">
            <ProfileSettings />
            <NotificationSettings
              notifications={notifications}
              setNotifications={setNotifications}
            />
          </div>
          <div className="space-y-4 sm:space-y-6">
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
