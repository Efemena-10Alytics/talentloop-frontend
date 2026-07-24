"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Select } from "@/components/ui/Select";

interface BookingDetailsFormProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onBack: () => void;
  onSubmit: (data: BookingFormData) => void;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  phone: string;
  howDidYouFind: string;
}

const referralOptions = [
  "Talentloop Facebook/Instagram",
  "Adeiza Suleman",
  "Friends & Family",
  "Kolade-iam_kriyl",
  "Amdari",
  "10alytics",
];

export default function BookingDetailsForm({
  selectedDate,
  selectedTime,
  onBack,
  onSubmit,
}: BookingDetailsFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    phone: "",
    howDidYouFind: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.howDidYouFind) return;
    onSubmit(formData);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

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
      <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/60 font-sora text-sm mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full h-12 rounded-[40px] px-4 h-[56px] font-sora text-sm text-white outline-none transition-all"
                  style={{
                    background: "transparent",
                    border: "1px solid #FFFFFF1A",
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-white/60 font-sora text-sm mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full h-12 rounded-[40px] px-4 h-[56px] font-sora text-sm text-white outline-none transition-all"
                  style={{
                    background: "transparent",
                    border: "1px solid #FFFFFF1A",
                  }}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/60 font-sora text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full h-12 rounded-[40px] px-4 h-[56px] font-sora text-sm text-white outline-none transition-all"
                style={{
                  background: "transparent",
                  border: "1px solid #FFFFFF1A",
                }}
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-white/60 font-sora text-sm mb-2">
                Please share anything that will help prepare for our meeting.
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full rounded-[40px] px-4 py-3 h-[56px] font-sora text-sm text-white outline-none transition-all resize-none"
                style={{
                  background: "transparent",
                  border: "1px solid #FFFFFF1A",
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white/60 font-sora text-sm mb-2">
                Phone Contact (Preferably WhatsApp)
              </label>
              <PhoneInput
                international
                defaultCountry="GB"
                value={formData.phone}
                onChange={(value) =>
                  setFormData({ ...formData, phone: value || "" })
                }
                className="phone-input-custom"
                required
              />
            </div>

            {/* Dropdown */}
            <div>
              <label className="block text-white/60 font-sora text-sm mb-2">
                How did you find out about TalentLoop?
              </label>
              <Select
                value={formData.howDidYouFind}
                onChange={(value) =>
                  setFormData({ ...formData, howDidYouFind: value })
                }
                placeholder="Select"
                options={referralOptions.map((option) => ({
                  value: option,
                  label: option,
                }))}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mt-8">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 h-12 rounded-full font-mona-sans font-semibold text-sm transition-all"
                style={{
                  background: "transparent",
                  border: "1.5px solid #FFFFFF1A",
                  color: "#FFFFFF",
                }}
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 h-12 rounded-full font-mona-sans font-semibold text-sm transition-all"
                style={{
                  background: "#A2CE3A",
                  color: "#0B0D0F",
                }}
              >
                Proceed
              </button>
            </div>
          </form>
  </div>
  );
}
