import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  style
}) => {
  return (
    <div className={`card ${className}`.trim()} style={{
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      ...style
    }}>
      {children}
    </div>
  );
};
