Reece Group LLC — Claude Code Build Handoff
Electrician Website: Full Implementation Specification

0. Overview & Mission
Build a multi-page, SEO-optimized, production-grade website for Reece Group LLC, a local electrician business. The site must convert visitors into leads through clear CTAs, rank in local search through technical and on-page SEO, and feel undeniably premium without being generic.
Tech Stack: Vite + React + TypeScript
Routing: React Router v6
Styling: Tailwind CSS (utility-first) + custom CSS variables for brand tokens
Animation: Framer Motion
SEO: React Helmet Async (per-page meta) + structured data (JSON-LD)
Forms: React Hook Form
Icons: Lucide React (sparingly)
Fonts: Load from Google Fonts — Syne (display/headings) + IBM Plex Mono (labels/accents) + Libre Baskerville (body) — import via index.html <link> tags, NOT via CSS @import

1. Aesthetic Direction
Theme: Blueprint Modernist
Light, architectural, and precise. This site references the world of technical drafting — blueprint grids, ruled construction lines, precise annotations — but rendered in a clean, modern editorial style. It projects competence and trustworthiness through visual rigor rather than darkness.
The ONE thing visitors remember: it looks like a professional architect's office designed it, not a contractor's nephew.
Color Palette (CSS Variables — define in src/styles/globals.css)
css:root {
  --color-bg:            #F4F2EE;   /* warm off-white, like drafting paper */
  --color-bg-rule:       #E8E4DC;   /* slightly darker for ruled stripes */
  --color-surface:       #FFFFFF;   /* pure white cards/panels */
  --color-surface-2:     #EDEAE4;   /* inset / secondary surfaces */
  --color-ink:           #1A1A2E;   /* deep navy — primary text, borders */
  --color-ink-mid:       #4A4A6A;   /* mid-tone ink for secondary text */
  --color-ink-faint:     #9A9AB0;   /* placeholder, disabled */
  --color-border:        #C8C4BC;   /* standard ruled lines */
  --color-border-dark:   #1A1A2E;   /* heavy rule — nav border, section dividers */
  --color-accent:        #1A6BFF;   /* electric blueprint blue — THE one accent */
  --color-accent-dim:    #0A4FCC;   /* hover state for accent */
  --color-accent-light:  #E8F0FF;   /* tinted bg behind accent elements */
  --color-danger:        #C0392B;
}
Typography Rules

Display / H1 / H2: Syne, font-weight 800, normal case (NOT all-caps — let the weight do the work). Tight tracking: letter-spacing: -0.03em
Labels / Annotations / Tags: IBM Plex Mono, font-weight 500, uppercase, letter-spacing: 0.1em, small size (11–13px). This is the "blueprint annotation" voice.
Body / UI / H3–H4: Libre Baskerville, regular/bold weights. Gives the editorial, trustworthy feel.
NO system fonts. Fallback chain: 'Syne', 'Libre Baskerville', 'IBM Plex Mono', serif

Decorative Motif: Blueprint Ruling
The site background uses a subtle horizontal ruled-line pattern (like drafting paper):
cssbody {
  background-color: var(--color-bg);
  background-image: repeating-linear-gradient(
    180deg,
    transparent,
    transparent 31px,
    var(--color-bg-rule) 31px,
    var(--color-bg-rule) 32px
  );
}
Cards and white panels background: var(--color-surface) will float above this, creating depth.
Motion Philosophy

Page transitions: opacity fade + 8px Y slide (subtle, refined — not dramatic)
Section reveals: whileInView with once: true, stagger 0.1s between siblings
Hover on cards: box-shadow expands + top border shifts to accent blue
CTA buttons: background slides in from left on hover (CSS clip-path or pseudo-element)
Easing: [0.22, 1, 0.36, 1] (expo-out) for reveals, easeOut for hovers
NO bouncy springs, NO scale transforms on large elements

Layout Philosophy

Max content width: 1160px, centered
Heavy use of CSS Grid for precision alignment (not just flexbox)
Section dividers: full-width 1px solid var(--color-border-dark) horizontal rules — these are load-bearing design elements, use them between every major section
Generous negative space — padding py-28 on sections, py-40 on hero
Accent blue used ONLY on: primary CTAs, active states, annotation labels, key stat numbers, link underlines


