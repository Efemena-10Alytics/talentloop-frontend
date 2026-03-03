"use client";

import { useState, useRef, useEffect } from "react";

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
}

/* ─── Select Component ─── */

export function Select({
  label,
  placeholder = "Select an option",
  value,
  onChange,
  options,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 rounded-[10px] border border-white/10 bg-[#FFFFFF0D] text-white font-mona-sans text-sm outline-none focus:border-[#A2CE3A] transition-colors flex items-center justify-between"
        >
          <span className={selectedOption ? "text-white" : "text-white/50"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDownSVG />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-[#1E1F21] border border-white/10 rounded-[10px] shadow-lg max-h-[240px] overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className="w-full px-4 py-2.5 text-left text-white font-mona-sans text-sm hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <CheckSVG />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
