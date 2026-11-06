import React from 'react';
import { X, Check } from 'lucide-react';
import { Amenity } from '../types';

interface AmenitiesModalProps {
  amenities: Amenity[];
  onClose: () => void;
}

export const AmenitiesModal: React.FC<AmenitiesModalProps> = ({ amenities, onClose }) => {
  // Group amenities by category
  const categories = Array.from(new Set(amenities.map(a => a.category)));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-airbnb-lightBorder flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 hover:bg-airbnb-surface rounded-full transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-airbnb-charcoal" />
          </button>
          <span className="font-semibold text-sm">What this place offers</span>
          <div className="w-8" />
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto divide-y divide-airbnb-lightBorder space-y-8">
          {categories.map(category => {
            const items = amenities.filter(a => a.category === category);
            return (
              <div key={category} className="pt-6 first:pt-0">
                <h3 className="font-semibold text-lg text-airbnb-charcoal mb-4">
                  {category}
                </h3>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="p-1 text-airbnb-charcoal">
                        <Check className="w-5 h-5 stroke-[2]" />
                      </div>
                      <div>
                        <div className="text-[15px] font-medium text-airbnb-charcoal">
                          {item.name}
                        </div>
                        {item.description && (
                          <div className="text-xs text-airbnb-muted mt-0.5">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
