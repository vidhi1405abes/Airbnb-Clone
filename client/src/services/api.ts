import { Listing, Review, ReservationCalculation } from '../types';

export const allListingsMap: Record<string, Listing> = {
  candolim: {
    id: 'candolim-mirashya-ug10',
    title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
    subtitle: 'Entire serviced family apartment in Candolim, India',
    propertyType: 'Entire serviced family apartment',
    location: {
      city: 'Candolim',
      state: 'Goa',
      country: 'India',
      neighborhood: 'Candolim Beach Road, North Goa',
      lat: 15.5186,
      lng: 73.7667
    },
    capacity: {
      guests: 4,
      bedrooms: 1,
      beds: 2,
      baths: 1
    },
    pricing: {
      perNight: 5499,
      currency: 'INR',
      currencySymbol: '₹',
      cleaningFee: 1200,
      serviceFeeRate: 0.14,
      taxesRate: 0.12
    },
    ratings: {
      overall: 4.92,
      count: 48,
      categories: {
        cleanliness: 4.9,
        accuracy: 5.0,
        communication: 4.9,
        location: 4.8,
        checkIn: 5.0,
        value: 4.8
      }
    },
    highlights: [
      {
        icon: 'sparkles',
        title: 'Family-friendly retreat',
        description: 'Spacious living area, high-speed 150 Mbps Wi-Fi, board games, and baby cot available on request.'
      },
      {
        icon: 'key',
        title: 'Self check-in',
        description: 'Check yourself in effortlessly with the secure digital smart keypad.'
      },
      {
        icon: 'calendar',
        title: 'Free cancellation',
        description: 'Full refund up to 48 hours before check-in. Cancel anytime with no penalty.'
      }
    ],
    description: `Welcome to our family-friendly sanctuary in the heart of Candolim, North Goa! Mirashya UG10 is a designer 1BHK serviced luxury apartment featuring an exclusive private Jacuzzi, contemporary warm interiors, and tranquil garden & pool views.

Just a 6-minute leisurely stroll from the gentle sands of Candolim Beach, this boutique stay seamlessly blends resort-style indulgence with the warm coziness of home for families with children. 

✨ WHAT FAMILIES LOVE:
• Private Heated Hydrotherapy Jacuzzi on the private terrace deck
• High-speed fiber optic Wi-Fi (150 Mbps) for remote work and family movie nights
• Sumptuous King-size bed with orthopedic mattress and convertible living sofa bed
• Fully appointed kitchenette with microwave, induction cooktop, kettle, refrigerator, and artisanal family dining set
• 55" 4K Smart TV with Netflix, Amazon Prime, and Disney+ Hotstar
• Resort access to the sparkling swimming pool with shallow area and landscaped gardens
• 24x7 power backup (inverter) and gated security`,
    sleepingArrangements: [
      {
        room: 'Master Bedroom',
        beds: '1 king bed'
      },
      {
        room: 'Living Room',
        beds: '1 double sofa bed'
      }
    ],
    amenities: [
      { id: 'a1', name: 'Private hot tub / Jacuzzi', category: 'Bathroom', icon: 'bath', description: 'Available year-round, private and temperature controlled.' },
      { id: 'a2', name: 'High-speed Wi-Fi (150 Mbps)', category: 'Internet and office', icon: 'wifi', description: 'Tested speed with low latency for video calls and streaming.' },
      { id: 'a3', name: 'Air conditioning', category: 'Heating and cooling', icon: 'wind', description: 'Daikin split AC in both living area and bedroom.' },
      { id: 'a4', name: 'Dedicated workspace', category: 'Internet and office', icon: 'laptop', description: 'Desk with ergonomic seating and nearby power strip.' },
      { id: 'a5', name: 'Kitchenette with induction & microwave', category: 'Kitchen and dining', icon: 'utensils', description: 'Cook family meals with cookware, pans, and spices.' },
      { id: 'a6', name: 'Free parking on premises', category: 'Location features', icon: 'car', description: 'Covered and secure parking inside the gated complex.' },
      { id: 'a7', name: 'Shared outdoor swimming pool', category: 'Outdoor', icon: 'waves', description: 'Open daily with shallow family area from 7:00 AM to 7:00 PM.' },
      { id: 'a8', name: '55" 4K Smart TV', category: 'Entertainment', icon: 'tv', description: 'With built-in Netflix, Prime Video, and YouTube Kids.' },
      { id: 'a9', name: 'Digital keyless entry', category: 'Home safety', icon: 'lock', description: 'Personalized passcode generated for your stay.' },
      { id: 'a10', name: 'Hot water & geyser', category: 'Bathroom', icon: 'droplet', description: 'Instant continuous hot water in bathroom and jacuzzi.' },
      { id: 'a11', name: 'Hair dryer & organic toiletries', category: 'Bathroom', icon: 'sparkles', description: 'Forest Essentials shampoo, conditioner, and body wash.' },
      { id: 'a12', name: 'Iron & ironing board', category: 'Bedroom and laundry', icon: 'shirt', description: 'Full size steam iron available in closet.' },
      { id: 'a13', name: 'Refrigerator & freezer', category: 'Kitchen and dining', icon: 'refrigerator', description: 'Double-door fridge with ice tray.' },
      { id: 'a14', name: 'Electric kettle & tea/coffee maker', category: 'Kitchen and dining', icon: 'coffee', description: 'Complimentary tea bags, artisanal coffee, and creamer.' },
      { id: 'a15', name: 'Family tableware & dining set', category: 'Kitchen and dining', icon: 'wine', description: 'Glassware, mugs, bowls, and child-safe cutlery.' },
      { id: 'a16', name: 'Private balcony / terrace', category: 'Outdoor', icon: 'sun', description: 'Deck seating overlooking the courtyard and palm trees.' },
      { id: 'a17', name: 'Ceiling fans', category: 'Heating and cooling', icon: 'fan', description: 'High-speed quiet fans in all living areas.' },
      { id: 'a18', name: 'First aid kit', category: 'Home safety', icon: 'heart', description: 'Stocked emergency medical kit.' },
      { id: 'a19', name: 'Fire extinguisher', category: 'Home safety', icon: 'shield', description: 'Mounted near kitchenette entrance.' },
      { id: 'a20', name: 'Smoke alarm', category: 'Home safety', icon: 'bell', description: 'Dual optical smoke detector.' },
      { id: 'a21', name: '24/7 Gated security & CCTV', category: 'Home safety', icon: 'camera', description: 'Round the clock security guards at entry gate.' },
      { id: 'a22', name: 'Daily housekeeping (on request)', category: 'Services', icon: 'broom', description: 'Complimentary room cleaning once daily.' },
      { id: 'a23', name: 'Luggage drop-off allowed', category: 'Services', icon: 'luggage', description: 'For families arriving before check-in or departing late.' },
      { id: 'a24', name: 'Beach access within walking distance', category: 'Location features', icon: 'umbrella', description: 'Candolim beach is only 450 meters away.' },
      { id: 'a25', name: 'Long term stays allowed', category: 'Services', icon: 'clock', description: 'Discounts available for stays over 7 and 28 nights.' }
    ],
    photos: [
      {
        id: 'p1',
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
        alt: 'Spacious family living room with sofa and warm lighting',
        caption: 'Sunlit living area with customized warm accents and plush family sofa',
        roomId: 'living_room',
        roomName: 'Living room',
        isHero: true,
        order: 1
      },
      {
        id: 'p2',
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
        alt: 'Private Jacuzzi hot tub on terrace',
        caption: 'Exclusive heated private hydrotherapy Jacuzzi surrounded by lush tropical greenery',
        roomId: 'jacuzzi',
        roomName: 'Private Jacuzzi',
        isHero: true,
        order: 2
      },
      {
        id: 'p3',
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
        alt: 'Master bedroom with king bed and mood lighting',
        caption: 'Tranquil master bedroom with orthopedic king bed and custom mood lighting',
        roomId: 'bedroom',
        roomName: 'Master Bedroom',
        isHero: true,
        order: 3
      },
      {
        id: 'p4',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
        alt: 'Modern bathroom with glass shower and vanity',
        caption: 'Spa-inspired modern bathroom with walk-in rain shower and vanity counter',
        roomId: 'bathroom',
        roomName: 'Bathroom',
        isHero: true,
        order: 4
      },
      {
        id: 'p5',
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
        alt: 'Resort swimming pool and exterior courtyard',
        caption: 'Resort pool surrounded by swaying palm trees and family sundeck loungers',
        roomId: 'outdoor',
        roomName: 'Resort Exterior & Pool',
        isHero: true,
        order: 5
      },
      {
        id: 'p6',
        url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
        alt: 'Living room entertainment center with 55 inch Smart TV',
        caption: 'Living room entertainment center featuring 55" 4K Smart TV with Disney+ and Prime Video',
        roomId: 'living_room',
        roomName: 'Living room',
        isHero: false,
        order: 6
      },
      {
        id: 'p7',
        url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=85',
        alt: 'Cozy family seating nook in living room',
        caption: 'Family conversation area with books, board games, and ambient lighting',
        roomId: 'living_room',
        roomName: 'Living room',
        isHero: false,
        order: 7
      },
      {
        id: 'p8',
        url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85',
        alt: 'Close-up of private Jacuzzi jets and warm water',
        caption: 'Hydro-massage jets providing deep relaxation after a day on the beach',
        roomId: 'jacuzzi',
        roomName: 'Private Jacuzzi',
        isHero: false,
        order: 8
      },
      {
        id: 'p9',
        url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=85',
        alt: 'Bedroom wardrobe and dressing mirror',
        caption: 'Bedroom wardrobe with luggage storage and bedside charging ports',
        roomId: 'bedroom',
        roomName: 'Master Bedroom',
        isHero: false,
        order: 9
      },
      {
        id: 'p10',
        url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
        alt: 'Bed detailing with luxury linens and cushions',
        caption: 'Handcrafted bohemian cushions and crisp Egyptian cotton bed sheets',
        roomId: 'bedroom',
        roomName: 'Master Bedroom',
        isHero: false,
        order: 10
      },
      {
        id: 'p11',
        url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
        alt: 'Kitchenette with induction cooktop, kettle and crockery',
        caption: 'Fully equipped family kitchenette with induction cooktop, microwave, and kettle',
        roomId: 'kitchen',
        roomName: 'Kitchen & Dining',
        isHero: false,
        order: 11
      },
      {
        id: 'p12',
        url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85',
        alt: 'Family dining setup with tableware',
        caption: 'Breakfast bar and dining table setup for family meals',
        roomId: 'kitchen',
        roomName: 'Kitchen & Dining',
        isHero: false,
        order: 12
      },
      {
        id: 'p13',
        url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=85',
        alt: 'Rain shower detail and vanity mirror',
        caption: 'Thermostatic rain shower with Forest Essentials organic bath essentials',
        roomId: 'bathroom',
        roomName: 'Bathroom',
        isHero: false,
        order: 13
      },
      {
        id: 'p14',
        url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=85',
        alt: 'Private balcony overlooking palm trees and courtyard',
        caption: 'Private covered balcony with rattan lounge chairs overlooking lush gardens',
        roomId: 'outdoor',
        roomName: 'Resort Exterior & Pool',
        isHero: false,
        order: 14
      },
      {
        id: 'p15',
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85',
        alt: 'Evening illuminated resort pool and cabanas',
        caption: 'Serene twilight view of the pool with underwater illumination',
        roomId: 'outdoor',
        roomName: 'Resort Exterior & Pool',
        isHero: false,
        order: 15
      }
    ],
    host: {
      name: 'Mirashya Stays',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isSuperhost: true,
      joinedDate: 'Joined in October 2021',
      rating: 4.95,
      reviewsCount: 312,
      responseRate: '100%',
      responseTime: 'within an hour',
      bio: 'Hi, we are Mirashya Stays! We curate thoughtfully designed luxury holiday homes in North Goa. We obsess over hospitality details—from pristine cleanliness to bespoke family dining tips and beach recommendations—to ensure your family getaway is completely memorable.',
      coHosts: [
        {
          name: 'Rohit (Property Manager)',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        }
      ]
    },
    houseRules: [
      'Check-in: 2:00 PM – 10:00 PM',
      'Checkout: by 11:00 AM',
      'Self check-in with digital smart keypad',
      'Maximum 4 guests (families welcome)',
      'Quiet hours after 10:00 PM',
      'Smoking is permitted on the private balcony only',
      'No pets allowed'
    ],
    safetyRules: [
      'Exterior security cameras on common entryways',
      'Carbon monoxide and smoke alarm installed',
      'First aid kit available in bathroom cabinet',
      '24/7 security guard at compound gate'
    ],
    cancellationPolicy: 'Free cancellation for 48 hours. After that, cancel before check-in and get a 50% refund, minus the service fee.'
  },

  calangute: {
    id: 'calangute-mirashya-v12',
    title: 'Family Luxury Villa & Pool Calangute | Mirashya V12',
    subtitle: 'Entire serviced family villa in Calangute, Goa, India',
    propertyType: 'Entire serviced villa',
    location: {
      city: 'Calangute',
      state: 'Goa',
      country: 'India',
      neighborhood: 'Holiday Street, Calangute, North Goa',
      lat: 15.5439,
      lng: 73.7553
    },
    capacity: {
      guests: 6,
      bedrooms: 2,
      beds: 3,
      baths: 2
    },
    pricing: {
      perNight: 6899,
      currency: 'INR',
      currencySymbol: '₹',
      cleaningFee: 1500,
      serviceFeeRate: 0.14,
      taxesRate: 0.12
    },
    ratings: {
      overall: 4.96,
      count: 62,
      categories: {
        cleanliness: 5.0,
        accuracy: 4.9,
        communication: 5.0,
        location: 4.9,
        checkIn: 5.0,
        value: 4.9
      }
    },
    highlights: [
      {
        icon: 'sparkles',
        title: 'Spacious 2BHK family villa',
        description: 'Two en-suite bedrooms, private plunge pool, and lush garden seating for family dinners.'
      },
      {
        icon: 'key',
        title: 'Smart lock self check-in',
        description: 'Keypad entry with individual guest codes.'
      },
      {
        icon: 'calendar',
        title: 'Flexible cancellation',
        description: 'Cancel up to 48 hours before check-in for a full refund.'
      }
    ],
    description: `Experience the quintessential Goan family holiday at Mirashya V12 in Calangute! This independent 2-bedroom luxury villa offers a private plunge pool, spacious sun deck, and full family kitchen.

Located in a quiet green lane just 700 meters from Calangute Beach, families enjoy quiet privacy while being minutes away from top beach shacks, water sports, and local seafood restaurants.`,
    sleepingArrangements: [
      { room: 'Bedroom 1', beds: '1 king bed' },
      { room: 'Bedroom 2', beds: '2 single beds' }
    ],
    amenities: [
      { id: 'c1', name: 'Private plunge pool', category: 'Outdoor', icon: 'waves', description: 'Exclusive to villa guests, child safety gate available.' },
      { id: 'c2', name: 'High-speed Wi-Fi (200 Mbps)', category: 'Internet and office', icon: 'wifi', description: 'Dual-band fiber connection.' },
      { id: 'c3', name: 'Full family kitchen', category: 'Kitchen and dining', icon: 'utensils', description: 'Stove, microwave, blender, toaster, and refrigerator.' },
      { id: 'c4', name: 'Air conditioning throughout', category: 'Heating and cooling', icon: 'wind', description: 'In all bedrooms and living salon.' },
      { id: 'c5', name: 'Free covered parking', category: 'Location features', icon: 'car', description: 'Space for 2 cars on premises.' }
    ],
    photos: [
      {
        id: 'cal-p1',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        alt: 'Calangute luxury family villa exterior and private pool',
        caption: 'Private family villa with sun loungers and plunge pool in Calangute',
        roomId: 'outdoor',
        roomName: 'Villa & Pool',
        isHero: true,
        order: 1
      },
      {
        id: 'cal-p2',
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
        alt: 'Modern living room with family dining table',
        caption: 'Expansive living room and open family dining area',
        roomId: 'living_room',
        roomName: 'Living room',
        isHero: true,
        order: 2
      },
      {
        id: 'cal-p3',
        url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
        alt: 'Master bedroom with king bed',
        caption: 'Master bedroom with pool garden view',
        roomId: 'bedroom',
        roomName: 'Master Bedroom',
        isHero: true,
        order: 3
      },
      {
        id: 'cal-p4',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
        alt: 'Modern en-suite bathroom',
        caption: 'En-suite bathroom with glass shower and double vanity',
        roomId: 'bathroom',
        roomName: 'Bathroom',
        isHero: true,
        order: 4
      },
      {
        id: 'cal-p5',
        url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
        alt: 'Full kitchen with island',
        caption: 'Spacious kitchen equipped for family breakfast and dinners',
        roomId: 'kitchen',
        roomName: 'Kitchen & Dining',
        isHero: true,
        order: 5
      }
    ],
    host: {
      name: 'Mirashya Stays',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isSuperhost: true,
      joinedDate: 'Joined in October 2021',
      rating: 4.96,
      reviewsCount: 312,
      responseRate: '100%',
      responseTime: 'within an hour',
      bio: 'Mirashya Stays curates premier family holiday homes in Goa.',
      coHosts: [{ name: 'Rohit', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }]
    },
    houseRules: ['Check-in: 2:00 PM', 'Checkout: 11:00 AM', 'Family-friendly stay', 'No loud parties'],
    safetyRules: ['Gated villa', 'CCTV on entrance', 'First aid kit'],
    cancellationPolicy: 'Free cancellation for 48 hours.'
  },

  anjuna: {
    id: 'anjuna-mirashya-aj4',
    title: 'Tropical Garden Family Suite Anjuna | Mirashya AJ4',
    subtitle: 'Entire serviced family suite in Anjuna, Goa, India',
    propertyType: 'Entire serviced suite',
    location: {
      city: 'Anjuna',
      state: 'Goa',
      country: 'India',
      neighborhood: 'Anjuna Flea Market Road, North Goa',
      lat: 15.5733,
      lng: 73.7412
    },
    capacity: {
      guests: 4,
      bedrooms: 1,
      beds: 2,
      baths: 1
    },
    pricing: {
      perNight: 5999,
      currency: 'INR',
      currencySymbol: '₹',
      cleaningFee: 1300,
      serviceFeeRate: 0.14,
      taxesRate: 0.12
    },
    ratings: {
      overall: 4.89,
      count: 36,
      categories: {
        cleanliness: 4.9,
        accuracy: 4.9,
        communication: 5.0,
        location: 4.8,
        checkIn: 4.9,
        value: 4.8
      }
    },
    highlights: [
      {
        icon: 'sparkles',
        title: 'Tropical family sanctuary',
        description: 'Surrounded by organic fruit trees and swaying coconut palms.'
      },
      {
        icon: 'key',
        title: 'Keyless entry',
        description: 'Instant keypad check-in.'
      },
      {
        icon: 'calendar',
        title: 'Free cancellation',
        description: 'Cancel up to 48 hours before check-in.'
      }
    ],
    description: `Tucked away in the serene greenery of Anjuna, Mirashya AJ4 is a boutique family holiday suite boasting direct veranda garden access, a heated Jacuzzi, and tranquil open-plan living. Ideal for families seeking relaxation and nature.`,
    sleepingArrangements: [
      { room: 'Bedroom', beds: '1 king bed + 1 single futon' }
    ],
    amenities: [
      { id: 'aj1', name: 'Garden Jacuzzi', category: 'Outdoor', icon: 'bath', description: 'Heated outdoor spa tub.' },
      { id: 'aj2', name: 'Wi-Fi (150 Mbps)', category: 'Internet and office', icon: 'wifi', description: 'Fast Wi-Fi.' },
      { id: 'aj3', name: 'Kitchenette', category: 'Kitchen and dining', icon: 'utensils', description: 'Cookware, kettle, induction.' }
    ],
    photos: [
      {
        id: 'anj-p1',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
        alt: 'Tropical villa exterior in Anjuna',
        caption: 'Tropical family villa suite with outdoor patio in Anjuna',
        roomId: 'outdoor',
        roomName: 'Garden & Patio',
        isHero: true,
        order: 1
      },
      {
        id: 'anj-p2',
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
        alt: 'Private Jacuzzi surrounded by palms',
        caption: 'Heated private Jacuzzi nestled under palm trees',
        roomId: 'jacuzzi',
        roomName: 'Private Jacuzzi',
        isHero: true,
        order: 2
      },
      {
        id: 'anj-p3',
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
        alt: 'Spacious suite bedroom',
        caption: 'Tranquil bedroom with garden views',
        roomId: 'bedroom',
        roomName: 'Bedroom',
        isHero: true,
        order: 3
      },
      {
        id: 'anj-p4',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
        alt: 'Modern stone bathroom',
        caption: 'Natural stone bathroom with rain shower',
        roomId: 'bathroom',
        roomName: 'Bathroom',
        isHero: true,
        order: 4
      },
      {
        id: 'anj-p5',
        url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
        alt: 'Living room lounge',
        caption: 'Open lounge area with smart television',
        roomId: 'living_room',
        roomName: 'Living room',
        isHero: true,
        order: 5
      }
    ],
    host: {
      name: 'Mirashya Stays',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isSuperhost: true,
      joinedDate: 'Joined in October 2021',
      rating: 4.95,
      reviewsCount: 312,
      responseRate: '100%',
      responseTime: 'within an hour',
      bio: 'Mirashya Stays curates premier family holiday homes in Goa.',
      coHosts: [{ name: 'Rohit', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }]
    },
    houseRules: ['Check-in: 2:00 PM', 'Checkout: 11:00 AM', 'Families welcome'],
    safetyRules: ['Gated compound', 'Smoke detector'],
    cancellationPolicy: 'Free cancellation for 48 hours.'
  },

  panaji: {
    id: 'panaji-mirashya-pj02',
    title: 'Heritage Latin Quarter Family 2BHK Panaji | Mirashya PJ02',
    subtitle: 'Entire serviced heritage apartment in Fontainhas, Panaji, India',
    propertyType: 'Entire serviced apartment',
    location: {
      city: 'Panaji',
      state: 'Goa',
      country: 'India',
      neighborhood: 'Fontainhas Heritage Quarter, Panaji',
      lat: 15.4989,
      lng: 73.8278
    },
    capacity: {
      guests: 5,
      bedrooms: 2,
      beds: 3,
      baths: 2
    },
    pricing: {
      perNight: 4899,
      currency: 'INR',
      currencySymbol: '₹',
      cleaningFee: 1100,
      serviceFeeRate: 0.14,
      taxesRate: 0.12
    },
    ratings: {
      overall: 4.94,
      count: 42,
      categories: {
        cleanliness: 4.9,
        accuracy: 5.0,
        communication: 5.0,
        location: 5.0,
        checkIn: 4.9,
        value: 4.9
      }
    },
    highlights: [
      {
        icon: 'sparkles',
        title: 'Historic Fontainhas location',
        description: 'Walk to Portuguese colonial cafes, artisanal bakeries, and art galleries.'
      },
      {
        icon: 'key',
        title: 'Digital lock check-in',
        description: 'Easy self check-in.'
      },
      {
        icon: 'calendar',
        title: 'Free cancellation',
        description: 'Full refund up to 48 hours before check-in.'
      }
    ],
    description: `Immerse your family in the culture and charm of Goa's historic Latin Quarter! Mirashya PJ02 is a lovingly restored Portuguese colonial 2BHK apartment featuring high ceilings, warm wooden balconies, modern air-conditioned comforts, and family amenities.`,
    sleepingArrangements: [
      { room: 'Bedroom 1', beds: '1 queen bed' },
      { room: 'Bedroom 2', beds: '2 twin beds' }
    ],
    amenities: [
      { id: 'p1', name: 'High-speed Wi-Fi', category: 'Internet and office', icon: 'wifi', description: 'Fast internet.' },
      { id: 'p2', name: 'Equipped kitchen', category: 'Kitchen and dining', icon: 'utensils', description: 'Stove, fridge, microwave.' },
      { id: 'p3', name: 'Air conditioning', category: 'Heating and cooling', icon: 'wind', description: 'In all rooms.' }
    ],
    photos: [
      {
        id: 'pan-p1',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
        alt: 'Heritage apartment living room in Fontainhas',
        caption: 'Historic high-ceiling family living room in Fontainhas',
        roomId: 'living_room',
        roomName: 'Living room',
        isHero: true,
        order: 1
      },
      {
        id: 'pan-p2',
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
        alt: 'Colonial style bedroom',
        caption: 'Colonial bedroom with wooden shutter windows',
        roomId: 'bedroom',
        roomName: 'Master Bedroom',
        isHero: true,
        order: 2
      },
      {
        id: 'pan-p3',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
        alt: 'Restored vintage bathroom',
        caption: 'Restored modern bathroom with rain shower',
        roomId: 'bathroom',
        roomName: 'Bathroom',
        isHero: true,
        order: 3
      },
      {
        id: 'pan-p4',
        url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
        alt: 'Kitchen with dining nook',
        caption: 'Family kitchen with modern amenities',
        roomId: 'kitchen',
        roomName: 'Kitchen & Dining',
        isHero: true,
        order: 4
      },
      {
        id: 'pan-p5',
        url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=85',
        alt: 'Portuguese wooden balcony',
        caption: 'Traditional wooden veranda overlooking colorful Latin Quarter streets',
        roomId: 'outdoor',
        roomName: 'Heritage Balcony',
        isHero: true,
        order: 5
      }
    ],
    host: {
      name: 'Mirashya Stays',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isSuperhost: true,
      joinedDate: 'Joined in October 2021',
      rating: 4.95,
      reviewsCount: 312,
      responseRate: '100%',
      responseTime: 'within an hour',
      bio: 'Mirashya Stays curates premier family holiday homes in Goa.',
      coHosts: [{ name: 'Rohit', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }]
    },
    houseRules: ['Check-in: 2:00 PM', 'Checkout: 11:00 AM', 'Family-friendly stay'],
    safetyRules: ['Smoke alarm', 'First aid kit'],
    cancellationPolicy: 'Free cancellation for 48 hours.'
  }
};