2. Project Structure
reece-group/
├── index.html                    # Root HTML, font preloads, favicon
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── styles/
│   │   └── globals.css           # CSS variables + body ruling pattern + resets
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── AnnotationLabel.tsx  # IBM Plex Mono tag — replaces SectionLabel
│   │   │   ├── RuledDivider.tsx     # Full-width horizontal rule with optional label
│   │   │   ├── StatCard.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── TestimonialCard.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── Accordion.tsx
│   │   │   └── SEOHead.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── TrustBar.tsx
│   │       ├── ServicesGrid.tsx
│   │       ├── WhyUs.tsx
│   │       ├── StatsRow.tsx
│   │       ├── Testimonials.tsx
│   │       └── CTABanner.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── data/
│   │   ├── services.ts
│   │   ├── testimonials.ts
│   │   └── faqs.ts
│   └── lib/
│       └── structuredData.ts

3. Dependencies
bashnpm create vite@latest reece-group -- --template react-ts
cd reece-group
npm install react-router-dom framer-motion react-helmet-async react-hook-form lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

4. Configuration Files
tailwind.config.ts
tsimport type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:            'var(--color-bg)',
        surface:       'var(--color-surface)',
        surface2:      'var(--color-surface-2)',
        ink:           'var(--color-ink)',
        'ink-mid':     'var(--color-ink-mid)',
        'ink-faint':   'var(--color-ink-faint)',
        border:        'var(--color-border)',
        'border-dark': 'var(--color-border-dark)',
        accent:        'var(--color-accent)',
        'accent-dim':  'var(--color-accent-dim)',
        'accent-light':'var(--color-accent-light)',
      },
      fontFamily: {
        display: ['"Syne"', 'serif'],
        mono:    ['"IBM Plex Mono"', 'monospace'],
        body:    ['"Libre Baskerville"', 'serif'],
      },
      maxWidth: {
        content: '1160px',
      },
    },
  },
  plugins: [],
} satisfies Config
index.html — critical <head> setup
html<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@400;500&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <title>Reece Group LLC | Licensed Electrician — [City, State]</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
src/styles/globals.css
css/* CSS Variables */
:root {
  --color-bg:            #F4F2EE;
  --color-bg-rule:       #E8E4DC;
  --color-surface:       #FFFFFF;
  --color-surface-2:     #EDEAE4;
  --color-ink:           #1A1A2E;
  --color-ink-mid:       #4A4A6A;
  --color-ink-faint:     #9A9AB0;
  --color-border:        #C8C4BC;
  --color-border-dark:   #1A1A2E;
  --color-accent:        #1A6BFF;
  --color-accent-dim:    #0A4FCC;
  --color-accent-light:  #E8F0FF;
  --color-danger:        #C0392B;
}

/* Blueprint ruled paper background */
body {
  background-color: var(--color-bg);
  background-image: repeating-linear-gradient(
    180deg,
    transparent,
    transparent 31px,
    var(--color-bg-rule) 31px,
    var(--color-bg-rule) 32px
  );
  color: var(--color-ink);
  font-family: 'Libre Baskerville', serif;
}

/* Focus ring — accessible, on-brand */
*:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

/* Skip to content */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  background: var(--color-accent);
  color: white;
  padding: 0.5rem 1rem;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  z-index: 9999;
}
.skip-link:focus {
  top: 1rem;
}

5. SEO Architecture
SEOHead Component (src/components/ui/SEOHead.tsx)
tsximport { Helmet } from 'react-helmet-async'

interface SEOHeadProps {
  title: string
  description: string
  canonical: string
  schema?: object
}

export function SEOHead({ title, description, canonical, schema }: SEOHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`https://reecegroupllc.com${canonical}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://reecegroupllc.com${canonical}`} />
      <meta name="twitter:card" content="summary_large_image" />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
