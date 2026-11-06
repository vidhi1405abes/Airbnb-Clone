import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Twitter, Mail } from 'lucide-react';

interface ShareModalProps {
  title: string;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ title, onClose, onToast }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      onToast('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      onToast('Link copied!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-airbnb-lightBorder">
          <button
            onClick={onClose}
            className="p-1 hover:bg-airbnb-surface rounded-full transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-airbnb-charcoal" />
          </button>
          <span className="font-semibold text-sm">Share this place</span>
          <div className="w-6" />
        </div>

        <div className="py-6">
          <h4 className="font-bold text-base text-airbnb-charcoal mb-1">{title}</h4>
          <p className="text-xs text-airbnb-muted mb-6">
            Share this romantic getaway with friends or travel companions.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-between p-3.5 border border-airbnb-border rounded-xl hover:bg-airbnb-surface transition text-sm font-semibold text-airbnb-charcoal"
            >
              <div className="flex items-center gap-3">
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                <span>{copied ? 'Copied to clipboard' : 'Copy Link'}</span>
              </div>
              <span className="text-xs font-bold text-airbnb-brand">
                {copied ? 'Done' : 'Copy'}
              </span>
            </button>

            <button
              onClick={() => {
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + currentUrl)}`, '_blank');
              }}
              className="w-full flex items-center gap-3 p-3.5 border border-airbnb-border rounded-xl hover:bg-airbnb-surface transition text-sm font-semibold text-airbnb-charcoal"
            >
              <MessageCircle className="w-5 h-5 text-emerald-500" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
              }}
              className="w-full flex items-center gap-3 p-3.5 border border-airbnb-border rounded-xl hover:bg-airbnb-surface transition text-sm font-semibold text-airbnb-charcoal"
            >
              <Twitter className="w-5 h-5 text-sky-500" />
              <span>Twitter / X</span>
            </button>

            <button
              onClick={() => {
                window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(currentUrl)}`, '_blank');
              }}
              className="w-full flex items-center gap-3 p-3.5 border border-airbnb-border rounded-xl hover:bg-airbnb-surface transition text-sm font-semibold text-airbnb-charcoal"
            >
              <Mail className="w-5 h-5 text-rose-500" />
              <span>Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
