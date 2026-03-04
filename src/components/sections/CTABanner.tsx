import { Link } from 'react-router-dom'

export function CTABanner() {
  return (
    <section
      style={{
        background: 'var(--color-primary)',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Gold rule above */}
        <div
          style={{
            width: '40px',
            height: '2px',
            background: 'var(--color-gold)',
            margin: '0 auto 28px',
          }}
        />

        <h2
          style={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 900,
            fontSize: 'clamp(40px, 7vw, 72px)',
            color: '#F8F7F5',
            letterSpacing: '-0.02em',
            marginBottom: '20px',
            lineHeight: 1.05,
          }}
        >
          Ready to Get Started?
        </h2>
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '20px',
            color: 'rgba(248,247,245,0.72)',
            marginBottom: '44px',
          }}
        >
          Contact us today for a free, no-obligation estimate.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/contact"
            style={{
              background: '#F8F7F5',
              color: 'var(--color-primary)',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '17px 44px',
              borderRadius: '2px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Schedule an Estimate
          </Link>
          <a
            href="tel:+15087938788"
            style={{
              background: 'transparent',
              color: '#F8F7F5',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '17px 44px',
              borderRadius: '2px',
              textDecoration: 'none',
              border: '1.5px solid rgba(248,247,245,0.35)',
              display: 'inline-block',
            }}
          >
            {/* TODO: Replace with real phone */}
            Call (508) 793-8788
          </a>
        </div>
      </div>
    </section>
  )
}
