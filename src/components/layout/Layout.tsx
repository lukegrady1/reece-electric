import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  )
}
