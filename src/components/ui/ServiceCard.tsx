import { Link } from 'react-router-dom'

interface ServiceCardProps {
  title: string
  description: string
  annotationIndex: string
  annotationText: string
  linkTo: string
}

export function ServiceCard({ title, description, annotationIndex, annotationText, linkTo }: ServiceCardProps) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'box-shadow 220ms ease, transform 220ms ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.14)'
        el.style.transform = 'translateY(-2px)'
        const link = el.querySelector('.card-cta') as HTMLElement
        if (link) link.style.color = 'var(--color-gold-dim)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
        const link = el.querySelector('.card-cta') as HTMLElement
        if (link) link.style.color = 'var(--color-gold)'
      }}
    >
      {/* Navy header block */}
      <div
        style={{
          background: 'var(--color-primary)',
          padding: '28px 28px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        {/* Service category tag */}
        <div
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--color-gold)',
            marginBottom: '12px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {annotationIndex} — {annotationText}
        </div>

        {/* Service title */}
        <h3
          style={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            fontSize: 'clamp(18px, 2vw, 22px)',
            color: '#F8F7F5',
            margin: 0,
            lineHeight: 1.2,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {title}
        </h3>
      </div>

      {/* White body */}
      <div
        style={{
          padding: '24px 28px 28px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          gap: '16px',
        }}
      >
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '16px',
            lineHeight: 1.75,
            color: 'var(--color-ink-mid)',
            margin: 0,
            flexGrow: 1,
          }}
        >
          {description}
        </p>
        <Link
          to={linkTo}
          className="card-cta"
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '11px',
            color: 'var(--color-gold)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'color 180ms ease',
          }}
        >
          Learn More →
        </Link>
      </div>
    </div>
  )
}
