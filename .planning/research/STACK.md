# Stack Research

**Domain:** Premium editorial design system — navy & white, trades/electrician service website
**Researched:** 2026-03-04
**Confidence:** HIGH (typography and animation decisions), MEDIUM (specific navy hex values — verified against color theory, not official spec)

---

## Context: What This Research Covers

The existing codebase uses React 18 + TypeScript + Tailwind CSS 3.4.3 + Framer Motion 11 + Vite 5. The tech stack is locked. This research answers four specific questions that gate the redesign:

1. Which Google Fonts pairing creates a premium editorial + trades feel (not generic, not luxury-spa)?
2. How to structure CSS custom property tokens for a navy-dominant color system in Tailwind v3?
3. Which Framer Motion animation configs feel premium without being bouncy or template-like?
4. Which CSS layout techniques create the editorial feel in a utility-first Tailwind project?

---

## Recommended Stack

### Core Technologies (Unchanged — Do Not Swap)

| Technology | Version | Purpose | Why Keeping |
|------------|---------|---------|-------------|
| React | 18.3.1 | UI framework | Architecture is sound; redesign is visual layer only |
| TypeScript | 5.4.5 | Type safety | Strict mode in place; do not loosen |
| Tailwind CSS | 3.4.3 | Utility styling | CSS variable bridge pattern already in place; v4 migration out of scope |
| Framer Motion | 11.0.0 | Animation | Already integrated with AnimatePresence + lazy routes |
| Vite | 5.2.11 | Build tool | Chunk splitting configured; no changes needed |

---

## Decision 1: Typography — Google Fonts Pairing

### Recommendation: Fraunces + DM Sans

**Fraunces** (display/headings) + **DM Sans** (body/UI) is the right pairing for this project. Here is the rationale:

**Why Fraunces for display:**
Fraunces is a variable display serif commissioned by Google, designed by Undercase Type. Its design references early 20th century advertising typefaces (Windsor, Souvenir, Cooper series) — typefaces built for authority and visibility at large scale, not for academic elegance. This is precisely the register needed for a trades business that wants to project established confidence. At 700–900 weight, Fraunces headlines dominate the page without requiring all-caps tricks. The "WONK" and softness axes on the variable font give it organic irregularity that expensive serif fonts from type foundries carry — distinguishing it from generic editorial choices like Playfair Display. At small sizes it reads cleanly at 144pt optical size; at display sizes the 9pt optical size gives it inky presence.

Critically: Fraunces does not read as luxury-spa or wedding-boutique (the failure mode of Cormorant Garamond for a trades context). It reads as old-money establishment — the kind of company that has been doing this for decades and doesn't need to prove it.

**Why DM Sans for body/UI:**
DM Sans is a low-contrast geometric sans-serif designed for legibility at body text sizes. Unlike Inter (more neutral, UI-focused) or Libre Baskerville (serif, warm but heavier to load), DM Sans pairs with a serif display face without fighting it. Its geometric construction creates visual contrast against Fraunces's organic curves. For navy-on-white and white-on-navy contexts, DM Sans maintains WCAG contrast ratios cleanly because its strokes have consistent weight — no ink traps or high-contrast modulation to fight the background. DM Sans also functions as the label/annotation voice (replacing IBM Plex Mono from the prior spec), eliminating the need for a third font family and improving performance.

