import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface StatCardProps {
  number: number
  suffix?: string
  label: string
  inverted?: boolean
}

export function StatCard({ number, suffix = '', label, inverted }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const start = Date.now()
    const animate = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * number))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, number])

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '2px' }}>
        <span
          style={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 900,
            fontSize: 'clamp(52px, 7vw, 80px)',
            color: 'var(--color-gold)',
            lineHeight: 1,
          }}
        >
          {count}
        </span>
        {suffix && (
          <span
            style={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 700,
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              color: 'var(--color-gold)',
              lineHeight: 1,
            }}
          >
            {suffix}
          </span>
        )}
      </div>
      <div
        style={{
          width: '40px',
          height: '2px',
          background: 'var(--color-gold)',
          margin: '12px auto',
        }}
      />
      <div
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontWeight: 600,
          fontSize: '11px',
          color: inverted ? 'rgba(248,247,245,0.6)' : 'var(--color-ink-mid)',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          marginTop: '4px',
        }}
      >
        {label}
      </div>
    </div>
  )
}
