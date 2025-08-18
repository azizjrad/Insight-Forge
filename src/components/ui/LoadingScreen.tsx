import React, { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadingComplete,
  duration = 8000, // Increased default to account for slow connections
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation - more responsive to actual loading
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      // Slower progress fill to account for potential longer loading times
      const newProgress = Math.min((elapsed / duration) * 100, 95); // Cap at 95% until actually ready
      setProgress(newProgress);
    }, 16); // ~60fps

    // Don't auto-hide based on duration - let the loading context handle it
    const timer = setTimeout(() => {
      setProgress(100); // Complete the animation
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onLoadingComplete?.();
        }, 300);
      }, 200);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onLoadingComplete]);

  if (!isVisible) return null;
  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center 
        bg-primary/60 backdrop-blur-lg
        transition-opacity duration-300 ease-in-out
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      {" "}
      {/* Loading content - no background card */}
      <div className="flex flex-col items-center space-y-6">
        {/* Logo with fill animation */}
        <div className="relative">
          <div className="w-16 h-16 relative">
            {/* Background transparent icon */}
            <BarChart3 className="w-full h-full text-gray-600 absolute inset-0" />
            {/* Filling icon with mask */}
            <div
              className="w-full h-full overflow-hidden absolute inset-0"
              style={{
                clipPath: `inset(${100 - progress}% 0 0 0)`,
              }}
            >
              <BarChart3 className="w-full h-full text-secondary drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Company name */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-sm">
            Insight<span className="text-accent">Forge</span>
          </h1>
          <p className="text-gray-300 text-sm">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
