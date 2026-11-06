import React from 'react';
import { Star, Award, ShieldCheck, MessageSquare } from 'lucide-react';
import { Host } from '../types';

interface HostProfileProps {
  host: Host;
  onContactHost: () => void;
}

export const HostProfile: React.FC<HostProfileProps> = ({ host, onContactHost }) => {
  return (
    <div className="py-12 border-b border-airbnb-lightBorder">
      <h2 className="text-[22px] font-semibold text-airbnb-charcoal mb-6">
        Meet your Host
      </h2>

      <div className="bg-airbnb-surface rounded-3xl p-8 border border-airbnb-border flex flex-col md:flex-row gap-8 items-start justify-between">
        {/* Left: Host Card */}
        <div className="bg-white rounded-2xl p-6 shadow-airbnb-subtle border border-airbnb-border w-full md:w-80 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img
              src={host.avatar}
              alt={host.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md"
            />
            {host.isSuperhost && (
              <div className="absolute -bottom-1 -right-1 bg-airbnb-brand text-white p-1.5 rounded-full shadow">
                <Award className="w-4 h-4" />
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold text-airbnb-charcoal">{host.name}</h3>
          <p className="text-xs font-semibold text-airbnb-muted mt-0.5">Superhost</p>

          <div className="w-full grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-airbnb-lightBorder text-center">
            <div>
              <div className="text-lg font-bold text-airbnb-charcoal">{host.reviewsCount}</div>
              <div className="text-[11px] text-airbnb-muted font-medium">Reviews</div>
            </div>
            <div>
              <div className="text-lg font-bold text-airbnb-charcoal flex items-center justify-center gap-1">
                <span>{host.rating}</span>
                <Star className="w-3.5 h-3.5 fill-airbnb-charcoal" />
              </div>
              <div className="text-[11px] text-airbnb-muted font-medium">Rating</div>
            </div>
          </div>
        </div>

        {/* Right: Details & Bio */}
        <div className="flex-1 space-y-6">
          <div>
            <h4 className="font-bold text-lg text-airbnb-charcoal mb-2">
              Superhost details
            </h4>
            <p className="text-sm text-airbnb-muted leading-relaxed">
              Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
            </p>
          </div>

          <div className="space-y-3 text-sm text-airbnb-charcoal">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-airbnb-brand flex-shrink-0" />
              <span>Identity verified on Airbnb</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-airbnb-brand flex-shrink-0" />
              <span>Response rate: {host.responseRate} · Responds {host.responseTime}</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-airbnb-charcoal">
            {host.bio}
          </p>

          {host.coHosts && host.coHosts.length > 0 && (
            <div className="pt-4 border-t border-airbnb-border">
              <h5 className="text-xs font-bold text-airbnb-muted uppercase tracking-wider mb-3">
                Co-hosts
              </h5>
              <div className="flex items-center gap-3">
                {host.coHosts.map((cohost, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <img
                      src={cohost.avatar}
                      alt={cohost.name}
                      className="w-8 h-8 rounded-full object-cover border border-airbnb-border"
                    />
                    <span className="text-sm font-semibold text-airbnb-charcoal">{cohost.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={onContactHost}
              className="border border-airbnb-charcoal hover:bg-airbnb-charcoal hover:text-white active:scale-95 text-airbnb-charcoal font-semibold text-sm px-6 py-3 rounded-xl transition cursor-pointer"
            >
              Contact Host
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
