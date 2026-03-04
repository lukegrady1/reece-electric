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