JSON-LD Schemas (src/lib/structuredData.ts)
localBusinessSchema — use on Home page:
tsexport const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  "name": "Reece Group LLC",
  "image": "https://reecegroupllc.com/og-image.jpg",
  "url": "https://reecegroupllc.com",
  "telephone": "+1-[PHONE]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[ADDRESS]",
    "addressLocality": "[CITY]",
    "addressRegion": "[STATE]",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 0.0,
    "longitude": 0.0
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "07:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "areaServed": "[City/Region]",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Electrical Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Residential Electrical" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Electrical" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Panel Upgrades" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "EV Charger Installation" } }
    ]
  }
}
faqSchema:
tsexport const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a }
  }))
})
breadcrumbSchema:
tsexport const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": item.name,
    "item": `https://reecegroupllc.com${item.url}`
  }))
})
Per-Page SEO Targets
PageTitle TagMeta DescriptionSchemaHomeLicensed Electrician in [City] | Reece Group LLCReece Group LLC provides expert electrical services in [City]. Residential, commercial, panel upgrades & EV chargers. Call for a free estimate.LocalBusinessServicesElectrical Services | Reece Group LLC — [City]From panel upgrades to EV charger installation, Reece Group LLC offers comprehensive electrical services. Licensed & insured. Serving [City].FAQPageAboutAbout Reece Group LLC | Experienced Local ElectriciansMeet the team behind Reece Group LLC — licensed electricians committed to quality, safety, and transparent pricing in [City].BreadcrumbContactContact Reece Group LLC | Free Electrical EstimateGet a free estimate from Reece Group LLC. Call, email, or fill out our contact form. Serving [City] and surrounding areas.Breadcrumb
public/robots.txt
User-agent: *
Allow: /
Sitemap: https://reecegroupllc.com/sitemap.xml
public/sitemap.xml
xml<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://reecegroupllc.com/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://reecegroupllc.com/services</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://reecegroupllc.com/about</loc><changefreq>yearly</changefreq><priority>0.7</priority></url>
  <url><loc>https://reecegroupllc.com/contact</loc><changefreq>yearly</changefreq><priority>0.8</priority></url>
</urlset>

6. Routing & App Shell
src/App.tsx
tsximport React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'
import { Layout } from './components/layout/Layout'

