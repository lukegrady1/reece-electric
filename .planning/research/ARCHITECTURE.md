# Architecture Research

**Domain:** React + Tailwind CSS design system overhaul (visual redesign, no architectural changes)
**Researched:** 2026-03-04
**Confidence:** HIGH

## Standard Architecture

### System Overview

The existing codebase has a well-separated layered structure. The redesign operates exclusively on the Styling Layer and Presentation Layer — no changes to routing, data, SEO, or form logic.

```
┌─────────────────────────────────────────────────────────────┐
│                      Page Layer                              │
│  Home.tsx  Services.tsx  About.tsx  Contact.tsx  404.tsx    │
│  (Aggregate sections, provide SEOHead + PageWrapper)        │
├─────────────────────────────────────────────────────────────┤
│                   Section Components                         │
│  Hero  TrustBar  ServicesGrid  WhyUs  StatsRow  Testimonials│
│  CTABanner  (whileInView animations, structural layout)     │
├─────────────────────────────────────────────────────────────┤
│                     UI Components                            │
│  Button  ServiceCard  AnnotationLabel  TestimonialCard      │
│  StatCard  Accordion  RuledDivider  SEOHead  ContactForm    │
├─────────────────────────────────────────────────────────────┤
│                    Layout Layer                              │
│  Layout.tsx  Navbar.tsx  Footer.tsx  PageWrapper.tsx        │
│  (Fixed nav, skip link, main wrapper, page transitions)     │
├──────────────────────────┬──────────────────────────────────┤
│     Styling Layer        │     Data / SEO Layer             │
│  globals.css             │  src/data/ (services, faqs,      │
│  tailwind.config.ts      │  testimonials)                   │
│  CSS custom properties   │  src/lib/structuredData.ts       │
│  Google Fonts (index.html│  (JSON-LD schemas — untouched)   │
└──────────────────────────┴──────────────────────────────────┘
```

The redesign touches: globals.css, tailwind.config.ts, index.html (fonts), and every component in the Presentation Layer. It does not touch: App.tsx, routing, data files, structuredData.ts, or SEOHead logic.

### Component Responsibilities

