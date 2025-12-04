#!/bin/bash

# Rename specification files to use CAP- and ENB- prefixes
# Usage: ./scripts/rename-specs.sh [directory]
#        If no directory specified, uses current directory

DIR="${1:-.}"

echo "Renaming files in: $DIR"
echo ""

# Rename *-capability.md to CAP-*.md
for f in "$DIR"/*-capability.md; do
    [ -e "$f" ] || continue
    dir=$(dirname "$f")
    filename=$(basename "$f")
    base="${filename%-capability.md}"
    mv "$f" "$dir/CAP-${base}.md"
    echo "Renamed: $filename -> CAP-${base}.md"
done

# Rename *-enabler.md to ENB-*.md
for f in "$DIR"/*-enabler.md; do
    [ -e "$f" ] || continue
    dir=$(dirname "$f")
    filename=$(basename "$f")
    base="${filename%-enabler.md}"
    mv "$f" "$dir/ENB-${base}.md"
    echo "Renamed: $filename -> ENB-${base}.md"
done

echo ""
echo "Done."
