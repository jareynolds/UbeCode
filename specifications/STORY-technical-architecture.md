# Technical Architecture

**Status:** pending


### Data Model Extension

#### Updated StoryCard Interface
```typescript
interface StoryCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  x: number;
  y: number;
  status: 'pending' | 'in-progress' | 'completed';
  ideationTags: string[];  // NEW FIELD
}
```

**Migration**: Existing cards default to empty array `[]`

### Component Changes

#### Storyboard.tsx Updates

**New Function**: `getAllIdeationTags()`
```typescript
const getAllIdeationTags = (): string[] => {
  if (!currentWorkspace?.ideation) return [];

  const allTags = new Set<string>();
  currentWorkspace.ideation.textBlocks.forEach(block => {
    block.tags.forEach(tag => allTags.add(tag));
  });
  currentWorkspace.ideation.imageBlocks.forEach(block => {
    block.tags.forEach(tag => allTags.add(tag));
  });

  return Array.from(allTags).sort();
};
```

**Form State Extension**:
```typescript
const [cardFormData, setCardFormData] = useState({
  title: '',
  description: '',
  imageUrl: '',
  status: 'pending' as StoryCard['status'],
  ideationTags: [] as string[],  // NEW
});
```
