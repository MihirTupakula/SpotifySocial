import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { spotifyService, SpotifyUser } from '@/services/spotify';

interface AuthContextType {
  user: SpotifyUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  refreshAuthState: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  console.log('AuthProvider rendering...');
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const authStatus = spotifyService.isAuthenticated();
      setIsAuthenticated(authStatus);
      
      if (authStatus) {
        try {
          const userData = await spotifyService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // If we can't fetch user data, consider it not authenticated
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = () => {
    const authUrl = spotifyService.getAuthUrl();
    window.location.href = authUrl;
  };

  const logout = () => {
    spotifyService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshUser = async () => {
    if (isAuthenticated) {
      const userData = await spotifyService.getCurrentUser();
      setUser(userData);
    }
  };

  const refreshAuthState = async () => {
    const authStatus = spotifyService.isAuthenticated();
    setIsAuthenticated(authStatus);
    
    if (authStatus) {
      try {
        const userData = await spotifyService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser,
    refreshAuthState
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