const Home     = React.lazy(() => import('./pages/Home'))
const Services = React.lazy(() => import('./pages/Services'))
const About    = React.lazy(() => import('./pages/About'))
const Contact  = React.lazy(() => import('./pages/Contact'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

const PageFallback = () => (
  <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }} />
)

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Suspense fallback={<PageFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"         element={<Layout><Home /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/about"    element={<Layout><About /></Layout>} />
          <Route path="/contact"  element={<Layout><Contact /></Layout>} />
          <Route path="*"         element={<Layout><NotFound /></Layout>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </HelmetProvider>
  )
}
PageWrapper component (wrap every page's root div)
tsximport { motion } from 'framer-motion'

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

7. Navbar (src/components/layout/Navbar.tsx)
Behavior

Fixed to top, full width
Always: background: var(--color-surface), border-bottom: 1px solid var(--color-border-dark)
Height: 68px desktop / 60px mobile
On scroll > 60px: add box-shadow: 0 2px 16px rgba(26,26,46,0.08)

Desktop Structure
[LOGO]                    [HOME]  [SERVICES]  [ABOUT]  [CONTACT]     [CALL US CTA]
Logo Design

Two-line stacked layout:

Line 1: REECE GROUP — Syne 800, 18px, --color-ink, tracking -0.03em
Line 2: LLC  ·  ELECTRICAL — IBM Plex Mono 500, 10px, --color-ink-mid, tracking 0.15em, uppercase


Wrap in a div with border-right: 1px solid var(--color-border-dark), padding-right: 24px, margin-right: 24px — creates the drafting-table divider effect

Nav Links

IBM Plex Mono 500, 12px, uppercase, letter-spacing: 0.1em
Color: --color-ink-mid; Hover: --color-ink
Active route: --color-ink + border-bottom: 2px solid var(--color-accent)
Gap between links: 40px

Navbar CTA Button

Text: Call (555) 000-0000
Style: background: var(--color-accent), white text, IBM Plex Mono 500, 12px, letter-spacing: 0.08em
Padding: 10px 20px, border-radius: 2px
Hover: background: var(--color-accent-dim)
Link: tel:+15550000000

Mobile Menu

Hamburger: three 2px ink-colored lines, 24px wide, 4px gaps — built with <span> divs
Full-screen white overlay (var(--color-surface)), z-50
Top of overlay: logo + close (×) button
Links: Syne 800, 40px, stacked 48px gaps, center-aligned
Phone CTA button at bottom, full width
Framer Motion: opacity + y: -20 → 0 (drop-in from top)


8. Footer (src/components/layout/Footer.tsx)
Layout

border-top: 1px solid var(--color-border-dark)
Background: var(--color-surface) (white)
3-column grid on desktop, single column stacked on mobile
Column gap: 80px

Columns

Col 1: Logo (same as nav) + tagline — Libre Baskerville italic 14px, muted
Col 2: IBM Plex Mono 11px uppercase heading QUICK LINKS, then Libre Baskerville 15px links (Home, Services, About, Contact)
Col 3: IBM Plex Mono 11px uppercase heading CONTACT, phone/email/address/hours in Libre Baskerville 15px. Phone and email are clickable links.

Footer Bottom Bar

border-top: 1px solid var(--color-border)
background: var(--color-surface-2)
IBM Plex Mono 11px, --color-ink-mid
Left: © 2025 Reece Group LLC. All rights reserved.
Right: Licensed Master Electrician · [State] Lic #XXXXXX


9. Reusable UI Components
AnnotationLabel.tsx
The blueprint "annotation tag" — appears above section headings throughout the site.
tsx// Props: text (string), index?: string (e.g. "01")
// Renders: [ 01 — WHAT WE DO ] inline-flex pill
// Style:
//   border: 1px solid var(--color-accent)
//   color: var(--color-accent)
//   background: var(--color-accent-light)
//   padding: 4px 10px
//   font: IBM Plex Mono 500 11px uppercase letter-spacing 0.12em
//   border-radius: 2px
//   gap: 8px between index and text (separator: "—")
RuledDivider.tsx
tsx// Full-width 1px horizontal rule (border-bottom: 1px solid var(--color-border))
// Props: label?: string
// If label provided: render label text centered on the line
//   Label: IBM Plex Mono 10px, --color-ink-faint, uppercase
//   Background same as parent to visually "cut" the line
// Use as a breathing element between sections
Button.tsx
tsx// Variants:
// 'primary':   bg var(--color-accent), white text, hover bg var(--color-accent-dim)
// 'secondary': transparent bg, border 1.5px solid var(--color-ink), ink text,
//              hover: bg var(--color-ink), white text
// 'ghost':     no bg, no border, accent color text, underline slides in on hover
//
// ALL variants:
//   font: IBM Plex Mono 500, 12px, uppercase, letter-spacing: 0.1em
//   border-radius: 2px
//   transition: 200ms ease
//
// Sizes:
//   'sm': padding 8px 16px
//   'md': padding 12px 28px  ← default
//   'lg': padding 16px 40px
ServiceCard.tsx
tsx// Props: title, description, annotationIndex, linkTo
// Style:
//   background: var(--color-surface)        ← white, floats above ruled bg
//   border: 1px solid var(--color-border)
//   border-top: 3px solid var(--color-ink)  ← architectural "header rule"
//   padding: 32px
//   border-radius: 0                         ← strictly rectangular
//
// Layout (top to bottom):
//   AnnotationLabel (e.g. "01 — RESIDENTIAL")
//   H3: Syne 700 24px, ink, -0.02em tracking
//   Description: Libre Baskerville 15px, 1.7 line-height, ink-mid
//   border-bottom: 1px dashed var(--color-border)
//   "View Service →": IBM Plex Mono 11px, accent, letter-spacing 0.1em
//
// Hover:
//   border-top: 3px solid var(--color-accent) — shifts from ink to blue
//   box-shadow: 0 4px 24px rgba(26,26,46,0.08)
//   transition: 250ms ease
StatCard.tsx
tsx// Standalone — no card container
// Number: Syne 800, 64px desktop / 48px mobile, var(--color-accent)
// Suffix ("+", "hr", "%"): Syne 800, 32px, var(--color-ink-mid), inline after number
// Label: IBM Plex Mono 500, 11px, --color-ink-mid, uppercase, letter-spacing 0.12em
// border-bottom: 1px solid var(--color-border) below label
// Counter animation: useInView + Framer Motion animate value 0 → final on scroll
TestimonialCard.tsx
tsx// Style:
//   background: var(--color-surface)
//   border: 1px solid var(--color-border)
//   padding: 36px
//   border-radius: 0
//
// Layout:
//   "★★★★★": IBM Plex Mono 14px, --color-accent
//   Quote: Libre Baskerville italic, 16px, 1.8 line-height, ink-mid
//   border-bottom: 1px dashed var(--color-border)
//   Reviewer name: Syne 700 14px ink
//   Location: IBM Plex Mono 11px ink-faint
Accordion.tsx (FAQ)
tsx// Props: items: { q: string; a: string }[]
// Each item:
//   Trigger: full-width button, border-bottom: 1px solid var(--color-border)
//   Question: Libre Baskerville 700, 17px, ink
//   Expand icon: "+" → "−" in IBM Plex Mono, accent color, right-aligned
//   Answer: Libre Baskerville 15px, 1.8 line-height, ink-mid
//   Framer Motion AnimatePresence: height 0 → auto on open
//   Open item: border-left: 3px solid var(--color-accent) on left edge of trigger

10. Layout Shell
Layout.tsx
tsxexport function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  )
}

