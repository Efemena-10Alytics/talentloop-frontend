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

const XCircleSVG = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 5.5L5.5 8.5M5.5 5.5L8.5 8.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── Types ─── */

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: MultiSelectOption[];
  className?: string;
}

/* ─── MultiSelect Component ─── */

export function MultiSelect({
  label,
  placeholder = "Select options",
  value,
  onChange,
  options,
  className = "",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

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

  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
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
          className="w-full min-h-[48px] px-4 py-2 rounded-[10px] border border-white/10 bg-[#FFFFFF0D] text-white font-mona-sans text-sm outline-none focus:border-[#A2CE3A] transition-colors flex items-center justify-between gap-2"
        >
          <div className="flex-1 flex items-center gap-2 flex-wrap">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#A2CE3A]/15 text-[#A2CE3A] rounded-[6px] text-xs font-medium"
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => handleRemove(option.value, e)}
                    className="hover:text-[#A2CE3A]/80 transition-colors"
                  >
                    <XCircleSVG />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-white/50">{placeholder}</span>
            )}
          </div>
          <ChevronDownSVG />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-[#1E1F21] border border-white/10 rounded-[10px] shadow-lg max-h-[240px] overflow-y-auto">
            {options.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleToggle(option.value)}
                  className="w-full px-4 py-2.5 text-left text-white font-mona-sans text-sm hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <div className="text-[#A2CE3A]">
                      <CheckSVG />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
