import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { SEOHead } from '../components/ui/SEOHead'
import { AnnotationLabel } from '../components/ui/AnnotationLabel'
import { RuledDivider } from '../components/ui/RuledDivider'
import { CTABanner } from '../components/sections/CTABanner'
import { breadcrumbSchema } from '../lib/structuredData'

const values = [
  {
    number: '01',
    title: 'Safety First',
    body: 'No shortcuts, no code violations. Every job is performed to the letter of the National Electrical Code.',
  },
  {
    number: '02',
    title: 'Transparent Pricing',
    body: 'Estimate before work begins. No surprise line items. No hidden fees. The number we quote is the number you pay.',
  },
  {
    number: '03',
    title: 'Clean & Respectful',
    body: 'We treat your home or business with care. Job sites are cleaned up completely before we leave.',
  },
]

const credentials = [
  'Licensed Electrical Contractor — Massachusetts Lic #9036A1', // TODO: Replace with real license #
  'OSHA 10 Certified',
  'General Liability Insurance',
  'Workers Compensation Insured',
  'Serving All 351 MA Cities & Towns',
  'Based in Worcester, MA — Central Massachusetts',
]

export default function About() {
  const valuesRef = useRef<HTMLDivElement>(null)
  const credsRef = useRef<HTMLDivElement>(null)
  const valuesInView = useInView(valuesRef, { once: true, margin: '-60px' })
  const credsInView = useInView(credsRef, { once: true, margin: '-60px' })

  return (
    <PageWrapper>
      <SEOHead
        title="About Reece Group LLC | Licensed Electrician — Worcester, MA"
        description="Meet Anthony Reece, founder of Reece Group LLC — a licensed electrician committed to quality, safety, and transparent pricing across Massachusetts."
        canonical="/about"
        schema={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ])}
      />

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '88px 24px 0' }}>
        <nav aria-label="Breadcrumb">
          <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '12px', color: 'var(--color-ink-faint)' }}>
            <Link to="/" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Home</Link>
            {' / '}
            About
          </span>
        </nav>
      </div>

      {/* Page Hero */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '40px 24px clamp(48px, 6vw, 80px)',
          minHeight: '40vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.02em',
            margin: '0 0 16px',
            lineHeight: 1.1,
          }}
        >
          About Reece Group LLC
        </h1>
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '18px',
            color: 'var(--color-ink-mid)',
          }}
        >
          Built on craftsmanship. Rooted in Massachusetts.
        </p>
      </div>

      <RuledDivider />

      {/* Origin Story */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(64px, 8vw, 112px) 24px',
          display: 'grid',
          gridTemplateColumns: '60fr 40fr',
          gap: '80px',
          alignItems: 'start',
        }}
        className="about-grid"
      >
        {/* Left: Story */}
        <div>
          <p style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '17px', lineHeight: 1.85, color: 'var(--color-ink-mid)', marginBottom: '24px' }}>
            Reece Group LLC was founded by Anthony Reece with one guiding principle: that electrical work should be done right, explained clearly, and priced honestly. Based in Worcester, MA, Anthony launched the company to build something he was proud of — a business that treats every customer like a neighbor and every job like it matters.
          </p>
          <p style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '17px', lineHeight: 1.85, color: 'var(--color-ink-mid)', marginBottom: '24px' }}>
            Today, Reece Group LLC serves homeowners and businesses across all 351 cities and towns in Massachusetts. Whether it's a single outlet, a panel upgrade, or a full commercial build-out — every project receives the same level of care, code compliance, and professionalism.
          </p>
          <p style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '17px', lineHeight: 1.85, color: 'var(--color-ink-mid)' }}>
            The mission is simple: top-tier electrical services delivered with reliability, craftsmanship, and transparency. No shortcuts. No surprise fees. Just quality work done right.
          </p>
        </div>

        {/* Right: Pull-quote card */}
        <div
          style={{
            background: 'var(--color-primary)',
            padding: '48px 40px',
          }}
        >
          <div
            style={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 900,
              fontSize: '80px',
              color: 'var(--color-gold)',
              lineHeight: 0.8,
              marginBottom: '16px',
            }}
          >
            "
          </div>
          <p
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '20px',
              color: 'rgba(248,247,245,0.95)',
              lineHeight: 1.6,
              margin: '0 0 24px',
            }}
          >
            Quality work. Honest pricing. Every time.
          </p>
          <div
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '11px',
              color: 'rgba(248,247,245,0.55)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            — Anthony Reece, Founder
          </div>
        </div>
      </section>

      <RuledDivider />

      {/* Values */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(64px, 8vw, 112px) 24px',
        }}
      >
        <AnnotationLabel text="How We Work" />
        <h2
          style={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            fontSize: 'clamp(32px, 4vw, 48px)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.02em',
            margin: '20px 0 48px',
          }}
        >
          How We Work
        </h2>

        <div
          ref={valuesRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
          }}
          className="values-grid"
        >
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={valuesInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: '13px',
                  color: 'var(--color-gold)',
                  letterSpacing: '0.15em',
                  marginBottom: '12px',
                }}
              >
                {v.number}
              </div>
              <RuledDivider />
              <h4
                style={{
                  fontFamily: '"Fraunces", serif',
                  fontWeight: 700,
                  fontSize: '22px',
                  color: 'var(--color-ink)',
                  margin: '16px 0 12px',
                  letterSpacing: '-0.01em',
                }}
              >
                {v.title}
              </h4>
              <p
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: '16px',
                  lineHeight: 1.75,
                  color: 'var(--color-ink-mid)',
                  margin: 0,
                }}
              >
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <RuledDivider />

      {/* Credentials */}
      <section
        ref={credsRef}
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(64px, 8vw, 112px) 24px',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={credsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderTop: '3px solid var(--color-primary)',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-gold)',
              marginBottom: '24px',
            }}
          >
            Credentials &amp; Certifications
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0',
            }}
            className="creds-grid"
          >
            {/* TODO: Replace with real credentials */}
            {credentials.map((cred, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 0',
                  borderBottom: '1px solid var(--color-border)',
                  borderRight: i % 2 === 0 ? '1px solid var(--color-border)' : 'none',
                  paddingRight: i % 2 === 0 ? '32px' : '0',
                  paddingLeft: i % 2 !== 0 ? '32px' : '0',
                }}
              >
                <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '13px', color: 'var(--color-gold)', flexShrink: 0, fontWeight: 600 }}>✓</span>
                <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '16px', color: 'var(--color-ink)' }}>{cred}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <RuledDivider />

      {/* Service Area */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(64px, 8vw, 112px) 24px',
        }}
      >
        <h2
          style={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            fontSize: 'clamp(32px, 4vw, 52px)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}
        >
          Serving All of Massachusetts
        </h2>
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '17px',
            lineHeight: 1.75,
            color: 'var(--color-ink-mid)',
            marginBottom: '40px',
            maxWidth: '640px',
          }}
        >
          Based in Worcester, MA, we proudly serve all 351 cities and towns across the Commonwealth — with a focus on Central Massachusetts including Shrewsbury, Northborough, Westborough, Holden, Spencer, Leicester, Auburn, and beyond. No matter where you are in Massachusetts, we're ready to help.
        </p>

        {/* Google Maps placeholder */}
        {/* TODO: Replace with Google Maps iframe */}
        <div
          style={{
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '11px',
              color: 'var(--color-ink-faint)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            [ GOOGLE MAPS EMBED ]
          </span>
        </div>
      </section>

      <RuledDivider />
      <CTABanner />

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .creds-grid { grid-template-columns: 1fr !important; }
          .creds-grid > div { border-right: none !important; padding-left: 0 !important; padding-right: 0 !important; }
        }
      `}</style>
    </PageWrapper>
  )
}
