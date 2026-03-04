import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface AccordionItem {
  q: string
  a: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '18px 0',
                background: isOpen ? 'var(--color-primary-tint)' : 'transparent',
                paddingLeft: isOpen ? '12px' : '0',
                paddingRight: isOpen ? '12px' : '0',
                border: 'none',
                borderBottom: '1px solid var(--color-border)',
                cursor: 'pointer',
                textAlign: 'left',
                gap: '16px',
                transition: 'background 180ms ease, padding 180ms ease',
              }}
            >
              <span
                style={{
                  fontFamily: '"Fraunces", serif',
                  fontWeight: 600,
                  fontSize: '17px',
                  color: 'var(--color-ink)',
                  lineHeight: 1.3,
                }}
              >
                {item.q}
              </span>
              <span
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  color: 'var(--color-gold)',
                  flexShrink: 0,
                  lineHeight: 1,
                }}
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p
                    style={{
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      fontSize: '16px',
                      lineHeight: 1.8,
                      color: 'var(--color-ink-mid)',
                      padding: '16px 0 24px',
                      margin: 0,
                    }}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
