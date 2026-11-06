import React from 'react';
import { Laptop, KeyRound, CalendarCheck } from 'lucide-react';

interface HighlightItem {
  icon: string;
  title: string;
  description: string;
}

interface HighlightsProps {
  highlights: HighlightItem[];
}

export const Highlights: React.FC<HighlightsProps> = ({ highlights }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'sparkles':
      case 'laptop':
        return <Laptop className="w-6 h-6 stroke-[1.5] text-airbnb-charcoal" />;
      case 'key':
        return <KeyRound className="w-6 h-6 stroke-[1.5] text-airbnb-charcoal" />;
      case 'calendar':
      default:
        return <CalendarCheck className="w-6 h-6 stroke-[1.5] text-airbnb-charcoal" />;
    }
  };

  return (
    <div className="py-8 border-b border-airbnb-lightBorder space-y-6">
      {highlights.map((item, idx) => (
        <div key={idx} className="flex items-start gap-6">
          <div className="pt-0.5">{getIcon(item.icon)}</div>
          <div>
            <h3 className="font-semibold text-base text-airbnb-charcoal">
              {item.title}
            </h3>
            <p className="text-sm text-airbnb-muted mt-0.5 leading-normal">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
