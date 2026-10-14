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
    <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-6 items-start">
      {/* Center Main Workspace */}
      <div className="min-w-0 w-full flex flex-col gap-6">
        {/* Assessment Header Card with 3D Illustration */}
        <div className="rizza-card p-6 sm:p-7 relative overflow-hidden bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
          {/* Back link */}
          <button
            onClick={() => setActiveView('assessment-mcq')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7E88A2] hover:text-[#5832E6] mb-3 transition-colors"
          >
            <ChevronLeft size={15} />
            <span>Back to assessment</span>
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
                src="/assets/assessment-subj-illustration.png"
                alt=""
                className="w-full h-full object-contain object-right-top mix-blend-multiply"
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
                    i < 6
                      ? 'bg-gradient-to-r from-[#5832E6] to-[#431ECB] shadow-[0_0_8px_rgba(88,50,230,0.3)]'
                      : 'bg-[#EDEAF7]'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-[#47516B] whitespace-nowrap">
              Question 12 of 20
            </span>
          </div>
        </div>

        {/* Subjective Question & Rich Text Input Card */}
        <div className="rizza-card p-6 sm:p-7 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)] flex flex-col gap-6">
          {/* Question Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EDE9FE] text-[#5832E6] text-xs font-bold self-start">
            <span>✎</span>
            <span>Subjective</span>
          </div>

          {/* Question Title */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111625] leading-snug">
              Describe a time when you had to design for a user with conflicting needs. How did you handle it and what was the outcome?
            </h2>
            <p className="text-sm text-[#7E88A2] mt-1.5">
              Share your thought process, collaboration, prioritization and the impact of your solution.
            </p>
          </div>

          {/* Text Area with Toolbar */}
          <div className="rounded-2xl border border-[#ECE8F7] bg-white overflow-hidden shadow-sm focus-within:border-[#5832E6] focus-within:ring-2 focus-within:ring-[#5832E6]/10 transition-all">
            <textarea
              placeholder="Type your answer here..."
              value={assessmentSubj.answerText}
              onChange={(e) => {
                if (e.target.value.length <= maxLength) {
                  setSubjectiveAnswer(e.target.value);
                }
              }}
              rows={7}
              className="w-full p-4 text-sm text-[#111625] placeholder-[#7E88A2] focus:outline-none resize-none leading-relaxed"
            />

            {/* Bottom Toolbar & Character Count */}
            <div className="p-3 bg-[#FAF9FE] border-t border-[#F0EDF9] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => showToast('Formatting: Bold')}
                  className="p-1.5 rounded-lg text-[#7E88A2] hover:text-[#5832E6] hover:bg-white transition-colors"
                >
                  <Bold size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Formatting: Italic')}
                  className="p-1.5 rounded-lg text-[#7E88A2] hover:text-[#5832E6] hover:bg-white transition-colors"
                >
                  <Italic size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Formatting: Underline')}
                  className="p-1.5 rounded-lg text-[#7E88A2] hover:text-[#5832E6] hover:bg-white transition-colors"
                >
                  <Underline size={15} />
                </button>
                <div className="w-[1px] h-4 bg-[#E2DFEF] mx-1" />
                <button
                  type="button"
                  onClick={() => showToast('List format')}
                  className="p-1.5 rounded-lg text-[#7E88A2] hover:text-[#5832E6] hover:bg-white transition-colors"
                >
                  <List size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Numbered list')}
                  className="p-1.5 rounded-lg text-[#7E88A2] hover:text-[#5832E6] hover:bg-white transition-colors"
                >
                  <ListOrdered size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Insert link')}
                  className="p-1.5 rounded-lg text-[#7E88A2] hover:text-[#5832E6] hover:bg-white transition-colors"
                >
                  <Link2 size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Attach image')}
                  className="p-1.5 rounded-lg text-[#7E88A2] hover:text-[#5832E6] hover:bg-white transition-colors"
                >
                  <Image size={15} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#7E88A2]">
                  {assessmentSubj.answerText.length}/{maxLength}
                </span>

                <button
                  type="button"
                  onClick={() => showToast('File upload dialog opened')}
                  className="px-3 py-1.5 rounded-xl border border-[#ECE8F7] bg-white text-xs font-semibold text-[#47516B] hover:text-[#5832E6] hover:border-[#D6D0F2] flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Paperclip size={13} />
                  <span>Attach file</span>
                </button>
              </div>
            </div>
          </div>

          {/* What We're Looking For Box */}
          <div className="p-4 rounded-2xl bg-[#F6F4FD] border border-[#ECE8F7] flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center flex-shrink-0 shadow-sm">
              <Lightbulb size={17} strokeWidth={2.2} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#111625]">What we're looking for</h4>
              <p className="text-xs text-[#7E88A2] mt-0.5 leading-relaxed">
                Your thought process, collaboration, prioritization and the impact of your solution. Be specific and use real examples if possible.
              </p>
            </div>
          </div>

          {/* Actions Row */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F4F2FA]">
            <button
              onClick={() => setActiveView('assessment-mcq')}
              className="btn-secondary px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm"
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary px-7 py-2.5 rounded-xl font-semibold text-xs sm:text-sm"
            >
              <span>{isSubmitting ? 'Submitting...' : 'Submit Answer'}</span>
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column Contextual Rail */}
      <div className="w-full xl:w-[440px] flex-shrink-0 flex flex-col gap-6">
        {/* Assessment Progress */}
        <div className="rizza-card p-6 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-[#111625]">Assessment progress</span>
            <div className="text-xs font-semibold text-[#7E88A2]">
              <span className="text-[#111625] font-bold">12 / 20</span> completed
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-[#7E88A2] mb-3">
            <span>Overall completion</span>
            <span className="font-bold text-[#5832E6]">60%</span>
          </div>
          <div className="w-full h-2 bg-[#F0EDFB] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#5832E6] to-[#431ECB] rounded-full w-[60%] shadow-[0_0_8px_rgba(88,50,230,0.3)]" />
          </div>
        </div>

        {/* Tips for a Great Answer */}
        <div className="rizza-card p-6 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
          <h3 className="text-base font-bold text-[#111625] tracking-tight mb-4">
            Tips for a great answer
          </h3>
          <div className="flex flex-col gap-3.5 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText size={14} />
              </div>
              <div>
                <h4 className="font-bold text-[#111625]">Be specific</h4>
                <p className="text-[#7E88A2] mt-0.5">Use real examples from your experience.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Settings size={14} />
              </div>
              <div>
                <h4 className="font-bold text-[#111625]">Show your process</h4>
                <p className="text-[#7E88A2] mt-0.5">Explain how you approached the problem.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Users size={14} />
              </div>
              <div>
                <h4 className="font-bold text-[#111625]">Highlight collaboration</h4>
                <p className="text-[#7E88A2] mt-0.5">Mention how you worked with stakeholders or team members.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center flex-shrink-0 mt-0.5">
                <BarChart3 size={14} />
              </div>
              <div>
                <h4 className="font-bold text-[#111625]">Share the outcome</h4>
                <p className="text-[#7E88A2] mt-0.5">Include measurable impact if possible.</p>
              </div>
            </div>
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
              This helps us understand how you solve real world problems and apply your knowledge as a Senior UX Designer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
