import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { User, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "admin",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!profileData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!profileData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(profileData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setSaveStatus("idle");
  };

  const handleSave = async () => {
    if (!validateForm()) return;

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
  return (
    <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-xl">
          <User className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-200">
            Profile Settings
          </h3>
          <p className="text-sm text-gray-400">
            Manage your personal information
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
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-300"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              value={profileData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700/60 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-200 placeholder-gray-400 ${
                errors.firstName ? "border-red-500" : "border-gray-600/50"
              }`}
            />
            {errors.firstName && (
              <p className="text-sm text-red-400">{errors.firstName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-300"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              value={profileData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700/60 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-200 placeholder-gray-400 ${
                errors.lastName ? "border-red-500" : "border-gray-600/50"
              }`}
            />
            {errors.lastName && (
              <p className="text-sm text-red-400">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-300">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-3 py-2 bg-gray-700/60 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-200 placeholder-gray-400 ${
              errors.email ? "border-red-500" : "border-gray-600/50"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm font-medium text-gray-300">
            Role
          </Label>
          <Select
            value={profileData.role}
            onValueChange={(value) => handleInputChange("role", value)}
          >
            <SelectTrigger className="w-full bg-gray-700/60 border-gray-600/50 text-gray-200">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem
                value="admin"
                className="text-gray-200 hover:bg-gray-700"
              >
                Administrator
              </SelectItem>
              <SelectItem
                value="manager"
                className="text-gray-200 hover:bg-gray-700"
              >
                Manager
              </SelectItem>
              <SelectItem
                value="user"
                className="text-gray-200 hover:bg-gray-700"
              >
                User
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-400 disabled:to-blue-500 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Profile Changes"
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ProfileSettings;
