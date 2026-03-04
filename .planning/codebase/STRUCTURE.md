# Codebase Structure

**Analysis Date:** 2026-03-04

## Directory Layout

```
reece-electric/
├── public/                         # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/                            # Application source code
│   ├── main.tsx                    # React root entry point
│   ├── App.tsx                     # Router + layout setup
│   ├── styles/
│   │   └── globals.css             # CSS variables, fonts, resets, media queries
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx          # Page wrapper with navbar + footer
│   │   │   ├── Navbar.tsx          # Fixed navigation bar
│   │   │   ├── Footer.tsx          # Footer with contact & quick links
│   │   │   └── PageWrapper.tsx     # Framer Motion fade-in for pages
│   │   ├── ui/
│   │   │   ├── Button.tsx          # Polymorphic button/link component
│   │   │   ├── AnnotationLabel.tsx # Gold line + uppercase eyebrow label
│   │   │   ├── RuledDivider.tsx    # Full-width horizontal divider
│   │   │   ├── ServiceCard.tsx     # Service preview card
│   │   │   ├── StatCard.tsx        # Stat display (number + label)
│   │   │   ├── TestimonialCard.tsx # Testimonial quote card
│   │   │   ├── Accordion.tsx       # FAQ accordion (expand/collapse)
│   │   │   └── SEOHead.tsx         # Helmet wrapper for per-page meta + JSON-LD
│   │   └── sections/
│   │       ├── Hero.tsx            # Hero section (green bg, CTA buttons)
│   │       ├── TrustBar.tsx        # Trust signals bar
│   │       ├── ServicesGrid.tsx    # 3-col grid of ServiceCard components
│   │       ├── WhyUs.tsx           # Two-column Why Choose Us section
│   │       ├── StatsRow.tsx        # Dark section with 4 stat cards
│   │       ├── Testimonials.tsx    # 3-col testimonial grid
│   │       └── CTABanner.tsx       # Blue banner with CTA buttons
│   ├── pages/
│   │   ├── Home.tsx                # Home page (imports all sections)
│   │   ├── Services.tsx            # Services detail page (6 services)
│   │   ├── About.tsx               # About page (story, values, credentials)
│   │   ├── Contact.tsx             # Contact page (form + contact info)
│   │   └── NotFound.tsx            # 404 page
│   ├── data/
│   │   ├── services.ts             # Service interface + 6 service objects
│   │   ├── faqs.ts                 # FAQ objects array
│   │   └── testimonials.ts         # Testimonial objects array
│   └── lib/
│       └── structuredData.ts       # JSON-LD schema generators (Local Business, FAQ, Breadcrumb)
├── index.html                      # HTML root with font <link> preloads
├── vite.config.ts                  # Vite build config (chunk splitting for vendor + motion)
├── tailwind.config.ts              # Tailwind theme extending CSS variables
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencies (React, Framer Motion, React Hook Form, etc.)
└── .env (if exists)                # Environment variables (placeholder — never committed)
```

## Directory Purposes

**public/:**
- Purpose: Static files served as-is by Vite dev server and bundled into dist/
- Contains: favicon.ico, robots.txt (SEO crawling), sitemap.xml (sitemap for search engines)
- Key files:
  - `robots.txt`: Allow: / and Sitemap URL
  - `sitemap.xml`: Lists 4 main pages (/, /services, /about, /contact)

**src/:**
- Purpose: All application source code
- Contains: React components, pages, data, styles, utilities

**src/components/:**
- Purpose: Reusable and layout components
- Contains: Organized into 3 subdirectories: layout/, ui/, sections/

**src/components/layout/:**
- Purpose: Global layout infrastructure
- Contains: Navbar, Footer, Layout wrapper, PageWrapper transition
- Key files:
  - `Layout.tsx`: Root template wrapping all pages with skip-link, navbar, main, footer
  - `Navbar.tsx`: Fixed header with responsive mobile menu (~225 lines, manages scroll + menu state)
  - `Footer.tsx`: Footer with 3-column grid and contact info
  - `PageWrapper.tsx`: Framer Motion wrapper providing fade-in on page load

**src/components/ui/:**
- Purpose: Reusable UI primitives and components
- Contains: Buttons, form inputs, cards, labels, dividers, accordion
- Key files:
  - `Button.tsx`: Polymorphic button (button or link), 4 variants, 3 sizes, hover state management via style mutations
  - `ServiceCard.tsx`: Card with dark header + light body, used in ServicesGrid
  - `AnnotationLabel.tsx`: Small uppercase label with gold accent line — eyebrow for sections
  - `SEOHead.tsx`: React Helmet wrapper for consistent meta tags and JSON-LD injection
  - `Accordion.tsx`: FAQ accordion with expand/collapse animation

**src/components/sections/:**
- Purpose: Page-level section components that compose into full pages
- Contains: Hero, TrustBar, ServicesGrid, WhyUs, StatsRow, Testimonials, CTABanner
- Key files:
  - `Hero.tsx`: Landing hero with decorative "01" number, H1, CTAs, inline stats (~200 lines)
  - `ServicesGrid.tsx`: CSS Grid of 6 ServiceCard components
  - `StatsRow.tsx`: Dark section with 4 StatCard components
  - `Testimonials.tsx`: 3-column testimonial grid

**src/pages/:**
- Purpose: Route-level page components — each represents a full page
- Contains: Home, Services, About, Contact, NotFound
- Pattern: Every page imports PageWrapper, SEOHead, sections/components; wraps content in PageWrapper; calls SEOHead with title, description, canonical, schema
- Key files:
  - `Home.tsx`: ~30 lines; imports 7 sections; provides local business schema
  - `Services.tsx`: Services detail page with 6 alternating detail sections
  - `About.tsx`: Story, values, credentials sections
  - `Contact.tsx`: Left column (contact info), right column (contact form) (~340 lines)

