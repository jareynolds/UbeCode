import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

// Base URLs for microservices
const BASE_URLS = {
  integration: import.meta.env.VITE_INTEGRATION_SERVICE_URL || 'http://localhost:9080',
  design: import.meta.env.VITE_DESIGN_SERVICE_URL || 'http://localhost:8081',
  capability: import.meta.env.VITE_CAPABILITY_SERVICE_URL || 'http://localhost:8082',
  auth: import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:8083',
};

// Create axios instances for each service
const createClient = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const integrationClient = createClient(BASE_URLS.integration);
export const designClient = createClient(BASE_URLS.design);
export const capabilityClient = createClient(BASE_URLS.capability);
export const authClient = createClient(BASE_URLS.auth);

// Add authorization token to all requests if available
// Use sessionStorage for tab-specific authentication (allows multiple users in different tabs)
[integrationClient, designClient, capabilityClient, authClient].forEach((client) => {
  client.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
});

// Generic request wrapper with error handling
export async function apiRequest<T>(
  client: AxiosInstance,
  config: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await client.request<T>(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || error.message || 'An error occurred'
      );
    }
    throw error;
  }
}
