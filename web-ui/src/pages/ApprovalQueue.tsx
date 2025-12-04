import React, { useState, useEffect } from 'react';
import { useApproval } from '../context/ApprovalContext';
import { ApprovalStatusBadge, StageBadge } from '../components/ApprovalStatusBadge';
import {
  type WorkflowStage,
  type ApprovalResponse,
  getStageDisplayName,
} from '../api/approvalService';

export const ApprovalQueue: React.FC = () => {
  const {
    pendingApprovals,
    pendingCount,
    countByStage,
    isLoading,
    error,
    refreshPendingApprovals,
    approve,
    reject,
    canApprove,
    canReject,
    clearError,
  } = useApproval();

  const [selectedStageFilter, setSelectedStageFilter] = useState<WorkflowStage | 'all'>('all');
  const [feedbackModal, setFeedbackModal] = useState<{
    open: boolean;
    approvalId: number | null;
    action: 'approve' | 'reject';
    capabilityName: string;
  }>({
    open: false,
    approvalId: null,
    action: 'approve',
    capabilityName: '',
  });
  const [feedback, setFeedback] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Refresh on mount
  useEffect(() => {
    refreshPendingApprovals();
  }, [refreshPendingApprovals]);

  // Filter approvals by stage
  const filteredApprovals =
    selectedStageFilter === 'all'
      ? pendingApprovals
      : pendingApprovals.filter(
          (a) => a.approval?.stage === selectedStageFilter
        );

  const handleApproveClick = (approval: ApprovalResponse) => {
    setFeedbackModal({
      open: true,
      approvalId: approval.approval.id,
      action: 'approve',
      capabilityName: approval.capability_name,
    });
    setFeedback('');
    setActionError(null);
  };

  const handleRejectClick = (approval: ApprovalResponse) => {
    setFeedbackModal({
      open: true,
      approvalId: approval.approval.id,
      action: 'reject',
      capabilityName: approval.capability_name,
    });
    setFeedback('');
    setActionError(null);
  };

  const handleSubmitDecision = async () => {
    if (!feedbackModal.approvalId) return;

    if (feedbackModal.action === 'reject' && !feedback.trim()) {
      setActionError('Feedback is required when rejecting');
      return;
    }

    setActionLoading(true);
    setActionError(null);

    try {
      if (feedbackModal.action === 'approve') {
        await approve(feedbackModal.approvalId, feedback || undefined);
      } else {
        await reject(feedbackModal.approvalId, feedback);
      }
      setFeedbackModal({ open: false, approvalId: null, action: 'approve', capabilityName: '' });
      setFeedback('');
    } catch (err: any) {
      setActionError(err.message || 'Failed to process decision');
    } finally {
      setActionLoading(false);
    }
  };

  const closeModal = () => {
    setFeedbackModal({ open: false, approvalId: null, action: 'approve', capabilityName: '' });
    setFeedback('');
    setActionError(null);
  };

  const stages: (WorkflowStage | 'all')[] = ['all', 'specification', 'definition', 'design', 'execution'];

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'var(--color-text-primary, #111827)',
            margin: '0 0 0.5rem 0',
          }}
        >
          Approval Queue
        </h1>
        <p style={{ color: 'var(--color-text-secondary, #6b7280)', margin: 0 }}>
          Review and approve capability stage transitions.
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--color-background, white)',
            border: '1px solid var(--color-border, #e5e7eb)',
            borderRadius: '0.5rem',
            padding: '1rem',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f59e0b' }}>
            {pendingCount}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary, #6b7280)' }}>
            Total Pending
          </div>
        </div>
        {(['specification', 'definition', 'design', 'execution'] as WorkflowStage[]).map(
          (stage) => (
            <div
              key={stage}
              style={{
                backgroundColor: 'var(--color-background, white)',
                border: '1px solid var(--color-border, #e5e7eb)',
                borderRadius: '0.5rem',
                padding: '1rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onClick={() => setSelectedStageFilter(stage)}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                {countByStage[stage] || 0}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary, #6b7280)' }}>
                {getStageDisplayName(stage)}
              </div>
            </div>
          )
        )}
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {stages.map((stage) => (
          <button
            key={stage}
            onClick={() => setSelectedStageFilter(stage)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              backgroundColor:
                selectedStageFilter === stage ? '#3b82f6' : 'var(--color-background, white)',
              color: selectedStageFilter === stage ? 'white' : 'var(--color-text-primary, #111827)',
              boxShadow: selectedStageFilter === stage ? 'none' : '0 1px 2px rgba(0,0,0,0.05)',
              border: selectedStageFilter === stage ? 'none' : '1px solid var(--color-border, #e5e7eb)',
            }}
          >
            {stage === 'all' ? 'All' : getStageDisplayName(stage)}
            {stage === 'all' && ` (${pendingCount})`}
            {stage !== 'all' && ` (${countByStage[stage] || 0})`}
          </button>
        ))}
      </div>

      {/* Error Display */}
      {error && (
        <div
          style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '0.375rem',
            padding: '0.75rem',
            marginBottom: '1rem',
            color: '#dc2626',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{error}</span>
          <button
            onClick={clearError}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#dc2626',
              fontWeight: 600,
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
            color: 'var(--color-text-secondary, #6b7280)',
          }}
        >
          Loading approvals...
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredApprovals.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: 'var(--color-background, white)',
            border: '1px solid var(--color-border, #e5e7eb)',
            borderRadius: '0.5rem',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            {selectedStageFilter === 'all' ? '0' : ''}
          </div>
          <p style={{ color: 'var(--color-text-secondary, #6b7280)', margin: 0 }}>
            {selectedStageFilter === 'all'
              ? 'No pending approvals. Great job!'
              : `No pending approvals for ${getStageDisplayName(selectedStageFilter)} stage.`}
          </p>
        </div>
      )}

      {/* Approvals List */}
      {!isLoading && filteredApprovals.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredApprovals.map((item) => {
            const approval = item.approval;
            const canApproveThis = canApprove(approval.stage);
            const canRejectThis = canReject(approval.stage);

            return (
              <div
                key={approval.id}
                style={{
                  backgroundColor: 'var(--color-background, white)',
                  border: '1px solid var(--color-border, #e5e7eb)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: '0 0 0.5rem 0',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                      }}
                    >
                      {item.capability_name || `Capability #${approval.capability_id}`}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <StageBadge stage={approval.stage} size="small" />
                      <ApprovalStatusBadge status={approval.status} size="small" />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {canApproveThis && (
                      <button
                        onClick={() => handleApproveClick(item)}
                        style={{
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          fontWeight: 500,
                        }}
                      >
                        Approve
                      </button>
                    )}
                    {canRejectThis && (
                      <button
                        onClick={() => handleRejectClick(item)}
                        style={{
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          fontWeight: 500,
                        }}
                      >
                        Reject
                      </button>
                    )}
                    {!canApproveThis && !canRejectThis && (
                      <span
                        style={{
                          color: 'var(--color-text-secondary, #6b7280)',
                          fontStyle: 'italic',
                          fontSize: '0.875rem',
                        }}
                      >
                        You don't have permission to approve/reject this stage
                      </span>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '1rem',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-secondary, #6b7280)',
                  }}
                >
                  <span>
                    Requested by <strong>{approval.requester_name || 'Unknown'}</strong>
                  </span>
                  <span style={{ margin: '0 0.5rem' }}>-</span>
                  <span>{new Date(approval.requested_at).toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackModal.open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: 'var(--color-background, white)',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                margin: '0 0 1rem 0',
                fontSize: '1.25rem',
                fontWeight: 600,
                color:
                  feedbackModal.action === 'approve' ? '#10b981' : '#ef4444',
              }}
            >
              {feedbackModal.action === 'approve' ? 'Approve' : 'Reject'}{' '}
              {feedbackModal.capabilityName}
            </h2>

            <p style={{ color: 'var(--color-text-secondary, #6b7280)', marginBottom: '1rem' }}>
              {feedbackModal.action === 'approve'
                ? 'Add optional feedback for the requester.'
                : 'Please provide feedback explaining why this is being rejected.'}
            </p>

            {actionError && (
              <div
                style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '0.375rem',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  color: '#dc2626',
                }}
              >
                {actionError}
              </div>
            )}

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={
                feedbackModal.action === 'approve'
                  ? 'Optional feedback...'
                  : 'Explain why this is being rejected...'
              }
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--color-border, #e5e7eb)',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                resize: 'vertical',
              }}
            />

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={closeModal}
                disabled={actionLoading}
                style={{
                  backgroundColor: 'var(--color-background-secondary, #f3f4f6)',
                  color: 'var(--color-text-primary, #111827)',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  cursor: actionLoading ? 'not-allowed' : 'pointer',
                  fontWeight: 500,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitDecision}
                disabled={actionLoading}
                style={{
                  backgroundColor:
                    feedbackModal.action === 'approve' ? '#10b981' : '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  cursor: actionLoading ? 'not-allowed' : 'pointer',
                  fontWeight: 500,
                  opacity: actionLoading ? 0.7 : 1,
                }}
              >
                {actionLoading
                  ? 'Processing...'
                  : feedbackModal.action === 'approve'
                  ? 'Confirm Approval'
                  : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalQueue;
