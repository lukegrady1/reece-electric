# Pitfalls Research

**Domain:** Visual redesign of React + Tailwind website (replacing design system)
**Researched:** 2026-03-04
**Confidence:** HIGH — findings derived from direct codebase analysis (CONCERNS.md, CONVENTIONS.md, source files) plus verified against Tailwind CSS official docs and community post-mortems

---

## Critical Pitfalls

### Pitfall 1: Incomplete CSS Variable Replacement Leaves Ghost Values

**What goes wrong:**
The new design token set (`--color-navy`, `--color-white`, etc.) gets defined in `globals.css`, but components that hardcode the old variable names (`var(--color-primary)`, `var(--color-accent)`) silently fall back to browser defaults. The build passes with zero errors because CSS variable reference failures are silent — the browser just renders nothing, or white, or black. Sections look visually broken in ways that are easy to miss in a quick scan.

**Why it happens:**
This codebase has already drifted once — CLAUDE.md specified `--color-accent` (blue) but the implementation used `--color-primary` (green) and `--color-accent` (burgundy). The inconsistency was never caught at build time. The same pattern will repeat if the redesign defines new tokens without auditing where old token names are referenced. CSS variables do not throw errors when referenced but undefined.

**How to avoid:**
1. Before renaming any tokens, run a global grep for every existing CSS variable name: `--color-primary`, `--color-primary-dark`, `--color-primary-light`, `--color-primary-tint`, `--color-accent`, `--color-accent-light`, `--color-gold`, `--color-gold-light`, `--color-border-green`. Produce a reference map.
2. Define new tokens in `globals.css` first. Then do a single pass replacing all old variable references to new names — do not split this across multiple sessions.
3. After replacement, delete all old variable definitions from `:root`. If anything breaks visually, the deletion forces discovery.
4. Cross-check `tailwind.config.ts`: the Tailwind color aliases (`accent`, `accent-dim`, `accent-light`) must point to the new CSS variable names. Currently `accent-dim` is in tailwind.config.ts but `--color-accent-dim` does not exist in globals.css — this gap must not be replicated.

**Warning signs:**
- Any element rendering with pure white, pure black, or an obvious fallback color after the token rename
- Tailwind utility classes like `text-accent` or `bg-surface` that appear to have no effect
- `--color-border-green` still referenced in Navbar (`borderBottom: '2px solid var(--color-primary)'`) — this specific line will be unaffected by renaming `--color-primary` unless the Navbar is explicitly updated

**Phase to address:** Phase 1 (Design Token Replacement) — this must be the very first step, completed and verified before touching any component visuals.

---

### Pitfall 2: Inline Style Hover States Break Silently When Font or Color Tokens Change

**What goes wrong:**
The Button component and Navbar nav links use JavaScript `onMouseEnter`/`onMouseLeave` handlers that call `Object.assign(el.style, variantHover[variant])` to apply hover styles at runtime. These hover state objects hardcode font names (`"Barlow", sans-serif`) and color variable references inline. When the font changes from Barlow to the new typeface, all hover states silently revert to the old font because the hardcoded string in the JS object is not updated. The base render state may show the new font, but mouseenter overwrites it.

**Why it happens:**
This is a consequence of the codebase's anti-pattern: hover state managed by JS event handlers rather than CSS `:hover`. The DOM element's `.style` attribute has higher specificity than any stylesheet, and `Object.assign` to `el.style` is a direct override. CSS changes do not propagate into these JS-applied styles.

**How to avoid:**
When changing Button's font as part of the redesign, audit every `variantBase` and `variantHover` object in `Button.tsx` and update the hardcoded `fontFamily` string. Do the same for any similar pattern in `Navbar.tsx` (`onMouseEnter`/`onMouseLeave` on NavLink). The permanent fix is to refactor hover states to CSS (adding a `.btn` class + CSS `:hover` rule), but even without that refactor, manually syncing the JS objects prevents the visual regression.

