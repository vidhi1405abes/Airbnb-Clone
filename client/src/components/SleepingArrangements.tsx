import React from 'react';
import { Bed } from 'lucide-react';

interface SleepingArrangementsProps {
  arrangements: {
    room: string;
    beds: string;
  }[];
}

export const SleepingArrangements: React.FC<SleepingArrangementsProps> = ({ arrangements }) => {
  return (
    <div className="py-8 border-b border-airbnb-lightBorder">
      <h2 className="text-[22px] font-semibold text-airbnb-charcoal mb-6">
        Where you'll sleep
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
        {arrangements.map((item, idx) => (
          <div
            key={idx}
            className="border border-airbnb-border rounded-xl p-6 flex flex-col justify-between hover:shadow-airbnb-subtle transition"
          >
            <Bed className="w-6 h-6 stroke-[1.5] text-airbnb-charcoal mb-4" />
            <div>
              <h3 className="font-semibold text-base text-airbnb-charcoal">
                {item.room}
              </h3>
              <p className="text-sm text-airbnb-muted mt-1">{item.beds}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
