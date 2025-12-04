
# UbeCode - Design Driven Development

A GoLang-based microservices application for massively streamlined comprehensive software development using the **SAWai (Scaled Agile With AI)** methodology.

## What is SAWai?

**SAWai (Scaled Agile With AI)** is an evolution of traditional scaled agile frameworks designed specifically for AI-assisted development. Key principles:

- **Specification-First**: With AI accelerating code generation, the bottleneck shifts to specification quality. SAWai emphasizes thorough Vision, Ideation, and Storyboarding before implementation.
- **Four-Phase Workflow**:
  1. **SPECIFICATION** - Define what to build (Vision & Themes, Ideation, Storyboard)
  2. **DEFINITION** - Define the scope (Capabilities, Epics)
  3. **DESIGN** - Define how it looks (UI Assets, Framework, Styles)
  4. **EXECUTION** - Build and run (System, Code, Run)
- **AI-Amplified Delivery**: Traditional sprint velocities are superseded by AI-assisted generation, making well-defined requirements the primary success factor.
- **Simplified Hierarchy**: Capabilities → Epics (Features merged into Epics, Stories become implementation specs)

## Overview

UbeCode is a web application that facilitates capability-driven software development by providing:

- **Web UI** - Modern React-based interface with design system
- **Design Service** - Manages design artifacts and versioning
- **Capability Service** - Tracks capabilities, features, and user stories
- **Integration Service** - Connects with external design tools (Figma)
- **Role-Based Access Control** - Granular permission management for all pages
- **Real-time Collaboration** - Workspace sharing and cursor tracking
- **AI Governance** - Configurable AI principles and presets

## Architecture

The application follows a microservices architecture pattern where each service:
- Runs independently in its own container
- Communicates via REST APIs
- Can be scaled independently
- Has its own data store (when needed)

```
┌──────────────────────────────────────────┐
│         Web UI (React + Vite)            │
│     Ford Design System - Port 6173       │
└──────────────────────────────────────────┘
              │
    ┌─────────┼─────────┬─────────┐
    │         │         │         │
┌───▼────┐ ┌──▼──────┐ ┌──▼──────┐ ┌──▼──────┐
│ Design │ │Capability│ │Integration│ │  Auth   │
│Service │ │ Service  │ │  Service  │ │ Service │
│ :9081  │ │  :9082   │ │   :9080   │ │  :9083  │
└────────┘ └────┬─────┘ └─────┬─────┘ └────┬────┘
                │              │             │
           ┌────▼──────────────▼─────────────▼───┐
           │      PostgreSQL Database :6432      │
           └─────────────────────────────────────┘
                              │
                         ┌────▼─────┐
                         │Figma API │
                         └──────────┘
```

## Prerequisites

- Go 1.21 or higher
- Node.js 18+ or 20+ (for Web UI)
- Docker and Docker Compose
- Make (optional, but recommended)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/jareynolds/ubecode.git
cd ubecode
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
FIGMA_TOKEN=your_figma_personal_access_token
```

To get a Figma token:
1. Go to Figma Settings > Account
2. Scroll down to "Personal access tokens"
3. Generate a new token

### 3. Quick Start (Recommended)

Use the provided scripts to start everything:

```bash
# Start all services (backend + web UI)
./start.sh

# Check status of all services
./status.sh

# Stop all services
./stop.sh
```

The start script will:
- ✅ Check prerequisites (Docker, Node.js)
- ✅ Install Web UI dependencies automatically
- ✅ Start PostgreSQL database
- ✅ Start backend services in Docker (Integration, Design, Capability, Auth)
- ✅ Start Node.js API servers (Specification, Collaboration, Shared Workspace)
- ✅ Start Web UI development server (Vite)
- ✅ Display all service URLs and management commands

**See [STARTUP-GUIDE.md](STARTUP-GUIDE.md) for detailed startup documentation and advanced usage.**
**See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and solutions.**

### 4. Build and Run with Docker Compose (Backend Only)

```bash
# Build all services
make docker-build

# Start all services
make docker-up

# View logs
make docker-logs

# Stop all services
make docker-down
```

### 5. Run Web UI Separately

```bash
cd web-ui
npm install
npm run dev
```

### 6. Run Services Locally (Development)

```bash
# Terminal 1 - Integration Service
make run-integration

# Terminal 2 - Design Service
make run-design

# Terminal 3 - Capability Service
make run-capability

# Terminal 4 - Web UI
cd web-ui && npm run dev
```

## Application URLs

After running `./start.sh`, the application will be available at:

### Frontend (Port 6173)

- **Web UI**: `http://localhost:6173/`
- **Dashboard**: `http://localhost:6173/`
- **Workspaces**: `http://localhost:6173/workspaces`
  - Designs: `http://localhost:6173/designs`
  - Ideation: `http://localhost:6173/ideation`
  - Storyboard: `http://localhost:6173/storyboard`
  - System: `http://localhost:6173/system`
  - Capabilities: `http://localhost:6173/capabilities`
  - AI Principles: `http://localhost:6173/ai-principles`
  - UI Framework: `http://localhost:6173/ui-framework`
  - AI Assistant: `http://localhost:6173/ai-chat`
- **Integrations**: `http://localhost:6173/integrations`
- **Settings**: `http://localhost:6173/settings`
- **Admin Panel**: `http://localhost:6173/admin` (Admins only)

