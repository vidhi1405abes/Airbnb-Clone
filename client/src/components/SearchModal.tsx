import React, { useState } from 'react';
import { X, Search, MapPin } from 'lucide-react';

interface SearchModalProps {
  onClose: () => void;
  onSelectDestination: (dest: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSelectDestination }) => {
  const [query, setQuery] = useState('');

  const destinations = [
    { city: 'Candolim, Goa', country: 'India', subtitle: 'Popular beach getaway with jacuzzi stays' },
    { city: 'Calangute, Goa', country: 'India', subtitle: 'Bustling beach & nightlife district' },
    { city: 'Anjuna, Goa', country: 'India', subtitle: 'Bohemian coastal cliffside retreat' },
    { city: 'Panaji, Goa', country: 'India', subtitle: 'Historic Latin Quarter & heritage villas' }
  ];

  const handleSelect = (destName: string) => {
    onSelectDestination(destName);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const match = destinations.find(
      d =>
        d.city.toLowerCase().includes(query.toLowerCase()) ||
        d.subtitle.toLowerCase().includes(query.toLowerCase())
    );
    handleSelect(match ? match.city : query.trim());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-airbnb-lightBorder">
          <span className="font-bold text-base text-airbnb-charcoal">Where to?</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-airbnb-surface rounded-full transition cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5 text-airbnb-charcoal" />
          </button>
        </div>

        <div className="py-4">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <Search className="w-5 h-5 text-airbnb-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search destinations (e.g. Panaji, Goa or Candolim)"
              className="w-full border border-airbnb-border rounded-2xl pl-12 pr-24 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-airbnb-charcoal"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-airbnb-brand text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-airbnb-brandDark transition cursor-pointer"
            >
              Search
            </button>
          </form>

          <div className="mt-6">
            <h5 className="text-xs font-bold uppercase text-airbnb-muted tracking-wider mb-3">
              Suggested Destinations in Goa
            </h5>
            <div className="space-y-2">
              {destinations
                .filter(d => d.city.toLowerCase().includes(query.toLowerCase()) || d.subtitle.toLowerCase().includes(query.toLowerCase()))
                .map((d, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelect(d.city)}
                    className="p-3 hover:bg-airbnb-surface rounded-2xl cursor-pointer flex items-center gap-3 transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-airbnb-charcoal">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-airbnb-charcoal">{d.city}</div>
                      <div className="text-xs text-airbnb-muted">{d.subtitle}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
