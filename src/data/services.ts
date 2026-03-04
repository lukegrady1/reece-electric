export interface Service {
  id: string
  number: string
  title: string
  shortDescription: string
  fullDescription: string
  features: string[]
  seoKeywords: string[]
}

export const services: Service[] = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Electrical',
    shortDescription: 'Complete home electrical solutions from outlets to full rewires.',
    fullDescription: '// TODO: expand with real description',
    features: [
      'Outlet & switch installation',
      'Home rewiring & circuit additions',
      'Ceiling fan & light fixture installation',
      'Recessed LED lighting',
      'GFCI & AFCI upgrades',
    ],
    seoKeywords: ['residential electrician [city]', 'home electrical repair'],
  },
  {
    id: 'commercial',
    number: '02',
    title: 'Commercial Electrical',
    shortDescription: 'Reliable electrical systems for offices, retail, and industrial spaces.',
    fullDescription: '// TODO: expand with real description',
    features: [
      'Commercial wiring & panel work',
      'Office & retail fit-outs',
      'Lighting design & installation',
      'Code compliance upgrades',
      'Tenant improvement work',
    ],
    seoKeywords: ['commercial electrician [city]', 'business electrical contractor'],
  },
  {
    id: 'panel-upgrades',
    number: '03',
    title: 'Panel Upgrades & Replacements',
    shortDescription: 'Modernize your electrical panel for safety and capacity.',
    fullDescription: '// TODO: expand with real description',
    features: [
      '100A to 200A+ upgrades',
      'Federal Pacific & Zinsco replacements',
      'Sub-panel installations',
      'Breaker replacements',
      'Load calculations',
    ],
    seoKeywords: ['panel upgrade [city]', 'electrical panel replacement'],
  },
  {
    id: 'ev-charger',
    number: '04',
    title: 'EV Charger Installation',
    shortDescription: 'Level 2 EV charger installation for home and business.',
    fullDescription: '// TODO: expand with real description',
    features: [
      'Level 2 (240V) charger installation',
      'All major EV brands supported',
      'Permit & inspection handling',
      'Outdoor weatherproof installations',
      'Commercial EV charging stations',
    ],
    seoKeywords: ['EV charger installation [city]', 'electric car charger electrician'],
  },
  {
    id: 'lighting',
    number: '05',
    title: 'Lighting Installation',
    shortDescription: 'Interior and exterior lighting solutions for any project.',
    fullDescription: '// TODO: expand with real description',
    features: [
      'Recessed & track lighting',
      'Landscape & outdoor lighting',
      'Under-cabinet & accent lighting',
      'Commercial LED retrofits',
      'Smart lighting systems',
    ],
    seoKeywords: ['lighting installation [city]', 'electrician lighting upgrade'],
  },
  {
    id: 'inspections',
    number: '06',
    title: 'Safety Inspections & Code Compliance',
    shortDescription: 'Thorough electrical inspections and code compliance evaluations.',
    fullDescription: '// TODO: expand with real description',
    features: [
      'Pre-purchase home inspections',
      'Insurance compliance reports',
      'GFCI & AFCI testing',
      'Smoke detector compliance',
      'NEC code violation remediation',
    ],
    seoKeywords: ['electrical inspection [city]', 'electrical code compliance'],
  },
]
