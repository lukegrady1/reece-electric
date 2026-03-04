Reece Group LLC — Design Override for Claude Code
Replace Previous Design System Entirely

This document supersedes all design decisions in the original handoff. The tech stack, SEO architecture, page structure, component names, data files, and routing remain identical. Only the visual design system changes. Claude Code should implement everything in the original spec but apply this new design system throughout.

New Theme: "Classic American Trade"
The concept: Reece Group LLC has been in business for 30 years. They sponsor the local little league team. Their trucks have magnetic door signs. Their invoices look like invoices. This site should feel like it was designed by a firm that takes reliability and permanence seriously — not a startup, not a tech company. Think established regional law firm, traditional insurance company, or a mid-century American trade publication.
What visitors feel: Trusted. This company has been here before I was born and will be here after. They're not chasing trends.
What this is NOT: modern, minimal, flat, trendy, dark-mode, blueprint-styled, or industrial. No thin fonts, no monospace labels, no abstract geometric patterns.

Fonts
Load from Google Fonts via index.html <link> — replace all previous font imports:
html<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet" />
RoleFontWeightNotesHeadings / DisplayPlayfair Display700, 900Serif, authoritative, traditionalBody / SubheadingsCrimson Pro400, 600Elegant serif body — readable, warmUI / Labels / ButtonsBarlow400, 500, 600Clean sans-serif for functional elements only
Rules:

H1–H3: always Playfair Display 700 or 900
Body paragraphs, blockquotes, descriptions: Crimson Pro 400, font-size: 17px, line-height: 1.85
Buttons, nav links, form labels, small UI text: Barlow 500 or 600
Letter-spacing on headings: 0 to 0.01em — Playfair needs no tracking help
Never use system fonts as anything other than the final fallback


Color Palette
Replace all CSS variables in src/styles/globals.css:
css:root {
  --color-bg:           #F5F1EB;   /* warm cream — aged paper, not bright white */
  --color-bg-alt:       #EDE8DF;   /* slightly darker cream for alternating sections */
  --color-surface:      #FDFAF5;   /* near-white for cards and panels */
  --color-surface-2:    #EAE4D8;   /* inset surfaces, table rows */

  --color-ink:          #1C1C1A;   /* near-black — warm, not cold */
  --color-ink-mid:      #4A4540;   /* secondary text */
  --color-ink-faint:    #8A837A;   /* captions, placeholders */

  --color-primary:      #1B3A2D;   /* deep forest green — the dominant brand color */
  --color-primary-dark: #122A20;   /* hover state */
  --color-primary-light:#2B5440;   /* lighter green for hover accents */
  --color-primary-tint: #E8F0EB;   /* very light green tint for backgrounds */

  --color-accent:       #8B2020;   /* deep burgundy — secondary accent, used sparingly */
  --color-accent-light: #F5EAEA;   /* tint for behind-accent uses */

  --color-gold:         #B8962E;   /* warm brass/gold — decorative dividers, stars */
  --color-gold-light:   #F0E8D0;   /* gold tint */

  --color-border:       #D4CCB8;   /* standard warm border */
  --color-border-dark:  #A09880;   /* heavier rule */
  --color-border-green: #1B3A2D;   /* green rule — used as decorative accent borders */

  --color-danger:       #8B2020;
}
Color usage rules:

--color-primary (forest green): primary CTA buttons, active nav links, section accent borders, checkmarks, key icons
--color-accent (burgundy): secondary CTAs, hover states on certain elements, pull-quote decorations — use sparingly, 1–2 times per page max
--color-gold: decorative horizontal rules, star ratings, ornamental dividers — never as a primary UI color
--color-bg and --color-bg-alt: alternate between sections to create rhythm without hard borders
No blue anywhere on the site


