import React, { useState } from 'react';
import { MapPin, Briefcase, Share2, MoreHorizontal, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProfileTab } from '../types';

interface ProfileHeaderProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ activeTab, onTabChange }) => {
  const { isConnected, toggleConnect, showToast, setActiveView } = useApp();
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText('https://rizza.life/anniestanley');
    setCopied(true);
    showToast('Profile link copied: rizza.life/anniestanley');
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { key: ProfileTab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'skills', label: 'Skills' },
    { key: 'experience', label: 'Experience' },
    { key: 'projects', label: 'Projects' },
    { key: 'posts', label: 'Posts' },
    { key: 'activity', label: 'Activity' },
  ];

  const handleTabClick = (tabKey: ProfileTab) => {
    onTabChange(tabKey);
    if (tabKey === 'skills') {
      setActiveView('profile-skills');
    } else if (tabKey === 'projects') {
      setActiveView('profile-projects');
    } else if (tabKey === 'experience') {
      setActiveView('employment-details');
    } else {
      showToast(`Switched to ${tabKey} tab`);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3.5">
      {/* Main Hero Card */}
      <div className="p-6 relative overflow-hidden bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)]">
        {/* Seamless 3D Fluid Violet Wave Ribbon in Bottom-Right Quadrant (as in reference) */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[130px] pointer-events-none select-none overflow-hidden z-0 hidden sm:block">
          <svg className="w-full h-full" viewBox="0 0 500 130" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#5828F0" stopOpacity="0.18" />
              </linearGradient>
              <linearGradient id="heroWaveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#C4B5FD" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Smooth Ribbon 1 */}
            <path
              d="M500,70 C380,20 280,110 120,80 C60,65 20,90 0,110 L0,130 L500,130 Z"
              fill="url(#heroWaveGrad2)"
            />
            {/* Smooth Ribbon 2 with depth */}
            <path
              d="M500,45 C360,75 260,30 140,95 C70,120 20,110 0,125 L0,130 L500,130 Z"
              fill="url(#heroWaveGrad1)"
            />
            {/* Fine curved accent line */}
            <path
              d="M500,40 C350,70 250,25 130,90 C60,115 15,105 0,120"
              stroke="#8B5CF6"
              strokeWidth="1.2"
              strokeOpacity="0.35"
              fill="none"
            />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-5 sm:gap-6 items-start">
          {/* Left: Annie's Portrait Card */}
          <div className="flex-shrink-0 relative group self-center sm:self-start">
            <div className="w-[140px] h-[140px] sm:w-[165px] sm:h-[165px] rounded-[22px] overflow-hidden relative border-2 border-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] bg-[#F0EEF8]">
              <img
                src="/assets/annie-portrait.png"
                alt="Annie Stanley"
                className="w-full h-full object-cover object-top"
              />
              {/* Green Available for opportunities pill */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#EAE5F5] shadow-sm flex items-center gap-1.5 text-[11px] font-semibold text-[#027A48]">
                <span className="w-2 h-2 rounded-full bg-[#12B76A] animate-pulse" />
                <span>Available for opportunities</span>
              </div>
            </div>
          </div>

          {/* Right: Info Area */}
          <div className="flex-1 min-w-0 w-full flex flex-col justify-between pt-0.5">
            {/* Top Identity & Action Buttons Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-[26px] font-bold text-[#0F172A] tracking-tight leading-none">
                    Annie Stanley
                  </h1>
                  {/* Verified Rosette Badge */}
                  <span className="inline-flex items-center justify-center text-[#5828F0]" title="Verified Professional">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.4 2.4 3.4-.4 1.2 3.2 3.1 1.5-.7 3.3 2.1 2.7-2.1 2.7.7 3.3-3.1 1.5-1.2 3.2-3.4-.4L12 22l-2.4-2.4-3.4.4-1.2-3.2-3.1-1.5.7-3.3-2.1-2.7 2.1-2.7-.7-3.3 3.1-1.5 1.2-3.2 3.4.4L12 2z" />
                      <path d="M9.5 12l2 2 4.5-4.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </span>
                </div>
                <p className="text-[#5828F0] font-semibold text-[14.5px] mt-1">
                  UX Designer
                </p>
              </div>

              {/* Action Buttons: Share, More, Connect */}
              <div className="flex items-center gap-2 flex-shrink-0 relative z-20 self-start sm:self-auto">
                {/* Share Button */}
                <button
                  className="w-9 h-9 rounded-full bg-white border border-[#EAE5F5] shadow-sm flex items-center justify-center text-[#475569] hover:text-[#5828F0] hover:border-[#D6D0F2] transition-all"
                  title="Share Profile"
                  onClick={handleShare}
                >
                  {copied ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
                </button>

                {/* More Options */}
                <button
                  className="w-9 h-9 rounded-full bg-white border border-[#EAE5F5] shadow-sm flex items-center justify-center text-[#475569] hover:text-[#5828F0] hover:border-[#D6D0F2] transition-all"
                  title="More Options"
                  onClick={() => showToast('Profile options: export PDF, report, or share')}
                >
                  <MoreHorizontal size={16} />
                </button>

                {/* Connect Button */}
                <button
                  onClick={toggleConnect}
                  className={`px-6 py-2 rounded-full text-[13.5px] font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                    isConnected
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-sm'
                      : 'btn-primary-purple'
                  }`}
                >
                  {isConnected ? (
                    <>
                      <Check size={15} strokeWidth={2.5} />
                      <span>Connected</span>
                    </>
                  ) : (
                    <span>Connect</span>
                  )}
                </button>
              </div>
            </div>

            {/* Location & Experience Meta */}
            <div className="flex items-center gap-4 text-[13px] text-[#64748B] mt-2.5">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#64748B]" />
                <span>Mumbai, India</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={14} className="text-[#64748B]" />
                <span>5+ Years Exp.</span>
              </span>
            </div>

            {/* Bio Description */}
            <div className="mt-3 text-[13.5px] text-[#475467] leading-relaxed">
              <p className="inline">
                I design user-centered digital experiences that solve real problems and create meaningful impact.{' '}
                {isBioExpanded && (
                  <span className="text-[#475467]">
                    Specializing in end-to-end UX/UI, design systems, and interaction design for complex digital products.
                  </span>
                )}
              </p>
              <button
                onClick={() => setIsBioExpanded(!isBioExpanded)}
                className="inline-flex items-center gap-1 text-[#5828F0] font-semibold text-[13px] ml-1.5 hover:underline"
              >
                <span>{isBioExpanded ? 'Read less' : 'Read more'}</span>
                <ArrowRight size={13} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs (Matching Reference Image) */}
      <div className="flex items-center gap-1 py-1 select-none overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`text-[13.5px] transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'px-4 py-1.5 rounded-full font-semibold pill-active-purple'
                  : 'px-3.5 py-1.5 rounded-full font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-white/80'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
