"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "@/app/_hooks/countries";
import * as Select from "@radix-ui/react-select";
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
                <Select.Root value={formData.location} onValueChange={(value) => handleChange("location", value)}>
                  <Select.Trigger
                    className="w-full rounded-[40px] px-4 h-[56px] font-sora text-sm text-white outline-none transition-all flex items-center justify-between"
                    style={{
                      background: "transparent",
                      border: "1px solid #FFFFFF1A",
                    }}
                  >
                    <Select.Value placeholder="Select a country" />
                    <Select.Icon>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content
                      className="overflow-hidden rounded-[12px] shadow-lg z-[9999]"
                      style={{
                        background: "#0F1416",
                        border: "1px solid #FFFFFF1A",
                        maxHeight: "300px",
                      }}
                      position="popper"
                      sideOffset={5}
                    >
                      <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white/5 text-white cursor-default">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 6.5L6 1.5L1 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Select.ScrollUpButton>
                      <Select.Viewport className="p-1">
                        {countries.map((country) => (
                          <Select.Item
                            key={country.code}
                            value={country.name}
                            className="relative flex items-center px-4 py-2 text-sm text-white rounded-[8px] outline-none cursor-pointer hover:bg-white/10 data-[highlighted]:bg-white/10 data-[state=checked]:bg-white/20"
                          >
                            <Select.ItemText>{country.name}</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 3L4.5 8.5L2 6" stroke="#A2CE3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                      <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white/5 text-white cursor-default">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
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
