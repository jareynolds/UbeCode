#!/bin/bash

# Get Figma token from localStorage equivalent
FIGMA_TOKEN="${FIGMA_TOKEN}"
TEAM_URL="${TEAM_URL:-https://www.figma.com/files/team/1567988176582054443}"

if [ -z "$FIGMA_TOKEN" ]; then
  echo "Please set FIGMA_TOKEN environment variable"
  echo "Example: FIGMA_TOKEN=your_token ./test_api.sh"
  exit 1
fi

echo "Testing Figma API integration..."
echo "Team URL: $TEAM_URL"
echo ""

curl -X POST http://localhost:8080/fetch-resources \
  -H "Content-Type: application/json" \
  -d "{
    \"integration_name\": \"Figma API\",
    \"credentials\": {
      \"access_token\": \"$FIGMA_TOKEN\",
      \"team_url\": \"$TEAM_URL\"
    }
  }" | jq '.'

