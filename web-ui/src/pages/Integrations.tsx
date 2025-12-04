import React, { useState } from 'react';
import { Card, Alert, Button, AIPresetIndicator } from '../components';
import axios from 'axios';

interface IntegrationConfig {
  name: string;
  providerURL: string;
  description: string;
  status: 'active' | 'inactive';
  service?: string;
}

interface IntegrationAnalysis {
  integration_name: string;
  description: string;
  auth_method: string;
  required_fields: ConfigField[];
  optional_fields: ConfigField[];
  capabilities: string[];
  sample_endpoints: Record<string, string>;
}

interface ConfigField {
  name: string;
  type: string;
  description: string;
  example?: string;
  required: boolean;
}

const INTEGRATIONS: IntegrationConfig[] = [
  {
    name: 'Figma API',
    providerURL: 'https://www.figma.com/developers/api',
    description: 'Connected to Figma API for design file synchronization.',
    status: 'active',
    service: 'integration-service:8080'
  },
  {
    name: 'Jira',
    providerURL: 'https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/',
    description: 'Track issues and project management.',
    status: 'inactive'
  },
  {
    name: 'GitHub',
    providerURL: 'https://docs.github.com/en/rest',
    description: 'Code repository integration.',
    status: 'inactive'
  }
];

export const Integrations: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<IntegrationAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationConfig | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [providerURL, setProviderURL] = useState('');
  const [showURLInput, setShowURLInput] = useState(false);

  const handleConfigure = async (integration: IntegrationConfig) => {
    setSelectedIntegration(integration);
    setError(null);
    setShowConfigModal(true);

    // Check if configuration already exists
    const configKey = `integration_config_${integration.name.toLowerCase().replace(/\s+/g, '_')}`;
    const existingConfig = localStorage.getItem(configKey);

    if (existingConfig) {
      // Load existing configuration
      try {
        const config = JSON.parse(existingConfig);

        // If no provider_url in saved config (old format), use default and migrate
        if (!config.provider_url) {
          console.warn('Found old configuration format without provider_url, migrating...');
          setProviderURL(integration.providerURL);
          setFormValues(config.fields || {});

          // Update the stored config with the provider_url
          const updatedConfig = {
            ...config,
            provider_url: integration.providerURL
          };
          localStorage.setItem(configKey, JSON.stringify(updatedConfig));

          // Trigger re-analysis with the default provider URL
          await analyzeIntegration(integration.providerURL, integration.name);
        } else {
          // Normal flow with provider_url present
          setProviderURL(config.provider_url);
          setFormValues(config.fields || {});

          // Check if analysis is cached
          const cacheKey = `integration_analysis_${config.provider_url}`;
          const cachedAnalysis = localStorage.getItem(cacheKey);

          if (cachedAnalysis) {
            setAnalysis(JSON.parse(cachedAnalysis));
          } else {
            // Re-analyze
            await analyzeIntegration(config.provider_url, integration.name);
          }
        }
      } catch (err) {
        console.error('Failed to load existing configuration:', err);
        setShowURLInput(true);
        setProviderURL(integration.providerURL);
      }
    } else {
      // No existing configuration, ask for URL
      setShowURLInput(true);
      setProviderURL(integration.providerURL);
    }
  };

  const analyzeIntegration = async (url: string, name: string) => {
    setAnalyzing(true);
    setError(null);

    try {
      // Get Anthropic API key from localStorage
      const anthropicKey = localStorage.getItem('anthropic_api_key');

      if (!anthropicKey) {
        throw new Error('Anthropic API key not found. Please add it in Settings.');
      }

      // Check cache first
      const cacheKey = `integration_analysis_${url}`;
      const cachedAnalysis = localStorage.getItem(cacheKey);

      if (cachedAnalysis) {
        setAnalysis(JSON.parse(cachedAnalysis));
        setShowURLInput(false);
        return;
      }

      // Call the integration analysis endpoint
      const response = await axios.post('http://localhost:9080/analyze-integration', {
        provider_url: url,
        provider_name: name,
        anthropic_key: anthropicKey
      });

      // Cache the analysis
      localStorage.setItem(cacheKey, JSON.stringify(response.data));

      setAnalysis(response.data);
      setShowURLInput(false);
    } catch (err: any) {
      setError(err.response?.data || err.message || 'Failed to analyze integration');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleAnalyzeClick = () => {
    if (!providerURL) {
      setError('Please enter a provider URL');
      return;
    }
    analyzeIntegration(providerURL, selectedIntegration?.name || '');
  };

  const handleSaveConfiguration = async () => {
    if (!selectedIntegration || !analysis) return;

    setSaving(true);
    setError(null);

    try {
      // Validate required fields
      const missingFields = analysis.required_fields.filter(
        field => !formValues[field.name] || formValues[field.name].trim() === ''
      );

      if (missingFields.length > 0) {
        throw new Error(`Please fill in required fields: ${missingFields.map(f => f.name).join(', ')}`);
      }

      // Save configuration to localStorage
      const configKey = `integration_config_${selectedIntegration.name.toLowerCase().replace(/\s+/g, '_')}`;
      const configData = {
        integration_name: selectedIntegration.name,
        provider_url: providerURL,
        configured_at: new Date().toISOString(),
        auth_method: analysis.auth_method,
        fields: formValues,
      };

      localStorage.setItem(configKey, JSON.stringify(configData));

      // Show success message
      setSaveSuccess(true);

      // Close modal after 1.5 seconds
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  const closeModal = () => {
    setShowConfigModal(false);
    setAnalysis(null);
    setError(null);
    setSelectedIntegration(null);
    setFormValues({});
    setSaving(false);
    setSaveSuccess(false);
    setProviderURL('');
    setShowURLInput(false);
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto" style={{ padding: '16px' }}>
      <AIPresetIndicator />
      <div style={{ marginBottom: 'var(--spacing-6, 24px)' }}>
        {/* Apple HIG Large Title */}
        <h1 className="text-large-title" style={{ marginBottom: '8px' }}>External Integrations</h1>
        <p className="text-body text-secondary" style={{ marginBottom: '16px' }}>Manage connections to external design tools and services.</p>

        <Alert type="success" style={{ marginBottom: '24px' }}>
          <strong>Success:</strong> Figma integration is active and connected.
        </Alert>

        {/* Apple HIG Title 2 */}
        <h3 className="text-title2" style={{ marginBottom: '16px' }}>Available Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--spacing-4, 16px)' }}>
          {INTEGRATIONS.map((integration) => (
            <Card key={integration.name}>
              <h3 className="text-headline" style={{ marginBottom: '8px' }}>{integration.name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '20px',
                  backgroundColor: integration.status === 'active'
                    ? 'rgba(76, 217, 100, 0.1)'
                    : 'rgba(142, 142, 147, 0.1)',
                  color: integration.status === 'active'
                    ? 'var(--color-systemGreen)'
                    : 'var(--color-grey-500)',
                  width: 'fit-content'
                }}>
                  {integration.status === 'active' ? 'Active' : 'Inactive'}
                </span>
                <p className="text-footnote text-secondary">
                  {integration.description}
                </p>
                {integration.service && (
                  <p className="text-footnote text-secondary">
                    <strong>Service:</strong> {integration.service}
                  </p>
                )}
                <Button
                  variant="secondary"
                  style={{ marginTop: '8px' }}
                  onClick={() => handleConfigure(integration)}
                >
                  Configure
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Configuration Modal */}
        {showConfigModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
              padding: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 className="text-title2">Configure {selectedIntegration?.name}</h2>
                <button
                  onClick={closeModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: 'var(--color-grey-500)'
                  }}
                >
                  ×
                </button>
              </div>

              {showURLInput && !analyzing && !analysis && (
                <div>
                  <p className="text-body" style={{ marginBottom: '16px' }}>
                    Please enter the URL of your {selectedIntegration?.name} instance or the API documentation page.
                  </p>
                  <div style={{ marginBottom: '16px' }}>
                    <label className="text-body" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                      Provider URL
                    </label>
                    <input
                      type="url"
                      value={providerURL}
                      onChange={(e) => setProviderURL(e.target.value)}
                      placeholder="https://api.example.com or https://example.com"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid var(--color-grey-300)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        marginBottom: '12px'
                      }}
                    />
                    <p className="text-footnote text-secondary">
                      Claude will analyze this URL to determine what configuration is needed.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="primary" onClick={handleAnalyzeClick} style={{ flex: 1 }}>
                      Analyze Integration
                    </Button>
                    <Button variant="outline" onClick={closeModal}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {analyzing && (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    border: '4px solid var(--color-grey-200)',
                    borderTop: '4px solid var(--color-blue-500)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 16px'
                  }} />
                  <p className="text-body">Analyzing {selectedIntegration?.name} API...</p>
                  <p className="text-footnote text-secondary" style={{ marginTop: '8px' }}>
                    Claude is examining the API documentation to determine configuration requirements.
                  </p>
                </div>
              )}

              {error && !showURLInput && (
                <Alert type="error" style={{ marginBottom: '20px' }}>
                  <strong>Error:</strong> {error}
                </Alert>
              )}

              {error && showURLInput && (
                <Alert type="error" style={{ marginBottom: '16px' }}>
                  <strong>Error:</strong> {error}
                </Alert>
              )}

              {analysis && !analyzing && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h3 className="text-headline" style={{ marginBottom: '8px' }}>Integration Details</h3>
                    <p className="text-body text-secondary" style={{ marginBottom: '16px' }}>
                      {analysis.description}
                    </p>

                    <div style={{
                      padding: '12px',
                      backgroundColor: 'var(--color-blue-50)',
                      borderRadius: '8px',
                      marginBottom: '16px'
                    }}>
                      <p className="text-footnote"><strong>Authentication Method:</strong> {analysis.auth_method}</p>
                    </div>

                    {analysis.capabilities.length > 0 && (
                      <div style={{ marginBottom: '16px' }}>
                        <h4 className="text-subheadline" style={{ marginBottom: '8px' }}>Capabilities</h4>
                        <ul style={{ paddingLeft: '20px' }}>
                          {analysis.capabilities.map((cap, idx) => (
                            <li key={idx} className="text-footnote text-secondary">{cap}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-headline" style={{ marginBottom: '16px' }}>Configuration</h3>

                    {saveSuccess && (
                      <Alert type="success" style={{ marginBottom: '20px' }}>
                        <strong>Success!</strong> Configuration saved successfully. Closing...
                      </Alert>
                    )}

                    {analysis.required_fields.length > 0 && (
                      <div style={{ marginBottom: '20px' }}>
                        <h4 className="text-subheadline" style={{ marginBottom: '12px' }}>Required Fields</h4>
                        {analysis.required_fields.map((field, idx) => (
                          <div key={idx} style={{ marginBottom: '16px' }}>
                            <label className="text-body" style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>
                              {field.name}
                            </label>
                            <p className="text-footnote text-secondary" style={{ marginBottom: '8px' }}>
                              {field.description}
                            </p>
                            <input
                              type={field.type === 'password' ? 'password' : 'text'}
                              placeholder={field.example || `Enter ${field.name}`}
                              value={formValues[field.name] || ''}
                              onChange={(e) => handleFieldChange(field.name, e.target.value)}
                              disabled={saving || saveSuccess}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid var(--color-grey-300)',
                                borderRadius: '8px',
                                fontSize: '14px',
                                opacity: (saving || saveSuccess) ? 0.6 : 1
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {analysis.optional_fields.length > 0 && (
                      <div style={{ marginBottom: '20px' }}>
                        <h4 className="text-subheadline" style={{ marginBottom: '12px' }}>Optional Fields</h4>
                        {analysis.optional_fields.map((field, idx) => (
                          <div key={idx} style={{ marginBottom: '16px' }}>
                            <label className="text-body" style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>
                              {field.name} <span className="text-footnote text-secondary">(Optional)</span>
                            </label>
                            <p className="text-footnote text-secondary" style={{ marginBottom: '8px' }}>
                              {field.description}
                            </p>
                            <input
                              type={field.type === 'password' ? 'password' : 'text'}
                              placeholder={field.example || `Enter ${field.name}`}
                              value={formValues[field.name] || ''}
                              onChange={(e) => handleFieldChange(field.name, e.target.value)}
                              disabled={saving || saveSuccess}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid var(--color-grey-300)',
                                borderRadius: '8px',
                                fontSize: '14px',
                                opacity: (saving || saveSuccess) ? 0.6 : 1
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                      <Button
                        variant="primary"
                        style={{ flex: 1 }}
                        onClick={handleSaveConfiguration}
                        disabled={saving || saveSuccess}
                      >
                        {saving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Configuration'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={closeModal}
                        disabled={saving || saveSuccess}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
