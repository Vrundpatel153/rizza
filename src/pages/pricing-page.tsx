import { useState } from 'react';
import { Check, Sparkles, Building2, User, ArrowRight } from 'lucide-react';

export function PricingPage({ notify }: { notify: (s: string) => void }) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const tiers = [
    {
      name: 'Candidate Free',
      badge: 'FOR CREATORS',
      price: '$0',
      period: 'forever free',
      desc: 'Build your living digital profile, write STAR case studies, and discover matching opportunities.',
      features: [
        'Living Life Page profile with custom URL',
        'STAR Storyteller Studio (Unlimited stories)',
        'Take baseline skill & culture assessments',
        '1-Click apply to matched positions',
        'Encrypted Digital Vault for credentials',
        'Brand Arcade participation'
      ],
      cta: 'Current Plan',
      isCurrent: true
    },
    {
      name: 'Benchmark Pro',
      badge: 'MOST POPULAR',
      price: billingCycle === 'monthly' ? '$19' : '$15',
      period: 'per month',
      desc: 'Deep psychometric insights, global percentile percentiles, and verified talent badges.',
      features: [
        'Everything in Candidate Free',
        'Verified 90th+ percentile skill badges',
        'Full 5-dimension radar diagnostic reports',
        'Company-specific hiring bar benchmarks',
        'Priority spotlight to top verified recruiters',
        'Unlimited assessment retakes (zero cooldown)'
      ],
      cta: 'Upgrade to Pro',
      highlight: true
    },
    {
      name: 'Employer Starter',
      badge: 'FOR TEAMS',
      price: billingCycle === 'monthly' ? '$299' : '$249',
      period: 'per month',
      desc: 'Full ATS pipeline and Job DNA match engine for growing product & design teams.',
      features: [
        '3 active Job DNA requisitions',
        'AI multi-signal candidate ranking',
        'Full ATS Kanban board & interview scorecards',
        '1-minute candidate video pitch streaming',
        'Digital Vault background check access',
        '5 hiring manager team seats'
      ],
      cta: 'Start 14-Day Free Trial'
    },
    {
      name: 'Scale ATS',
      badge: 'ENTERPRISE',
      price: billingCycle === 'monthly' ? '$899' : '$749',
      period: 'per month',
      desc: 'Unlimited hiring capacity, custom brand challenges, and ATS integrations.',
      features: [
        'Unlimited active requisitions',
        'Sponsored Brand Arcade hackathons',
        'E-Signature offer generation pipeline',
        'Greenhouse & Lever ATS sync',
        'Dedicated talent partner & onboarding',
        'Unlimited team seats & custom RBAC'
      ],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="content-width">
      <div className="page-head text-center">
        <div>
          <div className="eyebrow">PUBLIC SUITE · SCREEN W-04</div>
          <h1>Transparent Plans for Candidates & Teams</h1>
          <p>Whether you're shaping your career story or hiring top 1% product talent, Rizza has a plan built for you.</p>
        </div>
      </div>

      <div className="billing-cycle-toggle">
        <button
          className={billingCycle === 'monthly' ? 'active' : ''}
          onClick={() => setBillingCycle('monthly')}
        >
          Monthly Billing
        </button>
        <button
          className={billingCycle === 'annual' ? 'active' : ''}
          onClick={() => setBillingCycle('annual')}
        >
          Annual Billing <span className="discount-tag">Save 20%</span>
        </button>
      </div>

      <div className="pricing-grid">
        {tiers.map(t => (
          <div key={t.name} className={`pricing-card panel ${t.highlight ? 'featured-plan' : ''}`}>
            <span className="plan-badge">{t.badge}</span>
            <h3 className="plan-name">{t.name}</h3>
            <p className="plan-desc">{t.desc}</p>

            <div className="plan-price-row">
              <span className="price-val">{t.price}</span>
              <span className="price-period">/ {t.period}</span>
            </div>

            <ul className="plan-features-list">
              {t.features.map((f, i) => (
                <li key={i}><Check size={14} /> {f}</li>
              ))}
            </ul>

            <button
              className={`plan-cta-btn ${t.highlight ? 'primary-btn glow-btn' : t.isCurrent ? 'quiet-btn' : 'outline-btn'}`}
              onClick={() => notify(`${t.name} action triggered.`)}
            >
              {t.cta} {t.highlight && <ArrowRight size={14} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
