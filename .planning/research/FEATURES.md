# Feature Research

**Domain:** Premium B2C trades/contractor service website — visual redesign
**Researched:** 2026-03-04
**Confidence:** MEDIUM-HIGH (web research + multiple corroborating sources; no direct user testing data)

---

## Context

This research addresses a specific redesign problem: the existing Reece Group LLC site has the right structure and content but reads as generic and template-generated. The question is what design features distinguish premium established-contractor sites from the template default. Research draws from analysis of top-performing electrician and contractor websites, editorial web design principles, and service business conversion research.

The goal per PROJECT.md: a visitor lands and thinks "most established electrician in the area" before reading a single word.

---

## Feature Landscape

### Table Stakes — Users Expect These

Features a credible trades website must have. Visitors don't give credit for them, but penalize for missing them. These are non-negotiable even before addressing the premium redesign goal.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Prominent phone number in navbar | Local service = phone-first conversion; users expect to call | LOW | Must be a real `tel:` link, minimum 44px tap target on mobile |
| Single sticky header | Users expect to access nav/phone from any scroll position | LOW | Already implemented; scroll-shadow behavior on scroll matters |
| Trust credentials displayed above the fold | Homeowners letting strangers into their homes need instant credential reassurance | LOW | License, insurance, years in business — not just claimed, but specific |
| Real service names (not marketing-speak) | Users search for specific terms: "panel upgrade," "EV charger install" | LOW | Already in data layer; surface these in navigation not just body |
| Mobile-first responsive layout | 60%+ of local service searches happen on mobile | MEDIUM | Already exists; key is ensuring tap targets, font sizes, nav usability |
| Clickable contact info everywhere | Phone and email must be tappable links, not plain text | LOW | `tel:` and `mailto:` on every occurrence |
| Clear primary CTA on every page | Users need a "what do I do next" signal — missing = bounces | LOW | "Get a Free Estimate" in hero; persistent phone in nav |
| Google-readable heading hierarchy | H1 → H2 → H3, one H1 per page, no skipped levels | LOW | Already implemented; maintain on redesign |
| Fast load time | 1s delay = 7% conversion drop; slow = signal of unprofessionalism | MEDIUM | Already chunked; avoid heavy background images without optimization |
| HTTPS / secure indicators | Visitors distrust "Not Secure" warning, especially on contact forms | LOW | Infrastructure level; already handled |

### Differentiators — What Makes Premium Sites Memorable

These separate the 1% of contractor sites that feel genuinely established from the 99% that feel interchangeable. These are the focus of the redesign.

**Typography & Type Scale**

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Commanding headline size with real conviction | At 88px+ desktop, headlines that don't apologize — weight carries authority before copy is read | LOW | Syne 800 exists; the problem is tracking and line-height defaults undermining the scale. Tight tracking (-0.03em) + line-height ~1.0 at large sizes creates editorial density. |
| Strict 3-level type system with perceptible contrast between levels | Clear hierarchy makes users scan confidently; template sites collapse levels into visual noise | LOW | Display (Syne 800 88px), body (Libre Baskerville 16px), annotation (IBM Plex Mono 11px uppercase). The GAP between these must be large enough that no visitor is confused about what level they're at. |
| Annotation labels as genuine wayfinding | IBM Plex Mono uppercase 11px labels signal precision and craft, not decoration | LOW | Currently in codebase; make them do real work — numbered sections give users a sense of structured, comprehensive coverage |
| Eyebrow-to-headline spatial gap | Premium editorial sites use more space above headlines than below; the "breath" before a headline signals the section is about to say something important | LOW | `margin-bottom` on eyebrow label should be smaller than `margin-top` (rule: top space ≥ 2x bottom space) |

