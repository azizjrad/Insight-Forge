import React from "react";
import { X, Sparkles, TrendingUp } from "lucide-react";

interface AnnouncementBarProps {
  isScrollHidden: boolean;
  onDismiss: () => void;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  isScrollHidden,
  onDismiss,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-secondary/95 via-orange-500/95 to-red-500/95 backdrop-blur-sm border-b border-orange-400/30 transition-all duration-700 ease-out ${
        isScrollHidden
          ? "-translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 opacity-100"></div>
      {/* Content */}
      <div className="relative z-10 px-4 md:px-8 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Announcement content */}
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-white animate-pulse" />
              <Sparkles className="w-4 h-4 text-orange-200" />
            </div>

            <div className="flex items-center gap-2 text-white">
              <span className="font-semibold text-sm md:text-base">
                🚀 New Feature Alert:
              </span>
              <span className="text-sm md:text-base">
                Advanced Analytics Dashboard with AI-Powered Insights now
                available!
              </span>
              <span className="hidden md:inline text-orange-200 font-medium ml-2">
                Try it free →
              </span>
            </div>
          </div>{" "}
          {/* Close button */}
          <button
            onClick={onDismiss}
            className="group relative p-1.5 rounded-lg transition-all duration-300 hover:bg-white/20 ml-4"
          >
            <X className="w-4 h-4 text-white/80 group-hover:text-white transition-colors duration-300" />

            {/* Hover effect */}
            <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300/50 to-transparent"></div>{" "}
    </div>
  );
};

export default AnnouncementBar;