| Component | Styling Mechanism | Redesign Impact |
|-----------|-------------------|-----------------|
| globals.css | CSS custom properties (:root), body style | REPLACE entirely — new token set |
| tailwind.config.ts | Maps CSS vars to Tailwind utilities | UPDATE — sync with new CSS vars |
| index.html | Google Fonts `<link>` tags | REPLACE — new font families |
| Navbar.tsx | 100% inline React.CSSProperties + `<style>` block | RESTYLE — all visual props |
| Footer.tsx | 100% inline React.CSSProperties | RESTYLE — all visual props |
| Hero.tsx | 100% inline React.CSSProperties | RESTYLE — color, type, layout |
| Button.tsx | Inline style objects (variantBase, variantHover dicts) | RESTYLE — variant colors and fonts |
| ServiceCard.tsx | Inline React.CSSProperties | RESTYLE — header block color, type |
| AnnotationLabel.tsx | Inline React.CSSProperties | RESTYLE — color, font, rule style |
| Section components | Inline React.CSSProperties + `<style>` blocks | RESTYLE — all visual props |
| SEOHead.tsx | No visual styling | NO CHANGE |
| structuredData.ts | No visual styling | NO CHANGE |
| src/data/*.ts | No visual styling | NO CHANGE |

## Recommended Project Structure

The existing file structure is sound — no restructuring needed. The redesign adds nothing to the file tree and removes nothing. It is a find-and-replace of values within existing files.

```
src/
├── styles/
│   └── globals.css           # STEP 1 target: new CSS custom properties
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # STEP 4 target: restyle inline objects
│   │   ├── Footer.tsx        # STEP 4 target: restyle inline objects
│   │   └── PageWrapper.tsx   # LOW CHANGE: animation values stay
│   ├── ui/
│   │   ├── Button.tsx        # STEP 3 target: restyle variant dicts
│   │   ├── AnnotationLabel.tsx # STEP 3 target: restyle rule + label
│   │   ├── ServiceCard.tsx   # STEP 3 target: restyle header block
│   │   ├── StatCard.tsx      # STEP 3 target: restyle number/label colors
│   │   ├── TestimonialCard.tsx # STEP 3 target
│   │   ├── Accordion.tsx     # STEP 3 target
│   │   └── RuledDivider.tsx  # STEP 3 target
│   └── sections/
│       ├── Hero.tsx          # STEP 4 target: heaviest visual change
│       ├── TrustBar.tsx      # STEP 4 target
│       ├── ServicesGrid.tsx  # STEP 4 target
│       ├── WhyUs.tsx         # STEP 4 target
│       ├── StatsRow.tsx      # STEP 4 target
│       ├── Testimonials.tsx  # STEP 4 target
│       └── CTABanner.tsx     # STEP 4 target
├── pages/
│   ├── Home.tsx              # STEP 5: any page-level inline styles
│   ├── Services.tsx          # STEP 5: any page-level inline styles
│   ├── About.tsx             # STEP 5: any page-level inline styles
│   └── Contact.tsx           # STEP 5: any page-level inline styles
└── (App.tsx, main.tsx, lib/, data/ — NO CHANGES)
```

## Architectural Patterns

### Pattern 1: CSS Custom Property Token Replacement (globals.css first)

**What:** Replace the entire `:root` block in `src/styles/globals.css` with the new design token set before touching any component. This is the single source of truth for the new system.

**When to use:** Always first — all subsequent component work depends on these values being correct.

**Trade-offs:** Because 80% of component styling uses `var(--color-*)` references already (confirmed from codebase review), replacing globals.css propagates a large portion of color changes automatically without touching individual components.

**Reality check:** Not all components use CSS vars. Many hardcode font family strings like `'"Playfair Display", serif'` and specific color values like `'rgba(253,250,245,0.72)'` directly in inline style objects. Those require individual component edits regardless of globals.css changes.

**Example — new globals.css structure:**
```css
:root {
  /* New token names that match the new design direction */
  --color-bg:           #0A1628;   /* deep navy — new dominant color */
  --color-surface:      #FFFFFF;   /* white panels */
  --color-surface-2:    #F5F7FA;   /* light secondary surface */
  --color-ink:          #0A1628;   /* primary text (matches bg on dark sections) */
  --color-ink-mid:      #4A5568;   /* secondary text */
  --color-ink-faint:    #A0AEC0;   /* captions */
  --color-border:       #E2E8F0;   /* standard rule */
  --color-border-dark:  #0A1628;   /* heavy rule */
  --color-accent:       [new accent]; /* single warm accent */
  /* ... etc */
}
```

The critical discipline: keep the same CSS variable names (--color-bg, --color-surface, etc.) where possible. Renaming variables requires updating every reference across all components — unnecessary churn.

### Pattern 2: Tailwind Config Sync (immediately after globals.css)

**What:** Update `tailwind.config.ts` to stay in sync with any CSS variable renames or additions.

**When to use:** Immediately after globals.css is settled — before any component work begins.

**Trade-offs:** The current codebase uses almost no Tailwind utility classes (styling is inline). Tailwind config matters mainly for: (1) font family definitions used via `font-display`, `font-body`, `font-ui` classes, (2) color utilities if components are migrated to class-based styling, and (3) the maxWidth content token.

**Current state of Tailwind config:** References `--color-accent-dim` and `--color-accent-light` which do not exist in globals.css (bug confirmed in CONCERNS.md). These gaps must be fixed in the new config.

**Example — aligned config:**
```typescript
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Names match CSS variable names exactly (no drift)
        bg:            'var(--color-bg)',
        surface:       'var(--color-surface)',
        'surface-2':   'var(--color-surface-2)',
        ink:           'var(--color-ink)',
        'ink-mid':     'var(--color-ink-mid)',
        'ink-faint':   'var(--color-ink-faint)',
        border:        'var(--color-border)',
        'border-dark': 'var(--color-border-dark)',
        accent:        'var(--color-accent)',
      },
      fontFamily: {
        // Update to match new Google Fonts choices
        display: ['"[New Display Font]"', 'serif'],
        ui:      ['"[New UI Font]"', 'sans-serif'],
        body:    ['"[New Body Font]"', 'serif'],
      },
      maxWidth: {
        content: '1160px',
      },
    },
  },
} satisfies Config
```

### Pattern 3: Font Replacement (index.html + all inline fontFamily strings)

**What:** Google Fonts swap in index.html `<link>` tags, then systematic find-replace of all hardcoded font family strings throughout components.

**When to use:** After globals.css and tailwind config are settled. Font replacement is a cross-cutting concern — every component has hardcoded font strings.

**Trade-offs:** This is the highest-volume mechanical task. The current codebase has font strings like `'"Playfair Display", serif'`, `'"Barlow", sans-serif'`, and `'"Crimson Pro", Georgia, serif'` embedded in dozens of inline style objects. Each must be found and replaced individually because they are not referenced via CSS variables or Tailwind classes — they are hardcoded strings.

**Scope of font string occurrences (confirmed from codebase review):**
- `'"Playfair Display", serif'` — H1, H2, H3, logo, hero stats, decorative numbers, mobile menu links
- `'"Barlow", sans-serif'` — all annotation labels, nav links, button base style, service category tags, stat labels
- `'"Crimson Pro", Georgia, serif'` — body text throughout all pages and components

**Recommended approach:** CSS variable for font families in globals.css, referenced in inline styles. This reduces the per-component edit to a one-time change:
```css
/* globals.css */
:root {
  --font-display: '[New Display Font]', serif;
  --font-ui:      '[New UI Font]', sans-serif;
  --font-body:    '[New Body Font]', serif;
}
```
Then each component's inline style changes from `fontFamily: '"Playfair Display", serif'` to `fontFamily: 'var(--font-display)'`. This is a one-time migration that pays off for any future font changes.

### Pattern 4: Component-by-Component Visual Restyle (edit in place)

**What:** Edit each component's inline style objects to use new colors, typography, and spacing — in place, without rebuilding the component's structure.

**When to use:** After the token foundation (Steps 1-3) is in place. Tackle components in dependency order (atomic components before composite, sections before pages).

**Trade-offs:** Edit in place is the correct strategy because: (1) the component structure is sound, (2) props interfaces don't change, (3) animation logic doesn't change, (4) TypeScript types don't change. Rebuilding components from scratch risks breaking functionality. Editing in place limits risk to visual regressions only.

**Edit vs. rebuild decision rule:** Edit in place if the component's props, behavior, and general DOM structure stay the same. Rebuild only if a section is being reorganized structurally (e.g., Hero switches from dark full-bleed to light split layout — that warrants a structural rewrite of the section JSX while keeping the component file).

## Data Flow

### Redesign Change Propagation

```
globals.css (:root CSS vars)
    ↓ (var() references)
