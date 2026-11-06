import React, { useState } from 'react';
import { ChevronRight, X, Clock, ShieldAlert, FileText } from 'lucide-react';

interface ThingsToKnowProps {
  houseRules: string[];
  safetyRules: string[];
  cancellationPolicy: string;
}

export const ThingsToKnow: React.FC<ThingsToKnowProps> = ({
  houseRules,
  safetyRules,
  cancellationPolicy
}) => {
  const [activeModal, setActiveModal] = useState<'rules' | 'safety' | 'cancellation' | null>(null);

  return (
    <div className="py-12 border-b border-airbnb-lightBorder">
      <h2 className="text-[22px] font-semibold text-airbnb-charcoal mb-6">
        Things to know
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[15px] text-airbnb-charcoal">
        {/* House rules */}
        <div>
          <h3 className="font-semibold mb-3">House rules</h3>
          <ul className="space-y-2.5 text-sm text-airbnb-muted">
            {houseRules.slice(0, 4).map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
          <button
            onClick={() => setActiveModal('rules')}
            className="mt-4 flex items-center gap-1 font-semibold text-sm underline text-airbnb-charcoal hover:text-black cursor-pointer"
          >
            <span>Show more</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Safety & property */}
        <div>
          <h3 className="font-semibold mb-3">Safety & property</h3>
          <ul className="space-y-2.5 text-sm text-airbnb-muted">
            {safetyRules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
          <button
            onClick={() => setActiveModal('safety')}
            className="mt-4 flex items-center gap-1 font-semibold text-sm underline text-airbnb-charcoal hover:text-black cursor-pointer"
          >
            <span>Show more</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Cancellation policy */}
        <div>
          <h3 className="font-semibold mb-3">Cancellation policy</h3>
          <p className="text-sm text-airbnb-muted leading-relaxed">
            {cancellationPolicy}
          </p>
          <button
            onClick={() => setActiveModal('cancellation')}
            className="mt-4 flex items-center gap-1 font-semibold text-sm underline text-airbnb-charcoal hover:text-black cursor-pointer"
          >
            <span>Show more</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* House Rules Modal */}
      {activeModal === 'rules' && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-airbnb-lightBorder">
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-airbnb-surface rounded-full transition">
                <X className="w-5 h-5 text-airbnb-charcoal" />
              </button>
              <span className="font-bold text-base">House rules</span>
              <div className="w-8" />
            </div>
            <div className="py-6 space-y-4">
              <div className="flex items-center gap-2 text-airbnb-charcoal font-bold text-base">
                <Clock className="w-5 h-5 text-airbnb-brand" />
                <span>Check-in & Checkout</span>
              </div>
              <ul className="space-y-3 text-sm text-airbnb-charcoal">
                {houseRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-airbnb-brand">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Safety Modal */}
      {activeModal === 'safety' && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-airbnb-lightBorder">
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-airbnb-surface rounded-full transition">
                <X className="w-5 h-5 text-airbnb-charcoal" />
              </button>
              <span className="font-bold text-base">Safety & property</span>
              <div className="w-8" />
            </div>
            <div className="py-6 space-y-4">
              <div className="flex items-center gap-2 text-airbnb-charcoal font-bold text-base">
                <ShieldAlert className="w-5 h-5 text-airbnb-brand" />
                <span>Property safety features</span>
              </div>
              <ul className="space-y-3 text-sm text-airbnb-charcoal">
                {safetyRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-airbnb-brand">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Modal */}
      {activeModal === 'cancellation' && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-airbnb-lightBorder">
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-airbnb-surface rounded-full transition">
                <X className="w-5 h-5 text-airbnb-charcoal" />
              </button>
              <span className="font-bold text-base">Cancellation policy</span>
              <div className="w-8" />
            </div>
            <div className="py-6 space-y-4">
              <div className="flex items-center gap-2 text-airbnb-charcoal font-bold text-base">
                <FileText className="w-5 h-5 text-airbnb-brand" />
                <span>Cancellation terms</span>
              </div>
              <p className="text-sm leading-relaxed text-airbnb-charcoal">
                {cancellationPolicy}
              </p>
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-xs">
                Free cancellation up to 48 hours prior to check-in. If you cancel after that, you'll receive a 50% refund minus the Airbnb service fee.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
