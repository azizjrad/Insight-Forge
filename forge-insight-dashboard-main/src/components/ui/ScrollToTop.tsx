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
          className="group fixed bottom-8 right-8 z-50 w-12 h-12 bg-black/90 hover:bg-black text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in backdrop-blur-sm border border-gray-800/50 hover:border-gray-700"
          aria-label="Scroll to top"
        >
          {/* Background Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-600/20 to-gray-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Arrow Icon */}
          <div className="relative flex items-center justify-center h-full">
            <ArrowUp
              size={18}
              className="transform group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-200"
            />
          </div>

          {/* Subtle Ring Animation on Hover */}
          <div className="absolute inset-0 rounded-full border-2 border-gray-600/30 scale-0 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
