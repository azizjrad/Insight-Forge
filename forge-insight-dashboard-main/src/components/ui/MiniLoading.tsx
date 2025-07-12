import React from "react";
import { BarChart3 } from "lucide-react";

interface MiniLoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  showMessage?: boolean;
}

const MiniLoading: React.FC<MiniLoadingProps> = ({
  message = "Loading...",
  size = "md",
  showMessage = true,
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      {/* Animated chart bars */}
      <div className="flex items-end justify-center space-x-1">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={`bg-gradient-to-t from-primary to-secondary rounded-t-sm transition-all duration-300 ease-in-out ${
              size === "sm" ? "w-1" : size === "md" ? "w-1.5" : "w-2"
            }`}
            style={{
              height: `${
                12 + (Math.sin(Date.now() / 300 + i * 0.5) + 1) * 8
              }px`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Logo icon with pulse */}
      <div className={`${sizeClasses[size]} text-primary animate-pulse`}>
        <BarChart3 className="w-full h-full" />
      </div>

      {/* Loading message */}
      {showMessage && (
        <p
          className={`text-gray-600 font-medium ${textSizeClasses[size]} animate-pulse`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default MiniLoading;
