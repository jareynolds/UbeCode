import React, { useEffect } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';

// Default UI frameworks (same as in UIFramework.tsx)
const defaultFrameworks = [
  {
    id: 'darkblue',
    name: 'Dark Blue (Default)',
    primaryColors: [
      { name: 'Primary', hex: '#1e3a8a' },
      { name: 'Secondary', hex: '#3b82f6' },
      { name: 'Accent', hex: '#f97316' },
    ],
    neutralColors: [
      { name: 'Grey 50', hex: '#f9fafb' },
      { name: 'Grey 100', hex: '#f3f4f6' },
      { name: 'Grey 200', hex: '#e5e7eb' },
      { name: 'Grey 300', hex: '#d1d5db' },
      { name: 'Grey 400', hex: '#9ca3af' },
      { name: 'Grey 500', hex: '#6b7280' },
      { name: 'Grey 600', hex: '#4b5563' },
      { name: 'Grey 700', hex: '#374151' },
      { name: 'Grey 800', hex: '#1f2937' },
      { name: 'Grey 900', hex: '#111827' },
    ],
    semanticColors: [
      { name: 'Success', hex: '#10b981' },
      { name: 'Warning', hex: '#f59e0b' },
      { name: 'Error', hex: '#ef4444' },
      { name: 'Info', hex: '#3b82f6' },
    ],
    typography: [
      { name: 'H1', fontSize: '3rem', fontWeight: '700', lineHeight: '1.2' },
      { name: 'H2', fontSize: '2.25rem', fontWeight: '600', lineHeight: '1.3' },
      { name: 'H3', fontSize: '1.875rem', fontWeight: '600', lineHeight: '1.3' },
      { name: 'Body', fontSize: '1rem', fontWeight: '400', lineHeight: '1.5' },
      { name: 'Small', fontSize: '0.875rem', fontWeight: '400', lineHeight: '1.5' },
    ],
    spacing: [
      { name: 'xs', value: '4px' },
      { name: 'sm', value: '8px' },
      { name: 'md', value: '16px' },
      { name: 'lg', value: '24px' },
      { name: 'xl', value: '32px' },
    ],
    buttonStyles: {
      borderRadius: '8px',
      primary: { bg: '#1e3a8a', hover: '#1e40af', color: '#ffffff' },
      secondary: { bg: '#e5e7eb', hover: '#d1d5db', color: '#111827' },
      accent: { bg: '#f97316', hover: '#ea580c', color: '#ffffff' },
    },
  },
  {
    id: 'material',
    name: 'Material Design',
    primaryColors: [
      { name: 'Primary', hex: '#3F51B5' },
      { name: 'Secondary', hex: '#FF4081' },
      { name: 'Dark', hex: '#303F9F' },
    ],
    neutralColors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Grey 100', hex: '#F5F5F5' },
      { name: 'Grey 300', hex: '#E0E0E0' },
      { name: 'Grey 500', hex: '#9E9E9E' },
      { name: 'Grey 700', hex: '#616161' },
      { name: 'Grey 900', hex: '#212121' },
    ],
    semanticColors: [
      { name: 'Success', hex: '#4CAF50' },
      { name: 'Warning', hex: '#FF9800' },
      { name: 'Error', hex: '#F44336' },
      { name: 'Info', hex: '#2196F3' },
    ],
    typography: [
      { name: 'H1', fontSize: '3.75rem', fontWeight: '300', lineHeight: '1.2' },
      { name: 'H2', fontSize: '3rem', fontWeight: '400', lineHeight: '1.2' },
      { name: 'H3', fontSize: '2.125rem', fontWeight: '400', lineHeight: '1.2' },
      { name: 'Body', fontSize: '1rem', fontWeight: '400', lineHeight: '1.5' },
      { name: 'Small', fontSize: '0.875rem', fontWeight: '400', lineHeight: '1.43' },
    ],
    spacing: [
      { name: 'xs', value: '4px' },
      { name: 'sm', value: '8px' },
      { name: 'md', value: '16px' },
      { name: 'lg', value: '24px' },
      { name: 'xl', value: '32px' },
    ],
    buttonStyles: {
      borderRadius: '4px',
      primary: { bg: '#3F51B5', hover: '#303F9F', color: '#FFFFFF' },
      secondary: { bg: '#E0E0E0', hover: '#BDBDBD', color: '#212121' },
      accent: { bg: '#FF4081', hover: '#F50057', color: '#FFFFFF' },
    },
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap 5',
    primaryColors: [
      { name: 'Primary', hex: '#0d6efd' },
      { name: 'Secondary', hex: '#6c757d' },
      { name: 'Dark', hex: '#212529' },
      { name: 'Light', hex: '#f8f9fa' },
    ],
    neutralColors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Gray 300', hex: '#dee2e6' },
      { name: 'Gray 600', hex: '#6c757d' },
      { name: 'Gray 900', hex: '#212529' },
    ],
    semanticColors: [
      { name: 'Success', hex: '#198754' },
      { name: 'Warning', hex: '#ffc107' },
      { name: 'Danger', hex: '#dc3545' },
      { name: 'Info', hex: '#0dcaf0' },
    ],
    typography: [
      { name: 'H1', fontSize: '2.5rem', fontWeight: '500', lineHeight: '1.2' },
      { name: 'H2', fontSize: '2rem', fontWeight: '500', lineHeight: '1.2' },
      { name: 'H3', fontSize: '1.75rem', fontWeight: '500', lineHeight: '1.2' },
      { name: 'Body', fontSize: '1rem', fontWeight: '400', lineHeight: '1.5' },
      { name: 'Small', fontSize: '0.875rem', fontWeight: '400', lineHeight: '1.5' },
    ],
    spacing: [
      { name: 'xs', value: '4px' },
      { name: 'sm', value: '8px' },
      { name: 'md', value: '16px' },
      { name: 'lg', value: '24px' },
      { name: 'xl', value: '48px' },
    ],
    buttonStyles: {
      borderRadius: '4px',
      primary: { bg: '#0d6efd', hover: '#0b5ed7', color: '#ffffff' },
      secondary: { bg: '#6c757d', hover: '#5c636a', color: '#ffffff' },
      accent: { bg: '#0dcaf0', hover: '#31d2f2', color: '#000000' },
    },
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    primaryColors: [
      { name: 'Blue 600', hex: '#2563eb' },
      { name: 'Indigo 600', hex: '#4f46e5' },
      { name: 'Purple 600', hex: '#9333ea' },
    ],
    neutralColors: [
      { name: 'Slate 50', hex: '#f8fafc' },
      { name: 'Slate 100', hex: '#f1f5f9' },
      { name: 'Slate 200', hex: '#e2e8f0' },
      { name: 'Slate 300', hex: '#cbd5e1' },
      { name: 'Slate 400', hex: '#94a3b8' },
      { name: 'Slate 500', hex: '#64748b' },
      { name: 'Slate 600', hex: '#475569' },
      { name: 'Slate 700', hex: '#334155' },
      { name: 'Slate 800', hex: '#1e293b' },
      { name: 'Slate 900', hex: '#0f172a' },
    ],
    semanticColors: [
      { name: 'Emerald 600', hex: '#059669' },
      { name: 'Amber 500', hex: '#f59e0b' },
      { name: 'Red 600', hex: '#dc2626' },
      { name: 'Sky 500', hex: '#0ea5e9' },
    ],
    typography: [
      { name: 'H1', fontSize: '3.75rem', fontWeight: '800', lineHeight: '1' },
      { name: 'H2', fontSize: '3rem', fontWeight: '700', lineHeight: '1' },
      { name: 'H3', fontSize: '2.25rem', fontWeight: '700', lineHeight: '1.25' },
      { name: 'Body', fontSize: '1rem', fontWeight: '400', lineHeight: '1.75' },
      { name: 'Small', fontSize: '0.875rem', fontWeight: '400', lineHeight: '1.5' },
    ],
    spacing: [
      { name: 'xs', value: '4px' },
      { name: 'sm', value: '8px' },
      { name: 'md', value: '16px' },
      { name: 'lg', value: '32px' },
      { name: 'xl', value: '64px' },
    ],
    buttonStyles: {
      borderRadius: '6px',
      primary: { bg: '#2563eb', hover: '#1d4ed8', color: '#ffffff' },
      secondary: { bg: '#e2e8f0', hover: '#cbd5e1', color: '#0f172a' },
      accent: { bg: '#9333ea', hover: '#7e22ce', color: '#ffffff' },
    },
  },
];

