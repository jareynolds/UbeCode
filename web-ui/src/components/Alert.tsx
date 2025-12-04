import React from 'react';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  type?: AlertType;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const alertClasses: Record<AlertType, string> = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
};

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  children,
  className = '',
  style
}) => {
  return (
    <div className={`alert ${alertClasses[type]} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
};
