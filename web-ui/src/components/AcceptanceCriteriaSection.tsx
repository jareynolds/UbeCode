import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, ConfirmDialog } from './index';
import {
  type AcceptanceCriteria,
  type AcceptanceCriteriaSummary,
  type EntityType,
  type CriteriaFormat,
  type CriteriaPriority,
  getCapabilityCriteria,
  getEnablerCriteria,
  getRequirementCriteria,
  getAcceptanceCriteriaSummary,
  createCapabilityCriteria,
  createEnablerCriteria,
  createRequirementCriteria,
  updateAcceptanceCriteria,
  deleteAcceptanceCriteria,
  verifyAcceptanceCriteria,
  getCriteriaFormatDisplayName,
  getCriteriaStatusDisplayName,
  getCriteriaStatusColor,
  getCriteriaPriorityDisplayName,
  generateId,
} from '../api/enablerService';

interface AcceptanceCriteriaSectionProps {
  entityType: EntityType;
  entityId: number;
  entityName?: string;
  compact?: boolean;
}

export const AcceptanceCriteriaSection: React.FC<AcceptanceCriteriaSectionProps> = ({
  entityType,
  entityId,
  entityName,
  compact = false,
}) => {
  const [criteria, setCriteria] = useState<AcceptanceCriteria[]>([]);
  const [summary, setSummary] = useState<AcceptanceCriteriaSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCriteria, setEditingCriteria] = useState<AcceptanceCriteria | null>(null);

  const [formData, setFormData] = useState({
    criteria_id: '',
    title: '',
    description: '',
    criteria_format: 'checklist' as CriteriaFormat,
    given_clause: '',
    when_clause: '',
    then_clause: '',
    metric_name: '',
    metric_target: '',
    priority: 'must' as CriteriaPriority,
  });

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

  const loadCriteria = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let response;
      switch (entityType) {
        case 'capability':
          response = await getCapabilityCriteria(entityId);
          break;
        case 'enabler':
          response = await getEnablerCriteria(entityId);
          break;
        case 'requirement':
          response = await getRequirementCriteria(entityId);
          break;
      }
      setCriteria(response?.criteria || []);

      // Load summary
      const summaryData = await getAcceptanceCriteriaSummary(entityType, entityId);
      setSummary(summaryData);
    } catch (err: any) {
      setError(err.message || 'Failed to load acceptance criteria');
    } finally {
      setIsLoading(false);
    }
  }, [entityType, entityId]);

  useEffect(() => {
    if (entityId) {
      loadCriteria();
    }
  }, [entityId, loadCriteria]);

  const handleCreate = () => {
    setEditingCriteria(null);
    setFormData({
      criteria_id: generateId('AC'),
      title: '',
      description: '',
      criteria_format: 'checklist',
      given_clause: '',
      when_clause: '',
      then_clause: '',
      metric_name: '',
      metric_target: '',
      priority: 'must',
    });
    setShowForm(true);
  };

  const handleEdit = (item: AcceptanceCriteria) => {
    setEditingCriteria(item);
    setFormData({
      criteria_id: item.criteria_id,
      title: item.title,
      description: item.description,
      criteria_format: item.criteria_format,
      given_clause: item.given_clause || '',
      when_clause: item.when_clause || '',
      then_clause: item.then_clause || '',
      metric_name: item.metric_name || '',
      metric_target: item.metric_target || '',
      priority: item.priority,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setError(null);
    try {
      if (editingCriteria) {
        await updateAcceptanceCriteria(editingCriteria.id, formData);
      } else {
        switch (entityType) {
          case 'capability':
            await createCapabilityCriteria(entityId, formData);
            break;
          case 'enabler':
            await createEnablerCriteria(entityId, formData);
            break;
          case 'requirement':
            await createRequirementCriteria(entityId, formData);
            break;
        }
      }
      setShowForm(false);
      setEditingCriteria(null);
      await loadCriteria();
    } catch (err: any) {
      setError(err.message || 'Failed to save criteria');
    }
  };

  const handleDelete = (id: number) => {
    const item = criteria.find(c => c.id === id);
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Acceptance Criteria',
      message: `Are you sure you want to delete "${item?.title || 'this acceptance criteria'}"?`,
      confirmLabel: 'Delete',
      confirmVariant: 'danger',
      onConfirm: async () => {
        closeConfirmDialog();
        try {
          await deleteAcceptanceCriteria(id);
          await loadCriteria();
        } catch (err: any) {
          setError(err.message || 'Failed to delete criteria');
        }
      },
    });
  };

  const handleVerify = async (item: AcceptanceCriteria, status: 'passed' | 'failed' | 'blocked' | 'skipped') => {
    try {
      await verifyAcceptanceCriteria(item.id, {
        status,
        verification_notes: `Marked as ${status} on ${new Date().toLocaleString()}`,
      });
      await loadCriteria();
    } catch (err: any) {
      setError(err.message || 'Failed to verify criteria');
    }
  };

  const handleReset = async (item: AcceptanceCriteria) => {
    try {
      await updateAcceptanceCriteria(item.id, { status: 'pending' });
      await loadCriteria();
    } catch (err: any) {
      setError(err.message || 'Failed to reset criteria');
    }
  };

  // Render compact summary badge
  if (compact) {
    if (!summary || summary.total_count === 0) {
      return (
        <span style={{
          padding: '2px 8px',
          fontSize: '11px',
          fontWeight: 600,
          borderRadius: '8px',
          backgroundColor: 'var(--color-tertiarySystemBackground)',
          color: 'var(--color-tertiaryLabel)',
        }}>
          No Criteria
        </span>
      );
    }

    const percentage = Math.round(summary.percentage);
    const bgColor = percentage === 100 ? 'rgba(52, 199, 89, 0.15)' :
                    percentage >= 50 ? 'rgba(255, 204, 0, 0.15)' :
                    'rgba(255, 59, 48, 0.15)';
    const textColor = percentage === 100 ? 'var(--color-systemGreen)' :
                      percentage >= 50 ? 'var(--color-systemYellow)' :
                      'var(--color-systemRed)';

    return (
      <span style={{
        padding: '2px 8px',
        fontSize: '11px',
        fontWeight: 600,
        borderRadius: '8px',
        backgroundColor: bgColor,
        color: textColor,
      }}>
        {summary.passed_count}/{summary.total_count} Criteria ({percentage}%)
      </span>
    );
  }

  // Render form modal
  const renderForm = () => (
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
      <Card style={{ maxWidth: '700px', width: '100%', maxHeight: '85vh', overflow: 'auto' }}>
        <h2 className="text-title1" style={{ marginBottom: '24px' }}>
          {editingCriteria ? 'Edit Acceptance Criteria' : 'Add Acceptance Criteria'}
        </h2>

        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: 'rgba(255, 59, 48, 0.1)',
            borderRadius: '8px',
            marginBottom: '16px',
            color: 'var(--color-systemRed)',
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="text-subheadline">Criteria ID</label>
            <input
              type="text"
              className="input"
              value={formData.criteria_id}
              onChange={(e) => setFormData({ ...formData, criteria_id: e.target.value })}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </div>

          <div>
            <label className="text-subheadline">Format</label>
            <select
              className="input"
              value={formData.criteria_format}
              onChange={(e) => setFormData({ ...formData, criteria_format: e.target.value as CriteriaFormat })}
              style={{ width: '100%', marginTop: '4px' }}
            >
              <option value="checklist">Checklist</option>
              <option value="given_when_then">Given/When/Then (BDD)</option>
              <option value="metric">Metric</option>
            </select>
          </div>

          <div>
            <label className="text-subheadline">Title *</label>
            <input
              type="text"
              className="input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </div>

          <div>
            <label className="text-subheadline">Description *</label>
            <textarea
              className="input"
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </div>

          {formData.criteria_format === 'given_when_then' && (
            <>
              <div>
                <label className="text-subheadline">Given (Preconditions)</label>
                <textarea
                  className="input"
                  rows={2}
                  placeholder="Given the user is logged in and has admin privileges..."
                  value={formData.given_clause}
                  onChange={(e) => setFormData({ ...formData, given_clause: e.target.value })}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </div>
              <div>
                <label className="text-subheadline">When (Action)</label>
                <textarea
                  className="input"
                  rows={2}
                  placeholder="When the user clicks the submit button..."
                  value={formData.when_clause}
                  onChange={(e) => setFormData({ ...formData, when_clause: e.target.value })}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </div>
              <div>
                <label className="text-subheadline">Then (Expected Result)</label>
                <textarea
                  className="input"
                  rows={2}
                  placeholder="Then the form should be submitted and a success message displayed..."
                  value={formData.then_clause}
                  onChange={(e) => setFormData({ ...formData, then_clause: e.target.value })}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </div>
            </>
          )}

          {formData.criteria_format === 'metric' && (
            <>
              <div>
                <label className="text-subheadline">Metric Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., Response Time, Uptime, Error Rate"
                  value={formData.metric_name}
                  onChange={(e) => setFormData({ ...formData, metric_name: e.target.value })}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </div>
              <div>
                <label className="text-subheadline">Target Value</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., < 200ms, > 99.9%, < 0.1%"
                  value={formData.metric_target}
                  onChange={(e) => setFormData({ ...formData, metric_target: e.target.value })}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </div>
            </>
          )}

          <div>
            <label className="text-subheadline">Priority</label>
            <select
              className="input"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as CriteriaPriority })}
              style={{ width: '100%', marginTop: '4px' }}
            >
              <option value="must">Must</option>
              <option value="should">Should</option>
              <option value="could">Could</option>
              <option value="wont">Won't</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </div>
      </Card>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 className="text-title3">
          Acceptance Criteria {entityName ? `for ${entityName}` : ''}
        </h3>
        <Button variant="primary" onClick={handleCreate}>+ Add Criteria</Button>
      </div>

      {error && !showForm && (
        <div style={{
          padding: '12px',
          backgroundColor: 'rgba(255, 59, 48, 0.1)',
          borderRadius: '8px',
          marginBottom: '16px',
          color: 'var(--color-systemRed)',
        }}>
          {error}
          <button
            onClick={() => setError(null)}
            style={{ marginLeft: '12px', color: 'var(--color-systemBlue)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Summary Section */}
      {summary && summary.total_count > 0 && (
        <div style={{
          padding: '16px',
          backgroundColor: 'var(--color-tertiarySystemBackground)',
          borderRadius: '8px',
          marginBottom: '16px',
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: `conic-gradient(var(--color-systemGreen) ${summary.percentage}%, var(--color-systemGray3) 0)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-systemBackground)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
            }}>
              {Math.round(summary.percentage)}%
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div>
              <span className="text-caption1 text-secondary">Total</span>
              <p className="text-headline">{summary.total_count}</p>
            </div>
            <div>
              <span className="text-caption1 text-secondary">Passed</span>
              <p className="text-headline" style={{ color: 'var(--color-systemGreen)' }}>{summary.passed_count}</p>
            </div>
            <div>
              <span className="text-caption1 text-secondary">Failed</span>
              <p className="text-headline" style={{ color: 'var(--color-systemRed)' }}>{summary.failed_count}</p>
            </div>
            <div>
              <span className="text-caption1 text-secondary">Pending</span>
              <p className="text-headline" style={{ color: 'var(--color-secondaryLabel)' }}>{summary.pending_count}</p>
            </div>
            <div>
              <span className="text-caption1 text-secondary">Blocked</span>
              <p className="text-headline" style={{ color: 'var(--color-systemOrange)' }}>{summary.blocked_count}</p>
            </div>
            <div>
              <span className="text-caption1 text-secondary">Skipped</span>
              <p className="text-headline" style={{ color: 'var(--color-systemPurple)' }}>{summary.skipped_count}</p>
            </div>
          </div>
        </div>
      )}

      {/* Criteria List */}
      {isLoading ? (
        <p className="text-body text-secondary" style={{ textAlign: 'center', padding: '20px' }}>
          Loading acceptance criteria...
        </p>
      ) : criteria.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          backgroundColor: 'var(--color-tertiarySystemBackground)',
          borderRadius: '8px',
        }}>
          <p className="text-body text-secondary" style={{ marginBottom: '16px' }}>
            No acceptance criteria defined yet.
          </p>
          <p className="text-footnote text-tertiary">
            Add acceptance criteria to define testable requirements for this {entityType}.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {criteria.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid var(--color-separator)',
                backgroundColor: item.status === 'passed' ? 'rgba(52, 199, 89, 0.05)' :
                                item.status === 'failed' ? 'rgba(255, 59, 48, 0.05)' :
                                item.status === 'blocked' ? 'rgba(255, 149, 0, 0.05)' : undefined,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <h4 className="text-headline">{item.title}</h4>
                    <span style={{
                      padding: '2px 8px',
                      fontSize: '10px',
                      fontWeight: 600,
                      borderRadius: '8px',
                      backgroundColor: `${getCriteriaStatusColor(item.status)}20`,
                      color: getCriteriaStatusColor(item.status),
                    }}>
                      {getCriteriaStatusDisplayName(item.status)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <span style={{
                      padding: '2px 8px',
                      fontSize: '10px',
                      fontWeight: 600,
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-tertiarySystemBackground)',
                      color: 'var(--color-secondaryLabel)',
                    }}>
                      {getCriteriaFormatDisplayName(item.criteria_format)}
                    </span>
                    <span style={{
                      padding: '2px 8px',
                      fontSize: '10px',
                      fontWeight: 600,
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-tertiarySystemBackground)',
                      color: 'var(--color-secondaryLabel)',
                    }}>
                      {getCriteriaPriorityDisplayName(item.priority)}
                    </span>
                  </div>

                  <p className="text-footnote text-secondary">{item.description}</p>

                  {/* Format-specific content */}
                  {item.criteria_format === 'given_when_then' && (
                    <div style={{ marginTop: '12px', fontSize: '13px', lineHeight: '1.5' }}>
                      {item.given_clause && (
                        <p><strong style={{ color: 'var(--color-systemBlue)' }}>Given:</strong> {item.given_clause}</p>
                      )}
                      {item.when_clause && (
                        <p><strong style={{ color: 'var(--color-systemOrange)' }}>When:</strong> {item.when_clause}</p>
                      )}
                      {item.then_clause && (
                        <p><strong style={{ color: 'var(--color-systemGreen)' }}>Then:</strong> {item.then_clause}</p>
                      )}
                    </div>
                  )}

                  {item.criteria_format === 'metric' && (
                    <div style={{ marginTop: '12px', fontSize: '13px' }}>
                      {item.metric_name && (
                        <p><strong>Metric:</strong> {item.metric_name}</p>
                      )}
                      {item.metric_target && (
                        <p><strong>Target:</strong> {item.metric_target}</p>
                      )}
                      {item.metric_actual && (
                        <p><strong>Actual:</strong> <span style={{ color: 'var(--color-systemBlue)' }}>{item.metric_actual}</span></p>
                      )}
                    </div>
                  )}

                  <p className="text-caption2 text-tertiary" style={{ marginTop: '8px' }}>{item.criteria_id}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginLeft: '16px' }}>
                  {item.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleVerify(item, 'passed')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-systemGreen)', fontSize: '12px', padding: '4px 8px' }}
                      >
                        Pass
                      </button>
                      <button
                        onClick={() => handleVerify(item, 'failed')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-systemRed)', fontSize: '12px', padding: '4px 8px' }}
                      >
                        Fail
                      </button>
                      <button
                        onClick={() => handleVerify(item, 'blocked')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-systemOrange)', fontSize: '12px', padding: '4px 8px' }}
                      >
                        Block
                      </button>
                    </>
                  )}
                  {item.status !== 'pending' && (
                    <button
                      onClick={() => handleReset(item)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-systemOrange)', fontSize: '12px', padding: '4px 8px' }}
                    >
                      Reset
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(item)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-systemBlue)', fontSize: '12px', padding: '4px 8px' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-systemRed)', fontSize: '12px', padding: '4px 8px' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && renderForm()}

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
