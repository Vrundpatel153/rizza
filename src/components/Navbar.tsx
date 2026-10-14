import React, { useState, useRef, useEffect } from 'react';
import { Search, Home, Users, Briefcase, MessageSquare, Bell, ChevronDown, LogOut, CheckCircle2, Menu } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { setActiveView, setActiveProfileTab, userEmail, logout, showToast, setIsMobileMenuOpen } = useApp();
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      showToast(`Searching for "${searchValue}"...`);
    }
  };

  return (
    <header className="w-full bg-transparent">
      <div className="max-w-[1584px] mx-auto px-4 md:px-6 h-[66px] flex items-center justify-between gap-4 sm:gap-6">
        {/* Left: Mobile Hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden w-9 h-9 rounded-xl bg-white/80 border border-slate-200/60 shadow-sm flex items-center justify-center text-slate-700 hover:text-[#5828F0] hover:bg-white transition-all"
            title="Open Menu"
          >
            <Menu size={20} />
          </button>

          <div
            onClick={() => {
              setActiveProfileTab('skills');
              setActiveView('profile-skills');
            }}
            className="flex items-center gap-2.5 cursor-pointer flex-shrink-0 group"
            title="Rizza Platform"
          >
            <img
              src="/assets/rizza-header-logo.png"
              alt="Rizza"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </div>
        </div>

        {/* Search Input Bar (Capsule Pill matching reference) */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-[580px] hidden md:block">
          <div className="relative flex items-center">
            <Search size={17} className="absolute left-4 text-[#7E88A2] pointer-events-none" />
            <input
              type="text"
              placeholder="Search people, jobs, or companies..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full text-[13.5px] bg-white/75 backdrop-blur-md border border-white/95 text-[#0F172A] placeholder-[#8A94A6] focus:bg-white focus:border-[#5828F0]/30 focus:outline-none focus:ring-2 focus:ring-[#5828F0]/15 transition-all shadow-[0_2px_8px_rgba(100,80,160,0.04)]"
            />
          </div>
        </form>

        {/* Right Navigation & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Home */}
          <button
            onClick={() => {
              setActiveProfileTab('skills');
              setActiveView('profile-skills');
            }}
            className="w-9 h-9 rounded-xl text-[#475467] hover:text-[#5828F0] hover:bg-white/80 flex items-center justify-center transition-all"
            title="Home"
          >
            <Home size={19} strokeWidth={1.8} />
          </button>

          {/* My Network */}
          <button
            onClick={() => showToast('My Network')}
            className="w-9 h-9 rounded-xl text-[#475467] hover:text-[#5828F0] hover:bg-white/80 flex items-center justify-center transition-all"
            title="My Network"
          >
            <Users size={19} strokeWidth={1.8} />
          </button>

          {/* Jobs -> Assessment */}
          <button
            onClick={() => setActiveView('assessment-mcq')}
            className="w-9 h-9 rounded-xl text-[#475467] hover:text-[#5828F0] hover:bg-white/80 flex items-center justify-center transition-all"
            title="Jobs & Technical Assessment"
          >
            <Briefcase size={19} strokeWidth={1.8} />
          </button>

          {/* Messages with purple badge 3 */}
          <button
            onClick={() => showToast('Messages: 3 unread client messages')}
            className="relative w-9 h-9 rounded-xl text-[#475467] hover:text-[#5828F0] hover:bg-white/80 flex items-center justify-center transition-all"
            title="Messages"
          >
            <MessageSquare size={19} strokeWidth={1.8} />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#5828F0] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
              3
            </span>
          </button>

          {/* Notifications with purple badge 1 */}
          <button
            onClick={() => showToast('Notifications: 1 new update')}
            className="relative w-9 h-9 rounded-xl text-[#475467] hover:text-[#5828F0] hover:bg-white/80 flex items-center justify-center transition-all"
            title="Notifications"
          >
            <Bell size={19} strokeWidth={1.8} />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#5828F0] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
              1
            </span>
          </button>

          {/* User Profile Avatar with dropdown */}
          <div className="relative ml-1" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 p-1 rounded-full hover:bg-white/80 transition-all"
              title="Profile menu"
            >
              <img
                src="/assets/annie-portrait.png"
                alt="Annie Stanley"
                className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <ChevronDown size={14} className="text-[#64748B]" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100 flex items-center gap-3">
                  <img
                    src="/assets/annie-portrait.png"
                    alt="Annie Stanley"
                    className="w-10 h-10 rounded-full object-cover border border-purple-200"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[#0F172A] truncate">Annie Stanley</p>
                    <p className="text-xs text-[#5828F0] flex items-center gap-1">
                      <CheckCircle2 size={12} /> Verified UX Designer
                    </p>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveView('profile-skills');
                      setActiveProfileTab('skills');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-[#334155] hover:bg-purple-50 hover:text-[#5828F0] flex items-center gap-2 transition-colors"
                  >
                    View Skills & Profile
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('profile-projects');
                      setActiveProfileTab('projects');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-[#334155] hover:bg-purple-50 hover:text-[#5828F0] flex items-center gap-2 transition-colors"
                  >
                    View Featured Projects
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('assessment-mcq');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-[#334155] hover:bg-purple-50 hover:text-[#5828F0] flex items-center gap-2 transition-colors"
                  >
                    Take Assessment MCQ
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('assessment-subjective');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-[#334155] hover:bg-purple-50 hover:text-[#5828F0] flex items-center gap-2 transition-colors"
                  >
                    Take Assessment Subjective
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('employment-details');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-[#334155] hover:bg-purple-50 hover:text-[#5828F0] flex items-center gap-2 transition-colors"
                  >
                    Employment Details (6 Steps)
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={13} /> Sign Out ({userEmail.split('@')[0]})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
