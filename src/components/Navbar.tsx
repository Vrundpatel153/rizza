import React, { useState, useRef, useEffect } from 'react';
import { Search, Home, Users, Briefcase, MessageSquare, Bell, ChevronDown, LogOut, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { setActiveView, setActiveProfileTab, userEmail, logout, showToast } = useApp();
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
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-[#ECE8F7]/80">
      <div className="max-w-[1584px] mx-auto px-4 sm:px-6 md:px-8 lg:px-9 h-[70px] flex items-center justify-between gap-4">
        {/* Logo */}
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

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-[480px] hidden md:block">
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-4 text-[#7E88A2] pointer-events-none" />
            <input
              type="text"
              placeholder="Search people, jobs, or companies..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full text-sm bg-[#F4F2FC] border border-[#EDE9F8] text-[#111625] placeholder-[#7E88A2] focus:bg-white focus:border-[#5832E6] focus:outline-none focus:ring-2 focus:ring-[#5832E6]/10 transition-all shadow-inner"
            />
          </div>
        </form>

        {/* Right Navigation & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Home */}
          <button
            onClick={() => {
              setActiveProfileTab('skills');
              setActiveView('profile-skills');
            }}
            className="w-10 h-10 rounded-xl text-[#47516B] hover:text-[#5832E6] hover:bg-white/90 flex items-center justify-center transition-all"
            title="Home"
          >
            <Home size={20} strokeWidth={1.8} />
          </button>

          {/* My Network */}
          <button
            onClick={() => showToast('My Network')}
            className="w-10 h-10 rounded-xl text-[#47516B] hover:text-[#5832E6] hover:bg-white/90 flex items-center justify-center transition-all"
            title="My Network"
          >
            <Users size={20} strokeWidth={1.8} />
          </button>

          {/* Jobs -> Assessment */}
          <button
            onClick={() => setActiveView('assessment-mcq')}
            className="w-10 h-10 rounded-xl text-[#47516B] hover:text-[#5832E6] hover:bg-white/90 flex items-center justify-center transition-all"
            title="Jobs & Technical Assessment"
          >
            <Briefcase size={20} strokeWidth={1.8} />
          </button>

          {/* Messages */}
          <button
            onClick={() => showToast('3 unread client messages')}
            className="relative w-10 h-10 rounded-xl text-[#47516B] hover:text-[#5832E6] hover:bg-white/90 flex items-center justify-center transition-all"
            title="Messages"
          >
            <MessageSquare size={20} strokeWidth={1.8} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#5832E6] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
              3
            </span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => showToast('1 new notification')}
            className="relative w-10 h-10 rounded-xl text-[#47516B] hover:text-[#5832E6] hover:bg-white/90 flex items-center justify-center transition-all"
            title="Notifications"
          >
            <Bell size={20} strokeWidth={1.8} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#5832E6] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
              1
            </span>
          </button>

          {/* User Avatar with Dropdown */}
          <div className="relative ml-1" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 p-0.5 rounded-full hover:ring-2 hover:ring-[#5832E6]/20 transition-all"
              title="Annie Stanley Profile"
            >
              <img
                src="/assets/annie-nav-avatar.png"
                alt="Annie Stanley"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              <ChevronDown size={14} className={`text-[#7E88A2] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#ECE8F7] shadow-[0_10px_35px_-4px_rgba(85,75,140,0.15)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-[#F4F2FA]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-[#111625]">Annie Stanley</span>
                    <CheckCircle2 size={15} className="text-[#2563EB]" />
                  </div>
                  <div className="text-xs text-[#7E88A2] truncate">{userEmail}</div>
                  <div className="mt-1.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#EDE9FE] text-[#5832E6]">
                    Candidate · Verified
                  </div>
                </div>

                <div className="py-1 text-xs">
                  <button
                    onClick={() => {
                      setActiveProfileTab('skills');
                      setActiveView('profile-skills');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left font-medium text-[#47516B] hover:bg-[#F4F1FF] hover:text-[#5832E6] transition-colors"
                  >
                    View Profile (Skills)
                  </button>
                  <button
                    onClick={() => {
                      setActiveProfileTab('projects');
                      setActiveView('profile-projects');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left font-medium text-[#47516B] hover:bg-[#F4F1FF] hover:text-[#5832E6] transition-colors"
                  >
                    View Projects Tab
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('assessment-mcq');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left font-medium text-[#47516B] hover:bg-[#F4F1FF] hover:text-[#5832E6] transition-colors"
                  >
                    Technical Assessment (MCQ)
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('assessment-subjective');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left font-medium text-[#47516B] hover:bg-[#F4F1FF] hover:text-[#5832E6] transition-colors"
                  >
                    Technical Assessment (Subjective)
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('employment-details');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left font-medium text-[#47516B] hover:bg-[#F4F1FF] hover:text-[#5832E6] transition-colors"
                  >
                    Employment Details
                  </button>
                </div>

                <div className="border-t border-[#F4F2FA] pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left font-medium text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2 text-xs"
                  >
                    <LogOut size={14} />
                    <span>Log out</span>
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
