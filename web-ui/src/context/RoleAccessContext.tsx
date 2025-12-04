import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';

// Define types locally to avoid circular dependency issues
export type AccessLevel = 'edit' | 'view' | 'hidden';
export type RoleType = 'Product Owner' | 'Designer' | 'Engineer' | 'DevOps' | 'Administrator';

export interface PageAccess {
  pageName: string;
  path: string;
  accessLevel: AccessLevel;
  subPages?: PageAccess[];
}

export interface RoleDefinition {
  roleType: RoleType;
  description: string;
  pages: PageAccess[];
}

interface RoleAccessContextType {
  canAccess: (path: string) => boolean;
  getAccessLevel: (path: string) => AccessLevel | null;
  isPageVisible: (path: string) => boolean;
  isPageEditable: (path: string) => boolean;
  currentRoleDefinition: RoleDefinition | null;
}

const RoleAccessContext = createContext<RoleAccessContextType | undefined>(undefined);

// Map user roles from auth system to RoleType
const mapUserRoleToRoleType = (userRole: string): RoleType => {
  const roleMap: Record<string, RoleType> = {
    'admin': 'Administrator',
    'product_owner': 'Product Owner',
    'designer': 'Designer',
    'engineer': 'Engineer',
    'devops': 'DevOps',
  };
  return roleMap[userRole.toLowerCase()] || 'Engineer'; // Default to Engineer if unknown
};

export const RoleAccessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const currentRoleDefinition = useMemo<RoleDefinition | null>(() => {
    if (!user?.role) return null;

    // Load role definitions from localStorage (saved by RoleManagement component)
    const savedRoles = localStorage.getItem('roleDefinitions');
    let roleDefinitions: RoleDefinition[] = [];

    if (savedRoles) {
      try {
        roleDefinitions = JSON.parse(savedRoles);
      } catch (e) {
        console.error('Failed to load role definitions', e);
      }
    }

    // If no saved roles, use default permissions
    // The RoleManagement component will initialize defaults when first accessed
    if (roleDefinitions.length === 0) {
      // Grant full access to admin and product_owner by default
      const roleType = mapUserRoleToRoleType(user.role);
      if (user.role === 'admin' || user.role === 'product_owner') {
        // Admin and Product Owner have access to everything by default
        return null; // Null means no restrictions
      }
      // For other roles without saved definitions, deny access by default
      return null;
    }

    // Map user role to RoleType and find the definition
    const roleType = mapUserRoleToRoleType(user.role);
    return roleDefinitions.find(r => r.roleType === roleType) || null;
  }, [user?.role]);

  const getAccessLevel = (path: string): AccessLevel | null => {
    if (!currentRoleDefinition) return null;

    // Find the page or subpage that matches the path
    for (const page of currentRoleDefinition.pages) {
      if (page.path === path) {
        return page.accessLevel;
      }

      // Check subpages
      if (page.subPages) {
        for (const subPage of page.subPages) {
          if (subPage.path === path) {
            return subPage.accessLevel;
          }
        }
      }
    }

    return null;
  };

  const canAccess = (path: string): boolean => {
    // Admin and Product Owner always have access (when no role definitions exist)
    if (user?.role === 'admin' || user?.role === 'product_owner') return true;

    // If no role definition exists, deny access by default
    if (!currentRoleDefinition) return false;

    const accessLevel = getAccessLevel(path);
    return accessLevel !== null && accessLevel !== 'hidden';
  };

  const isPageVisible = (path: string): boolean => {
    return canAccess(path);
  };

  const isPageEditable = (path: string): boolean => {
    // Admin and Product Owner always have edit access
    if (user?.role === 'admin' || user?.role === 'product_owner') return true;

    const accessLevel = getAccessLevel(path);
    return accessLevel === 'edit';
  };

  const value: RoleAccessContextType = {
    canAccess,
    getAccessLevel,
    isPageVisible,
    isPageEditable,
    currentRoleDefinition,
  };

  return (
    <RoleAccessContext.Provider value={value}>
      {children}
    </RoleAccessContext.Provider>
  );
};

export const useRoleAccess = (): RoleAccessContextType => {
  const context = useContext(RoleAccessContext);
  if (!context) {
    throw new Error('useRoleAccess must be used within a RoleAccessProvider');
  }
  return context;
};
