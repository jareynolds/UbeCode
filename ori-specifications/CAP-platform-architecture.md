# Platform Architecture


### System Architecture

```
┌─────────────────────────────────────────────────┐
│                 Browser Client                  │
│  ┌───────────────────────────────────────────┐  │
│  │         React Application                 │  │
│  │  ┌─────────┐  ┌──────────┐  ┌─────────┐  │  │
│  │  │Dashboard│  │Ideation  │  │Storyboard│ │  │
│  │  └─────────┘  └──────────┘  └─────────┘  │  │
│  │                                           │  │
│  │  ┌─────────────────────────────────────┐ │  │
│  │  │     Workspace Context Provider      │ │  │
│  │  └─────────────────────────────────────┘ │  │
│  │                    ↕                      │  │
│  │  ┌─────────────────────────────────────┐ │  │
│  │  │         localStorage                │ │  │
│  │  └─────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────┘  │
│                     ↕                            │
│  ┌───────────────────────────────────────────┐  │
│  │    Specification API (Express:3001)       │  │
│  └───────────────────────────────────────────┘  │
│                     ↕                            │
│  ┌───────────────────────────────────────────┐  │
│  │    File System (specifications/)          │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘

Backend Services (Docker)
┌─────────────────────────────────────────────────┐
│  Integration Service :8080                      │
│  Design Service :8081                           │
│  Capability Service :8082                       │
└─────────────────────────────────────────────────┘
```

### Data Flow Architecture

```
User Action
    ↓
React Component (UI)
    ↓
State Update (useState)
    ↓
Context Update (Workspace)
    ↓
localStorage Persistence
    ↓
    ┌─────────────────┐
    │ Cross-Tab Sync  │
    └─────────────────┘
```

### Component Hierarchy

```
App
├── ThemeProvider
│   └── AppProvider
│       └── AuthProvider
│           └── WorkspaceProvider
│               └── Router
│                   ├── Public Routes
│                   │   └── Login
│                   └── Protected Routes
│                       ├── Header
│                       ├── Sidebar
│                       └── Main
│                           ├── Dashboard
│                           ├── Ideation
│                           ├── Storyboard
│                           ├── Capabilities
│                           ├── Workspaces
│                           ├── Designs
│                           ├── Integrations
│                           ├── AIChat
│                           └── Settings
```