11. Page Specifications

11.1 HOME PAGE (src/pages/Home.tsx)
Section 1: Hero

Min-height: 100vh
Background: Ruled paper pattern shows through — NO special hero background. Content sits directly on the drafting-paper texture.
Layout: Centered single column, max-width 680px, padding-top: 160px (accounts for fixed nav)
Content (top to bottom):

AnnotationLabel index "01" text "LICENSED ELECTRICIAN — [CITY, STATE]"
H1, Syne 800, 88px desktop / 52px mobile, --color-ink, -0.03em tracking:
Reece Group LLC. ← trailing period is intentional, editorial
Subtitle: Libre Baskerville italic, 20px, --color-ink-mid, 1.6 line-height:
Expert electrical services for homes and businesses in [City]. Built to code. Done right the first time.
RuledDivider (no label) — full-width breathing rule
Two CTA buttons side by side, gap: 16px:

Primary: "Get a Free Estimate" → /contact (blue fill, Button lg)
Secondary: "Our Services" → /services (outlined ink, Button lg)


Trust signals row — IBM Plex Mono 11px, --color-ink-faint, letter-spacing: 0.1em:
LICENSED & INSURED  ·  SAME-DAY SERVICE  ·  5-STAR RATED  ·  [CITY] BASED


Decorative element: Large draft annotation number — 01 — in Syne 800, 220px, color var(--color-border) (very faint), position: absolute, centered behind the trust signals. z-index: 0, pointer-events: none. Creates the "blueprint sheet number" effect without being distracting.
Framer Motion stagger (all y: 16 → 0, opacity: 0 → 1):

AnnotationLabel: delay 0s
H1: delay 0.1s
Subtitle: delay 0.2s
RuledDivider: delay 0.3s
CTAs: delay 0.4s
Trust row: delay 0.5s



RuledDivider between EVERY section below
Section 2: Trust / Credentials Bar

background: var(--color-surface) — white strip floats above ruled bg
border-top: 1px solid var(--color-border-dark) + border-bottom: 1px solid var(--color-border-dark)
Horizontal flex, center-aligned, gap: 48px, wraps on mobile
Items (IBM Plex Mono 11px, ink-mid, uppercase, letter-spacing 0.1em):
BBB ACCREDITED · [X]+ YEARS EXPERIENCE · MASTER ELECTRICIAN · [CITY] CHAMBER MEMBER · FULLY INSURED
Separator between items: 1px vertical bar in --color-border, 16px tall

