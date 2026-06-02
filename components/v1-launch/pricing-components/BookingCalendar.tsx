"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookingCalendarProps {
  onDateSelect?: (date: Date) => void;
  onTimeSelect?: (time: string) => void;
}

// Generate 20-minute interval time slots from 10:00 AM to 9:40 PM
const generateTimeSlots = () => {
  const slots: string[] = [];
  const startHour = 10; // 10:00 AM
  const endHour = 21; // 9:00 PM
  const endMinute = 40; // 9:40 PM
  
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 20) {
      // Stop at 9:40 PM
      if (hour === endHour && minute > endMinute) break;
      
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      slots.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  
  return slots;
};

const timeSlots = generateTimeSlots();

export default function BookingCalendar({
  onDateSelect,
  onTimeSelect,
}: BookingCalendarProps) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("10:00");

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

  // Automatically set default time on mount
  useEffect(() => {
    if (onTimeSelect) {
      onTimeSelect(selectedTime);
    }
  }, []);

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

              return (
                <button
                  key={day}
                  onClick={() => !isPastDate && handleDateClick(day)}
                  disabled={isPastDate}
                  className="aspect-square rounded-full flex items-center justify-center font-mona-sans text-sm transition-all"
                  style={
                    isPastDate
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
            {timeSlots.map((time) => {
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
