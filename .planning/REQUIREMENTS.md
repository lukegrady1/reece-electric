# Requirements: Reece Group LLC — UI Redesign

**Defined:** 2026-03-04
**Core Value:** A visitor lands and immediately thinks: *this is the most established electrician in the area* — before reading a single word.

## v1 Requirements

### Design System (DS)

- [ ] **DS-01**: New CSS variable token set replaces current blueprint palette (navy #0A1628, gold #C9A84C, warm white, surface tones) in globals.css
- [ ] **DS-02**: Two-layer token architecture — palette vars + semantic vars — defined atomically in globals.css
- [ ] **DS-03**: Tailwind config updated to bridge new semantic tokens to utility classes
- [ ] **DS-04**: Body background changed from ruled-paper repeating-linear-gradient pattern to clean warm white

### Typography (TYPE)

- [ ] **TYPE-01**: Fraunces (display/headings) + DM Sans (body/labels) replaces current Playfair Display / Barlow / Crimson Pro
- [ ] **TYPE-02**: Google Fonts link in index.html updated with new font families and required weights
- [ ] **TYPE-03**: Typography scale applied consistently across all components — commanding headline sizes, clear hierarchy

### Atomic Components (COMP)

- [ ] **COMP-01**: Button reskinned — navy/gold palette, premium feel, JS hover state objects updated alongside CSS changes
- [ ] **COMP-02**: AnnotationLabel reskinned — new label style fitting editorial direction
- [ ] **COMP-03**: ServiceCard reskinned — distinctive visual identity, not a border-top template card
- [ ] **COMP-04**: TestimonialCard reskinned — editorial quote presentation
- [ ] **COMP-05**: StatCard reskinned — numbers in gold accent, new number treatment
- [ ] **COMP-06**: Accordion reskinned — clean, editorial FAQ expansion

### Layout Chrome (LAYOUT)

- [ ] **LAYOUT-01**: Navbar redesigned — premium presence, navy or high-contrast treatment
- [ ] **LAYOUT-02**: Footer redesigned — elevated presentation, not a generic three-column grid
- [ ] **LAYOUT-03**: Mobile menu redesigned to match new visual direction

### Sections (SECT)

- [ ] **SECT-01**: Hero section redesigned — commanding editorial headline, typography carries full visual weight, no background image
- [ ] **SECT-02**: Trust bar redesigned — new format replacing the current 5-item separator strip
- [ ] **SECT-03**: Services grid redesigned — section has distinct visual identity
- [ ] **SECT-04**: Why Us section redesigned — checklist card replaced with more distinctive format (not an icon grid)
- [ ] **SECT-05**: Stats row redesigned — editorial and deliberate, not a generic dark contrast break
- [ ] **SECT-06**: Testimonials redesigned — distinct visual character
- [ ] **SECT-07**: CTA banner redesigned — premium call to action

### Inner Pages (PAGE)

- [ ] **PAGE-01**: Services page redesigned with new design system applied
- [ ] **PAGE-02**: About page redesigned with new design system applied
- [ ] **PAGE-03**: Contact page redesigned with new design system applied

### Verification (VER)

- [ ] **VER-01**: npm run build passes with zero TypeScript errors
- [ ] **VER-02**: No horizontal scroll at 375px mobile viewport
- [ ] **VER-03**: All existing functionality preserved (form validation, nav links, routing, SEO metadata)

## v2 Requirements

### Future enhancements (deferred)

- Real project photography replacing placeholder boxes
- Google Maps embed replacing placeholder div
- Real testimonials replacing placeholder reviews
- Formspree / Netlify Forms integration for contact form submission

## Out of Scope

| Feature | Reason |
|---------|--------|
| New pages | Redesign covers existing 4 pages + 404 only |
| Backend/API changes | No new integrations — form action logic unchanged |
| SEO schema changes | JSON-LD structure stays; only visual presentation changes |
| Lightning bolt / electrical clip art | Explicitly excluded — cliché trades iconography |
| Adding icon grids to Why Us | Research confirms this is the most identifiable template signal |
| Mobile app | Web-first site only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DS-01 | Phase 1 | Pending |
| DS-02 | Phase 1 | Pending |
| DS-03 | Phase 1 | Pending |
| DS-04 | Phase 1 | Pending |
| TYPE-01 | Phase 1 | Pending |
| TYPE-02 | Phase 1 | Pending |
| TYPE-03 | Phase 1 | Pending |
| COMP-01 | Phase 2 | Pending |
| COMP-02 | Phase 2 | Pending |
| COMP-03 | Phase 2 | Pending |
| COMP-04 | Phase 2 | Pending |
| COMP-05 | Phase 2 | Pending |
| COMP-06 | Phase 2 | Pending |
| LAYOUT-01 | Phase 3 | Pending |
| LAYOUT-02 | Phase 3 | Pending |
| LAYOUT-03 | Phase 3 | Pending |
| SECT-01 | Phase 4 | Pending |
| SECT-02 | Phase 4 | Pending |
| SECT-03 | Phase 4 | Pending |
| SECT-04 | Phase 4 | Pending |
| SECT-05 | Phase 4 | Pending |
| SECT-06 | Phase 4 | Pending |
| SECT-07 | Phase 4 | Pending |
| PAGE-01 | Phase 5 | Pending |
| PAGE-02 | Phase 5 | Pending |
| PAGE-03 | Phase 5 | Pending |
| VER-01 | Phase 5 | Pending |
| VER-02 | Phase 5 | Pending |
| VER-03 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 29 total
- Mapped to phases: 29
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-04*
*Last updated: 2026-03-04 after initial definition*
