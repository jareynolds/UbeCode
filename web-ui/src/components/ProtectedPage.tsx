import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRoleAccess } from '../context/RoleAccessContext';
import { Alert } from './Alert';

interface ProtectedPageProps {
  children: React.ReactNode;
  path: string;
  requireEdit?: boolean; // If true, requires 'edit' access level
}

export const ProtectedPage: React.FC<ProtectedPageProps> = ({ children, path, requireEdit = false }) => {
  let canAccess: (path: string) => boolean;
  let isPageEditable: (path: string) => boolean;

  try {
    const roleAccess = useRoleAccess();
    canAccess = roleAccess.canAccess;
    isPageEditable = roleAccess.isPageEditable;
  } catch (e) {
    // If RoleAccessProvider isn't available, allow all access
    canAccess = () => true;
    isPageEditable = () => true;
  }

  const location = useLocation();

  // Check if user can access the page
  if (!canAccess(path)) {
    return (
      <div>
        <h1>Access Denied</h1>
        <Alert
          variant="error"
          message="You do not have permission to access this page. Please contact your administrator if you believe this is an error."
        />
      </div>
    );
  }

  // If requireEdit is true, check if user has edit access
  if (requireEdit && !isPageEditable(path)) {
    return (
      <div>
        <h1>Read-Only Access</h1>
        <Alert
          variant="warning"
          message="You have read-only access to this page. You cannot make modifications."
        />
        {children}
      </div>
    );
  }

  return <>{children}</>;
};
