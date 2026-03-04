import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { AnnotationLabel } from '../ui/AnnotationLabel'

const differentiators = [
  { number: '01', title: 'Master Electrician', desc: 'Licensed master electrician leads every job personally. No subcontracting.' },
  { number: '02', title: 'Transparent Pricing', desc: 'Upfront estimates before work begins. No surprise fees. Ever.' },
  { number: '03', title: 'Built to Code', desc: 'Every installation guaranteed to NEC standards. Clean job sites. Your property respected.' },
]

const checklist = [
  'Same-day and emergency service available',
  'Responsive communication start to finish',
  'Fully licensed & insured — [State] Lic #9036A1',
]

export function WhyUs() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{ background: 'var(--color-bg)', padding: 'clamp(80px, 10vw, 120px) 24px', borderBottom: '1px solid var(--color-border)' }}>
      <div ref={ref} style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '72px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'end' }} className="why-us-header">
          <div>
            <AnnotationLabel index="03" text="Why Reece Group" />
            <h2 style={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
              margin: '0',
              lineHeight: 1.1,
            }}>
              Precision work.<br />Honest pricing.<br />Every time.
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '16px', lineHeight: 1.8, color: 'var(--color-ink-mid)', marginBottom: '24px' }}>
              We believe great electrical work starts with trust. Every estimate is upfront, every job is done to code, and every customer gets treated like a long-term relationship.
            </p>
            {checklist.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-gold)', flexShrink: 0 }} />
                <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '15px', color: 'var(--color-ink-mid)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--color-border)', border: '1px solid var(--color-border)' }} className="why-us-cols">
          {differentiators.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: 'var(--color-surface)', padding: '40px 36px' }}
            >
              <div style={{ fontFamily: '"Fraunces", serif', fontWeight: 300, fontSize: '48px', color: 'var(--color-gold)', lineHeight: 1, marginBottom: '20px', letterSpacing: '-0.02em' }}>
                {item.number}
              </div>
              <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', marginBottom: '20px' }} />
              <h3 style={{ fontFamily: '"Fraunces", serif', fontWeight: 600, fontSize: '20px', color: 'var(--color-ink)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '15px', lineHeight: 1.7, color: 'var(--color-ink-mid)', margin: 0 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
          <Link to="/contact" style={{
            display: 'inline-block',
            background: 'var(--color-primary)',
            color: '#F8F7F5',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '17px 52px',
            borderRadius: '2px',
            textDecoration: 'none',
          }}>
            Get Your Free Estimate
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .why-us-header { grid-template-columns: 1fr !important; }
          .why-us-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
