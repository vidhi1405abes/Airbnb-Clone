import React from 'react';
import { X, Briefcase, Calendar, MapPin } from 'lucide-react';
import { Listing } from '../types';

interface TripsModalProps {
  listing: Listing;
  booking: any | null;
  onClose: () => void;
  onExplore: () => void;
}

export const TripsModal: React.FC<TripsModalProps> = ({
  listing,
  booking,
  onClose,
  onExplore
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-airbnb-lightBorder flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 hover:bg-airbnb-surface rounded-full transition"
            aria-label="Close trips"
          >
            <X className="w-5 h-5 text-airbnb-charcoal" />
          </button>
          <span className="font-bold text-base">Your Trips</span>
          <div className="w-8" />
        </div>

        <div className="p-6 overflow-y-auto">
          {booking ? (
            <div className="border border-airbnb-border rounded-2xl p-5 bg-airbnb-surface/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Confirmed
                </span>
                <span className="text-xs font-mono text-airbnb-muted">
                  Ref: {booking.id}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-base text-airbnb-charcoal">{listing.title}</h4>
                <div className="flex items-center gap-1.5 text-xs text-airbnb-muted mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{listing.location.neighborhood}, {listing.location.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-airbnb-charcoal bg-white p-3 rounded-xl border border-airbnb-border">
                <Calendar className="w-4 h-4 text-airbnb-brand" />
                <span>{booking.checkIn} – {booking.checkOut} ({booking.nights} nights)</span>
              </div>

              <div className="flex justify-between text-xs text-airbnb-muted pt-2 border-t border-airbnb-lightBorder">
                <span>Guest: {booking.guestName}</span>
                <span className="font-bold text-airbnb-charcoal">{listing.pricing.currencySymbol}{booking.pricing?.grandTotal?.toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 bg-airbnb-surface rounded-full flex items-center justify-center mx-auto text-airbnb-muted">
                <Briefcase className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-airbnb-charcoal">No trips booked yet</h4>
              <p className="text-sm text-airbnb-muted max-w-xs mx-auto">
                Time to dust off your bags and start planning your next getaway.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExplore();
                }}
                className="mt-4 border border-airbnb-charcoal hover:bg-airbnb-charcoal hover:text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition"
              >
                Start searching
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
