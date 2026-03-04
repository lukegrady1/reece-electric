import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { AnnotationLabel } from '../ui/AnnotationLabel'
import { ServiceCard } from '../ui/ServiceCard'
import { Button } from '../ui/Button'
import { services } from '../../data/services'

export function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{ background: 'var(--color-surface)', padding: 'clamp(64px, 8vw, 100px) 24px', borderTop: '1px solid var(--color-border-dark)', borderBottom: '1px solid var(--color-border-dark)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'flex-end',
            gap: '24px',
            marginBottom: '48px',
          }}
          className="services-header"
        >
          <div>
            <AnnotationLabel index="02" text="What We Do" />
            <h2
              style={{
                fontFamily: '"Fraunces", serif',
                fontWeight: 700,
                fontSize: 'clamp(36px, 5vw, 56px)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.02em',
                margin: '0',
                lineHeight: 1.1,
              }}
            >
              Complete Electrical<br />Solutions
            </h2>
          </div>
          <div style={{ paddingBottom: '4px' }}>
            <p
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: '17px',
                color: 'var(--color-ink-mid)',
                maxWidth: '320px',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              From routine repairs to full commercial builds — licensed, insured, and done right.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {services.slice(0, 6).map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{ height: '100%' }}
            >
              <ServiceCard
                title={service.title}
                description={service.shortDescription}
                annotationIndex={service.number}
                annotationText={service.title.split(' ')[0].toUpperCase()}
                linkTo="/services"
              />
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/services" style={{ textDecoration: 'none' }}>
            <Button variant="secondary">View All Services →</Button>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-header { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
