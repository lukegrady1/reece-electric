import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { SEOHead } from '../components/ui/SEOHead'
import { AnnotationLabel } from '../components/ui/AnnotationLabel'
import { RuledDivider } from '../components/ui/RuledDivider'
import { Accordion } from '../components/ui/Accordion'
import { CTABanner } from '../components/sections/CTABanner'
import { Button } from '../components/ui/Button'
import { services } from '../data/services'
import { faqs } from '../data/faqs'
import { faqSchema, breadcrumbSchema } from '../lib/structuredData'

interface ServiceSectionProps {
  service: typeof services[0]
  index: number
}

function ServiceSection({ service, index }: ServiceSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isReversed = index % 2 !== 0

  return (
    <div ref={ref}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(48px, 6vw, 96px) 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
          direction: isReversed ? 'rtl' : 'ltr',
        }}
        className="service-section-grid"
      >
        {/* Image placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          style={{ direction: 'ltr' }}
        >
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderTop: '4px solid var(--color-primary)',
              aspectRatio: '4/3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* TODO: Replace with real project photo <img> */}
            <span
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: '11px',
                color: 'var(--color-ink-faint)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}
            >
              [ PHOTO — {service.title.toUpperCase()} ]
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ direction: 'ltr' }}
        >
          <AnnotationLabel index={service.number} text={service.title.split(' ')[0].toUpperCase()} />
          <h3
            style={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 42px)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
              margin: '20px 0 16px',
              lineHeight: 1.15,
            }}
          >
            {service.title}
          </h3>
          <p
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '17px',
              lineHeight: 1.85,
              color: 'var(--color-ink-mid)',
              marginBottom: '24px',
            }}
          >
            {service.shortDescription}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {service.features.map((feature, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '13px', color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px', fontWeight: 600 }}>▸</span>
                <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '16px', color: 'var(--color-ink)' }}>{feature}</span>
              </li>
            ))}
          </ul>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <Button variant="primary">Request This Service →</Button>
          </Link>
        </motion.div>
      </div>
      <RuledDivider />
    </div>
  )
}

export default function Services() {
  const schema = {
    ...faqSchema(faqs),
    ...breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
    ]),
  }

  return (
    <PageWrapper>
      <SEOHead
        title="Electrical Services | Reece Group LLC — Paxton, MA"
        description="From panel upgrades to EV charger installation, Reece Group LLC offers comprehensive electrical services. Licensed & insured. Serving all of Massachusetts."
        canonical="/services"
        schema={schema}
      />

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '88px 24px 0' }}>
        <nav aria-label="Breadcrumb">
          <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '12px', color: 'var(--color-ink-faint)' }}>
            <Link to="/" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Home</Link>
            {' / '}
            Services
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
        <AnnotationLabel text="Our Services" />
        <h1
          style={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.02em',
            margin: '20px 0 16px',
            lineHeight: 1.1,
          }}
        >
          Our Electrical Services
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
          Licensed, insured, and built to code — every time.
        </p>
      </div>

      <RuledDivider />

      {/* Services detail sections */}
      {services.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}

      {/* FAQ */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(64px, 8vw, 112px) 24px',
        }}
      >
        <AnnotationLabel text="FAQ" />
        <h2
          style={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            fontSize: 'clamp(32px, 4vw, 52px)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.02em',
            margin: '20px 0 40px',
          }}
        >
          Frequently Asked Questions
        </h2>
        <Accordion items={faqs} />
      </section>

      <RuledDivider />
      <CTABanner />

      <style>{`
        @media (max-width: 768px) {
          .service-section-grid {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
          }
        }
      `}</style>
    </PageWrapper>
  )
}
