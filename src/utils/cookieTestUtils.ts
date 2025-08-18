/**
 * Utility functions for testing cookie consent functionality
 */

export const clearCookieConsent = () => {
  localStorage.removeItem("cookieConsent");
  localStorage.removeItem("cookiePreferences");
  console.log(
    "Cookie consent data cleared. Refresh the page to see the popup again."
  );
};

// Type definition for cookie consent status
interface CookieConsentStatus {
  consent: string | null;
  preferences: Record<string, boolean> | null;
}

export const getCookieConsentStatus = (): CookieConsentStatus => {
  const consent = localStorage.getItem("cookieConsent");
  const preferences = localStorage.getItem("cookiePreferences");

  return {
    consent,
    preferences: preferences ? JSON.parse(preferences) : null,
  };
};

export const logCookieStatus = (): CookieConsentStatus => {
  const status = getCookieConsentStatus();
  console.log("Current cookie consent status:", status);
  return status;
};

// Add to window for easy testing in browser console
declare global {
  interface Window {
    cookieUtils: {
      clear: () => void;
      status: () => CookieConsentStatus;
      log: () => CookieConsentStatus;
    };
  }
}

if (typeof window !== "undefined") {
  window.cookieUtils = {
    clear: clearCookieConsent,
    status: getCookieConsentStatus,
    log: logCookieStatus,
  };
}
