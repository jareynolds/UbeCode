-- Create workspaces table
CREATE TABLE IF NOT EXISTS workspaces (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    figma_file_url VARCHAR(500),
    is_shared BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, name)
);

-- Create workspace_integrations table (links workspaces to integration resources)
CREATE TABLE IF NOT EXISTS workspace_integrations (
    id SERIAL PRIMARY KEY,
    workspace_id INTEGER NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    integration_name VARCHAR(100) NOT NULL, -- 'Figma API', 'GitHub', 'Jira'
    resource_type VARCHAR(100) NOT NULL, -- 'figma_project', 'figma_file', 'github_repo', 'jira_project'
    resource_id VARCHAR(255) NOT NULL, -- External ID from the integration
    resource_name VARCHAR(500), -- Human-readable name
    resource_metadata JSONB, -- Additional data (URL, description, etc.)
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(workspace_id, integration_name, resource_type, resource_id)
);

-- Create indexes for better performance
CREATE INDEX idx_workspaces_user_id ON workspaces(user_id);
CREATE INDEX idx_workspaces_is_shared ON workspaces(is_shared);
CREATE INDEX idx_workspace_integrations_workspace_id ON workspace_integrations(workspace_id);
CREATE INDEX idx_workspace_integrations_integration_name ON workspace_integrations(integration_name);
CREATE INDEX idx_workspace_integrations_resource_type ON workspace_integrations(resource_type);

-- Add comments for documentation
COMMENT ON TABLE workspaces IS 'User workspaces for organizing design system work';
COMMENT ON TABLE workspace_integrations IS 'Maps workspace to external integration resources (Figma files, GitHub repos, etc.)';
COMMENT ON COLUMN workspace_integrations.resource_metadata IS 'JSONB field storing additional resource data like URLs, descriptions, parent IDs';
