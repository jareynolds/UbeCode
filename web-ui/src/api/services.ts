import { integrationClient, designClient, capabilityClient, apiRequest } from './client';

// Integration Service API
export const integrationService = {
  async getHealth(): Promise<{ status: string }> {
    return apiRequest(integrationClient, { url: '/health', method: 'GET' });
  },

  async getFigmaFile(fileId: string): Promise<any> {
    return apiRequest(integrationClient, {
      url: `/figma/file/${fileId}`,
      method: 'GET',
    });
  },

  async getFigmaComments(fileId: string): Promise<any> {
    return apiRequest(integrationClient, {
      url: `/figma/comments/${fileId}`,
      method: 'GET',
    });
  },
};

// Design Service API
export const designService = {
  async getHealth(): Promise<{ status: string }> {
    return apiRequest(designClient, { url: '/health', method: 'GET' });
  },

  // Placeholder for future design artifact endpoints
  async getDesigns(): Promise<any[]> {
    return apiRequest(designClient, { url: '/designs', method: 'GET' });
  },
};

// Types for Capability Service
export type CapabilityAsset = {
  id?: number;
  capability_id?: number;
  asset_type: string;
  asset_name: string;
  asset_url: string;
  description: string;
  file_size?: number;
  mime_type?: string;
  created_at?: string;
  created_by?: number;
}

export type Capability = {
  id?: number;
  capability_id: string;
  name: string;
  status: string;
  description: string;
  purpose: string;
  storyboard_reference: string;
  created_at?: string;
  updated_at?: string;
  created_by?: number;
  is_active?: boolean;
  // Approval workflow fields
  workflow_stage?: 'specification' | 'definition' | 'design' | 'execution';
  approval_status?: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'in_progress' | 'completed' | 'blocked' | 'skipped';
}

export type CapabilityWithDetails = Capability & {
  upstream_dependencies: Capability[];
  downstream_dependencies: Capability[];
  assets: CapabilityAsset[];
}

export type CreateCapabilityRequest = {
  capability_id: string;
  name: string;
  status: string;
  description: string;
  purpose: string;
  storyboard_reference: string;
  upstream_dependencies: number[];
  downstream_dependencies: number[];
  assets: CapabilityAsset[];
}

export type UpdateCapabilityRequest = {
  name?: string;
  status?: string;
  description?: string;
  purpose?: string;
  storyboard_reference?: string;
  upstream_dependencies?: number[];
  downstream_dependencies?: number[];
  assets?: CapabilityAsset[];
  is_active?: boolean;
}

// Capability Service API
export const capabilityService = {
  async getHealth(): Promise<{ status: string }> {
    return apiRequest(capabilityClient, { url: '/health', method: 'GET' });
  },

  async getCapabilities(): Promise<{ capabilities: Capability[] }> {
    return apiRequest(capabilityClient, { url: '/capabilities', method: 'GET' });
  },

  async getCapability(id: number): Promise<CapabilityWithDetails> {
    return apiRequest(capabilityClient, { url: `/capabilities/${id}`, method: 'GET' });
  },

  async createCapability(data: CreateCapabilityRequest): Promise<CapabilityWithDetails> {
    return apiRequest(capabilityClient, {
      url: '/capabilities',
      method: 'POST',
      data,
    });
  },

  async updateCapability(id: number, data: UpdateCapabilityRequest): Promise<CapabilityWithDetails> {
    return apiRequest(capabilityClient, {
      url: `/capabilities/${id}`,
      method: 'PUT',
      data,
    });
  },

  async deleteCapability(id: number): Promise<{ message: string }> {
    return apiRequest(capabilityClient, {
      url: `/capabilities/${id}`,
      method: 'DELETE',
    });
  },
};
