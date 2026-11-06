import React from 'react';
import { Share, Heart } from 'lucide-react';

interface ListingHeaderProps {
  title: string;
  isSaved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
}

export const ListingHeader: React.FC<ListingHeaderProps> = ({
  title,
  isSaved,
  onToggleSave,
  onShare
}) => {
  return (
    <div className="pt-6 pb-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <h1 className="text-[26px] font-semibold text-airbnb-charcoal leading-tight">
          {title}
        </h1>

        <div className="flex items-center gap-4 text-sm font-semibold">
          {/* Share Button */}
          <button
            onClick={onShare}
            className="flex items-center gap-2 py-2 px-3 hover:bg-airbnb-surface rounded-lg transition underline underline-offset-2"
          >
            <Share className="w-4 h-4 stroke-[2]" />
            <span>Share</span>
          </button>

          {/* Save / Wishlist Button */}
          <button
            onClick={onToggleSave}
            className="flex items-center gap-2 py-2 px-3 hover:bg-airbnb-surface rounded-lg transition underline underline-offset-2"
          >
            <Heart
              className={`w-4 h-4 stroke-[2] transition-colors ${
                isSaved ? 'fill-airbnb-brand stroke-airbnb-brand' : 'stroke-airbnb-charcoal'
              }`}
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
