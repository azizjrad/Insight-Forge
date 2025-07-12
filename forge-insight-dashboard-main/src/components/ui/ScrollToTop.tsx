import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="group fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary/95 hover:bg-primary/100 text-gray-200 hover:text-secondary rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in border border-gray-600/30 hover:border-gray-500/50 hover:scale-105 overflow-hidden"
          aria-label="Scroll to top"
        >
          {/* Multi-layer glassmorphism overlay - only on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/12 via-primary/5 to-accent/12 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

          {/* Enhanced glass reflection on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/8 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-300"></div>

          {/* Subtle inner glow on hover */}
          <div className="absolute inset-0 shadow-inner shadow-secondary/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-300"></div>

          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-2xl"></div>

          {/* Arrow Icon */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <ArrowUp
              size={18}
              className="transform group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-200"
            />
          </div>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
