import React, { useState } from 'react';
import { 
  Users, UserPlus, Check, MessageSquare, Search, 
  MapPin, Briefcase, ExternalLink, Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NetworkPage: React.FC = () => {
  const { showToast, setActiveView } = useApp();
  const [connectedIds, setConnectedIds] = useState<string[]>([]);

  const connections = [
    {
      id: 'conn-1',
      name: 'Rohan Sharma',
      role: 'Staff Product Designer @ Uber',
      location: 'San Francisco, CA',
      avatar: 'RS',
      mutuals: 18,
      tags: ['Design Systems', 'Mobility']
    },
    {
      id: 'conn-2',
      name: 'Priya Mehta',
      role: 'Design Director @ Cred',
      location: 'Bangalore, India',
      avatar: 'PM',
      mutuals: 24,
      tags: ['Fintech UX', 'Creative Direction']
    },
    {
      id: 'conn-3',
      name: 'Alexandre Dubois',
      role: 'Lead Interaction Designer @ Figma',
      location: 'Paris, France',
      avatar: 'AD',
      mutuals: 31,
      tags: ['Canvas UX', 'Prototyping']
    },
    {
      id: 'conn-4',
      name: 'Sarah Jenkins',
      role: 'VP of Product Design @ Stripe',
      location: 'New York, USA',
      avatar: 'SJ',
      mutuals: 42,
      tags: ['Leadership', 'Payments']
    }
  ];

  const handleConnectToggle = (id: string, name: string) => {
    if (connectedIds.includes(id)) {
      setConnectedIds(prev => prev.filter(c => c !== id));
      showToast(`Disconnected from ${name}`);
    } else {
      setConnectedIds(prev => [...prev, id]);
      showToast(`Connection invitation sent to ${name}!`);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 items-start">
      {/* Center Main Network Column */}
      <div className="min-w-0 w-full flex flex-col gap-4">
        {/* Banner Card */}
        <div className="p-6 sm:p-7 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#5828F0] text-xs font-semibold mb-2">
              <Sparkles size={13} />
              <span>Verified Talent Network</span>
            </div>
            <h1 className="text-xl sm:text-[24px] font-bold text-[#0F172A] tracking-tight">
              My Network &amp; Mentors
            </h1>
            <p className="text-xs text-[#64748B] mt-1">
              Connect with verified product designers, engineering leads, and hiring executives across the global ecosystem.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-[#F8F7FD] border border-[#ECE7F8] text-center flex-shrink-0">
            <span className="text-[18px] font-bold text-[#5828F0]">482</span>
            <span className="text-[11px] text-[#64748B] block">Connections</span>
          </div>
        </div>

        {/* Network Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {connections.map(conn => {
            const isConnected = connectedIds.includes(conn.id);
            return (
              <div
                key={conn.id}
                className="p-5 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col justify-between gap-4 hover:border-[#D6D0F2] transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[#EDE9FE] text-[#5828F0] font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm border border-[#DDD6FE]">
                        {conn.avatar}
                      </div>
                      <div>
                        <h3 className="text-[14.5px] font-bold text-[#0F172A] leading-tight">
                          {conn.name}
                        </h3>
                        <p className="text-[11.5px] text-[#64748B] mt-0.5 font-medium">
                          {conn.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#64748B] mt-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{conn.location}</span>
                    </span>
                    <span>•</span>
                    <span>{conn.mutuals} mutual connections</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap mt-3">
                    {conn.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-[#FAF9FE] text-[#5828F0] border border-[#ECE7F8]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#ECE7F8]">
                  <button
                    onClick={() => setActiveView('messages')}
                    className="p-2 rounded-xl bg-[#F8F7FD] border border-[#ECE7F8] hover:bg-white text-[#475569] hover:text-[#5828F0] transition-colors cursor-pointer"
                    title="Send Message"
                  >
                    <MessageSquare size={14} />
                  </button>

                  <button
                    onClick={() => handleConnectToggle(conn.id, conn.name)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isConnected
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                        : 'bg-[#5828F0] hover:bg-[#4D1FE0] text-white shadow-sm'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check size={13} strokeWidth={2.5} />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={13} />
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column Contextual Rail */}
      <div className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-4">
        {/* Invitations Card */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] font-bold text-[#0F172A] tracking-tight">
              Pending Invites
            </h3>
            <span className="text-xs font-bold text-[#5828F0]">2 New</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="p-3 rounded-2xl bg-[#F8F7FD] border border-[#ECE7F8] flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0284C7] font-bold text-xs flex items-center justify-center">
                  DK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Danielle King</h4>
                  <p className="text-[10.5px] text-[#64748B]">Recruiting Partner @ Notion</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => showToast('Invitation accepted')}
                  className="px-3 py-1 rounded-lg bg-[#5828F0] text-white text-[11px] font-bold hover:bg-[#4D1FE0] transition-colors cursor-pointer"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Community Link Card */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col gap-3">
          <h4 className="text-[14px] font-bold text-[#0F172A]">Rizza Design Guild</h4>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Join weekly design crits and portfolio reviews hosted by senior designers at Airbnb and Linear.
          </p>
          <button
            onClick={() => showToast('Redirecting to Rizza Design Guild live session')}
            className="w-full py-2.5 rounded-xl bg-[#F8F7FD] border border-[#ECE7F8] hover:bg-[#F3EFFC] text-xs font-bold text-[#5828F0] transition-colors cursor-pointer"
          >
            Join Live Guild Channel
          </button>
        </div>
      </div>
    </div>
  );
};
