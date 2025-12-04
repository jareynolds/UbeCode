import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext';

const presetNames = [
  '',
  'Level 1: Awareness (Advisory)',
  'Level 2: Guided Recommendations (Suggested)',
  'Level 3: Enforced with Warnings (Controlled)',
  'Level 4: Strict Enforcement (Mandatory)',
  'Level 5: Zero-Tolerance Termination (Absolute)',
];

const presetColors = [
  '',
  'bg-green-50 text-green-700 border-green-200',
  'bg-blue-50 text-blue-700 border-blue-200',
  'bg-yellow-50 text-yellow-700 border-yellow-200',
  'bg-orange-50 text-orange-700 border-orange-200',
  'bg-red-50 text-red-700 border-red-200',
];

const frameworkNames: Record<string, string> = {
  'darkblue': 'Dark Blue (Default)',
  'material': 'Material Design',
  'bootstrap': 'Bootstrap 5',
  'tailwind': 'Tailwind CSS',
};

export const AIPresetIndicator: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  const presetNumber = currentWorkspace?.activeAIPreset;
  const presetName = presetNumber ? (presetNames[presetNumber] || 'Unknown Preset') : null;
  const colorClasses = presetNumber ? (presetColors[presetNumber] || 'bg-grey-50 text-grey-700 border-grey-200') : '';

  const frameworkId = currentWorkspace?.selectedUIFramework || 'bootstrap';
  // Check custom frameworks first
  const customFramework = currentWorkspace?.customUIFrameworks?.find(f => f.id === frameworkId);
  const frameworkName = customFramework?.name || frameworkNames[frameworkId] || frameworkId;

  if (!presetNumber && !frameworkId) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {presetNumber && (
        <div className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-medium ${colorClasses}`}>
          <svg
            className="w-3.5 h-3.5 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>AI Preset: {presetName}</span>
        </div>
      )}
      {currentWorkspace && (
        <div className="inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-medium bg-purple-50 text-purple-700 border-purple-200">
          <svg
            className="w-3.5 h-3.5 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
          <span>UI Framework: {frameworkName}</span>
        </div>
      )}
    </div>
  );
};
