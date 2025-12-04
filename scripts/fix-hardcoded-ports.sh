#!/bin/bash

# Fix Hardcoded Port References Script
# This script updates all hardcoded port 8080 references to 9080 in the frontend code

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
WEB_UI_DIR="$ROOT_DIR/web-ui"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Fix Hardcoded Port References${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if we're in the right directory
if [ ! -d "$WEB_UI_DIR/src" ]; then
    echo -e "${RED}Error: web-ui/src directory not found${NC}"
    exit 1
fi

# Create backup
BACKUP_DIR="$ROOT_DIR/.port-fix-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo -e "${YELLOW}Creating backup in $BACKUP_DIR${NC}"
cp -r "$WEB_UI_DIR/src" "$BACKUP_DIR/"
echo -e "  ${GREEN}✓${NC} Backup created"
echo ""

# Find all files with hardcoded port references
echo -e "${BLUE}Scanning for hardcoded port references...${NC}"
FILES=$(grep -rl "localhost:8080" "$WEB_UI_DIR/src" --include="*.tsx" --include="*.ts" 2>/dev/null || true)

if [ -z "$FILES" ]; then
    echo -e "${GREEN}No hardcoded port 8080 references found!${NC}"
    echo -e "${YELLOW}Everything is already up to date.${NC}"
    rm -rf "$BACKUP_DIR"
    exit 0
fi

COUNT=$(echo "$FILES" | wc -l | tr -d ' ')
echo -e "${YELLOW}Found $COUNT files with hardcoded port 8080${NC}"
echo ""

# Show files that will be updated
echo -e "${BLUE}Files to be updated:${NC}"
echo "$FILES" | while read file; do
    basename "$file"
done
echo ""

# Ask for confirmation
read -p "Update all hardcoded port 8080 references to 9080? [y/N]: " confirm
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Cancelled${NC}"
    rm -rf "$BACKUP_DIR"
    exit 0
fi

echo ""
echo -e "${BLUE}Updating files...${NC}"

# Update each file
UPDATED=0
echo "$FILES" | while read file; do
    if [ -f "$file" ]; then
        sed -i.bak 's/localhost:8080/localhost:9080/g' "$file"
        rm -f "$file.bak"
        echo -e "  ${GREEN}✓${NC} $(basename $file)"
        UPDATED=$((UPDATED + 1))
    fi
done

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Port references updated!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BOLD}Summary:${NC}"
echo "  Updated files: $COUNT"
echo "  Backup location: $BACKUP_DIR"
echo ""
echo -e "${YELLOW}Important:${NC}"
echo "1. The Vite dev server needs to be restarted for changes to take effect"
echo "2. If you're running the app, restart it:"
echo "   ${BLUE}./stop.sh${NC}"
echo "   ${BLUE}./start.sh${NC}"
echo ""
echo -e "${YELLOW}To restore from backup:${NC}"
echo "   ${BLUE}cp -r $BACKUP_DIR/src/* $WEB_UI_DIR/src/${NC}"
echo ""