export const UIFrameworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    // Get the selected framework ID from workspace, default to bootstrap
    const selectedFrameworkId = currentWorkspace?.selectedUIFramework || 'bootstrap';

    // Find the framework (check custom frameworks first, then defaults)
    const customFrameworks = currentWorkspace?.customUIFrameworks || [];
    const allFrameworks = [...defaultFrameworks, ...customFrameworks];
    const framework = allFrameworks.find(f => f.id === selectedFrameworkId) || defaultFrameworks[2]; // Default to bootstrap

    if (!framework) return;

    // Apply CSS variables to :root
    const root = document.documentElement;

    // Primary Colors
    if (framework.primaryColors && framework.primaryColors.length > 0) {
      root.style.setProperty('--color-primary', framework.primaryColors[0].hex);
      if (framework.primaryColors[1]) {
        root.style.setProperty('--color-secondary', framework.primaryColors[1].hex);
      }
      if (framework.primaryColors[2]) {
        root.style.setProperty('--color-accent', framework.primaryColors[2].hex);
      }
    }

    // Neutral Colors (Grey scale)
    if (framework.neutralColors && framework.neutralColors.length > 0) {
      framework.neutralColors.forEach((color, index) => {
        const greyNumber = (index + 1) * 100;
        root.style.setProperty(`--color-grey-${greyNumber}`, color.hex);
      });
    }

    // Semantic Colors
    if (framework.semanticColors && framework.semanticColors.length > 0) {
      const successColor = framework.semanticColors.find(c => c.name.toLowerCase().includes('success') || c.name.toLowerCase().includes('green'));
      const warningColor = framework.semanticColors.find(c => c.name.toLowerCase().includes('warning') || c.name.toLowerCase().includes('yellow') || c.name.toLowerCase().includes('amber'));
      const errorColor = framework.semanticColors.find(c => c.name.toLowerCase().includes('error') || c.name.toLowerCase().includes('danger') || c.name.toLowerCase().includes('red'));
      const infoColor = framework.semanticColors.find(c => c.name.toLowerCase().includes('info') || c.name.toLowerCase().includes('blue'));

      if (successColor) root.style.setProperty('--color-success', successColor.hex);
      if (warningColor) root.style.setProperty('--color-warning', warningColor.hex);
      if (errorColor) root.style.setProperty('--color-error', errorColor.hex);
      if (infoColor) root.style.setProperty('--color-info', infoColor.hex);
    }

    // Typography
    if (framework.typography && framework.typography.length > 0) {
      framework.typography.forEach(typo => {
        const name = typo.name.toLowerCase().replace(/\s+/g, '-');
        root.style.setProperty(`--font-size-${name}`, typo.fontSize);
        root.style.setProperty(`--font-weight-${name}`, typo.fontWeight);
        root.style.setProperty(`--line-height-${name}`, typo.lineHeight);
      });
    }

    // Spacing
    if (framework.spacing && framework.spacing.length > 0) {
      framework.spacing.forEach(space => {
        root.style.setProperty(`--spacing-${space.name}`, space.value);
      });
    }

    // Button Styles
    if (framework.buttonStyles) {
      if (framework.buttonStyles.borderRadius) {
        root.style.setProperty('--button-border-radius', framework.buttonStyles.borderRadius);
      }
      if (framework.buttonStyles.primary) {
        root.style.setProperty('--button-primary-bg', framework.buttonStyles.primary.bg);
        root.style.setProperty('--button-primary-hover', framework.buttonStyles.primary.hover);
        root.style.setProperty('--button-primary-color', framework.buttonStyles.primary.color);
      }
      if (framework.buttonStyles.secondary) {
        root.style.setProperty('--button-secondary-bg', framework.buttonStyles.secondary.bg);
        root.style.setProperty('--button-secondary-hover', framework.buttonStyles.secondary.hover);
        root.style.setProperty('--button-secondary-color', framework.buttonStyles.secondary.color);
      }
      if (framework.buttonStyles.accent) {
        root.style.setProperty('--button-accent-bg', framework.buttonStyles.accent.bg);
        root.style.setProperty('--button-accent-hover', framework.buttonStyles.accent.hover);
        root.style.setProperty('--button-accent-color', framework.buttonStyles.accent.color);
      }
    }

    console.log(`[UIFrameworkProvider] Applied framework: ${framework.name} (${framework.id})`);
  }, [currentWorkspace?.selectedUIFramework, currentWorkspace?.customUIFrameworks]);

  return <>{children}</>;
};
