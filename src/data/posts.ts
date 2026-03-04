export interface Post {
  slug: string
  title: string
  seoTitle: string
  seoDescription: string
  category: string
  date: string          // "March 4, 2026"
  dateISO: string       // "2026-03-04"
  readTime: string      // "5 min read"
  excerpt: string
  content: string       // HTML string
}

export const posts: Post[] = [
  {
    slug: 'electrical-panel-upgrade-signs',
    title: 'How to Know If Your Electrical Panel Needs an Upgrade',
    seoTitle: 'Signs Your Electrical Panel Needs an Upgrade | Reece Group LLC',
    seoDescription: 'Learn the warning signs that your electrical panel needs upgrading. Reece Group LLC serves all 351 Massachusetts cities and towns.',
    category: 'Panel Upgrades',
    date: 'March 4, 2026',
    dateISO: '2026-03-04',
    readTime: '5 min read',
    excerpt: 'Your electrical panel is the heart of your home\'s electrical system. Here\'s how to tell when it\'s time for an upgrade — before a small issue becomes a serious hazard.',
    content: `
      <h2>What Does an Electrical Panel Do?</h2>
      <p>Your electrical panel — also called a breaker box or load center — distributes electricity from the utility company throughout your home. It contains circuit breakers that automatically shut off power when a circuit is overloaded, protecting your wiring and appliances from damage.</p>
      <p>Most homes built before 1990 have panels rated for 100 amps. Modern homes with EV chargers, central air, and high-demand appliances often need 200-amp service or more.</p>

      <h2>Warning Signs You Need a Panel Upgrade</h2>
      <ul>
        <li><strong>Breakers trip frequently</strong> — If you're resetting breakers regularly, your panel can't handle the load.</li>
        <li><strong>Lights flicker or dim</strong> — Especially when appliances start up, this signals insufficient capacity.</li>
        <li><strong>Burning smell or scorch marks</strong> — A serious warning sign. Call an electrician immediately.</li>
        <li><strong>Your panel is a Federal Pacific or Zinsco brand</strong> — These are known fire hazards and should be replaced regardless of age.</li>
        <li><strong>You're adding a major appliance</strong> — EV charger, hot tub, or HVAC upgrade often requires more capacity.</li>
        <li><strong>Your home is over 25 years old</strong> — Panels age and components wear out over time.</li>
      </ul>

      <h2>What Does a Panel Upgrade Cost in Massachusetts?</h2>
      <p>A 200-amp panel upgrade in Massachusetts typically costs between $1,500 and $3,500, depending on the complexity of the work, your town's permitting fees, and whether the utility needs to be involved. Reece Group LLC provides free on-site estimates so you know the exact cost before any work begins.</p>

      <h2>Do I Need a Permit?</h2>
      <p>Yes — in Massachusetts, all electrical panel work requires a permit pulled by a licensed electrician. Reece Group LLC handles all permitting for every job we perform. Work done without permits can void your homeowner's insurance and create problems when you sell your home.</p>

      <h2>Ready for a Free Estimate?</h2>
      <p>Reece Group LLC is a licensed master electrician serving all 351 cities and towns in Massachusetts. If you're seeing any of the warning signs above, contact us today for a free, no-obligation estimate.</p>
    `,
  },
  {
    slug: 'ev-charger-installation-massachusetts',
    title: 'EV Charger Installation in Massachusetts: What Homeowners Need to Know',
    seoTitle: 'EV Charger Installation Massachusetts | Reece Group LLC',
    seoDescription: 'Everything Massachusetts homeowners need to know about Level 2 EV charger installation — cost, permits, and what to expect. Serving all 351 MA towns.',
    category: 'EV Chargers',
    date: 'March 4, 2026',
    dateISO: '2026-03-04',
    readTime: '6 min read',
    excerpt: 'Thinking about installing a Level 2 EV charger at home? Here\'s everything Massachusetts homeowners need to know — from permits to panel capacity to MassSave rebates.',
    content: `
      <h2>Level 1 vs. Level 2 EV Charging</h2>
      <p>Level 1 charging uses a standard 120V outlet and adds roughly 4–5 miles of range per hour — fine for plug-in hybrids, but painfully slow for a full EV. Level 2 chargers run on 240V and add 20–30 miles per hour, meaning a full charge overnight.</p>
      <p>For most EV owners, a Level 2 home charger is the right choice. It's faster, more efficient, and significantly more convenient.</p>

      <h2>What's Involved in the Installation?</h2>
      <ul>
        <li><strong>Panel assessment</strong> — We check whether your existing panel has capacity for a 40–50 amp dedicated circuit.</li>
        <li><strong>Circuit installation</strong> — A dedicated 240V circuit run from your panel to the garage or driveway.</li>
        <li><strong>Charger mounting</strong> — The EVSE (Electric Vehicle Supply Equipment) is mounted and connected.</li>
        <li><strong>Permit and inspection</strong> — Required by Massachusetts law. We handle all paperwork.</li>
      </ul>

      <h2>MassSave Rebates</h2>
      <p>Massachusetts homeowners may be eligible for up to $700 in rebates through MassSave for Level 2 charger installation. Income-eligible customers may qualify for even more. Ask us about current incentives when you request your estimate.</p>

      <h2>How Much Does It Cost?</h2>
      <p>EV charger installation in Massachusetts typically runs $400–$1,200 for the electrical work, not including the charger unit itself. Cost depends on distance from panel to charger location, panel upgrade needs, and permit fees by municipality.</p>

      <h2>Get a Free Estimate</h2>
      <p>Reece Group LLC installs EV chargers throughout Massachusetts. We're familiar with local permit requirements in every town we serve. Contact us for a free on-site estimate.</p>
    `,
  },
  {
    slug: 'gfci-afci-outlets-massachusetts',
    title: 'GFCI vs. AFCI Outlets: A Massachusetts Homeowner\'s Guide',
    seoTitle: 'GFCI vs AFCI Outlets Massachusetts | Reece Group LLC',
    seoDescription: 'Confused about GFCI and AFCI outlets? Learn what they do, where they\'re required by Massachusetts code, and when to upgrade.',
    category: 'Safety',
    date: 'March 4, 2026',
    dateISO: '2026-03-04',
    readTime: '4 min read',
    excerpt: 'GFCI and AFCI protection are required by the Massachusetts electrical code — but many older homes don\'t have them. Here\'s what they do and where you need them.',
    content: `
      <h2>What Is a GFCI Outlet?</h2>
      <p>GFCI stands for Ground Fault Circuit Interrupter. It monitors the flow of electricity and shuts off power in milliseconds if it detects a ground fault — electricity flowing somewhere it shouldn't, like through a person. This protects against electric shock.</p>
      <p>You've seen the outlets with "TEST" and "RESET" buttons — those are GFCIs. Massachusetts electrical code requires them in bathrooms, kitchens, garages, outdoor areas, and anywhere near water.</p>

      <h2>What Is an AFCI Outlet?</h2>
      <p>AFCI stands for Arc Fault Circuit Interrupter. It detects dangerous electrical arcs — the kind that can start fires inside walls where you can't see them. While GFCIs protect people from shock, AFCIs protect your home from fires.</p>
      <p>Massachusetts adopted the 2020 NEC (National Electrical Code), which requires AFCI protection for nearly all living areas including bedrooms, living rooms, hallways, and dining rooms.</p>

      <h2>Does My Home Have Them?</h2>
      <p>If your home was built or substantially renovated after 2002, you likely have GFCI protection in wet areas. AFCI protection is newer — if your home is more than 10 years old, you may not have it.</p>
      <p>Homes without proper GFCI and AFCI protection are technically out of code and present real safety risks. The good news: upgrading is straightforward and relatively affordable.</p>

      <h2>How Much Does It Cost to Upgrade?</h2>
      <p>GFCI outlet replacement typically costs $100–$200 per location. AFCI breaker installation runs $50–$100 per circuit. A full safety assessment can identify exactly which areas of your home need attention.</p>
    `,
  },
  {
    slug: 'electrical-panel-upgrade-cost-massachusetts',
    title: 'How Much Does an Electrical Panel Upgrade Cost in Massachusetts?',
    seoTitle: 'Electrical Panel Upgrade Cost Massachusetts 2026 | Reece Group LLC',
    seoDescription: 'Transparent pricing guide for electrical panel upgrades in Massachusetts. Learn what affects cost and what to expect. Free estimates from Reece Group LLC.',
    category: 'Panel Upgrades',
    date: 'March 4, 2026',
    dateISO: '2026-03-04',
    readTime: '5 min read',
    excerpt: 'Panel upgrade costs in Massachusetts vary based on amperage, location, and permit requirements. Here\'s a transparent breakdown of what to expect — with no surprises.',
    content: `
      <h2>Average Panel Upgrade Costs in Massachusetts</h2>
      <p>Based on jobs we've completed across Worcester County and greater Massachusetts:</p>
      <ul>
        <li><strong>100-amp to 200-amp upgrade:</strong> $1,500 – $2,500</li>
        <li><strong>200-amp to 400-amp upgrade:</strong> $2,500 – $4,500</li>
        <li><strong>Panel replacement (same amperage):</strong> $1,200 – $2,000</li>
        <li><strong>Service entrance replacement:</strong> Add $500 – $1,500</li>
      </ul>
      <p>These are installed costs including labor, materials, permit, and inspection. They do not include utility company fees if the meter needs to be pulled.</p>

      <h2>What Affects the Cost?</h2>
      <ul>
        <li><strong>Current panel location</strong> — Panels in finished basements or tight spaces take longer to work in.</li>
        <li><strong>Permit fees</strong> — Vary by municipality. Some towns charge $50; others charge $300+.</li>
        <li><strong>Utility involvement</strong> — If the utility needs to pull the meter, there may be a scheduling delay and additional fee.</li>
        <li><strong>Subpanel additions</strong> — Adding a subpanel for a detached garage or workshop adds cost.</li>
        <li><strong>Knob-and-tube or aluminum wiring</strong> — If we find unsafe wiring during the job, we'll discuss options with you before proceeding.</li>
      </ul>

      <h2>Why Get Multiple Quotes?</h2>
      <p>We encourage you to get multiple quotes. What we ask is that you compare apples to apples — make sure every quote includes permits, all labor, and a warranty on workmanship. Quotes that seem very low often exclude permits or use unlicensed subcontractors.</p>

      <h2>Free On-Site Estimate</h2>
      <p>Reece Group LLC provides free on-site estimates for all panel work. We'll walk you through exactly what needs to be done and why before any work begins.</p>
    `,
  },
  {
    slug: 'home-electrical-inspection-massachusetts',
    title: 'What to Expect During a Home Electrical Safety Inspection',
    seoTitle: 'Home Electrical Inspection Massachusetts | Reece Group LLC',
    seoDescription: 'Learn what happens during a home electrical safety inspection in Massachusetts, what electricians look for, and when you need one.',
    category: 'Safety',
    date: 'March 4, 2026',
    dateISO: '2026-03-04',
    readTime: '4 min read',
    excerpt: 'Whether you\'re buying a home, renovating, or just want peace of mind — here\'s exactly what a licensed electrician checks during a safety inspection.',
    content: `
      <h2>When Do You Need an Electrical Inspection?</h2>
      <ul>
        <li>Buying or selling a home</li>
        <li>Home is more than 25 years old and hasn't been inspected recently</li>
        <li>After storm damage or flooding</li>
        <li>Before a major renovation</li>
        <li>You notice flickering lights, tripping breakers, or burning smells</li>
        <li>Your insurance company requires it</li>
      </ul>

      <h2>What Does an Electrician Check?</h2>
      <p>A thorough electrical inspection covers:</p>
      <ul>
        <li><strong>Electrical panel</strong> — Brand, age, amperage, signs of overheating, proper labeling</li>
        <li><strong>Wiring type and condition</strong> — Aluminum wiring, knob-and-tube, and cloth-insulated wiring are all safety concerns</li>
        <li><strong>Grounding and bonding</strong> — Proper grounding protects against surges and shock</li>
        <li><strong>GFCI and AFCI protection</strong> — Required in specific locations by Massachusetts code</li>
        <li><strong>Outlets and switches</strong> — Checked for damage, proper wiring, and code compliance</li>
        <li><strong>Smoke and CO detector placement</strong> — We note code requirements even though this is typically a separate inspection</li>
      </ul>

      <h2>How Long Does It Take?</h2>
      <p>A typical single-family home inspection takes 1–2 hours. Larger homes or homes with more complex systems take longer. You'll receive a written report of findings with recommended actions prioritized by safety urgency.</p>

      <h2>How Much Does It Cost?</h2>
      <p>Electrical safety inspections in Massachusetts typically cost $150–$300 for a single-family home. If repairs are needed and you hire us to do the work, we apply the inspection fee toward the job cost.</p>
    `,
  },
]
