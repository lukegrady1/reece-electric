import { PageWrapper } from '../components/layout/PageWrapper'
import { SEOHead } from '../components/ui/SEOHead'
import { Hero } from '../components/sections/Hero'
import { TrustBar } from '../components/sections/TrustBar'
import { ServicesGrid } from '../components/sections/ServicesGrid'
import { WhyUs } from '../components/sections/WhyUs'
import { StatsRow } from '../components/sections/StatsRow'
import { Testimonials } from '../components/sections/Testimonials'
import { CTABanner } from '../components/sections/CTABanner'
import { localBusinessSchema } from '../lib/structuredData'

export default function Home() {
  return (
    <PageWrapper>
      <SEOHead
        title="Licensed Electrician in Paxton, MA | Reece Group LLC"
        description="Reece Group LLC provides expert electrical services across Massachusetts. Residential, commercial, panel upgrades & EV chargers. Call for a free estimate."
        canonical="/"
        schema={localBusinessSchema}
      />
      {/* Section rhythm: GREEN → WHITE → CREAM → GREEN → CREAM → WHITE → GREEN */}
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <WhyUs />
      <StatsRow />
      <Testimonials />
      <CTABanner />
    </PageWrapper>
  )
}
