# Project Research Summary

**Project:** Reece Group LLC — UI Redesign (Navy & White Editorial Design System)
**Domain:** Premium B2C trades/contractor service website — visual redesign of existing React app
**Researched:** 2026-03-04
**Confidence:** HIGH

## Executive Summary

This is a visual redesign of an already-built, fully functional React 18 + TypeScript + Tailwind CSS website. The existing architecture, routing, SEO, and data layers are sound and untouched — the entire scope is replacing the design system: color tokens, typography, component styling. The research-validated direction is a navy-dominant color system (primary dark: `#0A1628`) with a warm off-white page background (`#F8F7F5`), gold as the sole accent color (`#C9A84C`), and a two-font pairing of Fraunces (display/headings) + DM Sans (body and labels). This combination projects the "established, permanent, professional" authority that premium trades sites achieve and generic template sites fail to deliver. The single most important visual outcome: a visitor should perceive the brand as the most established electrician in the area before reading a word of copy.

The recommended redesign approach is a strict foundation-first sequence: replace CSS tokens in `globals.css` first, update `index.html` fonts and `tailwind.config.ts` in the same commit, then proceed component-by-component from atomic to composite to section to page. This order is non-negotiable — the codebase has a documented history of token drift (CSS variables defined in config but never in globals.css), and skipping the foundation step propagates inconsistency into every component. No new dependencies are required. All changes are styling-layer only.

The primary risks in this redesign are all execution-related, not design-related. The codebase uses JavaScript-managed hover states (`onMouseEnter`/`el.style`) rather than CSS `:hover`, which means font and color changes to hover objects must be made in JS code, not CSS — a silent failure mode. Inline `<style>` blocks with hardcoded class names create orphaned responsive rules if class names change during restructuring. And `AnimatePresence` will break exit animations if JSX restructuring adds wrapper elements between it and its `motion.*` children. These are all preventable with a deliberate build sequence and a per-component verification checklist.

## Key Findings

### Recommended Stack

The tech stack is locked — no new packages, no version changes, no migrations. React 18 + TypeScript + Tailwind CSS 3.4.3 + Framer Motion 11 + Vite 5 is the correct foundation. The only changes at the infrastructure level are: (1) replace the Google Fonts `<link>` URL in `index.html` with Fraunces + DM Sans, (2) replace the `:root` CSS variable block in `globals.css` with the new two-layer token system, and (3) sync `tailwind.config.ts` to match new token names. Tailwind v4 migration is explicitly out of scope.

**Core technologies:**
- React 18 + TypeScript: UI framework — sound, do not touch architecture
- Tailwind CSS 3.4.3: Utility styling — CSS variable bridge pattern stays; only values change
- Framer Motion 11: Animation — all animation configs (whileInView, AnimatePresence, staggerChildren) are reused unchanged; only color values in animated elements change
- Fraunces (variable font, opsz/wght axes): Display/headings — replaces Playfair Display/Syne; projects established authority without luxury-spa register
- DM Sans (variable font, opsz/wght axes): Body + UI labels — replaces Libre Baskerville and IBM Plex Mono; two fonts instead of three reduces FOUT risk and load weight
- Gold `#C9A84C` accent: CTAs, annotation numbers, active states — replaces electric blue; on navy, gold signals permanence rather than creating hue conflict

### Expected Features

The redesign is quality-level shift, not a feature-addition project. Every item below is restoring existing structural features to premium visual execution.

**Must have (table stakes — already exist, must survive redesign):**
- Prominent phone number in navbar as `tel:` link with 44px minimum tap target
- Sticky header with scroll-triggered shadow at 60px scroll depth
- Trust credentials (license, insurance, years experience) above the fold
- One H1 per page, heading hierarchy that never skips levels
- Mobile-first responsive layout at 375px, 768px, 1280px, 1440px
- Contact form with validation (React Hook Form — behavior untouched)
- JSON-LD structured data on every page (untouched)

**Should have (differentiators — the redesign goal):**
- Navy-dominant color system: each section with a distinct visual identity (not the same white shell for every section)
- Hero typography at 88px+ desktop with tight tracking — the headline must anchor the page without a photographic background
- Flat CTA buttons with 2px border-radius and DM Sans uppercase labels — removes the rounded-gradient template signal
- Why Us section using checklist-card layout instead of icon grid — the icon grid is the single most-copied contractor template pattern
- Stats section in full-width dark navy — the one dark-dominant section creates a visual chapter break that proves the page was designed, not templated
- Testimonial cards with full name + city — "Sarah M., [City]" signals a real person; anonymous attribution signals a widget
- Annotation labels numbered and functioning as section wayfinding (01, 02, 03...)
- Section spacing with generous padding (py-28 desktop, py-16 mobile) — negative space is the highest-leverage editorial technique
- staggerChildren scroll-reveal animations on all grid sections (0.08s stagger)
- Fraunces at correct optical size (opsz 9 for display, opsz 14 for H3) — this is what separates Fraunces from generic alternatives

