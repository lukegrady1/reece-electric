import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnnotationLabel } from '../ui/AnnotationLabel'
import { TestimonialCard } from '../ui/TestimonialCard'
import { testimonials } from '../../data/testimonials'

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{ background: 'var(--color-surface)', padding: 'clamp(64px, 8vw, 100px) 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <AnnotationLabel index="05" text="Client Reviews" />
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
            Trusted by Massachusetts Homeowners
          </h2>
        </div>

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <TestimonialCard quote={t.quote} name={t.name} location={t.location} />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .testimonials-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 640px) and (max-width: 1024px) { .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  )
}