**Google Fonts URL:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,700;9..144,900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
```

**Usage assignments:**

| Role | Font | Weight | Size Range | Notes |
|------|------|--------|-----------|-------|
| H1 (hero) | Fraunces | 900 | clamp(52px, 10vw, 96px) | opsz 9 for inky display presence |
| H2 (section) | Fraunces | 700 | clamp(36px, 5vw, 64px) | opsz 9 |
| H3 (card/sub) | Fraunces | 700 | 24–32px | opsz 14 (mid optical size) |
| Body | DM Sans | 400 | 16–18px | 1.7–1.8 line-height |
| UI labels / nav | DM Sans | 500 | 12–13px | uppercase, 0.08–0.12em tracking |
| Annotation tags | DM Sans | 600 | 11px | uppercase, 0.12em tracking, accent color |
| Button text | DM Sans | 600 | 12–13px | uppercase, 0.06em tracking |

**Tracking rule for Fraunces:** -0.02em to -0.03em at display sizes. Never add letter-spacing to a display serif — it breaks the internal rhythm of the letterforms. Let the weight do the work.

**Three-font elimination:** The prior spec used Syne + IBM Plex Mono + Libre Baskerville (three families). Reducing to two families (Fraunces + DM Sans) cuts Google Fonts load weight, reduces FOUT risk, and creates a cleaner visual vocabulary. DM Sans covers all the label/annotation/UI roles that IBM Plex Mono previously covered.

### Alternatives Considered and Rejected

| Pairing | Why Rejected |
|---------|-------------|
| Playfair Display + Inter | Playfair is overused in the 2020–2024 period. Reads as generic premium. Every wellness brand, legal firm, and boutique hotel uses it. |
| Cormorant Garamond + DM Sans | Cormorant reads as ultra-luxury / feminine-adjacent. Wrong register for a trades company. Too delicate at heavy weights. |
| Syne + IBM Plex Mono (current) | Syne is geometric display — no personality at the scale this redesign demands. IBM Plex Mono as annotation font creates a third font load for a narrow use case. |
| Libre Baskerville (current body) | Serif body text in a navy-dominant color scheme adds reading friction. DM Sans is faster to scan. |

---

## Decision 2: Color System — Navy Token Architecture

### Recommendation: Two-layer CSS variable system in Tailwind v3

The existing project uses CSS custom properties in `src/styles/globals.css` bridged to Tailwind via `tailwind.config.ts`. This pattern is correct for Tailwind v3 and should be retained — only the values change.

**Architecture: palette layer + semantic layer**

The palette layer defines raw color values. The semantic layer defines purpose. Components reference semantic tokens only, never palette values directly. This makes the design system refactorable without touching components.

**Palette layer (raw values) — define in `src/styles/globals.css`:**

```css
:root {
  /* Navy scale */
  --palette-navy-950: #060D1B;   /* near-black navy — backgrounds only */
  --palette-navy-900: #0A1628;   /* primary dark background, stats section */
  --palette-navy-800: #112240;   /* secondary dark surface, cards on dark bg */
  --palette-navy-700: #1B3461;   /* muted navy for borders on dark */
  --palette-navy-600: #2A4A7F;   /* accent-adjacent, hover states on dark */

  /* White / neutral scale */
  --palette-white:    #FFFFFF;   /* pure white — primary surface */
  --palette-off-white: #F8F7F5;  /* page background — warm but not cream */
  --palette-warm-100: #F0EEE8;   /* secondary surface, alternating sections */
  --palette-warm-200: #E2DED5;   /* borders on light backgrounds */
  --palette-warm-400: #9E9A94;   /* secondary text on light backgrounds */
  --palette-warm-700: #524F49;   /* body text on light backgrounds */

  /* Accent */
  --palette-gold:     #C9A84C;   /* single warm accent — CTAs, active states, annotations */
  --palette-gold-dim: #A8893A;   /* hover on gold */
  --palette-gold-light: #F7F0DC; /* tinted bg behind gold elements */

  /* Functional */
  --palette-danger:   #C0392B;
  --palette-success:  #1A7A4A;
}
```

**Why these navy values:**
`#0A1628` is a true deep navy — blue-black with enough hue to read as intentional navy rather than generic dark gray. At this depth it creates strong contrast with white text (WCAG AAA at 16px+). `#060D1B` as a near-black variant gives depth on dark-section hover states without requiring a separate black. The 800/700/600 scale provides enough steps for borders, muted text, and interactive states on dark backgrounds.

**Why warm off-white instead of pure white page background:**
`#F8F7F5` prevents the harshness of pure white backgrounds in long-scroll layouts. It reads as premium paper — intentional warmth — while staying neutral enough to not conflict with the navy. The slight warmth also makes the navy feel richer by contrast.

