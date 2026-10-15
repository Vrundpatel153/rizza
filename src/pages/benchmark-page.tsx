import { useState } from 'react';
import { Award, Target, TrendingUp, Download, ArrowRight, ShieldCheck, CheckCircle2, BookOpen, Sparkles, Sliders } from 'lucide-react';
import { DemoUser } from '../model';

export function BenchmarkPage({ user, notify }: { user: DemoUser; notify: (s: string) => void }) {
  const [proActive, setProActive] = useState(false);

  const dimensions = [
    { name: 'Interaction Fidelity & Micro-craft', score: 94, percentile: 'Top 6%', desc: 'Exceptional attention to sub-second state transitions, physics, and keyboard navigation.' },
    { name: 'User Research & Cognitive Mapping', score: 91, percentile: 'Top 9%', desc: 'Strong ability to uncover root anxieties and transform ambiguous qualitative signals into clarity.' },
    { name: 'Product Sense & Business Alignment', score: 88, percentile: 'Top 12%', desc: 'Connects UX interventions directly to retention, activation funnels, and enterprise sales cycles.' },
    { name: 'Systems Architecture & Tokens', score: 86, percentile: 'Top 14%', desc: 'Scalable multi-platform component structures with engineering token parity.' },
    { name: 'Cross-functional Team Leadership', score: 82, percentile: 'Top 18%', desc: 'Navigates stakeholder disputes with evidence-grounded prototypes and collaborative crits.' }
  ];

  return (
    <div className="content-width">
      <div className="page-head">
        <div>
          <div className="eyebrow">BENCHMARK STUDIO · FLOW 4 (C-35 TO C-43)</div>
          <h1>Multi-Dimensional Skill Benchmarks</h1>
          <p>Objective psychometric and technical skill percentiles measured across 14,000+ verified product designers worldwide.</p>
        </div>
        <button className="primary-btn" onClick={() => notify('Cryptographic Benchmark PDF generated')} data-testid="button-download-benchmark-pdf">
          <Download size={15} /> Download Verified PDF
        </button>
      </div>

      {/* Hero Percentile Card */}
      <div className="panel benchmark-hero-panel">
        <div className="hero-gauge-section">
          <div className="gauge-circle">
            <span className="gauge-score">92<sup>nd</sup></span>
            <small>PERCENTILE</small>
          </div>
          <div className="gauge-copy">
            <div className="eyebrow">GLOBAL TALENT PERCENTILE</div>
            <h2>Top 8% of Senior UX Designers Worldwide</h2>
            <p>Your composite score of <strong>87/100</strong> places you above 92% of evaluated candidates across North America, Europe, and Asia.</p>
            <div className="gauge-signals-row">
              <span><CheckCircle2 size={14} /> 20/20 Scored Questions</span>
              <span><ShieldCheck size={14} /> Verified Signal Badge</span>
              <span><TrendingUp size={14} /> +6% from last quarter</span>
            </div>
          </div>
        </div>

        <div className="benchmark-pro-card">
          <div className="pro-head">
            <Sparkles size={16} />
            <strong>BENCHMARK PRO INSIGHTS</strong>
          </div>
          <p>Unlock company-specific hiring bars for Figma, Linear, Stripe, and Notion.</p>
          <button
            className={`pro-toggle-btn ${proActive ? 'active' : ''}`}
            onClick={() => { setProActive(v => !v); notify(proActive ? 'Switched to Standard View' : 'Benchmark Pro Insights Activated'); }}
          >
            {proActive ? '✓ Pro Active ($19/mo)' : 'Upgrade to Benchmark Pro'}
          </button>
        </div>
      </div>

      {/* 5-Dimensional Breakdown */}
      <div className="benchmark-section-heading">
        <div>
          <div className="eyebrow">TACTICAL COMPETENCIES</div>
          <h2>5-Dimensional Radar & Skill Breakdown</h2>
        </div>
      </div>

      <div className="dimension-list">
        {dimensions.map(dim => (
          <div key={dim.name} className="panel dimension-card" data-testid={`card-dimension-${dim.score}`}>
            <div className="dimension-top">
              <div>
                <h3>{dim.name}</h3>
                <p>{dim.desc}</p>
              </div>
              <div className="dimension-score-box">
                <span className="score-num">{dim.score}</span>
                <span className="percentile-tag">{dim.percentile}</span>
              </div>
            </div>
            <div className="dimension-track">
              <i style={{ width: `${dim.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Peer Distribution Visualizer */}
      <div className="panel peer-distribution-panel">
        <div className="section-head">
          <div>
            <div className="eyebrow">GLOBAL PEER COMPARISON</div>
            <h2>Percentile Distribution Curve</h2>
          </div>
          <span className="badge-pill">Evaluated Cohort: 14,280 Designers</span>
        </div>

        <div className="distribution-bars-container">
          <div className="curve-bar junior"><span className="bar-fill" style={{ height: '35%' }} /><small>Junior (0-2y)</small><b>48 avg</b></div>
          <div className="curve-bar mid"><span className="bar-fill" style={{ height: '58%' }} /><small>Mid (3-5y)</small><b>67 avg</b></div>
          <div className="curve-bar senior active-cohort"><span className="bar-fill" style={{ height: '88%' }} /><small>Senior (5-8y)</small><b>82 avg</b><div className="cohort-marker">You: 87</div></div>
          <div className="curve-bar staff"><span className="bar-fill" style={{ height: '94%' }} /><small>Staff / Lead (8y+)</small><b>91 avg</b></div>
        </div>
      </div>

      {/* Action Plan */}
      <div className="panel action-plan-panel">
        <div className="section-head">
          <div>
            <div className="eyebrow">ROADMAP TO 95TH PERCENTILE</div>
            <h2>Improvement Plan & Recommended Modules</h2>
          </div>
        </div>

        <div className="plan-steps-grid">
          <div className="plan-step-card">
            <span className="step-num">1</span>
            <h4>Advanced Design Token Architecture</h4>
            <p>Take the 15-minute token syntax test to raise your Systems score from 86% to 92%.</p>
            <button className="quiet-btn" onClick={() => notify('Opening Systems Module')}>
              Start Module <ArrowRight size={13} />
            </button>
          </div>
          <div className="plan-step-card">
            <span className="step-num">2</span>
            <h4>Executive Stakeholder Communication</h4>
            <p>Practice trade-off articulation scenarios with real engineering director prompts.</p>
            <button className="quiet-btn" onClick={() => notify('Opening Leadership Module')}>
              Start Module <ArrowRight size={13} />
            </button>
          </div>
          <div className="plan-step-card">
            <span className="step-num">3</span>
            <h4>Brand Challenge Verification</h4>
            <p>Submit to the Linear or Figma hackathon to gain live production validation.</p>
            <button className="quiet-btn" onClick={() => notify('Redirecting to Arcade')}>
              Explore Challenges <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
