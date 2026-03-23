const items = [
  'Serving All 351 Cities & Towns',
  'Licensed Electrician',
  'Worcester, MA Based',
  'Fully Insured',
]

export function TrustBar() {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border-dark)',
        borderBottom: '1px solid var(--color-border-dark)',
        padding: '20px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px 0',
        }}
      >
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                display: 'inline-block',
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '11px',
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                background: 'var(--color-primary-tint)',
                border: '1px solid rgba(0,0,0,0.12)',
                padding: '5px 14px',
                borderRadius: '2px',
                margin: '4px 6px',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
            {i < items.length - 1 && (
              <span
                style={{
                  width: '1px',
                  height: '12px',
                  background: 'var(--color-border)',
                  display: 'inline-block',
                  margin: '0 2px',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
