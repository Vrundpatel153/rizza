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
    <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 items-start">
      {/* Center Main Workspace */}
      <div className="min-w-0 w-full flex flex-col gap-4">
        {/* Top Header Card with Stepper */}
        <div className="p-6 relative overflow-hidden bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)]">
          {/* Header Title Row */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveView('profile-skills')}
                className="w-9 h-9 rounded-full bg-[#F4F1FD] text-[#475569] hover:text-[#5828F0] hover:bg-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
                title="Back to profile"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <h1 className="text-xl sm:text-[22px] font-bold text-[#0F172A] tracking-tight">
                  Employment details
                </h1>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Your career journey
                </p>
              </div>
            </div>

            <button
              onClick={() => showToast('Employment options')}
              className="w-9 h-9 rounded-full bg-white border border-[#EAE5F5] shadow-sm flex items-center justify-center text-[#475569] hover:text-[#5828F0] hover:border-[#D6D0F2] transition-all cursor-pointer"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Stepper Steps (1 to 6) */}
          <div className="relative flex items-center justify-between gap-2 pt-2 overflow-x-auto no-scrollbar pb-1">
            {/* Connecting background line */}
            <div className="absolute top-[20px] left-8 right-8 h-[2px] bg-[#EBE7F7] z-0 min-w-[450px]" />

            {steps.map((st) => {
              const IconComp = st.icon;
              const isActive = employmentStep === st.num;
              const isPast = employmentStep > st.num;
              return (
                <div
                  key={st.num}
                  onClick={() => setEmploymentStep(st.num)}
                  className="relative z-10 flex flex-col items-center cursor-pointer group min-w-[70px] flex-1"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'btn-primary-purple ring-4 ring-white'
                        : isPast
                        ? 'bg-[#EDE9FE] text-[#5828F0] ring-4 ring-white'
                        : 'bg-white text-[#94A3B8] border border-[#E2DAFC] group-hover:border-[#5828F0]'
                    }`}
                  >
                    <IconComp size={15} strokeWidth={2.2} />
                  </div>
                  <span
                    className={`text-xs mt-2 font-semibold transition-colors ${
                      isActive ? 'text-[#5828F0]' : 'text-[#64748B] group-hover:text-[#0F172A]'
                    }`}
                  >
                    {st.name}
                  </span>
                  <span className="text-[10px] text-[#94A3B8]">
                    Step {st.num} of 6
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Basic Information Card (7 Details Rows) */}
        <div className="p-6 sm:p-7 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col gap-4">
          <div>
            <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
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
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 hover:bg-[#FAF9FE] px-2 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-3 sm:w-1/3 min-w-[120px] text-xs font-semibold text-[#475569]">
                    <div className="w-7 h-7 rounded-lg bg-[#F4F1FD] text-[#5828F0] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <IconComp size={14} strokeWidth={2} />
                    </div>
                    <span>{row.label}</span>
                  </div>

                  <div className="flex-1 flex items-center justify-between sm:justify-start gap-4">
                    <div className="text-xs font-bold text-[#0F172A] truncate">
                      {val}
                    </div>

                    <button
                      onClick={() => openEditFieldModal(row.key, row.label)}
                      className="flex items-center gap-1.5 text-xs font-bold text-[#5828F0] hover:text-[#4314cc] px-2.5 py-1 rounded-lg hover:bg-[#F4F1FD] transition-all cursor-pointer ml-auto"
                    >
                      <span>Edit</span>
                      <Edit3 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="pt-3 border-t border-[#F1EDF9]">
            <button
              onClick={handleContinue}
              className="w-full btn-primary-purple py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <span>{employmentStep === 6 ? 'Finish & Save to Profile' : 'Continue'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column Contextual Rail */}
      <div className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-4">
        {/* Make Your Experience Stand Out Card with 3D Illustration */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] relative overflow-hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-[16px] font-bold text-[#0F172A] leading-snug">
                Make your experience <span className="text-[#5828F0]">stand out</span>
              </h3>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                Adding detailed and accurate information helps others understand your journey and discover opportunities.
              </p>
            </div>

            {/* Seamless 3D Illustration */}
            <div className="w-[85px] h-[80px] pointer-events-none select-none overflow-hidden flex items-center justify-end flex-shrink-0">
              <img
                src="/assets/employment-3d-graphic.png"
                alt=""
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Guidance Tips Card */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] text-[#5828F0] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
              <Lightbulb size={15} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0F172A]">Be clear and specific</h4>
              <p className="text-[11.5px] text-[#64748B] mt-0.5 leading-relaxed">Use your actual job title, company name and time period.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] text-[#5828F0] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
              <Users size={15} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0F172A]">Highlight your context</h4>
              <p className="text-[11.5px] text-[#64748B] mt-0.5 leading-relaxed">Mention team size, reporting manager and work setup.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] text-[#5828F0] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
              <Clock size={15} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0F172A]">Keep it up to date</h4>
              <p className="text-[11.5px] text-[#64748B] mt-0.5 leading-relaxed">An updated profile helps you get better opportunities.</p>
            </div>
          </div>
        </div>

        {/* Motivational Quote Card */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex items-start gap-3">
          <span className="text-2xl font-serif text-[#5828F0] leading-none font-bold select-none mt-0.5">
            “
          </span>
          <div>
            <p className="text-xs font-medium text-[#475569] leading-relaxed italic">
              "Your career journey is a story of growth, impact and learning. Keep building it."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