**Why gold as the accent:**
The prior spec used electric blue (`#1A6BFF`) as the accent. On a navy-dominant site, an electric blue accent fights the dominant hue rather than creating contrast. Gold (`#C9A84C`) on navy is a classical premium combination (financial institutions, law firms, established trade businesses). It signals permanence and quality. It is used sparingly — CTAs, annotation numbers, active nav states — which preserves its weight.

**Semantic layer — define in `src/styles/globals.css`:**

```css
:root {
  /* Backgrounds */
  --color-bg:          var(--palette-off-white);   /* page background */
  --color-bg-alt:      var(--palette-warm-100);    /* alternating sections */
  --color-surface:     var(--palette-white);        /* cards, panels */
  --color-surface-dark: var(--palette-navy-800);   /* cards on dark backgrounds */

  /* Primary dark (navy) */
  --color-primary:     var(--palette-navy-900);    /* main navy usage */
  --color-primary-deep: var(--palette-navy-950);   /* deepest dark sections */
  --color-primary-mid: var(--palette-navy-700);    /* borders, muted on dark */

  /* Text */
  --color-ink:         var(--palette-navy-900);    /* primary text on light bg */
  --color-ink-mid:     var(--palette-warm-700);    /* secondary text on light bg */
  --color-ink-faint:   var(--palette-warm-400);    /* placeholder, disabled */
  --color-ink-inverse: var(--palette-white);       /* text on dark backgrounds */
  --color-ink-inverse-mid: rgba(255,255,255,0.7);  /* secondary text on dark */

  /* Borders */
  --color-border:      var(--palette-warm-200);    /* standard dividers on light */
  --color-border-dark: var(--palette-navy-900);    /* heavy rules on light bg */
  --color-border-inverse: var(--palette-navy-700); /* borders on dark bg */

  /* Accent (gold) */
  --color-accent:      var(--palette-gold);
  --color-accent-dim:  var(--palette-gold-dim);
  --color-accent-light: var(--palette-gold-light);

  /* Functional */
  --color-danger:      var(--palette-danger);
  --color-success:     var(--palette-success);
}
```

**Tailwind bridge — in `tailwind.config.ts`:**

```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:              'var(--color-bg)',
        'bg-alt':        'var(--color-bg-alt)',
        surface:         'var(--color-surface)',
        'surface-dark':  'var(--color-surface-dark)',
        primary:         'var(--color-primary)',
        'primary-deep':  'var(--color-primary-deep)',
        'primary-mid':   'var(--color-primary-mid)',
        ink:             'var(--color-ink)',
        'ink-mid':       'var(--color-ink-mid)',
        'ink-faint':     'var(--color-ink-faint)',
        'ink-inverse':   'var(--color-ink-inverse)',
        border:          'var(--color-border)',
        'border-dark':   'var(--color-border-dark)',
        accent:          'var(--color-accent)',
        'accent-dim':    'var(--color-accent-dim)',
        'accent-light':  'var(--color-accent-light)',
        danger:          'var(--color-danger)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1160px',
      },
    },
  },
  plugins: [],
} satisfies Config
```

**Usage rules for the accent:**
Gold appears on: primary CTAs (button bg), section annotation numbers, active nav underline, key stat numbers, link hover underlines. It does NOT appear on decorative elements, backgrounds, or body text. Overuse kills the signal.

---

## Decision 3: Framer Motion Animation Configs

### Core rule: animate only `opacity` and `transform` (y, x, scale)

Never animate `width`, `height`, `margin`, `padding`, or positional properties (`top`, `left`). These trigger layout recalculation on every frame. Framer Motion animates opacity and transform via the GPU compositor thread, bypassing React's render cycle.

### Easing curves

**Primary reveal easing:** `[0.22, 1, 0.36, 1]` — fast start with aggressive deceleration. This is an expo-out curve. It makes elements feel like they arrive decisively rather than floating in softly. Use for all section reveals and page transitions.

