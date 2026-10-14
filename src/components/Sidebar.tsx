import React from 'react';
import { Home, Users, Briefcase, MessageSquare, Bell, User, Menu, Crown, ArrowRight, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    setIsProModalOpen, 
    showToast, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen 
  } = useApp();

  const isProfileActive = activeView === 'profile-skills' || activeView === 'profile-projects';
  const isJobsActive = activeView.startsWith('assessment');

  const navContent = (
    <>
      {/* Navigation List */}
      <nav className="flex flex-col gap-1">
        {/* Home */}
        <button
          className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60 transition-all text-left group"
          onClick={() => setActiveView('profile-skills')}
        >
          <Home size={18} strokeWidth={1.8} className="text-[#64748B] group-hover:text-[#5828F0] transition-colors" />
          <span>Home</span>
        </button>

        {/* My Network */}
        <button
          className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60 transition-all text-left group"
          onClick={() => showToast('My Network')}
        >
          <Users size={18} strokeWidth={1.8} className="text-[#64748B] group-hover:text-[#5828F0] transition-colors" />
          <span>My Network</span>
        </button>

        {/* Jobs (Links to Technical Assessment) */}
        <button
          className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] transition-all text-left group ${
            isJobsActive
              ? 'bg-[#F0EDFD] text-[#5828F0] font-semibold'
              : 'font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60'
          }`}
          onClick={() => setActiveView('assessment-mcq')}
        >
          {isJobsActive && (
            <span className="absolute left-0 top-2 bottom-2 w-[3.5px] bg-[#5828F0] rounded-r-full" />
          )}
          <div className="flex items-center gap-3.5">
            <Briefcase size={18} strokeWidth={1.8} className={isJobsActive ? 'text-[#5828F0]' : 'text-[#64748B] group-hover:text-[#5828F0] transition-colors'} />
            <span>Jobs</span>
          </div>
          {isJobsActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#5828F0]" />
          )}
        </button>

        {/* Messages */}
        <button
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60 transition-all text-left group"
          onClick={() => showToast('Messages: 3 unread client conversations')}
        >
          <div className="flex items-center gap-3.5">
            <MessageSquare size={18} strokeWidth={1.8} className="text-[#64748B] group-hover:text-[#5828F0] transition-colors" />
            <span>Messages</span>
          </div>
          <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-[#EDE9FE] text-[#5828F0]">
            3
          </span>
        </button>

        {/* Notifications */}
        <button
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60 transition-all text-left group"
          onClick={() => showToast('Notifications: 1 new update')}
        >
          <div className="flex items-center gap-3.5">
            <Bell size={18} strokeWidth={1.8} className="text-[#64748B] group-hover:text-[#5828F0] transition-colors" />
            <span>Notifications</span>
          </div>
        </button>

        {/* Profile (Active) */}
        <button
          className={`relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[13.5px] transition-all text-left ${
            isProfileActive
              ? 'bg-[#F0EDFD] text-[#5828F0] font-semibold'
              : 'font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60'
          }`}
          onClick={() => setActiveView('profile-skills')}
        >
          {isProfileActive && (
            <span className="absolute left-0 top-2 bottom-2 w-[3.5px] bg-[#5828F0] rounded-r-full" />
          )}
          <User size={18} strokeWidth={1.8} className={isProfileActive ? 'text-[#5828F0]' : 'text-[#64748B]'} />
          <span>Profile</span>
        </button>

        {/* More */}
        <button
          className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60 transition-all text-left group"
          onClick={() => showToast('Settings & more')}
        >
          <Menu size={18} strokeWidth={1.8} className="text-[#64748B] group-hover:text-[#5828F0] transition-colors" />
          <span>More</span>
        </button>
      </nav>

      {/* Upgrade to Pro Card Component */}
      <div className="w-full bg-white/85 backdrop-blur-2xl rounded-[26px] border border-white/95 shadow-[0_8px_30px_rgba(100,80,160,0.06)] p-4 relative overflow-hidden group">
        <svg className="absolute -right-4 -bottom-4 w-28 h-28 pointer-events-none opacity-20" viewBox="0 0 100 100">
          <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="#5828F0" strokeWidth="3" />
          <path d="M0,70 Q25,40 50,70 T100,70" fill="none" stroke="#5828F0" strokeWidth="2" />
        </svg>

        <div className="w-8 h-8 rounded-lg flex items-center justify-start text-[#5828F0] mb-2">
          <Crown size={24} className="fill-[#5828F0] text-[#5828F0]" />
        </div>

        <h4 className="font-bold text-[14px] text-[#0F172A] tracking-tight">Upgrade to Pro</h4>
        <p className="text-[11.5px] text-[#64748B] mt-0.5 leading-snug">
          Get advanced tools for faster growth.
        </p>

        <div className="flex justify-end mt-2 relative z-10">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsProModalOpen(true);
            }}
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#0F172A] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            title="Upgrade to Pro"
          >
            <ArrowRight size={15} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Dynamic Floating Cards */}
      <aside className="hidden lg:flex w-[210px] flex-shrink-0 flex-col justify-between self-stretch select-none gap-4">
        {/* Top Navigation Floating Card */}
        <div className="w-full bg-white/85 backdrop-blur-2xl rounded-[26px] border border-white/95 shadow-[0_8px_30px_rgba(100,80,160,0.06)] p-3">
          <nav className="flex flex-col gap-1">
            {/* Home */}
            <button
              className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60 transition-all text-left group cursor-pointer"
              onClick={() => setActiveView('profile-skills')}
            >
              <Home size={18} strokeWidth={1.8} className="text-[#64748B] group-hover:text-[#5828F0] transition-colors" />
              <span>Home</span>
            </button>

            {/* My Network */}
            <button
              className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60 transition-all text-left group cursor-pointer"
              onClick={() => showToast('My Network')}
            >
              <Users size={18} strokeWidth={1.8} className="text-[#64748B] group-hover:text-[#5828F0] transition-colors" />
              <span>My Network</span>
            </button>

            {/* Jobs (Links to Technical Assessment) */}
            <button
              className={`relative flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] transition-all text-left group cursor-pointer ${
                isJobsActive
                  ? 'bg-[#F0EDFD] text-[#5828F0] font-semibold'
                  : 'font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60'
              }`}
              onClick={() => setActiveView('assessment-mcq')}
            >
              {isJobsActive && (
                <span className="absolute left-0 top-2 bottom-2 w-[3.5px] bg-[#5828F0] rounded-r-full" />
              )}
              <div className="flex items-center gap-3.5">
                <Briefcase size={18} strokeWidth={1.8} className={isJobsActive ? 'text-[#5828F0]' : 'text-[#64748B] group-hover:text-[#5828F0] transition-colors'} />
                <span>Jobs</span>
              </div>
              {isJobsActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#5828F0]" />
              )}
            </button>

            {/* Messages */}
            <button
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60 transition-all text-left group cursor-pointer"
              onClick={() => showToast('Messages: 3 unread client conversations')}
            >
              <div className="flex items-center gap-3.5">
                <MessageSquare size={18} strokeWidth={1.8} className="text-[#64748B] group-hover:text-[#5828F0] transition-colors" />
                <span>Messages</span>
              </div>
              <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-[#EDE9FE] text-[#5828F0]">
                3
              </span>
            </button>

            {/* Notifications */}
            <button
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60 transition-all text-left group cursor-pointer"
              onClick={() => showToast('Notifications: 1 new update')}
            >
              <div className="flex items-center gap-3.5">
                <Bell size={18} strokeWidth={1.8} className="text-[#64748B] group-hover:text-[#5828F0] transition-colors" />
                <span>Notifications</span>
              </div>
            </button>

            {/* Profile (Active) */}
            <button
              className={`relative flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[13.5px] transition-all text-left cursor-pointer ${
                isProfileActive
                  ? 'bg-[#F0EDFD] text-[#5828F0] font-semibold'
                  : 'font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60'
              }`}
              onClick={() => setActiveView('profile-skills')}
            >
              {isProfileActive && (
                <span className="absolute left-0 top-2 bottom-2 w-[3.5px] bg-[#5828F0] rounded-r-full" />
              )}
              <User size={18} strokeWidth={1.8} className={isProfileActive ? 'text-[#5828F0]' : 'text-[#64748B]'} />
              <span>Profile</span>
            </button>

            {/* More */}
            <button
              className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-[#475467] hover:text-[#0F172A] hover:bg-white/60 transition-all text-left group cursor-pointer"
              onClick={() => showToast('Settings & more')}
            >
              <Menu size={18} strokeWidth={1.8} className="text-[#64748B] group-hover:text-[#5828F0] transition-colors" />
              <span>More</span>
            </button>
          </nav>
        </div>

        {/* Bottom Upgrade to Pro Card */}
        <div className="w-full bg-white/85 backdrop-blur-2xl rounded-[26px] border border-white/95 shadow-[0_8px_30px_rgba(100,80,160,0.06)] p-4 relative overflow-hidden group">
          <svg className="absolute -right-4 -bottom-4 w-28 h-28 pointer-events-none opacity-20" viewBox="0 0 100 100">
            <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="#5828F0" strokeWidth="3" />
            <path d="M0,70 Q25,40 50,70 T100,70" fill="none" stroke="#5828F0" strokeWidth="2" />
          </svg>

          <div className="w-8 h-8 rounded-lg flex items-center justify-start text-[#5828F0] mb-2">
            <Crown size={24} className="fill-[#5828F0] text-[#5828F0]" />
          </div>

          <h4 className="font-bold text-[14px] text-[#0F172A] tracking-tight">Upgrade to Pro</h4>
          <p className="text-[11.5px] text-[#64748B] mt-0.5 leading-snug">
            Get advanced tools for faster growth.
          </p>

          <div className="flex justify-end mt-2 relative z-10">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsProModalOpen(true);
              }}
              className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#0F172A] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              title="Upgrade to Pro"
            >
              <ArrowRight size={15} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile / Tablet Responsive Slide-Over Glass Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop blur overlay */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-[290px] max-w-[85vw] h-full bg-white border-r border-[#EBE7F7] shadow-2xl p-5 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-slate-100">
                <img
                  src="/assets/rizza-header-logo.png"
                  alt="Rizza"
                  className="h-7 w-auto object-contain"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {navContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