**Warning signs:**
- Mouse-over a button after font change: the label text reverts to old font on hover
- NavLink text changes color correctly on active state but not on hover
- Any element that uses `onMouseEnter` + `el.style` will have this vulnerability

**Phase to address:** Phase 2 (Typography + Component Reskin) — must update JS hover objects in the same commit as font token changes, not in a separate pass.

---

### Pitfall 3: Tailwind Config Font Aliases Out of Sync With Actual Fonts

**What goes wrong:**
`tailwind.config.ts` currently maps `font-display` to `"Playfair Display"`, `font-ui` to `"Barlow"`, and `font-body` to `"Crimson Pro"`. When the redesign changes fonts in `globals.css` and `index.html`, the Tailwind config font aliases are left pointing at the old family names. Any code using `className="font-display"` will receive the old font. Since most styling is inline `style={{}}` rather than Tailwind classes, this gap may go unnoticed for days — but it means the Tailwind utilities are wrong for the entire project.

**Why it happens:**
The config and the actual font load are separate files. Updating `index.html` `<link>` tags and `globals.css` `body { font-family: }` feels complete, but the Tailwind config is a third location that must also be updated. It is easy to forget because Tailwind config changes do not cause build errors.

**How to avoid:**
Treat font replacement as a three-file operation that must all land in the same commit:
1. `index.html` — update `<link>` to Google Fonts with new family names and weights
2. `src/styles/globals.css` — update `body { font-family: }` and any explicit font declarations in `.skip-link`
3. `tailwind.config.ts` — update `fontFamily.display`, `fontFamily.ui` (or rename to `fontFamily.mono` if using a mono label font), `fontFamily.body`

**Warning signs:**
- `className="font-display"` applies a font that looks different from `style={{ fontFamily: '"NewFont"' }}` applied inline on the same element
- Tailwind's font utility classes not visibly changing anything after the redesign

**Phase to address:** Phase 2 (Typography Replacement) — one atomic commit for all three files.

---

### Pitfall 4: Component `<style>` Blocks With Hardcoded Old Class Names Break Responsive Layout

**What goes wrong:**
Every major component uses an inline `<style>` tag at the bottom with `@media` queries targeting class names like `.nav-desktop`, `.nav-hamburger`, `contact-grid`, `services-grid`. If the redesign renames or removes these class names during restructuring, the media queries become orphaned — the responsive rules apply to nothing. Desktop layout works, but mobile breaks silently because the class no longer matches.

**Why it happens:**
The class names and the `<style>` block are in the same file, which creates an illusion of locality — they feel coupled. But when JSX is restructured (class name changed, element removed, wrapper added), the `<style>` block is not automatically updated. There is no TypeScript or linter enforcement of the coupling.

**How to avoid:**
For every component that gets restructured during the redesign, explicitly audit the bottom `<style>` block. Treat it as a separate checklist item. The class names used in `<style>` are: `.nav-desktop`, `.nav-hamburger`, `.hero-grid`, `.services-grid`, `.why-grid`, `.stats-grid`, `.testimonials-grid`, `.contact-grid`, and any others discoverable by searching for `<style>{\`` in the codebase.

**Warning signs:**
- A section looks correct at 1280px but collapses to a broken single column or overflows at 375px
- `@media (max-width: 768px)` rules in DevTools showing as applied but having no visible effect (the target class has been renamed)

**Phase to address:** Each phase that restructures a component — treat `<style>` block audit as a mandatory step in the definition of done for each component.

---

### Pitfall 5: Framer Motion `AnimatePresence` Breaks on Structural JSX Changes

**What goes wrong:**
`AnimatePresence` requires its direct children to have stable `key` props. If component restructuring during the redesign wraps an animated child in a new wrapper `<div>` or changes the element type (e.g., `motion.div` to `motion.section`), exit animations silently stop firing. The component appears to animate in correctly but does not animate out — it disappears immediately. This affects page transitions (in `App.tsx`) and the mobile menu (in `Navbar.tsx`).

