"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Navbar1 } from "@/components/manage-your-profile/Navbar1";
import { GlassCard } from "@/components/manage-your-profile/GlassCard";

/* ─── SVG Icons ─── */

const UploadSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 8L12 3L7 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SaveIconSVG = () => (
  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.8135 17.5871H2.76369C2.03071 17.5871 1.32776 17.2959 0.809466 16.7777C0.291174 16.2594 0 15.5564 0 14.8234V2.76369C0 2.03071 0.291174 1.32776 0.809466 0.809466C1.32776 0.291173 2.03071 0 2.76369 0H10.301C10.5009 0.000175923 10.6924 0.0797023 10.8337 0.221095L15.3561 4.77365C15.4975 4.91486 15.577 5.10645 15.5772 5.30628V14.8234C15.5772 15.5564 15.286 16.2594 14.7677 16.7777C14.2494 17.2959 13.5464 17.5871 12.8135 17.5871ZM2.76369 1.50747C2.43052 1.50747 2.11099 1.63982 1.87541 1.87541C1.63982 2.11099 1.50747 2.43052 1.50747 2.76369V14.8234C1.50747 15.1566 1.63982 15.4761 1.87541 15.7117C2.11099 15.9473 2.43052 16.0797 2.76369 16.0797H12.8135C13.1466 16.0797 13.4662 15.9473 13.7018 15.7117C13.9373 15.4761 14.0697 15.1566 14.0697 14.8234V5.58768L9.98948 1.50747H2.76369Z" fill="#0F4F3A"/>
    <path d="M12.562 16.8336H11.0545V10.5524H4.52216V16.8336H3.01469V10.3012C3.01469 9.96803 3.14704 9.6485 3.38263 9.41292C3.61821 9.17733 3.93774 9.04498 4.27091 9.04498H11.3058C11.6389 9.04498 11.9585 9.17733 12.194 9.41292C12.4296 9.6485 12.562 9.96803 12.562 10.3012V16.8336ZM8.26067 5.52755H4.30106C4.13081 5.52624 3.96249 5.4914 3.8057 5.42503C3.64891 5.35866 3.50674 5.26206 3.38728 5.14074C3.26783 5.01943 3.17345 4.87577 3.10952 4.71797C3.04559 4.56017 3.01336 4.39133 3.01469 4.22108V0.753906H4.52216V4.02009H8.03958V0.753906H9.54705V4.22108C9.54837 4.39133 9.51615 4.56017 9.45222 4.71797C9.38829 4.87577 9.2939 5.01943 9.17445 5.14074C9.055 5.26206 8.91282 5.35866 8.75604 5.42503C8.59925 5.4914 8.43092 5.52624 8.26067 5.52755Z" fill="#0F4F3A"/>
  </svg>
);

const ChevronDownSmallSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Reusable Input ─── */
function FormInput({ label, placeholder, value, onChange, type = "text" }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white font-mona-sans text-sm font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-3 rounded-[10px] border border-white/10 bg-[#FFFFFF0D] text-white font-mona-sans text-sm outline-none placeholder:text-white/30 focus:border-[#A2CE3A] transition-colors"
      />
    </div>
  );
}

