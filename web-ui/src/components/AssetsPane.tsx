import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { INTEGRATION_URL } from '../api/client';

interface IntegrationFile {
  id: string;
  name: string;
  type: string;
  url: string;
  thumbnail_url?: string;
  size?: number;
  updated_at?: string;
  metadata?: Record<string, any>;
}

interface AssetsPaneProps {
  workspaceId: string;
  onClose: () => void;
  onSelectFile?: (file: IntegrationFile) => void;
}

export const AssetsPane: React.FC<AssetsPaneProps> = ({ workspaceId, onClose, onSelectFile }) => {
  const [availableFiles, setAvailableFiles] = useState<Record<string, IntegrationFile[]>>({});
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshingThumbnails, setRefreshingThumbnails] = useState(false);

  useEffect(() => {
    const loadFiles = async () => {
      // Load Figma files from workspace_integrations (this is synced for shared workspaces)
      const workspaceIntegrations = JSON.parse(localStorage.getItem('workspace_integrations') || '{}');
      let figmaFiles: IntegrationFile[] = workspaceIntegrations[workspaceId]?.['Figma API'] || [];

      // Also check legacy storage key as fallback
      if (figmaFiles.length === 0) {
        const figmaFilesKey = `workspace_figma_files_${workspaceId}`;
        figmaFiles = JSON.parse(localStorage.getItem(figmaFilesKey) || '[]');
      }

      // Debug: Log the loaded files to see what thumbnail URLs we have
      console.log('[AssetsPane] Loaded Figma files:', figmaFiles);
      figmaFiles.forEach((file, idx) => {
        console.log(`[AssetsPane] File ${idx}: ${file.name}`, {
          id: file.id,
          thumbnail_url: file.thumbnail_url,
          url: file.url
        });
      });

      // Filter out any invalid entries (users/teams instead of files)
      figmaFiles = figmaFiles.filter((file) => {
        // Skip if it's a user or team object (not a file)
        if (file.type === 'user' || file.type === 'team') {
          console.warn('[AssetsPane] Skipping invalid entry (not a file):', file.name, file.type);
          return false;
        }
        return true;
      });

      // Refresh thumbnails for Figma files (they expire after 30 days)
      if (figmaFiles.length > 0) {
        setRefreshingThumbnails(true);
        try {
          const figmaToken = JSON.parse(localStorage.getItem('integration_config_figma_api') || '{}').fields?.access_token;

          if (figmaToken) {
            // Fetch fresh thumbnail URLs for each file
            const updatedFiles = await Promise.all(
              figmaFiles.map(async (file) => {
                try {
                  const response = await fetch(`${INTEGRATION_URL}/fetch-file-meta`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      integration_name: 'Figma API',
                      file_key: file.id,
                      credentials: { access_token: figmaToken }
                    })
                  });

                  if (response.ok) {
                    const data = await response.json();
                    console.log(`[AssetsPane] Refreshed thumbnail for ${file.name}:`, data.thumbnail_url);

                    // Ensure we have a valid thumbnail URL
                    if (data.thumbnail_url && data.thumbnail_url.startsWith('http')) {
                      return { ...file, thumbnail_url: data.thumbnail_url };
                    } else {
                      console.warn(`[AssetsPane] Invalid thumbnail URL for ${file.name}:`, data.thumbnail_url);
                      return file;
                    }
                  } else {
                    console.error(`[AssetsPane] Failed to fetch thumbnail for ${file.name}:`, response.status, await response.text());
                  }
                } catch (err) {
                  console.warn(`[AssetsPane] Failed to refresh thumbnail for ${file.name}:`, err);
                }
                return file;
              })
            );

            figmaFiles = updatedFiles;

            // Update workspace_integrations with fresh thumbnails (this is synced for shared workspaces)
            const workspaceIntegrationsUpdate = JSON.parse(localStorage.getItem('workspace_integrations') || '{}');
            if (!workspaceIntegrationsUpdate[workspaceId]) {
              workspaceIntegrationsUpdate[workspaceId] = {};
            }
            workspaceIntegrationsUpdate[workspaceId]['Figma API'] = updatedFiles;
            localStorage.setItem('workspace_integrations', JSON.stringify(workspaceIntegrationsUpdate));

            // Also update shared workspace integrations if this is a shared workspace
            const globalSharedWorkspaces = JSON.parse(localStorage.getItem('global_shared_workspaces') || '[]');
            const isSharedWorkspace = globalSharedWorkspaces.some((w: any) => w.id === workspaceId);

            if (isSharedWorkspace) {
              const sharedIntegrations = JSON.parse(localStorage.getItem('shared_workspace_integrations') || '{}');
              if (!sharedIntegrations[workspaceId]) {
                sharedIntegrations[workspaceId] = {};
              }
              sharedIntegrations[workspaceId]['Figma API'] = updatedFiles;
              localStorage.setItem('shared_workspace_integrations', JSON.stringify(sharedIntegrations));
            }
          }
        } catch (err) {
          console.error('[AssetsPane] Error refreshing thumbnails:', err);
        } finally {
          setRefreshingThumbnails(false);
        }
      }

      // Group files by integration
      const filesByIntegration: Record<string, IntegrationFile[]> = {};

      // Add Figma files if available
      if (figmaFiles.length > 0) {
        filesByIntegration['Figma'] = figmaFiles;
      }

      // Also check for old format files (for backwards compatibility)
      const savedSelections = JSON.parse(localStorage.getItem('workspace_design_files') || '{}');
      const workspaceFiles = savedSelections[workspaceId] || {};

      Object.keys(workspaceFiles).forEach(key => {
        if (key.endsWith('_details')) {
          const files = workspaceFiles[key];
          const integrationName = key.split('_')[0]; // e.g., "GitHub" from "GitHub_123_details"

          if (!filesByIntegration[integrationName]) {
            filesByIntegration[integrationName] = [];
          }

          filesByIntegration[integrationName].push(...files);
        }
      });

      setAvailableFiles(filesByIntegration);

      // Auto-select first integration if available
      const integrations = Object.keys(filesByIntegration);
      if (integrations.length > 0 && !selectedIntegration) {
        setSelectedIntegration(integrations[0]);
      }
    };

    loadFiles();
  }, [workspaceId, selectedIntegration]);

  const getIntegrationIcon = (name: string) => {
    if (name.includes('Figma')) return '🎨';
    if (name.includes('GitHub')) return '💻';
    if (name.includes('Jira')) return '📋';
    return '🔗';
  };

  const getFilteredFiles = () => {
    if (!selectedIntegration) return [];

    const files = availableFiles[selectedIntegration] || [];

    if (!searchQuery) return files;

    return files.filter(file =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredFiles = getFilteredFiles();
  const totalFiles = Object.values(availableFiles).reduce((sum, files) => sum + files.length, 0);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '400px',
      backgroundColor: 'white',
      boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid var(--color-grey-300)',
        backgroundColor: 'var(--color-systemGray6)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 className="text-title2">Assets</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: 'var(--color-grey-500)',
              padding: 0,
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>
        <p className="text-footnote text-secondary">
          {totalFiles} file{totalFiles !== 1 ? 's' : ''} available from integrations
        </p>
      </div>

      {/* Integration Tabs */}
      {Object.keys(availableFiles).length > 0 && (
        <div style={{
          padding: '12px 20px',
          borderBottom: '1px solid var(--color-grey-300)',
          backgroundColor: 'white',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          {Object.keys(availableFiles).map(integrationName => (
            <button
              key={integrationName}
              onClick={() => setSelectedIntegration(integrationName)}
              style={{
                padding: '8px 16px',
                marginRight: '8px',
                border: 'none',
                borderRadius: '20px',
                backgroundColor: selectedIntegration === integrationName
                  ? 'var(--color-systemBlue)'
                  : 'var(--color-systemGray6)',
                color: selectedIntegration === integrationName
                  ? 'white'
                  : 'var(--color-label-primary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{getIntegrationIcon(integrationName)}</span>
              <span>{integrationName}</span>
              <span style={{
                padding: '2px 6px',
                borderRadius: '10px',
                backgroundColor: selectedIntegration === integrationName
                  ? 'rgba(255, 255, 255, 0.3)'
                  : 'rgba(0, 0, 0, 0.1)',
                fontSize: '12px'
              }}>
                {availableFiles[integrationName].length}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Search */}
      {Object.keys(availableFiles).length > 0 && (
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--color-grey-300)' }}>
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid var(--color-grey-300)',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        </div>
      )}

      {/* Files List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px' }}>
        {Object.keys(availableFiles).length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p className="text-body text-secondary" style={{ marginBottom: '8px' }}>
              No assets available
            </p>
            <p className="text-footnote text-secondary">
              Add files in the Designs page to make them available here.
            </p>
          </div>
        )}

        {filteredFiles.length === 0 && Object.keys(availableFiles).length > 0 && searchQuery && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p className="text-body text-secondary">
              No files match "{searchQuery}"
            </p>
          </div>
        )}

        {filteredFiles.map((file) => (
          <div
            key={file.id}
            style={{
              padding: '12px',
              marginBottom: '8px',
              border: '1px solid var(--color-grey-300)',
              borderRadius: '8px',
              cursor: onSelectFile ? 'pointer' : 'default',
              transition: 'all 0.2s',
              backgroundColor: 'white'
            }}
            onClick={() => onSelectFile && onSelectFile(file)}
            onMouseEnter={(e) => {
              if (onSelectFile) {
                e.currentTarget.style.borderColor = 'var(--color-systemBlue)';
                e.currentTarget.style.backgroundColor = 'var(--color-systemBlue-light)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-grey-300)';
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
              {file.thumbnail_url && (
                <img
                  src={file.thumbnail_url}
                  alt={file.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    backgroundColor: 'var(--color-systemGray6)'
                  }}
                />
              )}
              {!file.thumbnail_url && (
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-systemGray6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  {file.type === 'figma_file' ? '🎨' : file.type === 'issue' ? '📋' : '📄'}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 className="text-subheadline" style={{
                  marginBottom: '2px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {file.name}
                </h4>
                <p className="text-footnote text-secondary" style={{ marginBottom: '4px' }}>
                  {file.type}
                  {file.size && ` • ${(file.size / 1024).toFixed(1)} KB`}
                </p>
                {file.url && (
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-footnote"
                    style={{ color: 'var(--color-systemBlue)' }}
                  >
                    View →
                  </a>
                )}
              </div>
            </div>
            {onSelectFile && (
              <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--color-grey-200)' }}>
                <p className="text-caption1" style={{ color: 'var(--color-systemBlue)', textAlign: 'center' }}>
                  Click to add to canvas
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--color-grey-300)',
        backgroundColor: 'var(--color-systemGray6)'
      }}>
        <p className="text-footnote text-secondary" style={{ textAlign: 'center' }}>
          Manage files in the Designs page
        </p>
      </div>
    </div>
  );
};
