#!/bin/bash

# Stick Figures Game - Stop Script
echo "Stopping Stick Figures Game..."

# Find and kill the Vite dev server process
VITE_PID=$(lsof -ti:5173)

if [ -z "$VITE_PID" ]; then
    echo "No Vite dev server found running on port 5173"
else
    echo "Stopping Vite dev server (PID: $VITE_PID)..."
    kill $VITE_PID
    echo "Stick Figures Game stopped successfully!"
fi
