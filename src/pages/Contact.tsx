import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { SEOHead } from '../components/ui/SEOHead'
import { AnnotationLabel } from '../components/ui/AnnotationLabel'
import { RuledDivider } from '../components/ui/RuledDivider'
import { Button } from '../components/ui/Button'
import { breadcrumbSchema } from '../lib/structuredData'

interface FormData {
  fullName: string
  phone: string
  email: string
  service: string
  details: string
}

const services = [
  'Residential Electrical',
  'Commercial Electrical',
  'Panel Upgrades & Replacements',
  'EV Charger Installation',
  'Lighting Installation',
  'Safety Inspections & Code Compliance',
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: '2px',
  padding: '12px 16px',
  fontFamily: '"DM Sans", system-ui, sans-serif',
  fontSize: '16px',
  color: 'var(--color-ink)',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border-color 150ms ease, box-shadow 150ms ease',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: '"DM Sans", system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  color: 'var(--color-ink-mid)',
  marginBottom: '6px',
}

const errorStyle: React.CSSProperties = {
  fontFamily: '"DM Sans", system-ui, sans-serif',
  fontSize: '11px',
  color: 'var(--color-danger)',
  marginTop: '4px',
}

const contactRows = [
  { icon: Phone, label: 'Phone', value: '(508) 793-8788', href: 'tel:+15087938788' },
  { icon: Mail, label: 'Email', value: 'reecegroupllc@gmail.com', href: 'mailto:reecegroupllc@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Worcester, MA · Central Massachusetts', href: undefined },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri: 7am – 6pm', href: undefined },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
    // TODO: Connect to Formspree, Netlify Forms, or custom API
    setSubmitted(true)
  }

  const fieldStyle = (hasError: boolean): React.CSSProperties => ({
    ...inputStyle,
    borderColor: hasError ? 'var(--color-danger)' : 'var(--color-border)',
  })

  return (
    <PageWrapper>
      <SEOHead
        title="Contact Reece Group LLC | Free Electrical Estimate"
        description="Get a free estimate from Reece Group LLC. Call, email, or fill out our contact form. Serving Worcester, Central Massachusetts, and all 351 MA cities and towns."
        canonical="/contact"
        schema={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ])}
      />

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '88px 24px 0' }}>
        <nav aria-label="Breadcrumb">
          <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '12px', color: 'var(--color-ink-faint)' }}>
            <Link to="/" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Home</Link>
            {' / '}
            Contact
          </span>
        </nav>
      </div>

      {/* Page Hero */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '40px 24px clamp(40px, 5vw, 64px)',
          minHeight: '30vh',
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
          Get in Touch
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
          Free estimates. Prompt responses. No pressure.
        </p>
      </div>

      <RuledDivider />

      {/* Main content */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(48px, 6vw, 96px) 24px',
          display: 'grid',
          gridTemplateColumns: '40fr 60fr',
          gap: '80px',
          alignItems: 'start',
        }}
        className="contact-grid"
      >
        {/* Left: Contact info */}
        <div>
          <AnnotationLabel text="Reach Us" />
          <h2
            style={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 700,
              fontSize: 'clamp(24px, 3vw, 36px)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
              margin: '16px 0 32px',
            }}
          >
            Reach Us Directly
          </h2>

          <div style={{ marginBottom: '32px' }}>
            {contactRows.map(({ icon: Icon, label, value, href }, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '20px 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <Icon size={16} color="var(--color-primary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-ink-faint)', marginBottom: '4px' }}>
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '16px', color: 'var(--color-ink)', textDecoration: 'none' }}
                    >
                      {/* TODO: Replace with real contact details */}
                      {value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '16px', color: 'var(--color-ink)' }}>
                      {/* TODO: Replace with real contact details */}
                      {value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Emergency card */}
          <div style={{ background: 'var(--color-primary)', padding: '32px' }}>
            <div style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(248,247,245,0.65)', marginBottom: '12px' }}>
              Emergency Service
            </div>
            <p style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontStyle: 'italic', fontWeight: 300, fontSize: '15px', color: 'rgba(248,247,245,0.9)', marginBottom: '16px', lineHeight: 1.6 }}>
              Electrical emergency? We respond fast — day or night.
            </p>
            <a href="tel:+15087938788" style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '16px', color: 'var(--color-gold)', textDecoration: 'none', fontWeight: 600 }}>
              (508) 793-8788
            </a>
          </div>
        </div>

        {/* Right: Contact form */}
        <div>
          {submitted ? (
            <div
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderTop: '3px solid var(--color-primary)',
                padding: '48px 40px',
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontFamily: '"Fraunces", serif', fontWeight: 700, fontSize: '28px', color: 'var(--color-ink)', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                Request Received
              </h3>
              <p style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '17px', color: 'var(--color-ink-mid)', lineHeight: 1.75 }}>
                Thank you for reaching out. We'll be in touch within one business day to discuss your project.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" style={labelStyle}>Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Your full name"
                  className="contact-input"
                  style={fieldStyle(!!errors.fullName)}
                  {...register('fullName', { required: 'Full name is required' })}
                />
                {errors.fullName && <p style={errorStyle}>{errors.fullName.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" style={labelStyle}>Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(508) 793-8788"
                  className="contact-input"
                  style={fieldStyle(!!errors.phone)}
                  {...register('phone', { required: 'Phone number is required' })}
                />
                {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" style={labelStyle}>Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="contact-input"
                  style={fieldStyle(!!errors.email)}
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
                  })}
                />
                {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
              </div>

              {/* Service Needed */}
              <div>
                <label htmlFor="service" style={labelStyle}>Service Needed</label>
                <select
                  id="service"
                  className="contact-input"
                  style={{ ...fieldStyle(!!errors.service), cursor: 'pointer' }}
                  {...register('service', { required: 'Please select a service' })}
                >
                  <option value="">Select a service...</option>
                  {services.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.service && <p style={errorStyle}>{errors.service.message}</p>}
              </div>

              {/* Project Details */}
              <div>
                <label htmlFor="details" style={labelStyle}>Project Details <span style={{ color: 'var(--color-ink-faint)', fontWeight: 400 }}>(Optional)</span></label>
                <textarea
                  id="details"
                  rows={5}
                  placeholder="Describe your project or any questions you have..."
                  className="contact-input"
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  {...register('details')}
                />
              </div>

              <Button variant="primary" size="lg" type="submit" fullWidth>
                Send My Request →
              </Button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .contact-input:focus {
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 3px var(--color-primary-tint) !important;
          outline: none !important;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </PageWrapper>
  )
}
