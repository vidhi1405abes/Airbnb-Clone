import React, { useState } from 'react';
import {
  Bath,
  Wifi,
  Wind,
  Laptop,
  Utensils,
  Car,
  Waves,
  Tv,
  Lock,
  Sun,
  Shield,
  Coffee
} from 'lucide-react';
import { Amenity } from '../types';
import { AmenitiesModal } from './AmenitiesModal';

interface AmenitiesProps {
  amenities: Amenity[];
}

export const Amenities: React.FC<AmenitiesProps> = ({ amenities }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'bath': return <Bath className="w-6 h-6 stroke-[1.5]" />;
      case 'wifi': return <Wifi className="w-6 h-6 stroke-[1.5]" />;
      case 'wind': return <Wind className="w-6 h-6 stroke-[1.5]" />;
      case 'laptop': return <Laptop className="w-6 h-6 stroke-[1.5]" />;
      case 'utensils': return <Utensils className="w-6 h-6 stroke-[1.5]" />;
      case 'car': return <Car className="w-6 h-6 stroke-[1.5]" />;
      case 'waves': return <Waves className="w-6 h-6 stroke-[1.5]" />;
      case 'tv': return <Tv className="w-6 h-6 stroke-[1.5]" />;
      case 'lock': return <Lock className="w-6 h-6 stroke-[1.5]" />;
      case 'sun': return <Sun className="w-6 h-6 stroke-[1.5]" />;
      case 'coffee': return <Coffee className="w-6 h-6 stroke-[1.5]" />;
      default: return <Shield className="w-6 h-6 stroke-[1.5]" />;
    }
  };

  const topAmenities = amenities.slice(0, 10);

  return (
    <div className="py-8 border-b border-airbnb-lightBorder">
      <h2 className="text-[22px] font-semibold text-airbnb-charcoal mb-6">
        What this place offers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-[15px] text-airbnb-charcoal">
        {topAmenities.map(item => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="text-airbnb-charcoal">{getIcon(item.icon)}</div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="mt-8 border border-airbnb-charcoal hover:bg-airbnb-surface active:scale-95 text-airbnb-charcoal font-semibold text-sm px-6 py-3 rounded-lg transition"
      >
        Show all {amenities.length} amenities
      </button>

      {modalOpen && (
        <AmenitiesModal
          amenities={amenities}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
