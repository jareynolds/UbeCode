# Workspace Integration Configuration

## Overview

This feature allows users to configure which external resources (Figma files, GitHub repositories, Jira projects, etc.) should be integrated with each workspace. Claude AI helps suggest which resources are most relevant based on the workspace context.

## How It Works

### 1. User Flow

1. **Configure Integration Credentials** (in Integrations page)
   - User adds API keys/tokens for Figma, GitHub, Jira
   - Credentials are saved in localStorage

2. **Open Workspace Settings**
   - User navigates to workspace and opens settings
   - Clicks on "Integrations" tab

3. **Fetch Available Resources**
   - System uses saved credentials to fetch available resources:
     - **Figma**: Projects and files
     - **GitHub**: Repositories
     - **Jira**: Projects and boards

4. **AI Suggests Resources**
   - Claude analyzes workspace name, description, and available resources
   - Suggests which resources are most relevant with confidence scores
   - Provides reasoning for each suggestion

5. **User Selects Resources**
   - User reviews AI suggestions
   - Selects/deselects specific resources to integrate
   - Saves configuration

6. **Resources are Linked**
   - Selected resources are saved to `workspace_integrations` table
   - Resources become available within the workspace

## Backend API Endpoints

### POST /fetch-resources

Fetches available resources from an integration using saved credentials.

**Request:**
```json
{
  "integration_name": "GitHub",
  "credentials": {
    "access_token": "ghp_..."
  },
  "resource_type": "repository" // Optional
}
```

**Response:**
```json
{
  "integration_name": "GitHub",
  "resources": [
    {
      "id": "123456",
      "name": "my-org/my-repo",
      "type": "repository",
      "description": "A cool repository",
      "url": "https://github.com/my-org/my-repo",
      "metadata": {
        "private": false,
        "language": "TypeScript",
        "updated_at": "2025-11-15T..."
      }
    }
  ]
}
```

### POST /suggest-resources

Uses Claude AI to suggest which resources should be integrated.

**Request:**
```json
{
  "workspace_name": "Design System",
  "workspace_description": "Our company design system components",
  "integration_name": "GitHub",
  "resources": [...], // Array of available resources
  "anthropic_key": "sk-ant-..."
}
```

**Response:**
```json
{
  "suggestions": [
    {
      "resource_id": "123456",
      "resource_name": "design-system",
      "reason": "Repository name matches workspace purpose and contains component library",
      "confidence": 0.95
    }
  ],
  "reasoning": "These repositories are most relevant because they contain design system related code and have been recently updated."
}
```

## Database Schema

### workspaces Table

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| user_id | INTEGER | Foreign key to users table |
| name | VARCHAR(255) | Workspace name |
| description | TEXT | Workspace description |
| figma_file_url | VARCHAR(500) | Legacy Figma URL |
| is_shared | BOOLEAN | Whether workspace is shared |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### workspace_integrations Table

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| workspace_id | INTEGER | Foreign key to workspaces table |
| integration_name | VARCHAR(100) | Name of integration (e.g., 'GitHub') |
| resource_type | VARCHAR(100) | Type of resource (e.g., 'repository') |
| resource_id | VARCHAR(255) | External ID from integration |
| resource_name | VARCHAR(500) | Human-readable name |
| resource_metadata | JSONB | Additional data (URL, description, etc.) |
| is_active | BOOLEAN | Whether integration is active |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Integration-Specific Details

### Figma API

**Authentication:** Access Token (X-Figma-Token header)

**Resources:**
- Currently fetches user info
- Note: Figma API requires team_id to list projects/files
- Future enhancement: Add team selection flow

**Limitations:**
- Cannot list all files without team context
- Users should provide file key directly or select team first

### GitHub

**Authentication:** Personal Access Token (Bearer token)

**Resources:**
- Repositories (user's repos, sorted by recent updates)

**API Endpoints Used:**
- `GET /user/repos` - List repositories

**Metadata Captured:**
- Repository name
- Description
- Private/public status
- Primary language
- Last updated date

### Jira

**Authentication:** Basic Auth (email + API token)

**Resources:**
- Projects

**Required Credentials:**
- `email` - Jira account email
- `api_token` - Jira API token
- `domain` - Jira domain (e.g., yourcompany.atlassian.net)

**API Endpoints Used:**
- `GET /rest/api/3/project` - List projects

**Metadata Captured:**
- Project key
- Project name
- Project type
- Description

## Frontend Implementation (Next Steps)

### Workspace Settings UI

Add a new "Integrations" tab in workspace settings with:

1. **Integration List**
   - Show configured integrations (Figma, GitHub, Jira)
   - For each integration, show "Configure Resources" button

2. **Resource Selection Modal**
   - Fetch available resources using saved credentials
   - Show loading state while fetching
   - Display AI suggestions with confidence indicators
   - Allow user to select/deselect resources
   - Show resource details (name, description, URL)
   - Save button to persist selections

3. **Selected Resources Display**
   - Show currently integrated resources
   - Allow removing resources
   - Show resource metadata

### Example React Component Structure

```typescript
interface WorkspaceIntegrationsProps {
  workspace: Workspace;
}

const WorkspaceIntegrations: React.FC<WorkspaceIntegrationsProps> = ({ workspace }) => {
  const [integrations, setIntegrations] = useState([]);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [resources, setResources] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedResources, setSelectedResources] = useState([]);

  const fetchResources = async (integrationName) => {
    // Get saved credentials from localStorage
    const config = localStorage.getItem(`integration_config_${integrationName}`);
    const { fields } = JSON.parse(config);

    // Fetch resources from API
    const response = await axios.post('/fetch-resources', {
      integration_name: integrationName,
      credentials: fields
    });

    setResources(response.data.resources);

    // Get AI suggestions
    const suggestionsResponse = await axios.post('/suggest-resources', {
      workspace_name: workspace.name,
      workspace_description: workspace.description,
      integration_name: integrationName,
      resources: response.data.resources,
      anthropic_key: localStorage.getItem('anthropic_api_key')
    });

    setSuggestions(suggestionsResponse.data.suggestions);
  };

  // ... rest of component
};
```

## Security Considerations

- Credentials are stored in browser localStorage (client-side only)
- Backend does not persist integration credentials
- API tokens are sent to backend only for resource fetching
- Workspace integration mappings are stored in database per user
- Consider implementing server-side credential encryption in future

## Future Enhancements

- [ ] Add server-side credential storage with encryption
- [ ] Implement team selection for Figma
- [ ] Add GitHub branch/PR filtering
- [ ] Add Jira issue filtering by project
- [ ] Cache fetched resources to reduce API calls
- [ ] Add webhook support for real-time updates
- [ ] Support OAuth flows for integrations
- [ ] Add resource sync status indicators
