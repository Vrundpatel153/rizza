import React, { useState } from 'react';
import { 
  ArrowRight, Mail, MapPin, Copy, Check, ExternalLink, 
  Smartphone, Monitor, Box, Users, Layers, Sparkles, GraduationCap,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProfileRightRailProps {
  variant: 'skills' | 'projects';
}

export const ProfileRightRail: React.FC<ProfileRightRailProps> = ({ variant }) => {
  const { setActiveView, setActiveProfileTab, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://rizza.life/anniestanley');
    setCopied(true);
    showToast('Profile link copied: rizza.life/anniestanley');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {variant === 'skills' ? (
        <>
          {/* My Journey Card */}
          <div className="rizza-card p-6 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-[#111625] tracking-tight">
                My journey
              </h3>
              <button
                onClick={() => setActiveView('employment-details')}
                className="text-xs font-semibold text-[#5832E6] hover:underline inline-flex items-center gap-1"
              >
                <span>View timeline</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Figma */}
              <div
                onClick={() => setActiveView('employment-details')}
                title="Click to view detailed employment history"
                className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F8F7FD] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
                    <span className="text-base">❖</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111625] group-hover:text-[#5832E6] transition-colors">
                      Senior UX Designer
                    </h4>
                    <p className="text-xs text-[#7E88A2]">Figma</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-[#111625]">2022 – Present</div>
                  <div className="text-[11px] text-[#7E88A2]">Mumbai, India</div>
                </div>
              </div>

              {/* InVision */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F8F7FD] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFF2EC] text-[#EA580C] flex items-center justify-center font-bold text-sm shadow-sm">
                    in
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111625]">UX Designer</h4>
                    <p className="text-xs text-[#7E88A2]">InVision</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-[#111625]">2020 – 2022</div>
                  <div className="text-[11px] text-[#7E88A2]">San Francisco, USA</div>
                </div>
              </div>

              {/* Behance */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F8F7FD] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EAF8F0] text-[#16A34A] flex items-center justify-center font-bold text-sm shadow-sm">
                    Bē
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111625]">Junior Designer</h4>
                    <p className="text-xs text-[#7E88A2]">Behance</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-[#111625]">2018 – 2020</div>
                  <div className="text-[11px] text-[#7E88A2]">Bangalore, India</div>
                </div>
              </div>

              {/* IDC School */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F8F7FD] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F1F3F9] text-[#47516B] flex items-center justify-center shadow-sm">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111625]">B.Des in Interaction Design</h4>
                    <p className="text-xs text-[#7E88A2]">IDC School of Design</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-[#111625]">2014 – 2018</div>
                  <div className="text-[11px] text-[#7E88A2]">Mumbai, India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Work Mini Cards */}
          <div className="rizza-card p-6 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#111625] tracking-tight">
                Featured work
              </h3>
              <button
                onClick={() => {
                  setActiveProfileTab('projects');
                  setActiveView('profile-projects');
                }}
                className="text-xs font-semibold text-[#5832E6] hover:underline inline-flex items-center gap-1"
              >
                <span>View all projects</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* FinMate */}
              <div
                onClick={() => {
                  setActiveProfileTab('projects');
                  setActiveView('profile-projects');
                }}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative rounded-xl overflow-hidden aspect-square bg-[#F3F0FA] shadow-sm border border-[#ECE8F7]">
                  <img
                    src="/assets/thumb-finmate.png"
                    alt="FinMate"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded bg-black/40 text-white flex items-center justify-center">
                    <ExternalLink size={10} />
                  </div>
                </div>
                <div className="mt-2">
                  <h4 className="text-xs font-bold text-[#111625] group-hover:text-[#5832E6] truncate">FinMate</h4>
                  <p className="text-[10.5px] text-[#7E88A2] truncate">Personal Finance App</p>
                </div>
              </div>

              {/* HealthTrack */}
              <div
                onClick={() => {
                  setActiveProfileTab('projects');
                  setActiveView('profile-projects');
                }}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative rounded-xl overflow-hidden aspect-square bg-[#F3F0FA] shadow-sm border border-[#ECE8F7]">
                  <img
                    src="/assets/thumb-healthtrack.png"
                    alt="HealthTrack"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded bg-black/40 text-white flex items-center justify-center">
                    <ExternalLink size={10} />
                  </div>
                </div>
                <div className="mt-2">
                  <h4 className="text-xs font-bold text-[#111625] group-hover:text-[#5832E6] truncate">HealthTrack</h4>
                  <p className="text-[10.5px] text-[#7E88A2] truncate">Health & Fitness</p>
                </div>
              </div>

              {/* TravelEase */}
              <div
                onClick={() => {
                  setActiveProfileTab('projects');
                  setActiveView('profile-projects');
                }}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative rounded-xl overflow-hidden aspect-square bg-[#F3F0FA] shadow-sm border border-[#ECE8F7]">
                  <img
                    src="/assets/thumb-travelease.png"
                    alt="TravelEase"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded bg-black/40 text-white flex items-center justify-center">
                    <ExternalLink size={10} />
                  </div>
                </div>
                <div className="mt-2">
                  <h4 className="text-xs font-bold text-[#111625] group-hover:text-[#5832E6] truncate">TravelEase</h4>
                  <p className="text-[10.5px] text-[#7E88A2] truncate">Travel Planning</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* PROJECTS VARIANT */
        <>
          {/* Project Highlights Stats */}
          <div className="rizza-card p-6 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
            <h3 className="text-base font-bold text-[#111625] tracking-tight mb-4">
              Project highlights
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#F8F7FD] border border-[#ECE8F7] text-center flex flex-col items-center">
                <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center mb-1.5">
                  <Layers size={16} />
                </div>
                <div className="text-lg font-bold text-[#111625]">12+</div>
                <div className="text-[11px] text-[#7E88A2]">Projects</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F7FD] border border-[#ECE8F7] text-center flex flex-col items-center">
                <div className="w-8 h-8 rounded-xl bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center mb-1.5">
                  <Users size={16} />
                </div>
                <div className="text-lg font-bold text-[#111625]">50K+</div>
                <div className="text-[11px] text-[#7E88A2]">Users Impacted</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F7FD] border border-[#ECE8F7] text-center flex flex-col items-center">
                <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] text-[#5832E6] flex items-center justify-center mb-1.5">
                  <Sparkles size={16} />
                </div>
                <div className="text-lg font-bold text-[#111625]">3</div>
                <div className="text-[11px] text-[#7E88A2]">Featured</div>
              </div>
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="rizza-card p-6 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#111625] tracking-tight">
                Tools & technologies
              </h3>
              <button
                onClick={() => showToast('Viewing full technology stack')}
                className="text-xs font-semibold text-[#5832E6] hover:underline inline-flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { name: 'Figma', symbol: '❖', color: 'text-purple-600 bg-purple-50' },
                { name: 'Notion', symbol: 'N', color: 'text-gray-800 bg-gray-100' },
                { name: 'Adobe XD', symbol: 'Xd', color: 'text-pink-600 bg-pink-50' },
                { name: 'Photoshop', symbol: 'Ps', color: 'text-blue-600 bg-blue-50' },
                { name: 'Illustrator', symbol: 'Ai', color: 'text-amber-600 bg-amber-50' },
                { name: 'Protopie', symbol: '✦', color: 'text-rose-600 bg-rose-50' }
              ].map((tool, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-xl bg-[#F8F7FD] border border-[#ECE8F7] hover:border-[#D6D0F2] transition-colors cursor-pointer"
                >
                  <span className={`w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold ${tool.color}`}>
                    {tool.symbol}
                  </span>
                  <span className="text-xs font-semibold text-[#111625] truncate">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* What I Enjoy Working On */}
          <div className="rizza-card p-6 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
            <h3 className="text-base font-bold text-[#111625] tracking-tight mb-4">
              What I enjoy working on
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: 'Mobile Apps', icon: Smartphone },
                { label: 'Web Apps', icon: Monitor },
                { label: 'Design Systems', icon: Box },
                { label: 'User Research', icon: Users }
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#F8F7FD] border border-[#ECE8F7] flex flex-col items-center justify-center group hover:bg-[#F3EFFC] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#5832E6] mb-1.5 group-hover:scale-110 transition-transform">
                      <IconComp size={16} />
                    </div>
                    <span className="text-[11px] font-semibold text-[#47516B] leading-tight">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Steve Jobs Quote Card for Projects Tab */}
          <div className="rizza-card p-6 relative overflow-hidden bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)] flex items-center justify-between">
            <div className="relative z-10 max-w-[78%]">
              <div className="flex items-start gap-2.5">
                <span className="text-2xl font-serif text-[#5832E6] leading-none font-bold select-none">
                  “
                </span>
                <div>
                  <p className="text-[13.5px] font-medium text-[#111625] leading-snug">
                    Good design solves problems. Great design makes life better.
                  </p>
                  <p className="text-xs font-semibold italic text-[#5832E6] mt-1.5">
                    — Steve Jobs
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-[120px] pointer-events-none select-none opacity-90 overflow-hidden">
              <img
                src="/assets/quote-orb-graphic.png"
                alt=""
                className="w-full h-full object-cover object-right"
              />
            </div>
          </div>
        </>
      )}

      {/* Let's Connect Card (Shared by both variants) */}
      <div className="rizza-card p-6 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)] flex flex-col gap-4">
        <div>
          <h3 className="text-base font-bold text-[#111625] tracking-tight">
            Let's connect
          </h3>
          <p className="text-xs text-[#7E88A2] mt-0.5 leading-relaxed">
            I'm always open to interesting conversations and new opportunities.
          </p>
        </div>

        {/* Contact Info Rows */}
        <div className="flex flex-col gap-2.5 text-xs text-[#47516B]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#F4F1FF] text-[#5832E6] flex items-center justify-center flex-shrink-0">
              <Mail size={13} />
            </div>
            <a href="mailto:annie.stanley@gmail.com" className="hover:text-[#5832E6] transition-colors font-medium">
              annie.stanley@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#F4F1FF] text-[#5832E6] flex items-center justify-center flex-shrink-0">
              <MapPin size={13} />
            </div>
            <span className="font-medium">Mumbai, India</span>
          </div>
        </div>

        {/* Social Icons Row */}
        <div className="flex items-center gap-2 pt-1">
          {/* LinkedIn */}
          <button
            onClick={() => showToast('Opening LinkedIn')}
            className="w-9 h-9 rounded-xl bg-[#F8F7FD] border border-[#ECE8F7] text-[#47516B] hover:text-[#0A66C2] flex items-center justify-center transition-all hover:bg-white hover:border-[#D6D0F2] hover:scale-110 active:scale-95 shadow-sm"
            title="LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
            </svg>
          </button>

          {/* Dribbble / Web */}
          <button
            onClick={() => showToast('Opening Portfolio Website')}
            className="w-9 h-9 rounded-xl bg-[#F8F7FD] border border-[#ECE8F7] text-[#47516B] hover:text-[#EA4C89] flex items-center justify-center transition-all hover:bg-white hover:border-[#D6D0F2] hover:scale-110 active:scale-95 shadow-sm"
            title="Website"
          >
            <Globe size={16} />
          </button>

          {/* Behance */}
          <button
            onClick={() => showToast('Opening Behance Profile')}
            className="w-9 h-9 rounded-xl bg-[#F8F7FD] border border-[#ECE8F7] text-[#47516B] hover:text-[#1769FF] flex items-center justify-center transition-all hover:bg-white hover:border-[#D6D0F2] hover:scale-110 active:scale-95 shadow-sm font-bold text-xs"
            title="Behance"
          >
            Bē
          </button>

          {/* Instagram */}
          <button
            onClick={() => showToast('Opening Instagram')}
            className="w-9 h-9 rounded-xl bg-[#F8F7FD] border border-[#ECE8F7] text-[#47516B] hover:text-[#E4405F] flex items-center justify-center transition-all hover:bg-white hover:border-[#D6D0F2] hover:scale-110 active:scale-95 shadow-sm"
            title="Instagram"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </button>
        </div>

        {/* Share My Profile Box */}
        <div className="p-3.5 rounded-2xl bg-[#F8F7FD] border border-[#ECE8F7] flex flex-col gap-2 mt-1">
          <span className="text-xs font-semibold text-[#111625]">Share my profile</span>
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-[#ECE8F7] shadow-sm">
            <div className="flex items-center gap-1.5 text-xs text-[#5832E6] font-medium truncate">
              <span>🔗</span>
              <span className="truncate">rizza.life/anniestanley</span>
            </div>
            <button
              onClick={handleCopyLink}
              title="Copy Profile Link"
              className="p-1 rounded-lg text-[#7E88A2] hover:text-[#5832E6] hover:bg-[#F4F1FF] transition-all flex-shrink-0"
            >
              {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
