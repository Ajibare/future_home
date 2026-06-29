# Future Home Properties

A premium, production-ready real estate platform built with Next.js 15, React 19, and TypeScript. Features a luxury aesthetic with glassmorphism effects, smooth animations, and a professional Light/Dark theme system.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Theme System](#theme-system)
- [Components](#components)
- [Development](#development)
- [Deployment](#deployment)

## Overview

Future Home Properties is a modern real estate platform designed to showcase premium properties across Lagos, Nigeria, and beyond. The application features a elegant, futuristic UI with glassmorphism effects, smooth Framer Motion animations, and a fully responsive design that works seamlessly across all devices.

The platform targets users looking for luxury homes, apartments, commercial properties, and investment opportunities. The design draws inspiration from premium brands like Apple, Airbnb, Vercel, and luxury real estate platforms.

## Features

### Core Functionality

- **Property Listing** — Browse properties with advanced filtering, sorting, and search
- **Property Details** — Comprehensive property pages with image galleries, amenities, and agent contact
- **Blog** — Professional blog with categories, search, and related posts
- **About** — Company story, team profiles, mission, and values
- **Contact** — Contact forms, company information, and social links
- **Wishlist** — Save favorite properties
- **Compare** — Compare up to 4 properties side by side
- **Global Search** — Quick property and article search
- **Responsive Design** — Perfect experience on mobile, tablet, desktop, and large screens

### Premium UI Features

- **Glassmorphism Effects** — Frosted glass navigation, cards, and overlays
- **Smooth Animations** — Framer Motion page transitions and micro-interactions
- **Loading Experience** — Custom house construction animation sequence
- **Theme Toggle** — Professional Light/Dark mode with smooth transitions
- **Skeleton Loaders** — Elegant loading states for all content
- **Form Validation** — React Hook Form with Zod schemas

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 App Router |
| React | React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| State (Client) | Zustand |
| State (Server) | TanStack React Query |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |
| Icons | Lucide React |
| Notifications | Sonner |
| Fonts | Inter, Playfair Display, JetBrains Mono |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd future_home

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles and theme
│   ├── robots.ts           # Robots.txt generation
│   ├── sitemap.ts          # Sitemap generation
│   ├── about/              # About page
│   ├── blog/               # Blog listing and [slug] detail
│   ├── contact/            # Contact page
│   ├── properties/         # Property listing and [id] detail
│   └── wishlist/           # Wishlist page
├── components/
│   ├── layout/             # Navbar, Footer, LoadingScreen, etc.
│   ├── property/           # PropertyCard
│   ├── ui/                 # Button, Card, Input, Badge, etc.
│   └── blog/               # Blog-specific components (reserved)
├── constants/              # Navigation items, company info, static data
├── hooks/                  # Custom React hooks (reserved)
├── lib/                    # Utility functions (cn, formatCurrency, etc.)
├── providers/              # Query, Theme, Loading providers
├── schemas/                # Zod validation schemas (reserved)
├── services/               # API services and mock data
├── stores/                 # Zustand stores (Theme, UI, Property, Auth)
├── types/                  # TypeScript type definitions
└── asset/                  # Remote asset configuration
```

## Design System

### Brand Colors (Primary Teal)

| Shade | Hex | Usage |
|-------|-----|-------|
| 500 | `#14b8b8` | Interactive elements |
| 600 | `#0d9494` | Hover states |
| 700 | `#0c7b7b` | Primary buttons, actions |
| 800 | `#116363` | Active states |
| 900 | `#135151` | Dark accents |

### Typography

| Usage | Font |
|-------|------|
| Display/Headings | Playfair Display |
| Body Text | Inter |
| Mono/Code | JetBrains Mono |

### Border Radius

| Usage | Value |
|-------|-------|
| Buttons, inputs | `rounded-xl` (12px) |
| Cards | `rounded-2xl` (16px) |
| Modals, containers | `rounded-3xl` (24px) |

### Shadows

| Variable | Usage |
|----------|-------|
| `--shadow-soft` | Cards, buttons |
| `--shadow-medium` | Hover states |
| `--shadow-large` | Modals, popups |
| `--shadow-glow` | Primary button glow |

### Glassmorphism Classes

- `.glass-card` — Frosted glass cards
- `.glass-nav` — Frosted glass navigation
- `.glass` — General glass effect
- `.glass-strong` — Stronger glass effect

## Theme System

### Default Theme

**Light Mode** is the default. The theme persists in localStorage.

### Theme Toggle

The theme toggle is located in the navbar. It features:

- Smooth spring animations
- Glassmorphism styling
- Sun/Moon icons with color transitions
- Instant preview with animated background

### Theme Stores

```typescript
// Theme store (Zustand)
const { theme, setTheme, toggleTheme } = useThemeStore();
// theme: "light" | "dark"
```

### Theme Provider

The application uses `next-themes` with a Zustand sync provider:

```typescript
<NextThemesProvider attribute="class" defaultTheme="light">
  <ThemeSync>{children}</ThemeSync>
</NextThemesProvider>
```

### Themeable Styles

All components use semantic color tokens that automatically adapt:

- Light mode: White backgrounds, dark text, subtle borders
- Dark mode: Dark backgrounds, light text, subtle borders

## Components

### UI Components (`components/ui/`)

| Component | Description |
|-----------|-------------|
| `Button` | 7 variants: default, destructive, outline, secondary, ghost, link, glass |
| `Card` | Header, Title, Description, Content, Footer |
| `Input` | With label, error, and hint support |
| `Textarea` | Multi-line input |
| `Select` | Custom dropdown with keyboard navigation |
| `Badge` | Status indicators with color variants |
| `Dialog` | Modal dialog with overlay |
| `Drawer` | Side panel (left, right, bottom) |
| `Tabs` | Tab navigation with animated indicator |
| `Accordion` | Single/multi expand/collapse |
| `Skeleton` | Loading placeholders |

### Layout Components (`components/layout/`)

| Component | Description |
|-----------|-------------|
| `Navbar` | Sticky navigation with glassmorphism, dropdowns, mobile drawer |
| `Footer` | Modern footer with links, newsletter, social icons |
| `SearchModal` | Global search with autocomplete |
| `LoadingScreen` | House construction animation |
| `FloatingElements` | WhatsApp button, back-to-top |
| `ThemeSwitcher` | Light/Dark toggle |

### Feature Components

| Component | Description |
|-----------|-------------|
| `PropertyCard` | Luxury property card with hover actions |

## Development

### Adding New Pages

1. Create folder in `src/app/[route]/`
2. Add `page.tsx` with proper metadata
3. Use existing layout components
4. Follow the design system in `CONSTITUTION.md`

### Adding New Components

1. Place in appropriate `components/` folder
2. Follow the component template in `CONSTITUTION.md`
3. Ensure theme support (Light/Dark)
4. Add responsive breakpoints
5. Include Framer Motion animations where appropriate

### State Management

- **Zustand** for client state (theme, UI, property filters)
- **TanStack Query** for server state (API calls)
- **React Hook Form + Zod** for forms

### Styling

Use Tailwind CSS v4 with the defined theme tokens:

```typescript
// Good — uses theme tokens
<div className="bg-white text-dark-900 border-light-200">

// Bad — hardcoded colors
<div className="bg-[#ffffff] text-[#171717]">
```

For glassmorphism, use the pre-defined classes:

```typescript
<div className="glass-card rounded-2xl">
```

## Deployment

### Build

```bash
npm run build
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Environment Variables

No environment variables are required for the current mock data implementation.

## Documentation

- **CONSTITUTION.md** — Project development standards and rules
- This README — Project overview and setup guide

## License

Private — Future Home Properties

---

Built with precision and care by the Future Home engineering team.