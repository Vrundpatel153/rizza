import React from 'react';
import { 
  Users, Search, Layout, Layers, MousePointer, Palette, 
  Sparkles, Compass, Target, ArrowRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SkillsTabContent: React.FC = () => {
  const { showToast } = useApp();

  const skills = [
    { name: 'User Experience Design', level: 'Expert', percentage: 95, icon: Users },
    { name: 'User Research', level: 'Expert', percentage: 90, icon: Search },
    { name: 'Wireframing & Prototyping', level: 'Advanced', percentage: 80, icon: Layout },
    { name: 'Design Systems', level: 'Advanced', percentage: 85, icon: Layers },
    { name: 'Interaction Design', level: 'Advanced', percentage: 80, icon: MousePointer },
    { name: 'Visual Design', level: 'Advanced', percentage: 85, icon: Palette },
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
      iconBg: 'bg-[#ede9fe] text-[#5832E6]',
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      {/* Left Column: Skills & Strengths (7 Cols) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {/* Skills Card */}
        <div className="rizza-card p-6 sm:p-7 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#111625] tracking-tight">
              Skills & strengths
            </h2>
            <p className="text-sm text-[#7E88A2] mt-0.5">
              My core skills and areas of expertise.
            </p>
          </div>

          {/* Skill Progress Bars List */}
          <div className="flex flex-col gap-5">
            {skills.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#F4F1FF] text-[#5832E6] flex items-center justify-center transition-transform group-hover:scale-110">
                        <IconComp size={16} strokeWidth={2} />
                      </div>
                      <span className="font-medium text-[#111625] group-hover:text-[#5832E6] transition-colors">
                        {s.name}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-[#7E88A2] tracking-wide">
                      {s.level}
                    </span>
                  </div>

                  {/* Progress Track */}
                  <div className="w-full h-2 bg-[#F0EDFB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#5832E6] to-[#431ECB] rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(88,50,230,0.3)]"
                      style={{ width: `${s.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Steve Jobs Quote Card with 3D Purple Graphic */}
        <div className="rizza-card p-6 sm:p-7 relative overflow-hidden bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)] flex items-center justify-between">
          <div className="relative z-10 max-w-[80%]">
            <div className="flex items-start gap-3">
              <span className="text-3xl font-serif text-[#5832E6] leading-none font-bold select-none">
                “
              </span>
              <div>
                <p className="text-[14.5px] font-medium text-[#111625] leading-snug">
                  Design is not just what it looks like and feels like. Design is how it works.
                </p>
                <p className="text-sm font-semibold italic text-[#5832E6] mt-2">
                  — Steve Jobs
                </p>
              </div>
            </div>
          </div>

          {/* Right Side 3D Purple Orb Graphic */}
          <div className="absolute right-0 top-0 bottom-0 w-[140px] pointer-events-none select-none opacity-90 overflow-hidden">
            <img
              src="/assets/quote-orb-graphic.png"
              alt=""
              className="w-full h-full object-cover object-right"
            />
          </div>
        </div>
      </div>

      {/* Right Column: Top Skills & What Defines Me (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Top Skills Card */}
        <div className="rizza-card p-6 sm:p-7 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
          <h2 className="text-base font-bold text-[#111625] tracking-tight mb-4">
            Top skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill, i) => (
              <span
                key={i}
                onClick={() => showToast(`Filtered by skill: ${skill}`)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-[#F4F2FC] text-[#47516B] border border-[#EDE9F8] hover:bg-[#EAE5FA] hover:text-[#5832E6] hover:border-[#DCD4F7] transition-all cursor-pointer shadow-sm active:scale-95"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* What Defines Me Card */}
        <div className="rizza-card p-6 sm:p-7 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#111625] tracking-tight">
              What defines me
            </h2>
            <button
              onClick={() => showToast('Viewing personality insights')}
              className="text-xs font-semibold text-[#5832E6] hover:underline inline-flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {whatDefinesMe.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-start gap-3.5 group">
                  <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm`}>
                    <IconComp size={17} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111625] group-hover:text-[#5832E6] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#7E88A2] mt-0.5 leading-relaxed">
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
  );
};
