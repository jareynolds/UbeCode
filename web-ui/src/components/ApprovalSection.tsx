import React, { useState, useEffect } from 'react';
import { useApproval } from '../context/ApprovalContext';
import { ApprovalStatusBadge, StageBadge } from './ApprovalStatusBadge';
import {
  type WorkflowStage,
  type CapabilityApproval,
  getStageDisplayName,
  getNextStage,
} from '../api/approvalService';

interface ApprovalSectionProps {
  capabilityId: number;
  currentStage: WorkflowStage;
  currentStatus: string;
  onApprovalChange?: () => void;
}

export const ApprovalSection: React.FC<ApprovalSectionProps> = ({
  capabilityId,
  currentStage,
  currentStatus,
  onApprovalChange,
}) => {
  const {
    requestApproval,
    getHistory,
    canRequest,
    isLoading,
    error,
    clearError,
  } = useApproval();

  const [approvalHistory, setApprovalHistory] = useState<CapabilityApproval[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Load approval history
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await getHistory(capabilityId);
        setApprovalHistory(history);
      } catch (err) {
        console.error('Failed to load approval history:', err);
      }
    };
    loadHistory();
  }, [capabilityId, getHistory]);

  const handleRequestApproval = async () => {
    setLocalError(null);
    clearError();

    try {
      await requestApproval(capabilityId, currentStage);
      // Refresh history
      const history = await getHistory(capabilityId);
      setApprovalHistory(history);
      onApprovalChange?.();
    } catch (err: any) {
      setLocalError(err.message || 'Failed to request approval');
    }
  };

  const nextStage = getNextStage(currentStage);
  const canRequestForCurrentStage = canRequest(currentStage);
  const isPendingApproval = currentStatus === 'pending_approval';
  const isApproved = currentStatus === 'approved';
  const isRejected = currentStatus === 'rejected';

  return (
    <div
      style={{
        border: '1px solid var(--color-border, #e5e7eb)',
        borderRadius: '0.5rem',
        padding: '1rem',
        marginTop: '1rem',
        backgroundColor: 'var(--color-background-secondary, #f9fafb)',
      }}
    >
      <h3
        style={{
          margin: '0 0 1rem 0',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--color-text-primary, #111827)',
        }}
      >
        Approval Workflow
      </h3>

      {/* Current Status */}
      <div style={{ marginBottom: '1rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem',
          }}
        >
          <span style={{ fontWeight: 500 }}>Current Stage:</span>
          <StageBadge stage={currentStage} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: 500 }}>Status:</span>
          <ApprovalStatusBadge
            status={currentStatus as any}
            stage={currentStage}
          />
        </div>
      </div>

      {/* Stage Progress Indicator */}
      <div style={{ marginBottom: '1rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem',
          }}
        >
          {(['specification', 'definition', 'design', 'execution'] as WorkflowStage[]).map(
            (stage, index) => (
              <div
                key={stage}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    backgroundColor:
                      stage === currentStage
                        ? '#3b82f6'
                        : index <
                          ['specification', 'definition', 'design', 'execution'].indexOf(
                            currentStage
                          )
                        ? '#10b981'
                        : '#d1d5db',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                  }}
                >
                  {index + 1}
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    marginTop: '0.25rem',
                    color:
                      stage === currentStage
                        ? '#3b82f6'
                        : 'var(--color-text-secondary, #6b7280)',
                  }}
                >
                  {getStageDisplayName(stage)}
                </span>
              </div>
            )
          )}
        </div>
        {/* Progress bar */}
        <div
          style={{
            height: '0.25rem',
            backgroundColor: '#d1d5db',
            borderRadius: '0.125rem',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${
                (['specification', 'definition', 'design', 'execution'].indexOf(
                  currentStage
                ) /
                  3) *
                100
              }%`,
              backgroundColor: '#10b981',
              borderRadius: '0.125rem',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Error Display */}
      {(localError || error) && (
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
          {localError || error}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {!isPendingApproval && !isApproved && canRequestForCurrentStage && (
          <button
            onClick={handleRequestApproval}
            disabled={isLoading}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              fontWeight: 500,
            }}
          >
            {isLoading ? 'Requesting...' : `Request Approval for ${getStageDisplayName(currentStage)}`}
          </button>
        )}

        {isPendingApproval && (
          <div
            style={{
              backgroundColor: '#fef3c7',
              border: '1px solid #fcd34d',
              borderRadius: '0.375rem',
              padding: '0.75rem',
              flex: 1,
            }}
          >
            <span style={{ color: '#92400e', fontWeight: 500 }}>
              Awaiting approval for {getStageDisplayName(currentStage)} stage
            </span>
          </div>
        )}

        {isApproved && nextStage && (
          <div
            style={{
              backgroundColor: '#d1fae5',
              border: '1px solid #6ee7b7',
              borderRadius: '0.375rem',
              padding: '0.75rem',
              flex: 1,
            }}
          >
            <span style={{ color: '#065f46', fontWeight: 500 }}>
              {getStageDisplayName(currentStage)} approved! Ready to proceed to{' '}
              {getStageDisplayName(nextStage)}.
            </span>
          </div>
        )}

        {isRejected && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.375rem',
              padding: '0.75rem',
              flex: 1,
            }}
          >
            <span style={{ color: '#dc2626', fontWeight: 500 }}>
              Approval rejected. Please review feedback and make changes before
              requesting again.
            </span>
          </div>
        )}
      </div>

      {/* Approval History Toggle */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        style={{
          backgroundColor: 'transparent',
          color: '#3b82f6',
          border: 'none',
          padding: '0.25rem 0',
          cursor: 'pointer',
          fontSize: '0.875rem',
          textDecoration: 'underline',
        }}
      >
        {showHistory ? 'Hide History' : 'Show Approval History'}
        {approvalHistory.length > 0 && ` (${approvalHistory.length})`}
      </button>

      {/* Approval History */}
      {showHistory && (
        <div style={{ marginTop: '1rem' }}>
          {approvalHistory.length === 0 ? (
            <p style={{ color: 'var(--color-text-secondary, #6b7280)', fontStyle: 'italic' }}>
              No approval history yet.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {approvalHistory.map((approval) => (
                <div
                  key={approval.id}
                  style={{
                    border: '1px solid var(--color-border, #e5e7eb)',
                    borderRadius: '0.375rem',
                    padding: '0.75rem',
                    backgroundColor: 'var(--color-background, white)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <ApprovalStatusBadge
                      status={approval.status}
                      stage={approval.stage}
                      showStage
                      size="small"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary, #6b7280)' }}>
                      {new Date(approval.requested_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--color-text-secondary, #6b7280)' }}>
                      Requested by:
                    </span>{' '}
                    {approval.requester_name || 'Unknown'}
                  </div>
                  {approval.decider_name && (
                    <div style={{ fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--color-text-secondary, #6b7280)' }}>
                        {approval.status === 'approved' ? 'Approved' : 'Decided'} by:
                      </span>{' '}
                      {approval.decider_name}
                    </div>
                  )}
                  {approval.feedback && (
                    <div
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.5rem',
                        backgroundColor: 'var(--color-background-secondary, #f9fafb)',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem',
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>Feedback:</span> {approval.feedback}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApprovalSection;
