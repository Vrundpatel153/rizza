import React, { useState } from 'react';
import { 
  Briefcase, MapPin, DollarSign, Clock, Star, 
  ExternalLink, Check, Bookmark, ArrowRight, Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface JobItem {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  postedTime: string;
  matchScore: number;
  matchHighlights: string[];
  description: string;
  applied: boolean;
  saved: boolean;
}

export const JobsPage: React.FC = () => {
  const { setActiveView, showToast } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'high-match' | 'remote' | 'saved'>('all');
  
  const [jobs, setJobs] = useState<JobItem[]>([
    {
      id: 'job-1',
      title: 'Lead Product Designer',
      company: 'Stripe',
      logo: 'S',
      location: 'Remote · San Francisco',
      type: 'Full-time',
      salary: '$180,000 – $220,000',
      postedTime: '2 hours ago',
      matchScore: 96,
      matchHighlights: ['Design Systems', 'Fintech UX', 'Figma Mastery'],
      description: 'Looking for a Lead Product Designer to evolve our global developer billing dashboard and checkout flows. You will partner with engineering leads and product directors.',
      applied: false,
      saved: true
    },
    {
      id: 'job-2',
      title: 'Senior UX / Interaction Designer',
      company: 'Airbnb',
      logo: 'A',
      location: 'Hybrid · Mumbai / Bangalore',
      type: 'Full-time',
      salary: '₹42,00,000 – ₹55,00,000',
      postedTime: '1 day ago',
      matchScore: 92,
      matchHighlights: ['Interaction Design', 'Mobile Prototyping', 'User Research'],
      description: 'Lead discovery and visual prototyping for host management tools and guest trust experiences across iOS, Android, and web platforms.',
      applied: false,
      saved: false
    },
    {
      id: 'job-3',
      title: 'Design Systems Architect',
      company: 'Linear',
      logo: 'L',
      location: '100% Remote Global',
      type: 'Full-time',
      salary: '$160,000 – $190,000',
      postedTime: '2 days ago',
      matchScore: 89,
      matchHighlights: ['Component Tokens', 'Accessibility', 'Micro-interactions'],
      description: 'Shape the next generation of precision productivity tools. We obsess over pixel craft, speed, keyboard accessibility, and delightful animation.',
      applied: false,
      saved: true
    },
    {
      id: 'job-4',
      title: 'Staff Product Designer',
      company: 'Figma',
      logo: '❖',
      location: 'San Francisco, CA / Hybrid',
      type: 'Full-time',
      salary: '$200,000 – $245,000',
      postedTime: '3 days ago',
      matchScore: 85,
      matchHighlights: ['Design Tools', 'Realtime Canvas', 'Community Ecosystem'],
      description: 'Join the Core Canvas team to design the future of design and collaboration tools used by millions of creators worldwide.',
      applied: true,
      saved: false
    }
  ]);

  const handleApply = (id: string, title: string, company: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, applied: true } : j));
    showToast(`1-Click Applied to ${title} at ${company}! Profile & Verified Assessment shared.`);
  };

  const handleToggleSave = (id: string) => {
    setJobs(prev => prev.map(j => {
      if (j.id === id) {
        const nextSaved = !j.saved;
        showToast(nextSaved ? 'Job saved to your list' : 'Job removed from saved');
        return { ...j, saved: nextSaved };
      }
      return j;
    }));
  };

  const filteredJobs = jobs.filter(j => {
    if (selectedFilter === 'high-match') return j.matchScore >= 90;
    if (selectedFilter === 'remote') return j.location.toLowerCase().includes('remote');
    if (selectedFilter === 'saved') return j.saved;
    return true;
  });

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 items-start">
      {/* Center Main Jobs Column */}
      <div className="min-w-0 w-full flex flex-col gap-4">
        {/* Header Banner Card */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#5828F0] text-xs font-semibold mb-2">
              <Sparkles size={13} />
              <span>AI Job DNA Matching Active</span>
            </div>
            <h1 className="text-xl sm:text-[24px] font-bold text-[#0F172A] tracking-tight">
              Recommended Jobs Feed
            </h1>
            <p className="text-xs text-[#64748B] mt-1">
              Curated opportunities matched against your verified skills, experience, and assessment benchmarks.
            </p>
          </div>

          <button
            onClick={() => setActiveView('score-benchmark')}
            className="px-4 py-2 rounded-xl bg-[#F8F7FD] border border-[#ECE7F8] hover:bg-[#F3EFFC] text-xs font-bold text-[#5828F0] flex items-center gap-2 self-start sm:self-auto cursor-pointer transition-colors"
          >
            <span>View Match DNA</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Filter Pills Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar select-none">
          {[
            { id: 'all', label: 'All Matched Jobs' },
            { id: 'high-match', label: '90%+ Match DNA' },
            { id: 'remote', label: 'Remote Opportunities' },
            { id: 'saved', label: 'Saved Jobs' },
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id as any)}
              className={`text-xs font-medium px-4 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === filter.id
                  ? 'font-semibold bg-[#5828F0] text-white shadow-sm'
                  : 'bg-white text-[#475569] border border-[#EAE5F5] hover:bg-[#F8F7FD] hover:text-[#0F172A]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Jobs Feed Cards */}
        <div className="flex flex-col gap-3.5">
          {filteredJobs.map(job => (
            <div
              key={job.id}
              className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] hover:border-[#D6D0F2] transition-all flex flex-col gap-4 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F4F1FD] text-[#5828F0] font-bold text-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-[#ECE7F8]">
                    {job.logo}
                  </div>
                  <div>
                    <h2 className="text-[17px] font-bold text-[#0F172A] group-hover:text-[#5828F0] transition-colors leading-tight">
                      {job.title}
                    </h2>
                    <p className="text-xs font-semibold text-[#64748B] mt-0.5">
                      {job.company}
                    </p>

                    <div className="flex items-center gap-3.5 text-xs text-[#64748B] mt-2 flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-[#64748B]" />
                        <span>{job.location}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <DollarSign size={13} className="text-[#64748B]" />
                        <span className="font-semibold text-[#0F172A]">{job.salary}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-[#64748B]" />
                        <span>{job.postedTime}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <div className="px-3 py-1 rounded-full bg-[#EDE9FE] text-[#5828F0] border border-[#DDD6FE] text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Star size={12} className="fill-[#5828F0]" />
                    <span>{job.matchScore}% Match</span>
                  </div>
                  <span className="text-[10.5px] font-medium text-[#64748B]">Top Candidate Fit</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#475569] leading-relaxed">
                {job.description}
              </p>

              {/* Match Highlights Tags */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-semibold text-[#64748B] mr-1">DNA Signals:</span>
                {job.matchHighlights.map((hl, idx) => (
                  <span
                    key={idx}
                    className="text-[10.5px] font-semibold px-2.5 py-0.5 rounded-lg bg-[#FAF9FE] text-[#5828F0] border border-[#ECE7F8]"
                  >
                    ✓ {hl}
                  </span>
                ))}
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between pt-3 border-t border-[#ECE7F8]">
                <button
                  onClick={() => handleToggleSave(job.id)}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    job.saved
                      ? 'bg-[#EDE9FE] text-[#5828F0] border-[#DDD6FE]'
                      : 'bg-[#F8F7FD] text-[#64748B] border-[#ECE7F8] hover:text-[#0F172A]'
                  }`}
                  title={job.saved ? 'Saved' : 'Save Job'}
                >
                  <Bookmark size={14} className={job.saved ? 'fill-[#5828F0]' : ''} />
                  <span>{job.saved ? 'Saved' : 'Save'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveView('assessment-mcq')}
                    className="px-4 py-2 rounded-xl bg-white border border-[#EAE5F5] text-xs font-semibold text-[#475569] hover:bg-[#F8F7FD] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Assessment</span>
                    <ExternalLink size={12} />
                  </button>

                  <button
                    onClick={() => handleApply(job.id, job.title, job.company)}
                    disabled={job.applied}
                    className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      job.applied
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                        : 'bg-[#5828F0] hover:bg-[#4D1FE0] text-white shadow-[0_4px_14px_rgba(88,40,240,0.35)] active:scale-95'
                    }`}
                  >
                    {job.applied ? (
                      <>
                        <Check size={14} strokeWidth={2.5} />
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <span>1-Click Apply</span>
                        <ArrowRight size={13} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column Contextual Rail */}
      <div className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-4">
        {/* Match DNA Summary Card */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)]">
          <h3 className="text-[16px] font-bold text-[#0F172A] tracking-tight mb-2">
            Your Job DNA Strength
          </h3>
          <p className="text-xs text-[#64748B] mb-4 leading-relaxed">
            Your verified technical score and STAR profile put you in high demand for Senior UX roles.
          </p>

          <div className="p-4 rounded-2xl bg-[#F8F7FD] border border-[#ECE7F8] flex items-center justify-between mb-4">
            <div>
              <div className="text-[24px] font-extrabold text-[#5828F0] leading-none">94%</div>
              <div className="text-[11px] font-medium text-[#64748B] mt-1">Average Match Rate</div>
            </div>
            <div className="text-right">
              <div className="text-[14px] font-bold text-[#0F172A]">Top 4%</div>
              <div className="text-[11px] font-medium text-emerald-600">Global Percentile</div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-[#ECE7F8]">
              <span className="text-[#64748B]">Active Applications</span>
              <span className="font-bold text-[#0F172A]">4 In Progress</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[#ECE7F8]">
              <span className="text-[#64748B]">Profile Views (Recruiters)</span>
              <span className="font-bold text-[#5828F0]">128 this week</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[#64748B]">Interview Invites</span>
              <span className="font-bold text-emerald-600">2 Pending Response</span>
            </div>
          </div>
        </div>

        {/* Verification Status Card */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-[14px] font-bold text-[#0F172A]">Digital Vault Status</h4>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10.5px] font-bold">100% Verified</span>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            All your employer credentials, degree certificates, and background checks are encrypted and ready for 1-click offer signing.
          </p>
          <button
            onClick={() => setActiveView('digital-vault')}
            className="w-full py-2.5 rounded-xl bg-[#F8F7FD] border border-[#ECE7F8] hover:bg-[#F3EFFC] text-xs font-bold text-[#5828F0] transition-colors cursor-pointer"
          >
            Manage Digital Vault
          </button>
        </div>
      </div>
    </div>
  );
};