/* ─── Reusable Select ─── */
function FormSelect({ label, placeholder, value, onChange, options }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white font-mona-sans text-sm font-semibold">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-[10px] border border-white/10 bg-[#FFFFFF0D] text-white/50 font-mona-sans text-sm outline-none appearance-none cursor-pointer focus:border-[#A2CE3A] transition-colors"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronDownSmallSVG /></div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function EditProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Basic Information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [languages, setLanguages] = useState("");

  // Professional Background
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [fieldsCoached, setFieldsCoached] = useState("");
  const [experience, setExperience] = useState("");
  const [bgTimezone, setBgTimezone] = useState("");
  const [bgLanguages, setBgLanguages] = useState("");
  const [companies, setCompanies] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // Bio
  const [bio, setBio] = useState("");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const locationOptions = ["United States", "United Kingdom", "Canada", "Nigeria", "Germany", "Australia", "India", "France"];
  const timezoneOptions = ["UTC-12:00", "UTC-08:00 (PST)", "UTC-05:00 (EST)", "UTC+00:00 (GMT)", "UTC+01:00 (WAT)", "UTC+05:30 (IST)", "UTC+08:00 (SGT)", "UTC+09:00 (JST)"];
  const languageOptions = ["English", "Spanish", "French", "German", "Portuguese", "Mandarin", "Hindi", "Arabic"];
  const industryOptions = ["Technology", "Finance", "Healthcare", "Education", "Consulting", "Marketing", "Engineering", "Design"];
  const experienceOptions = ["0-1 years", "1-3 years", "3-5 years", "5-10 years", "10+ years"];

  return (
    <div className="min-h-screen bg-[#0B0D0F] relative overflow-hidden">
      {/* Background LooperGroup */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] opacity-20 pointer-events-none">
        <img src="/LooperGroup.svg" alt="" className="w-full h-full object-contain" />
      </div>

      <Navbar1 />

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 py-8 lg:py-12">
        <h1 className="text-white font-mona-sans font-bold text-2xl lg:text-3xl mb-8">Edit Profile</h1>

        {/* ─── Profile Photo ─── */}
        <GlassCard className="p-6 lg:p-8 mb-6">
          <h2 className="text-white font-mona-sans font-bold text-lg mb-4">Profile Photo</h2>
          <div className="flex items-center gap-5">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-[60px] h-[60px] rounded-full bg-[#FFFFFF0D] border border-white/10 flex items-center justify-center cursor-pointer hover:bg-[#FFFFFF1A] transition-colors overflow-hidden"
            >
              {photoPreview ? (
                <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UploadSVG />
              )}
            </div>
            <div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-[8px] border border-white/20 text-white font-mona-sans text-sm font-semibold hover:bg-[#FFFFFF1A] transition-colors cursor-pointer"
              >
                Upload Photo
              </button>
              <p className="text-white/40 font-mona-sans text-xs mt-1.5">JPG, PNG, or GIF. Max 5MB.</p>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </div>
        </GlassCard>

        {/* ─── Basic Information ─── */}
        <GlassCard className="p-6 lg:p-8 mb-6">
          <h2 className="text-white font-mona-sans font-bold text-lg mb-5">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput label="Full Name" placeholder="John Doe" value={fullName} onChange={setFullName} />
            <FormInput label="Email" placeholder="example@gmail.com" value={email} onChange={setEmail} type="email" />

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-white font-mona-sans text-sm font-semibold">Phone number</label>
              <PhoneInput
                international
                defaultCountry="NG"
                value={phone}
                onChange={setPhone}
                className="edit-phone-input px-4 py-3 rounded-[10px] border border-white/10 bg-[#FFFFFF0D] text-white font-mona-sans text-sm outline-none focus-within:border-[#A2CE3A] transition-colors"
              />
            </div>

            <FormSelect label="Location (Country)" placeholder="Select your location" value={location} onChange={setLocation} options={locationOptions} />
            <FormSelect label="Timezone" placeholder="Select your location" value={timezone} onChange={setTimezone} options={timezoneOptions} />
            <FormSelect label="Languages Spoken" placeholder="Select your location" value={languages} onChange={setLanguages} options={languageOptions} />
          </div>
        </GlassCard>

        {/* ─── Professional Background ─── */}
        <GlassCard className="p-6 lg:p-8 mb-6">
          <h2 className="text-white font-mona-sans font-bold text-lg mb-5">Professional Background</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput label="Job Title" placeholder="e.g. Senior Product Manager" value={jobTitle} onChange={setJobTitle} />
            <FormSelect label="Industries You want to Prep Candidates For" placeholder="Select your Industry" value={industry} onChange={setIndustry} options={industryOptions} />
            <FormSelect label="Fields Coached" placeholder="Select your Industry" value={fieldsCoached} onChange={setFieldsCoached} options={industryOptions} />
            <FormSelect label="Years of Experience" placeholder="Select" value={experience} onChange={setExperience} options={experienceOptions} />
            <FormSelect label="Timezone" placeholder="Select your location" value={bgTimezone} onChange={setBgTimezone} options={timezoneOptions} />
            <FormSelect label="Languages Spoken" placeholder="Select your location" value={bgLanguages} onChange={setBgLanguages} options={languageOptions} />
            <FormInput label="Companies Worked At" placeholder="e.g. Google, Meta" value={companies} onChange={setCompanies} />
            <FormInput label="LinkedIn Profile" placeholder="https://linkedin.com/in/yourprofile" value={linkedin} onChange={setLinkedin} />
          </div>
        </GlassCard>

        {/* ─── Bio ─── */}
        <GlassCard className="p-6 lg:p-8 mb-10">
          <h2 className="text-white font-mona-sans font-bold text-lg mb-4">Bio</h2>
          <div className="flex flex-col gap-1.5">
            <label className="text-white font-mona-sans text-sm font-semibold">About you</label>
            <textarea
              placeholder="Tell candidates a bit about yourself and your coaching style"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={5}
              className="px-4 py-3 rounded-[10px] border border-white/10 bg-[#FFFFFF0D] text-white font-mona-sans text-sm outline-none placeholder:text-white/30 focus:border-[#A2CE3A] transition-colors resize-none"
            />
            <p className="text-white/40 font-mona-sans text-xs">A compelling bio helps attract more clients.</p>
          </div>
        </GlassCard>

        {/* ─── Action Buttons ─── */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => router.push("/manage-your-profile")}
            className="px-10 py-3 rounded-[8px] font-mona-sans text-sm font-bold transition-colors cursor-pointer"
            style={{ backgroundColor: "#ECF8C7", color: "#054711" }}
          >
            Cancel
          </button>
          <button
            onClick={() => router.push("/manage-your-profile")}
            className="flex items-center gap-2 px-10 py-3 bg-[#A2CE3A] rounded-[8px] text-[#121212] font-mona-sans text-sm font-bold hover:bg-[#92BE2A] transition-colors cursor-pointer"
          >
            <SaveIconSVG />
            Save Changes
          </button>
        </div>
      </div>

      {/* ─── Phone Input Custom Styles ─── */}
      <style jsx global>{`
        .edit-phone-input .PhoneInputInput {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-family: 'Mona Sans', sans-serif;
          font-size: 0.875rem;
        }
        .edit-phone-input .PhoneInputCountry {
          margin-right: 8px;
        }
        .edit-phone-input .PhoneInputCountrySelectArrow {
          border-color: #999;
        }
      `}</style>
    </div>
  );
}
