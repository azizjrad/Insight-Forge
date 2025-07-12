import React from "react";
import { Card } from "../ui/card";
import { User, Shield, Bell, Palette, Check, Sun } from "lucide-react";

const SettingsKpiCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-300 mb-1">
              Profile Status
            </p>
            <p className="text-2xl font-bold text-blue-400 truncate">
              Complete
            </p>
            <p className="text-sm text-blue-300 mt-1 flex items-center">
              <Check size={12} className="inline mr-1 flex-shrink-0" />
              <span className="truncate">All fields filled</span>
            </p>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors flex-shrink-0 ml-2">
            <User className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </Card>

      <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-green-500/30 transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-300 mb-1">
              Security Level
            </p>
            <p className="text-2xl font-bold text-green-400 truncate">High</p>
            <p className="text-sm text-green-300 mt-1 flex items-center">
              <Shield size={12} className="inline mr-1 flex-shrink-0" />
              <span className="truncate">2FA enabled</span>
            </p>
          </div>
          <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors flex-shrink-0 ml-2">
            <Shield className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </Card>

      <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-purple-500/30 transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-300 mb-1">
              Notifications
            </p>
            <p className="text-2xl font-bold text-purple-400 truncate">
              3 Active
            </p>
            <p className="text-sm text-purple-300 mt-1 flex items-center">
              <Bell size={12} className="inline mr-1 flex-shrink-0" />
              <span className="truncate">Email & SMS</span>
            </p>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors flex-shrink-0 ml-2">
            <Bell className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </Card>

      <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-orange-500/30 transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-300 mb-1">Theme</p>
            <p className="text-2xl font-bold text-orange-400 truncate">Dark</p>
            <p className="text-sm text-orange-300 mt-1 flex items-center">
              <Sun size={12} className="inline mr-1 flex-shrink-0" />
              <span className="truncate">Current mode</span>
            </p>
          </div>
          <div className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors flex-shrink-0 ml-2">
            <Palette className="w-6 h-6 text-orange-400" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsKpiCards;
