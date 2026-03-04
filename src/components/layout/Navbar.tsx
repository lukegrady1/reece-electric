import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
// Button import removed — CTA uses inline styles

const navLinks = [
  { label: 'Home',     path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Blog',     path: '/blog' },
  { label: 'About',    path: '/about' },
  { label: 'Contact',  path: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: '#000000',
          borderBottom: '2px solid #222',
          height: '68px',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.4)' : 'none',
          transition: 'box-shadow 250ms ease',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 24px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: 'none' }} aria-label="Reece Group LLC — Home">
            <img
              src={`${import.meta.env.BASE_URL}logo.PNG`}
              alt="Reece Group LLC"
              style={{ height: '44px', width: 'auto', display: 'block' }}
              className="nav-logo"
            />
          </NavLink>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="nav-desktop">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                style={({ isActive }) => ({
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: isActive ? 'var(--color-gold)' : 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  borderBottom: isActive ? '2px solid var(--color-gold)' : '2px solid transparent',
                  paddingBottom: '2px',
                  transition: 'color 150ms ease',
                })}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ffffff' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = el.style.borderBottomColor === 'transparent' ? 'rgba(255,255,255,0.65)' : 'var(--color-gold)' }}
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="tel:+15087938788"
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.6)',
                background: 'transparent',
                padding: '8px 20px',
                borderRadius: '2px',
                textDecoration: 'none',
                transition: 'border-color 180ms ease, color 180ms ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = '#ffffff'
                el.style.color = '#ffffff'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.6)'
              }}
            >
              Call for an Estimate
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            className="nav-hamburger"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'none',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '24px' }}>
              <span style={{ display: 'block', height: '2px', background: '#ffffff', borderRadius: '1px' }} />
              <span style={{ display: 'block', height: '2px', background: '#ffffff', borderRadius: '1px' }} />
              <span style={{ display: 'block', height: '2px', background: '#ffffff', borderRadius: '1px' }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(10,22,40,0.4)',
                zIndex: 150,
              }}
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                background: '#000000',
                borderBottom: '2px solid #222',
                zIndex: 200,
                padding: '24px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <img
                  src={`${import.meta.env.BASE_URL}logo.PNG`}
                  alt="Reece Group LLC"
                  style={{ height: '40px', width: 'auto', display: 'block' }}
                />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '24px', color: '#ffffff', lineHeight: 1 }}
                >
                  ×
                </button>
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', paddingBottom: '32px' }}>
                {navLinks.map(link => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setMenuOpen(false)}
                    style={{ fontFamily: '"Fraunces", serif', fontWeight: 700, fontSize: '32px', color: '#ffffff', textDecoration: 'none' }}
                  >
                    {link.label}
                  </NavLink>
                ))}
                <a
                  href="tel:+15087938788"
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    fontWeight: 600,
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#ffffff',
                    border: '1.5px solid rgba(255,255,255,0.6)',
                    background: 'transparent',
                    padding: '16px 40px',
                    borderRadius: '2px',
                    textDecoration: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  Call for an Estimate
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-logo { height: 32px !important; }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}