## API Endpoints

### Integration Service (Port 9080)

- `GET /health` - Health check
- `GET /figma/files/{fileKey}` - Get Figma file details
- `GET /figma/files/{fileKey}/comments` - Get Figma file comments
- `POST /analyze-application` - Analyze application structure
- `POST /export-ideation` - Export ideation cards

### Design Service (Port 9081)

- `GET /health` - Health check
- `GET /designs` - List designs

### Capability Service (Port 9082)

- `GET /health` - Health check
- `GET /capabilities` - List capabilities

### Auth Service (Port 9083)

- `GET /health` - Health check
- Authentication endpoints (coming soon)

### Node.js APIs

- **Specification API** (Port 4001): `http://localhost:4001/api/health`
- **Collaboration Server** (Port 9084): WebSocket server for real-time collaboration
- **Shared Workspace API** (Port 4002): `http://localhost:4002/api/health`

### Database

- **PostgreSQL** (Port 6432): `localhost:6432` (user: ubecode_user, db: ubecode_db)

## Testing

```bash
# Run all tests
make test

# Run tests with coverage
make test-coverage

# View coverage report (opens in browser)
open coverage.html
```

## Development

### Project Structure

```
ubecode/
├── web-ui/                # React Web UI (NEW)
│   ├── src/
│   │   ├── api/          # Backend API clients
│   │   ├── components/   # Ford Design System components
│   │   ├── context/      # React Context (state management)
│   │   ├── pages/        # Page components
│   │   └── styles/       # Ford Design System CSS
│   ├── package.json
│   └── README.md
├── cmd/                   # Main applications
│   ├── design-service/
│   ├── capability-service/
│   └── integration-service/
├── internal/              # Private application code
│   ├── design/
│   ├── capability/
│   └── integration/
├── pkg/                   # Public library code
│   ├── client/
│   ├── models/
│   └── utils/
├── specifications/        # Capability specifications
├── api/                   # API definitions
├── docs/                  # Documentation
├── scripts/               # Build and utility scripts
├── start.sh              # Start all services
├── stop.sh               # Stop all services
├── docker-compose.yml
├── Dockerfile
├── Makefile
└── go.mod
```

### Code Style

This project follows standard Go conventions:

- Use `gofmt` for formatting
- Use `go vet` for static analysis
- Follow [Effective Go](https://golang.org/doc/effective_go) guidelines
- Document all exported functions and types

### Building

```bash
# Build all services
make build

# Build specific service
go build -o bin/integration-service ./cmd/integration-service
```

### Linting

```bash
# Run linter and formatter
make lint
```

## Documentation

- [Web UI Quick Start](QUICKSTART_WEB_UI.md) - Quick guide to running the Web UI
- [Web UI README](web-ui/README.md) - Detailed Web UI documentation
- [Development Guide](DEVELOPMENT_GUIDE.md) - Comprehensive guide for SAWai capability-driven development
- [Architecture Documentation](docs/architecture/) - Architecture decision records
- [API Documentation](docs/api/) - API specifications
- [Role-Based Access Control](docs/ROLE_BASED_ACCESS_CONTROL.md) - RBAC system documentation
- [Real-time Collaboration](docs/REALTIME_COLLABORATION.md) - Collaboration features
- [Authentication](docs/AUTHENTICATION.md) - Auth system documentation

## SAWai Framework

This project follows the **SAWai (Scaled Agile With AI)** capability-driven approach:

1. **Vision & Themes** - Strategic direction and business objectives
2. **Capabilities** - Higher-level business outcomes spanning multiple epics
3. **Epics** - Large initiatives that define significant deliverables
4. **Implementation Specs** - Detailed specifications for AI-assisted code generation

**Key Difference from Traditional Agile**: In SAWai, the emphasis shifts from sprint velocity to specification quality. With AI handling much of the implementation, well-defined requirements become the primary driver of success.

See [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) for detailed information.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

# UbeCode — Dual Licensed (AGPLv3 or Commercial)

UbeCode is available under a **dual-licensing model**:

### 🔓 Open Source License: AGPLv3
You may use UbeCode under the GNU Affero General Public License v3.
If you modify UbeCode or build a system that uses it and make it available
to others (including over a network), you **must** release your complete
source code under the AGPLv3.

See: LICENSE.AGPL

### 💼 Commercial License
If your company wants to:
- keep its source code proprietary,
- embed UbeCode into closed-source products,
- run UbeCode as part of a SaaS platform without releasing your code,
- receive support, SLA, or custom terms,

you must purchase a **commercial license**.

See: LICENSE.COMMERCIAL
Contact: ubecodesoftware@gmail.com

### ⚠️ You must choose *one* license.
Using UbeCode without complying with AGPLv3 or without a commercial license
is a violation of copyright law.


## Contact


Project Link: [https://github.com/jareynolds/ubecode](https://github.com/jareynolds/ubecode)
Email: ubecodesoftware@gmail.com


## Acknowledgments

- SAWai methodology - Scaled Agile With AI (inspired by SAFe, evolved for AI-assisted development)
- [Figma API](https://www.figma.com/developers/api)
- [Go Programming Language](https://golang.org/)
- [Docker](https://www.docker.com/)
