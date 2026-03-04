import { AnnotationLabel } from '../ui/AnnotationLabel'
import { StatCard } from '../ui/StatCard'

const stats = [
  { number: 351, suffix: '', label: 'MA Cities & Towns Served' },
  { number: 500, suffix: '+', label: 'Satisfied Customers' },
  { number: 1, suffix: 'hr', label: 'Response Time' },
  { number: 100, suffix: '%', label: 'Licensed & Insured' },
]

export function StatsRow() {
  return (
    <section className="stats-section-home" style={{ background: 'var(--color-primary)', padding: 'clamp(64px, 8vw, 100px) 24px', position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <AnnotationLabel index="04" text="By the Numbers" inverted />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
          }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <StatCard key={i} number={stat.number} suffix={stat.suffix} label={stat.label} inverted />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-section-home { display: none !important; }
        }
      `}</style>
    </section>
  )
}
