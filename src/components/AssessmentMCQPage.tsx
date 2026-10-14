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
    <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-6 items-start">
      {/* Center Main Workspace */}
      <div className="min-w-0 w-full flex flex-col gap-6">
        {/* Assessment Header Card with 3D Illustration */}
        <div className="rizza-card p-6 sm:p-7 relative overflow-hidden bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
          {/* Back link */}
          <button
            onClick={() => setActiveView('profile-skills')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7E88A2] hover:text-[#5832E6] mb-3 transition-colors"
          >
            <ChevronLeft size={15} />
            <span>Back to profile</span>
          </button>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-[28px] font-bold text-[#111625] tracking-tight">
                Technical <span className="text-[#5832E6]">Assessment</span>
              </h1>
              <p className="text-sm font-semibold text-[#7E88A2] mt-1">
                Senior UX Designer <span className="mx-1 text-[#C4B5FD]">•</span> Figma
              </p>
            </div>

            {/* 3D Assessment Graphic */}
            <div className="w-[170px] sm:w-[210px] h-[100px] pointer-events-none select-none overflow-hidden -mt-2 -mr-2">
              <img
                src="/assets/assessment-mcq-illustration.png"
                alt=""
                className="w-full h-full object-contain object-right-top"
              />
            </div>
          </div>

          {/* Segmented Progress Capsules */}
          <div className="flex items-center justify-between gap-4 mt-6 pt-5 border-t border-[#F4F2FA]">
            <div className="flex items-center gap-1.5 flex-1 max-w-[420px]">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    i < 4
                      ? 'bg-gradient-to-r from-[#5832E6] to-[#431ECB] shadow-[0_0_8px_rgba(88,50,230,0.3)]'
                      : 'bg-[#EDEAF7]'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-[#47516B] whitespace-nowrap">
              Question 4 of 20
            </span>
          </div>
        </div>

        {/* Question & Options Card */}
        <div className="rizza-card p-6 sm:p-7 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)] flex flex-col gap-6">
          {/* Question Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EDE9FE] text-[#5832E6] text-xs font-bold self-start">
            <span>☑</span>
            <span>Multiple Choice</span>
          </div>

          {/* Question Title */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111625] leading-snug">
              Which of the following is the best approach to improve the usability of a complex onboarding flow?
            </h2>
            <p className="text-sm text-[#7E88A2] mt-1.5">
              Choose the most appropriate answer.
            </p>
          </div>

          {/* Options List */}
          <div className="flex flex-col gap-3">
            {options.map((opt, idx) => {
              const isSelected = assessmentMCQ.selectedOptionIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => selectMCQOption(idx)}
                  className={`p-4 sm:p-4.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 group ${
                    isSelected
                      ? 'bg-[#F6F3FE] border-[#5832E6] shadow-[0_4px_16px_rgba(88,50,230,0.12)]'
                      : 'bg-white border-[#ECE8F7] hover:border-[#D6D0F2] hover:bg-[#FAF9FE]'
                  }`}
                >
                  {/* Radio Dot */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected
                        ? 'border-[#5832E6] bg-white shadow-sm'
                        : 'border-[#CBD2E0] group-hover:border-[#5832E6]'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#5832E6] animate-in zoom-in-50 duration-200" />
                    )}
                  </div>

                  <span
                    className={`text-sm font-medium leading-relaxed ${
                      isSelected ? 'text-[#111625] font-semibold' : 'text-[#47516B]'
                    }`}
                  >
                    {opt.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Tip Box */}
          <div className="p-4 rounded-2xl bg-[#F6F4FD] border border-[#ECE8F7] flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center flex-shrink-0 shadow-sm">
              <Lightbulb size={17} strokeWidth={2.2} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#111625]">Tip</h4>
              <p className="text-xs text-[#7E88A2] mt-0.5 leading-relaxed">
                Think about the user experience and what creates clarity and ease.
              </p>
            </div>
          </div>

          {/* Actions Row */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F4F2FA]">
            <button
              onClick={() => setActiveView('profile-skills')}
              className="btn-secondary px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm"
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="btn-primary px-7 py-2.5 rounded-xl font-semibold text-xs sm:text-sm"
            >
              <span>Next</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column Contextual Rail */}
      <div className="w-full xl:w-[440px] flex-shrink-0 flex flex-col gap-6">
        {/* Assessment Overview */}
        <div className="rizza-card p-6 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
          <h3 className="text-base font-bold text-[#111625] tracking-tight">
            Assessment overview
          </h3>
          <p className="text-xs text-[#7E88A2] mt-0.5 mb-5">
            Here are the key details about this assessment.
          </p>

          <div className="flex flex-col gap-3.5 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-[#F5F3FB]">
              <div className="flex items-center gap-2.5 text-[#47516B]">
                <div className="w-6 h-6 rounded-md bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center">
                  <Briefcase size={13} />
                </div>
                <span>Role</span>
              </div>
              <span className="font-bold text-[#111625]">Senior UX Designer</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-[#F5F3FB]">
              <div className="flex items-center gap-2.5 text-[#47516B]">
                <div className="w-6 h-6 rounded-md bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center">
                  <BarChart2 size={13} />
                </div>
                <span>Expertise level</span>
              </div>
              <span className="font-bold text-[#111625]">Mid-Senior Level</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-[#F5F3FB]">
              <div className="flex items-center gap-2.5 text-[#47516B]">
                <div className="w-6 h-6 rounded-md bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center">
                  <Users size={13} />
                </div>
                <span>Experience benchmark</span>
              </div>
              <span className="font-bold text-[#111625]">3 – 6 years</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-[#F5F3FB]">
              <div className="flex items-center gap-2.5 text-[#47516B]">
                <div className="w-6 h-6 rounded-md bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center">
                  <FileText size={13} />
                </div>
                <span>Assessment format</span>
              </div>
              <span className="font-bold text-[#111625] text-right">Multiple choice, scenario based</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-[#F5F3FB]">
              <div className="flex items-center gap-2.5 text-[#47516B]">
                <div className="w-6 h-6 rounded-md bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center">
                  <Clock size={13} />
                </div>
                <span>Estimated time</span>
              </div>
              <span className="font-bold text-[#111625]">30 – 35 minutes</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5 text-[#47516B]">
                <div className="w-6 h-6 rounded-md bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center">
                  <Star size={13} />
                </div>
                <span>What you'll get</span>
              </div>
              <span className="font-bold text-[#111625] text-right">Skill insights &amp; strengths</span>
            </div>
          </div>
        </div>

        {/* Your Progress Card */}
        <div className="rizza-card p-6 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-[#111625]">Your progress</span>
            <div className="text-xs font-semibold text-[#7E88A2]">
              <span className="text-[#111625] font-bold">4 / 20</span> completed
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-[#7E88A2] mb-3">
            <span>Progress status</span>
            <span className="font-bold text-[#5832E6]">20%</span>
          </div>
          <div className="w-full h-2 bg-[#F0EDFB] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#5832E6] to-[#431ECB] rounded-full w-[20%] shadow-[0_0_8px_rgba(88,50,230,0.3)]" />
          </div>
        </div>

        {/* Autosave Card with Green Lock */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100/90 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <Lock size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-900">Your progress is saved automatically</h4>
            <p className="text-[11px] text-emerald-700 mt-0.5">
              You can pause and continue anytime.
            </p>
          </div>
        </div>

        {/* Why This Matters */}
        <div className="rizza-card p-6 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)] flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Target size={18} strokeWidth={2.2} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#111625]">Why this matters</h4>
            <p className="text-xs text-[#7E88A2] mt-1 leading-relaxed">
              This helps us understand how you solve real world problems and apply your knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
