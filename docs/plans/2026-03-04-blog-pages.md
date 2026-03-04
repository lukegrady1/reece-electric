# Blog Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `/blog` listing page and `/blog/:slug` individual post pages for local SEO, with 5 MA-focused electrician articles.

**Architecture:** Static post data in `src/data/posts.ts`; `Blog.tsx` renders a card grid; `BlogPost.tsx` renders a single article using `useParams` to match slug. Routes added to `App.tsx`. Nav link added to `Navbar.tsx`. Content rendered via `dangerouslySetInnerHTML` (developer-authored, no XSS risk).

**Tech Stack:** React + TypeScript, React Router v6 `useParams`, Framer Motion (stagger reveal), React Helmet Async (per-post SEO), existing design system (AnnotationLabel, CTABanner, ServiceCard-style cards).

---

### Task 1: Post data file

**Files:**
- Create: `src/data/posts.ts`

**Step 1: Create the file with typed interface and 5 posts**

```ts
export interface Post {
  slug: string
  title: string
  seoTitle: string
  seoDescription: string
  category: string
  date: string          // "March 4, 2026"
  dateISO: string       // "2026-03-04"
  readTime: string      // "5 min read"
  excerpt: string
  content: string       // HTML string
}

export const posts: Post[] = [
  {
    slug: 'electrical-panel-upgrade-signs',
    title: 'How to Know If Your Electrical Panel Needs an Upgrade',
    seoTitle: 'Signs Your Electrical Panel Needs an Upgrade | Reece Group LLC',
    seoDescription: 'Learn the warning signs that your electrical panel needs upgrading. Reece Group LLC serves all 351 Massachusetts cities and towns.',
    category: 'Panel Upgrades',
    date: 'March 4, 2026',
    dateISO: '2026-03-04',
    readTime: '5 min read',
    excerpt: 'Your electrical panel is the heart of your home\'s electrical system. Here\'s how to tell when it\'s time for an upgrade — before a small issue becomes a serious hazard.',
    content: `
      <h2>What Does an Electrical Panel Do?</h2>
      <p>Your electrical panel — also called a breaker box or load center — distributes electricity from the utility company throughout your home. It contains circuit breakers that automatically shut off power when a circuit is overloaded, protecting your wiring and appliances from damage.</p>
      <p>Most homes built before 1990 have panels rated for 100 amps. Modern homes with EV chargers, central air, and high-demand appliances often need 200-amp service or more.</p>

      <h2>Warning Signs You Need a Panel Upgrade</h2>
      <ul>
        <li><strong>Breakers trip frequently</strong> — If you're resetting breakers regularly, your panel can't handle the load.</li>
        <li><strong>Lights flicker or dim</strong> — Especially when appliances start up, this signals insufficient capacity.</li>
        <li><strong>Burning smell or scorch marks</strong> — A serious warning sign. Call an electrician immediately.</li>
        <li><strong>Your panel is a Federal Pacific or Zinsco brand</strong> — These are known fire hazards and should be replaced regardless of age.</li>
        <li><strong>You're adding a major appliance</strong> — EV charger, hot tub, or HVAC upgrade often requires more capacity.</li>
        <li><strong>Your home is over 25 years old</strong> — Panels age and components wear out over time.</li>
      </ul>

      <h2>What Does a Panel Upgrade Cost in Massachusetts?</h2>
      <p>A 200-amp panel upgrade in Massachusetts typically costs between $1,500 and $3,500, depending on the complexity of the work, your town's permitting fees, and whether the utility needs to be involved. Reece Group LLC provides free on-site estimates so you know the exact cost before any work begins.</p>

      <h2>Do I Need a Permit?</h2>
      <p>Yes — in Massachusetts, all electrical panel work requires a permit pulled by a licensed electrician. Reece Group LLC handles all permitting for every job we perform. Work done without permits can void your homeowner's insurance and create problems when you sell your home.</p>

      <h2>Ready for a Free Estimate?</h2>
      <p>Reece Group LLC is a licensed master electrician serving all 351 cities and towns in Massachusetts. If you're seeing any of the warning signs above, contact us today for a free, no-obligation estimate.</p>
    `,
  },
  {
    slug: 'ev-charger-installation-massachusetts',
    title: 'EV Charger Installation in Massachusetts: What Homeowners Need to Know',
    seoTitle: 'EV Charger Installation Massachusetts | Reece Group LLC',
    seoDescription: 'Everything Massachusetts homeowners need to know about Level 2 EV charger installation — cost, permits, and what to expect. Serving all 351 MA towns.',
    category: 'EV Chargers',
    date: 'March 4, 2026',
    dateISO: '2026-03-04',
    readTime: '6 min read',
    excerpt: 'Thinking about installing a Level 2 EV charger at home? Here\'s everything Massachusetts homeowners need to know — from permits to panel capacity to MassSave rebates.',
    content: `
      <h2>Level 1 vs. Level 2 EV Charging</h2>
      <p>Level 1 charging uses a standard 120V outlet and adds roughly 4–5 miles of range per hour — fine for plug-in hybrids, but painfully slow for a full EV. Level 2 chargers run on 240V and add 20–30 miles per hour, meaning a full charge overnight.</p>
      <p>For most EV owners, a Level 2 home charger is the right choice. It's faster, more efficient, and significantly more convenient.</p>

      <h2>What's Involved in the Installation?</h2>
      <ul>
        <li><strong>Panel assessment</strong> — We check whether your existing panel has capacity for a 40–50 amp dedicated circuit.</li>
        <li><strong>Circuit installation</strong> — A dedicated 240V circuit run from your panel to the garage or driveway.</li>
        <li><strong>Charger mounting</strong> — The EVSE (Electric Vehicle Supply Equipment) is mounted and connected.</li>
        <li><strong>Permit and inspection</strong> — Required by Massachusetts law. We handle all paperwork.</li>
      </ul>

      <h2>MassSave Rebates</h2>
      <p>Massachusetts homeowners may be eligible for up to $700 in rebates through MassSave for Level 2 charger installation. Income-eligible customers may qualify for even more. Ask us about current incentives when you request your estimate.</p>

      <h2>How Much Does It Cost?</h2>
      <p>EV charger installation in Massachusetts typically runs $400–$1,200 for the electrical work, not including the charger unit itself. Cost depends on distance from panel to charger location, panel upgrade needs, and permit fees by municipality.</p>

      <h2>Get a Free Estimate</h2>
      <p>Reece Group LLC installs EV chargers throughout Massachusetts. We're familiar with local permit requirements in every town we serve. Contact us for a free on-site estimate.</p>
    `,
  },
  {
    slug: 'gfci-afci-outlets-massachusetts',
    title: 'GFCI vs. AFCI Outlets: A Massachusetts Homeowner\'s Guide',
    seoTitle: 'GFCI vs AFCI Outlets Massachusetts | Reece Group LLC',
    seoDescription: 'Confused about GFCI and AFCI outlets? Learn what they do, where they\'re required by Massachusetts code, and when to upgrade.',
    category: 'Safety',
    date: 'March 4, 2026',
    dateISO: '2026-03-04',
    readTime: '4 min read',
    excerpt: 'GFCI and AFCI protection are required by the Massachusetts electrical code — but many older homes don\'t have them. Here\'s what they do and where you need them.',
    content: `
      <h2>What Is a GFCI Outlet?</h2>
      <p>GFCI stands for Ground Fault Circuit Interrupter. It monitors the flow of electricity and shuts off power in milliseconds if it detects a ground fault — electricity flowing somewhere it shouldn't, like through a person. This protects against electric shock.</p>
      <p>You've seen the outlets with "TEST" and "RESET" buttons — those are GFCIs. Massachusetts electrical code requires them in bathrooms, kitchens, garages, outdoor areas, and anywhere near water.</p>

      <h2>What Is an AFCI Outlet?</h2>
      <p>AFCI stands for Arc Fault Circuit Interrupter. It detects dangerous electrical arcs — the kind that can start fires inside walls where you can't see them. While GFCIs protect people from shock, AFCIs protect your home from fires.</p>
      <p>Massachusetts adopted the 2020 NEC (National Electrical Code), which requires AFCI protection for nearly all living areas including bedrooms, living rooms, hallways, and dining rooms.</p>

      <h2>Does My Home Have Them?</h2>
      <p>If your home was built or substantially renovated after 2002, you likely have GFCI protection in wet areas. AFCI protection is newer — if your home is more than 10 years old, you may not have it.</p>
      <p>Homes without proper GFCI and AFCI protection are technically out of code and present real safety risks. The good news: upgrading is straightforward and relatively affordable.</p>

      <h2>How Much Does It Cost to Upgrade?</h2>
      <p>GFCI outlet replacement typically costs $100–$200 per location. AFCI breaker installation runs $50–$100 per circuit. A full safety assessment can identify exactly which areas of your home need attention.</p>
    `,
  },
  {
    slug: 'electrical-panel-upgrade-cost-massachusetts',
    title: 'How Much Does an Electrical Panel Upgrade Cost in Massachusetts?',
    seoTitle: 'Electrical Panel Upgrade Cost Massachusetts 2026 | Reece Group LLC',
    seoDescription: 'Transparent pricing guide for electrical panel upgrades in Massachusetts. Learn what affects cost and what to expect. Free estimates from Reece Group LLC.',
    category: 'Panel Upgrades',
    date: 'March 4, 2026',
    dateISO: '2026-03-04',
    readTime: '5 min read',
    excerpt: 'Panel upgrade costs in Massachusetts vary based on amperage, location, and permit requirements. Here\'s a transparent breakdown of what to expect — with no surprises.',
    content: `
      <h2>Average Panel Upgrade Costs in Massachusetts</h2>
      <p>Based on jobs we've completed across Worcester County and greater Massachusetts:</p>
      <ul>
        <li><strong>100-amp to 200-amp upgrade:</strong> $1,500 – $2,500</li>
        <li><strong>200-amp to 400-amp upgrade:</strong> $2,500 – $4,500</li>
        <li><strong>Panel replacement (same amperage):</strong> $1,200 – $2,000</li>
        <li><strong>Service entrance replacement:</strong> Add $500 – $1,500</li>
      </ul>
      <p>These are installed costs including labor, materials, permit, and inspection. They do not include utility company fees if the meter needs to be pulled.</p>

      <h2>What Affects the Cost?</h2>
      <ul>
        <li><strong>Current panel location</strong> — Panels in finished basements or tight spaces take longer to work in.</li>
        <li><strong>Permit fees</strong> — Vary by municipality. Some towns charge $50; others charge $300+.</li>
        <li><strong>Utility involvement</strong> — If the utility needs to pull the meter, there may be a scheduling delay and additional fee.</li>
        <li><strong>Subpanel additions</strong> — Adding a subpanel for a detached garage or workshop adds cost.</li>
        <li><strong>Knob-and-tube or aluminum wiring</strong> — If we find unsafe wiring during the job, we'll discuss options with you before proceeding.</li>
      </ul>

      <h2>Why Get Multiple Quotes?</h2>
      <p>We encourage you to get multiple quotes. What we ask is that you compare apples to apples — make sure every quote includes permits, all labor, and a warranty on workmanship. Quotes that seem very low often exclude permits or use unlicensed subcontractors.</p>

      <h2>Free On-Site Estimate</h2>
      <p>Reece Group LLC provides free on-site estimates for all panel work. We'll walk you through exactly what needs to be done and why before any work begins.</p>
    `,
  },
  {
    slug: 'home-electrical-inspection-massachusetts',
    title: 'What to Expect During a Home Electrical Safety Inspection',
    seoTitle: 'Home Electrical Inspection Massachusetts | Reece Group LLC',
    seoDescription: 'Learn what happens during a home electrical safety inspection in Massachusetts, what electricians look for, and when you need one.',
    category: 'Safety',
    date: 'March 4, 2026',
    dateISO: '2026-03-04',
    readTime: '4 min read',
    excerpt: 'Whether you\'re buying a home, renovating, or just want peace of mind — here\'s exactly what a licensed electrician checks during a safety inspection.',
    content: `
      <h2>When Do You Need an Electrical Inspection?</h2>
      <ul>
        <li>Buying or selling a home</li>
        <li>Home is more than 25 years old and hasn't been inspected recently</li>
        <li>After storm damage or flooding</li>
        <li>Before a major renovation</li>
        <li>You notice flickering lights, tripping breakers, or burning smells</li>
        <li>Your insurance company requires it</li>
      </ul>

      <h2>What Does an Electrician Check?</h2>
      <p>A thorough electrical inspection covers:</p>
      <ul>
        <li><strong>Electrical panel</strong> — Brand, age, amperage, signs of overheating, proper labeling</li>
        <li><strong>Wiring type and condition</strong> — Aluminum wiring, knob-and-tube, and cloth-insulated wiring are all safety concerns</li>
        <li><strong>Grounding and bonding</strong> — Proper grounding protects against surges and shock</li>
        <li><strong>GFCI and AFCI protection</strong> — Required in specific locations by Massachusetts code</li>
        <li><strong>Outlets and switches</strong> — Checked for damage, proper wiring, and code compliance</li>
        <li><strong>Smoke and CO detector placement</strong> — We note code requirements even though this is typically a separate inspection</li>
      </ul>

      <h2>How Long Does It Take?</h2>
      <p>A typical single-family home inspection takes 1–2 hours. Larger homes or homes with more complex systems take longer. You'll receive a written report of findings with recommended actions prioritized by safety urgency.</p>

      <h2>How Much Does It Cost?</h2>
      <p>Electrical safety inspections in Massachusetts typically cost $150–$300 for a single-family home. If repairs are needed and you hire us to do the work, we apply the inspection fee toward the job cost.</p>
    `,
  },
]
```

