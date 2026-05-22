"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "@/app/_hooks/countries";

const UploadImageIcon = () => (
  <svg width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00498" y="1.00498" width="98.4879" height="98.4879" rx="49.2439" fill="#072329"/>
    <rect x="1.00498" y="1.00498" width="98.4879" height="98.4879" rx="49.2439" stroke="#47586E" strokeWidth="2.00996" strokeDasharray="8.04 8.04"/>
    <path d="M50.2472 38.1895V54.2691M43.5474 44.8893L50.2472 38.1895L56.9471 44.8893M62.307 54.2691V59.629C62.307 60.3398 62.0246 61.0214 61.522 61.524C61.0195 62.0266 60.3378 62.3089 59.627 62.3089H40.8674C40.1567 62.3089 39.475 62.0266 38.9724 61.524C38.4699 61.0214 38.1875 60.3398 38.1875 59.629V54.2691" stroke="#67777E" strokeWidth="2.00996" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ProfileTab() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

  return (
    <div
      className="rounded-[20px] p-6 lg:p-8"
      style={{
        background: "rgba(21, 99, 116, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Image Upload */}
        <div className="lg:col-span-1">
          <div
            className="rounded-2xl p-6 flex flex-col items-center"
            style={{
              border: "0.5px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="mb-6">
              <UploadImageIcon />
            </div>
            <button
              className="px-6 py-3 rounded-lg font-sora text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                background: "rgba(21, 99, 116, 0.1)",
                border: "0.5px solid rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF",
              }}
            >
              UPLOAD
            </button>
            <p className="text-white text-sm font-mona-sans mt-4 text-center">
              JPG, PNG, Max 5MB.
            </p>
          </div>
        </div>

        {/* Right: Form Fields */}
        <div className="lg:col-span-2">
          <div
            className="rounded-2xl p-6 space-y-6"
            style={{
              border: "0.5px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-mona-sans mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full h-14 rounded-[40px] border border-[#FFFFFF1A] bg-transparent px-4 text-white placeholder:text-white/60 font-jakarta-sans focus:outline-none focus:border-[#A2CE3A] transition-colors"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-mona-sans mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full h-14 rounded-[40px] border border-[#FFFFFF1A] bg-transparent px-4 text-white placeholder:text-white/60 font-jakarta-sans focus:outline-none focus:border-[#A2CE3A] transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-white text-sm font-mona-sans mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full h-14 rounded-[40px] border border-[#FFFFFF1A] bg-transparent px-4 text-white placeholder:text-white/60 font-jakarta-sans focus:outline-none focus:border-[#A2CE3A] transition-colors"
              />
            </div>

            {/* Location & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-mona-sans mb-2">
                  Location (Country)
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full h-14 rounded-[40px] border border-[#FFFFFF1A] bg-transparent px-4 text-white font-jakarta-sans focus:outline-none focus:border-[#A2CE3A] transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option value="" disabled className="bg-[#0B0D0F] text-white">
                    Select
                  </option>
                  {countries.map((country) => (
                    <option
                      key={country.code}
                      value={country.code}
                      className="bg-[#0B0D0F] text-white"
                    >
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white text-sm font-mona-sans mb-2">
                  Phone Contact (Preferably WhatsApp)
                </label>
                <div className="phone-input-wrapper">
                  <PhoneInput
                    international
                    defaultCountry="US"
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value || "")}
                    className="w-full h-14 rounded-[40px] border border-[#FFFFFF1A] bg-transparent px-4 text-white font-jakarta-sans focus-within:border-[#A2CE3A] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* How did you find out */}
            <div>
              <label className="block text-white text-sm font-mona-sans mb-2">
                How did you find out about TalentLoop?
              </label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full h-14 rounded-[40px] border border-[#FFFFFF1A] bg-transparent px-4 text-white font-jakarta-sans focus:outline-none focus:border-[#A2CE3A] transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                }}
              >
                <option value="" disabled className="bg-[#0B0D0F] text-white">
                  Select
                </option>
                <option value="social" className="bg-[#0B0D0F] text-white">
                  Social Media
                </option>
                <option value="friend" className="bg-[#0B0D0F] text-white">
                  Friend/Referral
                </option>
                <option value="search" className="bg-[#0B0D0F] text-white">
                  Search Engine
                </option>
                <option value="ad" className="bg-[#0B0D0F] text-white">
                  Advertisement
                </option>
                <option value="other" className="bg-[#0B0D0F] text-white">
                  Other
                </option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <button
                className="px-8 py-3 rounded-[10px] font-mona-sans font-medium text-sm transition-opacity hover:opacity-80"
                style={{
                  background: "rgba(118, 118, 128, 0.12)",
                  border: "1.5px solid rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                  height: "48px",
                }}
              >
                Cancel
              </button>
              <button
                className="px-8 py-3 rounded-[10px] font-mona-sans font-semibold text-sm transition-opacity hover:opacity-90"
                style={{
                  background: "#A2CE3A",
                  color: "#121212",
                  height: "48px",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
