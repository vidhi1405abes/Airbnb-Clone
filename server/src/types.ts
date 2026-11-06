export interface Photo {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  roomId: 'living_room' | 'jacuzzi' | 'bedroom' | 'bathroom' | 'kitchen' | 'outdoor';
  roomName: string;
  isHero: boolean;
  order: number;
}

export interface Amenity {
  id: string;
  name: string;
  category: 'Bathroom' | 'Bedroom and laundry' | 'Entertainment' | 'Heating and cooling' | 'Home safety' | 'Internet and office' | 'Kitchen and dining' | 'Location features' | 'Outdoor' | 'Services';
  icon: string;
  description?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  location: string;
  date: string;
  rating: number;
  comment: string;
}

export interface Host {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  joinedDate: string;
  rating: number;
  reviewsCount: number;
  responseRate: string;
  responseTime: string;
  bio: string;
  coHosts?: { name: string; avatar: string }[];
}

export interface Listing {
  id: string;
  title: string;
  subtitle: string;
  propertyType: string;
  location: {
    city: string;
    state: string;
    country: string;
    neighborhood: string;
    lat: number;
    lng: number;
  };
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    baths: number;
  };
  pricing: {
    perNight: number;
    currency: string;
    currencySymbol: string;
    cleaningFee: number;
    serviceFeeRate: number; // percentage, e.g. 0.14
    taxesRate: number; // e.g. 0.12
  };
  ratings: {
    overall: number;
    count: number;
    categories: {
      cleanliness: number;
      accuracy: number;
      communication: number;
      location: number;
      checkIn: number;
      value: number;
    };
  };
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
  description: string;
  sleepingArrangements: {
    room: string;
    beds: string;
  }[];
  amenities: Amenity[];
  photos: Photo[];
  host: Host;
  houseRules: string[];
  safetyRules: string[];
  cancellationPolicy: string;
}

export interface ReservationCalculationRequest {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  infants: number;
}

export interface ReservationCalculationResponse {
  nights: number;
  ratePerNight: number;
  basePrice: number;
  cleaningFee: number;
  serviceFee: number;
  totalBeforeTaxes: number;
  taxes: number;
  grandTotal: number;
  currency: string;
  currencySymbol: string;
}

export interface ReservationBookingRequest extends ReservationCalculationRequest {
  guestName: string;
  guestEmail: string;
  specialRequests?: string;
}
