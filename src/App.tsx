import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import PublicLayout from "./components/layout/PublicLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";
import CookieConsent from "./components/ui/CookieConsent";
import ScrollToTopOnRouteChange from "./components/ui/ScrollToTopOnRouteChange";

// Import cookie testing utilities in development
if (import.meta.env.DEV) {
  import("./utils/cookieTestUtils");
}

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import ContactSales from "./pages/ContactSales";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import CookiePolicy from "./pages/CookiePolicy";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Reports from "./pages/dashboard/Reports";
import BookingsAnalytics from "./pages/dashboard/BookingsAnalytics";
import FinancialOverview from "./pages/dashboard/FinancialOverview";
import GuestSegments from "./pages/dashboard/GuestSegments";
import Settings from "./pages/dashboard/Settings";
import AIAssistant from "./pages/dashboard/AIAssistant";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import Overview from "./pages/admin/Overview";
import Users from "./pages/admin/Users";
import DataSources from "./pages/admin/DataSources";
import DatabaseConfig from "./pages/admin/DatabaseConfig";
import ActivityLogs from "./pages/admin/ActivityLogs";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Sonner
          position="top-right"
          duration={1200}
          toastOptions={{
            style: {
              zIndex: 9999,
              background: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(75, 85, 99, 0.25)",
              borderRadius: "12px",
              color: "white",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.25)",
            },
          }}
        />
        <BrowserRouter>
          <ScrollToTopOnRouteChange />
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
            </Route>

            {/* Sales Contact Page - Uses SimpleNavbar */}
            <Route path="/contact-sales" element={<ContactSales />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/logout" element={<Navigate to="/login" />} />

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Routes - No protection */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Overview />} />
              <Route path="users" element={<Users />} />
              <Route path="data-sources" element={<DataSources />} />
              <Route path="database" element={<DatabaseConfig />} />
              <Route path="activity" element={<ActivityLogs />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Dashboard Routes - No protection */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="reports" element={<Reports />} />
              <Route path="bookings" element={<BookingsAnalytics />} />
              <Route path="financial" element={<FinancialOverview />} />
              <Route path="guests" element={<GuestSegments />} />
              <Route path="ai-assistant" element={<AIAssistant />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Cookie Consent Popup */}
          <CookieConsent
            onAccept={() => console.log("Cookies accepted")}
            onDecline={() => console.log("Cookies declined")}
          />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
