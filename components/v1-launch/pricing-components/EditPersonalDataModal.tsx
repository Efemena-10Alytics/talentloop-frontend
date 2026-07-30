"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "@/app/_hooks/countries";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/use-toast";
import { getApiUrl, getAuthHeaders } from "@/lib/api";

interface EditPersonalDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PersonalData) => void;
  initialData: PersonalData;
}

export interface PersonalData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
}

export default function EditPersonalDataModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditPersonalDataModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PersonalData>(initialData);
  const [loading, setLoading] = useState(false);

  // Sync form data when initialData changes (e.g. modal re-opened with fresh data)
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName) {
      toast({
        variant: "error",
        title: "Missing fields",
        description: "First name and last name are required",
      });
      return;
    }

    setLoading(true);

    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${getApiUrl()}/api/v1/profile/personal-info`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          first_name: formData.firstName,
          middle_name: formData.middleName || "",
          last_name: formData.lastName,
          country: formData.location,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const firstErrorField = Object.keys(data.errors)[0];
          const firstErrorMessage = data.errors[firstErrorField][0];
          toast({
            variant: "error",
            title: "Failed to update personal info",
            description: firstErrorMessage || data.message || "An error occurred",
          });
        } else {
          toast({
            variant: "error",
            title: "Failed to update personal info",
            description: data.message || "An error occurred",
          });
        }
        setLoading(false);
        return;
      }

      toast({
        variant: "success",
        title: "Personal info updated!",
        description: "Your information has been updated successfully",
      });

      // Dispatch event so Navbar and other components refresh immediately
      window.dispatchEvent(new Event('profile-updated'));

      onSave(formData);
      onClose();
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.message || "An error occurred while updating personal info",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof PersonalData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-[24px] p-6 lg:p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            style={{
              background: "#0F1416",
              border: "1px solid #FFFFFF1A",
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Header */}
            <h2 className="text-2xl lg:text-3xl font-mona-sans font-bold text-white mb-6">
              Edit Personal Data
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-white font-mona-sans text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="w-full rounded-[40px] px-4 h-[56px] font-sora text-sm text-white outline-none transition-all"
                  style={{
                    background: "transparent",
                    border: "1px solid #FFFFFF1A",
                  }}
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-white font-mona-sans text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="w-full rounded-[40px] px-4 h-[56px] font-sora text-sm text-white outline-none transition-all"
                  style={{
                    background: "transparent",
                    border: "1px solid #FFFFFF1A",
                  }}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white font-mona-sans text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled
                  className="w-full rounded-[40px] px-4 h-[56px] font-sora text-sm text-white outline-none transition-all"
                  style={{
                    background: "transparent",
                    border: "1px solid #FFFFFF1A",
                  }}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white font-mona-sans text-sm font-medium mb-2">
                  Phone Number
                </label>
                <PhoneInput
                  international
                  defaultCountry="GB"
                  value={formData.phone}
                  onChange={(value) => handleChange("phone", value || "")}
                  className="phone-input-custom"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-white font-mona-sans text-sm font-medium mb-2">
                  Location
                </label>
                <Select
                  value={formData.location}
                  onChange={(value) => handleChange("location", value)}
                  placeholder="Select a country"
                  options={countries.map((country) => ({ value: country.name, label: country.name }))}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 h-12 px-6 rounded-[12px] font-mona-sans text-sm font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-12 px-6 rounded-[12px] font-mona-sans text-sm font-semibold text-black hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "#A2CE3A",
                    border: "1px solid #FFFFFF1A",
                    boxShadow: "0px -6px 4px 0px #FFFFFF4D inset",
                  }}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
