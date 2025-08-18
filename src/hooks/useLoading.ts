import { useState, useEffect } from "react";

interface UseLoadingOptions {
  minLoadingTime?: number;
  maxLoadingTime?: number;
  autoStart?: boolean;
}

export const useLoading = (options: UseLoadingOptions = {}) => {
  const {
    minLoadingTime = 2000,
    maxLoadingTime = 10000,
    autoStart = true,
  } = options;
  const [isLoading, setIsLoading] = useState(autoStart);
  const [hasShownLoading, setHasShownLoading] = useState(false);

  useEffect(() => {
    if (autoStart && !hasShownLoading) {
      let hasFinishedMinTime = false;
      let shouldStopLoading = false;

      // Minimum loading time
      const minTimer = setTimeout(() => {
        hasFinishedMinTime = true;
        if (shouldStopLoading) {
          setIsLoading(false);
          setHasShownLoading(true);
        }
      }, minLoadingTime);

      // Maximum loading time (failsafe for very slow connections)
      const maxTimer = setTimeout(() => {
        setIsLoading(false);
        setHasShownLoading(true);
      }, maxLoadingTime);

      // Check if page is fully loaded
      const checkPageLoaded = () => {
        if (document.readyState === "complete") {
          shouldStopLoading = true;
          if (hasFinishedMinTime) {
            setIsLoading(false);
            setHasShownLoading(true);
          }
        }
      };

      // Initial check
      checkPageLoaded();

      // Listen for load events
      window.addEventListener("load", checkPageLoaded);
      document.addEventListener("readystatechange", checkPageLoaded);

      return () => {
        clearTimeout(minTimer);
        clearTimeout(maxTimer);
        window.removeEventListener("load", checkPageLoaded);
        document.removeEventListener("readystatechange", checkPageLoaded);
      };
    }
  }, [autoStart, hasShownLoading, minLoadingTime, maxLoadingTime]);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const resetLoading = () => {
    setIsLoading(true);
    setHasShownLoading(false);
  };

  return {
    isLoading,
    hasShownLoading,
    startLoading,
    stopLoading,
    resetLoading,
  };
};
