import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4002;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Simple in-memory storage for shared workspaces
// In production, this would be a database
const sharedWorkspaces = new Map(); // workspaceId -> workspace data

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'shared-workspace-api' });
});

// Get all shared workspaces (excluding current user's)
app.get('/api/shared-workspaces', async (req, res) => {
  try {
    const userEmail = req.query.userEmail;

    if (!userEmail) {
      return res.status(400).json({ error: 'userEmail query parameter is required' });
    }

    // Filter out workspaces owned by the current user
    const workspaces = Array.from(sharedWorkspaces.values())
      .filter(w => w.isShared && w.ownerId !== userEmail);

    res.json({ workspaces });
  } catch (error) {
    console.error('Error fetching shared workspaces:', error);
    res.status(500).json({
      error: 'Failed to fetch shared workspaces',
      details: error.message
    });
  }
});

// Share a workspace (make it available to others)
app.post('/api/shared-workspaces', async (req, res) => {
  try {
    const { workspace } = req.body;

    if (!workspace || !workspace.id) {
      return res.status(400).json({ error: 'workspace object with id is required' });
    }

    // Store the workspace
    sharedWorkspaces.set(workspace.id, {
      ...workspace,
      sharedAt: new Date().toISOString()
    });

    console.log(`Workspace ${workspace.id} shared by ${workspace.ownerId}`);

    res.json({
      success: true,
      message: 'Workspace shared successfully',
      workspace: sharedWorkspaces.get(workspace.id)
    });
  } catch (error) {
    console.error('Error sharing workspace:', error);
    res.status(500).json({
      error: 'Failed to share workspace',
      details: error.message
    });
  }
});

// Unshare a workspace (remove from shared list)
app.delete('/api/shared-workspaces/:workspaceId', async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const userEmail = req.query.userEmail;

    if (!userEmail) {
      return res.status(400).json({ error: 'userEmail query parameter is required' });
    }

    const workspace = sharedWorkspaces.get(workspaceId);

    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    // Only the owner can unshare
    if (workspace.ownerId !== userEmail) {
      return res.status(403).json({ error: 'Only the workspace owner can unshare it' });
    }

    sharedWorkspaces.delete(workspaceId);

    console.log(`Workspace ${workspaceId} unshared by ${userEmail}`);

    res.json({
      success: true,
      message: 'Workspace unshared successfully'
    });
  } catch (error) {
    console.error('Error unsharing workspace:', error);
    res.status(500).json({
      error: 'Failed to unshare workspace',
      details: error.message
    });
  }
});

// Update a shared workspace (sync changes)
app.put('/api/shared-workspaces/:workspaceId', async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { workspace } = req.body;

    if (!workspace) {
      return res.status(400).json({ error: 'workspace object is required' });
    }

    const existing = sharedWorkspaces.get(workspaceId);

    if (!existing) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    // Update the workspace
    sharedWorkspaces.set(workspaceId, {
      ...existing,
      ...workspace,
      id: workspaceId, // Ensure ID doesn't change
      ownerId: existing.ownerId, // Ensure owner doesn't change
      sharedAt: existing.sharedAt, // Preserve original share time
      updatedAt: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Workspace updated successfully',
      workspace: sharedWorkspaces.get(workspaceId)
    });
  } catch (error) {
    console.error('Error updating shared workspace:', error);
    res.status(500).json({
      error: 'Failed to update workspace',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Shared Workspace API server running on http://localhost:${PORT}`);
  console.log(`Endpoints:`);
  console.log(`  GET    /api/shared-workspaces?userEmail=<email>`);
  console.log(`  POST   /api/shared-workspaces`);
  console.log(`  DELETE /api/shared-workspaces/:id?userEmail=<email>`);
  console.log(`  PUT    /api/shared-workspaces/:id`);
});