Section 3: Services Preview

AnnotationLabel index "02" text "WHAT WE DO"
H2: Syne 800, 56px, ink: Complete Electrical Solutions
Intro paragraph: Libre Baskerville 16px, ink-mid, max-width 480px
3-column CSS Grid of ServiceCard components (6 total — 2 rows)
Below grid: Button variant secondary centered: "View All Services →" → /services

Section 4: Why Choose Us

Two-column grid: left 55% / right 45%, gap: 80px
Left:

AnnotationLabel index "03" text "WHY REECE GROUP"
H2 Syne 800 48px: Precision work. Honest pricing. Every time.
Body paragraphs Libre Baskerville 16px, 1.8 line-height, ink-mid
Button primary: "Get Your Free Estimate" → /contact


Right: White card — background: var(--color-surface), border: 1px solid var(--color-border), border-top: 3px solid var(--color-ink), padding: 40px

IBM Plex Mono 11px uppercase: WHAT SETS US APART
Checklist rows (each: border-bottom: 1px solid var(--color-border), padding: 14px 0, flex):

Left: IBM Plex Mono ✓ in --color-accent
Right: Libre Baskerville 15px ink
Items:

Transparent pricing — no surprise fees
Work guaranteed to NEC code standards
Clean job sites — we respect your property
Same-day and emergency service available
Responsive communication start to finish
Licensed Master Electrician on every job







Section 5: Stats Row

background: var(--color-ink) — the ONE dark section on the page. Strong contrast break.
AnnotationLabel at top, inverted colors (white border + text on dark bg): index "04" text "BY THE NUMBERS"
4 StatCard components in a row (2×2 on mobile)
Stats with numbers in --color-accent blue, labels in warm white (--color-bg):

15+ Years in Business
500+ Satisfied Customers
24hr Response Time
100% Licensed & Insured


Counter animation triggers on scroll into view

Section 6: Testimonials

