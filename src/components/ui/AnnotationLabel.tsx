interface AnnotationLabelProps {
  text: string
  index?: string
  inverted?: boolean
}

export function AnnotationLabel({ text, inverted }: AnnotationLabelProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px',
      }}
    >
      <div
        style={{
          width: '24px',
          height: '1px',
          background: 'var(--color-gold)',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontWeight: 600,
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: inverted ? 'var(--color-gold)' : 'var(--color-primary)',
        }}
      >
        {text}
      </span>
    </div>
  )
}