export const fallbackListingData: Listing = allListingsMap.candolim;

export const fallbackReviewsData: Review[] = [
  {
    id: 'r1',
    author: 'Priya Sharma & Family',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    location: 'Mumbai, India',
    date: 'October 2024',
    rating: 5,
    comment: 'The private jacuzzi and pool were magical for our family holiday! Our kids had the best time in the pool, the apartment was spotless, and Candolim beach was just a 5-minute stroll. Rohit was super responsive with family-friendly cafe suggestions.'
  },
  {
    id: 'r2',
    author: 'David Wilson & Family',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    location: 'London, United Kingdom',
    date: 'September 2024',
    rating: 5,
    comment: 'One of the best family Airbnb stays we have booked. The apartment was spacious, safe, and impeccably clean. High speed Wi-Fi was rock solid for streaming kids movies in the evening, and the bed was supremely comfortable.'
  },
  {
    id: 'r3',
    author: 'Ananya Roy',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    location: 'Bengaluru, India',
    date: 'August 2024',
    rating: 5,
    comment: 'A true 5-star family haven. The digital check-in was seamless, the resort pool was pristine, and the jacuzzi was warm and spotless. Kitchenette had all essentials for quick meals for our little ones. Will definitely return!'
  },
  {
    id: 'r4',
    author: 'Vikram & Sneha Family',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    location: 'New Delhi, India',
    date: 'July 2024',
    rating: 5,
    comment: 'Mirashya Stays knows hospitality. Communication was instant, location is peaceful yet right next to top Candolim grocery stores and family restaurants. 10/10 recommendation for families.'
  },
  {
    id: 'r5',
    author: 'Sophie Martin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    location: 'Paris, France',
    date: 'June 2024',
    rating: 5,
    comment: 'Wonderful stylish apartment with attention to every detail. The organic toiletries, cozy lights, and private jacuzzi made our family Goa trip unforgettable.'
  },
  {
    id: 'r6',
    author: 'Arjun Mehta & Family',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    location: 'Pune, India',
    date: 'May 2024',
    rating: 5,
    comment: 'Spotless property, very polite host, and very quiet despite being so close to Candolim main road. The private jacuzzi and garden were big highlights for our family.'
  }
];

