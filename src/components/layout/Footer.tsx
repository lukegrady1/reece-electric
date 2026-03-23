import { Link } from 'react-router-dom'
import { RuledDivider } from '../ui/RuledDivider'

export function Footer() {
  return (
    <footer style={{ background: 'var(--color-primary)' }}>
      {/* Ornamental divider at top of footer */}
      <div style={{ padding: '32px 24px 0' }}>
        <RuledDivider />
      </div>

      {/* Main grid */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '40px 24px 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '64px',
        }}
        className="footer-grid"
      >
        {/* Col 1: Logo + tagline */}
        <div>
          <img src={`${import.meta.env.BASE_URL}logo.PNG`} alt="Reece Group LLC" style={{ height: '36px', width: 'auto', display: 'block', marginBottom: '16px' }} />
          <p style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontStyle: 'italic', fontWeight: 300, fontSize: '15px', color: 'rgba(248,247,245,0.75)', lineHeight: 1.7, margin: 0 }}>
            Precision electrical work for homes and businesses. Built to code, done right the first time.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <div style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-gold)', marginBottom: '20px' }}>
            Quick Links
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Home', path: '/' },
              { label: 'Services', path: '/services' },
              { label: 'About', path: '/about' },
              { label: 'Contact', path: '/contact' },
            ].map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '16px', color: 'rgba(248,247,245,0.85)', textDecoration: 'none' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Col 3: Contact */}
        <div>
          <div style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-gold)', marginBottom: '20px' }}>
            Contact Us
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* TODO: Replace with real contact details */}
            <a href="tel:+15087938788" style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '16px', color: 'rgba(248,247,245,0.85)', textDecoration: 'none' }}>
              (508) 793-8788
            </a>
            <a href="mailto:reecegroupllc@gmail.com" style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '16px', color: 'rgba(248,247,245,0.85)', textDecoration: 'none' }}>
              reecegroupllc@gmail.com
            </a>
            <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '16px', color: 'rgba(248,247,245,0.7)' }}>
              Worcester, MA · Central Massachusetts
            </span>
            <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '16px', color: 'rgba(248,247,245,0.7)' }}>
              Mon–Fri: 7am – 6pm
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.15)',
          background: 'var(--color-primary-dark)',
          padding: '16px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400, fontSize: '11px', color: 'rgba(248,247,245,0.55)' }}>
            © 2025 Reece Group LLC. All rights reserved.
          </span>
          <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400, fontSize: '11px', color: 'rgba(248,247,245,0.55)' }}>
            Licensed Electrician · Massachusetts Lic #9036A1 {/* TODO: Replace with real license # */}
          </span>
          <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400, fontSize: '11px', color: 'rgba(248,247,245,0.45)' }}>
            Designed & built by{' '}
            <a href="https://gradydigital.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(248,247,245,0.55)', textDecoration: 'none' }}>
              Grady Digital
            </a>
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </footer>
  )
}
