import React, { useState, useRef, useEffect } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { useNavigate } from 'react-router-dom';

export const WorkspaceHeader: React.FC = () => {
  const { workspaces, currentWorkspace, switchWorkspace } = useWorkspace();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitch = (id: string) => {
    switchWorkspace(id);
    setIsOpen(false);
  };

  const handleManage = () => {
    setIsOpen(false);
    navigate('/workspaces');
  };

  return (
    <>
      <div className="workspace-header">
        <div className="workspace-header-inner" ref={dropdownRef}>
          <button className="workspace-header-trigger" onClick={() => setIsOpen(!isOpen)}>
            <h1 className="workspace-header-title">
              {currentWorkspace?.name || 'Select Workspace'}
            </h1>
            <span className="workspace-header-arrow">{isOpen ? '▲' : '▼'}</span>
          </button>

          {isOpen && (
            <div className="workspace-header-dropdown">
              <div className="dropdown-section">
                <div className="dropdown-label">Switch Workspace</div>
                {workspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    className={`dropdown-item ${currentWorkspace?.id === workspace.id ? 'active' : ''}`}
                    onClick={() => handleSwitch(workspace.id)}
                  >
                    <span className="item-icon">📁</span>
                    <span className="item-name">{workspace.name}</span>
                    {currentWorkspace?.id === workspace.id && (
                      <span className="item-check">✓</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="dropdown-divider"></div>

              <button className="dropdown-item manage-item" onClick={handleManage}>
                <span className="item-icon">⚙️</span>
                <span className="item-name">Manage Workspaces</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .workspace-header {
          display: flex;
          justify-content: center;
          padding: var(--spacing-6, 24px) 0 var(--spacing-5, 20px) 0;
          border-bottom: 1px solid var(--color-systemGray5);
          margin-bottom: var(--spacing-6, 24px);
          background: var(--color-systemBackground);
        }

        .workspace-header-inner {
          position: relative;
          display: inline-block;
        }

        .workspace-header-trigger {
          display: flex;
          align-items: center;
          gap: var(--spacing-3, 12px);
          padding: var(--spacing-2, 8px) var(--spacing-4, 16px);
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 8px;
        }

        .workspace-header-trigger:hover {
          background: var(--color-systemFill-quaternary);
        }

        .workspace-header-title {
          font-size: 34px;
          font-weight: 700;
          color: var(--color-label);
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .workspace-header-arrow {
          font-size: 14px;
          color: var(--color-secondaryLabel);
          margin-top: 8px;
        }

        .workspace-header-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--color-systemBackground);
          border: 1px solid var(--color-systemGray5);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          min-width: 320px;
          z-index: 1000;
          overflow: hidden;
        }

        .dropdown-section {
          padding: var(--spacing-2, 8px) 0;
        }

        .dropdown-label {
          padding: var(--spacing-2, 8px) var(--spacing-4, 16px);
          font-size: 13px;
          font-weight: 600;
          color: var(--color-secondaryLabel);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-3, 12px);
          width: 100%;
          padding: var(--spacing-3, 12px) var(--spacing-4, 16px);
          border: none;
          background: none;
          cursor: pointer;
          transition: background 0.15s ease;
          font-size: 15px;
          text-align: left;
          color: var(--color-label);
        }

        .dropdown-item:hover {
          background: var(--color-systemFill-quaternary);
        }

        .dropdown-item.active {
          background: var(--color-systemBlue-opacity-10, rgba(0, 122, 255, 0.1));
          color: var(--color-systemBlue);
        }

        .item-icon {
          font-size: 18px;
        }

        .item-name {
          flex: 1;
          font-weight: 500;
        }

        .item-check {
          color: var(--color-systemBlue);
          font-weight: 600;
          font-size: 16px;
        }

        .dropdown-divider {
          height: 1px;
          background: var(--color-systemGray5);
          margin: var(--spacing-1, 4px) 0;
        }

        .manage-item {
          font-weight: 500;
          color: var(--color-systemBlue);
        }

        .manage-item:hover {
          background: var(--color-systemBlue-opacity-10, rgba(0, 122, 255, 0.1));
        }

        @media (max-width: 768px) {
          .workspace-header-title {
            font-size: 28px;
          }

          .workspace-header-dropdown {
            min-width: 280px;
          }
        }
      `}</style>
    </>
  );
};
