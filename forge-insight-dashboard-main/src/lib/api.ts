// API service for InsightForge dashboard
// Connects to Flask backend using environment-based configuration

import { buildApiUrl } from "../config/api";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Define a type for KPI response (customize fields as needed)
export interface KPIResponse {
  occupancyRate: number;
  averageDailyRate: number;
  revenuePerAvailableRoom: number;
  [key: string]: number | string | undefined; // Add more fields as needed
}

// Generic API fetch function
async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem("auth_token");
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    };

    const response = await fetch(buildApiUrl(endpoint), {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

// Define a type for Revenue Trends response (customize fields as needed)
export interface RevenueTrendsResponse {
  dates: string[];
  revenues: number[];
  [key: string]: string[] | number[] | undefined; // Adjust or remove as needed for stricter typing
}

// Define a type for Bookings By Month response (customize fields as needed)
export interface BookingsByMonthResponse {
  months: string[];
  bookings: number[];
  [key: string]: string[] | number[] | undefined; // Adjust as needed
}

// Dashboard API endpoints
export const dashboardApi = {
  // Get KPI metrics
  getKPIs: async (hotelId?: number): Promise<ApiResponse<KPIResponse>> => {
    const params = hotelId ? `?hotel_id=${hotelId}` : "";
    return apiRequest<KPIResponse>(`/kpis${params}`);
  },

  // Get revenue trends
  getRevenueTrends: async (
    hotelId?: number
  ): Promise<ApiResponse<RevenueTrendsResponse>> => {
    const params = hotelId ? `?hotel_id=${hotelId}` : "";
    return apiRequest<RevenueTrendsResponse>(`/revenue-trends${params}`);
  },

  // Get bookings by month
  getBookingsByMonth: async (
    hotelId?: number
  ): Promise<ApiResponse<BookingsByMonthResponse>> => {
    const params = hotelId ? `?hotel_id=${hotelId}` : "";
    return apiRequest<BookingsByMonthResponse>(`/bookings-by-month${params}`);
  },

  // Get room type distribution
  getRoomTypeDistribution: async (
    hotelId?: number
  ): Promise<ApiResponse<unknown>> => {
    const params = hotelId ? `?hotel_id=${hotelId}` : "";
    return apiRequest<unknown>(`/room-type-distribution${params}`);
  },

  // Get recent activity
  getRecentActivity: async (
    hotelId?: number,
    limit?: number
  ): Promise<ApiResponse<unknown>> => {
    const params = new URLSearchParams();
    if (hotelId) params.append("hotel_id", hotelId.toString());
    if (limit) params.append("limit", limit.toString());
    const queryString = params.toString() ? `?${params.toString()}` : "";
    return apiRequest<unknown>(`/recent-activity${queryString}`);
  },

  // Get booking sources
  getBookingSources: async (
    hotelId?: number
  ): Promise<ApiResponse<unknown>> => {
    const params = hotelId ? `?hotel_id=${hotelId}` : "";
    return apiRequest<unknown>(`/booking-sources${params}`);
  },

  // Get guest nationalities
  getGuestNationalities: async (
    hotelId?: number
  ): Promise<ApiResponse<unknown>> => {
    const params = hotelId ? `?hotel_id=${hotelId}` : "";
    return apiRequest<unknown>(`/guest-nationalities${params}`);
  },

  // Get KPI metrics with historical comparisons
  getKPIsWithComparisons: async (
    hotelId?: number
  ): Promise<ApiResponse<unknown>> => {
    const params = hotelId ? `?hotel_id=${hotelId}` : "";
    return apiRequest<unknown>(`/kpis-with-comparisons${params}`);
  },

  // Test database connection
  testConnection: async (): Promise<ApiResponse<unknown>> => {
    return apiRequest<unknown>("/database-status");
  },

  // Get lead time analytics
  getLeadTimeAnalytics: async (
    hotelId?: number
  ): Promise<ApiResponse<unknown>> => {
    const params = hotelId ? `?hotel_id=${hotelId}` : "";
    return apiRequest<unknown>(`/lead-time-analytics${params}`);
  },

  // Get cancellation analytics
  getCancellationAnalytics: async (
    hotelId?: number
  ): Promise<ApiResponse<unknown>> => {
    const params = hotelId ? `?hotel_id=${hotelId}` : "";
    return apiRequest<unknown>(`/cancellation-analytics${params}`);
  },

  // Get booking analytics summary (comprehensive data for BookingsAnalytics page)
  getBookingAnalyticsSummary: async (
    hotelId?: number
  ): Promise<ApiResponse<unknown>> => {
    const params = hotelId ? `?hotel_id=${hotelId}` : "";
    return apiRequest<unknown>(`/booking-analytics-summary${params}`);
  },

  // Get lead time distribution for bar chart
  getLeadTimeDistribution: async (
    hotelId?: number
  ): Promise<ApiResponse<unknown>> => {
    const params = hotelId ? `?hotel_id=${hotelId}` : "";
    return apiRequest<unknown>(`/lead-time-distribution${params}`);
  },

  // Get bookings vs cancellations trend
  getBookingsCancellationsTrend: async (
    hotelId?: number,
    months?: number
  ): Promise<ApiResponse<unknown>> => {
    const params = new URLSearchParams();
    if (hotelId) params.append("hotel_id", hotelId.toString());
    if (months) params.append("months", months.toString());
    const queryString = params.toString() ? `?${params.toString()}` : "";
    return apiRequest<unknown>(`/bookings-cancellations-trend${queryString}`);
  },
};

// Define a User interface for user objects
export interface User {
  id: number;
  email: string;
  name?: string;
  role?: string;
  // Add other user fields as needed
}

// Auth API endpoints
export const authApi = {
  // Login
  login: async (
    email: string,
    password: string
  ): Promise<ApiResponse<unknown>> => {
    return apiRequest<unknown>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  // Signup (public registration)
  signup: async (
    email: string,
    password: string,
    name: string,
    phone?: string
  ): Promise<ApiResponse<unknown>> => {
    return apiRequest<unknown>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name, phone }),
    });
  },

  // Verify token
  verifyToken: async (token: string): Promise<ApiResponse<User>> => {
    return apiRequest<User>("/auth/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  },

  // Logout
  logout: async (token: string): Promise<ApiResponse<unknown>> => {
    return apiRequest<unknown>("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  },

  // Get all users (admin only)
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    return apiRequest<User[]>("/auth/users");
  },
};

export default { dashboardApi, authApi };
