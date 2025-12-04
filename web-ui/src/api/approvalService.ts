import { capabilityClient, apiRequest } from './client';

// Types
export type ApprovalStatus = 'pending_approval' | 'approved' | 'rejected' | 'withdrawn';
export type WorkflowStage = 'specification' | 'definition' | 'design' | 'execution';

export interface CapabilityApproval {
  id: number;
  capability_id: number;
  stage: WorkflowStage;
  status: ApprovalStatus;
  requested_by: number;
  requested_at: string;
  requester_name?: string;
  decided_by?: number;
  decided_at?: string;
  decider_name?: string;
  feedback?: string;
  created_at: string;
  updated_at: string;
}

export interface ApprovalWorkflowRule {
  id: number;
  role: string;
  stage: string;
  can_request_approval: boolean;
  can_approve: boolean;
  can_reject: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApprovalAuditLog {
  id: number;
  approval_id?: number;
  capability_id: number;
  action: string;
  stage: string;
  performed_by: number;
  performer_name?: string;
  performed_at: string;
  details?: Record<string, unknown>;
}

export interface UserPermissions {
  user_id: number;
  role: string;
  can_request_approval: Record<string, boolean>;
  can_approve: Record<string, boolean>;
  can_reject: Record<string, boolean>;
}

export interface ApprovalResponse {
  approval: CapabilityApproval;
  capability_name: string;
  can_approve: boolean;
  can_reject: boolean;
  can_withdraw: boolean;
}

export interface PendingApprovalsResponse {
  approvals: ApprovalResponse[];
  total_count: number;
  by_stage: Record<string, number>;
}

export interface ApprovalHistoryResponse {
  capability_id: number;
  capability_name: string;
  current_stage: string;
  current_status: string;
  approvals: CapabilityApproval[];
  audit_log?: ApprovalAuditLog[];
}

// API Functions

/**
 * Request approval for a capability at a specific stage
 */
export async function requestApproval(
  capabilityId: number,
  stage: WorkflowStage
): Promise<CapabilityApproval> {
  return apiRequest<CapabilityApproval>(capabilityClient, {
    method: 'POST',
    url: '/approvals/request',
    data: {
      capability_id: capabilityId,
      stage,
    },
  });
}

/**
 * Get all pending approval requests
 */
export async function getPendingApprovals(): Promise<PendingApprovalsResponse> {
  return apiRequest<PendingApprovalsResponse>(capabilityClient, {
    method: 'GET',
    url: '/approvals/pending',
  });
}

/**
 * Get a specific approval by ID
 */
export async function getApproval(approvalId: number): Promise<CapabilityApproval> {
  return apiRequest<CapabilityApproval>(capabilityClient, {
    method: 'GET',
    url: `/approvals/${approvalId}`,
  });
}

/**
 * Approve an approval request
 */
export async function approveRequest(
  approvalId: number,
  feedback?: string
): Promise<CapabilityApproval> {
  return apiRequest<CapabilityApproval>(capabilityClient, {
    method: 'POST',
    url: `/approvals/${approvalId}/approve`,
    data: { feedback },
  });
}

/**
 * Reject an approval request
 */
export async function rejectRequest(
  approvalId: number,
  feedback: string
): Promise<CapabilityApproval> {
  return apiRequest<CapabilityApproval>(capabilityClient, {
    method: 'POST',
    url: `/approvals/${approvalId}/reject`,
    data: { feedback },
  });
}

/**
 * Withdraw an approval request (only the requester can do this)
 */
export async function withdrawRequest(approvalId: number): Promise<CapabilityApproval> {
  return apiRequest<CapabilityApproval>(capabilityClient, {
    method: 'POST',
    url: `/approvals/${approvalId}/withdraw`,
  });
}

/**
 * Get approval history for a capability
 */
export async function getApprovalHistory(
  capabilityId: number
): Promise<ApprovalHistoryResponse> {
  return apiRequest<ApprovalHistoryResponse>(capabilityClient, {
    method: 'GET',
    url: `/capabilities/${capabilityId}/approvals`,
  });
}

/**
 * Get audit log for a capability
 */
export async function getAuditLog(
  capabilityId: number
): Promise<{ capability_id: number; audit_log: ApprovalAuditLog[] }> {
  return apiRequest<{ capability_id: number; audit_log: ApprovalAuditLog[] }>(
    capabilityClient,
    {
      method: 'GET',
      url: `/capabilities/${capabilityId}/audit-log`,
    }
  );
}

/**
 * Get all workflow rules
 */
export async function getWorkflowRules(): Promise<{ rules: ApprovalWorkflowRule[] }> {
  return apiRequest<{ rules: ApprovalWorkflowRule[] }>(capabilityClient, {
    method: 'GET',
    url: '/approvals/rules',
  });
}

/**
 * Get user permissions for a specific role
 */
export async function getUserPermissions(role: string): Promise<UserPermissions> {
  return apiRequest<UserPermissions>(capabilityClient, {
    method: 'GET',
    url: `/approval-permissions/${role}`,
  });
}

// Helper functions

/**
 * Get stage display name
 */
export function getStageDisplayName(stage: WorkflowStage): string {
  const names: Record<WorkflowStage, string> = {
    specification: 'Specification',
    definition: 'Definition',
    design: 'Design',
    execution: 'Execution',
  };
  return names[stage] || stage;
}

/**
 * Get status display name
 */
export function getStatusDisplayName(status: ApprovalStatus): string {
  const names: Record<ApprovalStatus, string> = {
    pending_approval: 'Pending Approval',
    approved: 'Approved',
    rejected: 'Rejected',
    withdrawn: 'Withdrawn',
  };
  return names[status] || status;
}

/**
 * Get status color for styling
 */
export function getStatusColor(status: ApprovalStatus): string {
  const colors: Record<ApprovalStatus, string> = {
    pending_approval: '#f59e0b', // amber
    approved: '#10b981', // green
    rejected: '#ef4444', // red
    withdrawn: '#6b7280', // gray
  };
  return colors[status] || '#6b7280';
}

/**
 * Get stage color for styling
 */
export function getStageColor(stage: WorkflowStage): string {
  const colors: Record<WorkflowStage, string> = {
    specification: '#8b5cf6', // purple
    definition: '#3b82f6', // blue
    design: '#06b6d4', // cyan
    execution: '#22c55e', // green
  };
  return colors[stage] || '#6b7280';
}

/**
 * Check if user can request approval for a stage
 */
export function canRequestApprovalForStage(
  permissions: UserPermissions | null,
  stage: WorkflowStage
): boolean {
  if (!permissions) return false;
  return permissions.can_request_approval[stage] ?? false;
}

/**
 * Check if user can approve for a stage
 */
export function canApproveForStage(
  permissions: UserPermissions | null,
  stage: WorkflowStage
): boolean {
  if (!permissions) return false;
  return permissions.can_approve[stage] ?? false;
}

/**
 * Check if user can reject for a stage
 */
export function canRejectForStage(
  permissions: UserPermissions | null,
  stage: WorkflowStage
): boolean {
  if (!permissions) return false;
  return permissions.can_reject[stage] ?? false;
}

/**
 * Get the next stage in the workflow
 */
export function getNextStage(currentStage: WorkflowStage): WorkflowStage | null {
  const stages: WorkflowStage[] = ['specification', 'definition', 'design', 'execution'];
  const currentIndex = stages.indexOf(currentStage);
  if (currentIndex === -1 || currentIndex === stages.length - 1) {
    return null;
  }
  return stages[currentIndex + 1];
}

/**
 * Check if a stage transition is valid
 */
export function canTransitionTo(from: WorkflowStage, to: WorkflowStage): boolean {
  const validTransitions: Record<WorkflowStage, WorkflowStage | null> = {
    specification: 'definition',
    definition: 'design',
    design: 'execution',
    execution: null,
  };
  return validTransitions[from] === to;
}
