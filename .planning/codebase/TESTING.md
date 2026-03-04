# Testing Patterns

**Analysis Date:** 2025-03-04

## Test Framework

**Status:** Not implemented

**Runner:**
- Not detected — no Jest, Vitest, or other test runner configured
- No test files in `src/` directory
- `package.json` has no test script (only `dev`, `build`, `lint`, `preview`)

**Assertion Library:**
- Not detected

**Test Files:**
- Zero test files found in project source (`src/`)
- `.test.*` and `.spec.*` files do not exist in codebase
- Node modules contain test files but are not part of this project

**Run Commands:**
```bash
npm run build              # Type check + Vite build (zero errors required)
npm run lint              # ESLint check
npm run preview           # Vite dev server preview
```

No dedicated test command exists.

## Build Verification (Current Testing Method)

Since no test suite is implemented, quality assurance relies on:

1. **TypeScript compilation**: `npm run build` runs `tsc` first
   - Strict mode enabled: catches type errors, unused variables
   - Must pass with zero errors before Vite build proceeds
   - `noUnusedLocals: true`, `noUnusedParameters: true` enforced

2. **ESLint**: `npm run lint`
   - Checks `.ts` and `.tsx` files
   - `--max-warnings 0` means zero linting violations allowed
   - Plugins: `@typescript-eslint`, `react-hooks`, `react-refresh`

3. **Vite build**: `vite build`
   - Bundles code with tree-shaking
   - Vendor chunk splitting configured:
     ```typescript
     manualChunks: {
       vendor: ['react', 'react-dom', 'react-router-dom'],
       motion: ['framer-motion'],
     }
     ```

4. **Manual verification** (documented in CLAUDE.md):
   - All 4 routes render: `/`, `/services`, `/about`, `/contact`
   - No console errors at any breakpoint
   - No horizontal scroll at 375px viewport
   - Lighthouse targets: Perf 90+, SEO 100, Accessibility 90+, Best Practices 95+
   - Test at viewports: 375px, 768px, 1280px, 1440px
   - All tel: and mailto: links functional
   - Form validation fires on empty submit

## Test File Organization

**Not applicable** — no test infrastructure in place

**Recommended structure** (when testing is added):
```
src/
├── components/
│   ├── __tests__/
│   │   ├── Button.test.tsx
│   │   ├── AnnotationLabel.test.tsx
│   │   └── ServiceCard.test.tsx
│   └── [components...]
├── pages/
│   ├── __tests__/
│   │   ├── Home.test.tsx
│   │   ├── Contact.test.tsx
│   │   └── [pages...]
│   └── [pages...]
└── [other dirs...]
```

## What Should Be Tested (Coverage Gaps)

Based on current code, these areas lack test coverage:

**Components (High Priority):**
- `Button.tsx` — variant rendering, click handlers, href vs button element
- `ServiceCard.tsx` — hover state changes, link navigation
- `Navbar.tsx` — scroll detection, mobile menu open/close, responsive behavior
- `ContactForm` (in `Contact.tsx`) — form validation, error messages, field focus states
- `SEOHead.tsx` — schema rendering, meta tags in document head

**Pages (Medium Priority):**
- `Contact.tsx` — form submission, success state display, field validation
- `Home.tsx` — section rendering, CTA links navigate correctly
- Navigation between pages works without errors

**Utilities (Medium Priority):**
- `structuredData.ts` — schema object structure, breadcrumb generation
- Data transforms in `services.ts`, `faqs.ts`, `testimonials.ts`

**Integration (Medium Priority):**
- Form submission flow (form → validation → success state)
- Page routing and lazy loading
- SEO data appears in document head for each page

**Responsive Behavior (Medium Priority):**
- Mobile menu visibility at breakpoints
- Grid layout changes (2-column → 1-column on small screens)
- Viewport-specific element visibility (nav-desktop hidden on mobile, etc.)

## Mocking Strategy (When Testing Is Implemented)

**Framework:** Jest or Vitest recommended

