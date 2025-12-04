# DELM API Documentation

**Version**: 1.0.0
**Base URL**: `http://127.0.0.1:3005`

## Overview

The DELM (Design Experience Language Model) API provides endpoints for generating UI components, managing design patterns, and searching the pattern knowledge base using RAG (Retrieval Augmented Generation).

---

## Authentication

Currently, the API does not require authentication. For production use, implement appropriate authentication mechanisms.

---

## Endpoints

### Health & Status

#### GET /
Root endpoint - check if API is running.

**Response**
```json
{
  "message": "DELM API is running",
  "version": "1.0.0"
}
```

---

#### GET /health
Get detailed health status of the API and model.

**Response**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "patterns_count": 8
}
```

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | API health status |
| `model_loaded` | boolean | Whether the LLM is loaded |
| `patterns_count` | integer | Number of patterns in the database |

---

### Generation

#### POST /generate
Generate UI components, styles, or layouts using RAG-enhanced generation.

**Request Body**
```json
{
  "prompt": "Create a responsive card component with image, title, and action buttons",
  "type": "component",
  "category": "components"
}
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `prompt` | string | Yes | - | Natural language description of what to generate |
| `type` | string | No | `"component"` | Generation type: `component`, `styles`, or `layout` |
| `category` | string | No | `null` | Filter patterns by category for retrieval |

**Response**
```json
{
  "output": "import React from 'react';\n\ninterface CardProps {\n  image: string;\n  title: string;\n  ...",
  "patterns_used": 3,
  "pattern_ids": ["comp-002", "style-001", "layout-002"]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `output` | string | Generated code/content |
| `patterns_used` | integer | Number of patterns retrieved for context |
| `pattern_ids` | array | IDs of patterns used for generation |

**Example - Generate Component**
```bash
curl -X POST http://127.0.0.1:3005/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a dark mode toggle button with smooth animation",
    "type": "component"
  }'
```

**Example - Generate Styles**
```bash
curl -X POST http://127.0.0.1:3005/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Design tokens for a modern SaaS dashboard with blue primary color",
    "type": "styles"
  }'
```

**Example - Generate Layout**
```bash
curl -X POST http://127.0.0.1:3005/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a dashboard layout with collapsible sidebar and header",
    "type": "layout"
  }'
```

---

### Pattern Management

#### POST /patterns
Add a new design pattern to the knowledge base.

**Request Body**
```json
{
  "pattern_id": "comp-custom-001",
  "content": "import React from 'react';\n\nexport const CustomAlert: React.FC<AlertProps> = ({ ... }) => { ... }",
  "category": "components",
  "name": "Custom Alert Component",
  "tags": ["alert", "notification", "feedback"]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `pattern_id` | string | Yes | Unique identifier for the pattern |
| `content` | string | Yes | The pattern code/content |
| `category` | string | Yes | Category: `components`, `layouts`, `styles`, `animations`, `accessibility` |
| `name` | string | Yes | Human-readable name |
| `tags` | array | No | List of searchable tags |

**Response**
```json
{
  "message": "Pattern comp-custom-001 added successfully"
}
```

**Example**
```bash
curl -X POST http://127.0.0.1:3005/patterns \
  -H "Content-Type: application/json" \
  -d '{
    "pattern_id": "comp-toast-001",
    "name": "Toast Notification",
    "category": "components",
    "tags": ["toast", "notification", "feedback"],
    "content": "import React from '\''react'\'';\nimport { clsx } from '\''clsx'\'';\n\ninterface ToastProps {\n  message: string;\n  type: '\''success'\'' | '\''error'\'' | '\''warning'\'' | '\''info'\'';\n  onClose: () => void;\n}\n\nexport const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {\n  const typeStyles = {\n    success: '\''bg-green-500'\'',\n    error: '\''bg-red-500'\'',\n    warning: '\''bg-yellow-500'\'',\n    info: '\''bg-blue-500'\''\n  };\n\n  return (\n    <div className={clsx('\''fixed bottom-4 right-4 px-4 py-3 rounded-lg text-white shadow-lg'\'', typeStyles[type])}>\n      <span>{message}</span>\n      <button onClick={onClose} className=\"ml-4\">×</button>\n    </div>\n  );\n};"
  }'
```

---

#### GET /patterns/count
Get the total number of patterns in the database.

**Response**
```json
{
  "count": 8
}
```

---

#### POST /search
Search for design patterns by semantic similarity.

**Request Body**
```json
{
  "query": "button with loading spinner",
  "category": "components",
  "top_k": 5
}
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `query` | string | Yes | - | Search query in natural language |
| `category` | string | No | `null` | Filter by category |
| `top_k` | integer | No | `5` | Maximum number of results |

**Response**
```json
{
  "patterns": [
    {
      "id": "comp-001",
      "content": "import React from 'react';\n...",
      "metadata": {
        "category": "components",
        "name": "Button Component",
        "tags": "button,interactive,form"
      },
      "distance": 0.234
    }
  ],
  "count": 1
}
```

| Field | Type | Description |
|-------|------|-------------|
| `patterns` | array | List of matching patterns |
| `patterns[].id` | string | Pattern ID |
| `patterns[].content` | string | Pattern content |
| `patterns[].metadata` | object | Pattern metadata |
| `patterns[].distance` | float | Similarity distance (lower = more similar) |
| `count` | integer | Number of results returned |

**Example**
```bash
curl -X POST http://127.0.0.1:3005/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "responsive grid layout for cards",
    "top_k": 3
  }'
