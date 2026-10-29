"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const ClockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1841_5641)">
      <rect width="32" height="32" rx="16" fill="#EF4444" />
      <g filter="url(#filter0_f_1841_5641)">
        <circle cx="27.2046" cy="23.5688" r="8.72727" transform="rotate(13.1063 27.2046 23.5688)" fill="#8554C5" />
      </g>
      <g filter="url(#filter1_f_1841_5641)">
        <circle cx="7.56784" cy="9.02579" r="8.72727" transform="rotate(13.1063 7.56784 9.02579)" fill="#156374" />
      </g>
      <path
        d="M10.8175 8.9422L8.31754 11.4422C8.20026 11.5595 8.0412 11.6254 7.87535 11.6254C7.7095 11.6254 7.55044 11.5595 7.43316 11.4422C7.31588 11.3249 7.25 11.1659 7.25 11C7.25 10.8342 7.31588 10.6751 7.43316 10.5578L9.93316 8.05782C10.0504 7.94055 10.2095 7.87466 10.3753 7.87466C10.5412 7.87466 10.7003 7.94055 10.8175 8.05782C10.9348 8.1751 11.0007 8.33416 11.0007 8.50001C11.0007 8.66586 10.9348 8.82492 10.8175 8.9422ZM24.5675 10.5578L22.0675 8.05782C21.9503 7.94055 21.7912 7.87466 21.6253 7.87466C21.4595 7.87466 21.3004 7.94055 21.1832 8.05782C21.0659 8.1751 21 8.33416 21 8.50001C21 8.66586 21.0659 8.82492 21.1832 8.9422L23.6832 11.4422C23.7412 11.5003 23.8102 11.5463 23.886 11.5778C23.9619 11.6092 24.0432 11.6254 24.1253 11.6254C24.2075 11.6254 24.2888 11.6092 24.3647 11.5778C24.4405 11.5463 24.5095 11.5003 24.5675 11.4422C24.6256 11.3841 24.6717 11.3152 24.7031 11.2393C24.7345 11.1635 24.7507 11.0821 24.7507 11C24.7507 10.9179 24.7345 10.8366 24.7031 10.7607C24.6717 10.6848 24.6256 10.6159 24.5675 10.5578ZM23.5003 16.625C23.5003 18.1084 23.0605 19.5584 22.2364 20.7918C21.4123 22.0252 20.2409 22.9864 18.8705 23.5541C17.5 24.1218 15.992 24.2703 14.5372 23.9809C13.0823 23.6915 11.7459 22.9772 10.697 21.9283C9.64815 20.8794 8.93385 19.543 8.64446 18.0882C8.35507 16.6333 8.50359 15.1253 9.07125 13.7549C9.63891 12.3844 10.6002 11.2131 11.8336 10.389C13.0669 9.56488 14.517 9.12501 16.0003 9.12501C17.9888 9.12729 19.8951 9.91819 21.3011 11.3242C22.7072 12.7303 23.4981 14.6366 23.5003 16.625ZM21.0003 16.625C21.0003 16.4593 20.9345 16.3003 20.8173 16.1831C20.7001 16.0659 20.5411 16 20.3753 16H16.6253V12.25C16.6253 12.0843 16.5595 11.9253 16.4423 11.8081C16.3251 11.6909 16.1661 11.625 16.0003 11.625C15.8346 11.625 15.6756 11.6909 15.5584 11.8081C15.4412 11.9253 15.3753 12.0843 15.3753 12.25V16.625C15.3753 16.7908 15.4412 16.9497 15.5584 17.067C15.6756 17.1842 15.8346 17.25 16.0003 17.25H20.3753C20.5411 17.25 20.7001 17.1842 20.8173 17.067C20.9345 16.9497 21.0003 16.7908 21.0003 16.625Z"
        fill="#FFE082"
      />
    </g>
    <defs>
      <filter id="filter0_f_1841_5641" x="3.92916" y="0.294085" width="46.5499" height="46.5493" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="7.27273" result="effect1_foregroundBlur_1841_5641" />
      </filter>
      <filter id="filter1_f_1841_5641" x="-15.7076" y="-14.2489" width="46.5499" height="46.5493" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="7.27273" result="effect1_foregroundBlur_1841_5641" />
      </filter>
      <clipPath id="clip0_1841_5641">
        <rect width="32" height="32" rx="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** The nth weekday (0=Sun..6=Sat) of a given month/year, 1-indexed occurrence. */
