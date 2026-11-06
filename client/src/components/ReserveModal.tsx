import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Users, ShieldCheck } from 'lucide-react';
import { ReservationCalculation } from '../types';
import { submitReservation } from '../services/api';

interface ReserveModalProps {
  listingTitle: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  calculation: ReservationCalculation | null;
  onClose: () => void;
  onBookingSuccess?: (booking: any) => void;
}

export const ReserveModal: React.FC<ReserveModalProps> = ({
  listingTitle,
  checkIn,
  checkOut,
  adults,
  children: childGuests,
  calculation,
  onClose,
  onBookingSuccess
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const bookingPayload = {
      checkIn,
      checkOut,
      adults,
      children: childGuests,
      guestName: name || 'Airbnb Guest',
      guestEmail: email || 'guest@example.com',
      specialRequests
    };

    const result = await submitReservation(bookingPayload);
    setLoading(false);

    if (result.success) {
      setConfirmedBooking(result.data);
      if (onBookingSuccess) {
        onBookingSuccess(result.data);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-airbnb-lightBorder flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 hover:bg-airbnb-surface rounded-full transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-airbnb-charcoal" />
          </button>
          <span className="font-semibold text-base">Request to book</span>
          <div className="w-8" />
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto">
          {confirmedBooking ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-airbnb-charcoal">
                Booking Confirmed!
              </h3>
              <p className="text-airbnb-muted text-sm max-w-sm mx-auto">
                Your reservation at <span className="font-semibold text-airbnb-charcoal">{listingTitle}</span> has been confirmed.
              </p>

              <div className="bg-airbnb-surface rounded-2xl p-5 text-left text-sm space-y-2.5 mt-6 border border-airbnb-border">
                <div className="flex justify-between font-medium">
                  <span className="text-airbnb-muted">Booking Reference:</span>
                  <span className="font-bold text-airbnb-charcoal tracking-wide">{confirmedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-airbnb-muted">Dates:</span>
                  <span className="font-semibold text-airbnb-charcoal">{checkIn} – {checkOut} ({confirmedBooking.nights} nights)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-airbnb-muted">Guests:</span>
                  <span className="font-semibold text-airbnb-charcoal">{adults + childGuests} guests</span>
                </div>
                <div className="flex justify-between border-t border-airbnb-lightBorder pt-2 text-base font-bold">
                  <span>Total Paid:</span>
                  <span className="text-emerald-700">
                    {calculation?.currencySymbol}{calculation?.totalBeforeTaxes.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full mt-6 bg-airbnb-charcoal text-white font-semibold py-3.5 rounded-xl hover:bg-black transition"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Trip Info Summary */}
              <div className="bg-airbnb-surface p-4 rounded-2xl border border-airbnb-lightBorder space-y-3">
                <div className="flex items-center gap-3 text-sm text-airbnb-charcoal font-semibold">
                  <Calendar className="w-4 h-4 text-airbnb-brand" />
                  <span>{checkIn} – {checkOut} ({calculation?.nights || 1} nights)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-airbnb-charcoal font-semibold">
                  <Users className="w-4 h-4 text-airbnb-brand" />
                  <span>{adults + childGuests} guests ({adults} adults{childGuests > 0 ? `, ${childGuests} children` : ''})</span>
                </div>
              </div>

              {/* Guest Details Form */}
              <div className="space-y-4 text-left">
                <h4 className="font-bold text-base text-airbnb-charcoal">Your Information</h4>
                <div>
                  <label className="block text-xs font-bold text-airbnb-charcoal uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full border border-airbnb-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-airbnb-charcoal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-airbnb-charcoal uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="priya@example.com"
                    className="w-full border border-airbnb-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-airbnb-charcoal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-airbnb-charcoal uppercase mb-1">
                    Message to host (optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    placeholder="Celebrating an anniversary / Estimated arrival time..."
                    className="w-full border border-airbnb-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-airbnb-charcoal resize-none"
                  />
                </div>
              </div>

              {/* Price Details */}
              {calculation && (
                <div className="border-t border-airbnb-lightBorder pt-4 space-y-2 text-sm text-airbnb-charcoal">
                  <div className="flex justify-between">
                    <span>Base Fare ({calculation.nights} nights)</span>
                    <span>{calculation.currencySymbol}{calculation.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning Fee</span>
                    <span>{calculation.currencySymbol}{calculation.cleaningFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>{calculation.currencySymbol}{calculation.serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base border-t border-airbnb-lightBorder pt-2">
                    <span>Total due now</span>
                    <span>{calculation.currencySymbol}{calculation.totalBeforeTaxes.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-airbnb-muted">
                <ShieldCheck className="w-4 h-4 text-airbnb-brand flex-shrink-0" />
                <span>Protected by Airbnb AirCover for all verified bookings.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-airbnb-brand to-airbnb-brandDark text-white font-bold py-3.5 rounded-xl hover:opacity-95 transition disabled:opacity-50"
              >
                {loading ? 'Confirming booking...' : 'Confirm and Pay'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
