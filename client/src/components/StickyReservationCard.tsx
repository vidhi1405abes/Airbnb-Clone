import React, { useState, useRef, useEffect } from 'react';
import { Star, ChevronDown, ChevronUp, Plus, Minus, Flag } from 'lucide-react';
import { ReservationCalculation } from '../types';

interface StickyReservationCardProps {
  pricePerNight: number;
  currencySymbol: string;
  rating: number;
  reviewsCount: number;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  maxGuests: number;
  calculation: ReservationCalculation | null;
  onChangeDates: (checkIn: string, checkOut: string) => void;
  onChangeGuests: (adults: number, children: number) => void;
  onReserve: () => void;
  onOpenReviews?: () => void;
}

export const StickyReservationCard: React.FC<StickyReservationCardProps> = ({
  pricePerNight,
  currencySymbol,
  rating,
  reviewsCount,
  checkIn,
  checkOut,
  adults,
  children: childGuests,
  maxGuests,
  calculation,
  onChangeGuests,
  onReserve,
  onOpenReviews
}) => {
  const [guestsOpen, setGuestsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalGuests = adults + childGuests;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setGuestsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAdultChange = (delta: number) => {
    const newAdults = adults + delta;
    if (newAdults >= 1 && newAdults + childGuests <= maxGuests) {
      onChangeGuests(newAdults, childGuests);
    }
  };

  const handleChildChange = (delta: number) => {
    const newChildren = childGuests + delta;
    if (newChildren >= 0 && adults + newChildren <= maxGuests) {
      onChangeGuests(adults, newChildren);
    }
  };

  const scrollToCalendar = () => {
    const calendarEl = document.getElementById('calendar-section');
    if (calendarEl) {
      calendarEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-28 bg-white border border-airbnb-border rounded-2xl p-6 shadow-airbnb-card w-full">
      {/* Header: Price & Rating */}
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <span className="text-[22px] font-bold text-airbnb-charcoal">
            {currencySymbol}{pricePerNight.toLocaleString()}
          </span>
          <span className="text-airbnb-muted text-base ml-1">night</span>
        </div>

        <button
          type="button"
          onClick={onOpenReviews}
          className="flex items-center text-xs font-semibold gap-1 text-airbnb-charcoal hover:opacity-80 transition cursor-pointer p-1 rounded-lg hover:bg-slate-50 focus:outline-none"
          aria-label={`Rating ${rating.toFixed(2)}, ${reviewsCount} reviews`}
        >
          <Star className="w-3.5 h-3.5 fill-airbnb-charcoal" />
          <span>{rating.toFixed(2)}</span>
          <span className="text-airbnb-lightMuted">·</span>
          <span className="text-airbnb-muted underline hover:text-black">{reviewsCount} reviews</span>
        </button>
      </div>

      {/* Date & Guest Input Box */}
      <div className="border border-airbnb-border rounded-xl overflow-hidden mb-4 relative" ref={dropdownRef}>
        <div className="grid grid-cols-2 divide-x divide-airbnb-border border-b border-airbnb-border">
          {/* Check-in */}
          <div
            onClick={scrollToCalendar}
            className="p-3 text-left cursor-pointer hover:bg-airbnb-surface/60 transition"
            title="Click to select dates on calendar"
          >
            <label className="block text-[10px] font-extrabold uppercase text-airbnb-charcoal tracking-wider cursor-pointer">
              Check-in
            </label>
            <div className="text-sm text-airbnb-charcoal font-medium mt-0.5 truncate">
              {checkIn || 'Add date'}
            </div>
          </div>

          {/* Checkout */}
          <div
            onClick={scrollToCalendar}
            className="p-3 text-left cursor-pointer hover:bg-airbnb-surface/60 transition"
            title="Click to select dates on calendar"
          >
            <label className="block text-[10px] font-extrabold uppercase text-airbnb-charcoal tracking-wider cursor-pointer">
              Checkout
            </label>
            <div className="text-sm text-airbnb-charcoal font-medium mt-0.5 truncate">
              {checkOut || 'Add date'}
            </div>
          </div>
        </div>

        {/* Guests Dropdown Trigger */}
        <div
          onClick={() => setGuestsOpen(!guestsOpen)}
          className="p-3 flex items-center justify-between cursor-pointer hover:bg-airbnb-surface/60 transition"
        >
          <div>
            <label className="block text-[10px] font-extrabold uppercase text-airbnb-charcoal tracking-wider">
              Guests
            </label>
            <div className="text-sm text-airbnb-charcoal font-medium mt-0.5">
              {totalGuests} {totalGuests === 1 ? 'guest' : 'guests'}
            </div>
          </div>
          {guestsOpen ? (
            <ChevronUp className="w-4 h-4 text-airbnb-charcoal" />
          ) : (
            <ChevronDown className="w-4 h-4 text-airbnb-charcoal" />
          )}
        </div>

        {/* Guests Popover Dropdown */}
        {guestsOpen && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-airbnb-border rounded-2xl shadow-airbnb-card p-4 z-30 space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-airbnb-charcoal">Adults</div>
                <div className="text-xs text-airbnb-muted">Age 13+</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleAdultChange(-1)}
                  disabled={adults <= 1}
                  className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-4 text-center font-semibold text-sm">{adults}</span>
                <button
                  type="button"
                  onClick={() => handleAdultChange(1)}
                  disabled={totalGuests >= maxGuests}
                  className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-airbnb-charcoal">Children</div>
                <div className="text-xs text-airbnb-muted">Ages 2–12</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleChildChange(-1)}
                  disabled={childGuests <= 0}
                  className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-4 text-center font-semibold text-sm">{childGuests}</span>
                <button
                  type="button"
                  onClick={() => handleChildChange(1)}
                  disabled={totalGuests >= maxGuests}
                  className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="pt-2 text-xs text-airbnb-muted border-t border-airbnb-lightBorder">
              This apartment has a maximum capacity of {maxGuests} guests.
            </div>

            <button
              onClick={() => setGuestsOpen(false)}
              className="w-full text-right text-sm font-semibold underline text-airbnb-charcoal hover:text-black py-1"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Reserve Action Button */}
      <button
        onClick={onReserve}
        className="w-full bg-gradient-to-r from-airbnb-brand to-airbnb-brandDark hover:from-airbnb-brandDark hover:to-airbnb-brand text-white font-semibold py-3.5 px-4 rounded-xl shadow-md transition active:scale-[0.98] cursor-pointer"
      >
        {checkIn && checkOut ? 'Reserve' : 'Check availability'}
      </button>

      <p className="text-center text-xs text-airbnb-muted mt-3">
        You won't be charged yet
      </p>

      {/* Dynamic Price Breakdown */}
      {calculation && checkIn && checkOut && (
        <div className="mt-6 space-y-3 pt-6 border-t border-airbnb-lightBorder text-sm text-airbnb-charcoal">
          <div className="flex items-center justify-between">
            <span className="underline">
              {currencySymbol}{pricePerNight.toLocaleString()} × {calculation.nights} {calculation.nights === 1 ? 'night' : 'nights'}
            </span>
            <span>{currencySymbol}{calculation.basePrice.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="underline">Cleaning fee</span>
            <span>{currencySymbol}{calculation.cleaningFee.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="underline">Airbnb service fee</span>
            <span>{currencySymbol}{calculation.serviceFee.toLocaleString()}</span>
          </div>

          <div className="pt-4 border-t border-airbnb-border flex items-center justify-between font-bold text-base">
            <span>Total before taxes</span>
            <span>{currencySymbol}{calculation.totalBeforeTaxes.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Report Listing */}
      <div className="mt-6 pt-4 text-center">
        <button
          onClick={() => alert("Report this listing: Thank you for helping keep our community safe. Our Trust & Safety team will review this property.")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-airbnb-muted hover:text-airbnb-charcoal transition"
        >
          <Flag className="w-3.5 h-3.5" />
          <span>Report this listing</span>
        </button>
      </div>
    </div>
  );
};
