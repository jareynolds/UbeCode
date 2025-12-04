#!/bin/bash

# UbeCode macOS Setup Script
# This script installs all dependencies and sets up the UbeCode application on macOS

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    log_error "This script is designed for macOS only"
    exit 1
fi

log_info "Starting UbeCode setup for macOS..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Install Homebrew if not present
log_info "Checking for Homebrew..."
if ! command_exists brew; then
    log_warning "Homebrew not found. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # Add Homebrew to PATH for Apple Silicon Macs
    if [[ $(uname -m) == 'arm64' ]]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi

    log_success "Homebrew installed successfully"
else
    log_success "Homebrew already installed"
    log_info "Updating Homebrew..."
    brew update
fi

# Install Go
log_info "Checking for Go..."
GO_VERSION="1.24"

if ! command_exists go; then
    log_warning "Go not found. Installing Go..."
    brew install go
    log_success "Go installed successfully"
else
    CURRENT_GO_VERSION=$(go version | awk '{print $3}' | sed 's/go//')
    log_success "Go already installed (version: $CURRENT_GO_VERSION)"

    # Check if version meets requirements
    REQUIRED_VERSION="1.21"
    if [[ "$(printf '%s\n' "$REQUIRED_VERSION" "$CURRENT_GO_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]]; then
        log_warning "Go version $CURRENT_GO_VERSION is older than recommended version $REQUIRED_VERSION"
        read -p "Would you like to upgrade Go? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            brew upgrade go
            log_success "Go upgraded successfully"
        fi
    fi
fi

# Display Go version
go version

# Setup GOPATH if not set
if [ -z "$GOPATH" ]; then
    log_info "Setting up GOPATH..."
    export GOPATH="$HOME/go"
    export PATH="$PATH:$GOPATH/bin"

    # Add to shell profile
    if [ -f "$HOME/.zshrc" ]; then
        if ! grep -q "export GOPATH=" "$HOME/.zshrc"; then
            echo 'export GOPATH="$HOME/go"' >> "$HOME/.zshrc"
            echo 'export PATH="$PATH:$GOPATH/bin"' >> "$HOME/.zshrc"
            log_success "GOPATH added to .zshrc"
        fi
    fi
    if [ -f "$HOME/.bash_profile" ]; then
        if ! grep -q "export GOPATH=" "$HOME/.bash_profile"; then
            echo 'export GOPATH="$HOME/go"' >> "$HOME/.bash_profile"
            echo 'export PATH="$PATH:$GOPATH/bin"' >> "$HOME/.bash_profile"
            log_success "GOPATH added to .bash_profile"
        fi
    fi
fi

# Install Docker Desktop
log_info "Checking for Docker..."
if ! command_exists docker; then
    log_warning "Docker not found. Installing Docker Desktop..."
    brew install --cask docker
    log_success "Docker Desktop installed"
    log_warning "Please start Docker Desktop from your Applications folder before continuing"
    log_info "Waiting for Docker Desktop to start..."

    # Open Docker Desktop
    open -a Docker

    # Wait for Docker to start
    while ! docker info >/dev/null 2>&1; do
        echo -n "."
        sleep 2
    done
    echo ""
    log_success "Docker is running"
else
    log_success "Docker already installed"

    # Check if Docker daemon is running
    if ! docker info >/dev/null 2>&1; then
        log_warning "Docker daemon is not running. Starting Docker Desktop..."
        open -a Docker

        log_info "Waiting for Docker to start..."
        while ! docker info >/dev/null 2>&1; do
            echo -n "."
            sleep 2
        done
        echo ""
        log_success "Docker is running"
    else
        log_success "Docker daemon is running"
    fi
fi

# Display Docker version
docker --version
docker-compose --version

# Install Make if not present (usually pre-installed on macOS)
log_info "Checking for Make..."
if ! command_exists make; then
    log_warning "Make not found. Installing Command Line Tools..."
    xcode-select --install
    log_success "Command Line Tools installed"
else
    log_success "Make already installed"
fi

# Navigate to project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

log_info "Setting up UbeCode application..."

# Download Go dependencies
log_info "Downloading Go dependencies..."
go mod download
log_success "Go dependencies downloaded"

# Tidy Go modules
log_info "Tidying Go modules..."
go mod tidy
log_success "Go modules tidied"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    log_info "Creating .env file..."
    cat > .env << 'EOF'
# Figma Integration
FIGMA_TOKEN=your_figma_personal_access_token_here

# Service Ports
INTEGRATION_SERVICE_PORT=8080
DESIGN_SERVICE_PORT=8081
CAPABILITY_SERVICE_PORT=8082
EOF
    log_success ".env file created"
    log_warning "Please update the .env file with your Figma personal access token"
    log_info "To get a Figma token:"
    log_info "  1. Go to Figma Settings > Account"
    log_info "  2. Scroll down to 'Personal access tokens'"
    log_info "  3. Generate a new token and add it to the .env file"
else
    log_success ".env file already exists"
fi

# Create bin directory if it doesn't exist
mkdir -p bin

# Install development tools
log_info "Installing Go development tools..."
if ! command -v goimports &> /dev/null; then
    go install golang.org/x/tools/cmd/goimports@latest
    log_success "goimports installed"
else
    log_success "goimports already installed"
fi

# Build the application
log_info "Building all services..."
make build
log_success "All services built successfully"

# Run tests
log_info "Running tests..."
if make test; then
    log_success "All tests passed"
else
    log_warning "Some tests failed. Please review the output above."
fi

# Summary
echo ""
echo "=========================================="
log_success "UbeCode setup complete!"
echo "=========================================="
echo ""
log_info "Installed components:"
echo "  ✓ Homebrew (package manager)"
echo "  ✓ Go $(go version | awk '{print $3}' | sed 's/go//')"
echo "  ✓ Docker $(docker --version | awk '{print $3}' | sed 's/,//')"
echo "  ✓ Docker Compose $(docker-compose --version | awk '{print $3}' | sed 's/,//')"
echo "  ✓ Make"
echo "  ✓ Go development tools"
echo ""
log_info "Next steps:"
echo "  1. Update the .env file with your Figma token (if needed)"
echo "  2. Start services with Docker: make docker-up"
echo "  3. Or run services locally:"
echo "     - make run-integration  (Terminal 1)"
echo "     - make run-design       (Terminal 2)"
echo "     - make run-capability   (Terminal 3)"
echo ""
log_info "Useful commands:"
echo "  make help           - Show all available commands"
echo "  make docker-up      - Start all services with Docker"
echo "  make docker-down    - Stop all services"
echo "  make docker-logs    - View service logs"
echo "  make test           - Run tests"
echo "  make build          - Build all services"
echo ""
log_info "Service ports:"
echo "  Integration Service: http://localhost:8080"
echo "  Design Service:      http://localhost:8081"
echo "  Capability Service:  http://localhost:8082"
echo ""
log_success "Happy coding!"
