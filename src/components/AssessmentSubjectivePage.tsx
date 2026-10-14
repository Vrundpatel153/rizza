import React, { useState } from 'react';
import { 
  ChevronLeft, ArrowLeft, Send, Paperclip, Bold, Italic, 
  Underline, List, ListOrdered, Link2, Image, FileText, Settings, Users, BarChart3, Target, Lightbulb 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const AssessmentSubjectivePage: React.FC = () => {
  const { assessmentSubj, setSubjectiveAnswer, setActiveView, showToast } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxLength = 800;

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast('Subjective answer submitted successfully! Assessment complete.');
    setTimeout(() => {
      setIsSubmitting(false);
      setActiveView('profile-skills');
    }, 1200);
  };

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 items-start">
      {/* Center Main Workspace - Single Unified Card Matching Reference Exactly */}
      <div className="min-w-0 w-full p-6 sm:p-7 pb-8 relative overflow-visible bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col gap-5">
        {/* Top Header Section */}
        <div>
          {/* Back link */}
          <button
            onClick={() => setActiveView('assessment-mcq')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#5828F0] mb-3 transition-colors cursor-pointer"
          >
            <ChevronLeft size={15} />
            <span>Back to assessment</span>
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

            {/* Seamless 3D Assessment Graphic with zero square border */}
            <div className="relative w-[150px] h-[95px] flex-shrink-0 flex items-center justify-end pointer-events-none select-none">
              <div className="absolute inset-0 bg-radial from-[#8B5CF6]/20 via-[#C4B5FD]/10 to-transparent blur-xl" />
              <img
                src="/assets/assessment-subj-illustration.png"
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
                    i < 6
                      ? 'progress-capsule-active'
                      : 'bg-[#EDEAF7]'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-[#475467] whitespace-nowrap">
              Question 12 of 20
            </span>
          </div>
        </div>

        {/* Question Details */}
        <div className="flex flex-col gap-2 pt-1 border-t border-[#F1EDF9]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#5828F0] text-xs font-semibold self-start">
            <span className="text-xs">✎</span>
            <span>Subjective</span>
          </div>

          <h2 className="text-[17px] sm:text-[18px] font-bold text-[#0F172A] leading-snug mt-1">
            Describe a time when you had to design for a user with conflicting needs. How did you handle it and what was the outcome?
          </h2>
          <p className="text-xs text-[#64748B]">
            Share your thought process, collaboration, prioritization and the impact of your solution.
          </p>
        </div>

        {/* Rich Text Editor Box matching reference */}
        <div className="border border-[#E2E0EC] rounded-2xl bg-white overflow-hidden focus-within:border-[#5828F0] focus-within:ring-2 focus-within:ring-[#5828F0]/10 transition-all shadow-inner">
          <textarea
            rows={6}
            value={assessmentSubj.answerText}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setSubjectiveAnswer(e.target.value);
              }
            }}
            placeholder="Type your answer here..."
            className="w-full p-4 text-[13.5px] text-[#0F172A] placeholder-[#8A94A6] focus:outline-none resize-none leading-relaxed min-h-[170px]"
          />

          {/* Bottom Toolbar & Counter */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#FAF9FD] border-t border-[#ECE8F7] text-[#64748B]">
            {/* Formatting Actions */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => showToast('Applied bold formatting')}
                className="w-7 h-7 rounded hover:bg-slate-200/60 flex items-center justify-center transition-colors font-bold text-xs"
                title="Bold"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => showToast('Applied italic formatting')}
                className="w-7 h-7 rounded hover:bg-slate-200/60 flex items-center justify-center transition-colors italic text-xs"
                title="Italic"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => showToast('Applied underline formatting')}
                className="w-7 h-7 rounded hover:bg-slate-200/60 flex items-center justify-center transition-colors underline text-xs"
                title="Underline"
              >
                U
              </button>
              <span className="w-[1px] h-4 bg-slate-200 mx-1" />
              <button
                type="button"
                onClick={() => showToast('Added bullet list')}
                className="w-7 h-7 rounded hover:bg-slate-200/60 flex items-center justify-center transition-colors"
                title="Bullet list"
              >
                <List size={14} />
              </button>
              <button
                type="button"
                onClick={() => showToast('Added numbered list')}
                className="w-7 h-7 rounded hover:bg-slate-200/60 flex items-center justify-center transition-colors"
                title="Numbered list"
              >
                <ListOrdered size={14} />
              </button>
              <button
                type="button"
                onClick={() => showToast('Insert link')}
                className="w-7 h-7 rounded hover:bg-slate-200/60 flex items-center justify-center transition-colors"
                title="Link"
              >
                <Link2 size={14} />
              </button>
              <button
                type="button"
                onClick={() => showToast('Insert image asset')}
                className="w-7 h-7 rounded hover:bg-slate-200/60 flex items-center justify-center transition-colors"
                title="Image"
              >
                <Image size={14} />
              </button>
            </div>

            {/* Character Counter & Attach File */}
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="text-[#8A94A6]">
                {assessmentSubj.answerText.length}/{maxLength}
              </span>

              <button
                type="button"
                onClick={() => showToast('Upload file attachment')}
                className="flex items-center gap-1.5 text-[#5828F0] hover:underline cursor-pointer font-medium"
              >
                <Paperclip size={13} />
                <span>Attach file</span>
              </button>
            </div>
          </div>
        </div>

        {/* What We're Looking For Box */}
        <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-[#ECE8F7] flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] text-[#5828F0] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
            <Lightbulb size={17} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0F172A]">What we're looking for</p>
            <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
              Your thought process, collaboration, prioritization and the impact of your solution. Be specific and use real examples if possible.
            </p>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#F1EDF9]">
          <button
            onClick={() => setActiveView('assessment-mcq')}
            className="px-6 py-2.5 rounded-xl border border-[#EAE5F5] bg-white text-[#475467] font-semibold text-xs hover:bg-[#F8F7FD] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Previous</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-7 py-2.5 rounded-xl btn-primary-purple font-semibold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <span>Submit Answer</span>
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* Right Rail Contextual Info */}
      <div className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-4">
        {/* Assessment Progress */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-[#0F172A]">Assessment progress</span>
            <span className="text-[#64748B]">12 / 20 completed (60%)</span>
          </div>
          <div className="w-full h-2 bg-[#EFEBFB] rounded-full overflow-hidden">
            <div className="w-[60%] h-full bg-[#5828F0] rounded-full" />
          </div>
        </div>

        {/* Tips for a great answer Card */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)]">
          <h3 className="text-[16px] font-bold text-[#0F172A] tracking-tight mb-4">
            Tips for a great answer
          </h3>

          <div className="flex flex-col gap-3.5">
            {[
              { icon: FileText, title: 'Be specific', desc: 'Use real examples from your experience.' },
              { icon: Settings, title: 'Show your process', desc: 'Explain how you approached the problem.' },
              { icon: Users, title: 'Highlight collaboration', desc: 'Mention how you worked with stakeholders or team members.' },
              { icon: BarChart3, title: 'Share the outcome', desc: 'Include measurable impact if possible.' }
            ].map((tip, idx) => {
              const IconComp = tip.icon;
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] text-[#5828F0] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                    <IconComp size={15} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A] leading-tight">{tip.title}</h4>
                    <p className="text-[11.5px] text-[#64748B] mt-0.5 leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              );
            })}
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
              This helps us understand how you solve real world problems and apply your knowledge as a Senior UX Designer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
