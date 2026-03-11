# WhyWorkWithUs Component

A React component featuring an animated rotating star burst graphic synchronized with a feature list. Implements the Figma prototype animations with precise timing and easing.

## 🎨 Figma Design Reference

**Design Link:** https://www.figma.com/design/15WwxZ5EIaEBkmSRgihJ5E/Developer-Submission?node-id=18218-5657&m=dev

## ✨ Features

### Animations Implemented

1. **Rotating Star Burst Background**
   - Continuous 360° rotation
   - Duration: 60 seconds (slow, subtle rotation)
   - Easing: Linear (smooth continuous motion)
   - Never pauses, creates ambient movement

2. **Active Segment Highlighting**
   - Each of 6 segments highlights based on active feature
   - Transition: 0.5s with easeInOut
   - Active segment: Full opacity (1.0) with blue fill (#5865F2)
   - Inactive segments: 30% opacity with light purple stroke

3. **Auto-Cycling Features**
   - Changes active feature every 3 seconds
   - Pauses on hover for user interaction
   - Smooth cycling animation

4. **Chevron Icon Animation**
   - Scale: 1.0 → 1.2 when active
   - X-position: 0 → 5px when active
   - Duration: 0.3s with easeOut
   - Color changes from black to blue (#5865F2)

5. **Title Color Animation**
   - Active title changes to blue (#5865F2)
   - Duration: 0.3s smooth transition

6. **Description Expand/Collapse**
   - AnimatePresence for smooth enter/exit
   - Height: 0 → auto when expanding
   - Opacity: 0 → 1
   - Duration: 0.4s with easeInOut

7. **Staggered Entry Animation**
   - Each feature item fades and slides in
   - Delay: 0.1s per item
   - Creates cascading effect on load

## 📋 Usage

### Basic Usage (Default Data)

```tsx
import WhyWorkWithUs from "@/components/organisms/WhyWorkWithUs";

export default function Page() {
  return <WhyWorkWithUs />;
}
```

### Custom Title

```tsx
<WhyWorkWithUs title="Why Choose Our Team" />
```

### Custom Features

```tsx
const customFeatures = [
  {
    id: 1,
    title: "Expert Developers",
    description: "Our team brings years of experience...",
  },
  {
    id: 2,
    title: "24/7 Support",
    description: "We're always here to help...",
  },
  // ... more features (up to 6 recommended)
];

<WhyWorkWithUs 
  title="Our Advantages"
  features={customFeatures}
/>
```

### With GraphQL Data

```tsx
"use client";

import { useEffect, useState } from "react";
import WhyWorkWithUs from "@/components/organisms/WhyWorkWithUs";

export default function FeaturesSection() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch from your API
      const data = await getFeatures();
      
      const formatted = data.map((item, index) => ({
        id: index + 1,
        title: item.title,
        description: item.description,
      }));
      
      setFeatures(formatted);
    }
    fetchData();
  }, []);

  return <WhyWorkWithUs features={features} />;
}
```

## 🎯 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Why work with us"` | Main heading text |
| `features` | `FeatureItem[]` | Default 6 features | Array of feature objects |

### FeatureItem Type

```typescript
type FeatureItem = {
  id: number;           // Unique identifier
  title: string;        // Feature title (required)
  description?: string; // Optional expandable description
};
```

## 🎬 Animation Details

### Timing Specifications

Based on Figma prototype analysis:

- **Star Rotation**: 60s linear infinite
- **Segment Highlight**: 500ms easeInOut
- **Auto-cycle Interval**: 3000ms (3 seconds)
- **Chevron Animation**: 300ms easeOut
- **Title Color**: 300ms default
- **Description Expand**: 400ms easeInOut
- **Initial Load Stagger**: 100ms delay between items

### Interaction States

1. **Default State**
   - Auto-cycling through features
   - Star rotates continuously
   - First feature active

2. **Hover State**
   - Auto-cycling pauses
   - User can hover features to activate them
   - Animations still smooth and responsive

3. **Active Feature State**
   - Corresponding star segment highlighted
   - Chevron scaled and moved
   - Title colored blue
   - Description (if available) expanded

## 🎨 Design Specifications

### Colors

- **Active/Primary**: `#5865F2` (Blue)
- **Text**: `#0F0F0F` (Near Black)
- **Borders**: `#E5E7FF` (Light Purple)
- **Background**: White

### Typography

- **Heading**: 60px (desktop), 40px (mobile)
  - Font: Montserrat Semibold
  
- **Feature Titles**: 30px (desktop), 24px (mobile)
  - Font: Montserrat Medium
  
- **Descriptions**: 20px
  - Font: Montserrat Regular
  - Line height: 1.7 (relaxed)

### Spacing

- Section padding: 80px vertical (mobile), 128px (desktop)
- Feature item padding: 24px vertical
- Gap between sections: 48px (mobile), 80px (desktop)

## 🔄 Animation Library

This component uses **Framer Motion** for all animations:

```bash
# Already installed in the project
framer-motion: ^12.23.12
```

### Key Framer Motion Features Used

- `motion.div` - Animated containers
- `motion.h2`, `motion.h3` - Animated text
- `motion.svg` - Animated icons
- `AnimatePresence` - Enter/exit animations
- `animate` prop - Declarative animations
- `transition` prop - Animation timing
- `initial` prop - Starting state

## 📱 Responsive Design

- **Mobile (< 768px)**
  - Single column layout
  - Star burst displays above content
  - Smaller text sizes
  - Touch-friendly hover states

- **Tablet (768px - 1024px)**
  - Two column layout begins
  - Medium sizing

- **Desktop (> 1024px)**
  - Full two column layout
  - Maximum star burst size: 600px
  - Optimized spacing

## 🎭 Performance Optimizations

1. **will-change: transform** - Hardware acceleration for rotation
2. **AnimatePresence** - Efficient enter/exit animations
3. **Conditional rendering** - Descriptions only render when active
4. **Cleanup intervals** - Proper useEffect cleanup

## 🔧 Customization

### Change Auto-Cycle Speed

```tsx
// In the component, line ~120
const interval = setInterval(() => {
  setActiveIndex((prev) => (prev + 1) % features.length);
}, 5000); // Change from 3000 to 5000 (5 seconds)
```

### Adjust Star Rotation Speed

```tsx
// In the component, line ~148
transition={{
  duration: 120, // Change from 60 to 120 (slower)
  repeat: Infinity,
  ease: "linear",
}}
```

### Modify Animation Easing

Available easing options:
- `linear` - Constant speed
- `easeIn` - Slow start
- `easeOut` - Slow end
- `easeInOut` - Slow start and end
- `circIn`, `circOut`, `circInOut`
- `backIn`, `backOut`, `backInOut`

## 🐛 Troubleshooting

### Star burst not rotating
- Check if Framer Motion is installed
- Verify no CSS conflicts with `transform`

### Features not auto-cycling
- Ensure the component is client-side (`"use client"`)
- Check browser console for errors
- Verify the interval isn't being cleared

### Animations stuttering
- Reduce the number of features (6 recommended)
- Check for performance issues in DevTools
- Ensure hardware acceleration is enabled

## 🌐 Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (with `-webkit-` prefixes)
- Mobile browsers: Full support with touch events

## 📝 Notes

- The star burst has 6 segments by default (matching 6 features)
- Only one feature can be active at a time
- Descriptions are optional - features without descriptions work fine
- The component is fully keyboard accessible
- Hover states work on touch devices as tap states

## 🎯 Figma Prototype Fidelity

This implementation matches the Figma prototype:
- ✅ Exact color values
- ✅ Precise animation timings
- ✅ Correct easing functions
- ✅ Hover interactions
- ✅ Auto-cycling behavior
- ✅ Typography specifications
- ✅ Layout and spacing
