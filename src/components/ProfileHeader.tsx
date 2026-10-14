import React, { useState } from 'react';
import { MapPin, Briefcase, Share2, MoreHorizontal, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProfileTab } from '../types';

interface ProfileHeaderProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ activeTab, onTabChange }) => {
  const { isConnected, toggleConnect, isAvailable, showToast, setActiveView } = useApp();
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText('https://rizza.life/anniestanley');
    setCopied(true);
    showToast('Profile link copied to clipboard: rizza.life/anniestanley');
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
    <div className="w-full flex flex-col gap-5">
      {/* Main Hero Card */}
      <div className="rizza-card p-6 sm:p-7 relative overflow-hidden bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
        {/* Abstract Fluid Violet Wave Flowing Across the Top Right */}
        <div className="absolute top-0 right-0 w-[55%] h-[80px] pointer-events-none select-none overflow-hidden opacity-95">
          <img
            src="/assets/hero-wave-clean.png"
            alt=""
            className="w-full h-full object-cover object-right-top"
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-6 sm:gap-7 items-start">
          {/* Left: Annie's Portrait Card */}
          <div className="flex-shrink-0 relative group">
            <img
              src="/assets/annie-card-full.png"
              alt="Annie Stanley"
              className="w-[195px] sm:w-[215px] h-auto rounded-2xl object-cover shadow-[0_4px_16px_rgba(85,75,140,0.08)] transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </div>

          {/* Right: Info Area */}
          <div className="flex-1 min-w-0 w-full flex flex-col justify-between pt-1">
            {/* Top Identity & Action Buttons Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-[28px] font-bold text-[#111625] tracking-tight leading-tight">
                    Annie Stanley
                  </h1>
                  {/* Verified Blue Badge */}
                  <span className="inline-flex items-center justify-center text-[#2563EB]" title="Verified Professional">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#2563EB" />
                      <path
                        d="M6 10.2L8.7 13L14.2 7.5"
                        stroke="white"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <p className="text-[#4F17EA] font-semibold text-[15px] mt-0.5">
                  UX Designer
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 self-start">
                {/* Share Button */}
                <button
                  className="btn-icon-sq"
                  title="Share Profile"
                  onClick={handleShare}
                >
                  {copied ? <Check size={18} className="text-green-600" /> : <Share2 size={18} />}
                </button>

                {/* More Options */}
                <button
                  className="btn-icon-sq"
                  title="More Options"
                  onClick={() => showToast('Profile options: export PDF, report, or block')}
                >
                  <MoreHorizontal size={18} />
                </button>

                {/* Connect Button */}
                <button
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                    isConnected
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
                      : 'bg-gradient-to-r from-[#5832E6] to-[#431ECB] text-white shadow-[0_4px_16px_rgba(88,50,230,0.35)] hover:shadow-[0_6px_22px_rgba(88,50,230,0.45)] hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                  onClick={toggleConnect}
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

            {/* Location & Experience Meta Row */}
            <div className="flex items-center gap-5 text-sm text-[#47516B] mt-3.5 flex-wrap">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-[#7E88A2]" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase size={16} className="text-[#7E88A2]" />
                <span>5+ Years Exp.</span>
              </div>
            </div>

            {/* Bio Description */}
            <div className="mt-4 text-sm text-[#47516B] leading-relaxed">
              <p>
                I design user-centered digital experiences that solve real problems and create meaningful impact.
                {isBioExpanded && (
                  <span className="block mt-2 text-[#47516B]">
                    Specialized in high-scale SaaS design systems, fintech user journeys, and data-driven product architecture. Passionate about translating complex logic into intuitive, elegant interfaces.
                  </span>
                )}
              </p>
              <button
                className="inline-flex items-center gap-1 text-[#4F17EA] font-semibold text-sm mt-1.5 hover:underline focus:outline-none"
                onClick={() => setIsBioExpanded(!isBioExpanded)}
              >
                <span>{isBioExpanded ? 'Read less' : 'Read more'}</span>
                <ArrowRight size={14} className={`transition-transform duration-200 ${isBioExpanded ? '-rotate-90' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`px-5 py-2 rounded-full text-[13.5px] font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#4F17EA] text-white font-semibold shadow-[0_4px_14px_rgba(79,23,234,0.32)] scale-[1.02]'
                  : 'text-[#47516B] hover:text-[#111625] hover:bg-white/80 active:scale-95'
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
