# Coding Conventions

**Analysis Date:** 2025-03-04

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `Button.tsx`, `ServiceCard.tsx`)
- Utilities/data: camelCase (e.g., `structuredData.ts`, `services.ts`)
- Pages: PascalCase (e.g., `Home.tsx`, `Contact.tsx`)
- Directories: lowercase, semantic (e.g., `components/`, `pages/`, `data/`, `lib/`)

**Functions:**
- React components: PascalCase, exported as named or default export
- Event handlers: camelCase, prefix with "on" (e.g., `onMouseEnter`, `onSubmit`)
- Utility functions: camelCase (e.g., `handleSubmit`, `setScrolled`)
- Hooks: camelCase, prefix with "use" (e.g., `useForm` from react-hook-form)

**Variables:**
- State: camelCase (e.g., `scrolled`, `menuOpen`, `submitted`)
- Constants: camelCase or UPPER_SNAKE_CASE if truly constant (e.g., `navLinks` array, `services` const array)
- DOM element references: camelCase (e.g., `el`, `link`)
- Object/array items: camelCase (e.g., `stat`, `contactRow`, `icon`)

**Types & Interfaces:**
- PascalCase (e.g., `ButtonProps`, `ServiceCardProps`, `FormData`)
- Props interfaces: always end with `Props` (e.g., `AnnotationLabelProps`)
- Exported types: in same file as component or in dedicated types section
- Union types: use pipes (e.g., `'primary' | 'secondary' | 'ghost'`)

## Code Style

**Formatting:**
- No linter/formatter currently configured. Code uses inconsistent spacing
- Indentation: 2 spaces (observed throughout)
- Line length: no enforced limit, some lines reach 180+ characters
- Quote style: double quotes preferred in JSX attributes, strings
- Semicolons: required at end of statements

**Linting:**
- ESLint configured in package.json but no `.eslintrc` file found
- Run: `npm run lint` (checks .ts and .tsx files, max-warnings: 0)
- Plugin: `@typescript-eslint/eslint-plugin`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- No custom rules file means default ESLint + TypeScript plugin rules apply

**TypeScript:**
- Strict mode enabled (`"strict": true`)
- Unused locals/parameters flagged (`"noUnusedLocals": true`, `"noUnusedParameters": true`)
- No fallthrough cases allowed (`"noFallthroughCasesInSwitch": true`)
- Target: ES2020
- JSX: react-jsx (new JSX transform)

## Import Organization

**Order:**
1. React/third-party framework imports (React, react-router-dom, framer-motion, react-helmet-async)
2. React libraries (useState, useEffect, Suspense, motion, etc.)
3. Custom component imports (relative paths like `../components/`)
4. Data/utility imports (relative paths like `../data/`, `../lib/`)
5. Type imports (inline with other imports, no separate type import statements observed)

**Path Aliases:**
- No path aliases configured (no `@/` or similar)
- All imports are relative paths (e.g., `../components/ui/Button`)

**Export Patterns:**
- Named exports for UI components (e.g., `export function Button() {}`)
- Default exports for page components (e.g., `export default function Home() {}`)
- Data arrays exported as named consts (e.g., `export const services: Service[] = [...]`)
- Schema functions exported as named consts (e.g., `export const localBusinessSchema = { ... }`)

## Error Handling

**Patterns:**
- React Hook Form validation: inline in register() with `required` and `pattern` rules
  ```typescript
  {...register('email', {
    required: 'Email address is required',
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
  })}
  ```
- Error display: check `errors[field]` from `formState` and render conditional error message
  ```typescript
  {errors.fullName && <p style={errorStyle}>{errors.fullName.message}</p>}
  ```
- No try/catch blocks observed in components (minimal error boundaries)
- Console logging for form submission: `console.log(data)` as placeholder until backend connected
- TODO comments mark incomplete integrations (e.g., "// TODO: Connect to Formspree, Netlify Forms, or custom API")

## Logging

**Framework:** console object (console.log, console.error implied by TODOs)

**Patterns:**
- Form submission logs data object: `console.log(data)` in `Contact.tsx` onSubmit
- No structured logging or logger instance
- Dev-only: scroll event listeners for navbar shadow effect use internal state instead of logging

## Comments

