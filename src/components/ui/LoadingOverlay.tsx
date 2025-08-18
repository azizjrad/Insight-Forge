import React from "react";
import { BarChart3 } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  blur?: boolean;
  fullScreen?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = "Loading data...",
  blur = true,
  fullScreen = false,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={`
      ${fullScreen ? "fixed inset-0" : "absolute inset-0"} 
      bg-white/80 ${blur ? "backdrop-blur-sm" : ""} 
      flex items-center justify-center z-50 
      transition-all duration-300 ease-in-out
    `}
    >
      <div className="flex flex-col items-center space-y-4 p-6 bg-white/90 rounded-2xl shadow-lg border border-gray-100">
        {/* Animated chart visualization */}
        <div className="relative">
          {/* Main chart bars */}
          <div className="flex items-end justify-center space-x-2 h-16 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all duration-500 ease-in-out w-3"
                style={{
                  height: `${
                    20 + Math.sin(Date.now() / 400 + i * 0.8) * 15 + 15
                  }px`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>

          {/* Pulsing center icon */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <BarChart3 size={16} className="text-white" />
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            InsightForge
          </h3>
          <p className="text-sm text-gray-600 animate-pulse">{message}</p>
        </div>

        {/* Progress dots */}
        <div className="flex space-x-1">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
