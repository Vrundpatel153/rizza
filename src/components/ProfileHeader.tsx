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
    <div className="w-full flex flex-col gap-4">
      {/* Main Hero Card */}
      <div className="rizza-card p-6 sm:p-7 relative overflow-hidden bg-white/90 backdrop-blur-2xl border border-white/95 rounded-[28px] shadow-[0_8px_32px_-4px_rgba(112,66,248,0.07)]">
        {/* Pristine 3D Fluid Violet Ribbon Wave Across the Top Right */}
        <div className="absolute -top-4 -right-4 w-[60%] sm:w-[50%] h-[150px] pointer-events-none select-none overflow-hidden opacity-90">
          <img
            src="/assets/hero-wave-clean.png?v=3"
            alt=""
            className="w-full h-full object-cover object-right-top"
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-6 sm:gap-7 items-start">
          {/* Left: Annie's Portrait Card with integrated Available badge */}
          <div className="flex-shrink-0 relative group">
            <img
              src="/assets/annie-portrait.png"
              alt="Annie Stanley"
              className="w-[180px] sm:w-[200px] h-auto rounded-[22px] object-cover shadow-[0_6px_24px_rgba(90,80,140,0.1)] transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </div>

          {/* Right: Info Area */}
          <div className="flex-1 min-w-0 w-full flex flex-col justify-between pt-1">
            {/* Top Identity & Action Buttons Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-[30px] font-bold text-[#0F172A] tracking-tight leading-tight">
                    Annie Stanley
                  </h1>
                  {/* Verified Rosette Badge */}
                  <span className="inline-flex items-center justify-center text-[#5828F0]" title="Verified Professional">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.4 2.4 3.4-.4 1.2 3.2 3.1 1.5-.7 3.3 2.1 2.7-2.1 2.7.7 3.3-3.1 1.5-1.2 3.2-3.4-.4L12 22l-2.4-2.4-3.4.4-1.2-3.2-3.1-1.5.7-3.3-2.1-2.7 2.1-2.7-.7-3.3 3.1-1.5 1.2-3.2 3.4.4L12 2z" />
                      <path d="M9.5 12l2 2 4.5-4.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </span>
                </div>
                <p className="text-[#5828F0] font-semibold text-[15px] mt-0.5">
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
                  onClick={() => showToast('Profile options: export PDF, report, or share')}
                >
                  <MoreHorizontal size={18} />
                </button>

                {/* Connect Button */}
                <button
                  style={!isConnected ? { background: 'linear-gradient(135deg, #5828F0 0%, #461AD9 100%)', color: '#FFFFFF', boxShadow: '0 4px 16px rgba(88, 40, 240, 0.35)' } : {}}
                  className={`px-7 py-2.5 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    isConnected
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-sm'
                      : 'hover:brightness-105 hover:scale-[1.02]'
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
            <div className="flex items-center gap-5 text-sm text-[#475569] mt-3.5 flex-wrap">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-[#64748B]" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase size={16} className="text-[#64748B]" />
                <span>5+ Years Exp.</span>
              </div>
            </div>

            {/* Bio Description */}
            <div className="mt-4 text-sm text-[#475569] leading-relaxed">
              <p>
                I design user-centered digital experiences that solve real problems and create meaningful impact.
                {isBioExpanded && (
                  <span className="block mt-2 text-[#475569]">
                    Specialized in high-scale SaaS design systems, fintech user journeys, and data-driven product architecture. Passionate about translating complex logic into intuitive, elegant interfaces.
                  </span>
                )}
              </p>
              <button
                className="inline-flex items-center gap-1 text-[#5828F0] font-semibold text-sm mt-1.5 hover:underline focus:outline-none"
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
              style={isActive ? { backgroundColor: '#5828F0', color: '#FFFFFF', boxShadow: '0 4px 16px rgba(88, 40, 240, 0.35)' } : {}}
              className={`px-6 py-2 rounded-full text-[14px] transition-all whitespace-nowrap ${
                isActive
                  ? 'font-semibold scale-[1.02]'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white/80 active:scale-95 font-medium'
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
