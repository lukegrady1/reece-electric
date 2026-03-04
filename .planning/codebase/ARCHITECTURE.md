# Architecture

**Analysis Date:** 2026-03-04

## Pattern Overview

**Overall:** Single Page Application (SPA) with component-driven React architecture, using React Router for client-side routing and Framer Motion for page transitions.

**Key Characteristics:**
- Route-based code splitting via React.lazy()
- CSS-in-JS inline styles with CSS variables for theming
- SEO-optimized with React Helmet Async for per-page metadata and JSON-LD structured data
- Form handling via React Hook Form with client-side validation
- Responsive design using inline media queries via `<style>` tags within components

## Layers

**Presentation Layer (Components):**
- Purpose: Render UI elements and handle user interactions
- Location: `src/components/`
- Contains: Reusable UI components (Button, AnnotationLabel, ServiceCard), layout components (Navbar, Footer), and section components (Hero, TrustBar, ServicesGrid, etc.)
- Depends on: Data layer (src/data/), utility functions (src/lib/)
- Used by: Pages

**Page Layer (Pages):**
- Purpose: Aggregate sections into complete page experiences; handle page-specific SEO and layout
- Location: `src/pages/`
- Contains: Home, Services, About, Contact, NotFound — each exports a default component wrapped in PageWrapper and SEOHead
- Depends on: Sections, components, structured data schemas
- Used by: App routing layer

**Layout Layer:**
- Purpose: Provide consistent navigation, footer, and accessibility structure around page content
- Location: `src/components/layout/` (Layout.tsx, Navbar.tsx, Footer.tsx, PageWrapper.tsx)
- Layout.tsx: Wraps all pages with Navbar, Footer, and skip-to-content link
- Navbar.tsx: Fixed navigation with responsive mobile menu (Hamburger → full-screen overlay on mobile)
- Footer.tsx: Multi-column footer with contact and quick links
- PageWrapper.tsx: Framer Motion fade-in transition for page load

**Data Layer:**
- Purpose: Define and export static data structures for services, FAQs, testimonials
- Location: `src/data/`
- Contains: services.ts (Service interface + 6 services), faqs.ts (FAQ objects), testimonials.ts (testimonial objects)
- Used by: Contact page, Services page, FAQ sections

**SEO/Metadata Layer:**
- Purpose: Configure per-page SEO, structured data (JSON-LD schemas)
- Location: `src/lib/structuredData.ts`, `src/components/ui/SEOHead.tsx`
- SEOHead component: Uses react-helmet-async to inject `<title>`, `<meta>` tags, and `<script type="application/ld+json">` into document head
- Schemas: localBusinessSchema (LocalBusiness type for home page), faqSchema (FAQPage for FAQ sections), breadcrumbSchema (BreadcrumbList for multi-page navigation)

**Styling Layer:**
- Purpose: Global CSS variables, typography, resets, utility tokens
- Location: `src/styles/globals.css`
- CSS Variables: Color palette (--color-primary, --color-accent, etc.), font families, border colors
- Fonts: Playfair Display (display/headings), Crimson Pro (body), Barlow (labels/UI) — loaded via index.html `<link>` tags
- Responsive: Inline `<style>` blocks with @media queries (breakpoint: 768px)

## Data Flow

**Page Load & Routing:**

1. User visits app via route (e.g., /services)
2. React Router matches route in App.tsx, lazy-loads page component
3. PageFallback shows (spinner div with background color) while page chunk loads
4. Page component mounts → PageWrapper provides fade-in animation
5. SEOHead updates document `<title>`, `<meta>` tags, and injects JSON-LD schema
6. Page renders sections from `src/components/sections/`
7. Layout component wraps with Navbar (fixed), main content, Footer

**Form Submission (Contact):**

