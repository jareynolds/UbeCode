# Testing Scenarios

**Status:** pending


### Functional Tests

1. **Tag Selection**
   - No tags → Shows empty state
   - Has tags → Shows button grid
   - Click tag → Toggles selection
   - Save → Tags persist on card

2. **Tag Display**
   - Card with tags → Shows badges
   - Card without tags → No badges section
   - Multiple tags → Wraps correctly
   - Edit card → Preserves tags

3. **Cross-Workspace**
   - Switch workspace → Different tags available
   - Create tag in ideation → Immediately available in storyboard
   - Delete ideation block → Tags remain on cards

### Edge Cases

1. All tags selected
2. No tags selected
3. Single tag
4. Many tags (10+)
5. Long tag names
6. Special characters in tags
7. Empty ideation canvas
8. Deleted ideation items with tags
