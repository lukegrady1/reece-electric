import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:             'var(--color-bg)',
        surface:        'var(--color-surface)',
        surface2:       'var(--color-surface-2)',
        ink:            'var(--color-ink)',
        'ink-mid':      'var(--color-ink-mid)',
        'ink-faint':    'var(--color-ink-faint)',
        border:         'var(--color-border)',
        'border-dark':  'var(--color-border-dark)',
        accent:         'var(--color-accent)',
        'accent-dim':   'var(--color-accent-dim)',
        'accent-light': 'var(--color-accent-light)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        ui:      ['"DM Sans"', 'system-ui', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1160px',
      },
    },
  },
  plugins: [],
} satisfies Config
