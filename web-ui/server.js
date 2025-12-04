import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API endpoint to save specification markdown
app.post('/api/save-specification', async (req, res) => {
  try {
    const { fileName, content, workspacePath, subfolder } = req.body;

    if (!fileName || !content) {
      return res.status(400).json({ error: 'fileName and content are required' });
    }

    // Determine target folder - use subfolder if provided, default to 'specifications'
    const targetSubfolder = subfolder || 'specifications';

    // Determine specifications path
    let specificationsPath;
    if (workspacePath) {
      // Use workspace-specific folder
      // Resolve relative workspace path from project root (one level up from web-ui)
      specificationsPath = path.join(__dirname, '..', workspacePath, targetSubfolder);
    } else {
      // Fallback to default specifications folder (one level up from web-ui)
      specificationsPath = path.join(__dirname, '..', 'specifications');
    }

    // Ensure specifications folder exists
    try {
      await fs.access(specificationsPath);
    } catch {
      await fs.mkdir(specificationsPath, { recursive: true });
    }

    // Write the markdown file
    const filePath = path.join(specificationsPath, fileName);
    await fs.writeFile(filePath, content, 'utf-8');

    res.json({
      success: true,
      message: `File saved successfully`,
      path: path.relative(workspacePath || path.join(__dirname, '..'), filePath)
    });
  } catch (error) {
    console.error('Error saving specification:', error);
    res.status(500).json({
      error: 'Failed to save specification',
      details: error.message
    });
  }
});

// API endpoint to save multiple specification files
app.post('/api/save-specifications', async (req, res) => {
  try {
    const { files, images, workspacePath, subfolder } = req.body;

    if (!files || !Array.isArray(files)) {
      return res.status(400).json({ error: 'files array is required' });
    }

    // Determine target folder - use subfolder if provided, default to 'specifications'
    const targetSubfolder = subfolder || 'specifications';

    // Determine specifications path
    let specificationsPath;
    if (workspacePath) {
      // Use workspace-specific folder
      // Resolve relative workspace path from project root (one level up from web-ui)
      specificationsPath = path.join(__dirname, '..', workspacePath, targetSubfolder);
    } else {
      // Fallback to default specifications folder (one level up from web-ui)
      specificationsPath = path.join(__dirname, '..', 'specifications');
    }

    // Ensure specifications folder exists
    try {
      await fs.access(specificationsPath);
    } catch {
      await fs.mkdir(specificationsPath, { recursive: true });
    }

    // Write all markdown files
    const savedFiles = [];
    for (const file of files) {
      if (!file.fileName || !file.content) {
        continue;
      }
      const filePath = path.join(specificationsPath, file.fileName);
      await fs.writeFile(filePath, file.content, 'utf-8');
      savedFiles.push(path.relative(workspacePath || path.join(__dirname, '..'), filePath));
    }

    // Write all image files
    const savedImages = [];
    if (images && Array.isArray(images)) {
      for (const image of images) {
        if (!image.fileName || !image.data) {
          continue;
        }

        // Parse data URL to extract base64 data
        const matches = image.data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const base64Data = matches[2];
          const buffer = Buffer.from(base64Data, 'base64');

          const filePath = path.join(specificationsPath, image.fileName);
          await fs.writeFile(filePath, buffer);
          savedImages.push(path.relative(workspacePath || path.join(__dirname, '..'), filePath));

          // Save metadata (position, dimensions, tags, connections) as companion .json file
          const metadataFileName = image.fileName.replace(/\.[^.]+$/, '.json');
          const metadataFilePath = path.join(specificationsPath, metadataFileName);
          const metadata = {
            fileName: image.fileName,
            x: image.x || 50,
            y: image.y || 50,
            width: image.width || 300,
            height: image.height || 200,
            tags: image.tags || [],
            textContent: image.textContent || '',
            cardName: image.cardName || '',
            connectedTo: image.connectedTo || [],
            connectedFrom: image.connectedFrom || []
          };
          await fs.writeFile(metadataFilePath, JSON.stringify(metadata, null, 2), 'utf-8');
        }
      }
    }

    res.json({
      success: true,
      message: `${savedFiles.length} markdown files and ${savedImages.length} image files saved successfully`,
      files: savedFiles,
      images: savedImages,
      path: specificationsPath
    });
  } catch (error) {
    console.error('Error saving specifications:', error);
    res.status(500).json({
      error: 'Failed to save specifications',
      details: error.message
    });
  }
});

