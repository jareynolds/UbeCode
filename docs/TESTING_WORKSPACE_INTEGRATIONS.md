# Testing Workspace Integrations Feature

## Overview

This guide explains how to test the new workspace integrations feature that allows you to configure which external resources (Figma files, GitHub repositories, Jira projects) are associated with each workspace.

## Prerequisites

Before testing, ensure you have:

1. ✅ **Configured integrations** - Set up at least one integration (Figma, GitHub, or Jira) in the Integrations page
2. ✅ **Added Anthropic API key** - In Settings page (for AI suggestions)
3. ✅ **Created a workspace** - Have at least one workspace in the Workspaces page
4. ✅ **Backend services running** - Integration service must be running on port 8080

## Step-by-Step Testing Guide

### 1. Configure an Integration (If Not Already Done)

1. Navigate to **Integrations** page
2. Click **Configure** on an integration (e.g., GitHub)
3. Enter provider URL (e.g., `https://docs.github.com/en/rest`)
4. Wait for Claude to analyze the API
5. Fill in your credentials:
   - **GitHub**: Personal access token
   - **Figma**: Access token
   - **Jira**: Email, API token, and domain
6. Click **Save Configuration**

### 2. Open Workspace Integrations

1. Navigate to **Workspaces** page
2. Find a workspace you want to configure
3. Click the **🔗 Integrations** button on the workspace card
4. The Workspace Integrations modal should open

### 3. Select an Integration

1. You'll see cards for Figma API, GitHub, and Jira
2. Configured integrations will show "Click to configure"
3. Unconfigured integrations will be grayed out with "Not configured"
4. Click on a configured integration (e.g., **GitHub**)

### 4. Review AI Suggestions

1. Wait while the system:
   - Fetches available resources from the integration
   - Asks Claude AI to suggest relevant resources
2. You'll see:
   - A loading spinner while fetching
   - A success message showing how many high-confidence resources were pre-selected
   - List of all available resources

### 5. Select Resources

1. Review the resource list - each resource shows:
   - ✅ **Checkbox** for selection
   - **Resource name** (e.g., repository name, project name)
   - **Description** (if available)
   - **AI suggestion badge** (High/Medium/Low Match) if Claude suggested it
   - **💡 Reason** why Claude suggested this resource
   - **Link** to view in the external service

2. **Auto-selected resources**: Resources with confidence ≥ 70% are pre-selected
3. **Manual selection**: Click any resource card to toggle selection
4. **Review suggestions**: Look for the colored badges:
   - 🟢 **Green (High)**: Confidence ≥ 80%
   - 🟠 **Orange (Medium)**: Confidence ≥ 60%
   - ⚪ **Gray (Low)**: Confidence < 60%

### 6. Save Configuration

1. Click **Save X Resources** button at the bottom
2. Wait for "Success! Integration configuration saved"
3. Modal will automatically close after 1.5 seconds

### 7. Verify Saved Configuration

Currently, configurations are saved to localStorage. To verify:

1. Open browser DevTools (F12 or Cmd+Option+I)
2. Go to Console tab
3. Run:
   ```javascript
   JSON.parse(localStorage.getItem('workspace_integrations'))
   ```
4. You should see your workspace ID with the selected resources

## Expected Behavior

### GitHub Integration

**What you'll see:**
- List of your repositories
- Sorted by most recently updated
- Shows: name, description, privacy status, language
- AI suggestions based on workspace name/description matching repo names

**Example AI suggestion:**
- Workspace: "Design System"
- GitHub repo: "company/design-system"
- Reason: "Repository name matches workspace purpose and contains component library"
- Confidence: 0.95 (High Match)

### Figma Integration

**What you'll see:**
- User information
- Note about requiring team_id

**Limitation:**
- Figma API requires team selection to list projects/files
- This is a known limitation documented in the backend

**Future enhancement:**
- Add team selection flow

### Jira Integration

**What you'll see:**
- List of projects you have access to
- Shows: project key, name, description

**Example AI suggestion:**
- Workspace: "Mobile App Redesign"
- Jira project: "MOBILE - Mobile Application"
- Reason: "Project name matches workspace focus on mobile development"
- Confidence: 0.88 (High Match)

## Troubleshooting

### Error: "Integration is not configured"

**Solution:** Configure the integration in the Integrations page first.

### Error: "Failed to fetch resources: 401 Unauthorized"

**Solution:** Your credentials are invalid or expired. Re-configure the integration with valid credentials.

### No AI suggestions appear

**Possible causes:**
1. Anthropic API key not set in Settings
2. Claude API rate limit reached
3. Network connectivity issue

**Solution:**
- Check browser console for errors
- Verify API key in Settings page
- Resources will still be shown, just without AI suggestions

### Resources list is empty

**Possible causes:**
1. No resources available in the integration
2. Credentials don't have permission to access resources
3. API error

**Solution:**
- Check browser console for errors
- Verify you have resources in the external service
- Check credentials have proper permissions

### Modal doesn't open

**Solution:**
- Ensure integration service is running: `docker-compose ps integration-service`
- Check browser console for errors
- Refresh the page and try again

## Testing Checklist

- [ ] Open Workspace Integrations modal
- [ ] View available integrations (some configured, some not)
- [ ] Click on a configured integration
- [ ] See loading spinner while fetching resources
- [ ] See AI suggestions appear
- [ ] See high-confidence resources pre-selected
- [ ] Click resources to toggle selection
- [ ] View AI suggestion reasons and confidence badges
- [ ] Click external links to verify they work
- [ ] Save configuration
- [ ] See success message
- [ ] Modal closes automatically
- [ ] Verify data in localStorage
- [ ] Try with different integrations (GitHub, Jira)
- [ ] Try with different workspaces

## Next Steps (Future Enhancements)

After testing, these enhancements are planned:

1. **Database persistence** - Move from localStorage to database
2. **Display integrated resources** - Show linked resources in workspace view
3. **Sync status** - Show when resources were last synced
4. **Remove resources** - Allow unlinking resources from workspace
5. **Figma team selection** - Add team picker for Figma integration
6. **Real-time updates** - Webhook support for resource changes
7. **Resource filtering** - Filter by type, date, etc.

## Known Issues

1. **Figma limitation**: Cannot list projects/files without team_id
2. **localStorage only**: Data not persisted to database yet (backend tables are ready, just not wired up)
3. **No resource removal**: Once saved, you need to open modal again to change selections

## Feedback

If you encounter issues or have suggestions, please note:
- Error messages displayed
- Browser console logs
- Steps to reproduce
- Expected vs actual behavior
