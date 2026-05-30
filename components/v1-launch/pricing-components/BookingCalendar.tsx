"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookingCalendarProps {
  onDateSelect?: (date: Date) => void;
  onTimeSelect?: (time: string) => void;
}

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

export default function BookingCalendar({
  onDateSelect,
  onTimeSelect,
}: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // May 2026
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedHour, setSelectedHour] = useState<string>("10");
  const [selectedMinute, setSelectedMinute] = useState<string>("00");

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
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
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

  const handleHourChange = (hour: string) => {
    setSelectedHour(hour);
    if (onTimeSelect) {
      onTimeSelect(`${hour}:${selectedMinute}`);
    }
  };

  const handleMinuteChange = (minute: string) => {
    setSelectedMinute(minute);
    if (onTimeSelect) {
      onTimeSelect(`${selectedHour}:${minute}`);
    }
  };

  // Automatically set default time on mount
  useEffect(() => {
    if (onTimeSelect) {
      onTimeSelect(`${selectedHour}:${selectedMinute}`);
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

              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className="aspect-square rounded-full flex items-center justify-center text-[#A8A8A8] font-mona-sans text-sm transition-all"
                  style={
                    isSelected
                      ? {
                          background: "#A2CE3A1A",
                          border: "1.5px solid #A2CE3A33",
                          color: "#A2CE3A",
                        }
                      : {}
                  }
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side - Time Selection (30%) */}
        <div className="lg:w-[30%] flex flex-col gap-4">
          <div className="text-[#E4E4E4] font-mona-sans font-semibold text-sm mb-2">
            Select Time
          </div>
          
          {/* Hour Selection */}
          <div>
            <label className="text-[#A8A8A8] font-mona-sans text-xs mb-2 block">
              Hour
            </label>
            <select
              value={selectedHour}
              onChange={(e) => handleHourChange(e.target.value)}
              className="w-full h-12 rounded-[12px] px-4 font-mona-sans text-sm font-medium transition-all cursor-pointer"
              style={{
                background: "#74748014",
                border: "1.5px solid #FFFFFF1A",
                color: "#A2CE3A",
                outline: "none",
              }}
            >
              {hours.map((hour) => (
                <option key={hour} value={hour} style={{ background: "#1a1a1a" }}>
                  {hour}
                </option>
              ))}
            </select>
          </div>

          {/* Minute Selection */}
          <div>
            <label className="text-[#A8A8A8] font-mona-sans text-xs mb-2 block">
              Minute
            </label>
            <select
              value={selectedMinute}
              onChange={(e) => handleMinuteChange(e.target.value)}
              className="w-full h-12 rounded-[12px] px-4 font-mona-sans text-sm font-medium transition-all cursor-pointer"
              style={{
                background: "#74748014",
                border: "1.5px solid #FFFFFF1A",
                color: "#A2CE3A",
                outline: "none",
              }}
            >
              {minutes.map((minute) => (
                <option key={minute} value={minute} style={{ background: "#1a1a1a" }}>
                  {minute}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Time Display */}
          <div
            className="h-12 rounded-[12px] flex items-center justify-center font-mona-sans text-base font-semibold"
            style={{
              background: "#A2CE3A1A",
              border: "1.5px solid #A2CE3A33",
              color: "#A2CE3A",
            }}
          >
            {selectedHour}:{selectedMinute}
          </div>
        </div>
      </div>
    </div>
  );
}
