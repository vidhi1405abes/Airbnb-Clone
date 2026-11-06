import React, { useState, useEffect } from 'react';
import { X, Star, Search } from 'lucide-react';
import { Review } from '../types';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rating: number;
  reviewsCount: number;
  categories: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
  reviews: Review[];
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  rating,
  reviewsCount,
  categories,
  reviews
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categoryList = [
    { label: 'Cleanliness', score: categories.cleanliness },
    { label: 'Accuracy', score: categories.accuracy },
    { label: 'Communication', score: categories.communication },
    { label: 'Location', score: categories.location },
    { label: 'Check-in', score: categories.checkIn },
    { label: 'Value', score: categories.value }
  ];

  const filteredReviews = reviews.filter(
    r =>
      r.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full h-[90vh] max-h-[800px] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 border-b border-airbnb-lightBorder flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 hover:bg-airbnb-surface rounded-full transition cursor-pointer"
            aria-label="Close reviews"
          >
            <X className="w-5 h-5 text-airbnb-charcoal" />
          </button>
          <span className="font-bold text-sm text-airbnb-charcoal">Reviews</span>
          <div className="w-9" />
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Summary & Ratings Breakdown (5 cols) */}
          <div className="md:col-span-5 space-y-6 md:sticky md:top-0 h-fit">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 fill-airbnb-charcoal text-airbnb-charcoal" />
              <div className="text-3xl font-bold text-airbnb-charcoal">
                {rating.toFixed(2)}
              </div>
              <span className="text-xl text-airbnb-muted">·</span>
              <div className="text-2xl font-bold text-airbnb-charcoal">
                {reviewsCount} reviews
              </div>
            </div>

            {/* Guest Favorite Badge */}
            <div className="p-4 rounded-2xl border border-airbnb-lightBorder bg-slate-50 flex items-center gap-3">
              <svg viewBox="0 0 32 32" className="w-6 h-6 fill-airbnb-charcoal flex-shrink-0" aria-hidden="true">
                <path d="M9.8 4.7a1 1 0 0 1 1.4.3c3.2 4.6 4.8 9.9 4.8 15.6 0 .5-.4 1-1 1s-1-.5-1-1c0-5.3-1.5-10.2-4.5-14.5a1 1 0 0 1 .3-1.4z" />
              </svg>
              <div className="text-xs text-airbnb-charcoal font-medium">
                <span className="font-bold">Guest favorite:</span> One of the most loved homes on Airbnb based on ratings, reviews, and reliability.
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-3.5 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-airbnb-muted">
                Category ratings
              </h4>
              {categoryList.map(cat => (
                <div key={cat.label} className="flex items-center justify-between text-sm">
                  <span className="text-airbnb-charcoal font-medium">{cat.label}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1 bg-airbnb-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-airbnb-charcoal rounded-full"
                        style={{ width: `${(cat.score / 5.0) * 100}%` }}
                      />
                    </div>
                    <span className="font-semibold text-xs text-airbnb-charcoal w-6 text-right">
                      {cat.score.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Search & Review Items (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-airbnb-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search reviews"
                className="w-full border border-airbnb-border rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-airbnb-charcoal"
              />
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {filteredReviews.length === 0 ? (
                <div className="text-center py-12 text-sm text-airbnb-muted">
                  No reviews matching &ldquo;{searchTerm}&rdquo;
                </div>
              ) : (
                filteredReviews.map(review => (
                  <div key={review.id} className="space-y-2.5 pb-6 border-b border-airbnb-lightBorder last:border-b-0">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-10 h-10 rounded-full object-cover border border-airbnb-border"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-airbnb-charcoal leading-tight">
                          {review.author}
                        </h4>
                        <p className="text-xs text-airbnb-muted">{review.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-airbnb-muted">
                      <div className="flex items-center text-airbnb-charcoal">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-airbnb-charcoal" />
                        ))}
                      </div>
                      <span>·</span>
                      <span className="font-medium text-airbnb-charcoal">{review.date}</span>
                    </div>

                    <p className="text-sm leading-relaxed text-airbnb-charcoal">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
