# External Integrations

**Analysis Date:** 2026-03-04

## APIs & External Services

**Not Detected**

Current codebase has no active third-party API integrations. All data is static/mock.

## Data Storage

**Databases:**
- Not applicable — No backend database configured

**File Storage:**
- Local filesystem only — Static assets served from `public/` directory (favicon, robots.txt, sitemap.xml)

**Caching:**
- Not configured — Client-side only via browser cache

## Authentication & Identity

**Auth Provider:**
- None — No user authentication system implemented

## Contact Form Handling

**Status:** Stub implementation

- Framework: React Hook Form (client-side validation only)
- Form location: `src/pages/Contact.tsx`
- Current behavior: Collects data, logs to console, displays success message
- Backend integration: TODO comment at line 74 — "Connect to Formspree, Netlify Forms, or custom API"

**Placeholder integration points:**
- No API endpoint configured
- No email service connected
- Form submission currently calls `console.log(data)` only

## SEO & Structured Data

**JSON-LD Schemas:**
- LocalBusiness schema: `src/lib/structuredData.ts` (lines 1-41)
  - Defines Electrician business type with services catalog
  - Placeholders for phone, address, coordinates, area served
  - Uses hardcoded domain: `https://reecegroupllc.com`

- FAQ schema: `src/lib/structuredData.ts` (lines 43-51)
  - Generated dynamically from FAQ data
  - Used on Services page for rich snippets

- Breadcrumb schema: `src/lib/structuredData.ts` (lines 53-62)
  - Used on Services, About, Contact pages
  - Navigation trail for search engines

**Helmet/Meta Management:**
- React Helmet Async injected in `src/App.tsx`
- Per-page meta tags via `src/components/ui/SEOHead.tsx`
- Canonical tags hardcoded to `https://reecegroupllc.com{path}`

## Monitoring & Observability

**Error Tracking:**
- Not detected

**Logs:**
- Browser console only (Contact form logs data to console.log at line 73 in Contact.tsx)

## CI/CD & Deployment

**Hosting:**
- Not configured — Project built for static hosting (Vite SPA)

**CI Pipeline:**
- Not detected

**Build Output:**
- `dist/` directory (production build)

## Environment Configuration

**Required env vars:**
- None currently configured
- No `.env` file in repository

**Future placeholders that may require configuration:**
- Form submission API endpoint (TODO in Contact.tsx)
- Google Maps API key (TODO in About page for embed)
- Phone/email/address values (currently hardcoded placeholders in Contact.tsx)

**Secrets location:**
- None configured

## Google Services

**Not Integrated:**

- **Google Maps:** Placeholder comment in `src/pages/About.tsx` — "TODO: Replace with Google Maps iframe"
- **Google Analytics:** Not detected
- **Google Search Console:** Not configured (robots.txt and sitemap.xml present but not verified)

## Webhooks & Callbacks

**Incoming:**
- None configured

**Outgoing:**
- None configured

## Static Site Metadata

**robots.txt Location:** `public/robots.txt`
- Allows all user agents
- References sitemap at `https://reecegroupllc.com/sitemap.xml`

**sitemap.xml Location:** `public/sitemap.xml`
- Static XML with 4 URLs: /, /services, /about, /contact
- Manual maintenance required — not auto-generated

## Third-Party Font Service

**Google Fonts:**
- Connection: Preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (index.html)
- Fonts: Playfair Display, Crimson Pro, Barlow
- Load parameter: `display=swap` (prevents FOUT)

## Data Files (Static/Mock)

**Services:** `src/data/services.ts`
- Array of 6 service definitions (hardcoded)
- Includes placeholders for descriptions and keywords

**FAQs:** `src/data/faqs.ts`
- Array of 6 Q&A pairs (hardcoded)
- Used with faqSchema for structured data

**Testimonials:** `src/data/testimonials.ts`
- Mock review data (TODO: "Replace with real Google reviews")

## Client-Side Only

**Important:** This is a fully static client-side React application with no backend. All business logic and data is hardcoded or mock. No server-side processing, no persistent storage, no real user authentication or data collection.

---

*Integration audit: 2026-03-04*