**src/data/:**
- Purpose: Static data definitions used by pages and components
- Contains: Service objects, FAQ items, testimonials
- Key files:
  - `services.ts`: Service interface (id, number, title, shortDescription, fullDescription, features[], seoKeywords[]); array of 6 services (residential, commercial, panel upgrades, EV charger, lighting, inspections)
  - `faqs.ts`: Array of {q, a} objects (questions, answers) for FAQ accordion and schema
  - `testimonials.ts`: Array of testimonial objects (quote, name, location) for testimonial cards

**src/lib/:**
- Purpose: Utility functions and data schemas
- Contains: Structured data generators (JSON-LD)
- Key files:
  - `structuredData.ts`: Three schema generators:
    - `localBusinessSchema`: Electrician type with address, hours, phone, services catalog
    - `faqSchema(faqs)`: FAQPage type mapping FAQ objects
    - `breadcrumbSchema(items)`: BreadcrumbList type for navigation breadcrumbs

**src/styles/:**
- Purpose: Global CSS and design tokens
- Contains: CSS variables, font imports, resets, responsive patterns
- Key files:
  - `globals.css`: Defines --color-* variables (primary, accent, text, borders), font families, body background, focus ring styles, @tailwind directives

## Key File Locations

**Entry Points:**
- `src/main.tsx`: Creates React root via ReactDOM.createRoot(); renders App
- `src/App.tsx`: Sets up HelmetProvider, BrowserRouter, AnimatedRoutes with lazy-loaded pages
- `index.html`: HTML document root with font preloads and app div

**Configuration:**
- `vite.config.ts`: Vite build config with React plugin and rollup chunk splitting (vendor, motion)
- `tailwind.config.ts`: Tailwind theme extending CSS variables from globals.css
- `tsconfig.json`: TypeScript strict mode config
- `package.json`: Dependencies and build scripts (dev, build, lint, preview)

**Core Logic:**
- `src/components/layout/Navbar.tsx`: Navigation bar with scroll listener and mobile menu
- `src/pages/Contact.tsx`: Contact form with React Hook Form validation (~340 lines)
- `src/components/sections/Hero.tsx`: Landing section with animations (~200 lines)

**Testing:**
- No test files present in codebase (no __tests__, .test.tsx, .spec.tsx files detected)

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., Button.tsx, ServiceCard.tsx, Hero.tsx)
- Pages: PascalCase (e.g., Home.tsx, Contact.tsx)
- Data/utilities: camelCase (e.g., services.ts, structuredData.ts)
- Styles: globals.css (lowercase with hyphens)

**Directories:**
- Feature/domain directories: lowercase (e.g., layout, ui, sections, pages, data, lib)
- Plural for collections (components/, pages/, sections/)

**Components:**
- Function names: PascalCase (export function Button() {})
- Props interfaces: <ComponentName>Props (e.g., ButtonProps, ServiceCardProps)
- Event handlers: camelCase with Handle prefix (e.g., handleSubmit, handleMouseEnter)
- State variables: camelCase (scrolled, menuOpen, submitted)

**Styling:**
- CSS variables: --color-* (e.g., --color-primary, --color-ink-mid), --color-* for all tokens
- Inline styles: camelCase keys (backgroundColor, fontSize, flexDirection)
- Class names: camelCase with descriptive purpose (e.g., nav-desktop, contact-input)

## Where to Add New Code

**New Feature (e.g., Add Blog Section):**
- Create page: `src/pages/Blog.tsx`
- Create sections (if multi-section): `src/components/sections/BlogHero.tsx`, `src/components/sections/BlogGrid.tsx`
- Add data: `src/data/blogPosts.ts`
- Register route: Add to Routes in `src/App.tsx`
- Add SEO: Call SEOHead in Blog page with appropriate schema

**New Component/Module (e.g., Add Image Gallery):**
- Create UI component: `src/components/ui/ImageGallery.tsx`
- Pattern: Accept props (images[], title, etc.), use Framer Motion for transitions
- Use inline styles with CSS variables for theming
- Export named function component

**Utilities (e.g., Format Phone Numbers):**
- Create function: `src/lib/utils.ts` (if file doesn't exist) or add to existing util file
- Export named function: export function formatPhone(number: string): string { ... }
- Import where needed: import { formatPhone } from '../lib/utils'

**Styling Tokens:**
- Add CSS variables to `src/styles/globals.css` in :root block
- Use descriptive names: --color-*, --font-*, --spacing-*
- Reference in inline styles or Tailwind config

**Data Models:**
- Add TypeScript interface to `src/data/[domain].ts`
- Create mock/seed data: export const [items]: [Type][] = [...]
- Use in pages/components via import

## Special Directories

**public/:**
- Purpose: Static assets
- Generated: No
- Committed: Yes (favicon, robots.txt, sitemap.xml)
- Contents: Served as-is by dev server; bundled into dist/ on build

**node_modules/:**
- Purpose: Dependencies
- Generated: Yes (via npm install)
- Committed: No (.gitignore)

**dist/:**
- Purpose: Production build output
- Generated: Yes (via npm run build)
- Committed: No (.gitignore)

**.planning/codebase/:**
- Purpose: Architecture documentation (this directory)
- Generated: No (manually created)
- Committed: Yes (for team reference)

---

*Structure analysis: 2026-03-04*