**Defer (v2+ — requires client content):**
- Real project photography replacing placeholder boxes
- Real Google Reviews replacing placeholder testimonials
- Project portfolio gallery (requires enough completed projects)
- Before/after sliders on service pages

### Architecture Approach

The redesign operates exclusively on the Styling Layer and Presentation Layer of the existing six-layer architecture (Page, Section, UI Component, Layout, Styling, Data/SEO). The Data layer (`src/data/`), SEO layer (`src/lib/structuredData.ts`, `SEOHead.tsx`), routing (`App.tsx`), and form logic are strictly off-limits. This is a find-and-replace of values within existing component files, with a structural rewrite of Hero section layout being the only exception. The dependency order for edits is: globals.css → index.html → tailwind.config.ts → atomic UI components (Button, AnnotationLabel, RuledDivider) → composite UI components (ServiceCard, StatCard, TestimonialCard, Accordion) → layout components (Navbar, Footer) → section components (Hero, TrustBar, ServicesGrid, WhyUs, StatsRow, Testimonials, CTABanner) → pages.

**Major components and their redesign scope:**
1. `globals.css` — full `:root` replacement with two-layer palette/semantic token system; this propagates color changes to all `var(--color-*)` consumers automatically
2. `index.html` — Google Fonts URL swap to Fraunces + DM Sans with all required weight axes
3. `Button.tsx` — update `variantBase` and `variantHover` JS objects (both, in the same edit) with new colors and font family strings
4. `Navbar.tsx` — restyle inline objects; update `isActive` callback colors; do not rename `.nav-desktop`/`.nav-hamburger` classes or mobile menu breaks
5. `Hero.tsx` — structural rewrite of section layout to new navy-dominant, text-only hero; heaviest change in the redesign
6. All section components — in-place restyle of color and font values; no prop interface changes

### Critical Pitfalls

1. **Incomplete CSS variable replacement (ghost values)** — The build passes even when a CSS variable is referenced but undefined; the browser silently renders a fallback. This codebase has already drifted once (CLAUDE.md specified `--color-accent` as blue but implementation used it as burgundy). Prevention: grep for every old variable name before and after replacement; delete old definitions from `:root` after renaming to force discovery of missed references.

2. **JS hover states silently reverting to old font after font replacement** — Button.tsx and Navbar.tsx apply hover styles via `Object.assign(el.style, variantHover[variant])` at runtime. CSS changes do not propagate into these JS-applied styles. Prevention: update `fontFamily` strings inside both `variantBase` and `variantHover` objects in the same commit as the font token changes — never as a separate pass.

3. **Inline `<style>` block class name orphaning breaks mobile layout** — Responsive `@media` rules in `<style>` blocks target hardcoded class names (`.nav-desktop`, `.services-grid`, etc.). If class names change during JSX restructuring, the media queries apply to nothing; desktop renders correctly but mobile silently collapses. Prevention: audit the `<style>` block as a mandatory checklist item whenever a component is structurally changed.

4. **AnimatePresence exit animations breaking on JSX restructuring** — Adding a non-motion wrapper between `AnimatePresence` and its `motion.*` children causes exit animations to fire instantly (no animation). Affects page transitions and mobile menu. Prevention: keep `motion.*` elements as direct children of `AnimatePresence`; never wrap them in a Fragment or new `<div>`.

5. **Font weights not loaded causing heading fallback** — Google Fonts requires explicit weight enumeration in the query string. If weight 900 is needed but only 700 is loaded, browser synthesizes 900 from 700 — headings look lighter than intended and fail the "commands attention" goal. Prevention: verify loaded font weight files in DevTools Network > Font tab in an incognito window on throttled connection.

## Implications for Roadmap

Based on combined research, a five-phase structure is recommended. The first phase is non-negotiable and must complete before any subsequent phase begins — the token foundation is the single point of failure that cascades into every other change.

