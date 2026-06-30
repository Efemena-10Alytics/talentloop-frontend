"use client";

import { useRef, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "@/app/_hooks/countries";
import { useAvatar } from "@/context/AvatarContext";
import { useAuthMe, useProfile } from "@/hooks/useUserData";
import { useToast } from "@/components/ui/use-toast";

const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4v12M8 8l4-4 4 4M4 20h16" stroke="#67777E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ProfileTab() {
  const { toast } = useToast();
  const { avatarUrl, setAvatarUrl } = useAvatar();
  const { data: authData } = useAuthMe();
  const { data: profile } = useProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState((profile as any)?.phone ?? "");
  const [selectedCountry, setSelectedCountry] = useState((profile as any)?.country ?? "");
  const [selectedSource, setSelectedSource] = useState((profile as any)?.referral_source ?? "");

  const displayAvatar = preview ?? avatarUrl;

  const name = authData?.user?.name ?? "";
  const nameParts = name.split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ") ?? "";
  const email = authData?.user?.email ?? "";

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const handleAvatarUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) { fileInputRef.current?.click(); return; }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("avatar", file);

      const res = await fetch("/api/profile/avatar", { method: "POST", body: fd });
      const json = await res.json();

      if (!res.ok) {
        toast({ variant: "error", title: "Upload failed", description: json.message || "An error occurred" });
        return;
      }

      const newUrl = json.data?.avatar ?? preview;
      setAvatarUrl(newUrl);
      setPreview(null);
      toast({ variant: "success", title: "Avatar updated!" });
    } catch {
      toast({ variant: "error", title: "Upload failed", description: "An error occurred" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="rounded-[20px] p-6 lg:p-8"
      style={{
        background: "rgba(21, 99, 116, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Avatar Upload */}
        <div className="lg:col-span-1">
          <div
            className="rounded-2xl p-6 flex flex-col items-center"
            style={{ border: "0.5px solid rgba(255, 255, 255, 0.1)" }}
          >
            {/* Avatar preview / placeholder */}
            <div
              className="w-[100px] h-[100px] rounded-full mb-6 flex items-center justify-center overflow-hidden cursor-pointer relative group"
              style={{
                background: displayAvatar ? "transparent" : "#072329",
                border: "2px dashed #47586E",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              {displayAvatar ? (
                <img src={displayAvatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <UploadIcon />
              )}
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-mona-sans">Change</span>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileSelect}
            />

            <button
              onClick={handleAvatarUpload}
              disabled={uploading}
              className="px-6 py-3 rounded-lg font-sora text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{
                background: preview ? "#A2CE3A" : "rgba(21, 99, 116, 0.1)",
                border: "0.5px solid rgba(255, 255, 255, 0.1)",
                color: preview ? "#121212" : "#FFFFFF",
              }}
            >
              {uploading ? "Uploading..." : preview ? "Save Avatar" : "UPLOAD"}
            </button>
            <p className="text-[#95ACCB] text-xs font-mona-sans mt-3 text-center">
              JPG, PNG, Max 5MB.
            </p>
          </div>
        </div>

        {/* Right: Form Fields (read-only display from profile) */}
        <div className="lg:col-span-2">
          <div
            className="rounded-2xl p-6 space-y-6"
            style={{ border: "0.5px solid rgba(255, 255, 255, 0.1)" }}
          >
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-mona-sans mb-2">First Name</label>
                <input
                  type="text"
                  defaultValue={firstName}
                  placeholder="First Name"
                  className="w-full h-14 rounded-[40px] border border-[#FFFFFF1A] bg-transparent px-4 text-white placeholder:text-white/60 font-jakarta-sans focus:outline-none focus:border-[#A2CE3A] transition-colors"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-mona-sans mb-2">Last Name</label>
                <input
                  type="text"
                  defaultValue={lastName}
                  placeholder="Last Name"
                  className="w-full h-14 rounded-[40px] border border-[#FFFFFF1A] bg-transparent px-4 text-white placeholder:text-white/60 font-jakarta-sans focus:outline-none focus:border-[#A2CE3A] transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-white text-sm font-mona-sans mb-2">Email</label>
              <input
                type="email"
                defaultValue={email}
                placeholder="Email"
                readOnly
                className="w-full h-14 rounded-[40px] border border-[#FFFFFF1A] bg-transparent px-4 text-white/60 placeholder:text-white/40 font-jakarta-sans focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Location & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-mona-sans mb-2">Location (Country)</label>
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
                  <option value="" disabled className="bg-[#0B0D0F] text-white">Select</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code} className="bg-[#0B0D0F] text-white">
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white text-sm font-mona-sans mb-2">Phone Contact (Preferably WhatsApp)</label>
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
              <label className="block text-white text-sm font-mona-sans mb-2">How did you find out about TalentLoop?</label>
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
                <option value="" disabled className="bg-[#0B0D0F] text-white">Select</option>
                <option value="social" className="bg-[#0B0D0F] text-white">Social Media</option>
                <option value="friend" className="bg-[#0B0D0F] text-white">Friend/Referral</option>
                <option value="search" className="bg-[#0B0D0F] text-white">Search Engine</option>
                <option value="ad" className="bg-[#0B0D0F] text-white">Advertisement</option>
                <option value="other" className="bg-[#0B0D0F] text-white">Other</option>
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
                style={{ background: "#A2CE3A", color: "#121212", height: "48px" }}
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