**Micro-interaction easing:** `[0.25, 0.46, 0.45, 0.94]` — a standard ease-out quad. Use for button hover state changes and small interactive feedback (under 200ms).

**Enter/exit transitions:** `easeOut` built-in, duration 0.25–0.35s. For elements leaving the DOM (AnimatePresence), a shorter exit (0.18s) than enter makes the UI feel responsive rather than theatrical.

**Never use:** spring animations with low damping (< 20), `backOut`, `anticipate`, or `easeInOut` for entrance animations. These add perceived loading time and telegraph "template."

### Specific configs by use case

**Page transition wrapper (applied to every page's root element):**
```typescript
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -6 },
}

const pageTransition = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1],
}
```
The Y distance is intentionally small (10px enter, -6px exit). Large Y movement reads as a slide-show, not a transition. The asymmetry (10 in, -6 out) feels more natural than matching values.

**Section reveal (whileInView, used on every major section):**
```typescript
const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Usage:
<motion.section
  variants={sectionVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
```
`amount: 0.2` triggers when 20% of the section enters the viewport — prevents late-firing on tall sections.

**Staggered children (service cards, stat items, checklist rows):**
```typescript
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}
```
Stagger of 0.08s (80ms) creates visible cascade without making users wait. For 3 columns, total cascade completes in 0.24s — perceptible but not slow. For large grids (6 cards), cap stagger at 0.06s.

**Hero headline stagger (first load only, no whileInView — already in viewport):**
```typescript
// Parent container
const heroContainer = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

// Each child (annotation, h1, subtitle, CTAs, trust bar)
const heroItem = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}
```

**Stat counter animation (number counting up on scroll):**
```typescript
// Use Framer Motion's useMotionValue + useTransform + useInView
// Target: opacity 0→1 + number counting 0→final
// Duration: 1.2s with easeOut for the number, 0.55s for opacity
// Trigger: useInView with once: true
```

**Mobile menu open/close:**
```typescript
const menuVariants = {
  closed: { opacity: 0, y: -12 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
}
// Exit: duration 0.16, easeIn (faster exit than enter)
```

**Card hover (CSS preferred over Framer Motion for hover):**
Hover states on cards should use CSS `transition` properties, not Framer Motion. This keeps hover responses synchronous with cursor position without React event loop overhead:
```css
.service-card {
  transition: box-shadow 200ms ease, border-top-color 200ms ease;
}
.service-card:hover {
  box-shadow: 0 8px 32px rgba(10, 22, 40, 0.12);
  border-top-color: var(--color-accent);
}
```

### MotionConfig for global defaults

Wrap the app in `MotionConfig` to set project-wide transition defaults:
```tsx
// In App.tsx, inside HelmetProvider
<MotionConfig reducedMotion="user">
  <BrowserRouter>
    <AnimatedRoutes />
  </BrowserRouter>
</MotionConfig>
```
`reducedMotion="user"` automatically respects `prefers-reduced-motion` system setting — removes animations for users who need it without per-component logic. This is an accessibility requirement, not optional.

---

## Decision 4: CSS Layout Techniques for Editorial Feel

### Named CSS Grid areas for section layouts

The current codebase uses inline style objects for layout (observed in CONVENTIONS.md). For the redesign, major section layouts should use CSS Grid with named template areas defined in inline `<style>` blocks (per the established convention) or in globals.css.

**Two-column feature sections:**
```css
.section-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

@media (max-width: 768px) {
  .section-two-col {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}
```

**Asymmetric content layouts (55/45 split for Why Us section):**
```css
.section-asymmetric {
  display: grid;
  grid-template-columns: 55fr 45fr;
  gap: 80px;
  align-items: center;
}
```

**Services alternating layout:**
```css
.service-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.service-row:nth-child(even) {
  direction: rtl; /* Flips column order without re-ordering DOM */
}
.service-row:nth-child(even) > * {
  direction: ltr; /* Restore text direction in children */
}
```

### The section divider as editorial rhythm

Full-width horizontal rules (1px solid, navy) are load-bearing design elements in editorial layouts — they create the vertical rhythm that makes page sections feel structurally related rather than stacked. Every major section should be separated by a `<hr>` or border-bottom on the preceding section wrapper.

```css
.section-divider {
  width: 100%;
  height: 1px;
  background-color: var(--color-border-dark);
  border: none;
  margin: 0;
}
```

### White space as a design element

Section padding targets:
- Desktop: `padding-block: 112px` (py-28 equivalent)
- Mobile: `padding-block: 64px` (py-16 equivalent)
- Hero: `padding-block-start: 160px` (accounts for 68px fixed nav)

The instinct to reduce padding to "fit more content" is the primary cause of layouts feeling cramped and template-like. Generous vertical space is the single highest-leverage editorial technique.

### Tailwind utility class patterns to establish

These Tailwind utilities map to the design system and should be used consistently across components:

```
// Backgrounds
bg-primary         → deep navy sections (stats, footer)
bg-surface         → white cards
bg-bg              → page background (off-white)
bg-bg-alt          → alternating section bg

// Typography
font-display       → Fraunces (headings)
font-body          → DM Sans (body + UI)
text-ink           → primary body text
text-ink-mid       → secondary body text
text-ink-inverse   → white text on dark

// Accent usage
text-accent        → gold annotation numbers, active states
bg-accent          → CTA button backgrounds
border-accent      → active nav underline, card hover
```

### Fluid type sizing with clamp()

Headline sizes should use CSS `clamp()` to scale between mobile and desktop without breakpoint switching:

```css
h1 { font-size: clamp(48px, 9vw, 96px); }
h2 { font-size: clamp(32px, 5vw, 64px); }
h3 { font-size: clamp(22px, 3vw, 36px); }
```

This eliminates the inconsistency of having to maintain separate mobile/desktop font size rules and creates genuinely fluid typography scaling.

---

## Supporting Libraries

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| React Hook Form | 7.51.3 | Contact form | Already installed; no changes |
| React Helmet Async | 2.0.4 | Per-page SEO | Already installed; no changes |
| Lucide React | 0.378.0 | Icons (Contact page) | Keep; minimal usage |
| React Router v6 | 6.23.1 | Routing | Already installed; no changes |

No new dependencies are required for the redesign. All design system changes are implemented through CSS variable replacement, font URL update in index.html, and component restyling.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not Alternative |
|----------|-------------|-------------|---------------------|
| Display font | Fraunces | Playfair Display | Overused 2018–2024; reads as generic premium |
| Display font | Fraunces | Cormorant Garamond | Too feminine/delicate; wrong register for trades |
| Display font | Fraunces | Cinzel | Roman-monument feel; reads as pretentious for local business |
| Body font | DM Sans | Inter | Inter is more neutral/UI-tool; DM Sans has warmer personality for marketing |
| Body font | DM Sans | Libre Baskerville (current) | Serif body on navy adds reading friction; three-font load |
| Accent color | Gold #C9A84C | Electric blue #1A6BFF (current) | Blue accent on navy background creates hue conflict, not contrast |
| Accent color | Gold #C9A84C | Red/copper | Red reads as danger signal; copper reads as DIY craft, not established professional |
| Animation easing | [0.22, 1, 0.36, 1] expo-out | Spring animations | Springs with low damping produce bounce; high-damping springs are just easing curves with more config |
| Color system | Two-layer CSS vars | Tailwind v4 @theme | Project is on Tailwind v3; v4 migration is out of scope and introduces risk |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Playfair Display | Saturated in premium service market 2018–2024; triggers "I've seen this before" | Fraunces |
| IBM Plex Mono for labels | Third font family for one annotation role; eliminates performance gains | DM Sans weight 600 uppercase |
| Spring animations (stiffness < 400, damping < 20) | Produces visible bounce; reads as template/playful | Tween with [0.22, 1, 0.36, 1] easing |
| `backOut` or `anticipate` easing | Over-choreographed; unprofessional for service business | easeOut or expo-out |
| Animating width/height/margin | Triggers layout recalculation; causes jank on scroll | opacity + transform only |
| Pure white (#FFFFFF) page background | Harsh against dark navy elements; reduces premium perception | Warm off-white #F8F7F5 |
| Electric blue accent on navy bg | Hue conflict — both are blue; no contrast story | Gold #C9A84C |
| All-caps Fraunces headlines | Destroys the internal rhythm of the letterforms | Normal case, heavy weight |
| Tailwind v4 migration during this project | Out of scope; introduces breaking changes across entire config | Stay on Tailwind v3.4.3 |

---

## Version Compatibility

| Package | Version | Compatible With | Notes |
|---------|---------|-----------------|-------|
| framer-motion | 11.0.0 | React 18.3.1 | Compatible; `MotionConfig reducedMotion` prop available in v11 |
| framer-motion | 11.0.0 | TypeScript 5.4.5 | Fully typed; no compatibility issues |
| tailwindcss | 3.4.3 | postcss 8.4.38 | Stable; do not upgrade to v4 |
| react-router-dom | 6.23.1 | React 18 | AnimatePresence + location key pattern works as-is |

---

## Installation

No new packages required. Font change is a URL swap in `index.html`.

```bash
# Nothing to install — all packages already present
# Font URL replacement in index.html:
# Remove: Playfair Display + Crimson Pro + Barlow (or current active fonts)
# Add: Fraunces (opsz,wght axes) + DM Sans (opsz,wght axes)
```

---

## Sources

- [Google Fonts — Fraunces](https://fonts.google.com/specimen/Fraunces) — availability, axes, weights confirmed
- [Google Design — Fraunces origin story](https://design.google/library/a-new-take-on-old-style-typeface) — design intent and heritage verified
- [Typewolf — Cormorant combinations](https://www.typewolf.com/cormorant) — competitive analysis of alternative display serifs
- [5 sophisticated Google font pairings 2025 — Soleil Sundays](https://soleilsundays.com/blogs/theblog/5-sophisticated-google-font-pairings-to-build-a-premium-brand-in-2025) — Cormorant + DM Sans pairing research (MEDIUM confidence — single source)
- [DM Sans vs Inter comparison 2025 — Matt Medley / Bootcamp / Medium](https://medium.com/design-bootcamp/best-google-font-pairings-for-ui-design-in-2025-ba8d006aa03d) — body font selection rationale
- [Framer Motion official docs — Transition](https://www.framer.com/motion/transition/) — easing curves, spring configs confirmed (HIGH confidence)
- [Framer Motion official docs — Scroll animations](https://www.framer.com/motion/scroll-animations/) — whileInView + viewport options confirmed (HIGH confidence)
- [Framer Motion official docs — Stagger](https://www.framer.com/motion/stagger/) — staggerChildren pattern confirmed (HIGH confidence)
- [Easing functions — Motion docs](https://motion.dev/docs/easing-functions) — cubicBezier values confirmed (HIGH confidence)
- [Tailwind CSS v3 — Adding custom styles](https://tailwindcss.com/docs/adding-custom-styles) — CSS variable bridge pattern confirmed (HIGH confidence)
- [Tailwind CSS v3 — Theme variables](https://tailwindcss.com/docs/theme) — extend.colors CSS variable pattern confirmed (HIGH confidence)
- [Semantic Tailwind colors — Subframe](https://www.subframe.com/blog/how-to-setup-semantic-tailwind-colors) — two-layer token architecture (MEDIUM confidence — community source, patterns verified against official docs)
- [Editorial design patterns CSS Grid — Smashing Magazine](https://www.smashingmagazine.com/2019/10/editorial-design-patterns-css-grid-subgrid-naming/) — named grid area patterns (MEDIUM confidence — 2019 article, patterns still current in CSS3)

---

*Stack research for: Reece Group LLC UI Redesign — Navy & White Editorial Design System*
*Researched: 2026-03-04*
