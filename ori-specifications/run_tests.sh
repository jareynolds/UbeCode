#!/bin/bash

# DELM API Test Runner

cd "$(dirname "$0")"

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
    python test_api.py
else
    echo "Virtual environment not found. Run ./start.sh first to set up the environment."
    exit 1
fi
