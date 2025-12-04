# Design System Integration Guide

This guide explains how to export and integrate this design system into your web application.

## 📦 What You Need to Export

### Required Files and Folders

```
Your Project/
├── components/
│   └── ui/                    # ✅ REQUIRED - All UI components
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       ├── tooltip.tsx
│       └── utils.ts          # ✅ REQUIRED - Utility functions
│
└── styles/
    └── globals.css            # ✅ REQUIRED - All design tokens and styles
```

### Optional Files (Reference/Documentation)

```
├── components/
│   ├── DesignSystemShowcase.tsx   # 📚 Reference - Component showcase
│   ├── DesignTokens.tsx           # 📚 Reference - Token documentation
│   ├── IconShowcase.tsx           # 📚 Reference - Icon library
│   └── RealWorldExamples.tsx      # 📚 Reference - Usage examples
└── App.tsx                        # 📚 Reference - Example app structure
```

## 🚀 Step-by-Step Integration

### Step 1: Install Required Dependencies

In your project, install these npm packages:

```bash
npm install lucide-react
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-accordion
npm install @radix-ui/react-alert-dialog
npm install @radix-ui/react-aspect-ratio
npm install @radix-ui/react-avatar
npm install @radix-ui/react-checkbox
npm install @radix-ui/react-collapsible
npm install @radix-ui/react-context-menu
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-hover-card
npm install @radix-ui/react-label
npm install @radix-ui/react-menubar
npm install @radix-ui/react-navigation-menu
npm install @radix-ui/react-popover
npm install @radix-ui/react-progress
npm install @radix-ui/react-radio-group
npm install @radix-ui/react-scroll-area
npm install @radix-ui/react-select
npm install @radix-ui/react-separator
npm install @radix-ui/react-slider
npm install @radix-ui/react-switch
npm install @radix-ui/react-tabs
npm install @radix-ui/react-toast
npm install @radix-ui/react-toggle
npm install @radix-ui/react-toggle-group
npm install @radix-ui/react-tooltip
npm install cmdk
npm install sonner@2.0.3
npm install vaul
npm install embla-carousel-react
npm install react-day-picker date-fns
npm install input-otp
npm install react-resizable-panels
```

Or install all at once:

```bash
npm install lucide-react class-variance-authority clsx tailwind-merge @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip cmdk sonner@2.0.3 vaul embla-carousel-react react-day-picker date-fns input-otp react-resizable-panels
```

### Step 2: Set Up Tailwind CSS

Ensure your project has Tailwind CSS v4.0 or higher installed.

**tailwind.config.js** (if using Tailwind v3):
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Grey scale
        grey: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Blue scale
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Orange scale
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
```

### Step 3: Copy Files to Your Project

1. **Copy the `components/ui/` folder** to your project:
   ```
   your-project/src/components/ui/
   ```

2. **Copy `styles/globals.css`** to your project:
   ```
   your-project/src/styles/globals.css
   ```
   Or merge the CSS variables and styles into your existing global CSS file.

3. **Import globals.css** in your main app file (e.g., `App.tsx`, `main.tsx`, or `_app.tsx`):
   ```tsx
   import './styles/globals.css';
   ```

### Step 4: Update Import Paths (If Needed)

If your project structure is different, you may need to update import paths in the component files. For example:

**In component files**, change:
```tsx
import { cn } from "./utils"
```

To match your structure:
```tsx
import { cn } from "@/components/ui/utils"
// or
import { cn } from "~/components/ui/utils"
```

You can use path aliases in your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 💡 How to Use Components

### Basic Usage Example

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <Button className="w-full bg-blue-500 hover:bg-blue-600">
            Sign In
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Using the Color System

```tsx
// Primary (Grey)
<Button>Default Grey Button</Button>
<div className="bg-grey-900 text-white p-4">Dark section</div>

// Secondary (Blue)
<Button className="bg-blue-500 hover:bg-blue-600">Blue Button</Button>
<div className="bg-blue-100 text-blue-900 p-4">Info section</div>

// Accent (Orange)
<Button className="bg-orange-500 hover:bg-orange-600">CTA Button</Button>
<Badge className="bg-orange-500">New</Badge>

// Using design tokens
<div className="text-grey-600">Secondary text</div>
<div className="border-grey-200">Bordered element</div>
```

### Using Icons

```tsx
import { Mail, Calendar, Settings } from 'lucide-react';

function MyComponent() {
  return (
    <div>
      <Button>
        <Mail className="mr-2 h-4 w-4" />
        Send Email
      </Button>
      
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-500" />
        <span>Schedule Meeting</span>
      </div>
    </div>
  );
}
```

## 🎨 Color Reference

### Primary - Grey
- `grey-50` to `grey-900` - Use for backgrounds, text, borders
- Main brand color, neutral and professional

### Secondary - Blue  
- `blue-100` to `blue-900` - Use for interactive elements, links, info states
- `bg-blue-500 hover:bg-blue-600` - Standard blue button

### Accent - Orange
- `orange-100` to `orange-900` - Use for CTAs, warnings, highlights
- `bg-orange-500 hover:bg-orange-600` - Standard CTA button

### Supporting Colors
- `black` (#000000) - Deep contrast
- `white` (#ffffff) - Clean backgrounds

## 📐 Spacing & Layout

Use Tailwind's spacing scale:
- `p-4` (16px), `m-6` (24px), `gap-3` (12px)
- Common: `space-y-4`, `space-x-2`, `gap-6`

Border radius:
- `rounded-lg` - Cards, large elements (8px)
- `rounded-md` - Medium elements (6px)
- `rounded` - Small elements (4px)

## 🎯 Best Practices

1. **Typography**: Don't use font size/weight classes unless needed - they're set automatically
2. **Colors**: Use semantic color classes (`grey-`, `blue-`, `orange-`)
3. **Components**: Import only what you need to keep bundle size small
4. **Consistency**: Stick to the design tokens for spacing, colors, and typography
5. **Accessibility**: All components are accessible by default - don't remove ARIA attributes

## 📚 Reference Files

Keep these files for reference:
- `DesignSystemShowcase.tsx` - See all components in action
- `DesignTokens.tsx` - Complete token reference
- `IconShowcase.tsx` - Browse all available icons
- `RealWorldExamples.tsx` - Practical implementation examples

You can run these locally to have a living style guide.

## 🔧 Troubleshooting

### Issue: Components not styled correctly
**Solution**: Make sure `globals.css` is imported in your main app file

### Issue: Import errors
**Solution**: Check that all dependencies are installed and import paths match your structure

### Issue: Tailwind classes not working
**Solution**: Ensure your Tailwind content paths include the component files in `tailwind.config.js`

### Issue: Colors not matching
**Solution**: Verify the CSS variables in `globals.css` are loaded and not overridden

## 📞 Need Help?

Refer to the showcase files to see working examples of every component. Each component is documented with multiple usage examples and variations.

---

**That's it!** You now have a complete, production-ready design system integrated into your application. Happy building! 🚀
