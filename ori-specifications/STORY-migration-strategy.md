# Migration Strategy

**Status:** pending

**Description:** **Backward Compatibility**:


**Backward Compatibility**:
- Existing cards load with empty ideationTags array
- No data migration required
- Default value prevents errors
- Graceful degradation

**Forward Compatibility**:
- Field optional in interface (array default)
- Can extend with metadata later
- Supports additional tag properties
