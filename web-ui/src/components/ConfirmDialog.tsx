import React from 'react';
import { Card, Button } from './index';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: 'primary' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <Card
        style={{
          maxWidth: '450px',
          width: '90%',
          padding: '24px',
          animation: 'fadeInScale 0.15s ease-out',
        }}
      >
        <h3
          className="text-title2"
          style={{ marginBottom: '12px', color: 'var(--color-label)' }}
        >
          {title}
        </h3>
        <p
          className="text-body"
          style={{
            marginBottom: '24px',
            color: 'var(--color-secondaryLabel)',
            lineHeight: 1.5,
          }}
        >
          {message}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant === 'danger' ? 'primary' : 'primary'}
            onClick={onConfirm}
            style={
              confirmVariant === 'danger'
                ? { backgroundColor: 'var(--color-systemRed)', borderColor: 'var(--color-systemRed)' }
                : undefined
            }
          >
            {confirmLabel}
          </Button>
        </div>
      </Card>
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};