function nthWeekdayOfMonth(year: number, monthIndex: number, weekday: number, n: number): Date {
  const d = new Date(year, monthIndex, 1);
  let count = 0;
  while (true) {
    if (d.getDay() === weekday) {
      count++;
      if (count === n) return new Date(d);
    }
    d.setDate(d.getDate() + 1);
  }
}

/** Black Friday: the day after Thanksgiving (4th Thursday) in November. */
function blackFridayOf(year: number): Date {
  const thanksgiving = nthWeekdayOfMonth(year, 10, 4, 4);
  const friday = new Date(thanksgiving);
  friday.setDate(friday.getDate() + 1);
  friday.setHours(0, 0, 0, 0);
  return friday;
}

/** This year's Black Friday, or next year's once this year's has passed. */
function nextBlackFriday(now: Date): Date {
  const candidate = blackFridayOf(now.getFullYear());
  return candidate.getTime() > now.getTime() ? candidate : blackFridayOf(now.getFullYear() + 1);
}

function getTimeLeft(target: Date): TimeLeft {
  const totalSeconds = Math.max(0, Math.floor((target.getTime() - Date.now()) / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

const TIMER_UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

/**
 * Fixed promo bar for the Black Friday countdown — sits directly below the
 * (also fixed) site Navbar, so together they form a persistent floating
 * header. Home page only; rendered as a plain sibling of <Navbar/>, never
 * wired into the shared Navbar component itself.
 */
export default function V1PromoBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [barHeight, setBarHeight] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(nextBlackFriday(new Date())));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Measures the bar's own rendered height (one row on wide screens, two once
  // it wraps on narrow ones) so the spacer below never drifts out of sync
  // with a hardcoded guess.
  useLayoutEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setBarHeight(entry.contentRect.height));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleClaim = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed top-[97px] inset-x-0 z-40" style={{ background: "#A2CE3A" }}>
        <div
          ref={barRef}
          className="max-w-[1400px] mx-auto px-4 lg:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-4"
        >
          {/* Left: clock + headline + discount pill */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="flex-shrink-0 scale-75 sm:scale-100">
              <ClockIcon />
            </div>
            <span
              className="font-mona-sans font-bold text-base sm:text-xl lg:text-[32px] leading-none whitespace-nowrap"
              style={{ color: "#000000" }}
            >
              Start 2027 hired
            </span>
            <span
              className="rounded-[10px] bg-white px-3 py-1.5 font-mona-sans font-black text-[11px] sm:text-sm lg:text-base leading-none whitespace-nowrap"
              style={{ color: "#000000" }}
            >
              20% off all our packages
            </span>
          </div>

          {/* Right: countdown + CTA, one continuous black pill */}
          <div
            className="flex items-center gap-1 sm:gap-1.5 rounded-xl p-1.5 sm:p-2 flex-shrink-0"
            style={{ background: "#01090B" }}
          >
            {TIMER_UNITS.map((unit, i) => (
              <div key={unit.key} className="flex items-center gap-1 sm:gap-1.5">
                <div
                  className="flex flex-col items-center justify-center rounded-[10px] w-11 sm:w-14 py-1 sm:py-1.5"
                  style={{ background: "#A2CE3A33" }}
                >
                  <span
                    className="font-mona-sans font-bold leading-[150%]"
                    style={{ fontSize: "22.99px", color: "#A2CE3A" }}
                  >
                    {timeLeft ? pad(timeLeft[unit.key]) : "--"}
                  </span>
                  <span
                    className="font-mona-sans font-normal leading-[150%] text-center"
                    style={{ fontSize: "8.62px", color: "#A2CE3A", opacity: 0.6 }}
                  >
                    {unit.label}
                  </span>
                </div>
                {i < TIMER_UNITS.length - 1 && (
                  <span className="text-white/50 font-bold text-sm px-0.5">:</span>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleClaim}
              className="ml-1.5 sm:ml-2 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 font-mona-sans font-bold text-xs sm:text-sm whitespace-nowrap hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(88.9deg, #A2CE3A 24.91%, #52681D 92.25%)",
                color: "#090B0E",
              }}
            >
              Claim the discount
            </button>
          </div>
        </div>
      </div>

      {/* Spacer: keeps page content clear of the fixed bar above, sized to
          whatever it's actually rendering at (one row or wrapped to two). */}
      <div style={{ height: barHeight }} />
    </>
  );
}