```

---

#### GET /categories
Get list of available pattern categories.

**Response**
```json
{
  "categories": [
    "components",
    "layouts",
    "styles",
    "tokens",
    "animations",
    "responsive",
    "accessibility"
  ]
}
```

---

## Error Handling

### Error Response Format
```json
{
  "detail": "Error message description"
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `422` | Validation error - invalid request body |
| `500` | Internal server error |
| `503` | Service unavailable - model not loaded |

### Common Errors

**Model Not Loaded (503)**
```json
{
  "detail": "Model not loaded"
}
```
*Solution*: Wait for the model to finish loading on startup.

**Invalid Request (422)**
```json
{
  "detail": [
    {
      "loc": ["body", "prompt"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```
*Solution*: Include all required fields in the request body.

---

## Usage Examples

### Python
```python
import requests

BASE_URL = "http://127.0.0.1:3005"

# Generate a component
response = requests.post(f"{BASE_URL}/generate", json={
    "prompt": "Create a search input with icon and clear button",
    "type": "component"
})
result = response.json()
print(result["output"])

# Add a custom pattern
requests.post(f"{BASE_URL}/patterns", json={
    "pattern_id": "comp-my-001",
    "name": "My Custom Component",
    "category": "components",
    "content": "// Your component code here",
    "tags": ["custom", "example"]
})

# Search patterns
response = requests.post(f"{BASE_URL}/search", json={
    "query": "form validation",
    "top_k": 3
})
patterns = response.json()["patterns"]
```

### JavaScript/TypeScript
```typescript
const BASE_URL = "http://127.0.0.1:3005";

// Generate a component
async function generateComponent(prompt: string) {
  const response = await fetch(`${BASE_URL}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      type: "component"
    })
  });
  return response.json();
}

// Usage
const result = await generateComponent("Create a modal dialog with backdrop");
console.log(result.output);
```

### cURL Cheat Sheet
```bash
# Health check
curl http://127.0.0.1:3005/health

# Generate component
curl -X POST http://127.0.0.1:3005/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "navigation bar", "type": "component"}'

# Search patterns
curl -X POST http://127.0.0.1:3005/search \
  -H "Content-Type: application/json" \
  -d '{"query": "button styles", "top_k": 5}'

# Get pattern count
curl http://127.0.0.1:3005/patterns/count

# Get categories
curl http://127.0.0.1:3005/categories
```

---

## Best Practices

### Writing Effective Prompts

1. **Be Specific**: Include details about functionality, styling, and behavior
   - Good: "Create a dropdown menu with keyboard navigation and ARIA labels"
   - Bad: "Create a menu"

2. **Mention Technologies**: Specify the stack you want
   - "React component with TypeScript and Tailwind CSS"

3. **Include Context**: Describe where the component will be used
   - "A form input for email validation in a signup flow"

4. **Request Features**: List specific features you need
   - "Button with loading state, disabled state, and multiple variants"

### Building Your Pattern Library

1. **Add Your Team's Components**: Import your existing component library
2. **Include Edge Cases**: Add patterns for common scenarios
3. **Tag Thoroughly**: Use descriptive tags for better search
4. **Update Regularly**: Add new patterns as your design system evolves

### Performance Tips

1. **First Request**: First generation is slower due to model warm-up
2. **Batch Patterns**: Add multiple patterns at once when seeding
3. **Filter by Category**: Use category filter for faster retrieval
4. **Optimize top_k**: Use smaller top_k for faster responses

---

## Image Generation

### POST /generate/image
Generate a UI mockup image from a natural language prompt.

**Request Body**
```json
{
  "prompt": "Create a login form with email and password fields",
  "width": 800,
  "height": 600,
  "format": "base64"
}
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `prompt` | string | Yes | - | Description of the UI to generate |
| `width` | integer | No | 800 | Image width in pixels |
| `height` | integer | No | 600 | Image height in pixels |
| `format` | string | No | `"base64"` | `"base64"` or `"binary"` |

**Response (base64 format)**
```json
{
  "image": "iVBORw0KGgoAAAANSUhEUgAA...",
  "data_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "width": 800,
  "height": 600,
  "code": "import React from 'react';\n..."
}
```

