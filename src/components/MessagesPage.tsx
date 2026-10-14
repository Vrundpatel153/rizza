import React, { useState } from 'react';
import { 
  Send, Search, Paperclip, MoreVertical, CheckCheck, 
  Phone, Video, ShieldCheck, Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MessagesPage: React.FC = () => {
  const { showToast } = useApp();
  const [activeChatId, setActiveChatId] = useState('chat-1');
  const [inputMessage, setInputMessage] = useState('');

  const [chats, setChats] = useState([
    {
      id: 'chat-1',
      name: 'Sarah Jenkins',
      role: 'Head of Talent @ Stripe',
      avatar: 'SJ',
      color: 'bg-[#EDE9FE] text-[#5828F0]',
      lastMessage: 'Hi Annie! Loved your Technical Assessment submission on Figma tokens. Are you open for a quick sync this Thursday?',
      time: '10:45 AM',
      unread: 2,
      messages: [
        { sender: 'them', text: 'Hi Annie, thanks for sharing your verified Rizza Life Page!', time: '10:30 AM' },
        { sender: 'them', text: 'We were blown away by your FinMate case study and systems architecture score (96%).', time: '10:32 AM' },
        { sender: 'me', text: 'Thank you Sarah! Very excited about the developer platform opportunity at Stripe.', time: '10:40 AM' },
        { sender: 'them', text: 'Are you open for a 30-minute introductory conversation this Thursday around 3 PM IST?', time: '10:45 AM' }
      ]
    },
    {
      id: 'chat-2',
      name: 'Michael Chen',
      role: 'Design Director @ Airbnb',
      avatar: 'MC',
      color: 'bg-[#E0F2FE] text-[#0284C7]',
      lastMessage: 'The offer details have been uploaded to your Digital Vault for review.',
      time: 'Yesterday',
      unread: 1,
      messages: [
        { sender: 'them', text: 'Hello Annie, great speaking with you and the design leadership team.', time: 'Yesterday' },
        { sender: 'them', text: 'The offer details have been uploaded to your Digital Vault for review.', time: 'Yesterday' }
      ]
    },
    {
      id: 'chat-3',
      name: 'Elena Rostova',
      role: 'Lead Recruiter @ Linear',
      avatar: 'ER',
      color: 'bg-[#DCFCE7] text-[#16A34A]',
      lastMessage: 'Your application status has been moved to Final Culture Round.',
      time: 'Oct 12',
      unread: 0,
      messages: [
        { sender: 'them', text: 'Hi Annie! Your application status has been moved to Final Culture Round.', time: 'Oct 12' }
      ]
    }
  ]);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            { sender: 'me', text: inputMessage, time: 'Just now' }
          ],
          lastMessage: inputMessage
        };
      }
      return chat;
    }));

    setInputMessage('');
    showToast('Message sent!');
  };

  return (
    <div className="w-full bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] overflow-hidden min-h-[720px] flex flex-col md:flex-row">
      {/* Left Chat List Column */}
      <div className="w-full md:w-[320px] border-r border-[#ECE7F8] flex flex-col bg-[#FAFAFE]">
        <div className="p-4 border-b border-[#ECE7F8]">
          <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight mb-3">
            Messages &amp; Inquiries
          </h2>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-2.5 text-[#8A94A6]" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-white border border-[#EAE5F5] focus:outline-none focus:border-[#5828F0]"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#ECE7F8]">
          {chats.map(chat => {
            const isActive = chat.id === activeChatId;
            return (
              <div
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
                }}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                  isActive ? 'bg-[#F0EDFD]' : 'hover:bg-white'
                }`}
              >
                <div className={`w-10 h-10 rounded-full ${chat.color} font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  {chat.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xs font-bold truncate ${isActive ? 'text-[#5828F0]' : 'text-[#0F172A]'}`}>
                      {chat.name}
                    </h3>
                    <span className="text-[10px] text-[#94A3B8]">{chat.time}</span>
                  </div>
                  <p className="text-[11px] text-[#64748B] truncate mt-0.5">{chat.role}</p>
                  <p className="text-xs text-[#475569] truncate mt-1">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#5828F0] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-1">
                    {chat.unread}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Chat Message Area */}
      <div className="flex-1 flex flex-col justify-between bg-white min-h-[500px]">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#ECE7F8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${activeChat.color} font-bold text-xs flex items-center justify-center shadow-sm`}>
              {activeChat.avatar}
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] leading-tight flex items-center gap-1.5">
                <span>{activeChat.name}</span>
                <ShieldCheck size={14} className="text-emerald-600" />
              </h3>
              <p className="text-xs text-[#64748B]">{activeChat.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => showToast('Starting video interview room...')}
              className="p-2 rounded-xl bg-[#F8F7FD] border border-[#ECE7F8] hover:bg-[#F3EFFC] text-[#475569] hover:text-[#5828F0] transition-colors cursor-pointer"
              title="Video Call"
            >
              <Video size={16} />
            </button>
            <button
              onClick={() => showToast('Opening conversation options')}
              className="p-2 rounded-xl bg-[#F8F7FD] border border-[#ECE7F8] hover:bg-[#F3EFFC] text-[#475569] hover:text-[#5828F0] transition-colors cursor-pointer"
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3.5 bg-[#FAF9FD]/50">
          {activeChat.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[80%] ${
                msg.sender === 'me' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  msg.sender === 'me'
                    ? 'bg-[#5828F0] text-white rounded-br-none'
                    : 'bg-white border border-[#EAE5F5] text-[#0F172A] rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-[#94A3B8] mt-1 px-1">
                {msg.time}
              </span>
            </div>
          ))}
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSendMessage} className="p-3.5 border-t border-[#ECE7F8] flex items-center gap-2 bg-white">
          <button
            type="button"
            onClick={() => showToast('Attach portfolio or verification file')}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#5828F0] hover:bg-[#F8F7FD] transition-colors cursor-pointer"
          >
            <Paperclip size={18} />
          </button>

          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#F8F7FD] border border-[#ECE7F8] text-xs text-[#0F172A] focus:outline-none focus:border-[#5828F0]"
          />

          <button
            type="submit"
            className="p-2.5 rounded-xl bg-[#5828F0] hover:bg-[#4D1FE0] text-white shadow-sm transition-all cursor-pointer"
            title="Send Message"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};
