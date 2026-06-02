"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { getApiUrl, getAuthHeaders } from "@/lib/api";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "@/styles/phone-input.css";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { countries } from "@/app/_hooks/countries";

interface PersonalInfoModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const referralSources = [
  "Google Search",
  "Social Media (LinkedIn, Twitter, etc.)",
  "Friend or Colleague",
  "10Alytics",
  "Amdari",
  "Job Board",
  "Other",
];

// SelectItem component for Radix UI Select
const SelectItem = ({ children, value }: { children: React.ReactNode; value: string }) => {
  return (
    <Select.Item
      value={value}
      className="relative flex items-center px-8 py-2 text-sm text-white font-sora rounded-[8px] hover:bg-[#A2CE3A]/10 focus:bg-[#A2CE3A]/10 outline-none cursor-pointer"
    >
      <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
        <Check className="w-4 h-4 text-[#A2CE3A]" />
      </Select.ItemIndicator>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
};

export default function PersonalInfoModal({ isOpen, onComplete }: PersonalInfoModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    referralSource: "",
    is10AlyticsOrAmdari: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.country || !formData.referralSource) {
      toast({
        variant: "error",
        title: "Missing fields",
        description: "Please fill in all required fields",
      });
      return;
    }

    setLoading(true);

    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${getApiUrl()}/api/v1/profile/personal-info`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          country: formData.country,
          phone: formData.phone,
          referral_source: formData.referralSource,
          is_10alytics_or_amdari: formData.is10AlyticsOrAmdari,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const firstErrorField = Object.keys(data.errors)[0];
          const firstErrorMessage = data.errors[firstErrorField][0];
          toast({
            variant: "error",
            title: "Failed to save personal info",
            description: firstErrorMessage || data.message || "An error occurred",
          });
        } else {
          toast({
            variant: "error",
            title: "Failed to save personal info",
            description: data.message || "An error occurred",
          });
        }
        setLoading(false);
        return;
      }

      toast({
        variant: "success",
        title: "Personal info saved!",
        description: "Your information has been saved successfully",
      });

      onComplete();
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.message || "An error occurred while saving personal info",
      });
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-[24px] p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            style={{
              background: "#2B2B2E",
              border: "1px solid #FFFFFF1A",
            }}
          >
            <h2 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white mb-8">
              Personal Information
            </h2>

            <div className="space-y-5">
              {/* First Name */}
              <div>
                <label className="block text-white/80 font-mona-sans text-sm mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-4 py-3 rounded-[30px] bg-[#1A1A1D] border border-white/10 text-white font-sora text-sm placeholder:text-white/40 focus:outline-none focus:border-[#A2CE3A] transition-colors"
                  placeholder=""
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-white/80 font-mona-sans text-sm mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-4 py-3 rounded-[30px] bg-[#1A1A1D] border border-white/10 text-white font-sora text-sm placeholder:text-white/40 focus:outline-none focus:border-[#A2CE3A] transition-colors"
                  placeholder=""
                />
              </div>

              {/* Location (Country) */}
              <div>
                <label className="block text-white/80 font-mona-sans text-sm mb-2">
                  Location (Country)
                </label>
                <Select.Root
                  value={formData.country}
                  onValueChange={(value) => handleInputChange("country", value)}
                >
                  <Select.Trigger className="w-full px-4 py-3 rounded-[30px] bg-[#1A1A1D] border border-white/10 text-white font-sora text-sm focus:outline-none focus:border-[#A2CE3A] transition-colors flex items-center justify-between">
                    <Select.Value placeholder="Select" />
                    <Select.Icon>
                      <ChevronDown className="w-4 h-4 text-white/60" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content 
                      className="overflow-hidden bg-[#1E1F21] border border-[#FFFFFF1A] rounded-[12px] shadow-lg z-[9999] max-h-[300px]"
                      position="popper"
                      sideOffset={5}
                    >
                      <Select.Viewport className="p-1">
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              {/* Phone Contact */}
              <div>
                <label className="block text-white/80 font-mona-sans text-sm mb-2">
                  Phone Contact (Preferably WhatsApp)
                </label>
                <PhoneInput
                  international
                  defaultCountry="NG"
                  value={formData.phone}
                  onChange={(value) => handleInputChange("phone", value || "")}
                  className="phone-input-custom"
                  numberInputProps={{
                    className: "w-full px-4 py-3 rounded-[30px] bg-[#1A1A1D] border border-white/10 text-white font-sora text-sm focus:outline-none focus:border-[#A2CE3A] transition-colors"
                  }}
                />
              </div>

              {/* How did you find out about TalentLoop? */}
              <div>
                <label className="block text-white/80 font-mona-sans text-sm mb-2">
                  How did you find out about TalentLoop?
                </label>
                <Select.Root
                  value={formData.referralSource}
                  onValueChange={(value) => {
                    handleInputChange("referralSource", value);
                    // Auto-check the 10Alytics/Amdari checkbox if selected
                    if (value === "10Alytics" || value === "Amdari") {
                      handleInputChange("is10AlyticsOrAmdari", true);
                    } else {
                      handleInputChange("is10AlyticsOrAmdari", false);
                    }
                  }}
                >
                  <Select.Trigger className="w-full px-4 py-3 rounded-[30px] bg-[#1A1A1D] border border-white/10 text-white font-sora text-sm focus:outline-none focus:border-[#A2CE3A] transition-colors flex items-center justify-between">
                    <Select.Value placeholder="Select" />
                    <Select.Icon>
                      <ChevronDown className="w-4 h-4 text-white/60" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content 
                      className="overflow-hidden bg-[#1E1F21] border border-[#FFFFFF1A] rounded-[12px] shadow-lg z-[9999]"
                      position="popper"
                      sideOffset={5}
                    >
                      <Select.Viewport className="p-1">
                        {referralSources.map((source) => (
                          <SelectItem key={source} value={source}>
                            {source}
                          </SelectItem>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              {/* Proceed Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3.5 rounded-[30px] text-black font-mona-sans text-base font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                style={{
                  background: "#A2CE3A",
                }}
              >
                {loading ? "Saving..." : "Proceed"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
