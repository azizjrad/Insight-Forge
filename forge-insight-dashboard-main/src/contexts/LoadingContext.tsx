import React, { createContext, useContext, ReactNode } from "react";
import { useLoading } from "../hooks/useLoading";
import LoadingScreen from "../components/ui/LoadingScreen";

interface LoadingContextType {
  isLoading: boolean;
  hasShownLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  resetLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
  minLoadingTime?: number;
  maxLoadingTime?: number;
  showInitialLoading?: boolean;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  minLoadingTime = 1500,
  maxLoadingTime = 8000,
  showInitialLoading = true,
}) => {
  const loadingState = useLoading({
    minLoadingTime,
    maxLoadingTime,
    autoStart: showInitialLoading,
  });

  return (
    <LoadingContext.Provider value={loadingState}>
      {/* Always render the children (the website content) */}
      {children}

      {/* Show loading overlay on top when loading */}
      {loadingState.isLoading && (
        <LoadingScreen
          onLoadingComplete={loadingState.stopLoading}
          duration={minLoadingTime}
        />
      )}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
};