Background & Texture
Replace the ruled-line background with this in globals.css:
cssbody {
  background-color: var(--color-bg);
  /* Subtle noise texture — gives the cream a slight paper feel */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  color: var(--color-ink);
  font-family: 'Crimson Pro', Georgia, serif;
}
White cards (--color-surface) have a very subtle box-shadow: 0 1px 4px rgba(28,28,26,0.08) — gives them the feel of paper sitting on the cream background.

Layout & Spacing Philosophy

Max content width: 1100px centered
Traditional grid: 12-column, symmetrical. No asymmetry, no overlapping elements, no diagonal lines.
Section padding: py-20 desktop / py-12 mobile — comfortable but not extravagant
Cards and panels: border-radius: 4px — slight rounding, not sharp, not pill. Traditional.
Every section separated by: alternating background color (--color-bg / --color-bg-alt) OR a thin decorative gold <hr> rule


Decorative Elements
These recurring motifs reinforce the "established firm" aesthetic:
Ornamental Divider
A centered decorative separator used between sections and inside cards:
———  ✦  ———
Implemented as:
tsx// OrnamentalDivider.tsx
// Two 40px lines in --color-gold, a small diamond "✦" centered between them
// Rendered as: <hr style border-color gold> [✦] <hr>
// font: Barlow, color: --color-gold, font-size: 12px
// Use between major sections as an alternative to plain <hr>
Section Label Style
Replace AnnotationLabel component with SectionEyebrow:
tsx// SectionEyebrow.tsx
// Props: text (string)
// Style:
//   font: Barlow 600, 11px, uppercase, letter-spacing: 0.2em
//   color: var(--color-primary)        ← forest green
//   No border, no pill shape, no background tint
//   A single thin 24px line in --color-gold to the LEFT of the text
//   margin-bottom: 12px
// Example output:  — OUR SERVICES
Green Accent Border
Cards and featured sections use:
cssborder-top: 4px solid var(--color-primary);
This is the primary structural accent — green top border on white card surfaces.

Component Redesign Specs
Button.tsx — replace all previous styles
tsx// Variants:

// 'primary':
//   background: var(--color-primary)      ← forest green
//   color: #FFFFFF
//   font: Barlow 600, 13px, uppercase, letter-spacing: 0.12em
//   padding: 13px 32px
//   border-radius: 3px
//   border: 2px solid var(--color-primary)
//   hover: background var(--color-primary-dark), border-color var(--color-primary-dark)
//   transition: 180ms ease

// 'secondary':
//   background: transparent
//   color: var(--color-primary)
//   border: 2px solid var(--color-primary)
//   font: Barlow 600, 13px, uppercase, letter-spacing: 0.12em
//   padding: 13px 32px
//   border-radius: 3px
//   hover: background var(--color-primary), color white

// 'ghost':
//   background: transparent
//   color: var(--color-primary)
//   border: none
//   font: Barlow 600, 12px, uppercase, letter-spacing: 0.12em
//   underline on hover (text-decoration)
//   padding: 0

