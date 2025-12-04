import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const GoogleCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const { handleGoogleCallback } = useAuth();
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent multiple processing
    if (hasProcessed.current) {
      return;
    }

    const processCallback = async () => {
      hasProcessed.current = true;

      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setError(`Authentication failed: ${errorParam}`);
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      if (!code || !state) {
        setError('Missing authentication parameters');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      try {
        await handleGoogleCallback(code, state);
        // Redirect to home page on success
        navigate('/');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    processCallback();
  }, [searchParams, handleGoogleCallback, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="card w-full max-w-md mx-4">
        <div className="p-6">
          {error ? (
            <div>
              <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h3 className="text-grey-900 text-center text-2xl font-semibold">
                  Authentication Failed
                </h3>
              </div>
              <p className="text-red-600 text-center mb-4">{error}</p>
              <p className="text-sm text-grey-500 text-center">
                Redirecting to login page...
              </p>
            </div>
          ) : (
            <div>
              <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <svg
                    className="w-10 h-10 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-grey-900 text-center text-2xl font-semibold">
                  Completing Sign In
                </h3>
              </div>
              <p className="text-sm text-grey-500 text-center">
                Please wait while we complete your Google authentication...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
