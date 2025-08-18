import React from "react";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Palette, Moon, Sun, User, Database, Globe } from "lucide-react";

interface PrivacyAppearanceSettingsProps {
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  privacy: {
    profileVisible: boolean;
    dataSharing: boolean;
    analytics: boolean;
  };
  setPrivacy: React.Dispatch<
    React.SetStateAction<{
      profileVisible: boolean;
      dataSharing: boolean;
      analytics: boolean;
    }>
  >;
}

const PrivacyAppearanceSettings: React.FC<PrivacyAppearanceSettingsProps> = ({
  isDarkMode,
  setIsDarkMode,
  privacy,
  setPrivacy,
}) => {
  return (
    <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-accent/20 rounded-xl">
          <Palette className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Privacy & Appearance
          </h3>
          <p className="text-sm text-gray-400">
            Control your privacy and theme preferences
          </p>
        </div>
      </div>{" "}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-700/40 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/60 transition-all duration-200">
          <div className="flex items-center gap-3">
            {isDarkMode ? (
              <Moon className="w-5 h-5 text-accent" />
            ) : (
              <Sun className="w-5 h-5 text-accent" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-200">Dark Mode</p>
              <p className="text-xs text-gray-400">
                Switch between light and dark themes
              </p>
            </div>
          </div>
          <Switch
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            className="data-[state=checked]:bg-accent"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700/40 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/60 transition-all duration-200">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm font-medium text-gray-200">
                Public Profile
              </p>
              <p className="text-xs text-gray-400">
                Make your profile visible to others
              </p>
            </div>
          </div>
          <Switch
            checked={privacy.profileVisible}
            onCheckedChange={(checked) =>
              setPrivacy((prev) => ({ ...prev, profileVisible: checked }))
            }
            className="data-[state=checked]:bg-accent"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700/40 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/60 transition-all duration-200">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm font-medium text-gray-200">Data Sharing</p>
              <p className="text-xs text-gray-400">
                Share analytics data for improvements
              </p>
            </div>
          </div>
          <Switch
            checked={privacy.dataSharing}
            onCheckedChange={(checked) =>
              setPrivacy((prev) => ({ ...prev, dataSharing: checked }))
            }
            className="data-[state=checked]:bg-accent"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700/40 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/60 transition-all duration-200">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm font-medium text-gray-200">
                Usage Analytics
              </p>
              <p className="text-xs text-gray-400">Help improve our services</p>
            </div>
          </div>
          <Switch
            checked={privacy.analytics}
            onCheckedChange={(checked) =>
              setPrivacy((prev) => ({ ...prev, analytics: checked }))
            }
            className="data-[state=checked]:bg-accent"
          />
        </div>
      </div>
    </Card>
  );
};

export default PrivacyAppearanceSettings;
