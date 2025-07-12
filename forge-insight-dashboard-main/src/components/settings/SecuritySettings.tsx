import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface SecuritySettingsProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  showPassword,
  setShowPassword,
}) => {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<PasswordErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const validatePasswords = (): boolean => {
    const newErrors: PasswordErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)
    ) {
      newErrors.newPassword =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = (field: keyof PasswordData, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setSaveStatus("idle");
  };

  const handleSave = async () => {
    if (!validatePasswords()) return;

    setIsLoading(true);
    setSaveStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSaveStatus("success");
      // Clear password fields on success
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-green-500/30 transition-all duration-300 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-500/10 rounded-xl">
          <Shield className="w-6 h-6 text-green-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-200">
            Security Settings
          </h3>
          <p className="text-sm text-gray-400">Manage your account security</p>
        </div>
        {saveStatus === "success" && (
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Password updated!</span>
          </div>
        )}
        {saveStatus === "error" && (
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle size={16} />
            <span className="text-sm font-medium">Update failed</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="currentPassword"
            className="text-sm font-medium text-gray-300"
          >
            Current Password
          </Label>
          <div className="relative">
            <Input
              id="currentPassword"
              type={showPassword ? "text" : "password"}
              value={passwordData.currentPassword}
              onChange={(e) =>
                handlePasswordChange("currentPassword", e.target.value)
              }
              className={`w-full px-3 py-2 pr-10 bg-gray-700/60 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-200 placeholder-gray-400 ${
                errors.currentPassword ? "border-red-500" : "border-gray-600/50"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-sm text-red-400">{errors.currentPassword}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="newPassword"
            className="text-sm font-medium text-gray-300"
          >
            New Password
          </Label>
          <Input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            value={passwordData.newPassword}
            onChange={(e) =>
              handlePasswordChange("newPassword", e.target.value)
            }
            className={`w-full px-3 py-2 bg-gray-700/60 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-200 placeholder-gray-400 ${
              errors.newPassword ? "border-red-500" : "border-gray-600/50"
            }`}
          />
          {errors.newPassword && (
            <p className="text-sm text-red-400">{errors.newPassword}</p>
          )}
          <div className="text-xs text-gray-400 space-y-1">
            <p>Password requirements:</p>
            <ul className="pl-4 space-y-1">
              <li
                className={`flex items-center gap-2 ${
                  passwordData.newPassword.length >= 8
                    ? "text-green-400"
                    : "text-gray-500"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    passwordData.newPassword.length >= 8
                      ? "bg-green-400"
                      : "bg-gray-600"
                  }`}
                />
                At least 8 characters
              </li>
              <li
                className={`flex items-center gap-2 ${
                  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(
                    passwordData.newPassword
                  )
                    ? "text-green-400"
                    : "text-gray-500"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(
                      passwordData.newPassword
                    )
                      ? "bg-green-400"
                      : "bg-gray-600"
                  }`}
                />
                Uppercase, lowercase, and number
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-300"
          >
            Confirm New Password
          </Label>
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={passwordData.confirmPassword}
            onChange={(e) =>
              handlePasswordChange("confirmPassword", e.target.value)
            }
            className={`w-full px-3 py-2 bg-gray-700/60 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-200 placeholder-gray-400 ${
              errors.confirmPassword ? "border-red-500" : "border-gray-600/50"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-400">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700/40 backdrop-blur-md rounded-xl border border-gray-600/30">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-sm font-medium text-gray-200">
                Two-Factor Authentication
              </p>
              <p className="text-xs text-gray-400">Enhanced account security</p>
            </div>
          </div>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={setTwoFactorEnabled}
            className="data-[state=checked]:bg-green-500"
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-green-400 disabled:to-green-500 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Updating Security...
            </>
          ) : (
            "Update Security Settings"
          )}
        </Button>
      </div>
    </Card>
  );
};

export default SecuritySettings;
