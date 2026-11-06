import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';

interface LocationMapProps {
  location: {
    city: string;
    state: string;
    country: string;
    neighborhood: string;
    lat: number;
    lng: number;
  };
}

export const LocationMap: React.FC<LocationMapProps> = ({ location }) => {
  return (
    <div className="py-12 border-b border-airbnb-lightBorder">
      <h2 className="text-[22px] font-semibold text-airbnb-charcoal mb-2">
        Where you'll be
      </h2>
      <p className="text-[15px] text-airbnb-charcoal mb-6">
        {location.neighborhood}, {location.city}, {location.state}, {location.country}
      </p>

      {/* Styled Interactive-looking Map Container */}
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-airbnb-border bg-slate-100 shadow-airbnb-subtle group">
        {/* Map stylized background */}
        <div className="absolute inset-0 bg-[#e5e3df] bg-[radial-gradient(#d4d0c8_1px,transparent_1px)] [background-size:16px_16px]">
          {/* Simulated roads & coastline */}
          <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-[#b5d6f0] border-r-4 border-[#94c1e4] flex items-center justify-center">
            <span className="text-xs font-bold text-sky-800 uppercase tracking-widest -rotate-90 select-none">
              Arabian Sea
            </span>
          </div>

          <div className="absolute left-1/4 right-0 top-1/2 h-4 bg-white/80 border-y border-amber-300" />
          <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-white/80 border-x border-amber-200" />

          {/* Points of interest */}
          <div className="absolute left-[30%] top-[40%] bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full shadow border border-airbnb-border flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            <span>Candolim Beach (450m)</span>
          </div>

          <div className="absolute right-[15%] bottom-[25%] bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full shadow border border-airbnb-border flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-emerald-600" />
            <span>Aguada Fort (1.8km)</span>
          </div>

          {/* Central Property Pin */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group-hover:scale-105 transition-transform">
            <div className="bg-airbnb-brand text-white p-3 rounded-full shadow-airbnb-card border-2 border-white flex items-center justify-center animate-bounce">
              <MapPin className="w-6 h-6 fill-white" />
            </div>
            <div className="mt-2 bg-white px-3 py-1.5 rounded-xl shadow-lg border border-airbnb-border text-xs font-bold text-airbnb-charcoal">
              Mirashya UG10 · Candolim
            </div>
          </div>
        </div>

        {/* Map Control overlay */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md border border-airbnb-border flex flex-col divide-y divide-airbnb-border overflow-hidden text-sm font-bold text-airbnb-charcoal">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-airbnb-surface transition">+</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-airbnb-surface transition">−</button>
        </div>
      </div>

      <div className="mt-6 text-[15px] leading-relaxed text-airbnb-charcoal">
        <h3 className="font-semibold text-base mb-2">Candolim, Goa, India</h3>
        <p className="text-airbnb-muted">
          Candolim is celebrated for its golden beaches, buzzing beach shacks, fine dining, and serene coastal charm. The apartment is nestled in a quiet green lane just moments from the Candolim-Calangute strip, offering immediate access to boutique supermarkets, artisanal bakeries, pharmacies, and sunset beach walks.
        </p>
      </div>
    </div>
  );
};