**Why it happens:**
This is a documented Framer Motion constraint. `AnimatePresence` tracks children by key and component identity. Adding a non-motion wrapper between `AnimatePresence` and a `motion.div` — or wrapping motion children in a React Fragment — breaks the exit animation detection.

**How to avoid:**
- When restructuring `Navbar.tsx` mobile menu, keep `<motion.div>` and `<motion.div>` (backdrop) as direct children of `<AnimatePresence>` — no Fragment wrapper.
- The page transition `PageWrapper` in `App.tsx` uses `AnimatePresence` on route changes. If `PageWrapper` is edited during the redesign (different element type, new className), verify exit transitions still fire by navigating between routes.
- Test exit animations explicitly after any component restructuring: open mobile menu, close it, watch for slide-out vs. instant disappear.

**Warning signs:**
- Mobile menu disappears instantly on close instead of sliding up
- Page transitions only animate in but not out when navigating between routes
- `AnimatePresence` children losing their `key` prop during JSX restructuring

**Phase to address:** Phase 3 (Section Redesign) and any phase that touches `Navbar.tsx` or `PageWrapper`.

---

### Pitfall 6: New Font Weights Not Loaded Cause Bold Headings to Fall Back

**What goes wrong:**
The new typeface chosen for display headings requires a specific weight (e.g., 900 or 800) that must be explicitly listed in the Google Fonts `<link>` URL. If only weights `400;700` are loaded but the CSS uses `font-weight: 800`, the browser falls back to the nearest available weight (700), producing headings that look slightly thin and fail to deliver the "commands attention" goal the redesign is optimized for. This is especially invisible in development if the font is cached from a prior load.

**Why it happens:**
Google Fonts requires explicit weight enumeration in the query string. The current `index.html` loads `Playfair Display:wght@700` and `Barlow:wght@400;500;600`. When replacing fonts, it is common to copy the font URL from Google Fonts' web UI but miss adding the extra weights needed by the design.

**How to avoid:**
When selecting new fonts, explicitly list every weight variant needed and verify the `<link>` URL includes them. Test in an incognito window on a throttled connection (Chrome DevTools: Slow 4G) after clearing cache. Inspect the loaded font face in DevTools > Network > filter by Font to confirm the correct weight files loaded.

**Warning signs:**
- Headings look slightly lighter than the design intent
- Font face inspectors in DevTools show `font-weight: 700 (synthesized)` rather than a real 800 file
- `font-display: swap` causes a noticeable layout shift when the real font loads after the fallback

**Phase to address:** Phase 1 (Token and Font Setup) — verify loaded weights before any design work proceeds.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Keep JS-based hover state (`onMouseEnter`/`el.style`) during redesign | Avoids refactoring Button and Navbar | Font and color changes must be updated in JS objects AND CSS — two places to maintain forever | Acceptable only if the redesign schedule is fixed and a refactor phase is planned post-launch |
| Hardcode new font names as strings in variantBase objects | Faster than creating a token system | Any future font change requires finding all inline string literals | Never acceptable — create a shared `FONTS` constant object at minimum |
| Leave old CSS variable names as aliases pointing to new values | Zero refactor risk | Variable namespace confusion persists; future developers don't know which names are canonical | Acceptable as a 1-week transitional measure only |
| Inline media queries in `<style>` blocks for new responsive rules | Keeps styles co-located with components | Breakpoint values duplicated across 10+ components with no single source of truth | Never acceptable for new breakpoint values — define a shared constant |
| Apply new color only to "visible" sections during phased rollout | Shows progress quickly | Produces a mixed design system state that is harder to QA and debug | Never acceptable if old and new tokens have the same names |

---

## Integration Gotchas

