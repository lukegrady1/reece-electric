# Technology Stack

**Analysis Date:** 2026-03-04

## Languages

**Primary:**
- TypeScript 5.4.5 - Complete type safety across application (src/, tsconfig.json with strict mode enabled)

**Styling:**
- CSS 3 - Custom properties (CSS variables) + Tailwind utilities

## Runtime

**Environment:**
- Node.js (inferred from package manager and build tools)

**Package Manager:**
- npm - Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 18.3.1 - UI framework with Strict Mode
- Vite 5.2.11 - Build tool and dev server (`vite.config.ts`)

**Routing:**
- React Router v6.23.1 - Client-side routing with lazy code splitting (`src/App.tsx` uses React.lazy())

**Styling:**
- Tailwind CSS 3.4.3 - Utility-first CSS framework with custom theme extending via CSS variables (`tailwind.config.ts`)
- PostCSS 8.4.38 - CSS processing pipeline (`postcss.config.js` includes autoprefixer)
- Autoprefixer 10.4.19 - Vendor prefix automation

**SEO & Meta Management:**
- React Helmet Async 2.0.4 - Per-page meta tags, title management, and JSON-LD schema injection (`src/components/ui/SEOHead.tsx`)

**Form Handling:**
- React Hook Form 7.51.3 - Lightweight form validation and state management (src/pages/Contact.tsx)

**Animation:**
- Framer Motion 11.0.0 - React motion library for page transitions and section reveals

**Icons:**
- Lucide React 0.378.0 - Icon library (used in Contact page for Phone, Mail, MapPin, Clock icons)

## Build Configuration

**Build Tool:**
- Vite (`vite.config.ts`) - Configured with React plugin and manual chunk splitting:
  - `vendor` chunk: react, react-dom, react-router-dom
  - `motion` chunk: framer-motion
  - Enables efficient code splitting for production

**Compilation:**
- TypeScript compiler (tsc) - Runs before Vite build (`npm run build`)

## Type System Configuration

**TypeScript (src/tsconfig.json):**
- Target: ES2020
- Module: ESNext
- Strict mode: Enabled (strict: true)
- JSX: react-jsx (automatic JSX runtime)
- Unused variable/parameter checking: Enabled (noUnusedLocals, noUnusedParameters)
- Path resolution: bundler strategy with allowImportingTsExtensions

## Fonts (Loaded Client-Side)

All fonts loaded via Google Fonts in `index.html` with `display=swap`:

- **Playfair Display** (weights: 700, 900; italic variants) - Display/headings
- **Crimson Pro** (weights: 400, 600; italic variants) - Body text
- **Barlow** (weights: 400, 500, 600) - UI labels and annotations

## Development Tools

**Linting:**
- ESLint 8.57.0 - Code quality rules
- @typescript-eslint/parser 7.8.0 - TypeScript parsing
- @typescript-eslint/eslint-plugin 7.8.0 - TypeScript-specific rules
- eslint-plugin-react-refresh 0.4.6 - React Fast Refresh integration
- eslint-plugin-react-hooks 4.6.2 - React Hooks best practices

Configuration: No `.eslintrc` found — using package.json lint script

**Type Definitions:**
- @types/react 18.3.1
- @types/react-dom 18.3.0

## Scripts

```bash
npm run dev        # Start Vite dev server with Hot Module Replacement
npm run build      # Run TypeScript check + Vite build for production
npm run lint       # Run ESLint with max-warnings 0 (fails on any warnings)
npm run preview    # Preview production build locally
```

## Assets & Static Files

**Public Directory:**
- `public/favicon.ico` - Site favicon
- `public/robots.txt` - Search engine crawling directives
- `public/sitemap.xml` - XML sitemap for SEO

## HTML Entry Point

**index.html:**
- Root div with id="root" for React mounting
- Google Fonts preconnect + font links (display=swap)
- Favicon link
- Module script loading `src/main.tsx`

## Performance Optimizations

**Code Splitting:**
- Page components lazy-loaded via React.lazy() with Suspense fallback
- Vite manual chunks configured (vendor + motion)

**CSS:**
- Tailwind content scan includes only `./index.html` and `./src/**/*.{ts,tsx}`
- CSS variables prevent duplicate theme values
- PostCSS autoprefixer ensures cross-browser compatibility

**Font Loading:**
- Google Fonts preconnect directives reduce connection latency
- display=swap prevents FOUT (Flash of Unstyled Text)

---

*Stack analysis: 2026-03-04*
