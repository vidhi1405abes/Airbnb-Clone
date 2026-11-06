import React from 'react';
import { Star, Award } from 'lucide-react';
import { Host } from '../types';

interface SpecsBannerProps {
  subtitle: string;
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    baths: number;
  };
  rating: number;
  reviewsCount: number;
  host: Host;
  onOpenReviews?: () => void;
}

export const SpecsBanner: React.FC<SpecsBannerProps> = ({
  subtitle,
  capacity,
  rating,
  reviewsCount,
  host,
  onOpenReviews
}) => {
  return (
    <div className="pb-6 border-b border-airbnb-lightBorder">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[22px] font-semibold text-airbnb-charcoal">
            {subtitle}
          </h2>
          <ol className="flex items-center gap-1 text-[15px] text-airbnb-charcoal mt-1">
            <li>{capacity.guests} guests</li>
            <li>·</li>
            <li>{capacity.bedrooms} bedroom</li>
            <li>·</li>
            <li>{capacity.beds} bed</li>
            <li>·</li>
            <li>{capacity.baths} bath</li>
          </ol>
        </div>

        {/* Host Avatar with Superhost badge */}
        <div className="relative">
          <img
            src={host.avatar}
            alt={host.name}
            className="w-14 h-14 rounded-full object-cover border border-airbnb-border"
          />
          {host.isSuperhost && (
            <div
              className="absolute -bottom-1 -right-1 bg-airbnb-brand text-white p-1 rounded-full shadow"
              title="Superhost"
            >
              <Award className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>

      {/* Guest Favorite Badge Banner */}
      <div className="mt-6 border border-airbnb-border rounded-2xl p-6 flex items-center justify-between shadow-airbnb-subtle bg-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center text-airbnb-charcoal">
            {/* Laurel decoration SVG */}
            <svg viewBox="0 0 32 32" className="w-8 h-8 fill-airbnb-charcoal" aria-hidden="true">
              <path d="M9.8 4.7a1 1 0 0 1 1.4.3c3.2 4.6 4.8 9.9 4.8 15.6 0 .5-.4 1-1 1s-1-.5-1-1c0-5.3-1.5-10.2-4.5-14.5a1 1 0 0 1 .3-1.4zM4.6 9.8a1 1 0 0 1 1.4.3c2 2.8 3 6.1 3 9.6 0 .6-.4 1-1 1s-1-.4-1-1c0-3.1-.9-6-2.7-8.5a1 1 0 0 1 .3-1.4z" />
            </svg>
            <div className="text-center px-2">
              <span className="block font-bold text-lg leading-tight tracking-tight">Guest</span>
              <span className="block font-bold text-lg leading-tight tracking-tight">favorite</span>
            </div>
            <svg viewBox="0 0 32 32" className="w-8 h-8 fill-airbnb-charcoal scale-x-[-1]" aria-hidden="true">
              <path d="M9.8 4.7a1 1 0 0 1 1.4.3c3.2 4.6 4.8 9.9 4.8 15.6 0 .5-.4 1-1 1s-1-.5-1-1c0-5.3-1.5-10.2-4.5-14.5a1 1 0 0 1 .3-1.4zM4.6 9.8a1 1 0 0 1 1.4.3c2 2.8 3 6.1 3 9.6 0 .6-.4 1-1 1s-1-.4-1-1c0-3.1-.9-6-2.7-8.5a1 1 0 0 1 .3-1.4z" />
            </svg>
          </div>
          <div className="max-w-[320px] text-sm text-airbnb-charcoal font-medium">
            One of the most loved homes on Airbnb, according to guests
          </div>
        </div>

        <div className="flex items-center gap-6 pr-2">
          <button
            type="button"
            onClick={onOpenReviews}
            className="text-center group cursor-pointer focus:outline-none p-2 rounded-xl hover:bg-slate-100/70 transition"
            aria-label={`Overall rating ${rating.toFixed(2)}`}
          >
            <div className="text-[18px] font-bold text-airbnb-charcoal flex items-center justify-center gap-1 group-hover:scale-105 transition-transform">
              <span>{rating.toFixed(2)}</span>
              <Star className="w-4 h-4 fill-airbnb-charcoal" />
            </div>
            <div className="text-xs text-airbnb-charcoal font-semibold underline group-hover:text-black">
              Overall rating
            </div>
          </button>
          <div className="w-px h-10 bg-airbnb-border" />
          <button
            type="button"
            onClick={onOpenReviews}
            className="text-center group cursor-pointer focus:outline-none p-2 rounded-xl hover:bg-slate-100/70 transition"
            aria-label={`${reviewsCount} reviews`}
          >
            <div className="text-[18px] font-bold text-airbnb-charcoal group-hover:scale-105 transition-transform">
              {reviewsCount}
            </div>
            <div className="text-xs text-airbnb-charcoal font-semibold underline group-hover:text-black">
              Reviews
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
