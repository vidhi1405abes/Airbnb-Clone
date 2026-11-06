import React from 'react';
import { Grid } from 'lucide-react';
import { Photo } from '../types';

interface HeroGridProps {
  photos: Photo[];
  onOpenPhotoTour: (initialIndex?: number) => void;
  onOpenLightbox: (index: number) => void;
}

export const HeroGrid: React.FC<HeroGridProps> = ({
  photos,
  onOpenPhotoTour
}) => {
  // Take top 5 hero photos
  const heroPhotos = photos.slice(0, 5);

  if (heroPhotos.length < 5) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden mt-2 mb-8 select-none">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] w-full">
        {/* Large Primary Photo (Col 1-2, Row 1-2) */}
        <div
          onClick={() => onOpenPhotoTour(0)}
          className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden group"
          title="Click to view full photo tour"
        >
          <img
            src={heroPhotos[0].url}
            alt={heroPhotos[0].alt}
            className="w-full h-full object-cover transition duration-300 group-hover:brightness-90 group-hover:scale-[1.01]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>

        {/* 4 Secondary Photos */}
        {heroPhotos.slice(1, 5).map((photo, index) => {
          const photoIndex = index + 1;
          return (
            <div
              key={photo.id}
              onClick={() => onOpenPhotoTour(photoIndex)}
              className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden group"
              title="Click to view full photo tour"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover transition duration-300 group-hover:brightness-90 group-hover:scale-[1.01]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          );
        })}
      </div>

      {/* Floating 'Show all photos' button */}
      <button
        onClick={() => onOpenPhotoTour(0)}
        className="absolute bottom-6 right-6 bg-white hover:bg-airbnb-surface active:scale-95 text-airbnb-charcoal border border-airbnb-charcoal/80 font-semibold text-sm px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition cursor-pointer z-10"
      >
        <Grid className="w-4 h-4" />
        <span>Show all photos</span>
      </button>
    </div>
  );
};
