# Roadmap: Reece Group LLC — UI Redesign

## Overview

A complete visual redesign of an already-functional React + TypeScript site. The design system — colors, typography, component aesthetics — is replaced in strict dependency order: tokens first, then atomic components, then layout chrome, then homepage sections, then inner pages and verification. Each phase produces a state that is visually coherent on its own; no phase leaves the site in a broken or mismatched intermediate state.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Design Token Foundation** - Replace the entire CSS variable system, font loading, and Tailwind config bridge
- [ ] **Phase 2: Atomic UI Components** - Restyle Button, AnnotationLabel, RuledDivider to navy/gold direction
- [ ] **Phase 3: Layout Chrome** - Redesign Navbar, Footer, and mobile menu to premium editorial presence
- [ ] **Phase 4: Homepage Sections** - Restyle all seven homepage sections with distinct visual identities
- [ ] **Phase 5: Inner Pages and Verification** - Apply design system to Services, About, Contact pages and run full verification checklist

## Phase Details

### Phase 1: Design Token Foundation
**Goal**: The complete design token foundation exists and propagates correctly — every subsequent component edit references a correct, complete token set rather than undefined variables
**Depends on**: Nothing (first phase)
**Requirements**: DS-01, DS-02, DS-03, DS-04, TYPE-01, TYPE-02, TYPE-03
**Success Criteria** (what must be TRUE):
  1. The site renders with the navy/warm-white/gold color palette — background is warm off-white (#F8F7F5), no ruling-line pattern
  2. Headings display in Fraunces and body text displays in DM Sans — no fallback serif rendering
  3. All old token names (--color-bg-rule, --color-accent-light as blueprint blue, IBM Plex Mono / Playfair references) are fully purged — grep finds zero references to old variable names in globals.css
  4. npm run build passes with zero TypeScript errors after token replacement
**Plans**: TBD

Plans:
- [ ] 01-01: Replace CSS variable block in globals.css, remove ruled-paper background, sync Tailwind config
- [ ] 01-02: Swap Google Fonts link in index.html to Fraunces + DM Sans with all required weight axes

### Phase 2: Atomic UI Components
**Goal**: The lowest-level shared components (Button, AnnotationLabel, RuledDivider) render in the new navy/gold/DM Sans direction — every composite component and section that uses them automatically sees the correct new visual state
**Depends on**: Phase 1
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06
**Success Criteria** (what must be TRUE):
  1. Primary Button renders with gold background and flat 2px border-radius — no rounded-gradient template appearance; hover state in JS object (variantHover) also shows gold-dim, not the old blue
  2. AnnotationLabel renders with gold border and text on appropriate background — both the normal state (on light) and inverted state (on dark navy section) display correctly
  3. ServiceCard top border shifts from navy ink to gold on hover — hover JS handler reflects the new token
  4. StatCard numbers render in gold accent color — counter animation still triggers on scroll
  5. TestimonialCard and Accordion render with DM Sans labels and navy-palette borders — no blueprint-blue or IBM Plex Mono remnants visible
**Plans**: TBD

Plans:
- [ ] 02-01: Restyle Button (both variantBase and variantHover JS objects updated in same commit), AnnotationLabel, RuledDivider
- [ ] 02-02: Restyle ServiceCard, StatCard, TestimonialCard, Accordion

### Phase 3: Layout Chrome
**Goal**: Navbar and Footer — which frame every page — present the premium editorial presence of the new design; mobile menu verified correct at 375px
**Depends on**: Phase 2
**Requirements**: LAYOUT-01, LAYOUT-02, LAYOUT-03
**Success Criteria** (what must be TRUE):
  1. Navbar renders with navy/gold active states and DM Sans labels — the active route indicator uses gold, not blueprint blue
  2. Scroll shadow triggers correctly at 60px scroll depth — the elevated Navbar state is visually distinct
  3. Mobile menu opens and closes correctly at 375px viewport — links trigger menu close on tap; no layout collapse
  4. Footer renders with editorial column structure in surface-white — not a dark-background widget pattern
**Plans**: TBD

Plans:
- [ ] 03-01: Redesign Navbar (inline style objects, isActive callback colors, DM Sans labels, scroll shadow)
- [ ] 03-02: Redesign Footer and mobile menu (column structure, typography, close-on-link-click verification)

### Phase 4: Homepage Sections
**Goal**: Every homepage section has a distinct visual identity — a visitor scrolling the homepage sees deliberate visual chapters, not seven identical white template blocks
**Depends on**: Phase 3
**Requirements**: SECT-01, SECT-02, SECT-03, SECT-04, SECT-05, SECT-06, SECT-07
**Success Criteria** (what must be TRUE):
  1. Hero renders a commanding Fraunces headline at clamp(48px, 9vw, 96px) on warm off-white — no photographic background; the headline alone anchors the page
  2. StatsRow renders as a full-width dark navy section with gold numbers — the one dark chapter-break on the page; gold-on-navy contrast meets WCAG AA (3:1 minimum for large text)
  3. WhyUs section uses the checklist-card layout — no icon grid; this is the primary anti-template differentiator
  4. All seven sections are visually distinguishable from each other — TrustBar, ServicesGrid, WhyUs, StatsRow, Testimonials, CTABanner each have a distinct background or structural treatment
  5. Section reveal animations still trigger correctly — staggerChildren scroll-reveal fires on scroll into view, not on page load
**Plans**: TBD

Plans:
- [ ] 04-01: Redesign Hero and TrustBar
- [ ] 04-02: Redesign ServicesGrid and WhyUs
- [ ] 04-03: Redesign StatsRow, Testimonials, and CTABanner

### Phase 5: Inner Pages and Verification
**Goal**: The complete redesigned site is shippable — all four pages display the new design system, all existing functionality is preserved, and the build is verified clean
**Depends on**: Phase 4
**Requirements**: PAGE-01, PAGE-02, PAGE-03, VER-01, VER-02, VER-03
**Success Criteria** (what must be TRUE):
  1. Services, About, and Contact pages display the new design system — no blueprint-blue or old-font remnants visible on any inner page
  2. npm run build completes with zero TypeScript errors
  3. No horizontal scroll appears at 375px viewport on any of the four pages
  4. All existing functionality is preserved — contact form validation fires, routing works on all five routes (including 404), React Helmet SEO metadata is present, tel: and mailto: links are tappable
**Plans**: TBD

Plans:
- [ ] 05-01: Apply design system to Services page and About page
- [ ] 05-02: Apply design system to Contact page and run full verification checklist (build, preview, mobile, hover states, route transitions)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design Token Foundation | 0/2 | Not started | - |
| 2. Atomic UI Components | 0/2 | Not started | - |
| 3. Layout Chrome | 0/2 | Not started | - |
| 4. Homepage Sections | 0/3 | Not started | - |
| 5. Inner Pages and Verification | 0/2 | Not started | - |
