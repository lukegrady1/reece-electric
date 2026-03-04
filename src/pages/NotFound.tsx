import { Link } from 'react-router-dom'
import { PageWrapper } from '../components/layout/PageWrapper'
import { AnnotationLabel } from '../components/ui/AnnotationLabel'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <PageWrapper>
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 24px 80px',
          textAlign: 'center',
        }}
      >
        <AnnotationLabel text="404 — Page Not Found" />
        <h1
          style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 800,
            fontSize: 'clamp(48px, 8vw, 96px)',
            color: 'var(--color-border)',
            letterSpacing: '-0.03em',
            margin: '24px 0 0',
            lineHeight: 1,
          }}
        >
          404
        </h1>
        <p
          style={{
            fontFamily: '"Crimson Pro", Georgia, serif',
            fontStyle: 'italic',
            fontSize: '20px',
            color: 'var(--color-ink-mid)',
            margin: '16px 0 40px',
          }}
        >
          This page doesn't exist. Let's get you back on track.
        </p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="lg">Back to Home</Button>
        </Link>
      </div>
    </PageWrapper>
  )
}
