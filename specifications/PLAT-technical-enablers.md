# Technical Enablers


### Frontend Stack

**Framework**: React 19
- Functional components
- Hooks for state management
- Context API for global state
- TypeScript for type safety

**Routing**: react-router-dom
- Client-side routing
- Protected routes
- Navigation components
- Location-based active states

**State Management**:
- React Context (WorkspaceContext, AuthContext, AppContext, ThemeContext)
- useState for local state
- useEffect for side effects
- localStorage for persistence

**Styling**:
- Component-scoped CSS
- CSS custom properties
- Apple HIG design tokens
- Responsive breakpoints
- Dark mode support

### Backend Services

**Specification API**: Express.js (port 3001)
- Markdown file saving
- Multi-file batch operations
- Health check endpoint
- CORS enabled
- JSON body parsing

**Integration Service**: (port 8080)
- External system integration
- Health monitoring

**Design Service**: (port 8081)
- Design asset management
- Figma integration

**Capability Service**: (port 8082)
- Platform capabilities
- Feature management

### Data Storage

**Client-Side**: localStorage
- Workspace data
- Ideation canvas state
- Storyboard cards
- User preferences
- ~5-10MB capacity

**File System**: specifications/
- Exported markdown files
- Generated via API server
- Version control ready

### Build and Development

**Build Tool**: Vite 7.2.2
- Fast HMR
- Optimized production builds
- TypeScript compilation
- Code splitting

**Package Manager**: npm
- Dependency management
- Script automation
- Version locking

**TypeScript**: Type safety
- Interface definitions
- Type checking
- IntelliSense support

### APIs and Integrations

**Browser APIs**:
- FileReader (image upload)
- localStorage (persistence)
- URL API (routing)
- Clipboard API (future)

**Custom APIs**:
- Specification export API
- Workspace management
- Health checks
