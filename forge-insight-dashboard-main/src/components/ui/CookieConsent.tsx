import React, { useState, useEffect } from "react";
import { Cookie } from "lucide-react";

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  onAccept,
  onDecline,
}) => {
  const [isVisible, setIsVisible] = useState(false);

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
        analytics: true,
        marketing: true,
        preferences: true,
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

  if (!isVisible) return null;

  return (
    <>
      {/* Simple Cookie Banner - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 max-w-sm translate-y-full opacity-0 animate-[slideUpFade_0.5s_ease-out_forwards]">
        <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden">
          {/* Main Content */}
          <div className="p-4">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
                  <Cookie className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">
                  We use cookies
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  We use cookies to improve user experience and site
                  performance. By clicking "Accept", you agree to our use of{" "}
                  <a
                    href="/cookie-policy"
                    className="text-accent hover:text-accent/80 underline font-medium"
                  >
                    cookies
                  </a>
                  .
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleAccept}
                    className="flex-1 px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 rounded-lg transition-all duration-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={handleDecline}
                    className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes slideUpFade {
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