AnnotationLabel index "05" text "CLIENT REVIEWS"
H2 Syne 800 56px: Trusted by [City] Homeowners
3-column grid of TestimonialCard components
Placeholder reviews (// TODO: Replace with real Google reviews):

"Reece Group rewired our entire basement. Professional, clean, and ahead of schedule." — Sarah M., [City]
"Emergency panel issue on a Saturday. They arrived within 2 hours. Incredible service." — James T., [City]
"Fair pricing, excellent craftsmanship. They walked us through every step." — Karen L., [City]



Section 7: CTA Banner

background: var(--color-accent) — bold blueprint-blue section
H2 Syne 800 64px white: Ready to Get Started?
Subtext Libre Baskerville italic 18px white: Contact us today for a free, no-obligation estimate.
Two buttons:

background: white, ink text: "Schedule an Estimate" → /contact
border: 1.5px solid white, white text: "Call (555) 000-0000" → tel:




11.2 SERVICES PAGE (src/pages/Services.tsx)
Breadcrumb
IBM Plex Mono 12px, ink-faint. Home / Services — "Home" links to / in accent blue. Sits below Navbar, padding: 16px 0.
Page Hero (40vh min)

AnnotationLabel + H1 Syne 800 72px: Our Electrical Services
Subtext Libre Baskerville italic 18px ink-mid

Services — Alternating Detail Sections
One full section per service, alternating image-left/content-right → content-left/image-right.
For each service:

Image side: div styled as white card, border: 1px solid var(--color-border), border-top: 4px solid var(--color-ink). Interior: IBM Plex Mono centered [ PHOTO — [SERVICE NAME] ] in ink-faint. Aspect ratio 4:3. // TODO: Replace with real project photo <img>
Content side:

AnnotationLabel with service number + category name
H3 Syne 800 42px ink
Description Libre Baskerville 16px, 1.8 line-height, ink-mid
Feature list: ▸ prefix in accent blue (IBM Plex Mono), text in Libre Baskerville 15px
Button primary: "Request This Service →" → /contact



Services (in order):

Residential Electrical
Commercial Electrical
Panel Upgrades & Replacements
EV Charger Installation
Lighting Installation
Safety Inspections & Code Compliance

FAQ Section

AnnotationLabel + H2 Syne 800 52px: Frequently Asked Questions
Accordion component with 6 questions from src/data/faqs.ts
Pass faqSchema to SEOHead

Page-bottom CTA Banner (same as home)

11.3 ABOUT PAGE (src/pages/About.tsx)
Breadcrumb
Home / About
Page Hero (40vh)

H1 Syne 800 72px: About Reece Group LLC
Subtext italic: Built on craftsmanship. Backed by experience.

Section 1: Origin Story

Two columns: Left 60% / Right 40%
Left: 3 body paragraphs Libre Baskerville 16px, 1.8 line-height. // TODO: Fill with real owner/company story
Right: Pull-quote card — background: var(--color-ink), padding: 48px 40px

" in Syne 800, 80px, --color-accent
Quote Libre Baskerville italic 20px warm white: "Quality work. Honest pricing. Every time."
Attribution IBM Plex Mono 11px, ink-faint (light): — [OWNER NAME], FOUNDER



Section 2: Values

AnnotationLabel + H2: How We Work
3-column grid:

Large annotation number 01, 02, 03 — IBM Plex Mono 500, 13px, accent blue
RuledDivider
H4 Syne 700 22px
Paragraph Libre Baskerville 15px


Safety First — No shortcuts, no code violations.
Transparent Pricing — Estimate before work begins.
Clean & Respectful — Your space treated with care.



Section 3: Credentials

White card, border: 1px solid var(--color-border), border-top: 3px solid var(--color-ink), padding: 40px
IBM Plex Mono 11px uppercase heading: CREDENTIALS & CERTIFICATIONS
Two-column list:

Licensed Master Electrician — [State] License #XXXXXX
OSHA 10 Certified
General Liability Insurance — $2M Coverage
Workers Compensation Insured
BBB Accredited Business — A+ Rating
NFPA Member



Section 4: Service Area

H2 Syne 800 52px: Serving [Region]
Paragraph listing towns/cities served
Google Maps placeholder: div, background: var(--color-surface-2), border: 1px solid var(--color-border), height: 400px, centered IBM Plex Mono text [ GOOGLE MAPS EMBED ]
{/* TODO: Replace with Google Maps iframe */}

Page-bottom CTA Banner

11.4 CONTACT PAGE (src/pages/Contact.tsx)
Breadcrumb
Home / Contact
Page Hero (30vh)

H1 Syne 800 72px: Get in Touch
Subtext: Free estimates. Prompt responses. No pressure.

Main Content — Two Column (Left 40% / Right 60%), gap: 80px
Left Column — Contact Info

AnnotationLabel + H2 Syne 800 36px: Reach Us Directly
Four contact rows, each:

Lucide icon (16px, --color-accent): Phone, Mail, MapPin, Clock
Label IBM Plex Mono 10px uppercase ink-faint
Value Libre Baskerville 16px ink
border-bottom: 1px solid var(--color-border), padding: 20px 0


Dark card below: background: var(--color-ink), padding: 32px

IBM Plex Mono 11px warm white uppercase: EMERGENCY SERVICE
Subtext Libre Baskerville italic white
Phone in --color-accent



Right Column — Contact Form
Use react-hook-form. All inputs:

background: var(--color-surface), border: 1px solid var(--color-border), border-radius: 2px
padding: 12px 16px, font-family: Libre Baskerville, font-size: 15px, color: var(--color-ink)
Focus: border-color: var(--color-accent), outline: none, box-shadow: 0 0 0 3px var(--color-accent-light)
Error: border-color: var(--color-danger) + IBM Plex Mono 11px red error message below
Labels: IBM Plex Mono 11px uppercase ink-mid, letter-spacing 0.1em, margin-bottom: 6px

FieldTypeValidationFull NametextRequiredPhone NumbertelRequiredEmail AddressemailRequired, valid formatService NeededselectRequired — options match all 6 service namesProject Detailstextarea (5 rows)Optional
Submit: Button primary full-width size lg — "Send My Request →"
On submit: console.log(data) + show success state (white card, Syne 700 heading "Request Received", confirmation body).
// TODO: Connect to Formspree, Netlify Forms, or custom API

12. Data Files
src/data/services.ts
tsexport interface Service {
  id: string
  number: string           // "01", "02", etc.
  title: string
  shortDescription: string
  fullDescription: string
  features: string[]
  seoKeywords: string[]
}

export const services: Service[] = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Electrical',
    shortDescription: 'Complete home electrical solutions from outlets to full rewires.',
    fullDescription: '// TODO: expand with real description',
    features: [
      'Outlet & switch installation',
      'Home rewiring & circuit additions',
      'Ceiling fan & light fixture installation',
      'Recessed LED lighting',
      'GFCI & AFCI upgrades',
    ],
    seoKeywords: ['residential electrician [city]', 'home electrical repair'],
  },
  // ... repeat for all 6 services
]
src/data/faqs.ts
tsexport const faqs = [
  { q: 'Are you licensed and insured in [State]?', a: 'Yes. Reece Group LLC holds a Master Electrician license in [State] and carries full general liability and workers compensation insurance.' },
  { q: 'Do you offer free estimates?', a: 'Yes, we provide free on-site estimates for all residential and commercial projects.' },
  { q: 'How quickly can you respond to an emergency?', a: 'We offer emergency electrical services and aim to respond within 2 hours for urgent situations.' },
  { q: 'What areas do you serve?', a: 'We serve [City] and surrounding communities including [list towns].' },
  { q: 'Can you handle both residential and commercial jobs?', a: 'Absolutely. Our team is experienced in both residential and commercial electrical work of all sizes.' },
  { q: 'What payment methods do you accept?', a: 'We accept cash, check, and all major credit cards. Financing options available for larger projects.' },
]

