export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Electrician',
  name: 'Reece Group LLC',
  image: 'https://reecegroupllc.com/og-image.jpg',
  url: 'https://reecegroupllc.com',
  telephone: '+15087938788', // TODO: Replace with real phone number
  address: {
    '@type': 'PostalAddress',
    streetAddress: '[ADDRESS]', // TODO: Replace with real street address
    addressLocality: 'Worcester',
    addressRegion: 'MA',
    postalCode: '01601',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.2626, // Worcester, MA
    longitude: -71.8023,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  areaServed: 'Massachusetts',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Electrical Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Residential Electrical' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Electrical' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Panel Upgrades' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'EV Charger Installation' } },
    ],
  },
}

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
})

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `https://reecegroupllc.com${item.url}`,
  })),
})