**What to Mock:**
- `react-router-dom`: Mock `useLocation`, `useNavigate`, `Link`, `NavLink` for unit tests
- `framer-motion`: Mock motion components or use real library (low overhead)
- `react-helmet-async`: Mock `Helmet` or render with real HelmetProvider
- Window events: Mock scroll listener in `Navbar.tsx` tests
- Form submission: Mock or test with react-hook-form test utilities

**What NOT to Mock:**
- Internal components (test with real imports)
- React Hook Form validation (real validation logic should be tested)
- CSS variable values (test output, not CSS)
- Data structures in `services.ts`, `faqs.ts` (these are the source of truth)

## Test Structure Examples (Recommended Pattern)

**Component Unit Test:**
```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders with primary variant by default', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByText('Click me')
    expect(button).toHaveStyle({ background: 'var(--color-primary)' })
  })

  it('renders as link when href prop provided', () => {
    render(<Button href="/services">Services</Button>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/services')
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    screen.getByText('Click me').click()
    expect(handleClick).toHaveBeenCalled()
  })
})
```

**Form Validation Test:**
```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from '../Contact'

describe('Contact form', () => {
  it('shows error when email is invalid', async () => {
    render(<Contact />)
    const emailInput = screen.getByLabelText('Email Address')

    await userEvent.type(emailInput, 'invalid-email')
    screen.getByRole('button', { name: /send/i }).click()

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const consoleSpy = jest.spyOn(console, 'log')
    render(<Contact />)

    await userEvent.type(screen.getByLabelText('Full Name'), 'John Doe')
    await userEvent.type(screen.getByLabelText('Phone Number'), '(555) 000-0000')
    await userEvent.type(screen.getByLabelText('Email Address'), 'john@example.com')
    await userEvent.selectOption(screen.getByLabelText('Service Needed'), 'Residential Electrical')

    screen.getByRole('button', { name: /send/i }).click()

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.objectContaining({
        fullName: 'John Doe',
        phone: '(555) 000-0000',
        email: 'john@example.com',
      }))
    })
  })
})
```

**Page Test (with Routing):**
```typescript
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from '../Home'

describe('Home page', () => {
  it('renders hero section with main heading', () => {
    render(
      <BrowserRouter>
        <HelmetProvider>
          <Home />
        </HelmetProvider>
      </BrowserRouter>
    )
    expect(screen.getByRole('heading', { name: /reece group llc/i })).toBeInTheDocument()
  })

  it('has clickable CTA buttons', () => {
    render(
      <BrowserRouter>
        <HelmetProvider>
          <Home />
        </HelmetProvider>
      </BrowserRouter>
    )
    expect(screen.getByRole('link', { name: /get a free estimate/i })).toHaveAttribute('href', '/contact')
    expect(screen.getByRole('link', { name: /our services/i })).toHaveAttribute('href', '/services')
  })
})
```

## Coverage Recommendations

**Recommended thresholds** (when setting up):
- Statements: 60% (core logic covered)
- Branches: 50% (major conditionals tested)
- Functions: 60% (most functions tested)
- Lines: 60% (most code paths exercised)

**Priority order for implementation:**
1. Form validation and submission (`Contact.tsx`)
2. Component rendering (`Button.tsx`, `ServiceCard.tsx`, `AnnotationLabel.tsx`)
3. Navigation and routing (`App.tsx`, nav between pages)
4. SEO data integrity (`SEOHead.tsx`, schema generation)
5. Responsive behavior and breakpoints (visual/integration tests)

## Testing Tools (Recommended Setup)

**Suggested dependencies:**
```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jsdom": "^23.0.0",
    "@testing-library/user-event": "^14.0.0"
  }
}
```

**Why:**
- Vitest: Faster than Jest, uses Vite config, drop-in replacement
- @testing-library/react: Component testing best practices
- jsdom: DOM environment for React components
- @testing-library/user-event: Realistic user interactions in tests

**Config file** (vitest.config.ts or vite.config.ts `test` section):
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
})
```

---

*Testing analysis: 2025-03-04*
