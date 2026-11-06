import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Share, Heart, X } from 'lucide-react';
import { Photo } from '../types';

interface PhotoTourModalProps {
  photos: Photo[];
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
  onSelectPhoto: (index: number) => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onShare?: () => void;
}

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  photos,
  isOpen,
  initialIndex = 0,
  onClose,
  onSelectPhoto,
  isSaved = false,
  onToggleSave,
  onShare
}) => {
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(initialIndex);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Group photos by room
  const rooms = [
    {
      id: 'living_room',
      title: 'Living room',
      subtitle: 'Air conditioning · 55" 4K Smart TV · Cozy plush sofa'
    },
    {
      id: 'jacuzzi',
      title: 'Private Jacuzzi & Terrace',
      subtitle: 'Exclusive private heated hydrotherapy hot tub'
    },
    {
      id: 'bedroom',
      title: 'Master Bedroom',
      subtitle: '1 king bed · Orthopedic mattress · 400-TC Egyptian cotton'
    },
    {
      id: 'bathroom',
      title: 'Full Bathroom',
      subtitle: 'Walk-in rain shower · Continuous hot water geyser · Organic toiletries'
    },
    {
      id: 'kitchen',
      title: 'Kitchen & Dining',
      subtitle: 'Induction cooktop · Microwave · Refrigerator · Artisanal dinnerware'
    },
    {
      id: 'outdoor',
      title: 'Exterior & Resort Swimming Pool',
      subtitle: 'Landscaped tropical gardens · Gated security · Shared pool'
    }
  ];

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('modal-open');
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scrollToRoom = (roomId: string) => {
    const el = document.getElementById(`room-section-${roomId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour gallery"
      className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden animate-in fade-in duration-200"
    >
      {/* Top Main Navigation Header */}
      <div className="bg-white border-b border-airbnb-lightBorder px-6 py-4 flex items-center justify-between z-30">
        <button
          onClick={onClose}
          className="p-2 hover:bg-airbnb-surface rounded-full transition flex items-center gap-2 text-airbnb-charcoal"
          aria-label="Back to listing"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span className="font-semibold text-sm">Listing details</span>
        </button>

        {/* Room Navigation Pills */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar">
          {rooms.map(room => (
            <button
              key={room.id}
              onClick={() => scrollToRoom(room.id)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-airbnb-surface hover:bg-airbnb-border/60 text-airbnb-charcoal transition"
            >
              {room.title}
            </button>
          ))}
        </div>

        {/* Share & Save */}
        <div className="flex items-center gap-3">
          {onShare && (
            <button
              onClick={onShare}
              className="p-2 hover:bg-airbnb-surface rounded-full transition text-airbnb-charcoal"
              title="Share"
            >
              <Share className="w-4 h-4" />
            </button>
          )}
          {onToggleSave && (
            <button
              onClick={onToggleSave}
              className="p-2 hover:bg-airbnb-surface rounded-full transition text-airbnb-charcoal"
              title="Save"
            >
              <Heart
                className={`w-4 h-4 ${
                  isSaved ? 'fill-airbnb-brand stroke-airbnb-brand' : 'stroke-airbnb-charcoal'
                }`}
              />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-airbnb-surface rounded-full transition text-airbnb-charcoal ml-1"
            aria-label="Close photo tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Top Thumbnail Strip Carousel (Matches reference screenshot on Page 2) */}
      <div className="bg-airbnb-surface/60 border-b border-airbnb-lightBorder px-6 py-3 overflow-x-auto no-scrollbar flex items-center gap-3">
        {photos.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => {
              setSelectedThumbIndex(idx);
              onSelectPhoto(idx);
            }}
            className={`flex-shrink-0 h-14 w-20 rounded-lg overflow-hidden border-2 transition relative ${
              selectedThumbIndex === idx
                ? 'border-airbnb-charcoal scale-105 shadow-md'
                : 'border-transparent hover:opacity-80'
            }`}
            title={`View photo ${idx + 1}: ${photo.alt}`}
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Categorized Photo Grid Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-6 py-8 max-w-5xl mx-auto w-full space-y-16"
      >
        {rooms.map(room => {
          const roomPhotos = photos.filter(p => p.roomId === room.id);
          if (roomPhotos.length === 0) return null;

          return (
            <div key={room.id} id={`room-section-${room.id}`} className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-airbnb-charcoal">
                  {room.title}
                </h3>
                <p className="text-sm text-airbnb-muted mt-0.5">
                  {room.subtitle}
                </p>
              </div>

              {/* Photo Grid for Room */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roomPhotos.map(photo => {
                  const originalIndex = photos.findIndex(p => p.id === photo.id);
                  return (
                    <div
                      key={photo.id}
                      onClick={() => onSelectPhoto(originalIndex)}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3] shadow-sm hover:shadow-md transition"
                      title="Click to open full-screen lightbox"
                    >
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                      {/* Room tag badge */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[11px] font-bold text-airbnb-charcoal px-2.5 py-1 rounded-full shadow-sm">
                        {photo.roomName}
                      </div>

                      {photo.caption && (
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-xs text-white font-medium">
                            {photo.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