1. Contact page renders form with react-hook-form fields
2. User fills form, clicks "Send My Request" button
3. handleSubmit triggers validation (required fields, email pattern)
4. On error: fieldStyle applies red border, errorStyle displays error message below field
5. On success: onSubmit console.logs data (// TODO: Connect to backend), sets submitted=true
6. Success state displays: "Request Received" card with confirmation message

**State Management:**

- Navbar: Local state for scroll position (scrolled) and menu open/close (menuOpen)
- Contact page: Local state for form submission (submitted via useState)
- React Router: Manages current route via useLocation() hook in AnimatedRoutes
- No global state management (Redux, Zustand, etc.)

## Key Abstractions

**SEOHead Component:**
- Purpose: Abstracts React Helmet Async setup for consistent per-page SEO
- Location: `src/components/ui/SEOHead.tsx`
- Pattern: Accepts title, description, canonical URL, optional JSON-LD schema; renders Helmet wrapper
- Used by: Every page (Home, Services, About, Contact)
- Example from Home.tsx:
  ```tsx
  <SEOHead
    title="Licensed Electrician in [City] | Reece Group LLC"
    description="..."
    canonical="/"
    schema={localBusinessSchema}
  />
  ```

**PageWrapper Component:**
- Purpose: Provides consistent page entry animation via Framer Motion
- Location: `src/components/layout/PageWrapper.tsx`
- Pattern: Wraps page root div; applies opacity: 0→1 fade on mount
- Used by: Every page as root wrapper

**Button Component (Polymorphic):**
- Purpose: Unified button/link interface with variants and sizes
- Location: `src/components/ui/Button.tsx`
- Variants: primary (filled), secondary (outlined), ghost (text-only), accent (burgundy)
- Sizes: sm (9px 22px), md (13px 32px), lg (16px 40px)
- Polymorphic: Renders `<a>` if href prop provided, else `<button>`
- Hover handling: Manual mouseEnter/mouseLeave style mutations (no CSS classes)

**ServiceCard Component:**
- Purpose: Reusable card for displaying electrical service with description and CTA
- Location: `src/components/ui/ServiceCard.tsx`
- Composition: Dark green header (with faded index number texture) + white body
- Props: title, description, annotationIndex, annotationText, linkTo
- Hover effect: box-shadow expand + translateY(-2px) + CTA color change to accent

**AnnotationLabel Component:**
- Purpose: Small uppercase label with gold accent line — used for section eyebrows
- Location: `src/components/ui/AnnotationLabel.tsx`
- Pattern: Horizontal flex with 24px gold rule + uppercase text
- Variants: inverted (gold text on dark backgrounds) via prop

**Structured Data Schemas:**
- Purpose: JSON-LD schema generation for local business and FAQ rich snippets
- Location: `src/lib/structuredData.ts`
- Schemas: localBusinessSchema (home page SEO), faqSchema (function that maps FAQ objects), breadcrumbSchema (function for navigation breadcrumbs)
- Used by: SEOHead component's schema prop

## Entry Points

**Application Root:**
- Location: `src/main.tsx`
- Triggers: Browser loads index.html; Vite injects this as module
- Responsibilities: Create React root, render App component with StrictMode

**App Component:**
- Location: `src/App.tsx`
- Triggers: Initial mount from main.tsx
- Responsibilities: Set up HelmetProvider (SEO), BrowserRouter (routing), AnimatedRoutes (lazy page loading + page transitions)

**Routing Layer (AnimatedRoutes):**
- Location: Within `src/App.tsx`
- Triggers: Route change via NavLink or browser back/forward
- Responsibilities:
  - useLocation hook tracks current route
  - Routes with lazy-loaded pages: /, /services, /about, /contact, * (catch-all 404)
  - AnimatePresence + Suspense wrap routes for page transitions and loading states
  - Every route wrapped in Layout component (Navbar, Footer, main)

**Layout Component:**
- Location: `src/components/layout/Layout.tsx`
- Triggers: Wraps all page renders from Routes
- Responsibilities: Render skip-to-content link, Navbar, `<main id="main-content">` wrapper, Footer

**Navbar Component:**
- Location: `src/components/layout/Navbar.tsx`
- Triggers: Mounts once per session (fixed position, persists across routes)
- Responsibilities:
  - Scroll listener: Adds box-shadow when scrollY > 60px
  - Desktop nav: Renders nav links with active state styling
  - Mobile menu: Hamburger button opens full-screen overlay (Framer Motion slide-down)
  - Phone CTA button: `tel:` link to (555) 000-0000

## Error Handling

**Strategy:** Client-side form validation with display of error messages; no centralized error boundary.

**Patterns:**

**React Hook Form Validation:**
- Field-level validation via register() options: required, pattern, custom validators
- errors object from useFormState tracks validation state per field
- fieldStyle() function applied to inputs conditionally sets red border + error styling if field has error
- errorStyle renders error.message below field in red text

**Missing Data/Fallbacks:**
- Placeholder content marked with `// TODO:` comments throughout codebase (phone, address, license, photos, etc.)
- Contact form logs to console only; no error handling for backend submission (// TODO in onSubmit)
- No 500 error page or network error handling — only NotFound page for unmatched routes

## Cross-Cutting Concerns

**Logging:**
- Console.log() only (contact form submission in Contact.tsx)
- No structured logging framework

**Validation:**
- React Hook Form handles contact form validation (required, email pattern)
- No global input sanitization or XSS protection measures

**Authentication:**
- Not applicable — public marketing site with no user accounts

**Accessibility:**
- skip-to-content link in Layout (hidden off-screen, visible on focus)
- Semantic HTML: `<nav>`, `<main id="main-content">`, `<section>` elements
- aria-label on interactive elements (navbar logo, hamburger, icons)
- Focus ring: 2px solid var(--color-primary) with 3px outline-offset
- No ARIA live regions or screen reader testing visible

**Responsive Design:**
- Mobile-first approach with inline `<style>` tags defining @media (max-width: 768px) breakpoints
- Key patterns:
  - Navbar: Desktop nav links hidden, hamburger button shown on mobile
  - Contact form: 2-column grid collapses to 1-column below 768px
  - Hero H1: clamp(60px, 11vw, 120px) scales fluidly
  - All touch targets >= 44px (buttons, nav links, form inputs)

---

*Architecture analysis: 2026-03-04*
