import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, Zap } from "lucide-react";

interface LogoProps {
  variant?: "default" | "white" | "admin";
  to?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = "default", to }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "white":
        return {
          textColor: "text-white",
          iconColor: "text-secondary",
          containerGradient: "from-secondary/10 via-secondary/5 to-transparent",
          hoverContainerGradient:
            "group-hover:from-secondary/20 group-hover:via-secondary/10",
          glowGradient: "from-secondary/5 to-transparent",
        };
      case "admin":
        return {
          textColor: "text-white",
          iconColor: "text-blue-400",
          containerGradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
          hoverContainerGradient:
            "group-hover:from-blue-500/30 group-hover:via-cyan-500/20",
          glowGradient: "from-blue-500/10 to-cyan-500/5",
        };
      default:
        return {
          textColor: "text-primary",
          iconColor: "text-secondary",
          containerGradient: "from-secondary/10 via-secondary/5 to-transparent",
          hoverContainerGradient:
            "group-hover:from-secondary/20 group-hover:via-secondary/10",
          glowGradient: "from-secondary/5 to-transparent",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Link
      to={to || (variant === "admin" ? "/admin" : "/")}
      className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
    >
      {/* Enhanced Logo Icon */}
      <div className="relative flex items-center">
        {/* Main Chart Icon with Container */}
        <div
          className={`relative p-2 bg-gradient-to-br ${
            styles.containerGradient
          } rounded-xl ${
            styles.hoverContainerGradient
          } transition-all duration-300 shadow-lg group-hover:shadow-xl ${
            variant === "admin" ? "group-hover:shadow-blue-500/25" : ""
          }`}
        >
          <BarChart3
            className={`h-7 w-7 ${styles.iconColor} transform group-hover:scale-110 transition-transform duration-300`}
          />

          {/* Accent Spark */}
          <div className="absolute -top-1 -right-1">
            <div className="relative">
              {/* Pulsing Background */}
              <div
                className={`absolute inset-0 w-4 h-4 ${
                  variant === "admin" ? "bg-cyan-400/30" : "bg-accent/20"
                } rounded-full animate-ping`}
              ></div>
              {/* Static Spark Icon */}
              <Zap
                className={`w-4 h-4 ${
                  variant === "admin" ? "text-cyan-400" : "text-accent"
                } fill-current`}
              />
            </div>
          </div>

          {/* Enhanced Glow Effect for Admin */}
          {variant === "admin" && (
            <>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-300"></div>
            </>
          )}

          {/* Standard Glow Effect */}
          {variant !== "admin" && (
            <div
              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${styles.glowGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>
          )}
        </div>
      </div>

      {/* Enhanced Text Logo */}
      <div className="flex flex-col">
        <span
          className={`font-bold text-xl ${styles.textColor} tracking-tight group-hover:tracking-wide transition-all duration-300`}
        >
          <span className="text-white">Insight</span>
          <span
            className={variant === "admin" ? "text-cyan-400" : "text-accent"}
          >
            Forge
          </span>
        </span>
        <div
          className={`h-0.5 w-0 bg-gradient-to-r ${
            variant === "admin"
              ? "from-blue-400 to-cyan-400"
              : "from-secondary to-accent"
          } group-hover:w-full transition-all duration-500`}
        ></div>
      </div>
    </Link>
  );
};

export default Logo;
