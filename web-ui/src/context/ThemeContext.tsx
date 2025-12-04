import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { defaultTheme, availableThemes } from '../types/theme';
import type { Theme } from '../types/theme';

interface ThemeContextType {
  currentTheme: Theme;
  availableThemes: Theme[];
  setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    // Load theme from localStorage or use default
    const savedThemeId = localStorage.getItem('ubecode-theme');
    if (savedThemeId) {
      const savedTheme = availableThemes.find(t => t.id === savedThemeId);
      if (savedTheme) return savedTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    // Apply theme colors to CSS variables
    applyThemeToDOM(currentTheme);
    // Save to localStorage
    localStorage.setItem('ubecode-theme', currentTheme.id);
  }, [currentTheme]);

  const setTheme = (themeId: string) => {
    const theme = availableThemes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, availableThemes, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function applyThemeToDOM(theme: Theme): void {
  const root = document.documentElement;

  // Apply grey colors
  Object.entries(theme.colors.grey).forEach(([shade, color]) => {
    root.style.setProperty(`--color-grey-${shade}`, color);
  });

  // Apply blue colors
  Object.entries(theme.colors.blue).forEach(([shade, color]) => {
    root.style.setProperty(`--color-blue-${shade}`, color);
  });

  // Apply indigo colors
  Object.entries(theme.colors.indigo).forEach(([shade, color]) => {
    root.style.setProperty(`--color-indigo-${shade}`, color);
  });

  // Apply purple colors
  Object.entries(theme.colors.purple).forEach(([shade, color]) => {
    root.style.setProperty(`--color-purple-${shade}`, color);
  });

  // Apply orange colors
  Object.entries(theme.colors.orange).forEach(([shade, color]) => {
    root.style.setProperty(`--color-orange-${shade}`, color);
  });

  // Apply green colors
  Object.entries(theme.colors.green).forEach(([shade, color]) => {
    root.style.setProperty(`--color-green-${shade}`, color);
  });

  // Apply red colors
  Object.entries(theme.colors.red).forEach(([shade, color]) => {
    root.style.setProperty(`--color-red-${shade}`, color);
  });
}