**Step 2: Verify the file compiles (no TypeScript errors)**

Run: `npm run build` — expect zero TS errors.

**Step 3: Commit**

```bash
git add src/data/posts.ts
git commit -m "feat: add blog post data with 5 MA-focused SEO articles"
```

---

### Task 2: Blog index page

**Files:**
- Create: `src/pages/Blog.tsx`

**Step 1: Create the blog listing page**

```tsx
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SEOHead } from '../components/ui/SEOHead'
import { AnnotationLabel } from '../components/ui/AnnotationLabel'
import { posts } from '../data/posts'

export default function Blog() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <>
      <SEOHead
        title="Electrical Tips & Local Guides | Reece Group LLC"
        description="Electrical tips, safety guides, and local resources for Massachusetts homeowners and businesses from Reece Group LLC — licensed electricians serving all 351 MA towns."
        canonical="/blog"
      />

      {/* Hero */}
      <section style={{ background: 'var(--color-primary)', padding: 'clamp(100px, 12vw, 140px) 24px clamp(64px, 8vw, 80px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <AnnotationLabel text="Resources & Guides" inverted />
          <h1 style={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: '#F5F4F2',
            letterSpacing: '-0.02em',
            margin: '0',
            lineHeight: 1.05,
          }}>
            Electrical Tips &<br />Local Guides
          </h1>
          <p style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '18px',
            fontStyle: 'italic',
            color: 'rgba(245,244,242,0.65)',
            marginTop: '20px',
            maxWidth: '520px',
            lineHeight: 1.7,
          }}>
            Practical advice for Massachusetts homeowners and businesses — from panel upgrades to EV chargers.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <section style={{ background: 'var(--color-bg)', padding: 'clamp(64px, 8vw, 100px) 24px' }}>
        <div
          ref={ref}
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          }}
          className="blog-grid"
        >
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: '100%' }}
            >
              <Link
                to={`/blog/${post.slug}`}
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <div
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderTop: '3px solid var(--color-ink)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'border-top-color 220ms ease, box-shadow 220ms ease',
                    padding: '32px',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderTopColor = 'var(--color-gold)'
                    el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderTopColor = 'var(--color-ink)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  {/* Category + read time */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      fontWeight: 600,
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: 'var(--color-gold)',
                      background: 'var(--color-gold-light)',
                      padding: '4px 10px',
                      borderRadius: '2px',
                    }}>
                      {post.category}
                    </span>
                    <span style={{
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      fontSize: '11px',
                      color: 'var(--color-ink-faint)',
                      letterSpacing: '0.08em',
                    }}>
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontFamily: '"Fraunces", serif',
                    fontWeight: 700,
                    fontSize: '22px',
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.25,
                    margin: '0 0 12px',
                  }}>
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p style={{
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    fontSize: '15px',
                    lineHeight: 1.75,
                    color: 'var(--color-ink-mid)',
                    margin: '0 0 24px',
                    flexGrow: 1,
                  }}>
                    {post.excerpt}
                  </p>

                  {/* Footer row */}
                  <div style={{
                    borderTop: '1px dashed var(--color-border)',
                    paddingTop: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <span style={{
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      fontSize: '11px',
                      color: 'var(--color-ink-faint)',
                      letterSpacing: '0.05em',
                    }}>
                      {post.date}
                    </span>
                    <span style={{
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      fontWeight: 600,
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'var(--color-gold)',
                    }}>
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
```