// API endpoint to read specification files from workspace
app.post('/api/read-specifications', async (req, res) => {
  try {
    const { workspacePath, subfolder } = req.body;

    // Determine target folder - use subfolder if provided, default to 'specifications'
    const targetSubfolder = subfolder || 'specifications';

    // Determine specifications path
    let specificationsPath;
    if (workspacePath) {
      // Check if workspacePath is absolute or relative
      if (path.isAbsolute(workspacePath)) {
        specificationsPath = path.join(workspacePath, targetSubfolder);
      } else {
        // Use workspace-specific folder relative to project root
        specificationsPath = path.join(__dirname, '..', workspacePath, targetSubfolder);
      }
    } else {
      // Fallback to default specifications folder
      specificationsPath = path.join(__dirname, '..', 'specifications');
    }

    console.log(`[read-specifications] Looking for files in: ${specificationsPath}`);

    // Check if specifications folder exists
    try {
      await fs.access(specificationsPath);
    } catch {
      console.log(`[read-specifications] Folder not found: ${specificationsPath}`);
      return res.json({
        success: true,
        files: [],
        images: [],
        message: `No specifications folder found at: ${specificationsPath}`
      });
    }

    // Read all files in the specifications folder
    const allFiles = await fs.readdir(specificationsPath);
    console.log(`[read-specifications] Found ${allFiles.length} total files:`, allFiles.slice(0, 10));

    // Filter for IDEA-* files
    const ideaMarkdownFiles = allFiles.filter(f => f.startsWith('IDEA-') && f.endsWith('.md'));
    const ideaImageFiles = allFiles.filter(f => f.startsWith('IDEA-') && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f));
    console.log(`[read-specifications] Found ${ideaMarkdownFiles.length} IDEA-*.md files and ${ideaImageFiles.length} IDEA-* images`);

    // Read markdown files
    const markdownContents = [];
    for (const fileName of ideaMarkdownFiles) {
      const filePath = path.join(specificationsPath, fileName);
      const content = await fs.readFile(filePath, 'utf-8');
      markdownContents.push({ fileName, content });
    }

    // Read image files as base64
    const imageContents = [];
    for (const fileName of ideaImageFiles) {
      const filePath = path.join(specificationsPath, fileName);
      const buffer = await fs.readFile(filePath);
      const base64Data = buffer.toString('base64');

      // Determine mime type
      let mimeType = 'image/png';
      if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
        mimeType = 'image/jpeg';
      } else if (fileName.endsWith('.gif')) {
        mimeType = 'image/gif';
      } else if (fileName.endsWith('.webp')) {
        mimeType = 'image/webp';
      } else if (fileName.endsWith('.svg')) {
        mimeType = 'image/svg+xml';
      }

      const dataUrl = `data:${mimeType};base64,${base64Data}`;

      // Read companion metadata file if it exists
      const metadataFileName = fileName.replace(/\.[^.]+$/, '.json');
      const metadataFilePath = path.join(specificationsPath, metadataFileName);
      let metadata = {};
      try {
        const metadataContent = await fs.readFile(metadataFilePath, 'utf-8');
        metadata = JSON.parse(metadataContent);
      } catch {
        // Metadata file doesn't exist or is invalid, use defaults
      }

      imageContents.push({ fileName, data: dataUrl, metadata });
    }

    res.json({
      success: true,
      files: markdownContents,
      images: imageContents,
      path: specificationsPath
    });
  } catch (error) {
    console.error('Error reading specifications:', error);
    res.status(500).json({
      error: 'Failed to read specifications',
      details: error.message
    });
  }
});

// API endpoint to read enabler specification files (ENB-*.md)
app.post('/api/read-enabler-specifications', async (req, res) => {
  try {
    const { workspacePath } = req.body;

    // Enabler files are stored in the definition folder
    let specificationsPath;
    if (workspacePath) {
      specificationsPath = path.join(__dirname, '..', workspacePath, 'definition');
    } else {
      specificationsPath = path.join(__dirname, '..', 'specifications');
    }

    // Check if definition folder exists
    try {
      await fs.access(specificationsPath);
    } catch {
      return res.json({
        success: true,
        enablers: [],
        message: 'No definition folder found'
      });
    }

    // Read all files in the specifications folder
    const allFiles = await fs.readdir(specificationsPath);

    // Filter for ENB-*.md files
    const enablerFiles = allFiles.filter(f => f.startsWith('ENB-') && f.endsWith('.md'));

    // Parse each enabler file
    const enablers = [];
    for (const fileName of enablerFiles) {
      const filePath = path.join(specificationsPath, fileName);
      const content = await fs.readFile(filePath, 'utf-8');

      // Parse metadata from markdown
      const metadata = parseEnablerMetadata(content);
      enablers.push({
        fileName,
        filePath: path.relative(path.join(__dirname, '..'), filePath),
        content,
        ...metadata
      });
    }

    res.json({
      success: true,
      enablers,
      count: enablers.length,
      path: specificationsPath
    });
  } catch (error) {
    console.error('Error reading enabler specifications:', error);
    res.status(500).json({
      error: 'Failed to read enabler specifications',
      details: error.message
    });
  }
});

