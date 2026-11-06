import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ListingHeader } from './components/ListingHeader';
import { HeroGrid } from './components/HeroGrid';
import { SpecsBanner } from './components/SpecsBanner';
import { Highlights } from './components/Highlights';
import { Description } from './components/Description';
import { SleepingArrangements } from './components/SleepingArrangements';
import { Amenities } from './components/Amenities';
import { CalendarPicker } from './components/CalendarPicker';
import { StickyReservationCard } from './components/StickyReservationCard';
import { ReserveModal } from './components/ReserveModal';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationMap } from './components/LocationMap';
import { HostProfile } from './components/HostProfile';
import { ThingsToKnow } from './components/ThingsToKnow';
import { Footer } from './components/Footer';
import { PhotoTourModal } from './components/PhotoTourModal';
import { LightboxModal } from './components/LightboxModal';
import { ShareModal } from './components/ShareModal';
import { WishlistsModal } from './components/WishlistsModal';
import { TripsModal } from './components/TripsModal';
import { MessagesModal } from './components/MessagesModal';
import { SearchModal } from './components/SearchModal';
import { ReviewsModal } from './components/ReviewsModal';
import {
  fetchListing,
  fetchReviews,
  calculateReservation,
  fallbackListingData,
  fallbackReviewsData
} from './services/api';
import { Listing, Review, ReservationCalculation } from './types';

