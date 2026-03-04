// Renamed internally to OrnamentalDivider per DESIGN.md
interface RuledDividerProps {
  label?: string
  className?: string
  compact?: boolean // smaller version without diamond, just gold line
}

export function RuledDivider({ compact = false, className = '' }: RuledDividerProps) {
  if (compact) {
    return (
      <div
        className={className}
        style={{
          height: '1px',
          background: 'var(--color-gold)',
          margin: '16px 0',
          opacity: 0.6,
        }}
      />
    )
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        margin: '8px 0',
      }}
    >
      <div style={{ flex: 1, height: '1px', background: 'var(--color-gold)', opacity: 0.5 }} />
      <span
        style={{
          fontFamily: '"Barlow", sans-serif',
          color: 'var(--color-gold)',
          fontSize: '12px',
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        ✦
      </span>
      <div style={{ flex: 1, height: '1px', background: 'var(--color-gold)', opacity: 0.5 }} />
    </div>
  )
}