Common mistakes when connecting to external services (relevant to this project's existing integrations).

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| React Hook Form (Contact page) | Adding `onFocus`/`onBlur` props directly to `register()`-wrapped inputs causes TS error "specified more than once" | Use CSS class `.contact-input:focus` for focus styling — this is a known constraint already documented in MEMORY.md |
| React Helmet Async | Moving `<SEOHead>` outside `<PageWrapper>` during restructuring causes it to not be wrapped by `HelmetProvider` | Keep `<SEOHead>` inside the page component tree, never hoisted above `App.tsx` |
| Framer Motion `AnimatePresence` | Wrapping motion children in a React Fragment breaks exit animations | Direct children of `AnimatePresence` must be `motion.*` elements with explicit `key` props |
| Google Fonts | Loading fonts via CSS `@import` instead of `<link>` in `index.html` causes render-blocking and Lighthouse penalty | Always load via `<link rel="preconnect">` + `<link href="...fonts.googleapis.com">` in `index.html` as currently configured |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Loading too many Google Font weight variants | Lighthouse "Eliminate render-blocking resources" warning, CLS from font swap | Load only the weights actually used by the design — audit after implementation | Immediate if 6+ weight files are loaded; Lighthouse flags at any count above necessary |
| Large inline style objects recalculated on every render | Subtle re-render performance degradation in React DevTools Profiler | Move static style objects outside the component function body (already done correctly for `variantBase` in `Button.tsx` — preserve this pattern) | At component scale with animation triggers this becomes noticeable |
| CSS variable scoped to `*` selector instead of `:root` | ~2.5x performance hit on browser "Recalculate Styles" per Tailwind GitHub discussion | Keep all design token variables on `:root` in `globals.css` — do not add them to `*` or component-scoped selectors | Noticeable on pages with heavy animation or many DOM nodes |
| Framer Motion `whileInView` on every section simultaneously | All scroll animations fire on initial render if sections are in viewport | Use `once: true` on all `whileInView` — already correct in codebase, must be preserved during section redesign | Immediately visible as all animations firing at page load |

---

## UX Pitfalls

Common user experience mistakes specific to this redesign.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Removing the mobile menu close-on-link-click behavior | MEMORY.md notes this is a known bug — mobile menu doesn't close after nav link click | The redesign is an opportunity to fix this: add `onClick={() => setMenuOpen(false)}` to NavLink in mobile menu (already present in current code — verify it stays) |
| Changing section background colors without updating the stats section dark override | The dark `--color-ink` background on StatsRow is a deliberate contrast break. If `--color-ink` is renamed or lightened in the new navy palette, StatsRow loses its visual anchoring | Explicitly test StatsRow at every token change — its dark background is load-bearing design |
| Font swap (FOUT) visible to users on first load after redesign | New font family has no cache — all users on first visit see the fallback font flash before the real font loads | Ensure `display=swap` is in the Google Fonts URL (current setup is correct). Consider limiting to 2 font families max to reduce FOUT frequency |
| CTA button contrast ratio failing WCAG AA after color change | Users with low vision cannot read button text; Lighthouse accessibility score drops | Check button foreground/background contrast ratio with a tool like WebAIM Contrast Checker after setting new colors — minimum 4.5:1 for normal text |

---

## "Looks Done But Isn't" Checklist

Things that appear complete in a desktop browser review but are missing critical pieces.

- [ ] **Token Replacement:** Visually scanned all pages — verify by also grepping source for `var(--color-primary)`, `var(--color-accent)`, `var(--color-gold)`, `var(--color-border-green)` and confirming zero results
- [ ] **Font Replacement:** Body text looks correct in development — verify in incognito on throttled connection that font files actually load at the correct weights
- [ ] **Hover States:** Buttons look correct at rest — verify by hovering every button variant (primary, secondary, ghost, accent) in the deployed preview
- [ ] **Mobile Menu:** Opens and closes correctly at 375px — verify that closing via link click (not just backdrop) works
- [ ] **Page Transitions:** Route change looks correct navigating forward — verify backward navigation also animates correctly and does not flash
- [ ] **Active Nav State:** Current page link is highlighted — verify by navigating to /services and /about directly (not just clicking from home)
- [ ] **Responsive Layout:** Sections look correct at 1280px — verify at 375px, 768px, and 1024px for every redesigned section
- [ ] **Dark Stats Section:** `StatsRow` has correct dark background — verify that counter numbers and labels are readable after color token changes
- [ ] **Build:** `npm run build` passes — verify `npm run preview` also serves all 4 routes without white-screen errors
- [ ] **Tailwind Config:** Tailwind font aliases updated — verify by adding a temporary `className="font-display"` to a heading and confirming it renders in the new font

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Ghost CSS variable references rendering broken sections | LOW | Run grep for all old variable names, do find-replace pass, verify visually |
| JS hover state showing old font after font replacement | LOW | Locate all `variantBase` and `variantHover` objects, update fontFamily strings, test every button variant |
| Tailwind config font aliases out of sync | LOW | Update `tailwind.config.ts` fontFamily values, restart dev server (Tailwind config changes require restart) |
| `<style>` block media query orphaned after class rename | MEDIUM | Search for the old class name in the `<style>` block, update selector, test at mobile breakpoint |
| `AnimatePresence` exit animation broken | MEDIUM | Identify the structural change that broke it (likely a new wrapper or Fragment), restore direct children structure, test close/open cycle |
| All these compounding simultaneously during a rushed redesign pass | HIGH | Revert to last known-good commit, restart the redesign phase with the token replacement completed and verified before moving to component reskins |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Incomplete CSS variable replacement | Phase 1: Token Replacement | `grep -r "var(--color-primary\|--color-gold\|--color-border-green" src/` returns zero results |
| JS hover state breaking on font change | Phase 2: Typography + Button Reskin | Manually hover all button variants in `npm run preview` |
| Tailwind config out of sync | Phase 2: Typography Replacement | `className="font-display"` renders correct new font in browser |
| `<style>` block class name orphaning | Each phase that restructures a component | Manual mobile viewport check at 375px after each component change |
| Framer Motion exit animation broken | Phase 3: Section Redesign + Navbar | Navigate between routes; open and close mobile menu; watch for instant disappear vs. animated exit |
| New font weights not loaded | Phase 1: Font Setup | DevTools Network > Font tab shows correct weight files downloaded |
| FOUT regression from new fonts | Phase 1: Font Setup | Lighthouse run on `npm run preview` shows no "font-display" warning |

---

## Sources

- Direct codebase analysis: `.planning/codebase/CONCERNS.md`, `.planning/codebase/CONVENTIONS.md`, `src/components/ui/Button.tsx`, `src/components/layout/Navbar.tsx`, `src/styles/globals.css`, `tailwind.config.ts`
- Tailwind CSS official docs on static class scanning: [Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles), [Theme Variables](https://tailwindcss.com/docs/theme)
- Tailwind CSS variable performance discussion: [GitHub Discussion #14506](https://github.com/tailwindlabs/tailwindcss/discussions/14506)
- Framer Motion breaking changes and AnimatePresence bugs: [Motion Upgrade Guide](https://motion.dev/docs/react-upgrade-guide), [AnimatePresence Fragment issue](https://medium.com/javascript-decoded-in-plain-english/understanding-animatepresence-in-framer-motion-attributes-usage-and-a-common-bug-914538b9f1d3)
- Google Fonts FOUT and Lighthouse: [CSS-Tricks: Load Fonts Fighting FOUT](https://css-tricks.com/how-to-load-fonts-in-a-way-that-fights-fout-and-makes-lighthouse-happy/), [Chrome Lighthouse font-display](https://developer.chrome.com/docs/lighthouse/performance/font-display)
- Design token migration patterns: [UXPin Design Tokens](https://www.uxpin.com/studio/blog/managing-global-styles-in-react-with-design-tokens/), [Carbon Design System Migration FAQ](https://carbondesignsystem.com/migrating/faq/)

---

*Pitfalls research for: React + Tailwind visual redesign (design system replacement)*
*Researched: 2026-03-04*
