import React from 'react';
import {
  type ApprovalStatus,
  type WorkflowStage,
  getStatusDisplayName,
  getStageDisplayName,
  getStatusColor,
  getStageColor,
} from '../api/approvalService';

interface ApprovalStatusBadgeProps {
  status: ApprovalStatus;
  stage?: WorkflowStage;
  showStage?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const ApprovalStatusBadge: React.FC<ApprovalStatusBadgeProps> = ({
  status,
  stage,
  showStage = false,
  size = 'medium',
}) => {
  const statusColor = getStatusColor(status);
  const stageColor = stage ? getStageColor(stage) : '#6b7280';

  const sizeStyles = {
    small: { fontSize: '0.75rem', padding: '0.125rem 0.375rem' },
    medium: { fontSize: '0.875rem', padding: '0.25rem 0.5rem' },
    large: { fontSize: '1rem', padding: '0.375rem 0.75rem' },
  };

  const styles = sizeStyles[size];

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      {showStage && stage && (
        <span
          style={{
            backgroundColor: `${stageColor}20`,
            color: stageColor,
            borderRadius: '0.25rem',
            fontWeight: 500,
            ...styles,
          }}
        >
          {getStageDisplayName(stage)}
        </span>
      )}
      <span
        style={{
          backgroundColor: `${statusColor}20`,
          color: statusColor,
          borderRadius: '0.25rem',
          fontWeight: 500,
          ...styles,
        }}
      >
        {getStatusDisplayName(status)}
      </span>
    </div>
  );
};

interface StageBadgeProps {
  stage: WorkflowStage;
  size?: 'small' | 'medium' | 'large';
}

export const StageBadge: React.FC<StageBadgeProps> = ({ stage, size = 'medium' }) => {
  const stageColor = getStageColor(stage);

  const sizeStyles = {
    small: { fontSize: '0.75rem', padding: '0.125rem 0.375rem' },
    medium: { fontSize: '0.875rem', padding: '0.25rem 0.5rem' },
    large: { fontSize: '1rem', padding: '0.375rem 0.75rem' },
  };

  const styles = sizeStyles[size];

  return (
    <span
      style={{
        backgroundColor: `${stageColor}20`,
        color: stageColor,
        borderRadius: '0.25rem',
        fontWeight: 500,
        ...styles,
      }}
    >
      {getStageDisplayName(stage)}
    </span>
  );
};

export default ApprovalStatusBadge;
