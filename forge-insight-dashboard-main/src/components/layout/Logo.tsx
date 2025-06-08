import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, Zap } from "lucide-react";

interface LogoProps {
  variant?: "default" | "white";
}

export const Logo: React.FC<LogoProps> = ({ variant = "default" }) => {
  const textColor = variant === "white" ? "text-white" : "text-primary";
  const iconColor = "text-secondary"; // Always orange/secondary color

  return (
    <Link
      to="/"
      className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
    >
      {/* Enhanced Logo Icon */}
      <div className="relative flex items-center">
        {/* Main Chart Icon with Container */}
        <div className="relative p-2 bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent rounded-xl group-hover:from-secondary/20 group-hover:via-secondary/10 transition-all duration-300">
          <BarChart3
            className={`h-7 w-7 ${iconColor} transform group-hover:scale-110 transition-transform duration-300`}
          />

          {/* Accent Spark */}
          <div className="absolute -top-1 -right-1">
            <div className="relative">
              {/* Pulsing Background */}
              <div className="absolute inset-0 w-4 h-4 bg-accent/20 rounded-full animate-ping"></div>
              {/* Static Spark Icon */}
              <Zap className="w-4 h-4 text-accent fill-current" />
            </div>
          </div>

          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Enhanced Text Logo */}
      <div className="flex flex-col">
        <span
          className={`font-bold text-xl ${textColor} tracking-tight group-hover:tracking-wide transition-all duration-300`}
        >
          Insight<span className="text-accent">Forge</span>
        </span>
        <div className="h-0.5 w-0 bg-gradient-to-r from-secondary to-accent group-hover:w-full transition-all duration-500"></div>
      </div>
    </Link>
  );
};

export default Logo;