export async function fetchListing(cityKey?: string): Promise<Listing> {
  const key = cityKey?.toLowerCase() || 'candolim';
  try {
    const res = await fetch(`/api/listing?city=${encodeURIComponent(key)}`);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json.data || allListingsMap[key] || fallbackListingData;
  } catch {
    return allListingsMap[key] || fallbackListingData;
  }
}

export async function fetchReviews(): Promise<Review[]> {
  try {
    const res = await fetch('/api/reviews');
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json.data || fallbackReviewsData;
  } catch {
    return fallbackReviewsData;
  }
}

export async function calculateReservation(
  checkIn: string,
  checkOut: string,
  adults: number = 1,
  children: number = 0,
  currentPrice: number = 5499,
  currentCleaningFee: number = 1200
): Promise<ReservationCalculation> {
  try {
    const res = await fetch('/api/reservations/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkIn, checkOut, adults, children })
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // Client-side fallback
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const ratePerNight = currentPrice;
  const basePrice = ratePerNight * nights;
  const cleaningFee = currentCleaningFee;
  const serviceFee = Math.round(basePrice * 0.14);
  const totalBeforeTaxes = basePrice + cleaningFee + serviceFee;
  const taxes = Math.round(totalBeforeTaxes * 0.12);
  const grandTotal = totalBeforeTaxes + taxes;

  return {
    nights,
    ratePerNight,
    basePrice,
    cleaningFee,
    serviceFee,
    totalBeforeTaxes,
    taxes,
    grandTotal,
    currency: 'INR',
    currencySymbol: '₹'
  };
}

export async function submitReservation(bookingData: any): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    const json = await res.json();
    return json;
  } catch (err: any) {
    const bookingId = 'ARB-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    return {
      success: true,
      data: {
        id: bookingId,
        ...bookingData,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
    };
  }
}
