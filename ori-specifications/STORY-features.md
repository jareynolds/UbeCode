# Features

**Status:** pending


### 1. Tag Selection Interface

**Location**: Add/Edit Story Card Dialog

**UI Components**:
- Section label: "Ideation Tags"
- Empty state message when no tags available
- Multi-select button grid
- Selection counter

**Behavior**:
- Displays all unique tags from workspace ideation
- Click to toggle selection
- Selected tags show checkmark and blue background
- Live count of selected tags
- State persists during edit

**Empty State**:
```
No tags available. Create tags in the Ideation page first.
```

### 2. Tag Display on Cards

**Visual Design**:
- Blue badge (systemBlue background)
- White text
- 11px font size, 500 weight
- 6px border-radius
- 4px + 8px padding

**Layout**:
- Appears below card description
- Above card action buttons
- Flex wrap for multiple tags
- 6px gap between badges

**Conditional Rendering**:
- Only shows if `card.ideationTags.length > 0`
- Hidden when empty array

### 3. Tag Button Styling

**Default State**:
- White background (systemBackground)
- Gray border (systemGray4, 1px)
- Label color text
- 6px border-radius
- 6px + 12px padding

**Selected State**:
- Blue background (systemBlue)
- White text
- No border
- Checkmark prefix (✓)

**Interactive**:
- Smooth transition (0.15s ease)
- Hover states
- Click toggles selection
