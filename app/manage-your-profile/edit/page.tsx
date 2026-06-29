"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Navbar1 } from "@/components/manage-your-profile/Navbar1";
import { GlassCard } from "@/components/manage-your-profile/GlassCard";
import { Select } from "@/components/ui/Select";
import { MultiSelect } from "@/components/ui/MultiSelect";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getApiUrl, getAuthHeaders } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

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

const BackArrowSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

/* ─── Reusable Select with Shadcn Dropdown ─── */
function FormSelect({ label, placeholder, value, onChange, options }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) {
  const displayValue = options.find(o => o.value === value)?.label || placeholder;
  
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white font-mona-sans text-sm font-semibold">{label}</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-[10px] border border-white/10 bg-[#FFFFFF0D] text-white/70 font-mona-sans text-sm outline-none cursor-pointer hover:border-[#A2CE3A] transition-colors">
            <span className={value ? "text-white" : "text-white/50"}>{displayValue}</span>
            <ChevronDownSmallSVG />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full bg-[#1A1C1F] border-white/10">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
              className="text-white/70 hover:text-[#A2CE3A] hover:bg-[#FFFFFF1A] cursor-pointer"
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/* ─── Chip-based MultiSelect (like complete-your-profile) ─── */
function FormChipSelect({ label, value, onChange, options }: {
  label: string; value: string[]; onChange: (v: string[]) => void; options: string[];
}) {
  const toggleChip = (item: string) => {
    if (value.includes(item)) {
      onChange(value.filter(v => v !== item));
    } else {
      onChange([...value, item]);
    }
  };
  
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white font-mona-sans text-sm font-semibold">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleChip(option)}
              className={`px-4 py-2 rounded-full text-sm font-mona-sans cursor-pointer transition-colors ${
                selected
                  ? "bg-[#A2CE3A]/20 text-[#A2CE3A] border border-[#A2CE3A]"
                  : "bg-white/10 text-white/60 border border-white/10"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function EditProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Basic Information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);

  // Set email from session
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  // Professional Background
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [fieldsCoached, setFieldsCoached] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [bgTimezone, setBgTimezone] = useState("");
  const [bgLanguages, setBgLanguages] = useState<string[]>([]);
  const [companies, setCompanies] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // Coaching Information
  const [bio, setBio] = useState("");
  const [interviewTypes, setInterviewTypes] = useState<string[]>([]);
  const [targetJobLevels, setTargetJobLevels] = useState<string[]>([]);

  // Constants for interview types and target levels
  const INTERVIEW_TYPES = ["Behavioral Interviews", "Technical Interviews", "System Design", "Product Interviews"];
  const TARGET_LEVELS = ["Entry Levels", "Mid Levels", "Senior Levels", "Executive Levels"];

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${getApiUrl()}/api/coach/profile/setup/review`, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const result = await response.json();
        const data = result.data;

        console.log("Profile data fetched:", data);

        // Populate form fields from flat structure
        // Basic Information
        setFullName(data.name || "");
        // Note: username is NOT email - need to fetch actual email from user session
        setPhone(data.phone_number || "");
        // Map country name to location value
        const countryValue = locationOptions.find(opt => opt.label.toLowerCase() === data.country?.toLowerCase())?.value || "";
        setLocation(countryValue);
        setLinkedin(data.linkedin_url || "");
        
        // Set profile photo if exists
        if (data.photo_url) {
          setPhotoPreview(data.photo_url);
        }
        
        // Professional Background
        setJobTitle(data.job_title || "");
        // Map industry from API to dropdown value
        const industryValue = industryOptions.find(opt => opt.label.toLowerCase() === data.industry?.toLowerCase())?.value || "";
        setIndustry(industryValue);
        setFieldsCoached(data.fields_coached || []);
        // Map experience from API to dropdown value
        const experienceValue = experienceOptions.find(opt => opt.label === data.years_of_experience)?.value || "";
        setExperience(experienceValue);
        setCompanies(data.companies_worked_at || "");
        // Capitalize languages from API ("english" -> "English")
        const capitalizedLanguages = (data.languages_spoken || []).map((lang: string) => 
          lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()
        );
        setBgLanguages(capitalizedLanguages);
        
        // Coaching Information
        setBio(data.bio || "");
        // Transform interview_types from API format to display format
        // "behavioral_interview" -> "Behavioral Interviews"
        const formattedInterviewTypes = (data.interview_types || []).map((type: string) => {
          const formatted = type.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
          // Add 's' to match display format
          return formatted.endsWith('Interview') ? formatted + 's' : formatted;
        });
        setInterviewTypes(formattedInterviewTypes);
        
        // Transform target_job_levels from API format to display format
        // "entry_level" -> "Entry Levels"
        const formattedTargetLevels = (data.target_job_levels || []).map((level: string) => {
          const formatted = level.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
          // Add 's' to match display format
          return formatted.endsWith('Level') ? formatted + 's' : formatted;
        });
        setTargetJobLevels(formattedTargetLevels);
      } catch (error: any) {
        toast({
          variant: "error",
          title: "Error",
          description: error.message || "Failed to load profile data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [toast]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast({
          variant: "error",
          title: "File too large",
          description: "Please upload an image smaller than 5MB.",
        });
        // Reset the input
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const headers = await getAuthHeaders();

      // Update coaching information
      const coachingResponse = await fetch(
        `${getApiUrl()}/api/coach/profile/setup/coaching`,
        {
          method: "PATCH",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bio,
            // Transform back to API format: "Behavioral Interviews" -> "behavioral_interview"
            interview_types: interviewTypes.map(t => 
              t.toLowerCase().replace(/ /g, "_").replace(/s$/, "")
            ),
            // Transform back to API format: "Entry Levels" -> "entry_level"
            target_job_levels: targetJobLevels.map(t => 
              t.toLowerCase().replace(/ /g, "_").replace(/s$/, "")
            ),
          }),
        }
      );

      if (!coachingResponse.ok) {
        throw new Error("Failed to update coaching information");
      }

      // Update background information
      const backgroundResponse = await fetch(
        `${getApiUrl()}/api/coach/profile/setup/background`,
        {
          method: "PATCH",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_title: jobTitle,
            industry,
            years_of_experience: experience,
            companies_worked_at: companies,
            fields_coached: fieldsCoached,
          }),
        }
      );

      if (!backgroundResponse.ok) {
        throw new Error("Failed to update background information");
      }

      toast({
        variant: "success",
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.message || "Failed to update profile",
      });
    } finally {
      setSaving(false);
    }
  };

  const locationOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "ng", label: "Nigeria" },
    { value: "de", label: "Germany" },
    { value: "au", label: "Australia" },
    { value: "in", label: "India" },
    { value: "fr", label: "France" },
  ];
  const timezoneOptions = [
    { value: "utc-12", label: "UTC-12:00" },
    { value: "pst", label: "UTC-08:00 (PST)" },
    { value: "est", label: "UTC-05:00 (EST)" },
    { value: "gmt", label: "UTC+00:00 (GMT)" },
    { value: "wat", label: "UTC+01:00 (WAT)" },
    { value: "ist", label: "UTC+05:30 (IST)" },
    { value: "sgt", label: "UTC+08:00 (SGT)" },
    { value: "jst", label: "UTC+09:00 (JST)" },
  ];
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "pt", label: "Portuguese" },
    { value: "zh", label: "Mandarin" },
    { value: "hi", label: "Hindi" },
    { value: "ar", label: "Arabic" },
  ];
  const industryOptions = [
    { value: "tech", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "consulting", label: "Consulting" },
    { value: "marketing", label: "Marketing" },
    { value: "engineering", label: "Engineering" },
    { value: "design", label: "Design" },
  ];
  const experienceOptions = [
    { value: "0-1", label: "0-1 years" },
    { value: "1-3", label: "1-3 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "5-10", label: "5-10 years" },
    { value: "10+", label: "10+ years" },
  ];

  return (
    <div className="min-h-screen bg-[#0B0D0F] relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/img2.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      <Navbar1 />

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 py-8 lg:py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push("/manage-your-profile")}
          className="flex items-center gap-2 text-white/70 hover:text-white font-mona-sans text-sm mb-6 transition-colors cursor-pointer"
        >
          <BackArrowSVG />
          <span>Back to Profile</span>
        </button>

        <h1 className="text-white font-mona-sans font-bold text-2xl lg:text-3xl mb-8">Edit Profile</h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A2CE3A]"></div>
          </div>
        ) : (
          <>

        {/* ─── Profile Photo ─── */}
        <GlassCard className="p-6 lg:p-8 mb-6">
          <h2 className="text-white font-mona-sans font-bold text-lg mb-4">Profile Photo</h2>
          <div className="flex items-center gap-5">
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`relative rounded-full bg-[#FFFFFF0D] border border-white/10 flex items-center justify-center cursor-pointer transition-all overflow-hidden group ${
                photoPreview ? "w-[120px] h-[120px]" : "w-[60px] h-[60px] hover:bg-[#FFFFFF1A]"
              }`}
            >
              {photoPreview ? (
                <>
                  <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <UploadSVG />
                  </div>
                </>
              ) : (
                <UploadSVG />
              )}
            </div>
            <div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-[8px] border border-white/20 text-white font-mona-sans text-sm font-semibold hover:bg-[#FFFFFF1A] transition-colors cursor-pointer"
              >
                {photoPreview ? "Change Photo" : "Upload Photo"}
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
            <div className="flex flex-col gap-1.5">
              <label className="text-white font-mona-sans text-sm font-semibold">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                disabled
                className="px-4 py-3 rounded-[10px] border border-white/10 bg-[#FFFFFF0D] text-white/50 font-mona-sans text-sm outline-none cursor-not-allowed"
              />
            </div>

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
          </div>
        </GlassCard>

        {/* ─── Professional Background ─── */}
        <GlassCard className="p-6 lg:p-8 mb-6">
          <h2 className="text-white font-mona-sans font-bold text-lg mb-5">Professional Background</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput label="Job Title" placeholder="e.g. Senior Product Manager" value={jobTitle} onChange={setJobTitle} />
            <FormSelect label="Industries You want to Prep Candidates For" placeholder="Select your Industry" value={industry} onChange={setIndustry} options={industryOptions} />
            <FormChipSelect label="Fields Coached" value={fieldsCoached} onChange={setFieldsCoached} options={["Software Engineering", "Product Management", "Data Science", "Design", "Marketing", "Sales", "Finance", "Consulting"]} />
            <FormSelect label="Years of Experience" placeholder="Select" value={experience} onChange={setExperience} options={experienceOptions} />
            <FormSelect label="Timezone" placeholder="Select your timezone" value={bgTimezone} onChange={setBgTimezone} options={timezoneOptions} />
            <FormChipSelect label="Languages Spoken" value={bgLanguages} onChange={setBgLanguages} options={["English", "Spanish", "French", "German", "Hindi", "Portuguese", "Mandarin", "Arabic"]} />
            <FormInput label="Companies Worked At" placeholder="e.g. Google, Meta" value={companies} onChange={setCompanies} />
            <FormInput label="LinkedIn Profile" placeholder="https://linkedin.com/in/yourprofile" value={linkedin} onChange={setLinkedin} />
          </div>
        </GlassCard>

        {/* ─── Coaching Information ─── */}
        <GlassCard className="p-6 lg:p-8 mb-6">
          <h2 className="text-white font-mona-sans font-bold text-lg mb-5">Coaching Information</h2>
          
          {/* Bio */}
          <div className="flex flex-col gap-1.5 mb-6">
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

          {/* Interview Types */}
          <div className="mb-6">
            <label className="block text-white font-mona-sans text-sm font-semibold mb-3">Interview Types</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INTERVIEW_TYPES.map((t) => {
                const selected = interviewTypes.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      if (selected) {
                        setInterviewTypes(interviewTypes.filter(item => item !== t));
                      } else {
                        setInterviewTypes([...interviewTypes, t]);
                      }
                    }}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-[8px] text-sm font-mona-sans cursor-pointer transition-colors border ${
                      selected
                        ? "bg-[#A2CE3A]/10 border-[#A2CE3A] text-white"
                        : "bg-white/5 border-white/10 text-white/70"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selected ? "border-[#A2CE3A] bg-[#A2CE3A]" : "border-white/30"
                    }`}>
                      {selected && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Job Levels */}
          <div className="mb-0">
            <label className="block text-white font-mona-sans text-sm font-semibold mb-3">Target Job Levels</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TARGET_LEVELS.map((t) => {
                const selected = targetJobLevels.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      if (selected) {
                        setTargetJobLevels(targetJobLevels.filter(item => item !== t));
                      } else {
                        setTargetJobLevels([...targetJobLevels, t]);
                      }
                    }}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-[8px] text-sm font-mona-sans cursor-pointer transition-colors border ${
                      selected
                        ? "bg-[#A2CE3A]/10 border-[#A2CE3A] text-white"
                        : "bg-white/5 border-white/10 text-white/70"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selected ? "border-[#A2CE3A] bg-[#A2CE3A]" : "border-white/30"
                    }`}>
                      {selected && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    {t}
                  </button>
                );
              })}
            </div>
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
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-10 py-3 bg-[#A2CE3A] rounded-[8px] text-[#121212] font-mona-sans text-sm font-bold hover:bg-[#92BE2A] transition-colors cursor-pointer disabled:opacity-50"
          >
            <SaveIconSVG />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
        </>
        )}
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
