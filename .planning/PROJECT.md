# Reece Group LLC — UI Redesign

## What This Is

A complete visual redesign of the existing Reece Group LLC electrician website. The site is built in React + TypeScript + Vite with Tailwind CSS and Framer Motion. The current implementation has the right content and structure but the visual execution feels generic and template-like. This project replaces the entire design layer with a premium, editorially-driven aesthetic that projects trust and authority.

## Core Value

A visitor lands and immediately thinks: *this is the most established electrician in the area* — before reading a single word.

## Requirements

### Validated

- ✓ Multi-page SPA with React Router (Home, Services, About, Contact, 404) — existing
- ✓ Per-page SEO with React Helmet Async and JSON-LD structured data — existing
- ✓ Contact form with React Hook Form validation — existing
- ✓ Framer Motion page transitions and section reveals — existing
- ✓ Responsive layout (mobile + desktop) — existing
- ✓ Data layer for services, FAQs, testimonials — existing
- ✓ Navbar with mobile hamburger menu — existing
- ✓ Footer with contact info and quick links — existing

### Active

- [ ] Complete color system overhaul — deep navy dominant (#0A1628 or similar) with clean white, single warm accent
- [ ] Typography overhaul — commanding headlines that demand attention, clear hierarchy that doesn't apologize
- [ ] Section redesign — each section has a distinct visual purpose, no copy-pasted block feeling
- [ ] Visual flow between sections — deliberate transitions and spatial relationships, not just stacked divs
- [ ] Personality specific to scale of work — imagery and layout signals that this company handles serious, significant jobs
- [ ] Some structural refinement — sections added, removed, or reorganized where the redesign calls for it
- [ ] CSS variable system replacement — new design tokens to replace the current blueprint-paper palette
- [ ] Font pairing replacement — new typefaces chosen for premium editorial feel

### Out of Scope

- Backend/API changes — no new integrations, existing form action logic unchanged
- Content changes — placeholder TODOs (phone, address, license #) remain as-is; client fills those
- SEO schema changes — JSON-LD structure stays; only visual presentation changes
- New pages — redesign covers existing 4 pages + 404 only
- Lightning bolts, electrical clip art, or cliché trade iconography — explicitly excluded

## Context

The current site was built to a detailed spec (CLAUDE.md) using a "Blueprint Modernist" theme — warm off-white drafting paper background, IBM Plex Mono annotation labels, ruled horizontal lines. The execution followed the spec correctly but the result reads as generic because:

1. **Typography lacks conviction** — headlines don't command attention at their size
2. **Sections feel copy-pasted** — each section is a self-contained template block with no visual relationship to adjacent sections
3. **No personality** — the aesthetic could belong to any professional services business
4. **Color story is muddled** — the blueprint accent blue conflicts with the warm paper palette without creating tension that feels intentional

The redesign is a complete overhaul of the visual layer. The component architecture (React Router, Helmet, Hook Form, Framer Motion) is sound and stays. The design *system* — colors, typography, spacing philosophy, component aesthetics — is replaced entirely.

**Existing codebase map:** `.planning/codebase/` (7 documents covering stack, architecture, conventions, concerns)

## Constraints

- **Tech stack**: React + TypeScript + Tailwind CSS + Framer Motion — no new dependencies unless genuinely necessary
- **Fonts**: Can be changed entirely — loaded via `index.html` `<link>` tags from Google Fonts
- **Existing component structure**: Prefer editing existing components over creating new ones where possible
- **Build**: Must pass `npm run build` with zero TypeScript errors
- **Performance**: Lighthouse performance score 90+ target maintained

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Navy & white color direction | User selected: deep navy dominant, clean white — institutional and trustworthy | — Pending |
| Clean & editorial aesthetic | User selected: white space, strong type hierarchy, minimal color | — Pending |
| Visual + some restructuring scope | Not just skin-deep — some sections may be reorganized | — Pending |
| Keep existing component architecture | Rewriting architecture would be out of scope; visual layer only | — Pending |

---
*Last updated: 2026-03-04 after initialization*
