import React from 'react';
import { X, Heart, Star, Trash2 } from 'lucide-react';
import { Listing } from '../types';

interface WishlistsModalProps {
  listing: Listing;
  isSaved: boolean;
  onClose: () => void;
  onRemove: () => void;
  onOpenPhotoTour: () => void;
}

export const WishlistsModal: React.FC<WishlistsModalProps> = ({
  listing,
  isSaved,
  onClose,
  onRemove,
  onOpenPhotoTour
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-airbnb-lightBorder flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 hover:bg-airbnb-surface rounded-full transition"
            aria-label="Close wishlists"
          >
            <X className="w-5 h-5 text-airbnb-charcoal" />
          </button>
          <span className="font-bold text-base">Your Wishlists</span>
          <div className="w-8" />
        </div>

        <div className="p-6 overflow-y-auto">
          {isSaved ? (
            <div className="space-y-4">
              <div className="border border-airbnb-border rounded-2xl overflow-hidden hover:shadow-airbnb-subtle transition flex flex-col sm:flex-row">
                <div
                  onClick={() => {
                    onClose();
                    onOpenPhotoTour();
                  }}
                  className="sm:w-44 h-36 relative cursor-pointer group flex-shrink-0"
                >
                  <img
                    src={listing.photos[0].url}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-airbnb-brand text-white p-1 rounded-full shadow">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-airbnb-muted">{listing.propertyType}</span>
                      <div className="flex items-center gap-1 text-xs font-bold text-airbnb-charcoal">
                        <Star className="w-3 h-3 fill-airbnb-charcoal" />
                        <span>{listing.ratings.overall}</span>
                      </div>
                    </div>
                    <h4
                      onClick={() => {
                        onClose();
                        onOpenPhotoTour();
                      }}
                      className="font-bold text-sm text-airbnb-charcoal mt-1 hover:underline cursor-pointer line-clamp-1"
                    >
                      {listing.title}
                    </h4>
                    <p className="text-xs text-airbnb-muted mt-0.5">{listing.location.city}, {listing.location.state}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-airbnb-lightBorder">
                    <span className="text-sm font-bold text-airbnb-charcoal">
                      {listing.pricing.currencySymbol}{listing.pricing.perNight.toLocaleString()} <span className="font-normal text-xs text-airbnb-muted">/ night</span>
                    </span>
                    <button
                      onClick={onRemove}
                      className="p-1.5 hover:bg-rose-50 text-airbnb-muted hover:text-airbnb-brand rounded-lg transition"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 bg-rose-50 text-airbnb-brand rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-airbnb-charcoal">Your wishlist is empty</h4>
              <p className="text-sm text-airbnb-muted max-w-xs mx-auto">
                As you search, click the heart icon on any listing to save your favorite stays.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
