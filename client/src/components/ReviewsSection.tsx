import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
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
  onOpenAllReviews?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  rating,
  reviewsCount,
  categories,
  reviews,
  onOpenAllReviews
}) => {
  const categoryList = [
    { label: 'Cleanliness', score: categories.cleanliness },
    { label: 'Accuracy', score: categories.accuracy },
    { label: 'Communication', score: categories.communication },
    { label: 'Location', score: categories.location },
    { label: 'Check-in', score: categories.checkIn },
    { label: 'Value', score: categories.value }
  ];

  return (
    <div id="reviews-section" className="py-12 border-b border-airbnb-lightBorder scroll-mt-24">
      {/* Title & Overall Rating */}
      <div className="flex items-center gap-2 text-[22px] font-bold text-airbnb-charcoal mb-8">
        <Star className="w-6 h-6 fill-airbnb-charcoal" />
        <span>{rating.toFixed(2)}</span>
        <span>·</span>
        <span>{reviewsCount} reviews</span>
      </div>

      {/* Category Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mb-12">
        {categoryList.map(cat => (
          <div key={cat.label} className="flex items-center justify-between text-sm">
            <span className="text-airbnb-charcoal">{cat.label}</span>
            <div className="flex items-center gap-4">
              <div className="w-32 h-1 bg-airbnb-border rounded-full overflow-hidden">
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

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {reviews.map(review => (
          <div key={review.id} className="space-y-3">
            <div className="flex items-center gap-4">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-12 h-12 rounded-full object-cover border border-airbnb-border"
              />
              <div>
                <h4 className="font-semibold text-base text-airbnb-charcoal">
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
              <span className="font-semibold text-airbnb-charcoal">{review.date}</span>
            </div>

            <p className="text-[15px] leading-relaxed text-airbnb-charcoal">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Show all reviews CTA button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={onOpenAllReviews}
          className="border border-airbnb-charcoal text-airbnb-charcoal font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 transition text-sm cursor-pointer"
        >
          Show all {reviewsCount} reviews
        </button>
      </div>
    </div>
  );
};
