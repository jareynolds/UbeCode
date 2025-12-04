#!/bin/bash

# UbeCode - Start Script
# Starts all microservices and web UI

set -e

echo "🚀 Starting UbeCode Application..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "Creating .env from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Created .env file. Please update FIGMA_TOKEN if needed."
    else
        echo "❌ Error: .env.example not found. Creating minimal .env file..."
        echo "FIGMA_TOKEN=your_figma_personal_access_token" > .env
        echo "⚠️  Please update .env with your actual Figma token."
    fi
fi

# Check if web-ui .env file exists
if [ ! -f web-ui/.env ]; then
    echo "⚠️  Warning: web-ui/.env file not found!"
    if [ -f web-ui/.env.example ]; then
        cp web-ui/.env.example web-ui/.env
        echo "✅ Created web-ui/.env file."
    fi
fi

# Check if Docker is running
echo "🔍 Checking if Docker is available..."
if docker info > /dev/null 2>&1; then
    DOCKER_AVAILABLE=true
    echo "✅ Docker is running"
else
    echo ""
    echo "⚠️  Docker is not running or not installed."
    echo ""
    echo "Options:"
    echo "  1. Start Docker Desktop and run ./start.sh again"
    echo "  2. Use ./start-dev.sh for development without Docker"
    echo ""
    echo "💡 For frontend-only development, run:"
    echo "   ./start-dev.sh"
    echo ""
    exit 1
fi

# Check if Node.js is installed
if ! command -v node > /dev/null 2>&1; then
    echo "❌ Error: Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Install web UI dependencies if needed
if [ ! -d "web-ui/node_modules" ]; then
    echo "📦 Installing Web UI dependencies..."
    cd web-ui
    npm install
    cd ..
fi

# Build and start backend services
echo "📦 Building Docker images..."
docker-compose build

echo "🔄 Starting backend services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be healthy..."
sleep 5

# Check service health
echo ""
echo "🔍 Backend Service Status:"
docker-compose ps

# Start API server for markdown export in background
echo ""
echo "📄 Starting Specification API Server..."
cd web-ui
npm run server > ../api-server.log 2>&1 &
API_SERVER_PID=$!
echo $API_SERVER_PID > ../api-server.pid
cd ..

echo "⏳ Waiting for API Server to start..."
sleep 2

# Start collaboration server for real-time features in background
echo ""
echo "🔗 Starting Collaboration Server..."
cd web-ui
npm run collab-server > ../collab-server.log 2>&1 &
COLLAB_SERVER_PID=$!
echo $COLLAB_SERVER_PID > ../collab-server.pid
cd ..

echo "⏳ Waiting for Collaboration Server to start..."
sleep 2

# Start web UI in background
echo ""
echo "🌐 Starting Web UI..."
cd web-ui
npm run dev > ../web-ui.log 2>&1 &
WEB_UI_PID=$!
echo $WEB_UI_PID > ../web-ui.pid
cd ..

echo "⏳ Waiting for Web UI to start..."
sleep 3

echo ""
echo "✅ UbeCode is running!"
echo ""
echo "📍 Service URLs:"
echo "   - Web UI:              http://localhost:5173"
echo "   - Specification API:   http://localhost:3001/api/health"
echo "   - Collaboration API:   http://localhost:8084/api/health"
echo "   - Auth Service:        http://localhost:8083/health"
echo "   - Integration Service: http://localhost:8080/health"
echo "   - Design Service:      http://localhost:8081/health"
echo "   - Capability Service:  http://localhost:8082/health"
echo ""
echo "🔐 Default Admin Login:"
echo "   - Email:    admin@ubecode.local"
echo "   - Password: admin123"
echo "   - ⚠️  Change password after first login!"
echo ""
echo "📝 View backend logs:         docker-compose logs -f"
echo "📝 View auth service logs:    docker-compose logs -f auth-service"
echo "📝 View web UI logs:          tail -f web-ui.log"
echo "📝 View API server logs:      tail -f api-server.log"
echo "📝 View collaboration logs:   tail -f collab-server.log"
echo "🛑 Stop all services:         ./stop.sh"
echo ""
echo "💡 Tip: Use the Storyboard 'Export to Markdown' button to save specifications"
echo "📚 Authentication docs:     docs/AUTHENTICATION.md"
echo ""
