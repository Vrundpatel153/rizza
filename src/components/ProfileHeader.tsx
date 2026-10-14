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
      <div className="p-6 relative overflow-hidden bg-white/90 backdrop-blur-2xl border border-white/95 rounded-[26px] shadow-[0_10px_35px_rgba(110,80,190,0.06)]">
        {/* Seamless 3D Fluid Violet Wave Ribbon in Top-Right Quadrant */}
        <div className="absolute top-0 right-0 w-[580px] h-[210px] pointer-events-none select-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 580 210" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#5828F0" stopOpacity="0.12" />
              </linearGradient>
              <linearGradient id="heroWaveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#C4B5FD" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="heroGlow" cx="80%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGlow)" />
            {/* Smooth Ribbon 1 */}
            <path
              d="M580,0 C440,30 360,95 240,80 C140,65 60,130 0,145 L0,0 Z"
              fill="url(#heroWaveGrad2)"
            />
            {/* Smooth Ribbon 2 with depth */}
            <path
              d="M580,25 C460,70 380,140 220,110 C130,95 40,165 0,175 L0,210 L580,210 Z"
              fill="url(#heroWaveGrad1)"
            />
            {/* Fine curved accent line */}
            <path
              d="M580,45 C420,90 320,150 160,115 C90,100 20,170 0,180"
              stroke="#8B5CF6"
              strokeWidth="1.2"
              strokeOpacity="0.35"
              fill="none"
            />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
          {/* Left: Annie's Portrait Card */}
          <div className="flex-shrink-0 relative group">
            <div className="w-[172px] h-[172px] rounded-[22px] overflow-hidden relative border-2 border-white shadow-md bg-[#F0EEF8]">
              <img
                src="/assets/annie-portrait.png"
                alt="Annie Stanley"
                className="w-full h-full object-cover object-top"
              />
              {/* Green Available for opportunities pill */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-slate-100 shadow-sm flex items-center gap-1.5 text-[11px] font-medium text-[#027A48]">
                <span className="w-2 h-2 rounded-full bg-[#12B76A] animate-pulse" />
                <span>Available for opportunities</span>
              </div>
            </div>
          </div>

          {/* Right: Info Area */}
          <div className="flex-1 min-w-0 w-full flex flex-col justify-between pt-0.5">
            {/* Top Identity & Action Buttons Row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-[26px] font-bold text-[#0F172A] tracking-tight leading-none">
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
              <div className="flex items-center gap-2 flex-shrink-0 relative z-20">
                {/* Share Button */}
                <button
                  className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200/70 shadow-sm flex items-center justify-center text-slate-700 hover:bg-white hover:shadow transition-all"
                  title="Share Profile"
                  onClick={handleShare}
                >
                  {copied ? <Check size={18} className="text-emerald-600" /> : <Share2 size={18} />}
                </button>

                {/* More Options */}
                <button
                  className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200/70 shadow-sm flex items-center justify-center text-slate-700 hover:bg-white hover:shadow transition-all"
                  title="More Options"
                  onClick={() => showToast('Profile options: export PDF, report, or share')}
                >
                  <MoreHorizontal size={18} />
                </button>

                {/* Connect Button */}
                <button
                  onClick={toggleConnect}
                  className={`px-6 py-2 rounded-2xl text-[13.5px] font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                    isConnected
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-sm'
                      : 'btn-primary-gradient shadow-[0_8px_20px_rgba(88,40,240,0.45)]'
                  }`}
                >
                  {isConnected ? (
                    <>
                      <Check size={16} strokeWidth={2.5} />
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
      <div className="flex items-center gap-1.5 py-1 select-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`text-[13.5px] transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'px-7 py-2 rounded-full font-semibold pill-primary-gradient'
                  : 'px-5 py-2 rounded-full font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60'
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
