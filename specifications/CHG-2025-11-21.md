# Technical Changes - November 20-21, 2025

**Date**: November 20-21, 2025
**Status**: ✅ **IMPLEMENTED**
**Framework**: Anvil Capability-Driven Development

---

## Executive Summary

Implemented significant enhancements to the System Architecture page, adding AI-powered diagram generation capabilities with Mermaid rendering and localStorage persistence. Also added new backend API endpoint for diagram generation.

---

## New Capabilities and Features

### 1. System Page Diagram Generation

**Feature**: AI-Powered Diagram Generation for System Architecture

Added "Generate" buttons to each diagram tab in the System page that read workspace specifications and generate corresponding diagrams using Claude AI.

#### Tabs Enhanced:
- **State Diagram** - Generates state diagrams showing system states and transitions
- **Sequence Diagram** - Generates sequence diagrams showing component interactions
- **Data Models** - Generates ER diagrams from data specifications
- **Class Diagrams** - Generates UML class diagrams from capabilities/enablers

---

### 2. Mermaid Diagram Rendering

**Feature**: Visual Diagram Rendering

Integrated the Mermaid library to render AI-generated diagrams as interactive SVG visualizations instead of raw code.

#### Implementation:
- Added `mermaid` npm package
- Created `MermaidDiagram` React component
- Diagrams render as scalable SVG graphics
- Error handling with fallback display

---

### 3. Diagram Persistence

**Feature**: LocalStorage Persistence for Generated Diagrams

Generated diagrams are automatically saved to localStorage and restored when the user returns to the page.

#### Storage Keys:
- `system_state_diagram_${workspaceId}`
- `system_sequence_diagram_${workspaceId}`
- `system_data_models_${workspaceId}`
- `system_class_diagrams_${workspaceId}`

---

## Backend API Enhancements

### New Endpoint: Generate Diagram

**Endpoint**: `POST /specifications/generate-diagram`

Generates Mermaid diagram code from specification files using Claude AI.

#### Request Body:
```json
{
  "files": [
    {
      "filename": "story-123.md",
      "content": "..."
    }
  ],
  "anthropic_key": "sk-ant-...",
  "diagram_type": "state|sequence|data-models|class",
  "prompt": "Custom prompt for diagram generation"
}
```

#### Response:
```json
{
  "diagram": "stateDiagram-v2\n  [*] --> Idle\n  ...",
  "diagram_type": "state"
}
```

#### Diagram Types Supported:
- `state` - State machine diagrams (stateDiagram-v2)
- `sequence` - Sequence diagrams (sequenceDiagram)
- `data-models` - Entity-relationship diagrams (erDiagram)
- `class` - Class diagrams (classDiagram)

---

## Files Modified

### Frontend (web-ui/src)

#### pages/System.tsx
- Added mermaid import and initialization
- Added `MermaidDiagram` component for SVG rendering
- Added state variables for each diagram type (loading + content)
- Added `loadSavedDiagrams()` to restore from localStorage
- Added `generateDiagram()` generic function for API calls
- Added localStorage persistence on diagram generation
- Updated all tab content to use MermaidDiagram component
- Added CSS styles for mermaid-container and error states

### Backend (internal/integration)

#### handler.go
- Added `GenerateDiagramRequest` struct
- Added `GenerateDiagramResponse` struct
- Added `HandleGenerateDiagram` handler function
- Extracts Mermaid code from Claude's markdown response

#### cmd/integration-service/main.go
- Registered `POST /specifications/generate-diagram` route
- Registered `OPTIONS /specifications/generate-diagram` for CORS

### Dependencies

#### web-ui/package.json
- Added `mermaid` package (133 new packages)

### Bug Fixes

#### test_figma_team.go
- Fixed corrupted string literals (newlines inside strings)
- Added `//go:build ignore` to exclude from main build

---

## Technical Implementation Details

### MermaidDiagram Component

```typescript
const MermaidDiagram: React.FC<{ content: string; id: string }> = ({ content, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content && containerRef.current) {
      const renderDiagram = async () => {
        try {
          const { svg } = await mermaid.render(`mermaid-${id}-${Date.now()}`, content);
          containerRef.current!.innerHTML = svg;
        } catch (error) {
          // Display error with raw content
        }
      };
      renderDiagram();
    }
  }, [content, id]);

  return <div ref={containerRef} className="mermaid-container" />;
};
```

### Generate Diagram Flow

1. User clicks "Generate" button
2. Frontend fetches specification files from `/specifications/list`
3. Frontend calls `/specifications/generate-diagram` with files + prompt
4. Backend sends specifications to Claude API with diagram-specific prompt
5. Claude returns Mermaid code
6. Backend extracts Mermaid code from markdown blocks
7. Frontend renders diagram using Mermaid library
8. Frontend saves diagram to localStorage

---

## UI/UX Improvements

### Generate Bar
- Added consistent generate bar above each diagram tab
- Shows "Generate" button and description text
- Loading state shows "Generating..." text
- Button disabled when no workspace selected

### Diagram Display
- Full-width/height container for diagrams
- Centered SVG with auto-scaling
- Scrollable for large diagrams
- Error state with red background shows raw content

---

## Database/Storage Changes

### LocalStorage Schema

| Key Pattern | Value Type | Description |
|-------------|------------|-------------|
| `system_state_diagram_${id}` | string | Mermaid code for state diagram |
| `system_sequence_diagram_${id}` | string | Mermaid code for sequence diagram |
| `system_data_models_${id}` | string | Mermaid code for data models |
| `system_class_diagrams_${id}` | string | Mermaid code for class diagrams |

---

## Testing Instructions

### Prerequisites
1. Anthropic API key set in Settings page
2. Workspace with specifications folder containing .md files

### Test Steps
1. Start backend: `cd cmd/integration-service && go build && ./integration-service`
2. Start frontend: `cd web-ui && npm run dev`
3. Navigate to System page
4. Select a workspace with specifications
5. Click on "State Diagram" tab
6. Click "Generate" button
7. Verify diagram renders as SVG
8. Refresh page - verify diagram persists
9. Repeat for other diagram tabs

---

## Performance Considerations

- Mermaid rendering happens client-side (no server load)
- Diagrams cached in localStorage (instant restore)
- Only regenerate when user explicitly clicks "Generate"
- Large diagrams may take longer to render

---

## Known Limitations

1. Mermaid syntax errors from AI will show error state
2. Very complex diagrams may be slow to render
3. LocalStorage has ~5MB limit per domain
4. No export functionality yet (PNG, SVG download)

---

## Future Enhancements

1. **Export Options** - Download as PNG, SVG, or PDF
2. **Edit Diagrams** - Allow manual editing of Mermaid code
3. **Diagram History** - Keep multiple versions
4. **Database Persistence** - Save to workspace database
5. **Real-time Preview** - Show diagram as AI generates
6. **Zoom/Pan Controls** - Better navigation for large diagrams

---

## Compliance Notes

- Follows existing code patterns and styling
- Uses consistent localStorage key naming
- API follows existing endpoint patterns
- Error handling consistent with other endpoints

---

## Related Documentation

- [API Documentation](../docs/api/API.md)
- [Implementation Summary](../IMPLEMENTATION_SUMMARY.md)
- [System Architecture](../README.md)

---

**Implementation Status**: ✅ Complete
**Testing Status**: Ready for QA
**Documentation Status**: ✅ Complete
