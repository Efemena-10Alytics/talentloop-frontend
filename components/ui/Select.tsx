"use client";

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";

/* ─── SVG Icons ─── */

const ChevronDownSVG = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckSVG = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3333 4L6 11.3333L2.66667 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── Types ─── */

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  disabled?: boolean;
  /** Show a filter box in the panel. Worth it for long lists like countries. */
  searchable?: boolean;
  searchPlaceholder?: string;
}

/* ─── Select Component ─── */

export function Select({
  label,
  placeholder = "Select an option",
  value,
  onChange,
  options,
  className = "",
  disabled = false,
  searchable = false,
  searchPlaceholder = "Search...",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const visibleOptions = searchable && query.trim()
    ? options.filter((opt) => opt.label.toLowerCase().includes(query.trim().toLowerCase()))
    : options;

  const updateCoords = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({ top: rect.bottom + 4, left: rect.left, width: rect.width });
  }, []);

  useLayoutEffect(() => {
    if (isOpen) updateCoords();
  }, [isOpen, updateCoords]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        panelRef.current &&
        !panelRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    const handleReposition = () => updateCoords();

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [isOpen, updateCoords]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-white font-mona-sans text-sm font-semibold">
          {label}
        </label>
      )}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => {
          // Clear the filter on the way open so the panel always starts on the
          // full list. Done here rather than in an effect to avoid an extra
          // render pass on every open.
          setQuery("");
          setIsOpen((prev) => !prev);
        }}
        className="w-full px-4 py-3 rounded-[40px] border border-white/10 bg-[#FFFFFF0D] text-white font-mona-sans text-sm outline-none focus:border-[#A2CE3A] transition-colors flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className={selectedOption ? "text-white" : "text-white/50"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownSVG />
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={panelRef}
            className="fixed z-[9999] bg-[#1E1F21] border border-white/10 rounded-[10px] shadow-lg max-h-[240px] overflow-y-auto"
            style={{ top: coords.top, left: coords.left, width: coords.width }}
          >
            {searchable && (
              <div className="sticky top-0 z-10 bg-[#1E1F21] p-2 border-b border-white/10">
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  autoFocus
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full px-3 py-2 rounded-[8px] bg-[#151618] border border-white/10 text-white font-mona-sans text-sm placeholder:text-white/40 outline-none focus:border-[#A2CE3A] transition-colors"
                />
              </div>
            )}

            {visibleOptions.length === 0 ? (
              <div className="px-4 py-3 text-white/50 font-mona-sans text-sm">No matches</div>
            ) : (
              visibleOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className="w-full px-4 py-2.5 text-left text-white font-mona-sans text-sm hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <span>{option.label}</span>
                  {value === option.value && <CheckSVG />}
                </button>
              ))
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
