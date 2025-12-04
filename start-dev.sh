#!/bin/bash

# UbeCode - Development Start Script (No Docker Required)
# Starts only the frontend services needed for development

set -e

echo "🚀 Starting UbeCode Application (Development Mode)..."
echo ""

# Check if Node.js is installed
if ! command -v node > /dev/null 2>&1; then
    echo "❌ Error: Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if web-ui .env file exists
if [ ! -f web-ui/.env ]; then
    echo "⚠️  Warning: web-ui/.env file not found!"
    if [ -f web-ui/.env.example ]; then
        cp web-ui/.env.example web-ui/.env
        echo "✅ Created web-ui/.env file."
    fi
fi

# Install web UI dependencies if needed
if [ ! -d "web-ui/node_modules" ]; then
    echo "📦 Installing Web UI dependencies..."
    cd web-ui
    npm install
    cd ..
    echo ""
fi

# Kill any existing processes on our ports
echo "🧹 Cleaning up any existing processes..."
pkill -f "npm run server" 2>/dev/null || true
pkill -f "npm run collab-server" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
sleep 1

# Start API server for markdown export in background
echo "📄 Starting Specification API Server (port 3001)..."
cd web-ui
npm run server > ../api-server.log 2>&1 &
API_SERVER_PID=$!
echo $API_SERVER_PID > ../api-server.pid
cd ..

echo "⏳ Waiting for API Server to start..."
sleep 2

# Check if collab-server script exists
if grep -q "collab-server" web-ui/package.json 2>/dev/null; then
    # Start collaboration server for real-time features in background
    echo "🔗 Starting Collaboration Server (port 8084)..."
    cd web-ui
    npm run collab-server > ../collab-server.log 2>&1 &
    COLLAB_SERVER_PID=$!
    echo $COLLAB_SERVER_PID > ../collab-server.pid
    cd ..

    echo "⏳ Waiting for Collaboration Server to start..."
    sleep 2
fi

# Start web UI in background
echo "🌐 Starting Web UI (port 5173)..."
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

# Only show collab server if it's running
if [ -f collab-server.pid ]; then
    echo "   - Collaboration API:   http://localhost:8084/api/health"
fi

echo ""
echo "ℹ️  Note: Running in development mode (Docker services not started)"
echo "   Backend microservices (Integration, Design, Capability) are not running."
echo "   These are optional for frontend development."
echo ""
echo "📝 View web UI logs:          tail -f web-ui.log"
echo "📝 View API server logs:      tail -f api-server.log"

if [ -f collab-server.pid ]; then
    echo "📝 View collaboration logs:   tail -f collab-server.log"
fi

echo "🛑 Stop all services:         ./stop.sh"
echo ""
echo "💡 Tip: Use the Storyboard 'Export to Markdown' button to save specifications"
echo ""
