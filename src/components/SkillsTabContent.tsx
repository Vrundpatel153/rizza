import React from 'react';
import { 
  Users, Search, Layout, Layers, MousePointer, Palette, 
  Sparkles, Target, ArrowRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SkillsTabContent: React.FC = () => {
  const { showToast } = useApp();

  const skills = [
    { name: 'User Experience Design', level: 'Expert', percentage: 88, icon: Users },
    { name: 'User Research', level: 'Expert', percentage: 82, icon: Search },
    { name: 'Wireframing & Prototyping', level: 'Advanced', percentage: 65, icon: Layout },
    { name: 'Design Systems', level: 'Advanced', percentage: 54, icon: Layers },
    { name: 'Interaction Design', level: 'Advanced', percentage: 58, icon: MousePointer },
    { name: 'Visual Design', level: 'Advanced', percentage: 64, icon: Palette },
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
      iconBg: 'bg-[#EDE9FE] text-[#5828F0]',
      icon: Sparkles
    },
    {
      title: 'ENFP',
      desc: 'Enthusiastic • Creative • Empathetic',
      iconBg: 'bg-[#DCFCE7] text-[#16A34A]',
      icon: Users
    },
    {
      title: 'Impact-Driven',
      desc: 'I care about solving the right problems.',
      iconBg: 'bg-[#FFEDD5] text-[#EA580C]',
      icon: Target
    }
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 2-Column Upper Grid: Skills & Strengths (Left) + Top Skills & What Defines Me (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
        {/* Left Column: Skills & Strengths (7 Cols) */}
        <div className="md:col-span-7">
          <div className="p-6 bg-white/90 backdrop-blur-2xl border border-white/95 rounded-[26px] shadow-[0_10px_30px_rgba(110,80,190,0.06)] h-full flex flex-col justify-between">
            <div>
              <div className="mb-5">
                <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                  Skills & strengths
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  My core skills and areas of expertise.
                </p>
              </div>

              {/* Skill Progress Bars List */}
              <div className="flex flex-col gap-4">
                {skills.map((s, idx) => {
                  const IconComp = s.icon;
                  return (
                    <div key={idx} className="group">
                      <div className="flex items-center justify-between text-[13.5px] mb-1">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#F4F1FD] text-[#5828F0] flex items-center justify-center transition-transform group-hover:scale-110">
                            <IconComp size={15} strokeWidth={2.2} />
                          </div>
                          <span className="font-semibold text-[#0F172A] group-hover:text-[#5828F0] transition-colors">
                            {s.name}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-[#64748B] tracking-wide">
                          {s.level}
                        </span>
                      </div>

                      {/* Progress Track */}
                      <div className="w-full h-[4px] bg-[#EFEBFB] rounded-full overflow-hidden ml-9.5 pr-9.5">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out bg-[#5828F0]"
                          style={{ width: `${s.percentage}%` }}
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
        <div className="md:col-span-5 flex flex-col gap-4">
          {/* Top Skills Card */}
          <div className="p-5 bg-white/90 backdrop-blur-2xl border border-white/95 rounded-[26px] shadow-[0_10px_30px_rgba(110,80,190,0.06)]">
            <h2 className="text-[15px] font-bold text-[#0F172A] tracking-tight mb-3">
              Top skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {topSkills.map((skill, i) => (
                <span
                  key={i}
                  onClick={() => showToast(`Filtered by skill: ${skill}`)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-[#F5F4FA] text-[#344054] border border-[#E8E6F0] hover:bg-white hover:border-[#D0CDE0] transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* What Defines Me Card */}
          <div className="p-5 bg-white/90 backdrop-blur-2xl border border-white/95 rounded-[26px] shadow-[0_10px_30px_rgba(110,80,190,0.06)]">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-[15px] font-bold text-[#0F172A] tracking-tight">
                What defines me
              </h2>
              <button
                onClick={() => showToast('Viewing personality insights')}
                className="text-xs font-semibold text-[#5828F0] hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {whatDefinesMe.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className={`w-8 h-8 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm mt-0.5`}>
                      <IconComp size={16} strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 className="text-[13.5px] font-bold text-[#0F172A] group-hover:text-[#5828F0] transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[11.5px] text-[#64748B] mt-0.5 leading-snug">
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
      <div className="p-6 relative overflow-hidden bg-white/90 backdrop-blur-2xl border border-white/95 rounded-[26px] shadow-[0_10px_30px_rgba(110,80,190,0.06)] flex items-center justify-between">
        <div className="relative z-10 max-w-[80%] flex items-start gap-3.5">
          <span className="text-[38px] font-serif text-[#5828F0] leading-none font-bold select-none mt-1">
            “
          </span>
          <div>
            <p className="text-[14.5px] font-medium text-[#0F172A] leading-relaxed">
              Design is not just what it looks like and feels like. Design is how it works.
            </p>
            <p className="text-xs font-semibold italic text-[#5828F0] mt-1.5 font-serif">
              — Steve Jobs
            </p>
          </div>
        </div>

        {/* Right Side 3D Purple Orb Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-[180px] pointer-events-none select-none opacity-90 overflow-hidden flex items-center justify-end pr-4">
          <img
            src="/assets/quote-orb-graphic.png"
            alt=""
            className="h-[110px] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};