**Step 2: Commit**

```bash
git add src/pages/Blog.tsx
git commit -m "feat: add blog index page"
```

---

### Task 3: Blog post page

**Files:**
- Create: `src/pages/BlogPost.tsx`

**Step 1: Create the individual post page**

```tsx
import { useParams, Link, Navigate } from 'react-router-dom'
import { SEOHead } from '../components/ui/SEOHead'
import { AnnotationLabel } from '../components/ui/AnnotationLabel'
import { CTABanner } from '../components/sections/CTABanner'
import { posts } from '../data/posts'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = posts.find(p => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.dateISO,
    author: {
      '@type': 'Organization',
      name: 'Reece Group LLC',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Reece Group LLC',
      url: 'https://reecegroupllc.com',
    },
  }

  return (
    <>
      <SEOHead
        title={post.seoTitle}
        description={post.seoDescription}
        canonical={`/blog/${post.slug}`}
        schema={articleSchema}
      />

      {/* Breadcrumb */}
      <div style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: '14px 24px', marginTop: '68px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '12px', color: 'var(--color-ink-faint)' }}>
          <Link to="/" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link to="/blog" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>Blog</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <span>{post.title}</span>
        </div>
      </div>

      {/* Post header */}
      <section style={{ background: 'var(--color-primary)', padding: 'clamp(48px, 7vw, 80px) 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <AnnotationLabel text={post.category} inverted />
          <h1 style={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            fontSize: 'clamp(32px, 5vw, 52px)',
            color: '#F5F4F2',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '0 0 24px',
          }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '12px', color: 'rgba(245,244,242,0.5)', letterSpacing: '0.08em' }}>
              {post.date}
            </span>
            <span style={{ width: '1px', height: '12px', background: 'rgba(245,244,242,0.2)' }} />
            <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '12px', color: 'rgba(245,244,242,0.5)', letterSpacing: '0.08em' }}>
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ background: 'var(--color-bg)', padding: 'clamp(48px, 7vw, 80px) 24px' }}>
        <div
          style={{ maxWidth: '760px', margin: '0 auto' }}
          className="post-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>

      <CTABanner />

      <style>{`
        .post-body h2 {
          font-family: "Fraunces", serif;
          font-weight: 700;
          font-size: clamp(22px, 3vw, 28px);
          color: var(--color-ink);
          letter-spacing: -0.02em;
          margin: 48px 0 16px;
          line-height: 1.2;
        }
        .post-body p {
          font-family: "DM Sans", system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.85;
          color: var(--color-ink-mid);
          margin: 0 0 20px;
        }
        .post-body ul {
          margin: 0 0 20px;
          padding-left: 0;
          list-style: none;
        }
        .post-body ul li {
          font-family: "DM Sans", system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.75;
          color: var(--color-ink-mid);
          padding: 8px 0 8px 24px;
          border-bottom: 1px solid var(--color-border);
          position: relative;
        }
        .post-body ul li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--color-gold);
          font-size: 12px;
          top: 10px;
        }
        .post-body strong {
          font-weight: 600;
          color: var(--color-ink);
        }
      `}</style>
    </>
  )
}
```

