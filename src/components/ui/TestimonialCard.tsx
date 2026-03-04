interface TestimonialCardProps {
  quote: string
  name: string
  location: string
}

export function TestimonialCard({ quote, name, location }: TestimonialCardProps) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        transition: 'box-shadow 220ms ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none'
      }}
    >
      {/* Large gold quote mark */}
      <div
        style={{
          fontFamily: '"Fraunces", serif',
          fontWeight: 900,
          fontSize: '64px',
          color: 'var(--color-gold)',
          lineHeight: 0.8,
          marginBottom: '20px',
          opacity: 0.7,
        }}
      >
        "
      </div>

      {/* Quote text */}
      <p
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: '18px',
          lineHeight: 1.75,
          color: 'var(--color-ink)',
          margin: '0 0 28px',
          flexGrow: 1,
        }}
      >
        {quote}
      </p>

      {/* Attribution */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '28px',
            height: '2px',
            background: 'var(--color-gold)',
            flexShrink: 0,
          }}
        />
        <div>
          <div
            style={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 700,
              fontSize: '15px',
              color: 'var(--color-ink)',
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontWeight: 500,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-ink-faint)',
              marginTop: '2px',
            }}
          >
            {location}
          </div>
        </div>
      </div>
    </div>
  )
}
