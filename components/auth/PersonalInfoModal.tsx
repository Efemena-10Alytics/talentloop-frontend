"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { getApiUrl, getAuthHeaders } from "@/lib/api";
import PhoneInput, { type Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "@/styles/phone-input.css";
import { Select } from "@/components/ui/Select";
import { COUNTRY_OPTIONS, countryCodeOf, countryNameOf } from "@/lib/countries";
import { useGeoCountry } from "@/lib/hooks/useGeoCountry";
import { useProfile } from "@/hooks/useUserData";

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
  "Facebook Ads",
  "Other",
];

export default function PersonalInfoModal({
  isOpen,
  onComplete,
}: PersonalInfoModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { data: profile } = useProfile();
  const geoCountry = useGeoCountry();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    referralSource: "",
    is10AlyticsOrAmdari: false,
  });

  const prefilled = useRef(false);

  // Prefill from whatever is already saved. The profile may be partial — that's
  // the case this modal exists to complete.
  useEffect(() => {
    if (!isOpen || prefilled.current || !profile) return;

    prefilled.current = true;

    // Seeding a form from data that arrives asynchronously is what effects are
    // for. The ref above keeps it to once per mount, so a background refetch
    // can't overwrite what the user is currently typing.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData((prev) => ({
      ...prev,
      firstName: profile.first_name || prev.firstName,
      lastName: profile.last_name || prev.lastName,
      country: countryNameOf(profile.country) || prev.country,
      phone: profile.phone || prev.phone,
      referralSource: profile.referral_source || prev.referralSource,
    }));
  }, [isOpen, profile]);

  // Fall back to the country the edge detected, but only to fill a blank —
  // never over a stored or user-chosen value.
  useEffect(() => {
    if (!isOpen || !geoCountry) return;

    const detected = countryNameOf(geoCountry);
    if (!detected) return;

    // Same reasoning: the detected country arrives after mount, and the updater
    // is a no-op unless the field is still blank.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData((prev) => (prev.country ? prev : { ...prev, country: detected }));
  }, [isOpen, geoCountry]);

  const phoneCountry = countryCodeOf(formData.country) as Country | undefined;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.country ||
      !formData.referralSource
    ) {
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
      // POST creates the profile and 409s if one already exists, so an existing
      // (possibly partial) profile has to be topped up with PATCH instead.
      const response = await fetch(
        `${getApiUrl()}/api/v1/profile/personal-info`,
        {
          method: profile ? "PATCH" : "POST",
          headers,
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            country: formData.country,
            phone: formData.phone,
            referral_source: formData.referralSource,
            is_10alytics_or_amdari: formData.is10AlyticsOrAmdari,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const firstErrorField = Object.keys(data.errors)[0];
          const firstErrorMessage = data.errors[firstErrorField][0];
          toast({
            variant: "error",
            title: "Failed to save personal info",
            description:
              firstErrorMessage || data.message || "An error occurred",
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

      // Dispatch event so Navbar and other components using useUserData refresh immediately
      window.dispatchEvent(new Event("profile-updated"));

      onComplete();
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description:
          error.message || "An error occurred while saving personal info",
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
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-[30px] bg-[#1A1A1D] border border-white/10 text-white font-sora text-sm placeholder:text-white/40 focus:outline-none focus:border-[#A2CE3A] transition-colors"
                  placeholder=""
                />
              </div>

              {/* Location (Country) */}
              <div>
                <label className="block text-white/80 font-mona-sans text-sm mb-2">
                  Location (Country)
                </label>
                <Select
                  value={formData.country}
                  onChange={(value) => handleInputChange("country", value)}
                  placeholder="Select"
                  searchable
                  searchPlaceholder="Search countries..."
                  options={COUNTRY_OPTIONS}
                />
              </div>

              {/* Phone Contact */}
              <div>
                <label className="block text-white/80 font-mona-sans text-sm mb-2">
                  Phone Contact (Preferably WhatsApp)
                </label>
                <PhoneInput
                  // PhoneInput re-selects on defaultCountry changes only while
                  // the user hasn't picked a country or typed a number, so the
                  // country dropdown and the geo guess can both steer it
                  // without ever rewriting an entered number.
                  international
                  defaultCountry={phoneCountry}
                  value={formData.phone}
                  onChange={(value) => handleInputChange("phone", value || "")}
                  className="phone-input-custom"
                  numberInputProps={{
                    className:
                      "w-full px-4 py-3 rounded-[30px] bg-[#1A1A1D] border border-white/10 text-white font-sora text-sm focus:outline-none focus:border-[#A2CE3A] transition-colors",
                  }}
                />
              </div>

              {/* How did you find out about TalentLoop? */}
              <div>
                <label className="block text-white/80 font-mona-sans text-sm mb-2">
                  How did you find out about TalentLoop?
                </label>
                <Select
                  value={formData.referralSource}
                  onChange={(value) => {
                    handleInputChange("referralSource", value);
                    // Auto-check the 10Alytics/Amdari checkbox if selected
                    if (value === "10Alytics" || value === "Amdari") {
                      handleInputChange("is10AlyticsOrAmdari", true);
                    } else {
                      handleInputChange("is10AlyticsOrAmdari", false);
                    }
                  }}
                  placeholder="Select"
                  options={referralSources.map((source) => ({
                    value: source,
                    label: source,
                  }))}
                />
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