**Response (binary format)**
Returns raw PNG bytes with `Content-Type: image/png`

**Example**
```bash
# Get base64 image
curl -X POST http://127.0.0.1:3005/generate/image \
  -H "Content-Type: application/json" \
  -d '{"prompt": "navigation bar with logo and menu items", "width": 1200, "height": 80}'

# Get binary PNG and save to file
curl -X POST http://127.0.0.1:3005/generate/image \
  -H "Content-Type: application/json" \
  -d '{"prompt": "card component", "format": "binary"}' \
  --output mockup.png
```

---

### POST /generate/mockup
Generate a simple component mockup without LLM (faster, predefined styles).

**Request Body**
```json
{
  "component_type": "button",
  "props": {
    "text": "Click Me",
    "color": "#3b82f6"
  },
  "width": 400,
  "height": 300,
  "format": "base64"
}
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `component_type` | string | Yes | - | `button`, `card`, `input`, or `navbar` |
| `props` | object | No | `{}` | Component-specific properties |
| `width` | integer | No | 400 | Image width |
| `height` | integer | No | 300 | Image height |
| `format` | string | No | `"base64"` | `"base64"` or `"binary"` |

**Component Props**

- **button**: `text`, `color`
- **card**: `title`, `content`
- **input**: `label`, `placeholder`
- **navbar**: `logo`, `items` (array)

**Example**
```bash
# Button mockup
curl -X POST http://127.0.0.1:3005/generate/mockup \
  -H "Content-Type: application/json" \
  -d '{
    "component_type": "button",
    "props": {"text": "Submit", "color": "#10b981"}
  }'

# Card mockup
curl -X POST http://127.0.0.1:3005/generate/mockup \
  -H "Content-Type: application/json" \
  -d '{
    "component_type": "card",
    "props": {"title": "Welcome", "content": "Hello World"}
  }'

# Navbar mockup
curl -X POST http://127.0.0.1:3005/generate/mockup \
  -H "Content-Type: application/json" \
  -d '{
    "component_type": "navbar",
    "props": {"logo": "MyApp", "items": ["Home", "About", "Contact"]}
  }'
```

---

### POST /generate/code-to-image
Render existing code to an image.

**Request Body**
```json
{
  "code": "<div class=\"p-4 bg-blue-500 text-white\">Hello</div>",
  "width": 800,
  "height": 600,
  "format": "base64"
}
```

**Example**
```bash
curl -X POST http://127.0.0.1:3005/generate/code-to-image \
  -H "Content-Type: application/json" \
  -d '{
    "code": "<div class=\"p-8\"><h1 class=\"text-2xl font-bold\">Preview</h1></div>",
    "width": 400,
    "height": 200
  }'
```

---

## SVG Generation

### GET /icons
List all available built-in icons.

**Response**
```json
{
  "icons": ["home", "user", "settings", "search", "heart", "star", "mail", "phone", ...]
}
```

---

### POST /generate/icon
Generate an SVG icon.

**Request Body**
```json
{
  "name": "home",
  "size": 24,
  "color": "#3b82f6",
  "stroke_width": 2,
  "format": "svg"
}
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | string | Yes | - | Icon name (use GET /icons to list) |
| `size` | integer | No | 24 | Icon size in pixels |
| `color` | string | No | `"currentColor"` | Icon color (hex or CSS color) |
| `stroke_width` | float | No | 2 | Stroke width |
| `format` | string | No | `"svg"` | `"svg"`, `"png"`, or `"binary"` |

**Response (svg format)**
Returns raw SVG with `Content-Type: image/svg+xml`

**Response (png/base64 format)**
```json
{
  "image": "iVBORw0KGgoAAAANSUhEUgAA...",
  "data_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "name": "home"
}
```

**Example**
```bash
# Get SVG icon
curl -X POST http://127.0.0.1:3005/generate/icon \
  -H "Content-Type: application/json" \
  -d '{"name": "settings", "size": 32, "color": "#6366f1"}'

# Save as file
curl -X POST http://127.0.0.1:3005/generate/icon \
  -H "Content-Type: application/json" \
  -d '{"name": "heart", "color": "#ef4444"}' \
  --output heart.svg
```

---

### POST /generate/symbol
Generate a decorative symbol.

**Request Body**
```json
{
  "symbol_type": "hexagon",
  "size": 64,
  "primary_color": "#3b82f6",
  "secondary_color": "#60a5fa",
  "format": "svg"
}
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `symbol_type` | string | Yes | - | `circle`, `hexagon`, `star`, `diamond`, `triangle`, `ring`, `badge` |
| `size` | integer | No | 64 | Symbol size in pixels |
| `primary_color` | string | No | `"#3b82f6"` | Primary color |
| `secondary_color` | string | No | `"#60a5fa"` | Secondary/accent color |
| `format` | string | No | `"svg"` | `"svg"`, `"png"`, or `"binary"` |

**Example**
```bash
curl -X POST http://127.0.0.1:3005/generate/symbol \
  -H "Content-Type: application/json" \
  -d '{"symbol_type": "star", "size": 128, "primary_color": "#f59e0b"}'
