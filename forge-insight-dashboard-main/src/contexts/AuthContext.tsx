
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth state
    const checkAuthState = () => {
      const isLoggedIn = localStorage.getItem('user_logged_in') === 'true' || 
                        localStorage.getItem('admin_logged_in') === 'true';
      
      if (isLoggedIn) {
        const userData = localStorage.getItem('user_data') || localStorage.getItem('admin_user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser({
            id: '1',
            email: parsedUser.email,
            name: parsedUser.name
          });
        }
      }
      setLoading(false);
    };

    checkAuthState();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Simple demo authentication
      if (email && password) {
        const userData = {
          id: '1',
          email,
          name: 'Demo User'
        };
        
        setUser(userData);
        localStorage.setItem('user_logged_in', 'true');
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        return { error: null };
      } else {
        return { error: new Error('Invalid credentials') };
      }
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      if (email && password) {
        const userData = {
          id: '1',
          email,
          name: fullName || 'Demo User'
        };
        
        setUser(userData);
        localStorage.setItem('user_logged_in', 'true');
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        return { error: null };
      } else {
        return { error: new Error('Missing required fields') };
      }
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('user_logged_in');
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('user_data');
    localStorage.removeItem('admin_user');
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
