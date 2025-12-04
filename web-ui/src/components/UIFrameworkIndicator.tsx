import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext';

const frameworkNames: Record<string, string> = {
  'darkblue': 'Dark Blue',
  'material': 'Material',
  'bootstrap': 'Bootstrap 5',
  'tailwind': 'Tailwind',
};

export const UIFrameworkIndicator: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  const selectedFramework = currentWorkspace?.selectedUIFramework || 'bootstrap';
  const frameworkName = frameworkNames[selectedFramework] || 'Custom';

  return (
    <div className="ui-framework-indicator">
      UI Framework: {frameworkName}

      <style>{`
        .ui-framework-indicator {
          position: fixed;
          bottom: 16px;
          left: 16px;
          background: var(--color-systemBackground, white);
          border: 1px solid var(--color-grey-300, #d1d5db);
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 500;
          color: var(--color-grey-700, #374151);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        @media (max-width: 1200px) {
          .ui-framework-indicator {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
