import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Alert, Button, CapabilityForm, AIPresetIndicator, AcceptanceCriteriaSection, ConfirmDialog } from '../components';
import { ApprovalSection } from '../components/ApprovalSection';
import { StageBadge, ApprovalStatusBadge } from '../components/ApprovalStatusBadge';
import { useWorkspace } from '../context/WorkspaceContext';
import { useApproval } from '../context/ApprovalContext';
import type {
  Capability,
  CapabilityWithDetails,
} from '../api/services';
import { capabilityService } from '../api/services';
import type { WorkflowStage } from '../api/approvalService';

interface FileCapability {
  filename: string;
  path: string;
  name: string;
  description: string;
  status: string;
  content: string;
  fields: Record<string, string>;
}

export const Capabilities: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const { pendingCount } = useApproval();
  const [searchParams, setSearchParams] = useSearchParams();
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<CapabilityWithDetails | undefined>();
  const [detailsView, setDetailsView] = useState<CapabilityWithDetails | null>(null);
  const [fileCapabilities, setFileCapabilities] = useState<FileCapability[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [selectedFileCapability, setSelectedFileCapability] = useState<FileCapability | null>(null);
  const [isEditingFileCapability, setIsEditingFileCapability] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    status: '',
    content: '',
  });
  const [savingCapability, setSavingCapability] = useState(false);
  const [deletingCapability, setDeletingCapability] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{
    name: string;
    description: string;
    type: 'capability' | 'feature' | 'enabler';
    rationale: string;
  }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    confirmVariant?: 'primary' | 'danger';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const closeConfirmDialog = () => {
    setConfirmDialog(prev => ({ ...prev, isOpen: false }));
  };

  // Start blank for new workspaces - capabilities will be created by the user
  useEffect(() => {
    // Reset to blank when workspace changes
    setCapabilities([]);
    setFileCapabilities([]);
    setError(null);
    setLoading(false);
    // Load file-based capabilities when workspace changes
    if (currentWorkspace?.projectFolder) {
      fetchFileCapabilities();
    }
  }, [currentWorkspace?.id, currentWorkspace?.projectFolder]);

  // Handle opening a specific item from URL parameter
  useEffect(() => {
    const openItem = searchParams.get('open');
    if (openItem && fileCapabilities.length > 0 && !selectedFileCapability) {
      // Find a capability with matching filename
      const matchingCapability = fileCapabilities.find(cap => cap.filename === openItem);
      if (matchingCapability) {
        setSelectedFileCapability(matchingCapability);
        // Scroll to the capability section
        setTimeout(() => {
          const element = document.getElementById(`capability-${matchingCapability.filename}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
      // Clear the search param after attempting to open
      setSearchParams({}, { replace: true });
    }
  }, [fileCapabilities, searchParams, selectedFileCapability, setSearchParams]);

  const fetchFileCapabilities = async () => {
    if (!currentWorkspace?.projectFolder) return;

    setLoadingFiles(true);
    try {
      const response = await fetch('http://localhost:9080/capability-files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workspacePath: currentWorkspace.projectFolder,
        }),
      });

      const data = await response.json();
      if (data.capabilities) {
        setFileCapabilities(data.capabilities);
      }
    } catch (err) {
      console.error('Failed to fetch capability files:', err);
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleEditFileCapability = (cap: FileCapability) => {
    setEditFormData({
      name: cap.name,
      description: cap.description,
      status: cap.status,
      content: cap.content,
    });
    setIsEditingFileCapability(true);
  };

  const handleSaveFileCapability = async () => {
    if (!selectedFileCapability) return;

    setSavingCapability(true);
    try {
      const response = await fetch('http://localhost:9080/save-capability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: selectedFileCapability.path,
          name: editFormData.name,
          description: editFormData.description,
          status: editFormData.status,
          content: editFormData.content,
        }),
      });

      if (response.ok) {
        // Refresh the list
        await fetchFileCapabilities();
        setIsEditingFileCapability(false);
        setSelectedFileCapability(null);
      } else {
        const errorData = await response.text();
        setError(`Failed to save: ${errorData}`);
      }
    } catch (err) {
      setError(`Failed to save capability: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setSavingCapability(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingFileCapability(false);
    if (selectedFileCapability) {
      setEditFormData({
        name: selectedFileCapability.name,
        description: selectedFileCapability.description,
        status: selectedFileCapability.status,
        content: selectedFileCapability.content,
      });
    }
  };

  const handleDeleteFileCapability = async (cap: FileCapability) => {
    if (!confirm(`Are you sure you want to delete "${cap.name}"? This cannot be undone.`)) {
      return;
    }

    setDeletingCapability(true);
    try {
      const response = await fetch('http://localhost:9080/delete-capability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: cap.path,
        }),
      });

      if (response.ok) {
        // Refresh the list
        await fetchFileCapabilities();
        // Close modal if deleting the selected capability
        if (selectedFileCapability?.path === cap.path) {
          setSelectedFileCapability(null);
          setIsEditingFileCapability(false);
        }
      } else {
        const errorData = await response.text();
        setError(`Failed to delete: ${errorData}`);
      }
    } catch (err) {
      setError(`Failed to delete capability: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setDeletingCapability(false);
    }
  };

  const handleAnalyzeSpecifications = async () => {
    if (!currentWorkspace?.projectFolder) {
      alert('Please set a project folder for this workspace first.');
      return;
    }

    setIsAnalyzing(true);
    setSuggestions([]);

    try {
      // First, get the list of specification files
      const listUrl = `http://localhost:9080/specifications/list?workspace=${encodeURIComponent(currentWorkspace.projectFolder)}`;
      const listResponse = await fetch(listUrl);

      if (!listResponse.ok) {
        throw new Error('Failed to list specifications');
      }

      const { files } = await listResponse.json();

      if (!files || files.length === 0) {
        alert('No specification files found in the workspace. Please add some specifications first.');
        setIsAnalyzing(false);
        return;
      }

      // Get API key
      const anthropicKey = localStorage.getItem('anthropic_api_key') || '';
      if (!anthropicKey) {
        alert('Please add your Anthropic API key in the Settings page.');
        setIsAnalyzing(false);
        return;
      }

      // Analyze with Claude to suggest capabilities
      const response = await fetch('http://localhost:9080/analyze-capabilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          files,
          anthropic_key: anthropicKey,
          existingCapabilities: fileCapabilities.map(c => c.name),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to analyze specifications');
      }

      const result = await response.json();
      if (result.suggestions && result.suggestions.length > 0) {
        setSuggestions(result.suggestions);
        setShowSuggestions(true);
      } else {
        alert('Analysis complete. No new capabilities suggested - your specifications are well covered!');
      }
    } catch (err) {
      console.error('Failed to analyze specifications:', err);
      alert(`Failed to analyze: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAcceptSuggestion = async (suggestion: typeof suggestions[0]) => {
    if (!currentWorkspace?.projectFolder) return;

    // Generate filename based on type: CAP-NAME-(n).md or ENB-NAME-(n).md
    const safeName = suggestion.name
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Determine prefix based on type
    const prefix = suggestion.type === 'enabler' ? 'ENB' : 'CAP';
    const sequenceNum = fileCapabilities.length + suggestions.indexOf(suggestion) + 1;
    const fileName = `${prefix}-${safeName}-${sequenceNum}.md`;

    // Generate markdown content
    let markdown = `# ${suggestion.name}\n\n`;
    markdown += `## Metadata\n`;
    markdown += `- **Type**: ${suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}\n`;
    markdown += `- **Status**: Planned\n`;
    markdown += `- **Generated**: ${new Date().toLocaleString()}\n\n`;
    markdown += `## Description\n`;
    markdown += `${suggestion.description}\n\n`;
    markdown += `## Rationale\n`;
    markdown += `${suggestion.rationale}\n\n`;
    markdown += `## Implementation Notes\n`;
    markdown += `_Add implementation details here._\n\n`;
    markdown += `## Acceptance Criteria\n`;
    markdown += `- [ ] TODO: Define acceptance criteria\n`;

    try {
      const response = await fetch('http://localhost:9080/save-specifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workspacePath: currentWorkspace.projectFolder,
          files: [{ fileName, content: markdown }],
          subfolder: 'definition'
        }),
      });

      if (response.ok) {
        // Remove from suggestions
        setSuggestions(prev => prev.filter(s => s.name !== suggestion.name));
        // Refresh file capabilities
        await fetchFileCapabilities();
        alert(`✅ Created definition/${fileName}`);
      } else {
        throw new Error('Failed to save capability file');
      }
    } catch (err) {
      alert(`Failed to create capability: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleAcceptAllSuggestions = async () => {
    for (const suggestion of suggestions) {
      await handleAcceptSuggestion(suggestion);
    }
    setShowSuggestions(false);
  };

  const loadCapabilities = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await capabilityService.getCapabilities();
      setCapabilities(response.capabilities || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load capabilities');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedCapability(undefined);
    setDetailsView(null);
    setShowForm(true);
  };

  const handleEdit = async (capability: Capability) => {
    try {
      const details = await capabilityService.getCapability(capability.id!);
      setSelectedCapability(details);
      setDetailsView(null);
      setShowForm(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load capability details');
    }
  };

  const handleViewDetails = async (capability: Capability) => {
    try {
      const details = await capabilityService.getCapability(capability.id!);
      setDetailsView(details);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load capability details');
    }
  };

  const handleDelete = (id: number) => {
    const capability = capabilities.find(c => c.id === id);
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Capability',
      message: `Are you sure you want to delete "${capability?.name || 'this capability'}"?`,
      confirmLabel: 'Delete',
      confirmVariant: 'danger',
      onConfirm: async () => {
        closeConfirmDialog();
        try {
          await capabilityService.deleteCapability(id);
          await loadCapabilities();
          setDetailsView(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to delete capability');
        }
      },
    });
  };

  const handleFormSave = async () => {
    setShowForm(false);
    setSelectedCapability(undefined);
    // Refresh file-based capabilities from the active workspace's definition folder
    await fetchFileCapabilities();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedCapability(undefined);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'implemented':
        return { bg: 'rgba(76, 217, 100, 0.1)', color: 'var(--color-systemGreen)' };
      case 'in_progress':
      case 'in progress':
        return { bg: 'rgba(255, 204, 0, 0.1)', color: 'var(--color-systemYellow)' };
      case 'planned':
        return { bg: 'rgba(0, 122, 255, 0.1)', color: 'var(--color-systemBlue)' };
      case 'deprecated':
        return { bg: 'rgba(142, 142, 147, 0.1)', color: 'var(--color-systemGray)' };
      case 'not specified':
        return { bg: 'rgba(142, 142, 147, 0.05)', color: 'var(--color-tertiaryLabel)' };
      default:
        return { bg: 'rgba(142, 142, 147, 0.1)', color: 'var(--color-systemGray)' };
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Filter and search logic
  const filterCapabilities = (caps: FileCapability[]) => {
    return caps.filter(cap => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        cap.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cap.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cap.filename?.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'not specified' && (!cap.status || cap.status.trim() === '')) ||
        cap.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  };

  // Group capabilities by status
  const groupByStatus = (caps: FileCapability[]) => {
    const groups: Record<string, FileCapability[]> = {
      'Not Specified': [],
      'Planned': [],
      'In Progress': [],
      'Implemented': [],
      'Deprecated': [],
    };

    caps.forEach(cap => {
      if (!cap.status || cap.status.trim() === '') {
        groups['Not Specified'].push(cap);
      } else {
        const status = formatStatus(cap.status);
        if (groups[status]) {
          groups[status].push(cap);
        } else {
          groups['Planned'].push(cap);
        }
      }
    });

    return groups;
  };

  // Get filtered capabilities
  const filteredCapabilities = filterCapabilities(fileCapabilities);
  const groupedCapabilities = groupByStatus(filteredCapabilities);

  // Calculate summary counts
  const summaryCounts = {
    notSpecified: fileCapabilities.filter(c => !c.status || c.status.trim() === '').length,
    planned: fileCapabilities.filter(c => c.status?.toLowerCase() === 'planned').length,
    inProgress: fileCapabilities.filter(c => c.status?.toLowerCase() === 'in progress' || c.status?.toLowerCase() === 'in_progress').length,
    implemented: fileCapabilities.filter(c => c.status?.toLowerCase() === 'implemented').length,
    deprecated: fileCapabilities.filter(c => c.status?.toLowerCase() === 'deprecated').length,
    total: fileCapabilities.length,
  };

  const toggleSection = (status: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  if (showForm) {
    return (
      <div className="max-w-7xl mx-auto" style={{ padding: '16px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 className="text-large-title" style={{ marginBottom: '8px' }}>
            {selectedCapability ? 'Edit Capability' : 'Create Capability'}
          </h1>
        </div>
        <Card>
          <CapabilityForm
            capability={selectedCapability}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
            allCapabilities={capabilities}
          />
        </Card>
      </div>
    );
  }

  if (detailsView) {
    const statusColors = getStatusColor(detailsView.status);
    return (
      <div className="max-w-7xl mx-auto" style={{ padding: '16px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h1 className="text-large-title">{detailsView.name}</h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="secondary" onClick={() => setDetailsView(null)}>
                Back to List
              </Button>
              <Button variant="primary" onClick={() => handleEdit(detailsView)}>
                Edit
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleDelete(detailsView.id!)}
                style={{ color: 'var(--color-systemRed)' }}
              >
                Delete
              </Button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Basic Info Card */}
            <Card>
              <h3 className="text-title2" style={{ marginBottom: '16px' }}>Basic Information</h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <p className="text-subheadline" style={{ marginBottom: '4px' }}>Capability ID</p>
                  <p className="text-body">{detailsView.capability_id}</p>
                </div>
                <div>
                  <p className="text-subheadline" style={{ marginBottom: '4px' }}>Status</p>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: '20px',
                    backgroundColor: statusColors.bg,
                    color: statusColors.color,
                  }}>
                    {formatStatus(detailsView.status)}
                  </span>
                </div>
                {detailsView.description && (
                  <div>
                    <p className="text-subheadline" style={{ marginBottom: '4px' }}>Description</p>
                    <p className="text-body">{detailsView.description}</p>
                  </div>
                )}
                {detailsView.storyboard_reference && (
                  <div>
                    <p className="text-subheadline" style={{ marginBottom: '4px' }}>Storyboard Reference</p>
                    <p className="text-body">{detailsView.storyboard_reference}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Purpose Card */}
            {detailsView.purpose && (
              <Card>
                <h3 className="text-title2" style={{ marginBottom: '16px' }}>Purpose</h3>
                <p className="text-body" style={{ whiteSpace: 'pre-wrap' }}>
                  {detailsView.purpose}
                </p>
              </Card>
            )}

            {/* Dependencies Card */}
            {(detailsView.upstream_dependencies.length > 0 || detailsView.downstream_dependencies.length > 0) && (
              <Card>
                <h3 className="text-title2" style={{ marginBottom: '16px' }}>Dependencies</h3>

                {detailsView.upstream_dependencies.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <p className="text-subheadline" style={{ marginBottom: '12px' }}>
                      Upstream Dependencies (this depends on)
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {detailsView.upstream_dependencies.map(dep => (
                        <div
                          key={dep.id}
                          style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid var(--color-separator)',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleViewDetails(dep)}
                        >
                          <p className="text-subheadline">{dep.capability_id} - {dep.name}</p>
                          <span style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            fontSize: '11px',
                            fontWeight: 600,
                            borderRadius: '12px',
                            backgroundColor: getStatusColor(dep.status).bg,
                            color: getStatusColor(dep.status).color,
                            marginTop: '4px',
                          }}>
                            {formatStatus(dep.status)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {detailsView.downstream_dependencies.length > 0 && (
                  <div>
                    <p className="text-subheadline" style={{ marginBottom: '12px' }}>
                      Downstream Dependencies (depends on this)
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {detailsView.downstream_dependencies.map(dep => (
                        <div
                          key={dep.id}
                          style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid var(--color-separator)',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleViewDetails(dep)}
                        >
                          <p className="text-subheadline">{dep.capability_id} - {dep.name}</p>
                          <span style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            fontSize: '11px',
                            fontWeight: 600,
                            borderRadius: '12px',
                            backgroundColor: getStatusColor(dep.status).bg,
                            color: getStatusColor(dep.status).color,
                            marginTop: '4px',
                          }}>
                            {formatStatus(dep.status)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* UI Assets Card */}
            {detailsView.assets && detailsView.assets.length > 0 && (
              <Card>
                <h3 className="text-title2" style={{ marginBottom: '16px' }}>UI Assets</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {detailsView.assets.map(asset => (
                    <div
                      key={asset.id}
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-separator)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                        <p className="text-subheadline">{asset.asset_name}</p>
                        <span style={{
                          padding: '2px 8px',
                          fontSize: '11px',
                          fontWeight: 600,
                          borderRadius: '12px',
                          backgroundColor: 'rgba(0, 122, 255, 0.1)',
                          color: 'var(--color-systemBlue)',
                        }}>
                          {asset.asset_type.toUpperCase()}
                        </span>
                      </div>
                      {asset.asset_url && (
                        <p className="text-footnote" style={{ marginBottom: '8px' }}>
                          <a
                            href={asset.asset_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--color-systemBlue)' }}
                          >
                            {asset.asset_url}
                          </a>
                        </p>
                      )}
                      {asset.description && (
                        <p className="text-body text-secondary" style={{ marginTop: '8px' }}>
                          {asset.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Approval Workflow Section */}
            {detailsView.id && (
              <Card>
                <ApprovalSection
                  capabilityId={detailsView.id}
                  currentStage={detailsView.workflow_stage || 'specification'}
                  currentStatus={detailsView.approval_status || 'draft'}
                  onApprovalChange={() => handleViewDetails(detailsView)}
                />
              </Card>
            )}

            {/* Acceptance Criteria Section */}
            {detailsView.id && (
              <Card>
                <AcceptanceCriteriaSection
                  entityType="capability"
                  entityId={detailsView.id}
                  entityName={detailsView.name}
                />
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto" style={{ padding: '16px' }}>
      <AIPresetIndicator />
      {/* Workspace Header */}
      {currentWorkspace && (
        <div style={{
          backgroundColor: 'var(--color-primary)',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <h4 className="text-title3" style={{ margin: 0, color: 'white' }}>
            Workspace: {currentWorkspace.name}
          </h4>
        </div>
      )}
      <div style={{ marginBottom: 'var(--spacing-6, 24px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h1 className="text-large-title" style={{ marginBottom: '8px' }}>Capability Management</h1>
            <p className="text-body text-secondary" style={{ marginBottom: '16px' }}>
              Track and manage SAWai capabilities - high-level business outcomes across your organization.
            </p>
          </div>
          <Button variant="primary" onClick={handleCreate}>
            + Create Capability
          </Button>
        </div>

        {error && (
          <Alert type="error" style={{ marginBottom: '24px' }}>
            <strong>Error:</strong> {error}
          </Alert>
        )}

        <Alert type="info" style={{ marginBottom: '24px' }}>
          <strong>SAWai Capabilities:</strong> In Scaled Agile With AI (SAWai), capabilities represent high-level business outcomes
          that contain multiple enablers. They integrate with design artifacts and AI-assisted development tools to accelerate delivery.
        </Alert>

        {/* File-based Capabilities Section */}
        {currentWorkspace?.projectFolder && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 className="text-title2">Capabilities from Specifications</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button variant="primary" onClick={handleAnalyzeSpecifications} disabled={isAnalyzing || loadingFiles}>
                  {isAnalyzing ? '🤖 Analyzing...' : '🤖 Analyze'}
                </Button>
                <Button variant="secondary" onClick={fetchFileCapabilities} disabled={loadingFiles}>
                  {loadingFiles ? 'Loading...' : 'Refresh'}
                </Button>
              </div>
            </div>

            {loadingFiles ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <p className="text-body text-secondary">Loading capability files...</p>
              </div>
            ) : fileCapabilities.length === 0 ? (
              <Card>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p className="text-body text-secondary">
                    No capability files found in definition folder.
                    <br />
                    <span className="text-footnote">Looking for files matching: capability*, CAP* in {currentWorkspace?.projectFolder}/definition/</span>
                  </p>
                </div>
              </Card>
            ) : (
              <>
                {/* Summary Dashboard */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  <Card style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-label)' }}>
                      {summaryCounts.total}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-secondaryLabel)', marginTop: '4px' }}>
                      Total
                    </div>
                  </Card>
                  <Card style={{ padding: '16px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setStatusFilter('not specified')}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-systemGray)' }}>
                      {summaryCounts.notSpecified}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-secondaryLabel)', marginTop: '4px' }}>
                      ❓ Not Specified
                    </div>
                  </Card>
                  <Card style={{ padding: '16px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setStatusFilter('planned')}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-systemBlue)' }}>
                      {summaryCounts.planned}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-secondaryLabel)', marginTop: '4px' }}>
                      📋 Planned
                    </div>
                  </Card>
                  <Card style={{ padding: '16px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setStatusFilter('in progress')}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-systemYellow)' }}>
                      {summaryCounts.inProgress}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-secondaryLabel)', marginTop: '4px' }}>
                      ⚙️ In Progress
                    </div>
                  </Card>
                  <Card style={{ padding: '16px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setStatusFilter('implemented')}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-systemGreen)' }}>
                      {summaryCounts.implemented}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-secondaryLabel)', marginTop: '4px' }}>
                      ✅ Implemented
                    </div>
                  </Card>
                  <Card style={{ padding: '16px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setStatusFilter('deprecated')}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-systemGray)' }}>
                      {summaryCounts.deprecated}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-secondaryLabel)', marginTop: '4px' }}>
                      ⚠️ Deprecated
                    </div>
                  </Card>
                </div>

                {/* Search and Filter Controls */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <input
                    type="text"
                    placeholder="🔍 Search capabilities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input"
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      fontSize: '14px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-separator)',
                    }}
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="input"
                    style={{
                      padding: '10px 16px',
                      fontSize: '14px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-separator)',
                      minWidth: '150px',
                    }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="not specified">Not Specified</option>
                    <option value="planned">Planned</option>
                    <option value="in progress">In Progress</option>
                    <option value="implemented">Implemented</option>
                    <option value="deprecated">Deprecated</option>
                  </select>
                  {(searchQuery || statusFilter !== 'all') && (
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('all');
                      }}
                    >
                      Clear
                    </Button>
                  )}
                </div>

                {/* Grouped Capabilities by Status */}
                {filteredCapabilities.length === 0 ? (
                  <Card>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <p className="text-body text-secondary">
                        No capabilities match your search criteria.
                      </p>
                    </div>
                  </Card>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {Object.entries(groupedCapabilities).map(([status, caps]) => {
                      if (caps.length === 0) return null;

                      const statusColors = getStatusColor(status);
                      const isCollapsed = collapsedSections[status];

                      return (
                        <div key={status}>
                          {/* Status Section Header */}
                          <div
                            onClick={() => toggleSection(status)}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '12px 16px',
                              backgroundColor: statusColors.bg,
                              borderRadius: '8px',
                              cursor: 'pointer',
                              marginBottom: isCollapsed ? '0' : '12px',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '18px' }}>
                                {isCollapsed ? '▶' : '▼'}
                              </span>
                              <h4 className="text-headline" style={{ margin: 0, color: statusColors.color }}>
                                {status}
                              </h4>
                              <span style={{
                                padding: '2px 8px',
                                fontSize: '12px',
                                fontWeight: 600,
                                borderRadius: '12px',
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                color: statusColors.color,
                              }}>
                                {caps.length}
                              </span>
                            </div>
                          </div>

                          {/* Capability Cards */}
                          {!isCollapsed && (
                            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'var(--spacing-4, 16px)' }}>
                              {caps.map((fileCap) => {
                  const statusColors = getStatusColor(fileCap.status || 'planned');
                  return (
                    <Card key={fileCap.path || fileCap.filename}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div style={{ flex: 1 }}>
                          <h3
                            className="text-headline"
                            style={{
                              marginBottom: '8px',
                              cursor: 'pointer',
                              color: 'var(--color-systemBlue)',
                            }}
                            onClick={() => setSelectedFileCapability(fileCap)}
                          >
                            {fileCap.name || fileCap.filename}
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {fileCap.status && (
                              <span style={{
                                display: 'inline-block',
                                padding: '4px 12px',
                                fontSize: '12px',
                                fontWeight: 600,
                                borderRadius: '20px',
                                backgroundColor: statusColors.bg,
                                color: statusColors.color,
                                width: 'fit-content'
                              }}>
                                {formatStatus(fileCap.status)}
                              </span>
                            )}
                            <p className="text-footnote text-secondary">
                              <strong>File:</strong> {fileCap.filename}
                            </p>
                            {fileCap.description && (
                              <p className="text-footnote text-secondary">
                                {fileCap.description}
                              </p>
                            )}
                            {/* Display additional fields from markdown */}
                            {Object.entries(fileCap.fields || {}).slice(0, 3).map(([key, value]) => (
                              <p key={key} className="text-footnote text-secondary">
                                <strong>{key}:</strong> {String(value).substring(0, 100)}{String(value).length > 100 ? '...' : ''}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div style={{ marginLeft: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <button
                            onClick={() => setSelectedFileCapability(fileCap)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: 'var(--color-systemBlue)',
                              fontSize: '14px',
                              padding: '4px 8px',
                            }}
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteFileCapability(fileCap)}
                            disabled={deletingCapability}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: deletingCapability ? 'wait' : 'pointer',
                              color: 'var(--color-systemRed)',
                              fontSize: '14px',
                              padding: '4px 8px',
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </Card>
                  );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* File Capability Detail Modal */}
        {selectedFileCapability && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px',
          }}>
            <Card style={{ maxWidth: '800px', maxHeight: '80vh', overflow: 'auto', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <h2 className="text-title1">
                  {isEditingFileCapability ? 'Edit Capability' : (selectedFileCapability.name || selectedFileCapability.filename)}
                </h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {!isEditingFileCapability && (
                    <>
                      <Button variant="primary" onClick={() => handleEditFileCapability(selectedFileCapability)}>
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleDeleteFileCapability(selectedFileCapability)}
                        disabled={deletingCapability}
                        style={{ color: 'var(--color-systemRed)' }}
                      >
                        {deletingCapability ? 'Deleting...' : 'Delete'}
                      </Button>
                    </>
                  )}
                  <Button variant="secondary" onClick={() => {
                    setSelectedFileCapability(null);
                    setIsEditingFileCapability(false);
                  }}>
                    Close
                  </Button>
                </div>
              </div>

              {isEditingFileCapability ? (
                /* Edit Form */
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <label className="text-subheadline" style={{ display: 'block', marginBottom: '8px' }}>Name</label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="input"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label className="text-subheadline" style={{ display: 'block', marginBottom: '8px' }}>Status</label>
                    <select
                      value={editFormData.status}
                      onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                      className="input"
                      style={{ width: '100%' }}
                    >
                      <option value="">Select Status</option>
                      <option value="Planned">Planned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Implemented">Implemented</option>
                      <option value="Deprecated">Deprecated</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label className="text-subheadline" style={{ display: 'block', marginBottom: '8px' }}>Description</label>
                    <textarea
                      value={editFormData.description}
                      onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                      className="input"
                      rows={3}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label className="text-subheadline" style={{ display: 'block', marginBottom: '8px' }}>Additional Content</label>
                    <textarea
                      value={editFormData.content}
                      onChange={(e) => setEditFormData({ ...editFormData, content: e.target.value })}
                      className="input"
                      rows={10}
                      style={{ width: '100%', fontFamily: 'monospace', fontSize: '12px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveFileCapability} disabled={savingCapability}>
                      {savingCapability ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <>
                  <div style={{ marginBottom: '16px' }}>
                    <p className="text-footnote text-secondary">
                      <strong>File:</strong> {selectedFileCapability.path}
                    </p>
                  </div>

                  {selectedFileCapability.description && (
                    <div style={{ marginBottom: '16px' }}>
                      <h4 className="text-headline" style={{ marginBottom: '8px' }}>Description</h4>
                      <p className="text-body">{selectedFileCapability.description}</p>
                    </div>
                  )}

                  {/* Display all fields from the markdown */}
                  {Object.entries(selectedFileCapability.fields || {}).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '16px' }}>
                      <h4 className="text-headline" style={{ marginBottom: '8px' }}>{key}</h4>
                      <p className="text-body" style={{ whiteSpace: 'pre-wrap' }}>{value}</p>
                    </div>
                  ))}

                  {/* Raw content */}
                  {selectedFileCapability.content && (
                    <div style={{ marginTop: '24px' }}>
                      <h4 className="text-headline" style={{ marginBottom: '8px' }}>Raw Content</h4>
                      <pre style={{
                        backgroundColor: 'var(--color-secondarySystemBackground)',
                        padding: '12px',
                        borderRadius: '8px',
                        overflow: 'auto',
                        fontSize: '12px',
                        whiteSpace: 'pre-wrap',
                      }}>
                        {selectedFileCapability.content}
                      </pre>
                    </div>
                  )}
                </>
              )}
            </Card>
          </div>
        )}

        {/* Suggestions Modal */}
        {showSuggestions && suggestions.length > 0 && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px',
          }}>
            <Card style={{ maxWidth: '800px', maxHeight: '80vh', overflow: 'auto', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h2 className="text-title1">Suggested Capabilities</h2>
                  <p className="text-body text-secondary" style={{ marginTop: '8px' }}>
                    Based on your specifications, here are suggested capabilities you might want to add:
                  </p>
                </div>
                <Button variant="secondary" onClick={() => setShowSuggestions(false)}>
                  Close
                </Button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-separator)',
                      backgroundColor: 'var(--color-secondarySystemBackground)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                      <div>
                        <h3 className="text-headline" style={{ marginBottom: '4px' }}>{suggestion.name}</h3>
                        <span style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          fontSize: '11px',
                          fontWeight: 600,
                          borderRadius: '12px',
                          backgroundColor: suggestion.type === 'capability' ? 'rgba(0, 122, 255, 0.1)' :
                                          suggestion.type === 'feature' ? 'rgba(76, 217, 100, 0.1)' :
                                          'rgba(255, 204, 0, 0.1)',
                          color: suggestion.type === 'capability' ? 'var(--color-systemBlue)' :
                                 suggestion.type === 'feature' ? 'var(--color-systemGreen)' :
                                 'var(--color-systemYellow)',
                        }}>
                          {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                        </span>
                      </div>
                      <Button variant="primary" onClick={() => handleAcceptSuggestion(suggestion)}>
                        Accept
                      </Button>
                    </div>
                    <p className="text-body" style={{ marginBottom: '8px' }}>{suggestion.description}</p>
                    <p className="text-footnote text-secondary">
                      <strong>Rationale:</strong> {suggestion.rationale}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <Button variant="secondary" onClick={() => setShowSuggestions(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleAcceptAllSuggestions}>
                  Accept All ({suggestions.length})
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Database capabilities section hidden - using file-based capabilities from definition folder only */}
        {false && loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p className="text-body text-secondary">Loading capabilities...</p>
          </div>
        ) : false && capabilities.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p className="text-body text-secondary" style={{ marginBottom: '16px' }}>
                No database capabilities found. Create your first capability to get started.
              </p>
              <Button variant="primary" onClick={handleCreate}>
                Create First Capability
              </Button>
            </div>
          </Card>
        ) : false ? (
          <>
            <h3 className="text-title2" style={{ marginBottom: '16px' }}>Database Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'var(--spacing-4, 16px)' }}>
              {capabilities.map(capability => {
                const statusColors = getStatusColor(capability.status);
                const workflowStage = capability.workflow_stage || 'specification';
                const approvalStatus = capability.approval_status || 'draft';
                return (
                  <Card key={capability.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <h3
                          className="text-headline"
                          style={{
                            marginBottom: '8px',
                            cursor: 'pointer',
                            color: 'var(--color-systemBlue)',
                          }}
                          onClick={() => handleViewDetails(capability)}
                        >
                          {capability.name}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {/* Workflow Stage and Approval Status */}
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <StageBadge stage={workflowStage as WorkflowStage} size="small" />
                            <ApprovalStatusBadge status={approvalStatus} size="small" />
                          </div>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            fontSize: '12px',
                            fontWeight: 600,
                            borderRadius: '20px',
                            backgroundColor: statusColors.bg,
                            color: statusColors.color,
                            width: 'fit-content'
                          }}>
                            {formatStatus(capability.status)}
                          </span>
                          <p className="text-footnote text-secondary">
                            <strong>ID:</strong> {capability.capability_id}
                          </p>
                          {capability.description && (
                            <p className="text-footnote text-secondary">
                              {capability.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div style={{ marginLeft: '12px' }}>
                        <button
                          onClick={() => handleEdit(capability)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--color-systemBlue)',
                            fontSize: '14px',
                            padding: '4px 8px',
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        ) : null}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        confirmVariant={confirmDialog.confirmVariant}
        onConfirm={confirmDialog.onConfirm}
        onCancel={closeConfirmDialog}
      />
    </div>
  );
};
