import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, CheckCheck } from 'lucide-react';
import { Host } from '../types';

interface MessagesModalProps {
  host: Host;
  listingTitle?: string;
  locationCity?: string;
  onClose: () => void;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({
  host,
  listingTitle = 'our Goa stay',
  locationCity = 'Goa',
  onClose
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'host' | 'user'; text: string; time: string }>>([]);
  const [input, setInput] = useState('');

  // Dynamically initialize greeting whenever listingTitle or host changes
  useEffect(() => {
    setMessages([
      {
        sender: 'host',
        text: `Hello! I'm ${host.name}. Thank you for your interest in ${listingTitle}! This family-friendly property in ${locationCity} is sparkling clean, fully verified, and ready for you and your family. Please let me know if you have any questions before booking!`,
        time: '10:30 AM'
      }
    ]);
  }, [listingTitle, locationCity, host.name]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time: now }]);
    setInput('');

    // Simulated host reply after 1.2s
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'host',
          text: `Thank you for your message! Yes, self check-in is available anytime after 2:00 PM via digital smart lock. We'll send your access code 24 hours prior to check-in. Looking forward to hosting your family!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[600px] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-airbnb-lightBorder flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={host.avatar}
              alt={host.name}
              className="w-10 h-10 rounded-full object-cover border border-airbnb-border"
            />
            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-airbnb-charcoal">
                <span>{host.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
              </div>
              <p className="text-xs text-airbnb-muted">Typically responds within an hour</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-airbnb-surface rounded-full transition"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-airbnb-charcoal" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-airbnb-muted bg-white border border-airbnb-lightBorder py-1.5 px-3 rounded-full mx-auto max-w-xs shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Messages protected by Airbnb messaging policy</span>
          </div>

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-sm ${
                  m.sender === 'user'
                    ? 'bg-airbnb-charcoal text-white rounded-br-xs'
                    : 'bg-white border border-airbnb-border text-airbnb-charcoal rounded-bl-xs shadow-xs'
                }`}
              >
                {m.text}
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-airbnb-muted px-1">
                <span>{m.time}</span>
                {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-sky-500" />}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-airbnb-lightBorder bg-white flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Message ${host.name}...`}
            className="flex-1 border border-airbnb-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-airbnb-charcoal"
          />
          <button
            type="submit"
            className="p-2.5 bg-airbnb-brand text-white rounded-xl hover:bg-airbnb-brandDark transition disabled:opacity-50 cursor-pointer"
            disabled={!input.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
