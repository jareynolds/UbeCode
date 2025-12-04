#!/bin/bash

# Stick Figures Game - Start Script
echo "Starting Stick Figures Game..."

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the development server
echo "Starting Vite development server..."
npm run dev