### Phase 1: Design Token Foundation
**Rationale:** The codebase has a documented token drift problem — CSS variables referenced in components that do not exist in globals.css. Starting with tokens means every subsequent component edit references a correct, complete token set rather than adding to the inconsistency. This is the highest-leverage, lowest-risk first step.
**Delivers:** Complete two-layer CSS variable system in globals.css (palette layer + semantic layer); Tailwind config fully synced; Fraunces + DM Sans loaded via index.html with all required weight axes; font CSS variables added to globals.css so components reference `var(--font-display)` rather than hardcoded strings; old token definitions deleted to force discovery of ghost references.
**Addresses:** Navy-dominant color system, gold accent, warm off-white page background, two-font reduction from three
**Avoids:** Ghost CSS variable pitfall, Tailwind config drift pitfall, font weight loading pitfall

### Phase 2: Atomic UI Components
**Rationale:** Atomic components (Button, AnnotationLabel, RuledDivider) have no dependencies on other project components. Restyling them first means every composite component and section that uses them automatically sees the correct new visual state during subsequent work — no mismatched intermediate states.
**Delivers:** Button variants (primary/secondary/ghost) with gold CTA, 2px border-radius, flat color, DM Sans uppercase labels — the single biggest template-signal removal; AnnotationLabel in new color and font with both normal and inverted states verified; RuledDivider updated
**Uses:** Fraunces + DM Sans fonts, gold accent from Phase 1 tokens
**Avoids:** JS hover state silent font-reversion pitfall (update both variantBase AND variantHover in same commit)

### Phase 3: Layout Chrome (Navbar + Footer)
**Rationale:** Navbar and Footer appear on every page. Getting these correct before section work means the surrounding chrome is stable while interior sections are restyled — visual coherence is apparent from the first section change onward.
**Delivers:** Navbar with navy/gold active states, correct isActive callback colors, DM Sans nav labels; Footer in surface-white with editorial column structure (not dark-background widget pattern); mobile menu verified open/close at 375px
**Implements:** Layout layer components
**Avoids:** isActive callback color pitfall; mobile class name orphaning pitfall (do not rename `.nav-desktop`/`.nav-hamburger`)

### Phase 4: Section Redesign
**Rationale:** Sections compose the atomic and layout components from Phases 2-3. This is the bulk of visual work and the phase where each section gets its distinct visual identity. Hero is the highest-visibility change and should be tackled first within this phase.
**Delivers:** Hero with commanding Fraunces 900 headline at clamp(48px, 9vw, 96px) on warm off-white background (no photo); TrustBar as white-surface strip with border-dark top and bottom; ServicesGrid with top-border ServiceCards shifting ink→gold on hover; WhyUs with checklist-card in white surface (not icon grid); StatsRow in full-width dark navy with gold numbers and DM Sans labels; Testimonials with full-name + city attribution; CTABanner in gold-accent background
**Addresses:** Every differentiator feature — section visual identity variety, hero without photo, dark chapter-break section, checklist card
**Avoids:** AnimatePresence exit animation pitfall (do not add wrappers between AnimatePresence and motion children); inline style block class name orphaning (audit `<style>` block after any JSX restructuring)

### Phase 5: Pages and Verification
**Rationale:** Pages are thin composers. Most page-level inline styles are padding overrides and grid definitions — minimal edits. The verification pass ensures nothing regressed across the full build.
**Delivers:** Home, Services, About, Contact pages with any remaining inline style cleanup; full verification checklist: `npm run build` zero errors, `npm run preview` all 4 routes, hover state testing on all button variants, mobile menu open/close at 375px, route transitions with exit animations, Lighthouse SEO 100 + Accessibility 90+ maintained
**Avoids:** "Looks done but isn't" failure mode — the checklist from PITFALLS.md must be completed, not skipped

### Phase Ordering Rationale

- **Tokens must precede all component work** because CSS variable references fail silently. A component edit made before the token foundation is set will reference undefined variables and appear broken, then require rework after tokens are fixed. There is no shortcut here.
- **Atomic before composite before section** follows dependency order — a ServiceCard uses AnnotationLabel; editing ServiceCard before AnnotationLabel means it temporarily renders with an incorrect AnnotationLabel, making visual assessment unreliable.
- **Layout before sections** because Navbar and Footer render on every page. An unstyled Navbar during section work creates cognitive noise that makes it harder to evaluate whether section changes are correct.
- **Section before page** because pages are thin — the page layer exists to compose sections and attach SEOHead. If sections are correct, pages require minimal edits.

### Research Flags

