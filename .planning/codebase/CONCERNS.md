# Codebase Concerns

**Analysis Date:** 2025-02-26

## Tech Debt

**Design System Mismatch — Blueprint vs. Classic American Trade:**
- Issue: CLAUDE.md specifies "Blueprint Modernist" with electric blue accent (#1A6BFF), but actual implementation uses "Classic American Trade" with forest green (#1B3A2D) and burgundy (#8B2020)
- Files: `src/styles/globals.css`, all pages and components
- Impact: Entire visual system is inconsistent with specification. Rebranding will require rewriting 100+ inline style references across components
- Fix approach: Either revert to Blueprint Modernist (update CSS variables + all components to use #1A6BFF accent) or formally adopt the current "Classic American Trade" theme and update CLAUDE.md to match

**Inline Styles Scattered Across Components:**
- Issue: 80%+ of styling is inline React.CSSProperties with hardcoded font names, colors, and measurements. No consistent component abstraction layer
- Files: `src/pages/About.tsx` (402 lines), `src/pages/Contact.tsx` (340 lines), `src/pages/Services.tsx` (235 lines), `src/components/layout/Navbar.tsx` (224 lines), all page sections
- Impact: Style changes require touching 50+ component instances. Font stack changes require find-replace across entire codebase. No reusable style tokens
- Fix approach: Extract inline style objects into utility functions or CSS-in-JS classes. Create shared style constants for typography, spacing, and color combinations

**Font Stack Inconsistency:**
- Issue: Three font families used (Playfair Display, Crimson Pro, Barlow) but loaded via Google Fonts with `display=swap` in index.html. Specification called for Syne, IBM Plex Mono, and Libre Baskerville
- Files: `index.html`, `src/styles/globals.css`, all TSX files with font declarations
- Impact: Fonts specified in CLAUDE.md don't match implementation. Specification references don't help with actual code. Potential FOUT (flash of unstyled text) with current setup
- Fix approach: Decide whether to: (a) update Google Fonts import to match CLAUDE.md spec, or (b) update CLAUDE.md to reflect current fonts. Then update all hardcoded font names across codebase

**Missing CSS Variable Definitions:**
- Issue: Tailwind config references CSS variables that don't exist or don't match usage (`--color-accent-dim`, `--color-accent-light` in tailwind.config.ts not used in actual CSS variables). Specification called for `--color-accent`, `--color-accent-dim`, `--color-accent-light`
- Files: `tailwind.config.ts`, `src/styles/globals.css`
- Impact: Tailwind utilities may not work as intended if CSS variables are missing
- Fix approach: Audit which CSS variables are actually needed and ensure all defined in globals.css match tailwind.config.ts

---

## Critical Missing Features

**Contact Form Not Connected to Backend:**
- Problem: Contact form in `src/pages/Contact.tsx` (lines 72-76) only logs to console and shows success message. Does not send data anywhere
- Files: `src/pages/Contact.tsx`
- Blocks: Leads cannot be captured. Client has no way to receive contact requests
- Priority: **CRITICAL** — Must be implemented before launch
- Fix approach: Connect to Formspree, Netlify Forms, or custom API endpoint. Handle errors, loading states, and email verification

**Placeholder Content Not Filled In:**
- Problem: 30+ TODO comments throughout codebase for placeholder content
- Files affected:
  - `src/lib/structuredData.ts` (phone, address, city, state, zip, latitude/longitude, service area)
  - `src/data/services.ts` (full service descriptions × 6)
  - `src/data/testimonials.ts` (all testimonial text)
  - `src/pages/Contact.tsx` (phone, email, address, hours)
  - `src/pages/About.tsx` (owner story, credentials, service area towns, Google Maps)
  - `src/pages/Services.tsx` (project photos)
  - `src/components/layout/Footer.tsx` (contact details, license number)
  - `src/components/sections/CTABanner.tsx` (phone number)
- Impact: JSON-LD structured data is invalid (has `[PHONE]`, `[ADDRESS]`, lat/long 0.0). Pages show obviously incomplete content. SEO impact is severe
- Priority: **CRITICAL** — Blocks launch readiness
- Fix approach: Create migration script or form to fill in client business details once, then hydrate all templates

**No Form Validation Error Display:**
- Problem: Contact form uses React Hook Form but doesn't validate phone number format or email properly
- Files: `src/pages/Contact.tsx` (lines 282-305)
- Impact: Invalid data can be submitted. Client receives junk leads
- Fix approach: Add phone validation regex, improve email pattern, add real-time field validation feedback

---

## Security Considerations

**Hard-Coded Phone Numbers and Email Addresses:**
- Risk: Placeholder values scattered throughout code (e.g., `(555) 000-0000`, `info@reecegroupllc.com`)
- Files: `src/pages/Contact.tsx`, `src/components/layout/Footer.tsx`, `src/components/sections/CTABanner.tsx`, `src/lib/structuredData.ts`
- Current mitigation: These are obviously placeholders (555 is not valid)
- Recommendations: Store business contact details in environment variables or a config file. Never hard-code in components

**No Environment Variable Configuration:**
- Risk: No `.env.example` or configuration system for business details, API endpoints, or deployment targets
- Files: `vite.config.ts`, src (all pages)
- Current mitigation: Manual find-replace before launch required
- Recommendations: Create `src/config.ts` that reads from environment, add `.env.example` to git with template values

**SEO Hard-Coded with Placeholders:**
- Risk: Meta tags, structured data, and canonical URLs contain placeholder text (`[City]`, `[State]`, `[PHONE]`)
- Files: `src/lib/structuredData.ts`, all pages
- Impact: Search engines will index invalid data. Duplicate content across locations (if cloned for multiple cities)
- Recommendations: Move business data to config file or API, populate at runtime

---

## Performance Bottlenecks

**Large Page Components with Inline Styles:**
- Problem: Pages like `About.tsx` (402 lines) and `Contact.tsx` (340 lines) contain massive amounts of inline style objects, making components hard to optimize and re-render heavy
- Files: `src/pages/About.tsx`, `src/pages/Contact.tsx`
- Cause: No CSS abstraction layer; all styling is collocated with JSX
- Improvement path: Extract styles to CSS modules or CSS-in-JS. This will also improve dev DX and allow style reuse

**Lazy Loading Not Optimized:**
- Problem: All pages use `React.lazy()` with Suspense, but `PageFallback` is a bare div with no skeleton or progressive enhancement
- Files: `src/App.tsx` (line 19)
- Cause: Placeholder is minimal but doesn't give user visual feedback during load
- Improvement path: Create a real skeleton UI for the page fallback. Preload critical pages on route hover

**No Image Optimization:**
- Problem: Project photos are placeholder divs. When real images are added, there's no lazy loading, srcset, or format optimization
- Files: `src/pages/Services.tsx` (line 59)
- Cause: Photos not yet implemented
- Improvement path: Use `<img loading="lazy">` with alt text. Consider WebP format and multiple sizes via srcset

**Google Fonts Loaded Synchronously:**
- Problem: Font preload in index.html uses `display=swap` which is good, but multiple font weights and styles are requested
- Files: `index.html`
- Cause: Loading three font families with multiple weights
- Improvement path: Limit font weights to essential ones only. Use system font stack as fallback to eliminate FOUT entirely

---

## Fragile Areas

**Contact Form State Management:**
- Files: `src/pages/Contact.tsx`
- Why fragile: Uses local `submitted` state to show success message. If form submission fails, user never gets error feedback. No retry mechanism. Refreshing page clears form but not success message
- Safe modification: Add proper error state, loading state, and timeout handling. Consider moving form state to context or custom hook if more pages get forms
- Test coverage: No tests for form submission flow, validation, or error states

**Navigation Active State Detection:**
- Files: `src/components/layout/Navbar.tsx` (lines 88-110)
- Why fragile: Uses manual onMouseEnter/onMouseLeave handlers and className checking via string includes. React Router NavLink should handle active state, but hover handler tries to override it
- Safe modification: Remove manual hover handlers. Use CSS-in-JS or Tailwind classes to handle hover state declaratively
- Test coverage: No tests for nav link active states across different routes

**Responsive Grid Layouts via Inline Media Queries:**
- Files: `src/pages/Services.tsx`, `src/pages/Contact.tsx`, all component sections
- Why fragile: Breakpoint logic buried in `<style>` tags at bottom of components. If breakpoint changes, must update multiple places
- Safe modification: Extract breakpoint constants to shared file. Use consistent media query syntax
- Test coverage: No visual regression tests for responsive behavior

---

## Test Coverage Gaps

**No Automated Tests:**
- What's not tested:
  - Form validation and submission flow
  - Page routing and transitions
  - Component rendering at different breakpoints
  - SEO metadata on each page
  - StatCard counter animation logic
- Files: All src files (no `.test.tsx` or `.spec.tsx` files exist)
- Risk: Regressions go unnoticed. Changes to contact form could break lead capture without warning
- Priority: **HIGH** — Add at least integration tests for critical user flows (contact form, navigation)

**No Accessibility Testing:**
- Problem: No automated a11y testing. Manual testing not documented
- Files: All pages and components
- Risk: WCAG violations not caught. Screen reader users can't navigate properly. Lighthouse a11y score may not reflect real-world issues
- Recommendations: Add `@testing-library/jest-axe`, test heading hierarchy, color contrast, keyboard navigation

---

## Known Bugs

**Color Variable Reference Mismatch:**
- Symptoms: Some components reference `--color-primary` (green) where spec says `--color-accent` (should be blue/burgundy)
- Files: Multiple pages use `--color-primary` for accent colors when spec uses `--color-accent`
- Trigger: Inconsistent variable naming from theme change
- Workaround: Visual design is consistent (accent is green throughout), but naming is misleading

**Mobile Menu Doesn't Close on Link Click:**
- Symptoms: After opening mobile menu and clicking a nav link, menu stays open
- Files: `src/components/layout/Navbar.tsx` (line 148 close only on backdrop click, not on link click)
- Trigger: Click nav link in mobile menu
- Workaround: User must manually click the area outside menu or press back

**Navbar Active Link Styling Broken on Nested Routes:**
- Symptoms: `/services/[detail]` (if added) would break active state detection for "Services" link
- Files: `src/components/layout/Navbar.tsx` (line 92 uses `end` prop only for home)
- Trigger: Add nested service detail page
- Workaround: Current flat routing structure avoids this

---

## Scaling Limits

**Hardcoded Data in Source Files:**
- Current capacity: 6 services, ~10 testimonials, 6 FAQs
- Limit: Adding more requires editing .ts files and redeploying
- Scaling path: Move services, testimonials, FAQs to headless CMS (Strapi, Contentful, Sanity) or JSON API. Load at runtime instead of build time

**Single Layout for All Pages:**
- Current: Single Layout component used for all routes
- Limit: Each page must implement its own full-width sections. If pages need different header/footer layouts, must fork the whole Layout
- Scaling path: Create page-specific layout variants or use layout route structure in React Router v6

**No Multi-Location Support:**
- Current: All content hard-coded for one city
- Limit: Can't easily create separate sites for multiple locations served
- Scaling path: If client expands to multiple cities, would require parameterized routing and data loading strategy

---

## Dependencies at Risk

**Framer Motion Large Bundle:**
- Risk: `framer-motion` is 44KB minified, used only for scroll reveals and page transitions
- Impact: Adds to initial load time. Not critical to core functionality
- Migration plan: Replace with lighter alternatives (CSS animations for reveals, native scroll behavior for transitions) or keep if performance metrics are acceptable

**React Router v6 with Lazy Routes:**
- Risk: Dynamic import of pages means first page load waits for route matching + lazy bundle download
- Impact: Slight initial delay if user lands on /services or /about first
- Mitigation: Using Suspense with fallback is correct pattern. Could preload next likely routes on hover
- No action needed currently, but monitor Core Web Vitals

**No Type Safety for Styled Components:**
- Risk: All inline styles are React.CSSProperties, which is permissive and allows invalid CSS
- Impact: Typos in property names or values won't be caught until runtime
- Alternative: Consider Tailwind CSS for all styling instead of inline styles (would fix many debt issues)

---

## Deployment Readiness Issues

**Missing Production Build Verification:**
- Problem: `npm run build` may pass but production bundle may have issues
- Missing: Lighthouse audit before deployment, bundle size analysis
- Recommendation: Add pre-deploy verification script that checks: Lighthouse scores, bundle size, TypeScript strict mode, broken links

**No Error Boundary:**
- Problem: If any component throws an error, entire app crashes to blank page
- Files: `src/App.tsx`
- Fix: Add React Error Boundary component to catch and display graceful fallback

**No 404 Page Design:**
- Problem: `src/pages/NotFound.tsx` exists but renders a placeholder
- Impact: Users who land on invalid URLs see broken experience
- Fix: Design and implement proper 404 page with helpful links

---

*Concerns audit: 2025-02-26*