export const App: React.FC = () => {
  const [listing, setListing] = useState<Listing>(fallbackListingData);
  const [reviews, setReviews] = useState<Review[]>(fallbackReviewsData);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string>('Candolim, Goa');

  // Dynamic date initialization relative to today
  const [checkIn, setCheckIn] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  });
  const [checkOut, setCheckOut] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 9);
    return d.toISOString().split('T')[0];
  });
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [calculation, setCalculation] = useState<ReservationCalculation | null>(null);

  // Modals & Overlays
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState<boolean>(false);
  const [photoTourInitialIndex, setPhotoTourInitialIndex] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState<boolean>(false);
  const [isTripsModalOpen, setIsTripsModalOpen] = useState<boolean>(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState<boolean>(false);

  // Booked trip state
  const [latestBooking, setLatestBooking] = useState<any>(null);

  // Saved / Wishlist state
  const [isSaved, setIsSaved] = useState<boolean>(() => {
    return localStorage.getItem('airbnb_wishlist_candolim') === 'true';
  });

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleSave = () => {
    const next = !isSaved;
    setIsSaved(next);
    localStorage.setItem('airbnb_wishlist_candolim', String(next));
    showToast(next ? 'Saved to your Wishlist!' : 'Removed from your Wishlist');
  };

  // Initial fetch
  useEffect(() => {
    async function loadData() {
      try {
        const [lData, rData] = await Promise.all([fetchListing('candolim'), fetchReviews()]);
        setListing(lData);
        setReviews(rData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Update browser tab / window title dynamically when listing changes
  useEffect(() => {
    document.title = `${listing.title} - Serviced apartments for Rent in ${listing.location.city}, ${listing.location.state}, India - Airbnb`;
  }, [listing]);

  // Reactive price calculation
  useEffect(() => {
    if (checkIn && checkOut) {
      calculateReservation(
        checkIn,
        checkOut,
        adults,
        children,
        listing.pricing.perNight,
        listing.pricing.cleaningFee
      ).then(calc => {
        setCalculation(calc);
      });
    } else {
      setCalculation(null);
    }
  }, [checkIn, checkOut, adults, children, listing]);

  // Handle location change dynamically
  const handleSelectDestination = async (dest: string) => {
    const lower = dest.toLowerCase();
    let cityKey = 'candolim';
    let formattedName = 'Candolim, Goa';

    if (lower.includes('calangute')) {
      cityKey = 'calangute';
      formattedName = 'Calangute, Goa';
    } else if (lower.includes('anjuna')) {
      cityKey = 'anjuna';
      formattedName = 'Anjuna, Goa';
    } else if (lower.includes('panaji') || lower.includes('fontainhas')) {
      cityKey = 'panaji';
      formattedName = 'Panaji, Goa';
    }

    setSelectedLocation(formattedName);
    const newListing = await fetchListing(cityKey);
    setListing(newListing);
    document.title = `${newListing.title} - Serviced apartments for Rent in ${newListing.location.city}, ${newListing.location.state}, India - Airbnb`;
    showToast(`Switched listing to ${formattedName}!`);
  };

  const handleOpenReviews = () => {
    const el = document.getElementById('reviews-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsReviewsModalOpen(true);
  };

  const handleOpenPhotoTour = (initialIndex = 0) => {
    setPhotoTourInitialIndex(initialIndex);
    setIsPhotoTourOpen(true);
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 fill-airbnb-brand animate-pulse"
        >
          <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.767-3.665 7.806-8.5 7.806-3.738 0-6.195-2.023-7.5-3.524-1.305 1.501-3.762 3.524-7.5 3.524-4.835 0-8.5-3.039-8.5-7.806 0-1.162.308-2.345 1.082-4.064l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C8.037 1.963 9.492 1 11.5 1h4.5zm0 2h-4.5c-1.36 0-2.31.642-3.242 2.305l-.478.918c-1.895 3.714-6.027 12.364-6.99 14.61l-.11.267C.05 22.428 0 23.364 0 24.194 0 27.79 2.764 30 6.5 30c3.42 0 5.412-2.046 6.452-3.376l.548-.718.548.718C15.088 27.954 17.08 30 20.5 30c3.736 0 6.5-2.21 6.5-5.806 0-.83-.05-1.766-.68-3.094l-.11-.267c-.963-2.246-5.095-10.896-6.99-14.61l-.478-.918C17.81 3.642 16.86 3 15.5 3H16z" />
        </svg>
        <span className="text-sm font-semibold text-airbnb-charcoal">Loading listing details...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-airbnb-charcoal text-white text-sm font-semibold px-6 py-3 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Global Navigation Header */}
      <Header
        listing={listing}
        isSaved={isSaved}
        selectedLocation={selectedLocation}
        onToggleSave={handleToggleSave}
        onSearchClick={() => setIsSearchModalOpen(true)}
        onOpenMessages={() => setIsMessagesModalOpen(true)}
        onOpenTrips={() => setIsTripsModalOpen(true)}
        onOpenWishlist={() => setIsWishlistModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6">
        {/* Listing Title & Action Bar */}
        <ListingHeader
          title={listing.title}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          onShare={() => setIsShareModalOpen(true)}
        />

        {/* 5-Photo Bento Hero Grid */}
        <HeroGrid
          photos={listing.photos}
          onOpenPhotoTour={handleOpenPhotoTour}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 2-Column Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
          {/* Left Column: Details (7 cols / ~60%) */}
          <div className="lg:col-span-7 space-y-2">
            <SpecsBanner
              subtitle={listing.subtitle}
              capacity={listing.capacity}
              rating={listing.ratings.overall}
              reviewsCount={listing.ratings.count}
              host={listing.host}
              onOpenReviews={handleOpenReviews}
            />

            <Highlights highlights={listing.highlights} />

            <Description description={listing.description} />

            <SleepingArrangements arrangements={listing.sleepingArrangements} />

            <Amenities amenities={listing.amenities} />

            <CalendarPicker
              checkIn={checkIn}
              checkOut={checkOut}
              onChangeDates={(inDate, outDate) => {
                setCheckIn(inDate);
                setCheckOut(outDate);
              }}
            />
          </div>

          {/* Right Column: Sticky Reservation Card (5 cols / ~40%) */}
          <div className="lg:col-span-5 relative">
            <StickyReservationCard
              pricePerNight={listing.pricing.perNight}
              currencySymbol={listing.pricing.currencySymbol}
              rating={listing.ratings.overall}
              reviewsCount={listing.ratings.count}
              checkIn={checkIn}
              checkOut={checkOut}
              adults={adults}
              children={children}
              maxGuests={listing.capacity.guests}
              calculation={calculation}
              onChangeDates={(inDate, outDate) => {
                setCheckIn(inDate);
                setCheckOut(outDate);
              }}
              onChangeGuests={(newAdults, newChildren) => {
                setAdults(newAdults);
                setChildren(newChildren);
              }}
              onReserve={() => setIsReserveModalOpen(true)}
              onOpenReviews={handleOpenReviews}
            />
          </div>
        </div>

        {/* Bottom Full-Width Sections */}
        <ReviewsSection
          rating={listing.ratings.overall}
          reviewsCount={listing.ratings.count}
          categories={listing.ratings.categories}
          reviews={reviews}
          onOpenAllReviews={() => setIsReviewsModalOpen(true)}
        />

        <LocationMap location={listing.location} />

        <HostProfile
          host={listing.host}
          onContactHost={() => setIsMessagesModalOpen(true)}
        />

        <ThingsToKnow
          houseRules={listing.houseRules}
          safetyRules={listing.safetyRules}
          cancellationPolicy={listing.cancellationPolicy}
        />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* OVERLAY 1: Full-Screen Photo Tour */}
      <PhotoTourModal
        photos={listing.photos}
        isOpen={isPhotoTourOpen}
        initialIndex={photoTourInitialIndex}
        onClose={() => setIsPhotoTourOpen(false)}
        onSelectPhoto={(idx) => {
          setLightboxIndex(idx);
        }}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onShare={() => setIsShareModalOpen(true)}
      />

      {/* OVERLAY 2: Lightbox Single-Photo Viewer */}
      <LightboxModal
        photos={listing.photos}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={handleCloseLightbox}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onShare={() => setIsShareModalOpen(true)}
      />

      {/* Request to Book / Reservation Confirmation Modal */}
      {isReserveModalOpen && (
        <ReserveModal
          listingTitle={listing.title}
          checkIn={checkIn}
          checkOut={checkOut}
          adults={adults}
          children={children}
          calculation={calculation}
          onBookingSuccess={(b) => {
            setLatestBooking(b);
            showToast('Trip booked successfully! Added to your Trips.');
          }}
          onClose={() => {
            setIsReserveModalOpen(false);
          }}
        />
      )}

      {/* Share Dialog */}
      {isShareModalOpen && (
        <ShareModal
          title={listing.title}
          onClose={() => setIsShareModalOpen(false)}
          onToast={showToast}
        />
      )}

      {/* Wishlist Modal */}
      {isWishlistModalOpen && (
        <WishlistsModal
          listing={listing}
          isSaved={isSaved}
          onClose={() => setIsWishlistModalOpen(false)}
          onRemove={handleToggleSave}
          onOpenPhotoTour={() => handleOpenPhotoTour(0)}
        />
      )}

      {/* Trips Modal */}
      {isTripsModalOpen && (
        <TripsModal
          listing={listing}
          booking={latestBooking}
          onClose={() => setIsTripsModalOpen(false)}
          onExplore={() => {
            const cal = document.getElementById('calendar-section');
            if (cal) cal.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Messages / Host Chat Modal */}
      {isMessagesModalOpen && (
        <MessagesModal
          host={listing.host}
          listingTitle={listing.title}
          locationCity={listing.location.city}
          onClose={() => setIsMessagesModalOpen(false)}
        />
      )}

      {/* Reviews Modal */}
      <ReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        rating={listing.ratings.overall}
        reviewsCount={listing.ratings.count}
        categories={listing.ratings.categories}
        reviews={reviews}
      />

      {/* Search Modal */}
      {isSearchModalOpen && (
        <SearchModal
          onClose={() => setIsSearchModalOpen(false)}
          onSelectDestination={handleSelectDestination}
        />
      )}
    </div>
  );
};

export default App;
