import React from 'react';
import { 
  BarChart3, Award, Download, Share2, ArrowRight, 
  Sparkles, CheckCircle2, TrendingUp, Clock, Shield 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ScoreBenchmarkPage: React.FC = () => {
  const { setActiveView, showToast } = useApp();

  const handleShare = () => {
    navigator.clipboard?.writeText('https://rizza.life/anniestanley/benchmark');
    showToast('Verified benchmark report link copied to clipboard!');
  };

  const dimensions = [
    { name: 'User Experience & Interaction', score: 96, percentile: 'Top 2%', barColor: 'bg-[#5828F0]' },
    { name: 'Design Systems & Component Architecture', score: 92, percentile: 'Top 5%', barColor: 'bg-[#8B5CF6]' },
    { name: 'User Research & Discovery', score: 88, percentile: 'Top 8%', barColor: 'bg-[#06B6D4]' },
    { name: 'Wireframing & High-Fidelity Prototyping', score: 94, percentile: 'Top 3%', barColor: 'bg-[#10B981]' },
    { name: 'Cross-Functional Collaboration & Strategy', score: 90, percentile: 'Top 6%', barColor: 'bg-[#F59E0B]' },
  ];

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 items-start">
      {/* Center Main Benchmark Column */}
      <div className="min-w-0 w-full flex flex-col gap-4">
        {/* Master Score Gauge Card */}
        <div className="p-6 sm:p-7 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#5828F0] text-xs font-semibold mb-2">
              <Sparkles size={13} />
              <span>Score &amp; Benchmark Studio (C-35)</span>
            </div>
            <h1 className="text-xl sm:text-[24px] font-bold text-[#0F172A] tracking-tight">
              Verified Global Benchmark
            </h1>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              Based on standardized multi-round assessments, verified portfolio audits, and peer performance calibration.
            </p>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-xl bg-white border border-[#EAE5F5] hover:bg-[#F8F7FD] text-xs font-semibold text-[#475569] flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Share2 size={13} />
                <span>Share Verified Badge</span>
              </button>
              <button
                onClick={() => showToast('Generating official Benchmark PDF certificate...')}
                className="px-4 py-2 rounded-xl bg-[#F8F7FD] border border-[#ECE7F8] hover:bg-[#F3EFFC] text-xs font-semibold text-[#5828F0] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download size={13} />
                <span>Download Report PDF</span>
              </button>
            </div>
          </div>

          {/* Circular Score Gauge Container */}
          <div className="flex flex-col items-center justify-center p-6 rounded-[22px] bg-[#FAF8FE] border border-[#ECE7F8] w-full md:w-auto min-w-[210px] text-center shadow-inner">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#EAE5F5" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#5828F0"
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset="37"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">840</span>
                <span className="text-[10px] font-bold text-[#64748B] uppercase">/ 1000 PTS</span>
              </div>
            </div>

            <div className="mt-2.5">
              <div className="text-xs font-bold text-[#5828F0]">96th Percentile</div>
              <div className="text-[11px] text-[#64748B]">Top 4% UX Designers</div>
            </div>
          </div>
        </div>

        {/* Detailed Dimensional Breakdown Card */}
        <div className="p-6 sm:p-7 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                Skill Dimension Breakdown
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Calibrated across 1,400+ candidate submissions in Figma and Stripe design tracks.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              Verified High Confidence
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {dimensions.map((dim, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0F172A]">{dim.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#5828F0] bg-[#FAF9FE] px-2 py-0.5 rounded-md border border-[#ECE7F8]">{dim.percentile}</span>
                    <span className="font-bold text-[#0F172A]">{dim.score}%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-[#F1EDF9] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${dim.barColor}`}
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retake Cooldown & Continuous Calibration Card */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EDE9FE] text-[#5828F0] flex items-center justify-center flex-shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0F172A]">Benchmark Calibration Cooldown</h4>
              <p className="text-[11.5px] text-[#64748B] mt-0.5">
                Next score upgrade window opens in 14 days. Current benchmark verified through 2027.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveView('jobs')}
            className="px-4 py-2 rounded-xl bg-[#5828F0] hover:bg-[#4D1FE0] text-white text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Browse Matched Jobs</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Right Column Contextual Rail */}
      <div className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-4">
        {/* Peer Comparison Card */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)]">
          <h3 className="text-[16px] font-bold text-[#0F172A] tracking-tight mb-2">
            Peer Comparison
          </h3>
          <p className="text-xs text-[#64748B] mb-4">
            How your score compares against senior designers from top tech hubs:
          </p>

          <div className="flex flex-col gap-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-[#ECE7F8]">
              <span className="text-[#64748B]">Global Average</span>
              <span className="font-bold text-[#0F172A]">610 / 1000</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#ECE7F8]">
              <span className="text-[#64748B]">Tier 1 Tech Average</span>
              <span className="font-bold text-[#0F172A]">745 / 1000</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#ECE7F8]">
              <span className="text-[#64748B]">Annie Stanley (You)</span>
              <span className="font-bold text-[#5828F0]">840 / 1000 ★</span>
            </div>
          </div>
        </div>

        {/* Trust & Verification Badge */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-emerald-600">
            <Shield size={16} />
            <h4 className="text-[13px] font-bold text-[#0F172A]">Tamper-Proof Verification</h4>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            All benchmark scores are signed with SHA-256 certificate hashes stored in the Rizza Digital Verification Vault.
          </p>
          <button
            onClick={() => setActiveView('digital-vault')}
            className="w-full py-2.5 rounded-xl bg-[#F8F7FD] border border-[#ECE7F8] hover:bg-[#F3EFFC] text-xs font-bold text-[#5828F0] transition-colors cursor-pointer"
          >
            Inspect Digital Vault
          </button>
        </div>
      </div>
    </div>
  );
};
