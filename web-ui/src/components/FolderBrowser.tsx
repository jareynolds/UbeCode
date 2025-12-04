import React, { useState, useEffect } from 'react';
import { Button } from './Button';

interface FolderItem {
  name: string;
  path: string;
  isDir: boolean;
}

interface FolderBrowserProps {
  onSelect: (path: string) => void;
  onClose: () => void;
}

export const FolderBrowser: React.FC<FolderBrowserProps> = ({ onSelect, onClose }) => {
  const [currentPath, setCurrentPath] = useState('workspaces');
  const [items, setItems] = useState<FolderItem[]>([]);
  const [parentPath, setParentPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [selectedPath, setSelectedPath] = useState('');

  useEffect(() => {
    loadFolder(currentPath);
  }, [currentPath]);

  const loadFolder = async (path: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:9080/folders/list?path=${encodeURIComponent(path)}`);
      if (!response.ok) {
        throw new Error('Failed to load folder');
      }
      const data = await response.json();
      setItems(data.items || []);
      setParentPath(data.parentPath || '');
      setCurrentPath(data.currentPath);
    } catch (error) {
      console.error('Error loading folder:', error);
      alert('Failed to load folder');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setSelectedPath('');
  };

  const handleGoUp = () => {
    if (parentPath) {
      setCurrentPath(parentPath);
      setSelectedPath('');
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      alert('Please enter a folder name');
      return;
    }

    try {
      const response = await fetch('http://localhost:9080/folders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: currentPath,
          name: newFolderName.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create folder');
      }

      setNewFolderName('');
      setIsCreatingFolder(false);
      loadFolder(currentPath);
    } catch (error) {
      console.error('Error creating folder:', error);
      alert('Failed to create folder');
    }
  };

  const handleSelect = () => {
    if (selectedPath) {
      onSelect(selectedPath);
    } else {
      onSelect(currentPath);
    }
  };

  return (
    <div className="folder-browser-overlay">
      <div className="folder-browser">
        <div className="folder-browser-header">
          <h2>Select Workspace Folder</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="folder-browser-path">
          <strong>Current Path:</strong> {currentPath}
        </div>

        <div className="folder-browser-toolbar">
          <Button
            variant="outline"
            onClick={handleGoUp}
            disabled={!parentPath}
          >
            ← Up
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsCreatingFolder(!isCreatingFolder)}
          >
            + New Folder
          </Button>
        </div>

        {isCreatingFolder && (
          <div className="new-folder-form">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="new-folder-input"
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
            />
            <Button onClick={handleCreateFolder}>Create</Button>
            <Button variant="outline" onClick={() => {
              setIsCreatingFolder(false);
              setNewFolderName('');
            }}>
              Cancel
            </Button>
          </div>
        )}

        <div className="folder-browser-content">
          {isLoading ? (
            <div className="folder-loading">Loading...</div>
          ) : (
            <div className="folder-list">
              {items.filter(item => item.isDir).map((item) => (
                <div
                  key={item.path}
                  className={`folder-item ${selectedPath === item.path ? 'selected' : ''}`}
                  onClick={() => setSelectedPath(item.path)}
                  onDoubleClick={() => handleNavigate(item.path)}
                >
                  <span className="folder-icon">📁</span>
                  <span className="folder-name">{item.name}</span>
                </div>
              ))}
              {items.filter(item => item.isDir).length === 0 && (
                <div className="folder-empty">No folders found</div>
              )}
            </div>
          )}
        </div>

        <div className="folder-browser-footer">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSelect}>
            Select "{selectedPath ? selectedPath.split('/').pop() : currentPath}"
          </Button>
        </div>
      </div>

      <style>{`
        .folder-browser-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .folder-browser {
          background: var(--color-systemBackground);
          border-radius: 12px;
          width: 600px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .folder-browser-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--color-systemGray5);
        }

        .folder-browser-header h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 32px;
          line-height: 1;
          cursor: pointer;
          color: var(--color-systemGray);
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          color: var(--color-label);
        }

        .folder-browser-path {
          padding: 12px 24px;
          background: var(--color-systemGray6);
          font-size: 13px;
          border-bottom: 1px solid var(--color-systemGray5);
        }

        .folder-browser-toolbar {
          padding: 16px 24px;
          display: flex;
          gap: 12px;
          border-bottom: 1px solid var(--color-systemGray5);
        }

        .new-folder-form {
          padding: 16px 24px;
          display: flex;
          gap: 12px;
          background: var(--color-systemGray6);
          border-bottom: 1px solid var(--color-systemGray5);
        }

        .new-folder-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid var(--color-systemGray4);
          border-radius: 6px;
          font-size: 14px;
        }

        .folder-browser-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px 24px;
          min-height: 300px;
        }

        .folder-loading,
        .folder-empty {
          text-align: center;
          padding: 40px;
          color: var(--color-secondaryLabel);
        }

        .folder-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .folder-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .folder-item:hover {
          background: var(--color-systemGray6);
        }

        .folder-item.selected {
          background: var(--color-systemBlue);
          color: white;
        }

        .folder-icon {
          font-size: 20px;
        }

        .folder-name {
          font-size: 14px;
          font-weight: 500;
        }

        .folder-browser-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--color-systemGray5);
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
};
