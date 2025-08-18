import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../lib/api";
import { buildApiUrl } from "../config/api";

interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  hotel_id?: number;
  hotel_name?: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    hotel_id: number | null;
    hotel_name: string | null;
    phone: string | null;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const isLoggedIn =
          localStorage.getItem("user_logged_in") === "true" ||
          localStorage.getItem("admin_logged_in") === "true";

        if (isLoggedIn) {
          const userData =
            localStorage.getItem("user_data") ||
            localStorage.getItem("admin_user");
          if (userData) {
            try {
              const parsedUser = JSON.parse(userData);
              setUser({
                id: parsedUser.id || "1",
                email: parsedUser.email || "demo@example.com",
                name: parsedUser.name || "Demo User",
              });
            } catch (parseError) {
              console.error("Error parsing user data:", parseError);
              localStorage.removeItem("user_data");
              localStorage.removeItem("admin_user");
              localStorage.removeItem("user_logged_in");
              localStorage.removeItem("admin_logged_in");
            }
          }
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
      }
    };

    checkAuthState();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await authApi.login(email, password);

      if (result.data) {
        const authData = result.data as AuthResponse;
        if (authData.success) {
          const userData = {
            id: authData.user.id.toString(),
            email: authData.user.email,
            name: authData.user.name,
            role: authData.user.role,
            hotel_id: authData.user.hotel_id,
            hotel_name: authData.user.hotel_name,
          };
          setUser(userData);
          localStorage.setItem("admin_logged_in", "true");
          localStorage.setItem("admin_user", JSON.stringify(userData));
          localStorage.setItem("auth_token", authData.access_token);
          return { error: null };
        }
      }
      throw new Error(result.error || "Login failed");
    } catch (error) {
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    setLoading(true);
    try {
      const result = await authApi.signup(
        email,
        password,
        fullName || "New User"
      );

      if (result.data) {
        const authData = result.data as AuthResponse;
        if (authData.success) {
          const userData = {
            id: authData.user.id.toString(),
            email: authData.user.email,
            name: authData.user.name,
            role: authData.user.role,
            hotel_id: authData.user.hotel_id,
            hotel_name: authData.user.hotel_name,
          };
          setUser(userData);
          localStorage.setItem("admin_logged_in", "true");
          localStorage.setItem("admin_user", JSON.stringify(userData));
          localStorage.setItem("auth_token", authData.access_token);
          return { error: null };
        }
      }
      throw new Error(result.error || "Signup failed");
    } catch (error) {
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        await fetch(buildApiUrl("auth/logout"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user_logged_in");
      localStorage.removeItem("admin_logged_in");
      localStorage.removeItem("user_data");
      localStorage.removeItem("admin_user");
      localStorage.removeItem("auth_token");
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
