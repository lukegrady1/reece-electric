import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'
import { Layout } from './components/layout/Layout'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const Home     = React.lazy(() => import('./pages/Home'))
const Services = React.lazy(() => import('./pages/Services'))
const About    = React.lazy(() => import('./pages/About'))
const Contact  = React.lazy(() => import('./pages/Contact'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

const PageFallback = () => (
  <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }} />
)

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Suspense fallback={<PageFallback />}>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"         element={<Layout><Home /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/about"    element={<Layout><About /></Layout>} />
          <Route path="/contact"  element={<Layout><Contact /></Layout>} />
          <Route path="*"         element={<Layout><NotFound /></Layout>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </HelmetProvider>
  )
}
