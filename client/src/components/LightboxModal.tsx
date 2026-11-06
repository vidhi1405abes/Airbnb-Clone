import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Share, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Photo } from '../types';

interface LightboxModalProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onShare?: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  isSaved = false,
  onToggleSave,
  onShare
}) => {
  const currentPhoto = photos[currentIndex] || photos[0];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % photos.length);
  }, [currentIndex, photos.length, onNavigate]);

  // Keyboard navigation & accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('modal-open');

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Single photo lightbox viewer"
      className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between select-none"
    >
      {/* Top Bar */}
      <div className="px-6 py-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 p-2 hover:bg-white/20 rounded-full transition text-white"
          aria-label="Close photo viewer (Escape)"
        >
          <X className="w-5 h-5" />
          <span className="text-sm font-semibold pr-2">Close</span>
        </button>

        {/* Counter */}
        <div className="text-sm font-semibold tracking-wider text-white/90">
          {currentIndex + 1} / {photos.length}
        </div>

        {/* Share & Save */}
        <div className="flex items-center gap-2">
          {onShare && (
            <button
              onClick={onShare}
              className="p-2 hover:bg-white/20 rounded-full transition text-white"
              aria-label="Share photo"
            >
              <Share className="w-4 h-4" />
            </button>
          )}
          {onToggleSave && (
            <button
              onClick={onToggleSave}
              className="p-2 hover:bg-white/20 rounded-full transition text-white"
              aria-label="Save to wishlist"
            >
              <Heart
                className={`w-4 h-4 ${
                  isSaved ? 'fill-airbnb-brand stroke-airbnb-brand' : 'stroke-white'
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center px-4 md:px-16 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-6 z-20 w-12 h-12 rounded-full border border-white/40 bg-black/40 hover:bg-white/20 hover:border-white flex items-center justify-center transition active:scale-95"
          aria-label="Previous photo (Left arrow)"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2]" />
        </button>

        {/* Animated Image Container */}
        <div className="relative max-w-5xl max-h-[76vh] w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center w-full h-full"
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.alt}
                className="max-w-full max-h-[76vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-6 z-20 w-12 h-12 rounded-full border border-white/40 bg-black/40 hover:bg-white/20 hover:border-white flex items-center justify-center transition active:scale-95"
          aria-label="Next photo (Right arrow)"
        >
          <ChevronRight className="w-6 h-6 stroke-[2]" />
        </button>
      </div>

      {/* Bottom Caption Bar */}
      <div className="px-8 py-5 text-center bg-gradient-to-t from-black/80 to-transparent z-20">
        <h4 className="text-sm md:text-base font-semibold text-white">
          {currentPhoto.roomName}
        </h4>
        {currentPhoto.caption && (
          <p className="text-xs md:text-sm text-white/70 mt-1 max-w-2xl mx-auto">
            {currentPhoto.caption}
          </p>
        )}
      </div>
    </div>
  );
};
