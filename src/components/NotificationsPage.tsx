import React from 'react';
import { 
  Bell, CheckCircle2, Star, Briefcase, Calendar, 
  ArrowRight, ShieldCheck, Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsPage: React.FC = () => {
  const { setActiveView, showToast } = useApp();

  const notifications = [
    {
      id: 'notif-1',
      title: 'New High-DNA Job Match (96%)',
      description: 'Stripe matched your verified Senior UX Designer profile for Lead Product Designer role.',
      time: '15 mins ago',
      unread: true,
      icon: Sparkles,
      iconBg: 'bg-[#EDE9FE] text-[#5828F0]',
      action: () => setActiveView('jobs'),
      actionLabel: 'View Job Match'
    },
    {
      id: 'notif-2',
      title: 'Interview Scheduled with Airbnb Design Team',
      description: 'Michael Chen confirmed your design presentation round for Friday, 4:00 PM IST.',
      time: '2 hours ago',
      unread: true,
      icon: Calendar,
      iconBg: 'bg-[#E0F2FE] text-[#0284C7]',
      action: () => setActiveView('messages'),
      actionLabel: 'Open Conversation'
    },
    {
      id: 'notif-3',
      title: 'Technical Assessment Verification Complete',
      description: 'Your Figma Design Systems & Token Benchmark was validated in the 96th percentile globally.',
      time: '1 day ago',
      unread: false,
      icon: CheckCircle2,
      iconBg: 'bg-[#DCFCE7] text-[#16A34A]',
      action: () => setActiveView('score-benchmark'),
      actionLabel: 'Check Benchmark Report'
    },
    {
      id: 'notif-4',
      title: 'Offer Letter Uploaded to Digital Vault',
      description: 'Stripe platform team issued your verified offer letter. Cryptographic e-signing is ready.',
      time: '2 days ago',
      unread: false,
      icon: ShieldCheck,
      iconBg: 'bg-[#FEF3C7] text-[#D97706]',
      action: () => setActiveView('digital-vault'),
      actionLabel: 'Review & E-Sign'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      {/* Header Card */}
      <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-[24px] font-bold text-[#0F172A] tracking-tight">
            Notifications &amp; Activity
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time updates regarding your applications, verified benchmarks, and recruiter inquiries.
          </p>
        </div>

        <button
          onClick={() => showToast('All notifications marked as read')}
          className="text-xs font-semibold text-[#5828F0] hover:underline cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-3">
        {notifications.map(item => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              className={`p-5 rounded-[22px] border transition-all flex items-start justify-between gap-4 ${
                item.unread
                  ? 'bg-white border-[#D6D0F2] shadow-[0_4px_16px_rgba(88,40,240,0.06)]'
                  : 'bg-white/80 border-[#EAE5F5]'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-10 h-10 rounded-2xl ${item.iconBg} flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5`}>
                  <IconComp size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14.5px] font-bold text-[#0F172A] leading-tight">
                      {item.title}
                    </h3>
                    {item.unread && (
                      <span className="w-2 h-2 rounded-full bg-[#5828F0]" />
                    )}
                  </div>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                  <span className="text-[10.5px] text-[#94A3B8] mt-1 block">
                    {item.time}
                  </span>
                </div>
              </div>

              <button
                onClick={item.action}
                className="px-3.5 py-1.5 rounded-xl bg-[#F8F7FD] hover:bg-[#F3EFFC] text-xs font-bold text-[#5828F0] border border-[#ECE7F8] flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors flex-shrink-0 self-center"
              >
                <span>{item.actionLabel}</span>
                <ArrowRight size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
