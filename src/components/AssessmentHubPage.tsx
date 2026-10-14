import React from 'react';
import { 
  Award, CheckCircle2, Clock, ArrowRight, Play, 
  BarChart2, ShieldCheck, Sparkles, BookOpen, Star 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AssessmentHubPage: React.FC = () => {
  const { setActiveView, showToast } = useApp();

  const activeAssessments = [
    {
      id: 'senior-ux',
      title: 'Senior UX Designer Benchmark',
      role: 'Figma',
      category: 'Technical & Case Study',
      duration: '35 mins',
      questions: '20 Questions',
      progress: 60,
      status: 'In Progress',
      badge: 'Level 4 / Senior',
      description: 'Comprehensive evaluation covering interaction design, design systems architecture, usability evaluation, and complex onboarding flow design.',
      route: 'assessment-mcq' as const
    },
    {
      id: 'culture-fit',
      title: 'Culture & Collaboration DNA',
      role: 'Multi-Employer Standard',
      category: 'Behavioral Fit',
      duration: '20 mins',
      questions: '15 Scenarios',
      progress: 100,
      status: 'Completed',
      badge: 'Score: 94/100',
      description: 'Measures empathy, conflict resolution, asynchronous communication, and ownership mindset in high-autonomy teams.',
      route: 'score-benchmark' as const
    },
    {
      id: 'design-systems',
      title: 'Design Systems & Token Architecture',
      role: 'Stripe & Linear',
      category: 'Specialized Track',
      duration: '25 mins',
      questions: '12 Scenarios',
      progress: 100,
      status: 'Verified Badge',
      badge: 'Top 2% Globally',
      description: 'Component architecture, semantic tokens, WCAG 2.1 AA accessibility compliance, and developer handoff best practices.',
      route: 'score-benchmark' as const
    }
  ];

  const earnedBadges = [
    { name: 'Figma Master', category: 'Tooling', icon: '❖', color: 'bg-[#EDE9FE] text-[#5828F0]', date: 'Verified Oct 2026' },
    { name: 'UX Research Lead', category: 'Methodology', icon: '🔍', color: 'bg-[#E0F2FE] text-[#0284C7]', date: 'Verified Sep 2026' },
    { name: 'Design Systems Architect', category: 'Engineering', icon: '📦', color: 'bg-[#DCFCE7] text-[#16A34A]', date: 'Verified Aug 2026' },
    { name: 'Interaction Specialist', category: 'Prototyping', icon: '✨', color: 'bg-[#FEF3C7] text-[#D97706]', date: 'Verified Jul 2026' },
  ];

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 items-start">
      {/* Center Main Assessment Hub */}
      <div className="min-w-0 w-full flex flex-col gap-4">
        {/* Banner Card */}
        <div className="p-6 sm:p-7 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#5828F0] text-xs font-semibold mb-2">
              <ShieldCheck size={14} />
              <span>Multi-Dimensional Testing Engine (C-22)</span>
            </div>
            <h1 className="text-xl sm:text-[24px] font-bold text-[#0F172A] tracking-tight">
              Assessment Hub &amp; Skill Verification
            </h1>
            <p className="text-xs text-[#64748B] mt-1 max-w-xl">
              Take verified benchmarks to validate your core expertise. Scores are cryptographically attached to your profile and prioritized by top employers.
            </p>
          </div>

          <button
            onClick={() => setActiveView('assessment-mcq')}
            className="px-5 py-2.5 rounded-xl bg-[#5828F0] hover:bg-[#4D1FE0] text-white text-xs font-bold flex items-center gap-2 shadow-[0_4px_14px_rgba(88,40,240,0.35)] cursor-pointer self-start sm:self-auto transition-all"
          >
            <span>Resume Current Test</span>
            <Play size={13} className="fill-white" />
          </button>
        </div>

        {/* Assessment Modules List */}
        <div className="flex flex-col gap-3.5">
          {activeAssessments.map(item => (
            <div
              key={item.id}
              className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] hover:border-[#D6D0F2] transition-all flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF9FE] text-[#5828F0] border border-[#ECE7F8]">
                      {item.category}
                    </span>
                    <span className="text-xs text-[#64748B]">• {item.role}</span>
                  </div>
                  <h2 className="text-[17px] font-bold text-[#0F172A] mt-1.5 leading-tight">
                    {item.title}
                  </h2>
                </div>

                <div className="px-3 py-1 rounded-full bg-[#F8F7FD] border border-[#ECE7F8] text-xs font-bold text-[#0F172A] flex-shrink-0">
                  {item.badge}
                </div>
              </div>

              <p className="text-xs text-[#475569] leading-relaxed">
                {item.description}
              </p>

              {/* Progress and Stats */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#0F172A]">Completion Progress</span>
                  <span className="font-bold text-[#5828F0]">{item.progress}%</span>
                </div>
                <div className="w-full h-2 bg-[#F1EDF9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#5828F0] rounded-full transition-all duration-500" style={{ width: `${item.progress}%` }} />
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#ECE7F8] text-xs">
                <div className="flex items-center gap-4 text-[#64748B]">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>{item.duration}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={13} />
                    <span>{item.questions}</span>
                  </span>
                </div>

                <button
                  onClick={() => {
                    setActiveView(item.route);
                    showToast(`Opening ${item.title}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#5828F0] hover:bg-[#4D1FE0] text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span>{item.progress === 100 ? 'View Benchmark' : 'Continue Assessment'}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column Rail */}
      <div className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-4">
        {/* Verified Skill Badges Card */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-bold text-[#0F172A] tracking-tight">
              Verified Badges
            </h3>
            <span className="text-xs font-bold text-[#5828F0]">4 Earned</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {earnedBadges.map((badge, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-[#F8F7FD] border border-[#ECE7F8] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl ${badge.color} flex items-center justify-center font-bold text-sm shadow-sm`}>
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A] leading-tight">{badge.name}</h4>
                    <p className="text-[10.5px] text-[#64748B]">{badge.category}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Global Percentile Snapshot */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-[14px] font-bold text-[#0F172A]">Benchmark Studio</h4>
            <span className="text-xs font-bold text-[#5828F0]">C-35</span>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Your combined score across all verified assessments is in the 96th percentile worldwide.
          </p>
          <button
            onClick={() => setActiveView('score-benchmark')}
            className="w-full py-2.5 rounded-xl bg-[#F8F7FD] border border-[#ECE7F8] hover:bg-[#F3EFFC] text-xs font-bold text-[#5828F0] transition-colors cursor-pointer"
          >
            Open Score &amp; Benchmark Studio
          </button>
        </div>
      </div>
    </div>
  );
};
