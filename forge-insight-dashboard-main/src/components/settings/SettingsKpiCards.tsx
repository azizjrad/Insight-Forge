import React from "react";
import { Card } from "../ui/card";
import { User, Shield, Bell, Palette, Check, Sun } from "lucide-react";

const SettingsKpiCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-blue-700 mb-1">
              Profile Status
            </p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900 truncate">
              Complete
            </p>
            <p className="text-xs sm:text-sm text-blue-600 mt-1 flex items-center">
              <Check size={12} className="inline mr-1 flex-shrink-0" />
              <span className="truncate">All fields filled</span>
            </p>
          </div>
          <div className="p-2 sm:p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors flex-shrink-0 ml-2">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-green-700 mb-1">
              Security Level
            </p>
            <p className="text-xl sm:text-2xl font-bold text-green-900 truncate">
              High
            </p>
            <p className="text-xs sm:text-sm text-green-600 mt-1 flex items-center">
              <Shield size={12} className="inline mr-1 flex-shrink-0" />
              <span className="truncate">2FA enabled</span>
            </p>
          </div>
          <div className="p-2 sm:p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors flex-shrink-0 ml-2">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-purple-700 mb-1">
              Notifications
            </p>
            <p className="text-xl sm:text-2xl font-bold text-purple-900 truncate">
              3 Active
            </p>
            <p className="text-xs sm:text-sm text-purple-600 mt-1 flex items-center">
              <Bell size={12} className="inline mr-1 flex-shrink-0" />
              <span className="truncate">Email & SMS</span>
            </p>
          </div>
          <div className="p-2 sm:p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors flex-shrink-0 ml-2">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/50 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-orange-700 mb-1">
              Theme
            </p>
            <p className="text-xl sm:text-2xl font-bold text-orange-900 truncate">
              Light
            </p>
            <p className="text-xs sm:text-sm text-orange-600 mt-1 flex items-center">
              <Sun size={12} className="inline mr-1 flex-shrink-0" />
              <span className="truncate">Default mode</span>
            </p>
          </div>
          <div className="p-2 sm:p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors flex-shrink-0 ml-2">
            <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsKpiCards;
