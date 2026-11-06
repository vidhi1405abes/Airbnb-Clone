import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarPickerProps {
  checkIn: string;
  checkOut: string;
  onChangeDates: (checkIn: string, checkOut: string) => void;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  checkIn,
  checkOut,
  onChangeDates
}) => {
  // Viewing month offset
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const baseDate = new Date();
  const month1Date = new Date(baseDate.getFullYear(), baseDate.getMonth() + currentMonthIndex, 1);
  const month2Date = new Date(baseDate.getFullYear(), baseDate.getMonth() + currentMonthIndex + 1, 1);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateStr = (year: number, month: number, day: number) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const handleDayClick = (dateStr: string) => {
    if (!checkIn || (checkIn && checkOut)) {
      // Start new selection
      onChangeDates(dateStr, '');
    } else if (checkIn && !checkOut) {
      if (new Date(dateStr) < new Date(checkIn)) {
        onChangeDates(dateStr, '');
      } else if (dateStr === checkIn) {
        // Can't checkout on same day
      } else {
        onChangeDates(checkIn, dateStr);
      }
    }
  };

  const renderMonth = (targetDate: Date) => {
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const monthName = targetDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const blanks = Array.from({ length: firstDay }, (_, i) => i);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="w-full">
        <div className="text-center font-bold text-airbnb-charcoal mb-4">
          {monthName}
        </div>
        <div className="grid grid-cols-7 text-center text-xs text-airbnb-muted font-semibold mb-2">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
          {blanks.map(b => (
            <div key={`blank-${b}`} className="h-10 w-10" />
          ))}
          {days.map(d => {
            const dateStr = formatDateStr(year, month, d);
            const isStart = dateStr === checkIn;
            const isEnd = dateStr === checkOut;
            const inRange =
              checkIn &&
              checkOut &&
              new Date(dateStr) > new Date(checkIn) &&
              new Date(dateStr) < new Date(checkOut);

            let bgClass = 'hover:border hover:border-black rounded-full';
            let textClass = 'text-airbnb-charcoal font-medium';

            if (isStart || isEnd) {
              bgClass = 'bg-airbnb-charcoal text-white rounded-full font-bold shadow-sm';
              textClass = 'text-white';
            } else if (inRange) {
              bgClass = 'bg-rose-50 text-airbnb-charcoal rounded-none';
            }

            return (
              <button
                key={dateStr}
                onClick={() => handleDayClick(dateStr)}
                className={`h-10 w-10 mx-auto flex items-center justify-center transition cursor-pointer ${bgClass} ${textClass}`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Calculate nights
  let nights = 0;
  if (checkIn && checkOut) {
    nights = Math.max(
      1,
      Math.ceil(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
      )
    );
  }

  return (
    <div id="calendar-section" className="py-8 border-b border-airbnb-lightBorder scroll-mt-24">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-[22px] font-semibold text-airbnb-charcoal">
            {nights > 0 ? `${nights} nights in Candolim` : 'Select check-in date'}
          </h2>
          <p className="text-sm text-airbnb-muted mt-0.5">
            {checkIn && checkOut
              ? `${checkIn} – ${checkOut}`
              : 'Minimum stay: 2 nights'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonthIndex(prev => Math.max(0, prev - 1))}
            disabled={currentMonthIndex === 0}
            className="p-2 border border-airbnb-border rounded-full hover:bg-airbnb-surface disabled:opacity-30 disabled:cursor-not-allowed transition"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentMonthIndex(prev => prev + 1)}
            className="p-2 border border-airbnb-border rounded-full hover:bg-airbnb-surface transition"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {renderMonth(month1Date)}
        {renderMonth(month2Date)}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs text-airbnb-muted">
          💡 Click a start date and an end date to reserve your stay
        </span>
        <button
          onClick={() => onChangeDates('', '')}
          className="text-sm font-semibold underline underline-offset-4 text-airbnb-charcoal hover:text-black py-1 px-2"
        >
          Clear dates
        </button>
      </div>
    </div>
  );
};
