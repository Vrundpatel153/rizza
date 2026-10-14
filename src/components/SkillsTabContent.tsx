import React from 'react';
import { 
  Users, Search, Layout, Layers, MousePointer, Palette, 
  Sparkles, Target, ArrowRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SkillsTabContent: React.FC = () => {
  const { showToast } = useApp();

  const skills = [
    { name: 'User Experience Design', level: 'Expert', percentage: 95, icon: Users },
    { name: 'User Research', level: 'Expert', percentage: 92, icon: Search },
    { name: 'Wireframing & Prototyping', level: 'Advanced', percentage: 80, icon: Layout },
    { name: 'Design Systems', level: 'Advanced', percentage: 85, icon: Layers },
    { name: 'Interaction Design', level: 'Advanced', percentage: 78, icon: MousePointer },
    { name: 'Visual Design', level: 'Advanced', percentage: 82, icon: Palette },
  ];

  const topSkills = [
    'Product Design', 'Figma', 'UX Research',
    'Design Systems', 'Prototyping', 'User Testing',
    'Interaction Design', 'Visual Design'
  ];

  const whatDefinesMe = [
    {
      title: 'The Builder',
      desc: 'I turn ideas into intuitive, scalable solutions.',
      iconBg: 'bg-[#ede9fe] text-[#5828F0]',
      icon: Sparkles
    },
    {
      title: 'ENFP',
      desc: 'Enthusiastic • Creative • Empathetic',
      iconBg: 'bg-[#dcfce7] text-[#16a34a]',
      icon: Users
    },
    {
      title: 'Impact-Driven',
      desc: 'I care about solving the right problems.',
      iconBg: 'bg-[#ffedd5] text-[#ea580c]',
      icon: Target
    }
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* 2-Column Upper Grid: Skills & Strengths (Left) + Top Skills & What Defines Me (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full">
        {/* Left Column: Skills & Strengths (7 Cols) */}
        <div className="md:col-span-7">
          <div className="rizza-card p-6 sm:p-7 bg-white/90 backdrop-blur-2xl border border-white/95 rounded-[28px] shadow-[0_8px_30px_-4px_rgba(112,66,248,0.06)] h-full flex flex-col justify-between">
            <div>
              <div className="mb-5">
                <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                  Skills & strengths
                </h2>
                <p className="text-sm text-[#64748B] mt-0.5">
                  My core skills and areas of expertise.
                </p>
              </div>

              {/* Skill Progress Bars List */}
              <div className="flex flex-col gap-4">
                {skills.map((s, idx) => {
                  const IconComp = s.icon;
                  return (
                    <div key={idx} className="group">
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-[#F4F1FD] text-[#5828F0] flex items-center justify-center transition-transform group-hover:scale-110">
                            <IconComp size={16} strokeWidth={2.2} />
                          </div>
                          <span className="font-medium text-[#0F172A] group-hover:text-[#5828F0] transition-colors">
                            {s.name}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-[#64748B] tracking-wide">
                          {s.level}
                        </span>
                      </div>

                      {/* Progress Track */}
                      <div className="w-full h-1 bg-[#EBE7F7] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${s.percentage}%`, backgroundColor: '#5828F0' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Top Skills & What Defines Me (5 Cols) */}
        <div className="md:col-span-5 flex flex-col gap-5">
          {/* Top Skills Card */}
          <div className="rizza-card p-5 sm:p-6 bg-white/90 backdrop-blur-2xl border border-white/95 rounded-[28px] shadow-[0_8px_30px_-4px_rgba(112,66,248,0.06)]">
            <h2 className="text-base font-bold text-[#0F172A] tracking-tight mb-3.5">
              Top skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {topSkills.map((skill, i) => (
                <span
                  key={i}
                  onClick={() => showToast(`Filtered by skill: ${skill}`)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#F4F1FD] text-[#4F46E5] border border-[#DDD6FE] hover:bg-[#EDE9FE] transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* What Defines Me Card */}
          <div className="rizza-card p-5 sm:p-6 bg-white/90 backdrop-blur-2xl border border-white/95 rounded-[28px] shadow-[0_8px_30px_-4px_rgba(112,66,248,0.06)]">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
                What defines me
              </h2>
              <button
                onClick={() => showToast('Viewing personality insights')}
                className="text-xs font-semibold text-[#5828F0] hover:underline inline-flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="flex flex-col gap-3.5">
              {whatDefinesMe.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm`}>
                      <IconComp size={17} strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#5828F0] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Steve Jobs Quote Card with 3D Purple Graphic */}
      <div className="rizza-card p-6 sm:p-7 relative overflow-hidden bg-white/90 backdrop-blur-2xl border border-white/95 rounded-[28px] shadow-[0_8px_30px_-4px_rgba(112,66,248,0.06)] flex items-center justify-between">
        <div className="relative z-10 max-w-[85%]">
          <div className="flex items-start gap-3.5">
            <span className="text-4xl font-serif text-[#5828F0] leading-none font-bold select-none">
              “
            </span>
            <div>
              <p className="text-[15px] font-medium text-[#0F172A] leading-relaxed">
                Design is not just what it looks like and feels like. Design is how it works.
              </p>
              <p className="text-sm font-semibold italic text-[#5828F0] mt-2">
                — Steve Jobs
              </p>
            </div>
          </div>
        </div>

        {/* Right Side 3D Purple Orb Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-[140px] pointer-events-none select-none opacity-90 overflow-hidden">
          <img
            src="/assets/quote-orb-graphic.png?v=3"
            alt=""
            className="w-full h-full object-cover object-right"
          />
        </div>
      </div>
    </div>
  );
};
