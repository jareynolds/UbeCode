import React, { useState, useRef, useEffect } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { useNavigate } from 'react-router-dom';

export const WorkspaceSelector: React.FC = () => {
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
    <div className="workspace-selector" ref={dropdownRef}>
      <button className="workspace-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="workspace-icon">📁</span>
        <span className="workspace-name">{currentWorkspace?.name || 'Select Workspace'}</span>
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="workspace-dropdown">
          <div className="dropdown-section">
            <div className="dropdown-label">Workspaces</div>
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

      <style>{`
        .workspace-selector {
          position: relative;
        }

        .workspace-trigger {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          color: var(--ford-white);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }

        .workspace-trigger:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .workspace-icon {
          font-size: 16px;
        }

        .workspace-name {
          font-weight: 500;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dropdown-arrow {
          font-size: 10px;
          opacity: 0.8;
        }

        .workspace-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: var(--ford-white);
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          min-width: 250px;
          z-index: 1000;
          overflow: hidden;
        }

        .dropdown-section {
          padding: 8px 0;
        }

        .dropdown-label {
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          color: var(--ford-slogan-gray);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 16px;
          border: none;
          background: none;
          cursor: pointer;
          transition: background 0.2s;
          font-size: 14px;
          text-align: left;
          color: var(--ford-maastricht-blue);
        }

        .dropdown-item:hover {
          background: var(--ford-light-gray);
        }

        .dropdown-item.active {
          background: rgba(71, 168, 229, 0.1);
        }

        .item-icon {
          font-size: 16px;
        }

        .item-name {
          flex: 1;
        }

        .item-check {
          color: var(--ford-picton-blue);
          font-weight: 600;
        }

        .dropdown-divider {
          height: 1px;
          background: var(--ford-silver-sand);
          margin: 4px 0;
        }

        .manage-item {
          font-weight: 500;
          color: var(--ford-lapis-lazuli);
        }

        .manage-item:hover {
          background: rgba(42, 107, 172, 0.1);
        }

        @media (max-width: 768px) {
          .workspace-name {
            max-width: 100px;
          }
        }
      `}</style>
    </div>
  );
};
