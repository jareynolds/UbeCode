import React, { useState, useEffect, useCallback } from 'react';
import { Card, Alert, Button, ConfirmDialog } from '../components';
import { useWorkspace } from '../context/WorkspaceContext';
import { INTEGRATION_URL } from '../api/client';

// Test Scenario interface
interface TestScenario {
  id: string;
  name: string;
  feature: string;
  enablerId: string;
  enablerName: string;
  requirementIds: string[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'draft' | 'ready' | 'passed' | 'failed' | 'blocked';
  automation: 'automated' | 'manual' | 'pending';
  tags: string[];
  gherkin: string;
  lastExecuted?: string;
  executionTime?: number;
}

// Test Suite interface
interface TestSuite {
  id: string;
  name: string;
  enablerId: string;
  scenarios: TestScenario[];
  status: 'not_started' | 'in_progress' | 'completed' | 'passed' | 'failed';
  coverage: number;
}

// Enabler with test information
interface EnablerWithTests {
  id: string;
  name: string;
  filename: string;
  path: string;
  capabilityId: string;
  requirementCount: number;
  testSuiteId?: string;
  scenarioCount: number;
  passedCount: number;
  failedCount: number;
  coverage: number;
}

// Coverage metrics
interface CoverageMetrics {
  totalRequirements: number;
  requirementsWithTests: number;
  requirementCoverage: number;
  totalScenarios: number;
  passedScenarios: number;
  failedScenarios: number;
  blockedScenarios: number;
  scenarioPassRate: number;
  criticalPassRate: number;
  automationRate: number;
}

export const Testing: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  // State
  const [enablers, setEnablers] = useState<EnablerWithTests[]>([]);
  const [selectedEnabler, setSelectedEnabler] = useState<EnablerWithTests | null>(null);
  const [testSuite, setTestSuite] = useState<TestSuite | null>(null);
  const [scenarios, setScenarios] = useState<TestScenario[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<TestScenario | null>(null);
  const [coverageMetrics, setCoverageMetrics] = useState<CoverageMetrics | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [showScenarioForm, setShowScenarioForm] = useState(false);
  const [editingScenario, setEditingScenario] = useState<TestScenario | null>(null);
  const [scenarioForm, setScenarioForm] = useState({
    name: '',
    feature: '',
    requirementIds: '',
    priority: 'medium' as TestScenario['priority'],
    automation: 'pending' as TestScenario['automation'],
    tags: '',
    gherkin: `@TS-XXXXXX @FR-XXXXXX
Scenario: [Scenario Name]
  Given [precondition]
  When [action]
  Then [expected outcome]
  And [additional assertion]`,
  });

  // Confirmation dialog
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

  // Load enablers with test information
  const loadEnablers = useCallback(async () => {
    if (!currentWorkspace?.projectFolder) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${INTEGRATION_URL}/enabler-files`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workspacePath: currentWorkspace.projectFolder }),
      });

      if (!response.ok) {
        throw new Error('Failed to load enablers');
      }

      const data = await response.json();

      // Transform to EnablerWithTests
      const enablersWithTests: EnablerWithTests[] = (data.enablers || []).map((e: Record<string, unknown>) => ({
        id: e.enablerId as string || '',
        name: e.name as string || 'Unnamed Enabler',
        filename: e.filename as string || '',
        path: e.path as string || '',
        capabilityId: e.capabilityId as string || '',
        requirementCount: 0, // Would need to parse from file
        testSuiteId: undefined,
        scenarioCount: 0,
        passedCount: 0,
        failedCount: 0,
        coverage: 0,
      }));

      setEnablers(enablersWithTests);

      // Calculate mock coverage metrics
      setCoverageMetrics({
        totalRequirements: enablersWithTests.length * 3, // Estimate
        requirementsWithTests: Math.floor(enablersWithTests.length * 2),
        requirementCoverage: 67,
        totalScenarios: enablersWithTests.length * 2,
        passedScenarios: Math.floor(enablersWithTests.length * 1.5),
        failedScenarios: Math.floor(enablersWithTests.length * 0.3),
        blockedScenarios: Math.floor(enablersWithTests.length * 0.2),
        scenarioPassRate: 75,
        criticalPassRate: 100,
        automationRate: 45,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load enablers');
    } finally {
      setIsLoading(false);
    }
  }, [currentWorkspace?.projectFolder]);

  // Load enablers on mount
  useEffect(() => {
    loadEnablers();
  }, [loadEnablers]);

  // Generate unique ID
  const generateId = () => {
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${timestamp}${random}`;
  };

  // Handle enabler selection
  const handleEnablerSelect = (enabler: EnablerWithTests) => {
    setSelectedEnabler(enabler);

    // Load or create test suite for this enabler
    const suiteId = `TST-${enabler.id.replace('ENB-', '')}`;
    setTestSuite({
      id: suiteId,
      name: `${enabler.name} Tests`,
      enablerId: enabler.id,
      scenarios: [],
      status: 'not_started',
      coverage: enabler.coverage,
    });

    // Load scenarios (would come from backend in production)
    setScenarios([]);
    setSelectedScenario(null);
  };

  // Handle scenario form submission
  const handleScenarioSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEnabler || !testSuite) return;

    const scenarioId = editingScenario?.id || `TS-${generateId()}`;

    const newScenario: TestScenario = {
      id: scenarioId,
      name: scenarioForm.name,
      feature: scenarioForm.feature || testSuite.name,
      enablerId: selectedEnabler.id,
      enablerName: selectedEnabler.name,
      requirementIds: scenarioForm.requirementIds.split(',').map(s => s.trim()).filter(Boolean),
      priority: scenarioForm.priority,
      status: 'draft',
      automation: scenarioForm.automation,
      tags: scenarioForm.tags.split(',').map(s => s.trim()).filter(Boolean),
      gherkin: scenarioForm.gherkin.replace('@TS-XXXXXX', `@${scenarioId}`),
    };

    if (editingScenario) {
      setScenarios(prev => prev.map(s => s.id === editingScenario.id ? newScenario : s));
      setSuccessMessage('Test scenario updated successfully');
    } else {
      setScenarios(prev => [...prev, newScenario]);
      setSuccessMessage('Test scenario created successfully');
    }

    resetScenarioForm();
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Reset scenario form
  const resetScenarioForm = () => {
    setShowScenarioForm(false);
    setEditingScenario(null);
    setScenarioForm({
      name: '',
      feature: '',
      requirementIds: '',
      priority: 'medium',
      automation: 'pending',
      tags: '',
      gherkin: `@TS-XXXXXX @FR-XXXXXX
Scenario: [Scenario Name]
  Given [precondition]
  When [action]
  Then [expected outcome]
  And [additional assertion]`,
    });
  };

  // Edit scenario
  const handleEditScenario = (scenario: TestScenario) => {
    setEditingScenario(scenario);
    setScenarioForm({
      name: scenario.name,
      feature: scenario.feature,
      requirementIds: scenario.requirementIds.join(', '),
      priority: scenario.priority,
      automation: scenario.automation,
      tags: scenario.tags.join(', '),
      gherkin: scenario.gherkin,
    });
    setShowScenarioForm(true);
  };

  // Delete scenario
  const handleDeleteScenario = (scenario: TestScenario) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Test Scenario',
      message: `Are you sure you want to delete "${scenario.name}"? This action cannot be undone.`,
      confirmLabel: 'Delete',
      confirmVariant: 'danger',
      onConfirm: () => {
        setScenarios(prev => prev.filter(s => s.id !== scenario.id));
        if (selectedScenario?.id === scenario.id) {
          setSelectedScenario(null);
        }
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        setSuccessMessage('Test scenario deleted successfully');
        setTimeout(() => setSuccessMessage(null), 3000);
      },
    });
  };

  // Run scenario (mock)
  const handleRunScenario = (scenario: TestScenario) => {
    // Simulate test execution
    const results: TestScenario['status'][] = ['passed', 'failed', 'blocked'];
    const randomResult = results[Math.floor(Math.random() * 3)];

    setScenarios(prev => prev.map(s =>
      s.id === scenario.id
        ? { ...s, status: randomResult, lastExecuted: new Date().toISOString(), executionTime: Math.random() * 5000 }
        : s
    ));

    setSuccessMessage(`Test "${scenario.name}" completed with result: ${randomResult.toUpperCase()}`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Get status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'passed': return '#22c55e';
      case 'failed': return '#ef4444';
      case 'blocked': return '#f59e0b';
      case 'ready': return '#3b82f6';
      case 'draft': return '#6b7280';
      default: return '#6b7280';
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'critical': return '#dc2626';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  return (
    <div className="testing-page">
      <style>{`
        .testing-page {
          padding: 0;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-title {
          font-size: 24px;
          font-weight: 600;
          color: var(--color-grey-900);
        }

        .page-subtitle {
          font-size: 14px;
          color: var(--color-grey-600);
          margin-top: 4px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .metric-card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          border: 1px solid var(--color-grey-200);
        }

        .metric-label {
          font-size: 12px;
          color: var(--color-grey-600);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .metric-value {
          font-size: 28px;
          font-weight: 700;
          color: var(--color-grey-900);
          margin-top: 4px;
        }

        .metric-value.success { color: #22c55e; }
        .metric-value.warning { color: #f59e0b; }
        .metric-value.danger { color: #ef4444; }

        .main-content {
          display: grid;
          grid-template-columns: 300px 1fr 400px;
          gap: 24px;
          min-height: 600px;
        }

        @media (max-width: 1200px) {
          .main-content {
            grid-template-columns: 1fr;
          }
        }

        .panel {
          background: white;
          border-radius: 8px;
          border: 1px solid var(--color-grey-200);
          overflow: hidden;
        }

        .panel-header {
          padding: 16px;
          border-bottom: 1px solid var(--color-grey-200);
          background: var(--color-grey-50);
        }

        .panel-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-grey-800);
        }

        .panel-content {
          padding: 16px;
          max-height: 500px;
          overflow-y: auto;
        }

        .enabler-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .enabler-item {
          padding: 12px;
          border-radius: 6px;
          border: 1px solid var(--color-grey-200);
          cursor: pointer;
          transition: all 0.2s;
        }

        .enabler-item:hover {
          border-color: var(--color-primary);
          background: var(--color-primary-50);
        }

        .enabler-item.selected {
          border-color: var(--color-primary);
          background: var(--color-primary-100);
        }

        .enabler-name {
          font-weight: 500;
          color: var(--color-grey-900);
          font-size: 14px;
        }

        .enabler-meta {
          display: flex;
          gap: 8px;
          margin-top: 4px;
          font-size: 12px;
          color: var(--color-grey-600);
        }

        .scenario-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .scenario-item {
          padding: 12px;
          border-radius: 6px;
          border: 1px solid var(--color-grey-200);
          cursor: pointer;
          transition: all 0.2s;
        }

        .scenario-item:hover {
          border-color: var(--color-primary);
        }

        .scenario-item.selected {
          border-color: var(--color-primary);
          background: var(--color-primary-50);
        }

        .scenario-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .scenario-name {
          font-weight: 500;
          color: var(--color-grey-900);
          font-size: 14px;
        }

        .scenario-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 8px;
        }

        .tag {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }

        .tag.status {
          color: white;
        }

        .tag.priority {
          background: var(--color-grey-100);
        }

        .tag.requirement {
          background: var(--color-blue-100);
          color: var(--color-blue-800);
        }

        .gherkin-preview {
          margin-top: 12px;
          padding: 12px;
          background: #1e1e1e;
          border-radius: 6px;
          overflow-x: auto;
        }

        .gherkin-preview pre {
          margin: 0;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 12px;
          line-height: 1.6;
          color: #d4d4d4;
          white-space: pre-wrap;
        }

        .gherkin-keyword {
          color: #569cd6;
          font-weight: bold;
        }

        .gherkin-tag {
          color: #4ec9b0;
        }

        .gherkin-string {
          color: #ce9178;
        }

        .gherkin-comment {
          color: #6a9955;
        }

        .scenario-detail-panel {
          position: sticky;
          top: 24px;
        }

        .detail-section {
          margin-bottom: 16px;
        }

        .detail-label {
          font-size: 12px;
          color: var(--color-grey-600);
          margin-bottom: 4px;
        }

        .detail-value {
          font-size: 14px;
          color: var(--color-grey-900);
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }

        .form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .form-modal {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .form-header {
          padding: 20px 24px;
          border-bottom: 1px solid var(--color-grey-200);
        }

        .form-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--color-grey-900);
        }

        .form-body {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: var(--color-grey-700);
          margin-bottom: 6px;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--color-grey-300);
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.2s;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-100);
        }

        .form-textarea {
          min-height: 200px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          resize: vertical;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--color-grey-200);
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: var(--color-grey-500);
        }

        .empty-state-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
      `}</style>

      <div className="page-header">
        <div>
          <h1 className="page-title">Testing (BDD/Gherkin)</h1>
          <p className="page-subtitle">
            Create and manage Gherkin test scenarios for your enablers
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="error" onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" onDismiss={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      {/* Coverage Metrics */}
      {coverageMetrics && (
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-label">Requirement Coverage</div>
            <div className={`metric-value ${coverageMetrics.requirementCoverage >= 80 ? 'success' : coverageMetrics.requirementCoverage >= 50 ? 'warning' : 'danger'}`}>
              {coverageMetrics.requirementCoverage}%
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Scenario Pass Rate</div>
            <div className={`metric-value ${coverageMetrics.scenarioPassRate >= 80 ? 'success' : coverageMetrics.scenarioPassRate >= 50 ? 'warning' : 'danger'}`}>
              {coverageMetrics.scenarioPassRate}%
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Critical Pass Rate</div>
            <div className={`metric-value ${coverageMetrics.criticalPassRate === 100 ? 'success' : 'danger'}`}>
              {coverageMetrics.criticalPassRate}%
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Automation Rate</div>
            <div className={`metric-value ${coverageMetrics.automationRate >= 70 ? 'success' : coverageMetrics.automationRate >= 40 ? 'warning' : 'danger'}`}>
              {coverageMetrics.automationRate}%
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Enabler List */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Enablers</div>
          </div>
          <div className="panel-content">
            {isLoading ? (
              <div className="empty-state">Loading enablers...</div>
            ) : enablers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">-</div>
                <p>No enablers found in workspace</p>
              </div>
            ) : (
              <div className="enabler-list">
                {enablers.map(enabler => (
                  <div
                    key={enabler.id}
                    className={`enabler-item ${selectedEnabler?.id === enabler.id ? 'selected' : ''}`}
                    onClick={() => handleEnablerSelect(enabler)}
                  >
                    <div className="enabler-name">{enabler.name}</div>
                    <div className="enabler-meta">
                      <span>{enabler.id}</span>
                      <span>|</span>
                      <span>{enabler.scenarioCount} tests</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scenario List */}
        <div className="panel">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="panel-title">
              {testSuite ? `Test Suite: ${testSuite.name}` : 'Test Scenarios'}
            </div>
            {selectedEnabler && (
              <Button
                variant="primary"
                size="small"
                onClick={() => setShowScenarioForm(true)}
              >
                + Add Scenario
              </Button>
            )}
          </div>
          <div className="panel-content">
            {!selectedEnabler ? (
              <div className="empty-state">
                <div className="empty-state-icon">-</div>
                <p>Select an enabler to view test scenarios</p>
              </div>
            ) : scenarios.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">-</div>
                <p>No test scenarios yet</p>
                <p style={{ marginTop: 8, fontSize: 14 }}>
                  Click "Add Scenario" to create your first Gherkin test
                </p>
              </div>
            ) : (
              <div className="scenario-list">
                {scenarios.map(scenario => (
                  <div
                    key={scenario.id}
                    className={`scenario-item ${selectedScenario?.id === scenario.id ? 'selected' : ''}`}
                    onClick={() => setSelectedScenario(scenario)}
                  >
                    <div className="scenario-header">
                      <div className="scenario-name">{scenario.name}</div>
                      <span
                        className="tag status"
                        style={{ backgroundColor: getStatusColor(scenario.status) }}
                      >
                        {scenario.status}
                      </span>
                    </div>
                    <div className="scenario-tags">
                      <span
                        className="tag priority"
                        style={{ color: getPriorityColor(scenario.priority) }}
                      >
                        {scenario.priority}
                      </span>
                      {scenario.requirementIds.map(reqId => (
                        <span key={reqId} className="tag requirement">{reqId}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scenario Detail */}
        <div className="panel scenario-detail-panel">
          <div className="panel-header">
            <div className="panel-title">Scenario Details</div>
          </div>
          <div className="panel-content">
            {!selectedScenario ? (
              <div className="empty-state">
                <div className="empty-state-icon">-</div>
                <p>Select a scenario to view details</p>
              </div>
            ) : (
              <>
                <div className="detail-section">
                  <div className="detail-label">Scenario ID</div>
                  <div className="detail-value">{selectedScenario.id}</div>
                </div>

                <div className="detail-section">
                  <div className="detail-label">Feature</div>
                  <div className="detail-value">{selectedScenario.feature}</div>
                </div>

                <div className="detail-section">
                  <div className="detail-label">Linked Requirements</div>
                  <div className="scenario-tags" style={{ marginTop: 4 }}>
                    {selectedScenario.requirementIds.map(reqId => (
                      <span key={reqId} className="tag requirement">{reqId}</span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <div className="detail-label">Gherkin</div>
                  <div className="gherkin-preview">
                    <pre dangerouslySetInnerHTML={{
                      __html: selectedScenario.gherkin
                        .replace(/(@\S+)/g, '<span class="gherkin-tag">$1</span>')
                        .replace(/(Feature:|Scenario:|Scenario Outline:|Background:|Examples:)/g, '<span class="gherkin-keyword">$1</span>')
                        .replace(/(Given|When|Then|And|But)/g, '<span class="gherkin-keyword">$1</span>')
                        .replace(/"([^"]*)"/g, '<span class="gherkin-string">"$1"</span>')
                    }} />
                  </div>
                </div>

                {selectedScenario.lastExecuted && (
                  <div className="detail-section">
                    <div className="detail-label">Last Executed</div>
                    <div className="detail-value">
                      {new Date(selectedScenario.lastExecuted).toLocaleString()}
                      {selectedScenario.executionTime && (
                        <span style={{ marginLeft: 8, color: 'var(--color-grey-500)' }}>
                          ({(selectedScenario.executionTime / 1000).toFixed(2)}s)
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="action-buttons">
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => handleRunScenario(selectedScenario)}
                  >
                    Run Test
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => handleEditScenario(selectedScenario)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDeleteScenario(selectedScenario)}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scenario Form Modal */}
      {showScenarioForm && (
        <div className="form-overlay" onClick={(e) => e.target === e.currentTarget && resetScenarioForm()}>
          <div className="form-modal">
            <div className="form-header">
              <h2 className="form-title">
                {editingScenario ? 'Edit Test Scenario' : 'Create Test Scenario'}
              </h2>
            </div>
            <form onSubmit={handleScenarioSubmit}>
              <div className="form-body">
                <div className="form-group">
                  <label className="form-label">Scenario Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={scenarioForm.name}
                    onChange={(e) => setScenarioForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Successful login with valid credentials"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      value={scenarioForm.priority}
                      onChange={(e) => setScenarioForm(prev => ({ ...prev, priority: e.target.value as TestScenario['priority'] }))}
                    >
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Automation Status</label>
                    <select
                      className="form-select"
                      value={scenarioForm.automation}
                      onChange={(e) => setScenarioForm(prev => ({ ...prev, automation: e.target.value as TestScenario['automation'] }))}
                    >
                      <option value="pending">Pending</option>
                      <option value="automated">Automated</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Linked Requirements (comma-separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={scenarioForm.requirementIds}
                    onChange={(e) => setScenarioForm(prev => ({ ...prev, requirementIds: e.target.value }))}
                    placeholder="e.g., FR-123456, FR-789012"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tags (comma-separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={scenarioForm.tags}
                    onChange={(e) => setScenarioForm(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="e.g., smoke, regression, critical"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Gherkin Scenario *</label>
                  <textarea
                    className="form-textarea"
                    value={scenarioForm.gherkin}
                    onChange={(e) => setScenarioForm(prev => ({ ...prev, gherkin: e.target.value }))}
                    placeholder="Write your Gherkin scenario here..."
                    required
                  />
                </div>
              </div>
              <div className="form-footer">
                <Button variant="secondary" type="button" onClick={resetScenarioForm}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editingScenario ? 'Update Scenario' : 'Create Scenario'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        confirmVariant={confirmDialog.confirmVariant}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default Testing;
