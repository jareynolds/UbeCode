import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import {
  type CapabilityApproval,
  type ApprovalResponse,
  type UserPermissions,
  type WorkflowStage,
  getPendingApprovals,
  getUserPermissions,
  requestApproval as apiRequestApproval,
  approveRequest as apiApproveRequest,
  rejectRequest as apiRejectRequest,
  withdrawRequest as apiWithdrawRequest,
  getApprovalHistory as apiGetApprovalHistory,
} from '../api/approvalService';

interface ApprovalState {
  pendingApprovals: ApprovalResponse[];
  pendingCount: number;
  countByStage: Record<string, number>;
  permissions: UserPermissions | null;
  isLoading: boolean;
  error: string | null;
}

interface ApprovalContextType extends ApprovalState {
  refreshPendingApprovals: () => Promise<void>;
  refreshPermissions: () => Promise<void>;
  requestApproval: (capabilityId: number, stage: WorkflowStage) => Promise<CapabilityApproval>;
  approve: (approvalId: number, feedback?: string) => Promise<CapabilityApproval>;
  reject: (approvalId: number, feedback: string) => Promise<CapabilityApproval>;
  withdraw: (approvalId: number) => Promise<CapabilityApproval>;
  getHistory: (capabilityId: number) => Promise<CapabilityApproval[]>;
  canApprove: (stage: WorkflowStage) => boolean;
  canReject: (stage: WorkflowStage) => boolean;
  canRequest: (stage: WorkflowStage) => boolean;
  clearError: () => void;
}

const ApprovalContext = createContext<ApprovalContextType | undefined>(undefined);

export const ApprovalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [state, setState] = useState<ApprovalState>({
    pendingApprovals: [],
    pendingCount: 0,
    countByStage: {},
    permissions: null,
    isLoading: false,
    error: null,
  });

  // Refresh pending approvals
  const refreshPendingApprovals = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await getPendingApprovals();
      setState((prev) => ({
        ...prev,
        pendingApprovals: response.approvals || [],
        pendingCount: response.total_count || 0,
        countByStage: response.by_stage || {},
        isLoading: false,
      }));
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to fetch pending approvals',
      }));
    }
  }, [isAuthenticated]);

  // Refresh user permissions
  const refreshPermissions = useCallback(async () => {
    if (!isAuthenticated || !user?.role) return;

    try {
      const permissions = await getUserPermissions(user.role);
      setState((prev) => ({ ...prev, permissions }));
    } catch (error: any) {
      console.error('Failed to fetch permissions:', error);
      // Don't set error state for permissions - use defaults
    }
  }, [isAuthenticated, user?.role]);

  // Load data on authentication
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshPendingApprovals();
      refreshPermissions();
    } else {
      // Clear state when logged out
      setState({
        pendingApprovals: [],
        pendingCount: 0,
        countByStage: {},
        permissions: null,
        isLoading: false,
        error: null,
      });
    }
  }, [isAuthenticated, user, refreshPendingApprovals, refreshPermissions]);

  // Request approval for a capability
  const requestApproval = useCallback(
    async (capabilityId: number, stage: WorkflowStage): Promise<CapabilityApproval> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const approval = await apiRequestApproval(capabilityId, stage);
        // Refresh the pending approvals list
        await refreshPendingApprovals();
        return approval;
      } catch (error: any) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message || 'Failed to request approval',
        }));
        throw error;
      }
    },
    [refreshPendingApprovals]
  );

  // Approve a request
  const approve = useCallback(
    async (approvalId: number, feedback?: string): Promise<CapabilityApproval> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const approval = await apiApproveRequest(approvalId, feedback);
        // Refresh the pending approvals list
        await refreshPendingApprovals();
        return approval;
      } catch (error: any) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message || 'Failed to approve request',
        }));
        throw error;
      }
    },
    [refreshPendingApprovals]
  );

  // Reject a request
  const reject = useCallback(
    async (approvalId: number, feedback: string): Promise<CapabilityApproval> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const approval = await apiRejectRequest(approvalId, feedback);
        // Refresh the pending approvals list
        await refreshPendingApprovals();
        return approval;
      } catch (error: any) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message || 'Failed to reject request',
        }));
        throw error;
      }
    },
    [refreshPendingApprovals]
  );

  // Withdraw a request
  const withdraw = useCallback(
    async (approvalId: number): Promise<CapabilityApproval> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const approval = await apiWithdrawRequest(approvalId);
        // Refresh the pending approvals list
        await refreshPendingApprovals();
        return approval;
      } catch (error: any) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message || 'Failed to withdraw request',
        }));
        throw error;
      }
    },
    [refreshPendingApprovals]
  );

  // Get approval history for a capability
  const getHistory = useCallback(
    async (capabilityId: number): Promise<CapabilityApproval[]> => {
      try {
        const response = await apiGetApprovalHistory(capabilityId);
        return response.approvals || [];
      } catch (error: any) {
        console.error('Failed to fetch approval history:', error);
        return [];
      }
    },
    []
  );

  // Permission check helpers
  const canApprove = useCallback(
    (stage: WorkflowStage): boolean => {
      if (!state.permissions) return false;
      return state.permissions.can_approve[stage] ?? false;
    },
    [state.permissions]
  );

  const canReject = useCallback(
    (stage: WorkflowStage): boolean => {
      if (!state.permissions) return false;
      return state.permissions.can_reject[stage] ?? false;
    },
    [state.permissions]
  );

  const canRequest = useCallback(
    (stage: WorkflowStage): boolean => {
      if (!state.permissions) return false;
      return state.permissions.can_request_approval[stage] ?? false;
    },
    [state.permissions]
  );

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return (
    <ApprovalContext.Provider
      value={{
        ...state,
        refreshPendingApprovals,
        refreshPermissions,
        requestApproval,
        approve,
        reject,
        withdraw,
        getHistory,
        canApprove,
        canReject,
        canRequest,
        clearError,
      }}
    >
      {children}
    </ApprovalContext.Provider>
  );
};

export const useApproval = (): ApprovalContextType => {
  const context = useContext(ApprovalContext);
  if (!context) {
    throw new Error('useApproval must be used within ApprovalProvider');
  }
  return context;
};
