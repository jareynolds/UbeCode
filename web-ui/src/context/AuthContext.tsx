import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { authClient } from '../api/client';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  isActive: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  handleGoogleCallback: (code: string, state: string) => Promise<void>;
  logout: () => void;
  verifyToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing token on mount
    // Use sessionStorage for tab-specific authentication (allows multiple users in different tabs)
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      verifyToken();
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      const response = await authClient.post('/api/auth/login', { email, password });
      const { token, user } = response.data;

      // Use sessionStorage for tab-specific authentication (allows multiple users in different tabs)
      sessionStorage.setItem('auth_token', token);
      sessionStorage.setItem('user', JSON.stringify(user));

      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      setState((prev) => ({ ...prev, isLoading: false }));
      const message = error.response?.data?.error || 'Login failed. Please check your credentials.';
      throw new Error(message);
    }
  };

  const logout = (): void => {
    // Use sessionStorage for tab-specific authentication
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const verifyToken = async (): Promise<boolean> => {
    try {
      // Use sessionStorage for tab-specific authentication
      const token = sessionStorage.getItem('auth_token');

      if (!token) {
        setState((prev) => ({ ...prev, isLoading: false, isAuthenticated: false }));
        return false;
      }

      const response = await authClient.get('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { user } = response.data;

      sessionStorage.setItem('user', JSON.stringify(user));

      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });

      return true;
    } catch (error) {
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user');
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      // Get Google OAuth URL from backend
      const response = await authClient.get('/api/auth/google/login');
      const { url } = response.data;

      // Redirect to Google OAuth
      window.location.href = url;
    } catch (error: any) {
      setState((prev) => ({ ...prev, isLoading: false }));
      const message = error.response?.data?.error || 'Failed to initiate Google login';
      throw new Error(message);
    }
  };

  const handleGoogleCallback = useCallback(async (code: string, state: string): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      // Send code and state to backend
      const response = await authClient.get(`/api/auth/google/callback?code=${code}&state=${state}`);
      const { token, user } = response.data;

      // Store token and user
      sessionStorage.setItem('auth_token', token);
      sessionStorage.setItem('user', JSON.stringify(user));

      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      setState((prev) => ({ ...prev, isLoading: false }));
      const message = error.response?.data?.error || 'Google login failed';
      throw new Error(message);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, loginWithGoogle, handleGoogleCallback, logout, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
