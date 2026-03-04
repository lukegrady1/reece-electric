import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  'aria-label'?: string
}

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: '9px 22px', fontSize: '12px' },
  md: { padding: '13px 32px', fontSize: '13px' },
  lg: { padding: '16px 40px', fontSize: '13px' },
}

const baseStyle: React.CSSProperties = {
  fontFamily: '"DM Sans", system-ui, sans-serif',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  borderRadius: '2px',
  transition: 'all 180ms ease',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
}

const variantBase: Record<string, React.CSSProperties> = {
  primary:   { background: 'var(--color-primary)',   color: '#fff', border: '2px solid var(--color-primary)' },
  secondary: { background: 'transparent',             color: 'var(--color-primary)', border: '2px solid var(--color-primary)' },
  ghost:     { background: 'transparent',             color: 'var(--color-primary)', border: 'none', padding: '0', letterSpacing: '0.12em' },
  accent:    { background: 'var(--color-gold)',       color: '#fff', border: '2px solid var(--color-gold)' },
}

const variantHover: Record<string, React.CSSProperties> = {
  primary:   { background: 'var(--color-primary-dark)',  borderColor: 'var(--color-primary-dark)' },
  secondary: { background: 'var(--color-primary)',       color: '#fff' },
  ghost:     { textDecoration: 'underline' },
  accent:    { background: 'var(--color-gold-dim)',      borderColor: 'var(--color-gold-dim)' },
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  type = 'button',
  fullWidth = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const style: React.CSSProperties = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantBase[variant],
    width: fullWidth ? '100%' : undefined,
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement
    Object.assign(el.style, variantHover[variant])
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement
    Object.assign(el.style, variantBase[variant])
    if (variant === 'ghost') el.style.textDecoration = 'none'
  }

  if (href) {
    return (
      <a href={href} style={style} aria-label={ariaLabel} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} style={style} aria-label={ariaLabel} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </button>
  )
}
