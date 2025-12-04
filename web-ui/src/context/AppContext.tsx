import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Define application state shape
interface AppState {
  isLoading: boolean;
  error: string | null;
  user: { name: string } | null;
}

// Define context shape
interface AppContextType {
  state: AppState;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUser: (user: { name: string } | null) => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    isLoading: false,
    error: null,
    user: null,
  });

  const setLoading = (loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }));
  };

  const setError = (error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  };

  const setUser = (user: { name: string } | null) => {
    setState((prev) => ({ ...prev, user }));
  };

  return (
    <AppContext.Provider value={{ state, setLoading, setError, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use app context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