// Helper function to parse enabler metadata from markdown content
function parseEnablerMetadata(content) {
  const metadata = {
    name: '',
    type: 'Enabler',
    id: '',
    capabilityId: '',
    owner: '',
    status: '',
    approval: '',
    priority: '',
    analysisReview: '',
    codeReview: '',
    purpose: '',
    functionalRequirements: [],
    nonFunctionalRequirements: []
  };

  // Extract title (first # heading)
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    metadata.name = titleMatch[1].trim();
  }

  // Extract metadata fields
  const metadataPatterns = {
    name: /\*\*Name\*\*:\s*(.+)/,
    id: /\*\*ID\*\*:\s*(.+)/,
    capabilityId: /\*\*Capability ID\*\*:\s*(.+)/,
    owner: /\*\*Owner\*\*:\s*(.+)/,
    status: /\*\*Status\*\*:\s*(.+)/,
    approval: /\*\*Approval\*\*:\s*(.+)/,
    priority: /\*\*Priority\*\*:\s*(.+)/,
    analysisReview: /\*\*Analysis Review\*\*:\s*(.+)/,
    codeReview: /\*\*Code Review\*\*:\s*(.+)/
  };

  for (const [key, pattern] of Object.entries(metadataPatterns)) {
    const match = content.match(pattern);
    if (match) {
      metadata[key] = match[1].trim();
    }
  }

  // Extract purpose (from Technical Overview section)
  const purposeMatch = content.match(/###\s*Purpose\s*\n([\s\S]*?)(?=\n##|\n###|$)/);
  if (purposeMatch) {
    metadata.purpose = purposeMatch[1].trim().split('\n')[0].trim();
  }

  // Extract functional requirements (table rows)
  const frTableMatch = content.match(/## Functional Requirements[\s\S]*?\|[\s\S]*?\|([\s\S]*?)(?=\n##|$)/);
  if (frTableMatch) {
    const rows = frTableMatch[1].split('\n').filter(row => row.includes('|') && !row.includes('----'));
    metadata.functionalRequirements = rows.map(row => {
      const cols = row.split('|').map(c => c.trim()).filter(c => c);
      if (cols.length >= 3) {
        return { id: cols[0], name: cols[1], requirement: cols[2], status: cols[3] || '', priority: cols[4] || '' };
      }
      return null;
    }).filter(Boolean);
  }

  // Extract non-functional requirements (table rows)
  const nfrTableMatch = content.match(/## Non-Functional Requirements[\s\S]*?\|[\s\S]*?\|([\s\S]*?)(?=\n##|$)/);
  if (nfrTableMatch) {
    const rows = nfrTableMatch[1].split('\n').filter(row => row.includes('|') && !row.includes('----'));
    metadata.nonFunctionalRequirements = rows.map(row => {
      const cols = row.split('|').map(c => c.trim()).filter(c => c);
      if (cols.length >= 3) {
        return { id: cols[0], name: cols[1], requirement: cols[2], type: cols[3] || '', status: cols[4] || '' };
      }
      return null;
    }).filter(Boolean);
  }

  return metadata;
}

// API endpoint to delete a specification file
app.post('/api/delete-specification', async (req, res) => {
  try {
    const { fileName, workspacePath, subfolder } = req.body;

    if (!fileName) {
      return res.status(400).json({ error: 'fileName is required' });
    }

    // Determine target folder - use subfolder if provided, default to 'specifications'
    const targetSubfolder = subfolder || 'specifications';

    // Determine target path
    let targetPath;
    if (workspacePath) {
      targetPath = path.join(__dirname, '..', workspacePath, targetSubfolder);
    } else {
      targetPath = path.join(__dirname, '..', 'specifications');
    }

    const filePath = path.join(targetPath, fileName);

    // Security check: ensure the file is within the target folder
    const resolvedPath = path.resolve(filePath);
    const resolvedTargetPath = path.resolve(targetPath);
    if (!resolvedPath.startsWith(resolvedTargetPath)) {
      return res.status(403).json({ error: 'Access denied: path outside target folder' });
    }

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete the file
    await fs.unlink(filePath);

    res.json({
      success: true,
      message: `File ${fileName} deleted successfully`,
      deletedFile: fileName
    });
  } catch (error) {
    console.error('Error deleting specification:', error);
    res.status(500).json({
      error: 'Failed to delete specification',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'specification-api' });
});

app.listen(PORT, () => {
  console.log(`Specification API server running on http://localhost:${PORT}`);
});
