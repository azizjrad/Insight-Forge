import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface SimpleNavbarProps {
  hasAnnouncementBar?: boolean;
  isHidden?: boolean;
}

const SimpleNavbar: React.FC<SimpleNavbarProps> = ({
  hasAnnouncementBar = false,
  isHidden = false,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { t } = useLanguage();

  // Enhanced scroll effect with hide/show functionality
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled state for styling
      setScrolled(currentScrollY > 10);

      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold
        setHidden(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <nav
      className={`fixed left-0 right-0 z-40 transition-all duration-700 ease-out ${
        isHidden || hidden
          ? "-translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      style={{ top: hasAnnouncementBar ? "3rem" : "0" }}
    >
      {/* Enhanced Glass Morphism Container */}
      <div className="px-4 md:px-6 py-2">
        <div
          className={`relative transition-all duration-700 ease-out bg-primary/95 backdrop-blur-3xl border border-gray-600/30 shadow-2xl shadow-black/25 rounded-2xl md:rounded-3xl ${
            scrolled ? "" : ""
          }`}
        >
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/12 via-primary/5 to-accent/12 opacity-100 transition-all duration-700 rounded-2xl md:rounded-3xl"></div>

          {/* Enhanced glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-100 transition-all duration-700 rounded-2xl md:rounded-3xl"></div>

          {/* Subtle inner glow */}
          <div className="absolute inset-0 shadow-inner shadow-secondary/10 opacity-100 transition-all duration-700 rounded-2xl md:rounded-3xl"></div>

          <div className="relative z-10 w-full px-6 md:px-8">
            <div
              className={`flex items-center justify-between transition-all duration-700 ${
                scrolled ? "py-3" : "py-4"
              }`}
            >
              {/* Logo at left */}
              <div className="group relative flex-shrink-0">
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    scrolled
                      ? "bg-gradient-to-r from-secondary/20 to-accent/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 scale-110"
                      : "bg-gradient-to-r from-secondary/12 to-accent/12 rounded-xl opacity-0 group-hover:opacity-100 scale-105"
                  } -z-10 group-hover:scale-110`}
                ></div>
                <div
                  className={`transition-all duration-300 ${
                    scrolled ? "scale-95" : "scale-100"
                  } group-hover:scale-105`}
                >
                  <Logo />
                </div>
              </div>{" "}
              {/* Right Section: Language Selector, Login Button */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                {/* Language Selector */}
                <div className="relative">
                  <LanguageSelector />
                </div>

                {/* Login Button */}
                <NavLink
                  to="/login"
                  className="group relative px-4 py-2.5 rounded-2xl font-medium transition-all duration-500 overflow-hidden text-gray-200 hover:text-secondary hover:bg-gray-700/50 hover:backdrop-blur-3xl hover:shadow-lg hover:scale-105"
                >
                  <span className="relative z-10">{t("nav.login")}</span>

                  {/* Enhanced glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500 pointer-events-none"></div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-2xl pointer-events-none"></div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
