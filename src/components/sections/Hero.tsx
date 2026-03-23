import { useState } from 'react'
// Link import removed — uses <a> tags instead
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { AnnotationLabel } from '../ui/AnnotationLabel'

interface LeadFormData {
  name: string
  phone: string
  service: string
}

const services = [
  'Residential Electrical',
  'Commercial Electrical',
  'Panel Upgrades & Replacements',
  'EV Charger Installation',
  'Lighting Installation',
  'Safety Inspections & Code Compliance',
]

function LeadForm() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>()

  const onSubmit = (data: LeadFormData) => {
    console.log(data)
    // TODO: Connect to Formspree, Netlify Forms, or custom API
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#F8F7F5',
    border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: '2px',
    padding: '13px 16px',
    fontFamily: '"DM Sans", system-ui, sans-serif',
    fontSize: '15px',
    color: 'var(--color-ink)',
    boxSizing: 'border-box',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: '"DM Sans", system-ui, sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
    color: 'rgba(248,247,245,0.6)',
    marginBottom: '6px',
  }

  const errorStyle: React.CSSProperties = {
    fontFamily: '"DM Sans", system-ui, sans-serif',
    fontSize: '11px',
    color: '#F4A0A0',
    marginTop: '4px',
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ fontFamily: '"Fraunces", serif', fontWeight: 700, fontSize: '24px', color: 'var(--color-gold)', marginBottom: '12px' }}>
          Request Received!
        </div>
        <p style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '15px', color: 'rgba(248,247,245,0.75)', lineHeight: 1.6 }}>
          We'll call you back within 1 business day to discuss your project.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Name */}
      <div>
        <label style={labelStyle}>Your Name</label>
        <input
          type="text"
          placeholder="John Smith"
          style={{ ...inputStyle, borderColor: errors.name ? '#F4A0A0' : 'rgba(0,0,0,0.12)' }}
          {...register('name', { required: 'Required' })}
        />
        {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label style={labelStyle}>Phone Number</label>
        <input
          type="tel"
          placeholder="(508) 000-0000"
          style={{ ...inputStyle, borderColor: errors.phone ? '#F4A0A0' : 'rgba(0,0,0,0.12)' }}
          {...register('phone', { required: 'Required' })}
        />
        {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
      </div>

      {/* Service */}
      <div>
        <label style={labelStyle}>Service Needed</label>
        <select
          style={{ ...inputStyle, cursor: 'pointer', borderColor: errors.service ? '#F4A0A0' : 'rgba(0,0,0,0.12)' }}
          {...register('service', { required: 'Required' })}
        >
          <option value="">Select a service...</option>
          {services.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.service && <p style={errorStyle}>{errors.service.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        style={{
          width: '100%',
          background: 'var(--color-gold)',
          color: 'var(--color-ink)',
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '16px',
          border: 'none',
          borderRadius: '2px',
          cursor: 'pointer',
          marginTop: '4px',
        }}
      >
        Get My Free Estimate →
      </button>

      <p style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '11px', color: 'rgba(248,247,245,0.4)', textAlign: 'center', margin: 0 }}>
        No obligation. We respond within 1 hour.
      </p>
    </form>
  )
}

export function Hero() {
  return (
    <section
      style={{
        background: 'var(--color-primary)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(100px, 12vw, 140px) 24px clamp(64px, 8vw, 100px)',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left: text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnnotationLabel text="Licensed Electrician · Worcester, MA" inverted />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: '"Raleway", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(48px, 7vw, 88px)',
              color: '#F8F7F5',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              margin: '20px 0 0',
            }}
          >
            Reece Group LLC
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: '"Raleway", sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(16px, 2.2vw, 22px)',
              color: 'rgba(248,247,245,0.65)',
              letterSpacing: '-0.01em',
              margin: '12px 0 0',
              lineHeight: 1.3,
            }}
          >
            Electrical Contracting
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            style={{
              width: '64px',
              height: '3px',
              background: 'var(--color-gold)',
              margin: '36px 0',
              transformOrigin: 'left',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              fontStyle: 'italic',
              color: 'rgba(248,247,245,0.72)',
              lineHeight: 1.7,
              marginBottom: '40px',
              fontWeight: 300,
            }}
          >
            Expert electrical services for homes and businesses across Massachusetts.
            Built to code. Done right the first time.
          </motion.p>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hero-trust-stats"
            style={{
              paddingTop: '32px',
              borderTop: '1px solid rgba(248,247,245,0.15)',
              display: 'flex',
              gap: 'clamp(24px, 4vw, 48px)',
              flexWrap: 'wrap',
            }}
          >
            {[
              { number: '351', label: 'MA Cities Served' },
              { number: '500+', label: 'Happy Customers' },
              { number: '1hr', label: 'Response Time' },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: '"Fraunces", serif',
                  fontWeight: 700,
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  color: 'var(--color-gold)',
                  lineHeight: 1,
                  marginBottom: '4px',
                  letterSpacing: '-0.02em',
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: 'rgba(248,247,245,0.5)',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: lead capture form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Form card */}
          <div
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(248,247,245,0.12)',
              borderTop: '3px solid var(--color-gold)',
              padding: 'clamp(28px, 4vw, 40px)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Card header */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--color-gold)',
                marginBottom: '8px',
              }}>
                Free Estimate
              </div>
              <div style={{
                fontFamily: '"Fraunces", serif',
                fontWeight: 700,
                fontSize: '22px',
                color: '#F8F7F5',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}>
                Get a quote in 1 hour
              </div>
            </div>

            <LeadForm />
          </div>

          {/* Below card: or call directly */}
          <div style={{
            marginTop: '16px',
            textAlign: 'center',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '13px',
            color: 'rgba(248,247,245,0.5)',
          }}>
            Or call us directly:{' '}
            <a
              href="tel:+15087938788"
              style={{ color: 'var(--color-gold)', textDecoration: 'none', fontWeight: 600 }}
            >
              (508) 793-8788
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-trust-stats { display: none !important; }
        }
      `}</style>
    </section>
  )
}