**Step 2: Commit**

```bash
git add src/pages/BlogPost.tsx
git commit -m "feat: add blog post page with article schema and prose styles"
```

---

### Task 4: Wire up routes and nav

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/layout/Navbar.tsx`

**Step 1: Add routes to App.tsx**

In `App.tsx`, add lazy imports and routes:

```tsx
// Add these lazy imports alongside the others:
const Blog     = React.lazy(() => import('./pages/Blog'))
const BlogPost = React.lazy(() => import('./pages/BlogPost'))

// Add these routes inside <Routes>:
<Route path="/blog"       element={<Layout><Blog /></Layout>} />
<Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
```

**Step 2: Add Blog to navLinks in Navbar.tsx**

```tsx
// In the navLinks array, add:
{ label: 'Blog', path: '/blog' },
```

Add it after 'Services' and before 'About'.

**Step 3: Verify all 6 routes render**

Run `npm run dev` and navigate to:
- `/blog` — should show card grid
- `/blog/electrical-panel-upgrade-signs` — should show full article
- `/blog/nonexistent` — should redirect to `/blog`

**Step 4: Run build to confirm zero TS errors**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add src/App.tsx src/components/layout/Navbar.tsx
git commit -m "feat: add blog routes and nav link"
```

---

### Task 5: Final check

**Step 1: Verify mobile nav includes Blog link**

Open the mobile menu and confirm "Blog" appears in the nav list.

**Step 2: Verify SEO meta tags**

On `/blog`, view source and confirm `<title>` and `<meta name="description">` are correct.
On `/blog/ev-charger-installation-massachusetts`, confirm Article JSON-LD is present.

**Step 3: Verify cards are equal height**

Confirm the blog card grid uses the same `height: 100%` pattern as ServiceCards.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete blog feature for local SEO"
```
