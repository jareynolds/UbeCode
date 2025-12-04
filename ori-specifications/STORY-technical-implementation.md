# Technical Implementation

**Status:** pending


### Key Changes

**File**: `src/context/WorkspaceContext.tsx`
- Line 11: Added `ideationTags: string[]` to StoryCard

**File**: `src/pages/Storyboard.tsx`
- Lines 9-21: Added `getAllIdeationTags()` function
- Lines 14-20: Extended cardFormData with ideationTags
- Lines 46, 56, 66: Added ideationTags: [] to default cards
- Lines 237, 251: Updated form reset with ideationTags
- Lines 267: Added ideationTags to new card creation
- Lines 867-925: Added tag selection UI in dialog
- Lines 740-746: Added tag display on cards
- Lines 1073-1088: Added CSS for card tags

### State Flow

```
Ideation Canvas
    ↓ (tags on blocks)
Workspace Context (ideation.textBlocks[].tags)
    ↓ (load)
getAllIdeationTags()
    ↓ (extract & dedupe)
Tag Selection UI
    ↓ (user selects)
cardFormData.ideationTags
    ↓ (save)
StoryCard.ideationTags
    ↓ (display)
Card Badge UI
```

### Performance Considerations

**Tag Extraction**:
- O(n) iteration over ideation blocks
- Set for automatic deduplication
- Sorted once per render
- Memoization not needed (small datasets)

**Rendering**:
- Conditional rendering prevents empty UI
- No virtualization needed
- Standard React reconciliation
