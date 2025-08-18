import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  hasAnnouncementBar?: boolean;
  isHidden?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  hasAnnouncementBar = false,
  isHidden = false,
}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

  const getDisplayName = () => {
    if (!user) return "";
    // If name is generic "Demo User", use email prefix instead
    if (user.name === "Demo User" && user.email) {
      return user.email.split("@")[0];
    }
    return user.name || user.email?.split("@")[0] || "User";
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setProfileOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  // Simple scroll effect for navbar backdrop styling only
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (profileOpen && !target.closest(".profile-dropdown")) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.faq"), path: "/faq" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const MobileNav = () => (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`md:hidden relative group p-2.5 rounded-2xl transition-all duration-500 overflow-hidden bg-gray-700/60 hover:bg-gray-700/80 backdrop-blur-[20px] hover:backdrop-blur-[24px] supports-[backdrop-filter]:bg-gray-700/60 border border-gray-600/30 hover:border-gray-500/50 shadow-lg hover:shadow-xl hover:shadow-secondary/15 hover:scale-105`}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center relative z-10">
          <span
            className={`block w-6 h-0.5 transition-all duration-500 bg-gray-200 ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 mt-1.5 transition-all duration-500 bg-gray-200 ${
              open ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 mt-1.5 transition-all duration-500 bg-gray-200 ${
              open ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </div>

        {/* Enhanced multi-layer glass reflection - same as navbar items */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500 pointer-events-none"></div>

        {/* Subtle shimmer effect on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-2xl pointer-events-none"></div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/8 via-primary/5 to-accent/8 opacity-100 rounded-2xl transition-all duration-500"></div>
      </button>{" "}
      {/* Mobile Dropdown Menu - Slides down from navbar */}
      <div
        className={`md:hidden fixed left-0 right-0 z-30 transition-all duration-700 ease-out ${
          open
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-8 invisible"
        }`}
        style={{
          top: "4rem", // Position directly below navbar (mobile never has announcement bar)
        }}
      >
        {/* Enhanced Glass morphism container matching navbar - Scrollable with rounded corners */}
        <div className="mx-4 mb-4 relative bg-primary/60 backdrop-blur-[20px] supports-[backdrop-filter]:bg-primary/60 border border-gray-600/25 shadow-2xl shadow-black/20 overflow-hidden max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl">
          {" "}
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-primary/4 to-accent/10 opacity-100 rounded-2xl"></div>
          {/* Enhanced glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-white/4 to-transparent opacity-100 rounded-2xl"></div>
          {/* Subtle inner glow */}
          <div className="absolute inset-0 shadow-inner shadow-secondary/10 opacity-100 rounded-2xl"></div>
          <nav className="relative z-10 flex flex-col p-6">
            {}
            {/* Brand tagline */}
            <div className="text-center mb-8">
              <p className="text-sm text-gray-300">
                <span className="text-secondary font-semibold">
                  InsightForge:
                </span>{" "}
                Stop Guessing, Start Growing
              </p>
            </div>{" "}
            {/* Navigation Items - Vertical Stack */}
            <div className="space-y-1 mb-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `group relative block w-full px-4 py-3 text-left rounded-2xl font-medium transition-all duration-500 overflow-hidden ${
                      isActive
                        ? "text-secondary bg-gray-700/40 backdrop-blur-[16px] shadow-lg shadow-secondary/15"
                        : "text-gray-200 hover:text-secondary hover:bg-gray-700/30 hover:backdrop-blur-[16px] hover:shadow-lg hover:scale-[1.02]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10 text-lg font-medium">
                        {item.name}
                      </span>{" "}
                      {/* Enhanced multi-layer glass reflection - Matching desktop */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500 pointer-events-none"></div>
                      {/* Animated gradient underline - Only shows on hover (not active) */}
                      <div className="absolute bottom-1.5 left-4 right-4 h-0.5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 bg-gradient-to-r from-secondary/90 to-accent/90 shadow-sm pointer-events-none"></div>
                      {/* Subtle shimmer effect on hover - Matching desktop */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-2xl pointer-events-none"></div>
                    </>
                  )}
                </NavLink>
              ))}
            </div>{" "}
            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              {user ? (
                <div className="space-y-3">
                  <div className="group relative block w-full px-6 py-3 text-center text-gray-200 font-medium rounded-xl bg-gray-700/30 backdrop-blur-[16px] transition-all duration-500 overflow-hidden">
                    <div className="flex items-center justify-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="relative z-10">{getDisplayName()}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-100 rounded-xl transition-all duration-500"></div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="group relative block w-full px-6 py-3 text-center text-gray-200 font-medium rounded-xl hover:text-white hover:bg-gray-700/30 hover:backdrop-blur-[16px] transition-all duration-500 overflow-hidden hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <LogOut className="w-4 h-4" />
                      <span className="relative z-10">Sign Out</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500"></div>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-xl"></div>
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="group relative block w-full px-6 py-3 text-center text-gray-200 font-medium rounded-xl hover:text-white hover:bg-gray-700/30 hover:backdrop-blur-[16px] transition-all duration-500 overflow-hidden hover:scale-[1.02]"
                  onClick={() => setOpen(false)}
                >
                  <span className="relative z-10">{t("nav.login")}</span>

                  {/* Enhanced glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500"></div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-xl"></div>
                </NavLink>
              )}{" "}
              <NavLink
                to="/contact-sales"
                className="group relative block w-full px-6 py-3 text-center bg-gradient-to-r from-secondary to-orange-500 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-secondary/25 hover:scale-[1.02] transition-all duration-500 overflow-hidden"
                onClick={() => setOpen(false)}
              >
                {" "}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Contact Sales
                </span>
                {/* Enhanced glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/25 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                {/* Premium shimmer */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              </NavLink>
            </div>
            {/* Language Selector - Centered */}
            <div className="flex justify-center pt-4 border-t border-gray-600/30">
              <div className="w-fit">
                <LanguageSelector />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
  return (
    <nav
      className={`fixed left-0 right-0 z-40 transition-all duration-700 ease-out ${
        isHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
      style={{ top: hasAnnouncementBar ? "3rem" : "0" }} // Dynamic positioning based on announcement bar
    >
      {/* Enhanced InsightForge Glass Morphism Container - Rounded like Lighthouse */}
      <div className="px-4 md:px-6 py-2">
        {" "}
        <div
          className={`relative transition-all duration-700 ease-out bg-primary/60 backdrop-blur-[20px] supports-[backdrop-filter]:bg-primary/60 border border-gray-600/25 shadow-2xl shadow-black/20 rounded-2xl md:rounded-3xl ${
            scrolled ? "" : ""
          }`}
        >
          {" "}
          {/* Multi-layer gradient overlay for depth with InsightForge colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-primary/4 to-accent/10 opacity-100 transition-all duration-700 rounded-2xl md:rounded-3xl"></div>
          {/* Enhanced glass reflection with dark theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-white/4 to-transparent opacity-100 transition-all duration-700 rounded-2xl md:rounded-3xl"></div>
          {/* Subtle inner glow with brand colors */}
          <div className="absolute inset-0 shadow-inner shadow-secondary/10 opacity-100 transition-all duration-700 rounded-2xl md:rounded-3xl"></div>
          <div className="relative z-10 w-full px-6 md:px-8">
            <div
              className={`flex items-center transition-all duration-700 ${
                scrolled ? "py-3" : "py-4"
              }`}
            >
              {/* Logo at very left */}
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
              </div>
              {/* Mobile spacer to push right elements */}
              <div className="md:hidden flex-1"></div>
              {/* Mobile Right Section - Only Hamburger */}
              <div className="md:hidden flex-shrink-0">
                <MobileNav />
              </div>
              {/* Centered Navigation Links - slightly to the right */}
              <div className="hidden md:flex items-center justify-center flex-1 pl-8">
                <div className="flex items-center space-x-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `group relative px-4 py-2.5 rounded-2xl font-medium transition-all duration-500 overflow-hidden ${
                          isActive
                            ? "text-secondary bg-gray-700/40 backdrop-blur-[16px] shadow-lg shadow-secondary/15"
                            : "text-gray-200 hover:text-secondary hover:bg-gray-700/30 hover:backdrop-blur-[16px] hover:shadow-lg hover:scale-105"
                        }`
                      }
                    >
                      <span className="relative z-10">{item.name}</span>

                      {/* Enhanced multi-layer glass reflection - Always consistent */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500 pointer-events-none"></div>

                      {/* Animated gradient underline - Always consistent */}
                      <div className="absolute bottom-1.5 left-4 right-4 h-0.5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 bg-gradient-to-r from-secondary/90 to-accent/90 shadow-sm pointer-events-none"></div>

                      {/* Subtle shimmer effect on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-2xl pointer-events-none"></div>
                    </NavLink>
                  ))}
                </div>
              </div>{" "}
              {/* CTA Section at very right with minimal spacing */}
              <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
                {/* Language Selector */}{" "}
                <div className="relative">
                  <LanguageSelector />
                </div>{" "}
                {/* Profile/Login Button */}
                {user ? (
                  <div className="relative profile-dropdown">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="group relative px-4 py-2.5 rounded-2xl font-medium transition-all duration-500 overflow-hidden text-gray-200 hover:text-secondary hover:bg-gray-700/30 hover:backdrop-blur-[16px] hover:shadow-lg hover:scale-105 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      <span className="relative z-10">{getDisplayName()}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          profileOpen ? "rotate-180" : ""
                        }`}
                      />

                      {/* Enhanced multi-layer glass reflection - same as nav items */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500 pointer-events-none"></div>

                      {/* Subtle shimmer effect on hover - same as nav items */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-2xl pointer-events-none"></div>
                    </button>

                    {/* Profile Dropdown */}
                    {profileOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-primary/80 backdrop-blur-[20px] border border-gray-600/30 shadow-2xl rounded-2xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-300">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/3 to-transparent opacity-100 rounded-2xl"></div>
                        <div className="relative z-10 py-2">
                          <div className="px-4 py-3 border-b border-gray-600/30">
                            <p className="text-sm text-gray-300">
                              Signed in as
                            </p>
                            <p className="font-medium text-white">
                              {user.email}
                            </p>
                          </div>
                          <NavLink
                            to="/dashboard"
                            className="flex items-center gap-2 px-4 py-3 text-gray-200 hover:text-secondary hover:bg-gray-700/30 transition-all duration-300"
                            onClick={() => setProfileOpen(false)}
                          >
                            <Settings className="w-4 h-4" />
                            Dashboard
                          </NavLink>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 w-full px-4 py-3 text-left text-gray-200 hover:text-red-400 hover:bg-gray-700/30 transition-all duration-300"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    className="group relative px-4 py-2.5 rounded-2xl font-medium transition-all duration-500 overflow-hidden text-gray-200 hover:text-secondary hover:bg-gray-700/30 hover:backdrop-blur-[16px] hover:shadow-lg hover:scale-105"
                  >
                    <span className="relative z-10">{t("nav.login")}</span>

                    {/* Enhanced multi-layer glass reflection - same as nav items */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500 pointer-events-none"></div>

                    {/* Subtle shimmer effect on hover - same as nav items */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-2xl pointer-events-none"></div>
                  </NavLink>
                )}{" "}
                {/* Contact Sales Button */}
                <NavLink
                  to="/contact-sales"
                  className="group relative px-6 py-2.5 font-semibold rounded-2xl transition-all duration-500 overflow-hidden bg-gradient-to-r from-secondary to-orange-500 text-white shadow-lg hover:shadow-xl hover:shadow-secondary/25 hover:scale-105"
                >
                  {" "}
                  <span className="relative z-10 flex items-center gap-2">
                    Contact Sales
                  </span>
                  {/* Enhanced glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                  {/* Premium shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  {/* Lighthouse-style inner glow */}
                  <div className="absolute inset-0 shadow-inner shadow-orange-300/20 rounded-2xl transition-all duration-500"></div>
                </NavLink>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
