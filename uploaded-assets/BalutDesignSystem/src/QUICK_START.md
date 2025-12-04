# Quick Start Guide - 5 Minutes

The fastest way to integrate this design system into your project.

## 🚀 Quick Integration (3 Steps)

### Step 1: Install Dependencies (2 minutes)

```bash
npm install lucide-react class-variance-authority clsx tailwind-merge @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip cmdk sonner@2.0.3 vaul embla-carousel-react react-day-picker date-fns input-otp react-resizable-panels
```

### Step 2: Copy Files (1 minute)

Copy these folders to your project:

```
✅ components/ui/     → your-project/src/components/ui/
✅ styles/globals.css → your-project/src/styles/globals.css
```

### Step 3: Import Global Styles (1 minute)

In your main app file (`App.tsx`, `main.tsx`, or `_app.tsx`):

```tsx
import './styles/globals.css';
```

**Done!** Start using components:

```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

function App() {
  return (
    <Card className="p-6">
      <Button className="bg-blue-500 hover:bg-blue-600">
        Click Me
      </Button>
    </Card>
  );
}
```

## 🎨 Color Cheat Sheet

### Quick Color Classes

```tsx
// Primary (Grey)
<Button>Default Button</Button>
<div className="bg-grey-900 text-white">Dark Background</div>

// Secondary (Blue) 
<Button className="bg-blue-500 hover:bg-blue-600">Blue Button</Button>
<div className="bg-blue-100 text-blue-900">Info Box</div>

// Accent (Orange)
<Button className="bg-orange-500 hover:bg-orange-600">CTA Button</Button>
<Badge className="bg-orange-500">Hot</Badge>
```

## 📦 Most Used Components

```tsx
// Buttons
import { Button } from '@/components/ui/button';
<Button>Click</Button>
<Button variant="outline">Outline</Button>
<Button className="bg-blue-500">Blue</Button>

// Cards
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>

// Inputs
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>

// Badges
import { Badge } from '@/components/ui/badge';
<Badge>Default</Badge>
<Badge className="bg-orange-500">New</Badge>

// Alerts
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>Important message here</AlertDescription>
</Alert>
```

## 📐 Common Patterns

### Form Layout
```tsx
<div className="space-y-4">
  <div className="space-y-2">
    <Label>Field Label</Label>
    <Input placeholder="Enter value..." />
  </div>
  <Button className="w-full">Submit</Button>
</div>
```

### Grid Layout
```tsx
<div className="grid md:grid-cols-3 gap-6">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</div>
```

### Stat Cards
```tsx
<Card className="p-6">
  <p className="text-sm text-grey-600">Total Sales</p>
  <div className="text-2xl mt-2">$12,345</div>
  <p className="text-xs text-green-600 mt-1">+20% from last month</p>
</Card>
```

## 🎯 Pro Tips

1. **Don't add font size/weight classes** - Typography is automatic
2. **Use `space-y-*` for vertical spacing** - `<div className="space-y-4">`
3. **Icons from lucide-react** - `import { Mail } from 'lucide-react'`
4. **Responsive with Tailwind** - `className="grid md:grid-cols-2 lg:grid-cols-3"`

## 📚 Full Documentation

For complete details, see:
- `INTEGRATION_GUIDE.md` - Complete integration instructions
- `DesignSystemShowcase.tsx` - All components with examples
- `DesignTokens.tsx` - Complete design token reference

---

**You're ready to build!** 🎉
