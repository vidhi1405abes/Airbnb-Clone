import { Router, Request, Response } from 'express';
import { listingData } from '../data/listingData.js';
import { ReservationCalculationRequest, ReservationCalculationResponse } from '../types.js';

export const reservationsRouter = Router();

// In-memory store for demo bookings
const bookingsStore: any[] = [];

reservationsRouter.post('/calculate', (req: Request, res: Response) => {
  try {
    const { checkIn, checkOut, adults = 1, children = 0 } = req.body as ReservationCalculationRequest;

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        error: 'Both checkIn and checkOut dates are required (format: YYYY-MM-DD)'
      });
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Checkout date must be at least 1 day after check-in date'
      });
    }

    const totalGuests = Number(adults) + Number(children);
    if (totalGuests > listingData.capacity.guests) {
      return res.status(400).json({
        success: false,
        error: `Maximum capacity for this apartment is ${listingData.capacity.guests} guests`
      });
    }

    const ratePerNight = listingData.pricing.perNight;
    const basePrice = ratePerNight * nights;
    const cleaningFee = listingData.pricing.cleaningFee;
    const serviceFee = Math.round(basePrice * listingData.pricing.serviceFeeRate);
    const totalBeforeTaxes = basePrice + cleaningFee + serviceFee;
    const taxes = Math.round(totalBeforeTaxes * listingData.pricing.taxesRate);
    const grandTotal = totalBeforeTaxes + taxes;

    const calculation: ReservationCalculationResponse = {
      nights,
      ratePerNight,
      basePrice,
      cleaningFee,
      serviceFee,
      totalBeforeTaxes,
      taxes,
      grandTotal,
      currency: listingData.pricing.currency,
      currencySymbol: listingData.pricing.currencySymbol
    };

    return res.json({
      success: true,
      data: calculation
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Calculation error' });
  }
});

reservationsRouter.post('/', (req: Request, res: Response) => {
  try {
    const { checkIn, checkOut, adults, children, guestName, guestEmail, specialRequests } = req.body;

    if (!checkIn || !checkOut) {
      return res.status(400).json({ success: false, error: 'Check-in and checkout dates are required' });
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    const basePrice = listingData.pricing.perNight * nights;
    const cleaningFee = listingData.pricing.cleaningFee;
    const serviceFee = Math.round(basePrice * listingData.pricing.serviceFeeRate);
    const grandTotal = basePrice + cleaningFee + serviceFee;

    const bookingId = 'ARB-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newBooking = {
      id: bookingId,
      listingId: listingData.id,
      listingTitle: listingData.title,
      checkIn,
      checkOut,
      nights,
      guests: { adults: adults || 1, children: children || 0 },
      guestName: guestName || 'Airbnb Guest',
      guestEmail: guestEmail || 'guest@example.com',
      specialRequests: specialRequests || '',
      pricing: {
        perNight: listingData.pricing.perNight,
        nights,
        basePrice,
        cleaningFee,
        serviceFee,
        grandTotal,
        currencySymbol: listingData.pricing.currencySymbol
      },
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    bookingsStore.push(newBooking);

    return res.status(201).json({
      success: true,
      message: 'Reservation confirmed successfully!',
      data: newBooking
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || 'Failed to create booking' });
  }
});

reservationsRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: bookingsStore.length,
    data: bookingsStore
  });
});
