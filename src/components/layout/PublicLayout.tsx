import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "../ui/ScrollToTop";

const PublicLayout: React.FC = () => {
  const location = useLocation();
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [announcementScrollHidden, setAnnouncementScrollHidden] =
    useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Check if current page is home page
  const isHomePage = location.pathname === "/";

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Enhanced scroll behavior - sequential hiding
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const scrollingUp = currentScrollY < lastScrollY;

      if (scrollingDown && currentScrollY > 60) {
        // Scrolling down - hide announcement bar first, then navbar
        if (announcementVisible && !isMobile) {
          // First hide announcement bar
          setAnnouncementScrollHidden(true);
          setTimeout(() => {
            // Then hide navbar with delay for smooth effect
            if (currentScrollY > 120) {
              setNavbarHidden(true);
            }
          }, 200);
        } else {
          // If announcement bar already hidden, hide navbar immediately
          setNavbarHidden(true);
        }
      } else if (scrollingUp || currentScrollY <= 20) {
        // Scrolling up - show elements in reverse order
        setNavbarHidden(false);
        setTimeout(() => {
          setAnnouncementScrollHidden(false);
        }, 100);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, announcementVisible, isMobile]);

  // Handle announcement bar dismissal
  const handleAnnouncementDismiss = () => {
    setAnnouncementVisible(false);
    setAnnouncementScrollHidden(false); // Reset scroll state when dismissed
  };

  // Determine if announcement bar should be shown (only on home page)
  const showAnnouncementBar = isHomePage && announcementVisible && !isMobile;

  return (
    <div className="min-h-screen flex flex-col">
      {showAnnouncementBar && (
        <AnnouncementBar
          isScrollHidden={announcementScrollHidden}
          onDismiss={handleAnnouncementDismiss}
        />
      )}
      <Navbar
        hasAnnouncementBar={showAnnouncementBar}
        isHidden={navbarHidden}
      />
      <main
        className={`flex-grow transition-all duration-500 ease-out bg-primary ${
          showAnnouncementBar
            ? "pt-20 md:pt-28" // Space for both announcement + navbar on desktop
            : "pt-16 md:pt-20" // Space for navbar only
        }`}
      >
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PublicLayout;
