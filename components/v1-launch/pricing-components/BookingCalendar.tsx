"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getApiUrl } from "@/lib/api";

interface BookingCalendarProps {
  onDateSelect?: (date: Date) => void;
  onTimeSelect?: (time: string) => void;
}

interface AvailableSlot {
  invitees_remaining: number;
  scheduling_url: string;
  start_time: string;
  status: string;
}


export default function BookingCalendar({
  onDateSelect,
  onTimeSelect,
}: BookingCalendarProps) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    // Don't allow going to months before current month
    const today = new Date();
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    if (newDate >= currentMonth) {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    if (onDateSelect) {
      onDateSelect(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      );
    }
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    if (onTimeSelect) {
      onTimeSelect(time);
    }
  };

  // Fetch available time slots from API
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${getApiUrl()}/api/v1/calendly/availability`);
        const result = await response.json();
        
        if (result.status === 'success' && result.data) {
          setAvailableSlots(result.data);
        } else {
          setError('Failed to load available time slots');
        }
      } catch (err) {
        console.error('Error fetching availability:', err);
        setError('Failed to load available time slots');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableSlots();
  }, []);

  // Get available dates from slots
  const getAvailableDates = () => {
    const dates = new Set<string>();
    availableSlots.forEach(slot => {
      const date = new Date(slot.start_time);
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      dates.add(dateKey);
    });
    return dates;
  };

  // Get available times for selected date
  const getAvailableTimesForDate = (day: number) => {
    const selectedDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateKey = `${selectedDateObj.getFullYear()}-${selectedDateObj.getMonth()}-${selectedDateObj.getDate()}`;
    
    return availableSlots
      .filter(slot => {
        const slotDate = new Date(slot.start_time);
        const slotDateKey = `${slotDate.getFullYear()}-${slotDate.getMonth()}-${slotDate.getDate()}`;
        return slotDateKey === dateKey && slot.status === 'available';
      })
      .map(slot => {
        const date = new Date(slot.start_time);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      });
  };

  const availableDates = getAvailableDates();
  const availableTimesForSelectedDate = selectedDate ? getAvailableTimesForDate(selectedDate) : [];

  return (
    <div
      className="rounded-[24px] p-6 lg:p-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
        boxShadow:
          "0px 5px 1.5px -4px #08080817, 0px 6px 4px -4px #0808080D, 0px 6px 13px 0px #08080808, 0px 24px 24px -16px #0808080A, 0px 2.15px 0.5px -2px #00000040",
        backdropFilter: "blur(64px)",
      }}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Calendar (70%) */}
        <div className="lg:w-[70%]">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ border: "1.5px solid #A8A8A8" }}
              disabled={currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear()}
            >
              <ChevronLeft className="w-4 h-4 text-[#A8A8A8]" />
            </button>

            <h3 className="text-[#E4E4E4] font-mona-sans font-semibold text-base">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>

            <button
              onClick={handleNextMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ border: "1.5px solid #A8A8A8" }}
            >
              <ChevronRight className="w-4 h-4 text-[#A8A8A8]" />
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-[#727272] font-mona-sans text-xs font-medium"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDay }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isSelected = selectedDate === day;
              
              // Check if this date is in the past
              const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Reset time to compare dates only
              const isPastDate = dateToCheck < today;
              
              // Check if this date has available slots
              const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
              const hasAvailableSlots = availableDates.has(dateKey);
              const isDisabled = isPastDate || !hasAvailableSlots;

              return (
                <button
                  key={day}
                  onClick={() => !isDisabled && handleDateClick(day)}
                  disabled={isDisabled}
                  className="aspect-square rounded-full flex items-center justify-center font-mona-sans text-sm transition-all"
                  style={
                    isDisabled
                      ? {
                          color: "#3A3A3A",
                          cursor: "not-allowed",
                          opacity: 0.4,
                        }
                      : isSelected
                      ? {
                          background: "#A2CE3A1A",
                          border: "1.5px solid #A2CE3A33",
                          color: "#A2CE3A",
                        }
                      : {
                          color: "#A8A8A8",
                        }
                  }
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side - Time Selection (30%) */}
        <div className="lg:w-[30%] flex flex-col">
          {/* Scrollable Time Slots */}
          <div 
            className="flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2"
            style={{ maxHeight: "320px" }}
          >
            {loading ? (
              <div className="text-center text-[#A8A8A8] font-mona-sans text-sm py-4">
                Loading available times...
              </div>
            ) : error ? (
              <div className="text-center text-red-400 font-mona-sans text-sm py-4">
                {error}
              </div>
            ) : !selectedDate ? (
              <div className="text-center text-[#A8A8A8] font-mona-sans text-sm py-4">
                Select a date to view available times
              </div>
            ) : availableTimesForSelectedDate.length === 0 ? (
              <div className="text-center text-[#A8A8A8] font-mona-sans text-sm py-4">
                No available times for this date
              </div>
            ) : (
              availableTimesForSelectedDate.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => handleTimeClick(time)}
                    className="h-12 rounded-[12px] flex items-center justify-center font-mona-sans text-sm font-medium transition-all"
                    style={
                      isSelected
                        ? {
                            background: "#A2CE3A1A",
                            border: "1.5px solid #A2CE3A33",
                            color: "#A2CE3A",
                          }
                        : {
                            background: "#74748014",
                            border: "1.5px solid #FFFFFF1A",
                            color: "#A8A8A8",
                          }
                    }
                  >
                    {time}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
