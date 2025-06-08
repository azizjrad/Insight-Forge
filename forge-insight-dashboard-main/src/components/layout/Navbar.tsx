import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  // Handle scroll effect for navbar backdrop
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.faq"), path: "/faq" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const MobileNav = () => (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden relative group p-2 rounded-xl hover:bg-gray-100 transition-all duration-300">
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                open ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 mt-1.5 transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 mt-1.5 transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] md:hidden bg-white/95 backdrop-blur-xl border-l border-gray-200/50"
      >
        <nav className="flex flex-col space-y-2 mt-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `group relative px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-secondary/10 to-secondary/5 text-secondary font-semibold border-l-4 border-secondary"
                    : "text-gray-700 hover:text-secondary hover:bg-gray-50 hover:translate-x-1"
                }`
              }
            >
              <span className="relative z-10">{item.name}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NavLink>
          ))}

          <div className="pt-6 mt-6 border-t border-gray-200">
            <div className="space-y-3">
              <NavLink
                to="/login"
                className="group relative block w-full px-4 py-3 text-center text-primary font-semibold border-2 border-primary/20 rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                onClick={() => setOpen(false)}
              >
                <span className="relative z-10">{t("nav.login")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </NavLink>

              <NavLink
                to="/register"
                className="group relative block w-full px-4 py-3 text-center bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={() => setOpen(false)}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t("nav.register")}
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </NavLink>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-200">
            <LanguageSelector />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo with enhanced hover effect */}
          <div className="group relative">
            <Logo />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? "text-secondary bg-secondary/5"
                        : "text-gray-700 hover:text-secondary hover:bg-gray-50"
                    }`
                  }
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-secondary to-accent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                  {/* Hover background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </NavLink>
              ))}
            </div>

            {/* CTA Section */}
            <div className="flex items-center space-x-4 pl-6 border-l border-gray-200">
              {/* Language Selector */}
              <div className="relative">
                <LanguageSelector />
              </div>

              {/* Login Button */}
              <NavLink
                to="/login"
                className="group relative px-6 py-2.5 text-primary font-semibold border-2 border-gray-200 rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <span className="relative z-10">{t("nav.login")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </NavLink>

              {/* Register Button */}
              <NavLink
                to="/register"
                className="group relative px-6 py-2.5 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("nav.register")}
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </span>

                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </NavLink>
            </div>
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>

      {/* Animated bottom border */}
      <div
        className={`h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </nav>
  );
};

export default Navbar;