Phases with standard patterns (skip research-phase — patterns are well-documented and research is complete):
- **Phase 1 (Token Foundation):** CSS custom property architecture is fully documented in official Tailwind and MDN sources; two-layer token pattern is established. No further research needed.
- **Phase 2 (Atomic Components):** Button styling patterns are standard; the specific hover state JS pattern in this codebase is documented in CONCERNS.md. No further research needed.
- **Phase 3 (Layout Chrome):** Navbar scroll-shadow and isActive patterns are well-documented in React Router v6 docs. No further research needed.

Phases that may benefit from targeted research during planning:
- **Phase 4 (Section Redesign — Hero specifically):** The Hero section requires a structural rewrite (new layout direction, not in-place restyle). Before writing JSX, confirm the exact grid layout structure for the new navy-dominant hero. 15-minute targeted research into the Fraunces optical size axis behavior at large sizes would be worthwhile.
- **Phase 4 (StatsRow dark section):** The contrast of gold numbers on `#0A1628` navy needs to be verified against WCAG AA before implementation (minimum 4.5:1 for normal text, 3:1 for large text). Quick contrast ratio check recommended before coding the section.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Core technology decisions are verified against official Framer Motion, Tailwind v3, and Google Fonts documentation. Font pairing recommendation has MEDIUM confidence on one corroborating source but is well-reasoned from typography first principles. |
| Features | MEDIUM-HIGH | Anti-features list is corroborated across 20+ contractor site analyses. Premium differentiator claims (navy = authority, no hero photo as premium signal) are supported by editorial design research but lack direct trades-specific A/B test data. |
| Architecture | HIGH | Based on direct codebase inspection of actual files. Component dependency order is confirmed from file structure. Risk areas (isActive callback, hover handler pattern, AnimatePresence constraints) are from official documentation and verified code review. |
| Pitfalls | HIGH | Derived from direct codebase analysis of CONCERNS.md, CONVENTIONS.md, and source files, cross-referenced with official Framer Motion and Tailwind documentation. The specific pitfalls named are real patterns present in this specific codebase, not generic risks. |

**Overall confidence:** HIGH

### Gaps to Address

- **Gold accent WCAG contrast on dark navy:** `#C9A84C` on `#0A1628` — confirm contrast ratio meets WCAG AA (3:1 large text, 4.5:1 normal text) before finalizing stat number and annotation label colors. If it fails, use `#D4A853` or `#E0BC70` as the next step up.
- **Fraunces at 900 weight rendering on Windows:** Variable font rendering on Windows GDI can look heavier than on macOS. Test in a Windows browser (Chrome on Windows) at the 900 weight to confirm it remains legible and not over-inked at body-adjacent sizes.
- **Mobile menu close-on-link-click:** MEMORY.md notes this as a known bug. The redesign is an opportunity to verify whether `onClick={() => setMenuOpen(false)}` is correctly wired to mobile NavLinks or still missing. Check before Phase 3 completion.
- **`--color-accent-dim` and `--color-accent-light` gap:** Currently in tailwind.config.ts but undefined in globals.css. Phase 1 must explicitly define these tokens (as `--color-accent-dim: #A8893A` and `--color-accent-light: #F7F0DC`) or remove them from the Tailwind config to close the existing bug.

## Sources

### Primary (HIGH confidence)
- Framer Motion official docs — transition curves, whileInView, AnimatePresence, staggerChildren, MotionConfig reducedMotion
- Tailwind CSS v3 official docs — CSS variable bridge pattern, theme.extend.colors, Adding Custom Styles
- React Router v6 official docs — NavLink isActive callback pattern
- Direct codebase inspection — Button.tsx, Navbar.tsx, globals.css, tailwind.config.ts, CONCERNS.md, CONVENTIONS.md

### Secondary (MEDIUM confidence)
- SiteBuilderReport, CyberOptik, Hook Agency, Comrade Digital Marketing — electrician and contractor website pattern analysis (20+ sites reviewed)
- Google Design / Fraunces origin story — design intent and optical size axis behavior
- Typewolf — competitive display font analysis for trades context
- CSS-Tricks — Google Fonts FOUT and Lighthouse font-display recommendations
- Smashing Magazine — editorial design patterns with CSS Grid

### Tertiary (LOW confidence — patterns sound, single sources)
- Soleil Sundays — Cormorant + DM Sans pairing (used to inform rejection of Cormorant, not adoption)
- FrontendTools — Tailwind design token migration patterns (patterns verified against official docs)

---
*Research completed: 2026-03-04*
*Ready for roadmap: yes*
