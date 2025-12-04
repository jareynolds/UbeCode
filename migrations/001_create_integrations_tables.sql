-- Create integrations table to store integration configurations
CREATE TABLE IF NOT EXISTS integrations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    integration_name VARCHAR(255) NOT NULL,
    provider_url VARCHAR(500) NOT NULL,
    configured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(user_id, integration_name)
);

-- Create integration_fields table to store configuration field values
CREATE TABLE IF NOT EXISTS integration_fields (
    id SERIAL PRIMARY KEY,
    integration_id INTEGER NOT NULL REFERENCES integrations(id) ON DELETE CASCADE,
    field_name VARCHAR(255) NOT NULL,
    field_value TEXT,
    is_encrypted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(integration_id, field_name)
);

-- Create integration_analysis_cache table to store AI analysis results
CREATE TABLE IF NOT EXISTS integration_analysis_cache (
    id SERIAL PRIMARY KEY,
    provider_url VARCHAR(500) NOT NULL UNIQUE,
    integration_name VARCHAR(255) NOT NULL,
    analysis_data JSONB NOT NULL,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_integrations_user_id ON integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_integration_fields_integration_id ON integration_fields(integration_id);
CREATE INDEX IF NOT EXISTS idx_analysis_cache_provider_url ON integration_analysis_cache(provider_url);
CREATE INDEX IF NOT EXISTS idx_analysis_cache_expires_at ON integration_analysis_cache(expires_at);

-- Comments
COMMENT ON TABLE integrations IS 'Stores user integration configurations';
COMMENT ON TABLE integration_fields IS 'Stores field values for each integration';
COMMENT ON TABLE integration_analysis_cache IS 'Caches AI analysis results to avoid redundant API calls';