13. Performance & Technical SEO Checklist

 All <img> tags: loading="lazy" + descriptive keyword-rich alt text
 Fonts via <link> in index.html with display=swap ✓
 Pages lazy-loaded via React.lazy() ✓
 <html lang="en"> ✓
 <meta viewport> ✓
 Canonical tags via SEOHead on every page ✓
 Phone numbers are <a href="tel:..."> — always tappable
 ONE <h1> per page only
 Heading hierarchy never skips levels (H1 → H2 → H3)
 aria-label on all icon-only buttons
 Skip-to-content link ✓
 <main id="main-content"> ✓
 No horizontal scroll at any breakpoint
 robots.txt and sitemap.xml in /public ✓
 vite.config.ts vendor chunk splitting:

ts  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        }
      }
    }
  }

14. Mobile Responsiveness Rules

All 2-column layouts → 1 column below md (768px)
All 3-column grids → 1 column below md, 2 columns at sm (640px)
Hero H1: 52px mobile → 88px desktop
Stat numbers: 48px mobile → 64px desktop
Section padding: py-16 mobile → py-28 desktop
Nav phone CTA: hidden on mobile (shown in mobile menu instead)
All touch targets: minimum 44px height
Form inputs full-width on mobile


15. Placeholder Content Reference
Mark ALL placeholder content:
tsx{/* TODO: Replace with real [phone / address / owner name / project photos / Google Maps embed / testimonials / license number / service area towns] */}
Use throughout build:

Phone: (555) 000-0000
Email: info@reecegroupllc.com
Location: [City, State]
Owner: [Owner Name]
License: #XXXXXX


16. Build Verification

npm run build — zero TypeScript errors
npm run preview — all 4 routes render correctly
No console errors on any page
No horizontal scroll at 375px viewport
Lighthouse targets: Performance 90+, SEO 100, Accessibility 90+, Best Practices 95+
Test at viewports: 375px, 768px, 1280px, 1440px
All tel: and mailto: links functional
Form validation fires on empty submit attempt


End of Handoff Document — Reece Group LLC Website Specification
Theme: Blueprint Modernist | Fonts: Syne + IBM Plex Mono + Libre Baskerville
Palette: Drafting-paper warm white + deep navy ink + electric blueprint blue accent
Version 2.0 | Prepared for Claude Code