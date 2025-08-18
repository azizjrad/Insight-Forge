import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Settings as SettingsIcon,
  Shield,
  Bell,
  Database,
  AlertTriangle,
  Save,
  Mail,
  Lock,
  Server,
  Globe,
  Zap,
  CheckCircle,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AdminSettings: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleSave = async (section: string) => {
    setIsSaving(true);
    setSaveStatus("idle");

    // Simulate save operation
    setTimeout(() => {
      setSaveStatus("success");
      setIsSaving(false);
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Enhanced Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-indigo-500/10 rounded-3xl blur-2xl"></div>
        <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-30"></div>
              <div className="relative p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30">
                <SettingsIcon className="w-10 h-10 text-blue-400" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-2">
                System Configuration
              </h1>
              <p className="text-xl text-slate-300">
                Advanced administration settings & preferences
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-green-900 text-green-300 border-green-700 px-3 py-1"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                System Online
              </Badge>
              {saveStatus === "success" && (
                <Badge
                  variant="secondary"
                  className="bg-blue-900 text-blue-300 border-blue-700 px-3 py-1"
                >
                  <CheckCircle className="w-3 h-3 mr-2" />
                  Settings Saved
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Settings Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-indigo-500/5 rounded-3xl blur-2xl"></div>
          <Card className="relative bg-slate-800/40 backdrop-blur-xl border-slate-700/50 shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    General Settings
                  </CardTitle>
                  <p className="text-slate-400 mt-1">
                    Core system configuration
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label
                  htmlFor="site-name"
                  className="text-sm font-medium text-slate-300"
                >
                  Site Name
                </Label>
                <Input
                  id="site-name"
                  defaultValue="InsightForge"
                  className="bg-slate-700/50 border-slate-600/50 text-white focus:border-cyan-500/50 focus:ring-cyan-500/20"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="admin-email"
                  className="text-sm font-medium text-slate-300"
                >
                  Admin Email
                </Label>
                <Input
                  id="admin-email"
                  type="email"
                  defaultValue="admin@insightforge.com"
                  className="bg-slate-700/50 border-slate-600/50 text-white focus:border-cyan-500/50 focus:ring-cyan-500/20"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <Label className="text-slate-200 font-medium">
                      Maintenance Mode
                    </Label>
                    <p className="text-sm text-slate-400">
                      Put the site in maintenance mode
                    </p>
                  </div>
                </div>
                <Switch className="data-[state=checked]:bg-orange-600" />
              </div>

              <Button
                onClick={() => handleSave("general")}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSaving ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Security Settings */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-yellow-500/5 rounded-3xl blur-2xl"></div>
          <Card className="relative bg-slate-800/40 backdrop-blur-xl border-slate-700/50 shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl border border-red-500/30">
                  <Shield className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    Security Settings
                  </CardTitle>
                  <p className="text-slate-400 mt-1">
                    Account protection & access control
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Lock className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <Label className="text-slate-200 font-medium">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-slate-400">
                      Require 2FA for admin accounts
                    </p>
                  </div>
                </div>
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-green-600"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Zap className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <Label className="text-slate-200 font-medium">
                      Auto-Lock Sessions
                    </Label>
                    <p className="text-sm text-slate-400">
                      Lock inactive sessions after 30 minutes
                    </p>
                  </div>
                </div>
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>

              <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                <div className="space-y-3">
                  <Label
                    htmlFor="session-timeout"
                    className="text-sm font-medium text-slate-300"
                  >
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    defaultValue="30"
                    className="bg-slate-600/50 border-slate-500/50 text-white focus:border-red-500/50 focus:ring-red-500/20"
                  />
                </div>
              </div>

              <Button
                onClick={() => handleSave("security")}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSaving ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                    Updating Security...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Update Security
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 rounded-3xl blur-2xl"></div>
          <Card className="relative bg-slate-800/40 backdrop-blur-xl border-slate-700/50 shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                  <Bell className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    Notification Settings
                  </CardTitle>
                  <p className="text-slate-400 mt-1">
                    Communication preferences
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <Label className="text-slate-200 font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-slate-400">
                      Send email alerts for important events
                    </p>
                  </div>
                </div>
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <Label className="text-slate-200 font-medium">
                      System Alerts
                    </Label>
                    <p className="text-sm text-slate-400">
                      Get notified about system issues
                    </p>
                  </div>
                </div>
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-red-600"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Activity className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <Label className="text-slate-200 font-medium">
                      User Activity
                    </Label>
                    <p className="text-sm text-slate-400">
                      Notifications for user sign-ups and logins
                    </p>
                  </div>
                </div>
                <Switch className="data-[state=checked]:bg-green-600" />
              </div>

              <Button
                onClick={() => handleSave("notifications")}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSaving ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                    Saving Preferences...
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4 mr-2" />
                    Save Preferences
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Data Management */}
        <div className="relative xl:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-teal-500/5 to-emerald-500/5 rounded-3xl blur-2xl"></div>
          <Card className="relative bg-slate-800/40 backdrop-blur-xl border-slate-700/50 shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl border border-green-500/30">
                  <Database className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    Data Management
                  </CardTitle>
                  <p className="text-slate-400 mt-1">
                    Backup, export & maintenance operations
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:bg-slate-700/50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                      <Server className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <Label className="text-slate-200 font-medium">
                        Data Retention
                      </Label>
                      <p className="text-sm text-slate-400">
                        Keep activity logs for 90 days
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="p-4 h-auto flex-col items-start bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-500/50 text-slate-300 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-3 mb-2 w-full">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Database className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-medium">Export Data</p>
                      <p className="text-xs text-slate-400">
                        Download system data
                      </p>
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="p-4 h-auto flex-col items-start bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-500/50 text-slate-300 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-3 mb-2 w-full">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                      <Shield className="w-5 h-5 text-teal-400" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-medium">Backup Database</p>
                      <p className="text-xs text-slate-400">
                        Create system backup
                      </p>
                    </div>
                  </div>
                </Button>
              </div>

              <Separator className="bg-slate-600/50" />

              <div className="p-6 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-xl border border-red-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-500/20 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <Label className="text-red-300 font-bold text-lg">
                      Danger Zone
                    </Label>
                    <p className="text-sm text-red-400">
                      Irreversible actions - use with extreme caution
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="destructive"
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Clear All Logs
                  </Button>

                  <Button
                    variant="destructive"
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Reset Database
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
