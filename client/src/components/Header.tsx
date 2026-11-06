import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, Menu, User, Heart, MessageSquare, Briefcase, HelpCircle, Home } from 'lucide-react';
import { Listing } from '../types';

interface HeaderProps {
  listing: Listing;
  isSaved: boolean;
  selectedLocation?: string;
  onToggleSave: () => void;
  onSearchClick: () => void;
  onOpenMessages: () => void;
  onOpenTrips: () => void;
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isSaved,
  selectedLocation,
  onSearchClick,
  onOpenMessages,
  onOpenTrips,
  onOpenWishlist
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-airbnb-lightBorder">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="flex items-center gap-2 group">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 fill-airbnb-brand transition-transform group-hover:scale-105"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.767-3.665 7.806-8.5 7.806-3.738 0-6.195-2.023-7.5-3.524-1.305 1.501-3.762 3.524-7.5 3.524-4.835 0-8.5-3.039-8.5-7.806 0-1.162.308-2.345 1.082-4.064l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C8.037 1.963 9.492 1 11.5 1h4.5zm0 2h-4.5c-1.36 0-2.31.642-3.242 2.305l-.478.918c-1.895 3.714-6.027 12.364-6.99 14.61l-.11.267C.05 22.428 0 23.364 0 24.194 0 27.79 2.764 30 6.5 30c3.42 0 5.412-2.046 6.452-3.376l.548-.718.548.718C15.088 27.954 17.08 30 20.5 30c3.736 0 6.5-2.21 6.5-5.806 0-.83-.05-1.766-.68-3.094l-.11-.267c-.963-2.246-5.095-10.896-6.99-14.61l-.478-.918C17.81 3.642 16.86 3 15.5 3H16z" />
            </svg>
            <span className="font-bold text-xl tracking-tight text-airbnb-brand hidden sm:inline">
              airbnb
            </span>
          </a>
        </div>

        {/* Compact Search Bar Pill */}
        <div className="flex items-center">
          <button
            onClick={onSearchClick}
            className="flex items-center text-sm font-semibold border border-airbnb-border rounded-full py-2 pl-6 pr-2 shadow-airbnb-pill hover:shadow-md transition cursor-pointer max-w-md"
          >
            <span className="pr-4 border-r border-airbnb-lightBorder text-airbnb-charcoal font-bold truncate max-w-[150px]">
              {selectedLocation || 'Anywhere'}
            </span>
            <span className="px-4 border-r border-airbnb-lightBorder text-airbnb-charcoal">
              Any week
            </span>
            <span className="pl-4 pr-3 text-airbnb-muted font-normal">
              Add guests
            </span>
            <div className="bg-airbnb-brand p-2 rounded-full text-white ml-1">
              <Search className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </button>
        </div>

        {/* User / Actions */}
        <div className="flex items-center gap-2 relative" ref={menuRef}>
          <button
            onClick={() => alert("Airbnb your home: Start hosting your property and earn income with Airbnb AirCover protection.")}
            className="text-sm font-medium py-2 px-3 hover:bg-airbnb-surface rounded-full transition text-airbnb-charcoal"
          >
            Airbnb your home
          </button>
          <button
            onClick={() => alert("Currency: ₹ INR | Language: English (IN)")}
            className="p-2 hover:bg-airbnb-surface rounded-full transition text-airbnb-charcoal"
            title="Choose a language and currency"
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* User Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 border border-airbnb-border rounded-full py-1.5 px-3 hover:shadow-md transition cursor-pointer"
              aria-label="Main navigation menu"
            >
              <Menu className="w-4 h-4 text-airbnb-charcoal" />
              <div className="bg-airbnb-muted text-white p-1 rounded-full">
                <User className="w-3.5 h-3.5 fill-white" />
              </div>
            </button>

            {userMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-airbnb-card border border-airbnb-lightBorder py-2 z-50 text-sm"
              >
                <div
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenMessages();
                  }}
                  className="px-4 py-2.5 hover:bg-airbnb-surface cursor-pointer font-semibold flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-airbnb-muted" />
                    <span>Messages</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-airbnb-brand" />
                </div>

                <div
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenTrips();
                  }}
                  className="px-4 py-2.5 hover:bg-airbnb-surface cursor-pointer font-semibold flex items-center gap-2.5"
                >
                  <Briefcase className="w-4 h-4 text-airbnb-muted" />
                  <span>Trips</span>
                </div>

                <div
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenWishlist();
                  }}
                  className="px-4 py-2.5 hover:bg-airbnb-surface cursor-pointer font-semibold flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-airbnb-brand fill-airbnb-brand" />
                    <span>Wishlists</span>
                  </div>
                  {isSaved && (
                    <span className="bg-rose-100 text-airbnb-brand text-xs font-bold px-2 py-0.5 rounded-full">
                      1
                    </span>
                  )}
                </div>

                <div className="h-px bg-airbnb-lightBorder my-1" />

                <div
                  onClick={() => {
                    setUserMenuOpen(false);
                    alert("Airbnb your home: Host your home on Airbnb with $3M damage protection.");
                  }}
                  className="px-4 py-2.5 hover:bg-airbnb-surface cursor-pointer text-airbnb-charcoal flex items-center gap-2.5"
                >
                  <Home className="w-4 h-4 text-airbnb-muted" />
                  <span>Airbnb your home</span>
                </div>

                <div
                  onClick={() => {
                    setUserMenuOpen(false);
                    alert("Account Settings: Profile, Payments, Privacy & Sharing.");
                  }}
                  className="px-4 py-2.5 hover:bg-airbnb-surface cursor-pointer text-airbnb-charcoal"
                >
                  Account settings
                </div>

                <div className="h-px bg-airbnb-lightBorder my-1" />

                <div
                  onClick={() => {
                    setUserMenuOpen(false);
                    alert("Airbnb Help Center: 24/7 Support, Safety guidelines, Cancellation assistance.");
                  }}
                  className="px-4 py-2.5 hover:bg-airbnb-surface cursor-pointer text-airbnb-charcoal flex items-center gap-2.5"
                >
                  <HelpCircle className="w-4 h-4 text-airbnb-muted" />
                  <span>Help Center</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