**When to Comment:**
- Section headers in components (e.g., `{/* Logo */}`, `{/* Desktop nav */}`)
- Aria-hidden decorative elements: `aria-hidden="true"` + comment
- Complex calculations (e.g., gradient animation transforms)
- TODO markers for placeholder content awaiting real data/integration

**JSDoc/TSDoc:**
- Not consistently used
- Interfaces have no JSDoc comments
- Function parameters lack docs
- Single-line prop descriptions observed in some components (rare)

**Example comment patterns:**
```typescript
{/* Large decorative "01" in background */}
{/* Eyebrow */}
{/* Headline */}
{/* TODO: Replace with real phone / address / owner name / ... */}
```

## Function Design

**Size:** Functions vary widely; components are generally 50-200 lines of JSX + styling

**Parameters:**
- React components destructure props inline: `export function Button({ children, variant = 'primary', ... }: ButtonProps)`
- Default parameters used for optional props (e.g., `variant = 'primary'`)
- Spread operator for form registration: `{...register('fieldName', { rules })}`

**Return Values:**
- Components return JSX (motion.div, fragment, conditional renders)
- Type safety: all parameters typed via interfaces, return type implicit (JSX.Element)
- Conditional rendering common: `{submitted ? <SuccessCard /> : <Form />}`

**Composition:**
- Heavy use of inline styles via `style={{}}` object literal
- Motion components wrapped for animations: `<motion.div initial={{}} animate={{}} transition={{}}>`
- Custom style object factories: `const fieldStyle = (hasError: boolean): React.CSSProperties => ({...})`

## Module Design

**Exports:**
- Named exports for reusable components: `export function Button() {}`
- Default exports for page routes: `export default function Home() {}`
- Const exports for data: `export const services: Service[] = [...]`
- No barrel exports observed (no index.ts re-exports)

**File Structure:**
- One component per file (e.g., `Button.tsx` = Button component only)
- Data interfaces colocated with data (e.g., `Service` interface in `services.ts`)
- Props interfaces defined at top of component file

**Dependencies:**
- Components have tight coupling to CSS variables (e.g., `color: 'var(--color-primary)'`)
- No dependency injection; config baked into files
- Form validation rules defined in component, not externalized

## Style & Spacing

**Inline Styles:**
- Predominant pattern: all styling is inline `style={{}}` objects
- No CSS files for component styles (only global `globals.css` + Tailwind)
- Reusable style objects defined as consts above components:
  ```typescript
  const baseStyle: React.CSSProperties = { ... }
  const variantBase: Record<string, React.CSSProperties> = { ... }
  ```

**CSS Variables:**
- Colors defined in `:root` in `src/styles/globals.css`
- All components reference variables: `color: 'var(--color-primary)'`
- Typography loaded via `<link>` in `index.html` (Playfair Display, Crimson Pro, Barlow)

**Responsive Design:**
- Inline `<style>` blocks with `@media` queries at component bottom
  ```typescript
  <style>{`
    @media (max-width: 768px) {
      .nav-desktop { display: none !important; }
    }
  `}</style>
  ```
- Tailwind CSS included but not actively used in components
- clamp() function used for fluid sizing: `fontSize: 'clamp(60px, 11vw, 120px)'`

## Special Patterns

**Framer Motion:**
- All motion components use `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`
- Transitions: `transition={{ duration: 0.4, delay: 0.1 }}`
- `AnimatePresence` wraps conditional renders (e.g., mobile menu)
- Exit animations for page transitions

**React Hook Form:**
- No inline event handlers on inputs (controller not used)
- CSS-based focus management: `.contact-input:focus` class selector
- Error messages from `formState.errors[field].message`
- Validation at field level, no form-level custom validation

**Event Handling:**
- DOM manipulation via `e.currentTarget as HTMLElement` type casts
- Direct style assignment: `el.style.boxShadow = '...'`
- Mouse events for hover states (no CSS :hover due to inline styles)

## Anti-Patterns Observed

- **Direct DOM manipulation:** `el.style.boxShadow = '...'` instead of state/CSS classes
- **Type casting without safety:** `e.currentTarget as HTMLElement` throughout
- **Inline mobile breakpoints:** media queries in component `<style>` blocks instead of centralized
- **Mixed concerns:** styling logic mixed with component logic
- **No component composition:** large monolithic components instead of breaking into smaller pieces

---

*Convention analysis: 2025-03-04*
