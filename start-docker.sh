#!/bin/bash

# UbeCode - Docker Services Start Script
# Starts all Docker containers (backend services and database)

set -e

echo "🐳 Starting UbeCode Docker Services..."
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "Creating .env from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Created .env file. Please update FIGMA_TOKEN and JWT_SECRET if needed."
    else
        echo "❌ Error: .env.example not found. Creating minimal .env file..."
        cat > .env << 'EOF'
FIGMA_TOKEN=your_figma_personal_access_token
JWT_SECRET=your-secret-key-change-in-production
EOF
        echo "⚠️  Please update .env with your actual tokens."
    fi
    echo ""
fi

# Function to check if Docker is running
check_docker() {
    docker info > /dev/null 2>&1
}

# Check if Docker is running, if not try to start it
echo "🔍 Checking if Docker is available..."
if check_docker; then
    echo "✅ Docker is running"
else
    echo "⚠️  Docker is not running. Attempting to start Docker Desktop..."

    # Try to start Docker Desktop on macOS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open -a Docker 2>/dev/null || {
            echo "❌ Failed to start Docker Desktop."
            echo "Please start Docker Desktop manually and run this script again."
            exit 1
        }

        echo "⏳ Waiting for Docker to start (this may take 1-2 minutes)..."
        MAX_WAIT=120
        WAITED=0

        while ! check_docker; do
            if [ $WAITED -ge $MAX_WAIT ]; then
                echo ""
                echo "❌ Docker did not start within ${MAX_WAIT} seconds."
                echo ""
                echo "Please check:"
                echo "  1. Docker Desktop is installed"
                echo "  2. Check Docker Desktop app for any error messages"
                echo "  3. Try restarting your Mac if Docker won't start"
                echo ""
                echo "You can also manually start Docker Desktop and run this script again."
                exit 1
            fi

            if [ $((WAITED % 10)) -eq 0 ] && [ $WAITED -gt 0 ]; then
                echo " (${WAITED}s)"
                printf "   "
            fi
            printf "."
            sleep 2
            WAITED=$((WAITED + 2))
        done

        echo ""
        echo "✅ Docker is now running"
    else
        echo ""
        echo "⚠️  Docker is not running."
        echo ""
        echo "To start Docker:"
        echo "  macOS:   open -a Docker"
        echo "  Linux:   sudo systemctl start docker"
        echo ""
        echo "After Docker starts, run this script again."
        echo ""
        exit 1
    fi
fi

# Define required services
REQUIRED_SERVICES="postgres auth-service capability-service design-service integration-service"

# Build Docker images
echo ""
echo "📦 Building Docker images..."
docker-compose build

# Start services
echo ""
echo "🚀 Starting Docker containers..."
docker-compose up -d

# Function to check if a service is healthy
check_service_health() {
    local service=$1
    local status=$(docker-compose ps --format json $service 2>/dev/null | grep -o '"Health":"[^"]*"' | cut -d'"' -f4)
    if [ "$status" == "healthy" ]; then
        return 0
    fi
    # Also check if service is running (for services without health checks)
    local running=$(docker-compose ps --format json $service 2>/dev/null | grep -o '"State":"[^"]*"' | cut -d'"' -f4)
    if [ "$running" == "running" ]; then
        return 0
    fi
    return 1
}

# Function to check if a service is running
check_service_running() {
    local service=$1
    local state=$(docker-compose ps $service 2>/dev/null | grep -E "Up|running" | wc -l)
    [ "$state" -gt 0 ]
}

# Wait for all services to be healthy
echo ""
echo "⏳ Waiting for all services to be healthy..."
MAX_WAIT=120
WAITED=0
ALL_HEALTHY=false

while [ $WAITED -lt $MAX_WAIT ]; do
    ALL_HEALTHY=true
    UNHEALTHY_SERVICES=""

    for service in $REQUIRED_SERVICES; do
        if ! check_service_running $service; then
            ALL_HEALTHY=false
            UNHEALTHY_SERVICES="$UNHEALTHY_SERVICES $service"
        fi
    done

    if $ALL_HEALTHY; then
        break
    fi

    if [ $((WAITED % 10)) -eq 0 ] && [ $WAITED -gt 0 ]; then
        echo "   Still waiting for:$UNHEALTHY_SERVICES (${WAITED}s)"
    fi

    sleep 2
    WAITED=$((WAITED + 2))
done

# Final status check
echo ""
echo "🔍 Docker Service Status:"
docker-compose ps

# Check for any failed services
FAILED_SERVICES=""
for service in $REQUIRED_SERVICES; do
    if ! check_service_running $service; then
        FAILED_SERVICES="$FAILED_SERVICES $service"
    fi
done

if [ -n "$FAILED_SERVICES" ]; then
    echo ""
    echo "⚠️  Warning: Some services failed to start:$FAILED_SERVICES"
    echo ""
    echo "Attempting to restart failed services..."
    for service in $FAILED_SERVICES; do
        echo "   Restarting $service..."
        docker-compose up -d $service
    done
    sleep 5

    # Check again
    STILL_FAILED=""
    for service in $FAILED_SERVICES; do
        if ! check_service_running $service; then
            STILL_FAILED="$STILL_FAILED $service"
        fi
    done

    if [ -n "$STILL_FAILED" ]; then
        echo ""
        echo "❌ Services still failing:$STILL_FAILED"
        echo "   Check logs with: docker-compose logs <service-name>"
    else
        echo "✅ All services restarted successfully!"
    fi
fi

echo ""
echo "✅ Docker services are running!"
echo ""
echo "📍 Service URLs:"
echo "   - PostgreSQL:          localhost:6432"
echo "   - Auth Service:        http://localhost:9083/health"
echo "   - Integration Service: http://localhost:9080/health"
echo "   - Design Service:      http://localhost:9081/health"
echo "   - Capability Service:  http://localhost:9082/health"
echo ""
echo "🔐 Database Credentials:"
echo "   - Host:     localhost"
echo "   - Port:     6432"
echo "   - Database: ubecode_db"
echo "   - Username: ubecode_user"
echo "   - Password: ubecode_password"
echo ""
echo "📝 View all logs:             docker-compose logs -f"
echo "📝 View specific service:     docker-compose logs -f <service-name>"
echo "   Available services: postgres, auth-service, integration-service, design-service, capability-service"
echo ""
echo "🛑 Stop Docker services:      ./stop-docker.sh"
echo "🗑️  Stop and remove volumes:  docker-compose down -v"
echo ""
echo "💡 To start the complete application (Docker + Web UI), use:"
echo "   ./start.sh"
echo ""