```

---

## AI Image Generation (Stable Diffusion)

These endpoints use Stable Diffusion via MLX for AI-generated images. The model (~4GB) downloads on first use.

### POST /generate/ai-image
Generate an image from a text prompt using Stable Diffusion.

**Request Body**
```json
{
  "prompt": "abstract gradient background, blue and purple",
  "width": 512,
  "height": 512,
  "num_steps": 4,
  "seed": null,
  "format": "base64"
}
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `prompt` | string | Yes | - | Image description |
| `width` | integer | No | 512 | Image width |
| `height` | integer | No | 512 | Image height |
| `num_steps` | integer | No | 4 | Inference steps (more = higher quality, slower) |
| `seed` | integer | No | null | Random seed for reproducibility |
| `format` | string | No | `"base64"` | `"base64"` or `"binary"` |

**Response**
```json
{
  "image": "iVBORw0KGgoAAAANSUhEUgAA...",
  "data_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "width": 512,
  "height": 512,
  "prompt": "abstract gradient background, blue and purple"
}
```

**Example**
```bash
curl -X POST http://127.0.0.1:3005/generate/ai-image \
  -H "Content-Type: application/json" \
  -d '{"prompt": "minimalist mountain landscape, sunset colors", "num_steps": 8}'
```

---

### POST /generate/logo
Generate a logo using AI with style presets.

**Request Body**
```json
{
  "description": "coffee shop",
  "style": "modern",
  "width": 512,
  "height": 512,
  "format": "base64"
}
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `description` | string | Yes | - | Logo subject/concept |
| `style` | string | No | `"modern"` | `modern`, `vintage`, `playful`, `tech`, `organic`, `bold` |
| `width` | integer | No | 512 | Image width |
| `height` | integer | No | 512 | Image height |
| `format` | string | No | `"base64"` | `"base64"` or `"binary"` |

**Style Descriptions**
- `modern` - Clean lines, minimalist, professional
- `vintage` - Retro, classic typography, badge style
- `playful` - Colorful, friendly, rounded shapes
- `tech` - Geometric, futuristic, sleek
- `organic` - Natural, flowing lines, earth tones
- `bold` - Strong typography, high contrast

**Example**
```bash
curl -X POST http://127.0.0.1:3005/generate/logo \
  -H "Content-Type: application/json" \
  -d '{"description": "fitness gym", "style": "bold"}'
```

---

### POST /generate/illustration
Generate an illustration using AI.

**Request Body**
```json
{
  "description": "team collaboration in office",
  "style": "digital",
  "width": 768,
  "height": 512,
  "format": "base64"
}
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `description` | string | Yes | - | Illustration subject |
| `style` | string | No | `"digital"` | `digital`, `watercolor`, `vector`, `sketch`, `isometric` |
| `width` | integer | No | 768 | Image width |
| `height` | integer | No | 512 | Image height |
| `format` | string | No | `"base64"` | `"base64"` or `"binary"` |

**Style Descriptions**
- `digital` - Clean digital illustration, vibrant colors
- `watercolor` - Soft edges, artistic watercolor effect
- `vector` - Flat colors, geometric shapes
- `sketch` - Pencil sketch, hand-drawn look
- `isometric` - 3D isometric perspective, flat shading

**Example**
```bash
curl -X POST http://127.0.0.1:3005/generate/illustration \
  -H "Content-Type: application/json" \
  -d '{"description": "workspace with laptop and coffee", "style": "isometric"}'
```

---

## Rate Limits

No rate limits are currently implemented. For production deployments, consider adding rate limiting based on your infrastructure capacity.

---

## Changelog

### v1.2.0
- Added SVG generation endpoints
  - GET /icons - List available icons
  - POST /generate/icon - Generate SVG icons (50+ built-in)
  - POST /generate/symbol - Generate decorative symbols
- Added AI image generation (Stable Diffusion via MLX)
  - POST /generate/ai-image - General AI image generation
  - POST /generate/logo - Logo generation with style presets
  - POST /generate/illustration - Illustration generation
- Added mflux dependency for Apple Silicon SD support

### v1.1.0
- Added image generation endpoints
- POST /generate/image - Generate mockup from prompt
- POST /generate/mockup - Quick component mockups
- POST /generate/code-to-image - Render code to PNG

### v1.0.0
- Initial release
- Component, styles, and layout generation
- Pattern management endpoints
- Semantic search
- RAG-enhanced generation
