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
          <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] h-full flex flex-col justify-between">
            <div>
              <div className="mb-5">
                <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                  Skills & strengths
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  My core skills and areas of expertise.
                </p>
              </div>

              {/* Skill Progress Bars List matching ref_center.png */}
              <div className="flex flex-col gap-4">
                {skills.map((s, idx) => {
                  const IconComp = s.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3.5 group">
                      <div className="w-9 h-9 rounded-full bg-[#F4F1FD] text-[#5828F0] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                        <IconComp size={16} strokeWidth={2.2} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[13.5px] mb-1">
                          <span className="font-semibold text-[#0F172A] group-hover:text-[#5828F0] transition-colors truncate">
                            {s.name}
                          </span>
                          <span className="text-xs font-medium text-[#64748B] tracking-wide ml-2 flex-shrink-0">
                            {s.level}
                          </span>
                        </div>

                        {/* Solid Purple Progress Bar */}
                        <div className="w-full h-[5px] bg-[#EFEBFB] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out bg-[#5828F0]"
                            style={{ width: `${s.percentage}%` }}
                          />
                        </div>
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
          <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)]">
            <h2 className="text-[16px] font-bold text-[#0F172A] tracking-tight mb-3.5">
              Top skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {topSkills.map((skill, i) => (
                <span
                  key={i}
                  onClick={() => showToast(`Filtered by skill: ${skill}`)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#F4F3F8] text-[#344054] border border-[#E8E6F0] hover:bg-white hover:border-[#D0CDE0] transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* What Defines Me Card */}
          <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-bold text-[#0F172A] tracking-tight">
                What defines me
              </h2>
              <button
                onClick={() => showToast('Viewing personality insights')}
                className="text-xs font-semibold text-[#5828F0] hover:underline flex items-center gap-1 cursor-pointer"
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
                    <div className={`w-9 h-9 rounded-full ${item.iconBg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 shadow-sm mt-0.5`}>
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
      <div className="p-5 sm:p-6 relative overflow-hidden bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex items-center justify-between">
        <div className="relative z-10 max-w-[85%] sm:max-w-[80%] flex items-start gap-3 sm:gap-3.5">
          <span className="text-[32px] sm:text-[38px] font-serif text-[#5828F0] leading-none font-bold select-none mt-1">
            “
          </span>
          <div>
            <p className="text-[13px] sm:text-[14.5px] font-medium text-[#0F172A] leading-relaxed">
              Design is not just what it looks like and feels like. Design is how it works.
            </p>
            <p className="text-xs font-semibold italic text-[#5828F0] mt-1.5 font-serif">
              — Steve Jobs
            </p>
          </div>
        </div>

        {/* Right Side 3D Purple Orb Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-[140px] sm:w-[180px] pointer-events-none select-none opacity-80 sm:opacity-90 overflow-hidden flex items-center justify-end pr-2 sm:pr-4">
          <img
            src="/assets/quote-orb-graphic.png"
            alt=""
            className="h-[80px] sm:h-[110px] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};