// 'accent' (use sparingly — 1-2x per page max):
//   background: var(--color-accent)       ← burgundy
//   color: #FFFFFF
//   border: 2px solid var(--color-accent)
//   same font/padding as primary
//   hover: background var(--color-primary-dark)... actually darken the burgundy manually
ServiceCard.tsx — replace all previous styles
tsx// Style:
//   background: var(--color-surface)
//   border: 1px solid var(--color-border)
//   border-top: 4px solid var(--color-primary)   ← green header rule
//   border-radius: 4px
//   padding: 32px 28px
//   box-shadow: 0 1px 4px rgba(28,28,26,0.08)
//
// Layout (top to bottom):
//   SectionEyebrow — category label (e.g. "RESIDENTIAL")
//   H3: Playfair Display 700, 22px, ink, normal tracking
//   OrnamentalDivider (small, inline — just the gold line, no diamond)
//   Description: Crimson Pro 400, 16px, 1.75 line-height, ink-mid
//   "Learn More →": Barlow 600, 12px, uppercase, green color, letter-spacing 0.1em
//
// Hover:
//   box-shadow: 0 4px 16px rgba(27,58,45,0.12)
//   border-top-color stays green (no change — stability is the point)
//   "Learn More →" color shifts to --color-accent (burgundy)
//   transition: 220ms ease
TestimonialCard.tsx — replace all previous styles
tsx// Style:
//   background: var(--color-surface)
//   border: 1px solid var(--color-border)
//   border-left: 4px solid var(--color-gold)     ← gold left accent
//   border-radius: 4px
//   padding: 32px
//
// Layout:
//   "★★★★★": Barlow 500, 14px, --color-gold  (use actual ★ characters)
//   OrnamentalDivider (small)
//   Quote: Crimson Pro italic, 17px, 1.85 line-height, ink-mid
//   Reviewer name: Playfair Display 700, 15px, ink
//   Location/detail: Barlow 400, 12px, ink-faint
Accordion.tsx (FAQ) — replace all previous styles
tsx// Each item:
//   Trigger: full-width button
//   border-bottom: 1px solid var(--color-border)
//   padding: 18px 0
//   Question: Playfair Display 700, 17px, ink
//   Expand icon: "+" / "−" in Barlow, --color-primary, right-aligned
//   Open item: background tint var(--color-primary-tint) on trigger row
//   Answer: Crimson Pro 400, 16px, 1.8 line-height, ink-mid, padding 16px 0 24px 0
//   Framer Motion: height 0 → auto, opacity 0 → 1
StatCard.tsx — replace all previous styles
tsx// Number: Playfair Display 900, 60px desktop / 44px mobile, --color-primary (green)
// Suffix: Playfair Display 700, 30px, --color-ink-mid, inline
// Label: Barlow 500, 12px, uppercase, letter-spacing: 0.15em, --color-ink-mid
// Decorative: thin gold line (border-bottom: 2px solid --color-gold) beneath number
// Counter animation: same as before (useInView + Framer Motion)

Navbar — replace all previous styles
[LOGO]                     [HOME]  [SERVICES]  [ABOUT]  [CONTACT]     [CALL FOR ESTIMATE]
Logo:

Line 1: Reece Group — Playfair Display 700, 20px, --color-ink
Line 2: LLC  ·  Licensed Electricians — Barlow 500, 11px, --color-ink-faint, uppercase, letter-spacing 0.15em
No divider line next to logo — just left-aligned, understated

Nav background: Always var(--color-surface) (near-white). No blur, no transparency — always solid.
Border: border-bottom: 2px solid var(--color-primary) — the green line under the nav is a constant, load-bearing design element.
Nav links: Barlow 600, 13px, uppercase, letter-spacing 0.12em, --color-ink-mid. Hover: --color-primary. Active: --color-primary + border-bottom: 2px solid var(--color-primary).
CTA Button in nav: Button variant primary (green fill). Text: "Call for an Estimate". Size sm.
Mobile menu: Slide down from top (not full-screen overlay). White background, green bottom border. Links in Playfair Display 700, 28px, centered. Traditional, not dramatic.

Footer — replace all previous styles

background: var(--color-primary) — deep forest green footer
All text: warm white / --color-bg color
3-column grid on desktop
Col 1: Logo text in white + tagline in Crimson Pro italic
Col 2: Barlow 11px uppercase heading QUICK LINKS (gold color), then Crimson Pro 16px white links
Col 3: Barlow 11px uppercase heading CONTACT US (gold), then white contact details
Bottom bar: border-top: 1px solid rgba(255,255,255,0.15), background: var(--color-primary-dark), Barlow 11px, muted white
Gold OrnamentalDivider at top of footer (full-width decorative rule before columns)


Home Page Section Redesign
Apply the new design system to all sections. Key changes:
Hero

