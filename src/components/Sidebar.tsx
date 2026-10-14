import React from 'react';
import { Home, Users, Briefcase, MessageSquare, Bell, User, Menu, Crown, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, setIsProModalOpen, showToast } = useApp();

  const isProfileActive = activeView === 'profile-skills' || activeView === 'profile-projects';

  return (
    <aside className="w-full lg:w-[195px] flex-shrink-0 flex flex-col gap-6 select-none">
      {/* Navigation List */}
      <nav className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-1 no-scrollbar">
        {/* Home */}
        <button
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#47516B] hover:text-[#111625] hover:bg-white/70 transition-all text-left whitespace-nowrap group"
          onClick={() => setActiveView('profile-skills')}
        >
          <Home size={19} className="text-[#7E88A2] group-hover:text-[#5832E6] transition-colors" />
          <span>Home</span>
        </button>

        {/* My Network */}
        <button
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#47516B] hover:text-[#111625] hover:bg-white/70 transition-all text-left whitespace-nowrap group"
          onClick={() => showToast('My Network: 142 connections')}
        >
          <Users size={19} className="text-[#7E88A2] group-hover:text-[#5832E6] transition-colors" />
          <span>My Network</span>
        </button>

        {/* Jobs (Links to Assessment) */}
        <button
          className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-left whitespace-nowrap group ${
            activeView.startsWith('assessment')
              ? 'bg-[#EDE9FE] text-[#5832E6]'
              : 'text-[#47516B] hover:text-[#111625] hover:bg-white/70'
          }`}
          onClick={() => setActiveView('assessment-mcq')}
        >
          <div className="flex items-center gap-3">
            {activeView.startsWith('assessment') && (
              <span className="absolute -left-1.5 top-2.5 bottom-2.5 w-1 rounded-r-md bg-[#5832E6]" />
            )}
            <Briefcase size={19} className={activeView.startsWith('assessment') ? 'text-[#5832E6]' : 'text-[#7E88A2] group-hover:text-[#5832E6] transition-colors'} />
            <span>Jobs</span>
          </div>
          {activeView.startsWith('assessment') && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#5832E6]" />
          )}
        </button>

        {/* Messages */}
        <button
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#47516B] hover:text-[#111625] hover:bg-white/70 transition-all text-left whitespace-nowrap group"
          onClick={() => showToast('Messages: 3 unread client conversations')}
        >
          <div className="flex items-center gap-3">
            <MessageSquare size={19} className="text-[#7E88A2] group-hover:text-[#5832E6] transition-colors" />
            <span>Messages</span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#EDE9FE] text-[#5832E6]">
            3
          </span>
        </button>

        {/* Notifications */}
        <button
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#47516B] hover:text-[#111625] hover:bg-white/70 transition-all text-left whitespace-nowrap group"
          onClick={() => showToast('Notifications: Profile viewed by 18 recruiters today')}
        >
          <div className="flex items-center gap-3">
            <Bell size={19} className="text-[#7E88A2] group-hover:text-[#5832E6] transition-colors" />
            <span>Notifications</span>
          </div>
        </button>

        {/* Profile (Active) */}
        <button
          className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-left whitespace-nowrap ${
            isProfileActive
              ? 'bg-[#EDE9FE] text-[#5832E6]'
              : 'text-[#47516B] hover:text-[#111625] hover:bg-white/70'
          }`}
          onClick={() => setActiveView('profile-skills')}
        >
          {isProfileActive && (
            <span className="absolute -left-1.5 top-2.5 bottom-2.5 w-1 rounded-r-md bg-[#5832E6]" />
          )}
          <User size={19} className={isProfileActive ? 'text-[#5832E6]' : 'text-[#7E88A2]'} />
          <span>Profile</span>
        </button>

        {/* More */}
        <button
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#47516B] hover:text-[#111625] hover:bg-white/70 transition-all text-left whitespace-nowrap group"
          onClick={() => showToast('More settings: privacy, preferences, verified credentials')}
        >
          <Menu size={19} className="text-[#7E88A2] group-hover:text-[#5832E6] transition-colors" />
          <span>More</span>
        </button>
      </nav>

      {/* Upgrade to Pro Card */}
      <div
        onClick={() => setIsProModalOpen(true)}
        className="mt-2 lg:mt-auto rizza-card p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-[#ece8f7] shadow-[0_4px_16px_rgba(85,75,140,0.06)] hover:shadow-[0_8px_24px_rgba(88,50,230,0.15)] hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
      >
        <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform shadow-sm">
          <Crown size={18} strokeWidth={2.2} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#111625] group-hover:text-[#5832E6] transition-colors">
            Upgrade to Pro
          </h4>
          <p className="text-[11px] text-[#7E88A2] mt-0.5 leading-tight">
            Get advanced tools for faster growth.
          </p>
        </div>
        <div className="flex justify-end mt-3">
          <div className="w-6 h-6 rounded-full bg-[#F4F1FF] text-[#5832E6] flex items-center justify-center group-hover:bg-[#5832E6] group-hover:text-white transition-all shadow-sm">
            <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </aside>
  );
};
