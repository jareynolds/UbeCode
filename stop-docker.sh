#!/bin/bash

# UbeCode - Docker Services Stop Script
# Stops all Docker containers (backend services and database)

echo "🐳 Stopping UbeCode Docker Services..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "⚠️  Warning: Docker is not running."
    echo "No Docker containers to stop."
    exit 0
fi

# Define all services
ALL_SERVICES="postgres auth-service capability-service design-service integration-service"

# Check if any containers are running
RUNNING_CONTAINERS=$(docker compose ps -q 2>/dev/null)
if [ -z "$RUNNING_CONTAINERS" ]; then
    echo "ℹ️  No Docker containers are currently running."
    exit 0
fi

# Show current status before stopping
echo "🔍 Current Docker Service Status:"
docker compose ps
echo ""

# Stop all services gracefully
echo "🛑 Stopping all Docker containers..."
docker compose stop

# Verify all services are stopped
echo ""
echo "🔍 Verifying all services are stopped..."
STILL_RUNNING=""
for service in $ALL_SERVICES; do
    if docker compose ps $service 2>/dev/null | grep -qE "Up|running"; then
        STILL_RUNNING="$STILL_RUNNING $service"
    fi
done

if [ -n "$STILL_RUNNING" ]; then
    echo "⚠️  Some services still running:$STILL_RUNNING"
    echo "   Force stopping..."
    docker compose kill
fi

# Remove containers (but keep volumes and images)
echo ""
echo "🗑️  Removing stopped containers..."
docker compose rm -f

echo ""
echo "✅ All Docker services stopped successfully!"
echo ""
echo "📊 Cleanup options:"
echo "   🗑️  Remove volumes (database data):  docker compose down -v"
echo "   🗑️  Remove images:                   docker compose down --rmi all"
echo "   🗑️  Full cleanup:                    docker compose down --rmi all -v"
echo ""
echo "💡 To restart Docker services, run: ./start-docker.sh"
echo "💡 To restart all services, run:    ./start.sh"
echo ""