Components using var(--color-*) in inline styles
    [auto-updates when vars change — no component edit needed]

index.html (font <link> tags)
    ↓ (font-family name availability)
Components with hardcoded fontFamily strings
    [requires manual find-replace in each component file]

tailwind.config.ts (color/font aliases)
    ↓ (only if Tailwind classes are used)
JSX className attributes
    [minimal impact — current codebase uses almost no Tailwind classes]
```

### Component Edit Dependency Order

```
Phase A: Foundation (must be done first)
  globals.css (new CSS vars)
  tailwind.config.ts (sync with new vars)
  index.html (new font <link> tags)
        ↓
Phase B: Atomic UI Components (no external dependencies)
  Button.tsx
  AnnotationLabel.tsx
  RuledDivider.tsx
        ↓
Phase C: Composite UI Components (depend on atoms)
  ServiceCard.tsx       (uses AnnotationLabel internally)
  StatCard.tsx
  TestimonialCard.tsx
  Accordion.tsx
        ↓
Phase D: Layout Components (used on every page)
  Navbar.tsx            (uses Button)
  Footer.tsx
  PageWrapper.tsx       (likely minimal change)
        ↓
Phase E: Section Components (compose UI components)
  Hero.tsx              (heaviest visual change — likely structural rewrite)
  TrustBar.tsx
  ServicesGrid.tsx      (uses ServiceCard)
  WhyUs.tsx
  StatsRow.tsx          (uses StatCard)
  Testimonials.tsx      (uses TestimonialCard)
  CTABanner.tsx         (uses Button)
        ↓
