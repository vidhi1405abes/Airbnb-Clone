import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';

interface DescriptionProps {
  description: string;
}

export const Description: React.FC<DescriptionProps> = ({ description }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Preview snippet
  const paragraphs = description.split('\n\n');
  const preview = paragraphs.slice(0, 2).join('\n\n');

  return (
    <div className="py-8 border-b border-airbnb-lightBorder">
      <h2 className="text-[22px] font-semibold text-airbnb-charcoal mb-4">
        About this space
      </h2>
      <div className="text-[15px] leading-relaxed text-airbnb-charcoal whitespace-pre-line line-clamp-6">
        {preview}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 flex items-center gap-1 font-semibold text-airbnb-charcoal underline underline-offset-4 hover:text-black transition"
      >
        <span>Show more</span>
        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
      </button>

      {/* Description Full Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-airbnb-lightBorder flex items-center justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 hover:bg-airbnb-surface rounded-full transition"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 text-airbnb-charcoal" />
              </button>
              <span className="font-semibold text-sm">About this space</span>
              <div className="w-8" />
            </div>

            <div className="p-8 overflow-y-auto text-[15px] leading-relaxed text-airbnb-charcoal whitespace-pre-line">
              <h3 className="text-xl font-bold mb-4">The space</h3>
              {description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