Background: var(--color-bg) — plain cream, no pattern, no texture overlay
Content centered, max-width 700px
SectionEyebrow: "LICENSED & INSURED ELECTRICIAN — [CITY, STATE]"
H1: Playfair Display 900, 80px desktop / 48px mobile, --color-ink:
Reece Group LLC
Below H1: thin full-width gold <hr> (border: 0; border-top: 1px solid var(--color-gold); width: 80px; margin: 24px auto)
Subtitle: Crimson Pro 400 italic, 20px, --color-ink-mid, 1.7 line-height
CTAs: Primary green "Get a Free Estimate" + Secondary outlined green "Our Services"
Trust signals: Barlow 11px uppercase, --color-ink-faint, letter-spacing 0.15em:
LICENSED & INSURED  ·  SAME-DAY SERVICE  ·  5-STAR RATED  ·  [CITY] BASED
No large decorative ghost numbers — just clean, spacious, dignified

Trust Bar

background: var(--color-primary) — green strip (replaces white strip)
White text items, Barlow 12px uppercase, letter-spacing 0.15em
Gold · separators

Services Preview

Section background: var(--color-bg-alt) — slightly darker cream
SectionEyebrow + H2 Playfair Display 700 52px
Same 3-column card grid, ServiceCard with new styles

Why Choose Us

Standard two-column layout, same structure
Pull card on right: border-top: 4px solid var(--color-primary), white surface
Checklist ✓ in --color-primary green

Stats Row

background: var(--color-bg-alt) — no more dark navy section
Stats sit on the cream background, unified with the page
Large gold OrnamentalDivider above stats
Numbers in --color-primary green, labels in --color-ink-mid

Testimonials

background: var(--color-bg) — cream
Cards with gold left border accent

CTA Banner

background: var(--color-primary) — forest green (not blue)
H2 Playfair Display 900, white, 56px: Ready to Get Started?
Subtitle Crimson Pro italic, white
Buttons: white fill with green text (primary), white outline (secondary)


Motion — Dial It Back
This is a traditional site. Animations exist only to prevent the page from feeling dead — they should not call attention to themselves.
Remove or simplify:

No dramatic stagger sequences with 6+ items
No y: 16 → 0 slides — use opacity: 0 → 1 only (fade, no movement)
Stat counter animations: keep, but use a 1.5s duration (slower, more dignified)
Hover transitions: 180ms ease max
Page transitions: simple opacity fade only, duration: 0.2s

Keep:

whileInView section reveals — but opacity only, duration: 0.4s, once: true
Accordion open/close animation (functional, not decorative)
Hover color shifts on nav links, cards, buttons


What This Replaces
The following elements from the previous design spec are removed entirely and replaced by the above:
Old ElementReplacementAnnotationLabel (IBM Plex Mono pill tag)SectionEyebrow (Barlow, no border/bg)RuledDivider (blueprint line)OrnamentalDivider (gold ✦ rule)Ruled paper body backgroundPlain cream --color-bgIBM Plex Mono fontBarlow for all UI/label textSyne display fontPlayfair DisplayLibre Baskerville body fontCrimson ProElectric blue #1A6BFF accentForest green #1B3A2D primaryBlueprint annotation numbers (01 —)Plain SectionEyebrow textGhost decorative hero numberNothing — just clean spaceDark navy Stats RowCream background stats sectionDark navy footerForest green footerCTA Banner in blueCTA Banner in forest green

Summary: What "Professional and Less Modern" Means Here

Serif typography throughout — Playfair Display is timeless, not trendy
Forest green + cream + gold — the color language of law firms, banks, and established trade companies — not tech, not startups
Symmetrical, traditional layouts — predictable grids inspire trust; no asymmetry
Restrained animation — things fade in; they don't slide, bounce, or scale
Ornamental details — the gold divider rule and green border accents signal craftsmanship
No monospace fonts, no annotation numbers, no blueprint motifs — those read as "designer" not "established business"


Design Override Document — Reece Group LLC
Theme: Classic American Trade
Fonts: Playfair Display + Crimson Pro + Barlow
Palette: Forest green · Warm cream · Deep burgundy · Brass gold
Apply on top of original handoff spec — structure unchanged, design replaced entirely