Phase F: Pages (thin wrappers — usually minimal inline styles)
  Home.tsx, Services.tsx, About.tsx, Contact.tsx
```

This ordering ensures that when a composite component is being restyled, the atoms it depends on are already in their new visual state — preventing mismatched intermediate states.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1 developer, 5 files/day | Edit in place, test in browser after each component, commit component groups |
| 2+ developers, parallel | Assign by layer — one dev on atoms, one on sections — dependency order prevents conflicts |
| Future theming needs | The CSS variable foundation makes a dark mode or alternate theme trivial to add via a `[data-theme="dark"]` selector override |

### Scaling Priorities

1. **First bottleneck: font string sprawl.** The highest-volume mechanical work is replacing hardcoded font family strings. Introducing font CSS variables in globals.css first reduces this from N component edits to N component edits of a simpler value — but the volume is unavoidable given the current architecture. Plan for 2-3 hours of systematic find-replace.

2. **Second bottleneck: hardcoded rgba() colors.** Many components use hardcoded rgba values (e.g., `rgba(253,250,245,0.72)` for subtitle text) that don't correspond to any CSS variable. These won't be caught by a CSS variable swap — they must be hunted individually. Grep for `rgba(` and `#[hex]` in TSX files to find them all before starting.

## Anti-Patterns

### Anti-Pattern 1: Start with Components, Skip the Token Foundation

**What people do:** Jump straight into restyling Hero.tsx or Navbar.tsx because those are the most visible parts. Change colors component by component, hardcoding new values as they go.

**Why it's wrong:** Creates a new layer of inconsistency. The new design will have its own hardcoded values scattered across components, making the next redesign just as expensive. The CSS variable system exists precisely to prevent this — ignoring it means spending 3x the time on future changes.

**Do this instead:** Always define the full token set in globals.css before touching any component. Every color decision made in a component should reference a CSS variable, not a literal hex value.

### Anti-Pattern 2: Tailwind Config and globals.css Drift Out of Sync

**What people do:** Add new CSS variables to globals.css for the new design (e.g., `--color-navy-dark`) but forget to add a corresponding alias in tailwind.config.ts. Or vice versa.

**Why it's wrong:** Tailwind utility classes generated from the config won't reflect the actual token values. `bg-accent` might still point to the old accent color if the config isn't updated. Debugging style mismatches becomes confusing.

**Do this instead:** Treat globals.css and tailwind.config.ts as a single atomic unit. Update both in the same commit. Establish a naming convention where every CSS var has a Tailwind alias and every Tailwind alias maps to exactly one CSS var.

### Anti-Pattern 3: Mixing Edit-In-Place and Full Rewrites Without a Clear Rule

**What people do:** Rewrite some section components from scratch (introducing new prop interfaces, restructuring DOM), while editing others in place. The codebase ends up with two patterns for the same type of component.

**Why it's wrong:** Pages that compose sections now have to deal with mismatched prop signatures. A Hero rebuilt with `<Hero headline="..." subheadline="...">` breaks if Home.tsx was calling `<Hero />` with no props. TypeScript will catch the error, but the fix propagates upward to the page.

**Do this instead:** Separate structural decisions from visual decisions before writing a line of code. For each section, explicitly decide: "edit in place" (same DOM structure, same props) vs. "structural rewrite" (new DOM, possibly new props, update call sites). Document the decision, then execute cleanly.

### Anti-Pattern 4: Restyling the Hover State Handler Logic

**What people do:** While restyling Button.tsx, they refactor the mouseEnter/mouseLeave handler to use a different approach (CSS classes, CSS modules) — combining a visual change with a behavioral change.

**Why it's wrong:** The existing handler pattern works. Changing it during a redesign introduces functional risk: buttons might lose hover state, focus states might break, or accessibility might regress. This is exactly what CONCERNS.md flags as fragile.

**Do this instead:** Change only the color and font values inside `variantBase` and `variantHover` dictionaries. Leave the handler mechanism untouched. Visual redesign and behavioral refactoring are separate projects.

### Anti-Pattern 5: Restyling and Structural Reorganization in the Same Pass

**What people do:** While updating Hero.tsx colors, they also reorganize the section order in Home.tsx — moving StatsRow before Testimonials because the new design calls for it. Both changes land in the same diff.

**Why it's wrong:** If something breaks (TypeScript error, visual regression, animation timing issue), it's unclear whether the layout reorganization or the styling caused it. Debugging is harder. Rollback is harder.

**Do this instead:** If section reorganization is part of the redesign scope (PROJECT.md confirms "some structural refinement" is in scope), do it in a dedicated pass before or after the visual restyle. Run `npm run build` to verify each pass independently.

## Integration Points

### External Services

| Service | Integration Pattern | Redesign Impact |
|---------|---------------------|-----------------|
| Google Fonts | `<link>` in index.html, font-display=swap | REPLACE link href with new font families. Keep preconnect tags. |
| React Helmet Async | SEOHead component injects `<title>`, `<meta>` | NO CHANGE — purely functional |
| Framer Motion | whileInView, AnimatePresence, page transitions | NO CHANGE — animation values (opacity, y offsets) stay. Only colors passed to motion elements change. |
| React Hook Form | Contact form validation | NO CHANGE — form behavior unchanged |

### Internal Boundaries

| Boundary | Communication | Redesign Notes |
|----------|---------------|----------------|
| globals.css ↔ Components | CSS custom properties via `var()` | High leverage boundary — changing globals.css value propagates to all consumers without component edits |
| tailwind.config.ts ↔ JSX | className attribute utilities | Low impact currently — almost no Tailwind classes used in JSX. Config changes are safe. |
| Button props ↔ Call sites | TypeScript interface | Props interface must not change during restyle. Variant names (primary, secondary, ghost, accent) can remain even if visual appearance changes. |
| AnnotationLabel props ↔ Call sites | `text`, `index?`, `inverted?` props | The `inverted` prop controls light/dark rendering. New design must account for this — both states need to be restyled. |
| Navbar useLocation ↔ active styles | NavLink `isActive` callback | Active state styling (color, border-bottom) is inline in the isActive callback. Must be updated during Navbar restyle — not in globals.css. |

## Build Order: Explicit Sequence

This is the recommended execution order with dependency reasoning:

**Step 1 — globals.css** (foundation)
All CSS variable consumers depend on this. Do it first, do it completely. Don't leave old tokens and add new ones — define the full new token set.

**Step 2 — index.html font swap** (near-foundation)
Font availability must exist before any component work. If fonts aren't loading, visual decisions made during component editing will be wrong.

**Step 3 — tailwind.config.ts sync** (foundation cleanup)
Sync config to match new token names. Fixes the existing `--color-accent-dim` / `--color-accent-light` reference bug. Run `npm run build` to verify zero TypeScript errors after this step.

**Step 4 — Atomic UI components** (Button, AnnotationLabel, RuledDivider)
These have no dependencies on other project components. Changes here propagate upward cleanly. Starting here means every composite component that uses Button or AnnotationLabel will automatically see the new style when it renders.

**Step 5 — Composite UI components** (ServiceCard, StatCard, TestimonialCard, Accordion)
Now that atoms are restyled, composite components can be edited and previewed correctly in context.

**Step 6 — Layout components** (Navbar, Footer)
These are the chrome seen on every page. Getting these right early makes the whole site feel cohesive during the section work that follows.

**Step 7 — Section components** (Hero, TrustBar, ServicesGrid, WhyUs, StatsRow, Testimonials, CTABanner)
The bulk of visual work. Hero likely needs structural rewrite (new layout direction). Others are in-place restyles.

**Step 8 — Pages** (Home, Services, About, Contact)
Pages are thin composers. Any remaining page-level inline styles (padding overrides, grid definitions) get cleaned up here.

**Step 9 — Verification pass**
- `npm run build` — zero TypeScript errors
- Visual check at 375px, 768px, 1280px, 1440px
- Lighthouse SEO and Accessibility scores — must not regress
- All `tel:` and `mailto:` links still functional
- Contact form validation still fires
- Mobile menu opens and closes correctly

## Risk Areas with Mitigations

| Risk Area | What Can Break | Mitigation |
|-----------|---------------|------------|
| Navbar active link styling | NavLink `isActive` inline callback uses hardcoded color values — not CSS vars | Find the isActive callback (Navbar.tsx lines 93-103) and update color values there specifically |
| Mobile menu visibility | `<style>` block at bottom of Navbar.tsx controls `display: none` toggles — CSS class names must not change | Do not rename `.nav-desktop` or `.nav-hamburger` classes during restyle |
| Button hover handlers | `variantHover` dict applies styles via `Object.assign(el.style, ...)` — if hover state colors are changed but base state is missed, buttons get stuck in wrong state | Always update both `variantBase` AND `variantHover` in the same edit |
| ServiceCard querySelector | Hover handler uses `el.querySelector('.card-cta')` to find child link — class name must stay `.card-cta` | Do not rename the `card-cta` className on the Link element inside ServiceCard |
| StatCard counter animation | Uses `useInView` internally — animation is tied to the component mounting correctly. Major DOM restructuring could break trigger | Edit stat number colors and label styles only; do not restructure the useInView/motion.div wrapping |
| Contact form fieldStyle function | Applies conditional red border on error — depends on CSS variable `--color-danger` existing in globals.css | Keep `--color-danger` defined in new globals.css (rename or remove it and form error states break) |
| AnnotationLabel `inverted` prop | Many section components pass `inverted` to AnnotationLabel for use on dark backgrounds — both normal and inverted states must be restyled | When restyling AnnotationLabel, verify both `inverted={false}` (default) and `inverted={true}` render correctly against both light and dark backgrounds |
| Mobile menu does not close on link click | Known bug (CONCERNS.md) — NavLinks in mobile menu don't call `setMenuOpen(false)` on click | This is a pre-existing bug. Do not introduce new patterns that depend on the menu closing — fix it as a separate bug or leave for a separate PR |

## Sources

- Tailwind CSS official documentation: [Adding Custom Styles](https://v3.tailwindcss.com/docs/adding-custom-styles), [Tailwind v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4)
- Josh W. Comeau: [How to use CSS variables with React](https://www.joshwcomeau.com/css/css-variables-for-react-devs/) — MEDIUM confidence (single authoritative blog post, widely referenced)
- Kent C. Dodds / Epic React: [Use CSS Variables instead of React Context](https://www.epicreact.dev/css-variables) — MEDIUM confidence
- FrontendTools: [Tailwind CSS Best Practices 2025–2026: Design Tokens](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns) — LOW confidence (WebSearch only, unverified publication)
- Nicola Lazzari: [Integrating Design Tokens with Tailwind CSS](https://nicolalazzari.ai/articles/integrating-design-tokens-with-tailwind-css) — LOW confidence (WebSearch only)
- Codebase direct inspection: `src/styles/globals.css`, `tailwind.config.ts`, `src/components/ui/Button.tsx`, `src/components/ui/ServiceCard.tsx`, `src/components/ui/AnnotationLabel.tsx`, `src/components/layout/Navbar.tsx`, `src/components/sections/Hero.tsx` — HIGH confidence

---
*Architecture research for: React + Tailwind CSS design system overhaul*
*Researched: 2026-03-04*
