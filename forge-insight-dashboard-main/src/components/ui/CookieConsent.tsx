import React, { useState, useEffect } from "react";
import { Cookie, X, Shield, Info, Settings } from "lucide-react";

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
  onCustomize?: () => void;
}

interface CookieToggleProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled?: boolean;
  onChange?: (enabled: boolean) => void;
  disabled?: boolean;
}

const CookieToggle: React.FC<CookieToggleProps> = ({
  icon,
  title,
  description,
  enabled = true,
  onChange,
  disabled = false,
}) => (
  <div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </div>
      {disabled ? (
        <div className="text-xs text-green-600 font-medium">Always Active</div>
      ) : (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onChange?.(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
        </label>
      )}
    </div>
    <p className="text-xs text-gray-500 ml-6 mt-1">{description}</p>
  </div>
);

const CookieConsent: React.FC<CookieConsentProps> = ({
  onAccept,
  onDecline,
  onCustomize,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: true,
    preferences: true,
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        necessary: true,
        ...preferences,
      })
    );
    setIsVisible(false);
    onAccept?.();
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false,
      })
    );
    setIsVisible(false);
    onDecline?.();
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
    onCustomize?.();
  };

  const handleClose = () => setIsVisible(false);

  if (!isVisible) return null;

  return (
    <>
      {" "}
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]" />
      {/* Cookie Popup */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md lg:max-w-lg z-50 translate-y-full opacity-0 animate-[slideUp_0.4s_ease-out_forwards]">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Cookie Preferences
                  </h3>
                  <p className="text-xs text-gray-500">We value your privacy</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              We use cookies to enhance your browsing experience, serve
              personalized content, and analyze our traffic. By clicking "Accept
              All", you consent to our use of cookies.
            </p>{" "}
            {/* Detailed Options */}
            {showDetails && (
              <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <CookieToggle
                  icon={<Shield className="w-4 h-4 text-green-600" />}
                  title="Necessary Cookies"
                  description="These cookies are essential for the website to function and cannot be switched off."
                  disabled
                />

                <CookieToggle
                  icon={<Info className="w-4 h-4 text-blue-600" />}
                  title="Analytics Cookies"
                  description="Help us understand how visitors interact with our website by collecting anonymous data."
                  enabled={preferences.analytics}
                  onChange={(enabled) =>
                    setPreferences((prev) => ({ ...prev, analytics: enabled }))
                  }
                />

                <CookieToggle
                  icon={<Settings className="w-4 h-4 text-purple-600" />}
                  title="Preference Cookies"
                  description="Remember your preferences and settings to provide a personalized experience."
                  enabled={preferences.preferences}
                  onChange={(enabled) =>
                    setPreferences((prev) => ({
                      ...prev,
                      preferences: enabled,
                    }))
                  }
                />
              </div>
            )}
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 bg-gradient-to-r from-primary to-primary/90 text-white px-4 py-3 rounded-xl font-medium hover:from-primary/90 hover:to-primary/80 transition-all duration-200 shadow-sm hover:shadow-md text-sm"
              >
                Accept All
              </button>

              <div className="flex gap-2 flex-1">
                <button
                  onClick={handleCustomize}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm"
                >
                  {showDetails ? "Hide" : "Customize"}
                </button>

                <button
                  onClick={handleDecline}
                  className="flex-1 border border-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Decline
                </button>
              </div>
            </div>
            {/* Footer Links */}
            <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
              <a
                href="/privacy"
                className="text-xs text-gray-500 hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-gray-300">•</span>
              <a
                href="/cookies"
                className="text-xs text-gray-500 hover:text-primary transition-colors"
              >
                Cookie Policy
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      {/* CSS Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(100px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default CookieConsent;
