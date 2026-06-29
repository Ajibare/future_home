# Future Home Properties — Project Development Constitution

> **This document is the single source of truth for all development on this project.**
> Every feature, component, or change must comply with these rules without exception.

---

## Table of Contents

1. [Architecture Rules](#architecture-rules)
2. [Technology Stack](#technology-stack)
3. [UI Rules](#ui-rules)
4. [Motion Rules](#motion-rules)
5. [Responsive Rules](#responsive-rules)
6. [Coding Rules](#coding-rules)
7. [Component Rules](#component-rules)
8. [State Management Rules](#state-management-rules)
9. [Design Consistency Rules](#design-consistency-rules)
10. [Error Prevention Rules](#error-prevention-rules)
11. [Mandatory Development Workflow](#mandatory-development-workflow)
12. [Project File Reference](#project-file-reference)

---

## Architecture Rules

### Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles + Tailwind theme
│   ├── robots.ts           # Robots.txt generation
│   ├── sitemap.ts          # Sitemap generation
│   ├── about/              # About page route
│   ├── blog/               # Blog routes (listing + [slug])
│   ├── contact/            # Contact page route
│   ├── properties/         # Property routes (listing + [id])
│   └── wishlist/           # Wishlist page route
├── components/
│   ├── layout/             # Layout components (Navbar, Footer, LoadingScreen, etc.)
│   ├── property/           # Property-specific components (PropertyCard)
│   ├── ui/                 # Reusable UI primitives (Button, Card, Input, etc.)
│   └── blog/               # Blog-specific components (reserved)
├── constants/              # Static data, navigation, company info
├── hooks/                  # Custom React hooks (reserved)
├── lib/                    # Utility functions (cn, formatCurrency, etc.)
├── providers/              # React context providers (Query, Theme, Loading)
├── schemas/                # Zod validation schemas (reserved)
├── services/               # API services and mock data
├── stores/                 # Zustand stores
├── styles/                 # Additional stylesheets (reserved)
├── types/                  # TypeScript type definitions
└── utils/                  # Additional utilities (reserved)
```

### Import Order

```typescript
// 1. Next.js imports
import Link from "next/link";
import { usePathname } from "next/navigation";

// 2. Third-party libraries
import { motion } from "framer-motion";
import { Heart, Share2 } from "lucide-react";

// 3. Internal packages (stores, providers)
import { usePropertyStore } from "@/stores";
import { ThemeProvider } from "@/providers/theme-provider";

// 4. Components
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property/property-card";

// 5. Utilities and types
import { cn, formatCurrency } from "@/lib/utils";
import type { Property } from "@/types";

// 6. Services
import { propertyService } from "@/services/api";
```

### Export Pattern

- Use **named exports** for all components: `export function Navbar()`
- Use **default exports** only for page components when required by Next.js
- Type files use `export interface` or `export type`

---

## Technology Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 App Router |
| React | React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui patterns (custom) |
| State (Client) | Zustand |
| State (Server) | TanStack React Query |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |
| Icons | Lucide React |
| Notifications | Sonner |
| Carousel | Embla Carousel |
| Utilities | clsx + tailwind-merge |

---

## UI Rules

### Color Palette

#### Primary Brand (Teal)

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-primary-500` | `#14b8b8` | Interactive elements |
| `--color-primary-600` | `#0d9494` | Hover states |
| `--color-primary-700` | `#0c7b7b` | Buttons, primary actions |
| `--color-primary-800` | `#116363` | Active states |
| `--color-primary-900` | `#135151` | Dark accents |

#### Neutrals (Light Mode)

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-light-50` | `#fafafa` | Page backgrounds |
| `--color-light-100` | `#f5f5f5` | Section backgrounds |
| `--color-light-200` | `#e5e5e5` | Borders, dividers |
| `--color-light-300` | `#d4d4d4` | Disabled states |
| `--color-light-400` | `#a3a3a3` | Placeholder text |
| `--color-light-500` | `#737373` | Secondary text |
| `--color-light-600` | `#525252` | Body text |
| `--color-light-700` | `#404040` | Strong text |
| `--color-light-800` | `#262626` | Headings |
| `--color-light-900` | `#171717` | Primary text |

#### Neutrals (Dark Mode)

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-dark-700` | `#334155` | Dark mode borders |
| `--color-dark-800` | `#1e293b` | Dark mode cards |
| `--color-dark-900` | `#0f172a` | Dark mode headers |
| `--color-dark-950` | `#020617` | Dark mode background |

### Typography

| Usage | Font | Class |
|-------|------|-------|
| Display/Headings | Playfair Display | `font-display` |
| Body Text | Inter | `font-sans` (default) |
| Mono/Code | JetBrains Mono | `font-mono` |

### Text Gradient

```css
bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent
```

### Border Radius

| Usage | Value |
|-------|-------|
| Buttons, inputs | `rounded-xl` (12px) |
| Cards | `rounded-2xl` (16px) |
| Modals, large containers | `rounded-3xl` (24px) |
| Small badges | `rounded-full` |

### Shadows

| Variable | Value | Usage |
|----------|-------|-------|
| `--shadow-soft` | `0 2px 15px -3px rgba(0,0,0,0.07)` | Cards, buttons |
| `--shadow-medium` | `0 4px 25px -5px rgba(0,0,0,0.1)` | Hover states |
| `--shadow-large` | `0 10px 40px -10px rgba(0,0,0,0.15)` | Modals, popups |
| `--shadow-glow` | `0 0 30px -5px rgba(12,123,123,0.4)` | Primary button glow |
| `--shadow-glow-lg` | `0 0 60px -10px rgba(12,123,123,0.5)` | Large glow effects |

### Glassmorphism Usage

Apply glass effects sparingly for premium feel:

**Glass Card** — Use for property cards:
```css
.glass-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.5);
  box-shadow: 0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6);
}
```

**Glass Navigation** — Use for scrolled navbar:
```css
.glass-nav {
  background: linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.5) 100%);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255,255,255,0.5);
  box-shadow: 0 4px 30px rgba(0,0,0,0.06);
}
```

### Button Variants

| Variant | Usage |
|---------|-------|
| `default` | Primary actions, CTAs |
| `destructive` | Delete, remove actions |
| `outline` | Secondary actions, ghost buttons |
| `secondary` | Supporting actions |
| `ghost` | Icon buttons, subtle actions |
| `link` | Text links |
| `glass` | Premium glass buttons |

---

## Motion Rules

### Animation Duration

| Type | Duration |
|------|----------|
| Micro-interactions | 200ms |
| Hover effects | 300ms |
| Page transitions | 400-600ms |
| Loading animation | 4800ms (full) |
| Route transition | 600ms |

### Easing

| Usage | Value |
|-------|-------|
| Default | `ease` |
| Enter animations | `[0.4, 0, 0.2, 1]` (ease-out-cubic) |
| Exit animations | `[0.4, 0, 1, 1]` (ease-in) |
| Spring physics | `{ type: "spring", stiffness: 400, damping: 25 }` |

### Standard Animation Patterns

```typescript
// Fade up on scroll
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

// Stagger children
const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-50px" },
};
```

### Hover Effects

- Cards: `whileHover={{ y: -6 }}` with spring transition
- Buttons: `active:scale-[0.97]`
- Icons: Color transition on hover
- Links: Underline on hover

---

## Responsive Rules

### Breakpoints (Mobile-First)

| Breakpoint | Min Width | Class Prefix |
|------------|-----------|--------------|
| Mobile | 0 | (default) |
| Small | 640px | `sm:` |
| Medium | 768px | `md:` |
| Large | 1024px | `lg:` |
| XLarge | 1280px | `xl:` |
| 2XLarge | 1536px | `2xl:` |

### Container

```
max-width: 1400px
padding: 1rem → 1.5rem (sm) → 2rem (lg)
```

### Grid Systems

| Content | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Property cards | 1 col | 2 col | 3 col |
| Blog posts | 1 col | 2 col | 3 col |
| Features | 1 col | 2 col | 3 col |
| Stats | 2 col | 4 col | 4 col |
| Locations | 2 col | 3 col | 4 col |

---

## Coding Rules

### TypeScript

- **Strict mode** is enabled — never use `any`
- All props must have explicit types
- Use `type` for object shapes, `interface` for class-like contracts
- Always type function parameters and return values

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `PropertyCard` |
| Files | PascalCase for components, camelCase for utilities | `property-card.tsx`, `utils.ts` |
| Functions | camelCase | `formatCurrency()` |
| Constants | UPPER_SNAKE_CASE | `COMPANY_NAME` |
| Types/Interfaces | PascalCase | `Property`, `SearchFilters` |
| CSS classes | kebab-case | `glass-card` |
| Stores | camelCase with `use` prefix | `usePropertyStore` |

### Code Quality

- **No inline styles** — use Tailwind classes or CSS modules
- **No duplicated code** — extract reusable logic
- **No magic numbers** — use theme tokens
- **Single responsibility** — each component does one thing
- **Composition over inheritance** — build complex UIs from simple pieces

---

## Component Rules

Every new component must:

1. **Follow the existing design system** — use defined colors, typography, spacing
2. **Support Light and Dark themes** — use semantic color tokens
3. **Be fully responsive** — test at all breakpoints
4. **Include loading and empty states** where applicable
5. **Be accessible** — ARIA labels, keyboard navigation, focus states
6. **Be reusable** — accept props, avoid hardcoding
7. **Use Framer Motion** for animations where appropriate
8. **Match existing spacing and typography** — use defined scales

### Component Template

```typescript
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ComponentNameProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary";
}

export function ComponentName({ children, className, variant = "default" }: ComponentNameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "base-styles",
        variant === "secondary" && "secondary-styles",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
```

---

## State Management Rules

### Zustand (Client State)

Use for:
- Theme state
- UI state (modals, drawers, navigation)
- Property state (wishlist, compare, filters)
- Authentication state
- Notification state

```typescript
// Store pattern
export const useStore = create<State>()(
  persist(
    (set, get) => ({
      // state
      // actions
    }),
    {
      name: "store-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

### TanStack Query (Server State)

Use for:
- Fetching properties
- Fetching blog posts
- Any API calls

```typescript
// Query pattern
const { data, isLoading, error } = useQuery({
  queryKey: ["properties", filters],
  queryFn: () => propertyService.getAll(filters),
});
```

### React Hook Form + Zod (Forms)

Use for:
- Contact forms
- Search filters
- Any user input

```typescript
// Form pattern
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {},
});
```

---

## Design Consistency Rules

Every future page or feature must:

1. **Match the premium aesthetic** — luxury, minimal, elegant
2. **Match spacing** — use consistent padding/margin scales
3. **Match typography** — use defined font families and sizes
4. **Match animations** — use Framer Motion with consistent timing
5. **Match card styles** — use glass-card or consistent card patterns
6. **Match icon styles** — use Lucide React icons consistently
7. **Match interaction patterns** — hover, focus, active states

No page should ever look like it belongs to another project.

---

## Error Prevention Rules

Before implementing any new feature:

1. **Analyze the existing implementation** — understand what exists
2. **Reuse existing components** — check `components/ui/` first
3. **Reuse existing hooks** — check `hooks/` first
4. **Reuse existing utilities** — check `lib/utils.ts` first
5. **Reuse existing animations** — check animation patterns
6. **Reuse existing layouts** — use consistent page structures
7. **Reuse existing styles** — use defined CSS classes
8. **Never duplicate functionality** — extend, don't copy
9. **Never introduce inconsistent UI** — follow the design system
10. **Never break responsiveness** — test at all breakpoints
11. **Never break theme support** — test in both Light and Dark
12. **Never break accessibility** — maintain ARIA and keyboard nav
13. **Never introduce unnecessary dependencies** — use existing stack

---

## Mandatory Development Workflow

For every future request, follow this process:

### 1. Analyze
- Read the relevant existing files
- Identify reusable components, hooks, utilities
- Understand the data flow

### 2. Plan
- Determine which files need changes
- Identify new components needed
- Plan the implementation approach

### 3. Implement
- Follow the existing architecture
- Use existing design tokens
- Write clean, typed TypeScript

### 4. Verify
- [ ] Responsiveness at all breakpoints
- [ ] Light and Dark mode support
- [ ] Animations work smoothly
- [ ] Accessibility (ARIA, keyboard)
- [ ] TypeScript types are correct
- [ ] No linting or build errors
- [ ] Design matches existing language

---

## Project File Reference

### Key Files

| File | Purpose |
|------|---------|
| `src/app/globals.css` | Theme tokens, global styles, animations |
| `src/stores/index.ts` | All Zustand stores |
| `src/lib/utils.ts` | Utility functions |
| `src/types/index.ts` | TypeScript type definitions |
| `src/constants/index.ts` | Static data, navigation items |
| `src/services/mock-data.ts` | Mock data for properties, blog, testimonials |
| `src/services/api.ts` | API service layer |

### Component Library

| Component | Location | Usage |
|-----------|----------|-------|
| `Button` | `components/ui/button.tsx` | All buttons |
| `Card` | `components/ui/card.tsx` | Content containers |
| `Input` | `components/ui/input.tsx` | Form inputs |
| `Textarea` | `components/ui/textarea.tsx` | Multi-line inputs |
| `Select` | `components/ui/select.tsx` | Dropdown selects |
| `Badge` | `components/ui/badge.tsx` | Status badges |
| `Dialog` | `components/ui/dialog.tsx` | Modal dialogs |
| `Drawer` | `components/ui/drawer.tsx` | Side panels |
| `Tabs` | `components/ui/tabs.tsx` | Tab navigation |
| `Accordion` | `components/ui/accordion.tsx` | Collapsible sections |
| `Skeleton` | `components/ui/skeleton.tsx` | Loading placeholders |
| `PropertyCard` | `components/property/property-card.tsx` | Property listings |
| `ThemeSwitcher` | `components/ui/theme-toggle.tsx` | Theme toggle |

### Layout Components

| Component | Location | Usage |
|-----------|----------|-------|
| `Navbar` | `components/layout/navbar.tsx` | Main navigation |
| `Footer` | `components/layout/footer.tsx` | Site footer |
| `SearchModal` | `components/layout/search-modal.tsx` | Global search |
| `LoadingScreen` | `components/layout/loading-screen.tsx` | App loader |
| `FloatingElements` | `components/layout/floating-elements.tsx` | WhatsApp, back-to-top |

---

## Final Rule

**This constitution is permanent.**

Every future modification must comply with these standards. Never introduce code, styling, architecture, or UX that conflicts with this constitution. Treat these rules as mandatory for the remainder of the project, ensuring every future feature integrates seamlessly with the existing codebase and maintains a consistent, high-quality user experience.

---

*Last updated: 2026-06-29*
*Project: Future Home Properties*