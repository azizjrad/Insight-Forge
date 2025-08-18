import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Return a default context instead of throwing an error
    return {
      user: null,
      loading: false,
      signIn: async () => ({ error: new Error("Auth not initialized") }),
      signUp: async () => ({ error: new Error("Auth not initialized") }),
      signOut: async () => {},
    };
  }
  return context;
};
