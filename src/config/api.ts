// API Configuration
// Handles different environments (development, production, etc.)

interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

// Environment-based API configuration
const getApiConfig = (): ApiConfig => {
  // Check if we're in development mode
  const isDevelopment = import.meta.env.DEV;

  // Use environment variables or fallback to defaults
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    (isDevelopment ? "http://localhost:5000" : "");

  return {
    baseUrl,
    timeout: 10000, // 10 seconds
  };
};

export const apiConfig = getApiConfig();

// Helper to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${apiConfig.baseUrl}/api/${cleanEndpoint}`;
};

export default apiConfig;
