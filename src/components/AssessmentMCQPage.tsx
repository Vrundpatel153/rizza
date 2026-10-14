import React from 'react';
import { 
  ChevronLeft, ArrowRight, ArrowLeft, Check, Lock, 
  HelpCircle, Lightbulb, Briefcase, BarChart2, Users, FileText, Clock, Star, Target 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AssessmentMCQPage: React.FC = () => {
  const { assessmentMCQ, selectMCQOption, setActiveView, showToast } = useApp();

  const options = [
    { text: 'Add more tooltips and instructional text on each step.' },
    { text: 'Break the flow into smaller steps, reduce cognitive load and test with real users.' },
    { text: 'Remove optional steps to make it shorter for all users.' },
    { text: 'Make the flow visually engaging with animations and illustrations.' },
  ];

  const handleNext = () => {
    setActiveView('assessment-subjective');
    showToast('Question 4 saved! Moving to subjective evaluation...');
  };

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 items-start">
      {/* Center Main Workspace - Single Unified Card Matching Reference Exactly */}
      <div className="min-w-0 w-full p-6 sm:p-7 pb-8 relative overflow-visible bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col gap-5">
        {/* Top Header Section */}
        <div>
          {/* Back link */}
          <button
            onClick={() => setActiveView('profile-skills')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#5828F0] mb-3 transition-colors cursor-pointer"
          >
            <ChevronLeft size={15} />
            <span>Back to profile</span>
          </button>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
                Technical <span className="text-[#5828F0]">Assessment</span>
              </h1>
              <p className="text-xs font-semibold text-[#64748B] mt-1">
                Senior UX Designer <span className="mx-1 text-[#C4B5FD]">•</span> Figma
              </p>
            </div>

            {/* Seamless 3D Assessment Graphic */}
            <div className="relative w-[150px] h-[95px] flex-shrink-0 flex items-center justify-end pointer-events-none select-none">
              <div className="absolute inset-0 bg-radial from-[#8B5CF6]/20 via-[#C4B5FD]/10 to-transparent blur-xl" />
              <img
                src="/assets/assessment-mcq-illustration.png"
                alt=""
                className="relative z-10 h-full w-auto object-contain object-right"
              />
            </div>
          </div>

          {/* Segmented Progress Capsules */}
          <div className="flex items-center justify-between gap-4 mt-4 pt-3.5 border-t border-[#F1EDF9]">
            <div className="flex items-center gap-1.5 flex-1 max-w-[420px]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    i < 4
                      ? 'progress-capsule-active'
                      : 'bg-[#EDEAF7]'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-[#475467] whitespace-nowrap">
              Question 4 of 20
            </span>
          </div>
        </div>

        {/* Question Details */}
        <div className="flex flex-col gap-2 pt-1 border-t border-[#F1EDF9]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#5828F0] text-xs font-semibold self-start">
            <span className="text-xs">☑</span>
            <span>Multiple Choice</span>
          </div>

          <h2 className="text-[17px] sm:text-[18px] font-bold text-[#0F172A] leading-snug mt-1">
            Which of the following is the best approach to improve the usability of a complex onboarding flow?
          </h2>
          <p className="text-xs text-[#64748B]">
            Choose the most appropriate answer.
          </p>
        </div>

        {/* Options List */}
        <div className="flex flex-col gap-2.5">
          {options.map((opt, idx) => {
            const isSelected = assessmentMCQ.selectedOptionIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => selectMCQOption(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 select-none ${
                  isSelected
                    ? 'bg-[#FAF8FE] border-[#5828F0] shadow-[0_4px_16px_rgba(88,40,240,0.1)] ring-1 ring-[#5828F0]'
                    : 'bg-[#FAFAFE] border-[#ECE7F8] hover:border-[#D4CEEF] hover:bg-white'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'border-[#5828F0] bg-[#5828F0]'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className={`text-[13.5px] font-medium leading-relaxed ${
                    isSelected ? 'text-[#0F172A] font-semibold' : 'text-[#334155]'
                  }`}
                >
                  {opt.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Tip Card */}
        <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-[#ECE7F8] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] text-[#5828F0] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Lightbulb size={17} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0F172A]">Tip</p>
            <p className="text-xs text-[#64748B] mt-0.5">
              Think about the user experience and what creates clarity and ease.
            </p>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#F1EDF9]">
          <button
            onClick={() => setActiveView('profile-skills')}
            className="px-6 py-2.5 rounded-xl border border-[#EAE5F5] bg-white text-[#475467] font-semibold text-xs hover:bg-[#F8F7FD] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="px-8 py-2.5 rounded-xl btn-primary-purple font-semibold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Next</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Right Rail Contextual Info */}
      <div className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-4">
        {/* Assessment Overview Card */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)]">
          <h3 className="text-[16px] font-bold text-[#0F172A] tracking-tight mb-1">
            Assessment overview
          </h3>
          <p className="text-xs text-[#64748B] mb-4">
            Here are the key details about this assessment.
          </p>

          <div className="flex flex-col gap-3">
            {[
              { icon: Briefcase, label: 'Role', value: 'Senior UX Designer' },
              { icon: BarChart2, label: 'Expertise level', value: 'Mid–Senior Level' },
              { icon: Users, label: 'Experience benchmark', value: '3 – 6 years' },
              { icon: FileText, label: 'Assessment format', value: 'Multiple choice & scenario' },
              { icon: Clock, label: 'Estimated time', value: '30 – 35 minutes' },
              { icon: Star, label: "What you'll get", value: 'Skill insights & strengths' }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-[#F5F3FB] last:border-0">
                  <div className="flex items-center gap-2.5 text-[#64748B]">
                    <div className="w-6 h-6 rounded-md bg-[#F4F1FD] text-[#5828F0] flex items-center justify-center flex-shrink-0">
                      <IconComp size={13} />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <span className="font-semibold text-[#0F172A] text-right truncate max-w-[150px]">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Your Progress */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-[#0F172A]">Your progress</span>
            <span className="text-[#64748B]">4 / 20 completed (20%)</span>
          </div>
          <div className="w-full h-2 bg-[#EFEBFB] rounded-full overflow-hidden">
            <div className="w-[20%] h-full bg-[#5828F0] rounded-full" />
          </div>
        </div>

        {/* Auto-saved notification */}
        <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <Lock size={15} />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-950">Your progress is saved automatically</p>
            <p className="text-[11px] text-emerald-700 mt-0.5">You can pause and continue anytime.</p>
          </div>
        </div>

        {/* Why this matters */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#5828F0] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
            <Target size={18} />
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[#0F172A]">Why this matters</h4>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              This helps us understand how you solve real world problems and apply your knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
