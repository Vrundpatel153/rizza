import React from 'react';
import { 
  ArrowLeft, ArrowRight, MoreHorizontal, Edit3, 
  Briefcase, Building2, Calendar, MapPin, Users, Clock, 
  FileText, Trophy, ShieldAlert, TrendingUp, BookOpen, CheckCircle, Lightbulb 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EmploymentDetailsData } from '../types';

export const EmploymentDetailsPage: React.FC = () => {
  const { 
    employmentData, 
    employmentStep, 
    setEmploymentStep, 
    openEditFieldModal, 
    setActiveView, 
    showToast 
  } = useApp();

  const steps = [
    { num: 1, name: 'Basics', icon: FileText },
    { num: 2, name: 'Successes', icon: Trophy },
    { num: 3, name: 'Challenges', icon: ShieldAlert },
    { num: 4, name: 'Growth', icon: TrendingUp },
    { num: 5, name: 'Learnings', icon: BookOpen },
    { num: 6, name: 'Summary', icon: CheckCircle },
  ];

  const fieldRows: { key: keyof EmploymentDetailsData; label: string; icon: any }[] = [
    { key: 'jobTitle', label: 'Job title', icon: Briefcase },
    { key: 'company', label: 'Company', icon: Building2 },
    { key: 'employmentType', label: 'Employment type', icon: Calendar },
    { key: 'location', label: 'Location', icon: MapPin },
    { key: 'reportsTo', label: 'Reports to', icon: Users },
    { key: 'teamSize', label: 'Team size', icon: Users },
    { key: 'workSchedule', label: 'Work schedule', icon: Clock },
  ];

  const handleContinue = () => {
    if (employmentStep < 6) {
      setEmploymentStep(employmentStep + 1);
      showToast(`Saved! Moving to Step ${employmentStep + 1}: ${steps[employmentStep].name}`);
    } else {
      showToast('All employment details verified and saved to profile!');
      setActiveView('profile-skills');
    }
  };

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-6 items-start">
      {/* Center Main Workspace */}
      <div className="min-w-0 w-full flex flex-col gap-6">
        {/* Top Header Card with Stepper */}
        <div className="rizza-card p-6 sm:p-7 bg-white/90 backdrop-blur-2xl border border-white/95 rounded-[28px] shadow-[0_8px_30px_-4px_rgba(112,66,248,0.06)]">
          {/* Header Title Row */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveView('profile-skills')}
                className="w-10 h-10 rounded-xl bg-[#F8F7FD] border border-white/90 text-[#475569] hover:text-[#5828F0] hover:bg-white flex items-center justify-center transition-all shadow-sm"
                title="Back to profile"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                  Employment details
                </h1>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Your career journey
                </p>
              </div>
            </div>

            <button
              onClick={() => showToast('Employment record options')}
              className="btn-icon-sq"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Stepper Steps (1 to 6) */}
          <div className="relative flex items-center justify-between gap-2 pt-2">
            {/* Connecting background line */}
            <div className="absolute top-[21px] left-6 right-6 h-[2px] bg-[#F0EDF9] z-0" />

            {steps.map((st) => {
              const IconComp = st.icon;
              const isActive = employmentStep === st.num;
              const isPast = employmentStep > st.num;
              return (
                <div
                  key={st.num}
                  onClick={() => setEmploymentStep(st.num)}
                  className="relative z-10 flex flex-col items-center cursor-pointer group flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-[#5828F0] text-white shadow-[0_4px_14px_rgba(88,40,240,0.35)] scale-110'
                        : isPast
                        ? 'bg-[#EDE9FE] text-[#5828F0]'
                        : 'bg-white border-2 border-[#ECE8F7] text-[#64748B] group-hover:border-[#D6D0F2]'
                    }`}
                  >
                    <IconComp size={16} strokeWidth={2.2} />
                  </div>
                  <span
                    className={`text-xs font-bold mt-2 ${
                      isActive ? 'text-[#5828F0]' : 'text-[#475569]'
                    }`}
                  >
                    {st.name}
                  </span>
                  <span className="text-[10px] text-[#64748B]">
                    Step {st.num} of 6
                  </span>
                  {isActive && (
                    <div className="w-6 h-0.5 bg-[#5828F0] rounded-full mt-1 animate-in zoom-in-50 duration-200" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 1. Basic Information Table Card */}
        <div className="rizza-card p-6 sm:p-7 bg-white/90 backdrop-blur-2xl border border-white/95 rounded-[28px] shadow-[0_8px_30px_-4px_rgba(112,66,248,0.06)] flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
              {employmentStep}. {steps[employmentStep - 1].name} information
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Tell us the essentials about this role.
            </p>
          </div>

          {/* Details Rows */}
          <div className="flex flex-col divide-y divide-[#F4F2FA]">
            {fieldRows.map((row) => {
              const IconComp = row.icon;
              const val = employmentData[row.key];
              return (
                <div
                  key={row.key}
                  className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#FAF9FE] px-2 rounded-2xl transition-colors group"
                >
                  <div className="flex items-center gap-3 w-1/3 text-xs font-semibold text-[#475569]">
                    <div className="w-8 h-8 rounded-xl bg-[#F4F1FD] text-[#5828F0] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <IconComp size={16} strokeWidth={2} />
                    </div>
                    <span>{row.label}</span>
                  </div>

                  <div className="flex-1 text-sm font-bold text-[#0F172A] truncate">
                    {val}
                  </div>

                  <button
                    onClick={() => openEditFieldModal(row.key, row.label)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#5828F0] hover:text-[#4314cc] px-2.5 py-1 rounded-lg hover:bg-[#F4F1FD] transition-all"
                  >
                    <span>Edit</span>
                    <Edit3 size={13} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="pt-4 border-t border-[#F4F2FA]">
            <button
              onClick={handleContinue}
              style={{ background: 'linear-gradient(135deg, #5828F0 0%, #461AD9 100%)' }}
              className="w-full text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(88,40,240,0.35)] hover:brightness-105 active:scale-95 transition-all"
            >
              <span>{employmentStep === 6 ? 'Finish & Save to Profile' : 'Continue'}</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column Contextual Rail */}
      <div className="w-full xl:w-[440px] flex-shrink-0 flex flex-col gap-6">
        {/* Make Your Experience Stand Out Card with 3D Illustration */}
        <div className="rizza-card p-6 bg-white/90 backdrop-blur-2xl border border-white/95 rounded-[28px] shadow-[0_8px_30px_-4px_rgba(112,66,248,0.06)] relative overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="max-w-[70%]">
              <h3 className="text-base font-bold text-[#0F172A] leading-snug">
                Make your experience <span className="text-[#5828F0]">stand out</span>
              </h3>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                Adding detailed and accurate information helps others understand your journey and discover opportunities.
              </p>
            </div>

            {/* 3D Illustration */}
            <div className="w-[110px] h-[95px] pointer-events-none select-none overflow-hidden -mt-2 -mr-2">
              <img
                src="/assets/employment-3d-graphic.png"
                alt=""
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* Guidance Cards List */}
          <div className="flex flex-col gap-3">
            <div className="p-3.5 rounded-2xl bg-[#F8F7FD] border border-white/90 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#EDE9FE] text-[#5828F0] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lightbulb size={14} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">Be clear and specific</h4>
                <p className="text-[11px] text-[#64748B] mt-0.5">Use your actual job title, company name and time period.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8F7FD] border border-white/90 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#EDE9FE] text-[#5828F0] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Users size={14} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">Highlight your context</h4>
                <p className="text-[11px] text-[#64748B] mt-0.5">Mention team size, reporting manager and work setup.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8F7FD] border border-white/90 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#EDE9FE] text-[#5828F0] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock size={14} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">Keep it up to date</h4>
                <p className="text-[11px] text-[#64748B] mt-0.5">An updated profile helps you get better opportunities.</p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-5 pt-4 border-t border-[#F5F3FB] flex items-start gap-2.5">
            <span className="text-2xl font-serif text-[#5828F0] leading-none font-bold select-none">
              “
            </span>
            <p className="text-xs italic text-[#475569] leading-relaxed">
              "Your career journey is a story of growth, impact and learning. Keep building it."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
