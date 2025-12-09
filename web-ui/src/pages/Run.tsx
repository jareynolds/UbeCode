import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useWorkspace } from '../context/WorkspaceContext';
import { AIPresetIndicator } from '../components/AIPresetIndicator';
import { UIFrameworkIndicator } from '../components/UIFrameworkIndicator';
import { INTEGRATION_URL } from '../api/client';

interface RunStep {
  step: number;
  description: string;
  command?: string;
  status: 'pending' | 'running' | 'completed' | 'error';
}

export const Run: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [isRunning, setIsRunning] = useState(false);
  const [appUrl, setAppUrl] = useState<string | null>(null);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<RunStep[]>([]);

  const handleRunApp = async () => {
    if (!currentWorkspace?.projectFolder) {
      setError('No workspace configured');
      return;
    }

    setIsRunning(true);
    setAppUrl(null);
    setError(null);
    setProjectType(null);

    // Initialize steps
    setSteps([
      { step: 1, description: 'Detecting project type...', status: 'running' },
      { step: 2, description: 'Installing dependencies', status: 'pending' },
      { step: 3, description: 'Starting application', status: 'pending' },
    ]);

    try {
      const response = await fetch(`${INTEGRATION_URL}/run-app`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workspacePath: currentWorkspace.projectFolder,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setSteps(prev => prev.map(s =>
          s.status === 'running' ? { ...s, status: 'error' } : s
        ));
        setIsRunning(false);
      } else {
        setAppUrl(data.url);
        setProjectType(data.projectType);

        // Update steps with success
        setSteps([
          {
            step: 1,
            description: `Detected project type: ${data.projectType}`,
            status: 'completed'
          },
          {
            step: 2,
            description: 'Dependencies ready',
            status: 'completed'
          },
          {
            step: 3,
            description: 'Application started',
            command: data.command,
            status: 'completed'
          },
        ]);
      }
    } catch (err) {
      setError(`Failed to start application: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setSteps(prev => prev.map(s =>
        s.status === 'running' ? { ...s, status: 'error' } : s
      ));
      setIsRunning(false);
    }
  };

  const handleStopApp = async () => {
    if (!currentWorkspace?.projectFolder) return;

    try {
      const response = await fetch(`${INTEGRATION_URL}/stop-app`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workspacePath: currentWorkspace.projectFolder,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setIsRunning(false);
        setAppUrl(null);
        setSteps([]);
      }
    } catch (err) {
      setError(`Failed to stop application: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="page-container" style={{ padding: '16px' }}>
      <AIPresetIndicator />
      <UIFrameworkIndicator />

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

      <div className="page-header">
        <h1 className="page-title">Run Application</h1>
        <p className="page-subtitle">
          Start and test your generated application
        </p>
      </div>

      {/* Summary Section */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">
              {currentWorkspace?.projectFolder
                ? `${currentWorkspace.projectFolder}/code`
                : 'No project folder configured'}
            </p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
          <h4 className="font-medium mb-2">How it works</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The Run command will automatically detect your project type (Node.js, Go, Python, etc.),
            install any necessary dependencies, and start a development server. You'll then be able
            to access your application in a browser.
          </p>
        </div>

        {/* Run/Stop Button */}
        <div className="flex gap-4">
          {!isRunning ? (
            <Button
              onClick={handleRunApp}
              disabled={!currentWorkspace?.projectFolder}
              className="bg-green-600 hover:bg-green-700 px-8"
            >
              ▶ Run Application
            </Button>
          ) : (
            <Button
              onClick={handleStopApp}
              className="bg-red-600 hover:bg-red-700 px-8"
            >
              ■ Stop Application
            </Button>
          )}
        </div>
      </Card>

      {/* Steps Section */}
      {steps.length > 0 && (
        <Card className="mb-6">
          <h3 className="font-semibold mb-4">Execution Steps</h3>
          <div className="space-y-3">
            {steps.map((step) => (
              <div
                key={step.step}
                className={`p-3 rounded-lg border ${
                  step.status === 'completed'
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : step.status === 'error'
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    : step.status === 'running'
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-lg ${
                    step.status === 'completed' ? 'text-green-500' :
                    step.status === 'error' ? 'text-red-500' :
                    step.status === 'running' ? 'text-blue-500' :
                    'text-gray-400'
                  }`}>
                    {step.status === 'completed' ? '✓' :
                     step.status === 'error' ? '✗' :
                     step.status === 'running' ? '◌' :
                     '○'}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{step.description}</p>
                    {step.command && (
                      <code className="text-xs text-gray-500 dark:text-gray-400 mt-1 block font-mono">
                        $ {step.command}
                      </code>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Error Section */}
      {error && (
        <Card className="mb-6 border-red-500">
          <h3 className="font-semibold mb-2 text-red-500">Error</h3>
          <p className="text-red-500 text-sm">{error}</p>
        </Card>
      )}

      {/* Access Section */}
      {appUrl && (
        <Card className="mb-6 border-green-500">
          <h3 className="font-semibold mb-4 text-green-600 dark:text-green-400">
            Application Running
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Your {projectType} application is now running. Access it at:
              </p>
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 bg-green-100 dark:bg-green-900/30 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
              >
                <span className="text-2xl">🌐</span>
                <span className="font-mono text-lg text-green-700 dark:text-green-300">
                  {appUrl}
                </span>
              </a>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-sm mb-2">Quick Actions</h4>
              <div className="flex gap-2">
                <Button
                  onClick={() => window.open(appUrl, '_blank')}
                  variant="outline"
                  className="text-sm"
                >
                  Open in Browser
                </Button>
                <Button
                  onClick={() => navigator.clipboard.writeText(appUrl)}
                  variant="outline"
                  className="text-sm"
                >
                  Copy URL
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* No Workspace Warning */}
      {!currentWorkspace && (
        <Card>
          <p className="text-gray-500">
            Please select a workspace to run the application.
          </p>
        </Card>
      )}
    </div>
  );
};
