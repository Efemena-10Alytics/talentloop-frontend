"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getApiUrl } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import PhoneInput, { type Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "@/styles/phone-input.css";
import { Select } from "@/components/ui/Select";
import { useGeoCountry } from "@/lib/hooks/useGeoCountry";

interface ClaritySessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const referralOptions = [
  "Talentloop Facebook/Instagram",
  "Facebook Ads",
  "Adeiza Suleman",
  "Friends & Family",
  "Kolade-iam_kriyl",
  "Amdari",
  "10alytics",
];

export default function ClaritySessionModal({
  isOpen,
  onClose,
}: ClaritySessionModalProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    referral_source: "",
    notes: "",
    start_time: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const geoCountry = useGeoCountry();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.start_time) {
      toast({
        variant: "error",
        title: "Missing fields",
        description: "Please fill in all required fields",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${getApiUrl()}/api/v1/calendly/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          variant: "error",
          title: "Booking failed",
          description: data.message || "Failed to book your session. Please try again.",
        });
        setLoading(false);
        return;
      }

      toast({
        variant: "success",
        title: "Session booked!",
        description: data.message || "Your clarity session has been booked successfully.",
      });

      // Reset form and close modal
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        referral_source: "",
        notes: "",
        start_time: "",
      });
      
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.message || "An error occurred while booking your session.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(11, 13, 15, 0.95)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-[24px] p-6 lg:p-8"
            style={{
              background: "linear-gradient(180deg, #1E1F21 0%, #0F1416 100%)",
              border: "1px solid #FFFFFF1A",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-mona-sans font-bold text-2xl">
                Book Clarity Session
              </h2>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 font-sora text-sm mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF0D] border border-[#FFFFFF1A] text-white font-sora text-sm focus:outline-none focus:border-[#A2CE3A] transition-colors"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/60 font-sora text-sm mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF0D] border border-[#FFFFFF1A] text-white font-sora text-sm focus:outline-none focus:border-[#A2CE3A] transition-colors"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 font-sora text-sm mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF0D] border border-[#FFFFFF1A] text-white font-sora text-sm focus:outline-none focus:border-[#A2CE3A] transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/60 font-sora text-sm mb-2">
                    Phone
                  </label>
                  <PhoneInput
                    // There's no country field here, so the detected country is
                    // the only signal available; GB stays the fallback.
                    international
                    defaultCountry={(geoCountry ?? "GB") as Country}
                    value={formData.phone}
                    onChange={(value) => setFormData({ ...formData, phone: value || "" })}
                    className="phone-input-custom"
                    numberInputProps={{
                      className: "w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF0D] border border-[#FFFFFF1A] text-white font-sora text-sm focus:outline-none focus:border-[#A2CE3A] transition-colors"
                    }}
                  />
                </div>
              </div>

              {/* Row 3: Preferred Date & Time & Referral Source */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 font-sora text-sm mb-2">
                    Preferred Date & Time <span className="text-red-500">*</span>
                  </label>
                  <div 
                    onClick={() => {
                      const input = document.getElementById('datetime-input') as HTMLInputElement | null;
                      input?.showPicker?.();
                    }}
                    className="cursor-pointer"
                  >
                    <input
                      id="datetime-input"
                      type="datetime-local"
                      name="start_time"
                      value={formData.start_time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF0D] border border-[#FFFFFF1A] text-white font-sora text-sm focus:outline-none focus:border-[#A2CE3A] transition-colors cursor-pointer"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/60 font-sora text-sm mb-2">
                    How did you hear about us?
                  </label>
                  <Select
                    value={formData.referral_source}
                    onChange={(value) => setFormData({ ...formData, referral_source: value })}
                    placeholder="Select an option"
                    options={referralOptions.map((option) => ({ value: option, label: option }))}
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-white/60 font-sora text-sm mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF0D] border border-[#FFFFFF1A] text-white font-sora text-sm focus:outline-none focus:border-[#A2CE3A] transition-colors resize-none"
                  placeholder="Tell us what you'd like to discuss..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 rounded-[16px] font-mona-sans text-base font-semibold text-[#0B0D0F] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(90deg, #A2CE3A 0%, #52681D 100%)",
                }}
              >
                {loading ? "Booking..." : "Book Session"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