**Color & Contrast Story**

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Deep navy dominant color | Navy communicates heritage and authority — same reason law firms, financial institutions, and premium contractors use it. Signals permanence, not startup | LOW | Color system overhaul per PROJECT.md; navy dominant, not just accent |
| Single intentional accent color used sparingly | Accent color that appears rarely feels premium — every use is deliberate. Template sites overuse accent everywhere, diluting it | LOW | Electric blue (#1A6BFF or similar) only on: CTAs, active states, annotation labels, stat numbers. Every other element is navy or white. |
| One dark-dominant section on the page | A full dark section (navy or near-black) creates a visual "chapter break" — proves the designer controlled the page, not the template | LOW | Stats section is the right candidate; it already exists in the codebase |
| White surface cards floating above page background | The layering of white cards on a non-white page creates depth without photography — signals careful craft | LOW | Page bg ≠ card bg; this distinction must survive the redesign |

**Section Architecture & Visual Flow**

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Each section has a distinct visual identity | Premium sites: scroll down and each section feels like a different "room." Template sites: every section looks identical, just different content | MEDIUM | Requires deliberate design of each section's background, layout geometry, and internal spacing — not just dropping content into the same shell |
| Alternating layout geometry (not just color) | Z-pattern / alternating column arrangements make the eye move laterally, creating a sense of being guided, not dumped on | MEDIUM | Services page already has alternating content/image. Apply the principle to homepage sections with 2-column blocks alternating emphasis. |
| Section dividers as design elements | Full-width 1px rules between sections signal precision — trades people understand precision. These lines are "blueprint rules." | LOW | Already in codebase as RuledDivider; important to use them consistently and give them breathing room (not flush against section content) |
| Sections connected by visual throughline | Sections shouldn't feel bolted together. Shared spatial rhythm (consistent left alignment, consistent max-width, consistent grid structure) creates cohesion even as individual sections vary | MEDIUM | All content within `max-width: 1160px` container; ensure grid column alignment is consistent across sections even when layout varies |
| Deliberate section-break geometry | Premium sites use section backgrounds (full-width navy, accent-light, surface-2) to signal "now we're talking about something different." Template sites use the same white for every section. | LOW | Intentionally vary background among: --color-bg (page default), --color-surface (white cards), --color-surface-2 (light grey inset), --color-ink (dark navy). Use all four in distinct sections. |

**Trust Signal Architecture**

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Specific, concrete numbers not vague claims | "15+ Years" and "500+ Jobs" are convincing. "Quality Work Since Day One" is not. Premium sites lead with numbers because numbers signal confidence in real track record. | LOW | Stats section already exists; ensure numbers are real/realistic and counters animate on scroll |
| Credentials displayed with specificity | "Licensed Master Electrician" with actual license number and state beats a generic "Licensed & Insured" badge. Specificity signals nothing to hide. | LOW | Already in CLAUDE.md spec; ensure credentials section on About page shows the license number placeholder and is prominent |
| Testimonials with full names and location | "Sarah M., [City]" beats "Satisfied Customer." First + last initial + city = real person. Template sites use anonymous quotes. | LOW | Already in testimonials.ts; location field matters — ensure it renders |
| Trust bar that leads with institutional credentials | BBB, OSHA, state license — institutional affiliations have third-party authority that self-claimed credentials don't | LOW | TrustBar component exists; lead with institutional affiliations before self-stated claims |

**Motion & Interaction**

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Scroll-reveal with stagger, not simultaneous pop | Elements revealing sequentially (0.1s stagger) create a sense of intelligent choreography. Everything popping in simultaneously is what templates do. | LOW | Framer Motion already in place; `staggerChildren` in parent variant is the implementation |
| Stat counters animating on scroll | Counting from 0 to "500+" as the section enters view is one of the single most memorable micro-interactions on service sites — visitors stop and watch | LOW | StatCard already has this; ensure it's smooth and starts at 0 reliably |
| Hover states that feel intentional, not CSS default | Card hover with border-color shift + subtle shadow lift signals handcrafted. Opacity-only hover = template. | LOW | ServiceCard hover should shift top-border from navy to accent + add shadow — currently in spec, needs to work in redesign |
| Page transitions that don't jank | Opacity + Y-slide between pages signals a SPA not a multi-page static site — positions the brand as technically competent | LOW | PageWrapper with Framer Motion already in place; keep it |

**Hero Section Specifically**

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Headline that leads with brand name and period | "Reece Group LLC." as the H1 is a deliberate editorial choice — confident, not explanatory. Template sites write "Quality Electrical Services in [City]." | LOW | Already in spec; this is the right call — a brand name as headline says we don't need to explain ourselves |
| Pain-point subtitle, not service list | "Built to code. Done right the first time." addresses what homeowners fear (bad work, code violations, callbacks) not what the company offers | LOW | Already in spec; maintain this framing in redesign |
| Trust signals below CTAs, not above | Above CTAs: clear what you do and who for. Below CTAs: evidence you're trustworthy. Template sites lead with credentials before giving the visitor a reason to care | LOW | "LICENSED & INSURED · SAME-DAY SERVICE · 5-STAR RATED" below the CTA row is the right order |
| No hero background image or video | Placing the headline directly on the page background (with no photographic backdrop) is a confident editorial choice — it says the type IS the design. Template sites fill the hero with a stock-photo worker. | LOW | Already in spec — no hero background. This is a deliberate differentiator. |
| Large decorative section number behind content | The faint "01" behind the hero content is a blueprint annotation detail that signals handcrafted design to discerning visitors | LOW | Already in spec; ensure the decorative number is clearly `z-index: 0` and faint enough to not compete |

### Anti-Features — Patterns That Signal Generic Template

Features that seem reasonable but immediately communicate "this is a template site" to visitors who have seen many service websites.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Stock photo hero with contractor in hard hat | Looks professional at a glance | Visitors have seen this exact photo on dozens of competitors' sites. It reads "bought this theme." Real job-site photos are distinctive; generic stock is interchangeable. | No hero photo (editorial text-only hero) OR a genuine placeholder that explicitly says "INSERT PROJECT PHOTO" rather than stock imagery |
| Lightning bolt / electrical icon in logo or hero | Seems relevant to the trade | It is the single most overused icon in the electrician category. It signals "used a theme built for electricians." Same with tools, plugs, and circuit patterns. | Pure typographic identity — the name IS the brand. No trade iconography needed. |
| Blue-yellow color palette | "Blue for trust, yellow for electrical" is a common electrician site trope | Yellow + blue is the most common color scheme in electrician templates. Visitors associate it with ServiceTitan-era template sites. | Navy dominant with a single, unexpected accent — electric blue without yellow breaks from the template pattern |
| Widget-style social proof bars (logos + star ratings overlaid) | Shows trust signals prominently | The rotating logo carousel and star-badge widget are recognized template components. They signal Yelp embed or a review widget plugin, not an established brand. | Handcrafted testimonial cards with name, location, and quote — feels written, not widget-inserted |
| Gradient CTA buttons with rounded corners | Trendy-looking at a glance | Rounded gradient buttons are the signature of 2020-era home services templates (ServiceTitan, Jobber, HouseCall Pro hosted sites). 2px border-radius with flat color reads as deliberate, not default. | Flat-color buttons with minimal border-radius (2px), precise transitions, monospace label typography |
| "Why Choose Us?" section with icon grid | Seems like a clear way to communicate differentiators | The four-icon grid (Experienced, Licensed, Insured, Local) with a 60px icon above each is the most copied contractor website section. Visitors skim past it because they've memorized it. | Two-column layout with a checklist in a white card — architectural, not templated. Checklist items with specific claims, not category headers. |
| Section with green/teal accent color | Can feel fresh and outdoorsy | In the contractor space, green accents trend toward landscaping and eco-services. It dilutes the electrical authority signal. | Electric blue (#1A6BFF) is on-brand for electrical specifically — keep it but use it sparingly |
| Footer with dark background and widget-style columns | Common on GoDaddy/Squarespace builds | Three-column footer in dark background with identical column widths and heading style is template-default. | Footer in `--color-surface` (white) with precise column proportions and editorial heading style different from body columns |
| Numbered list sections that look like checklists | Seems organized | Generic bulleted or numbered lists without typographic distinction look like a Word document. | Icon-less checklist with accent-blue left marker and border-bottom separators between items — same content, completely different read |
| Auto-playing video background | "Engaging" at first glance | Performance killer (Lighthouse will tank), accessibility problem, motion sensitivity issue. Also heavily associated with 2018-era contractor template sites. | Static page background with text as the hero — more confident, faster, more accessible |
| Chat widget in bottom-right corner | "Always available" | Generic chat widgets (Drift, Intercom, etc.) visually clash with premium aesthetic and signal small-business-template-with-added-plugin. | Prominent persistent phone CTA in navbar. The phone number IS the live chat for a local contractor. |
| "As Seen On" bar with local TV station logos | Looks like media coverage | For a local electrician, a local TV spot is not a significant authority signal — it's filler. Visitors see this and assume it's aspirational or fabricated. | Specific certification badges (BBB A+, OSHA 10, state license) — institutional affiliations that can be verified |

---

## Feature Dependencies

```
[Deep navy color system]
    └──enables──> [Each section has distinct visual identity]
                      └──enables──> [Visual flow between sections]

[Typography scale with conviction]
    └──enables──> [Headline-first hero]
    └──enables──> [Editorial annotation labels as wayfinding]

[White surface cards]
    └──requires──> [Non-white page background]
                       └──requires──> [CSS variable system defining page bg vs surface bg distinctly]

[Stat counter animation]
    └──requires──> [useInView hook]
    └──requires──> [Framer Motion animate value]
    (already implemented in StatCard — do not remove)

[Section visual identity variety]
    └──conflicts──> [Single shared section shell component]
    (each section must be individually designed, not instances of a shared template)

[No hero background image]
    └──enhances──> [Typography as the hero design]
    └──conflicts──> [Hero-with-stock-photo anti-pattern]

[IBM Plex Mono annotation labels]
    └──enhances──> [Blueprint precision aesthetic]
    └──conflicts──> [Using same font for annotation + body — must maintain font distinction]
```

### Dependency Notes

- **Deep navy requires section variety:** Once the page is predominantly navy/white, each section must vary in layout structure — not just content — to avoid monotony. The color reduction demands more layout variation.
- **No hero image requires stronger typography:** Without a hero photograph to carry visual weight, the headline must be large enough and weighted enough to anchor the page alone. 88px Syne 800 is the minimum.
- **Section identity variety conflicts with shared component shells:** Template sites share one section component with slot-filled content. Premium sites require each section to be individually designed. The redesign should resist the urge to make a reusable "SectionShell" component.

---

## MVP Definition

For the redesign milestone, all items below are in scope — this is not a feature-addition project, it's a quality-level shift.

### Launch With (Redesign Completion)

- [ ] Deep navy color system replacing blueprint-paper palette — establishes authority tone throughout
- [ ] Hero section with commanding type scale (88px desktop H1) and no photographic background — most visible, first impression
- [ ] Each homepage section with distinct visual identity — eliminates "copy-pasted blocks" complaint from PROJECT.md
- [ ] Flat-color CTA buttons with 2px border-radius and monospace labels — removes template signal
- [ ] Why Us section using checklist-card layout, not icon grid — replaces most-copied anti-pattern
- [ ] Stats section in full-width dark navy — creates visual chapter break, counter animations working
- [ ] Testimonial cards with full name + location rendering — makes social proof feel real not widget-inserted
- [ ] Section spacing that gives headlines room to breathe (generous padding, eyebrow-to-headline ratio correct)
- [ ] Annotation labels actively numbered and contributing to wayfinding — not just decorative

### Add After Validation (Post-Launch)

- [ ] Real project photography replacing placeholder boxes — dramatically increases trust signal; requires client
- [ ] Real Google Reviews replacing placeholder testimonials — requires client

### Future Consideration (v2+)

- [ ] Project portfolio gallery — requires enough completed projects with photos to make it meaningful
- [ ] Before/after sliders for service pages — requires real photography

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Navy-dominant color system | HIGH | LOW | P1 |
| Commanding hero typography | HIGH | LOW | P1 |
| Each section distinct visual identity | HIGH | MEDIUM | P1 |
| Remove icon-grid "Why Choose Us" pattern | HIGH | LOW | P1 |
| Flat buttons with 2px radius (remove rounded gradient) | MEDIUM | LOW | P1 |
| Section dividers as breathing design elements | MEDIUM | LOW | P1 |
| Stat counters with scroll-trigger | MEDIUM | LOW | P1 |
| Staggered scroll-reveal animations | MEDIUM | LOW | P2 |
| Dark navy footer (white with precise columns) | MEDIUM | LOW | P2 |
| Annotation labels numbered and working as wayfinding | LOW | LOW | P2 |
| Testimonials with name + location displayed prominently | HIGH | LOW | P1 |
| Credentials section with specificity (license number visible) | HIGH | LOW | P1 |

**Priority key:**
- P1: Core redesign — must be addressed for site to no longer feel template-generated
- P2: Polish — addressed after core sections redesigned
- P3: Deferred — needs client content or later phase

---

## Competitor Feature Analysis

Research based on analysis of cyberoptik.net's best electrician websites list and Hook Agency's contractor website examples. Specific sites not named publicly here; patterns distilled from 20+ examples.

| Feature | Generic Template Pattern | Premium Site Pattern | Reece Group Approach |
|---------|--------------------------|---------------------|---------------------|
| Hero background | Stock photo of worker or blue gradient | Text-only editorial OR real project photo | Text-only (per spec — maintain this) |
| CTA button style | Rounded corners, gradient or flat, generic sans-serif label | Flat color, 2px radius, monospace uppercase label | IBM Plex Mono uppercase labels, 2px radius — already in spec |
| Color palette | Blue + yellow, or green + white, or red + dark | Single dominant neutral + one accent used sparingly | Deep navy + electric blue accent, used sparingly |
| Typography | System fonts or Roboto/Open Sans + one display font | Strong display serif or heavy sans + distinct body font + mono accent | Syne (display) + Libre Baskerville (body) + IBM Plex Mono (labels) — already correct pairing |
| "Why Us" section | 4-6 icon grid with category headers | Checklist in architectural card, or text with pull quotes | Checklist-in-card with accent-blue check marks — already in spec |
| Social proof display | Widget-style star ratings, rotating logos | Handcrafted testimonial cards with full attribution | TestimonialCard with name + location — spec is correct |
| Service display | Flat icon + title + 30-word description, grid | Alternating detail sections OR strong service cards with border-top rule | ServiceCards with top rule + alternating detail sections on Services page |
| Stats section | Absent or in footer, small, no animation | Full-width dark section, large numbers, scroll-animated | Dark ink section with counter animation — already in spec |
| Footer | Dark background with widget columns | White/surface background with editorial column structure | Surface-colored footer with border-top — per spec |
| Section variety | Same white background for all sections | Deliberate background variation (white, off-white, navy, accent-light) | Four distinct backgrounds mapped to specific sections |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Anti-features list | HIGH | Corroborated across multiple sources analyzing 100+ contractor sites; patterns are consistent |
| Table stakes | HIGH | Industry standard; well-documented conversion research |
| Premium differentiators — typography | MEDIUM-HIGH | Editorial design principles well-documented; trades-specific application inferred from general patterns |
| Premium differentiators — section architecture | MEDIUM | General web design research; specific trades-site application is judgment-based |
| Color authority claims (navy = established) | MEDIUM | Color psychology research consistent; local trades-specific A/B test data not available |
| Hero without photo as premium signal | MEDIUM | Counter-intuitive claim; supported by editorial design patterns but premium trades sites with strong photography also exist |

---

## Sources

- [Electrician Websites: 35+ Inspiring Examples (2026) — SiteBuilderReport](https://www.sitebuilderreport.com/inspiration/electrician-websites)
- [20 Best Electrician Websites of 2025 — CyberOptik](https://www.cyberoptik.net/blog/20-best-electrician-websites/)
- [Construction Contractor Website Design (19 Examples) — Hook Agency](https://hookagency.com/blog/construction-contractor-websites/)
- [30 Best General Contractor Websites — Comrade Digital Marketing](https://comradeweb.com/blog/top-best-contractor-websites/)
- [How to Design a High-Converting Electrician Website — Scorpion](https://www.scorpion.co/electrical/insights/blog/verticals/electrical/how-to-design-a-high-converting-electrician-webs/)
- [10 Website Mistakes That Are Costing Your Construction Business Clients — Design Hero](https://www.design-hero.com/business-tips/construction-industry-website-mistakes/)
- [Optimal Typography for Web Design in 2025 — Elegant Themes](https://www.elegantthemes.com/blog/design/optimal-typography-for-web-design)
- [Top 10 Typography Trends in 2025 — Atomic Social](https://atomicsocial.com/top-10-typography-trends-in-2025-backed-by-data/)
- [Cinematic Continuity on UI Design — Medium / Claudio Guglieri](https://medium.com/ux-design-1/cinematic-continuity-on-ui-design-8aa191ab9c8e)
- [11 Exciting Web Design Trends in 2025 — BairesDev](https://www.bairesdev.com/blog/exciting-web-design-trends/)
- [New Approach to Brand Identity Design 2025 — Creative Frontiers](https://www.creativefrontiers.co/blog/new-approach-to-brand-identity-design-a-2025-guide)

---

*Feature research for: Premium trades service website redesign — design patterns that project authority*
*Researched: 2026-03-04*
