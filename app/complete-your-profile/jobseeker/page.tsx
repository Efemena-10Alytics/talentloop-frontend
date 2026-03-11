"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

/* ─── SVG Icons ─── */

const BackArrowSVG = () => (
  <svg width="65" height="21" viewBox="0 0 65 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5871 10.05C17.5871 10.2166 17.521 10.3764 17.4032 10.4942C17.2854 10.612 17.1256 10.6781 16.959 10.6781H4.65667L9.23796 15.2586C9.29632 15.317 9.34261 15.3863 9.37419 15.4625C9.40578 15.5388 9.42203 15.6205 9.42203 15.703C9.42203 15.7856 9.40578 15.8673 9.37419 15.9435C9.34261 16.0198 9.29632 16.0891 9.23796 16.1474C9.1796 16.2058 9.11032 16.2521 9.03407 16.2836C8.95782 16.3152 8.8761 16.3315 8.79357 16.3315C8.71104 16.3315 8.62932 16.3152 8.55307 16.2836C8.47682 16.2521 8.40754 16.2058 8.34918 16.1474L2.69618 10.4944C2.63778 10.4361 2.59145 10.3668 2.55984 10.2905C2.52823 10.2143 2.51196 10.1126 2.51196 10.05C2.51196 9.96747 2.52823 9.88574 2.55984 9.80949C2.59145 9.73324 2.63778 9.66396 2.69618 9.60563L8.34918 3.95263C8.46704 3.83477 8.62689 3.76855 8.79357 3.76855C8.96025 3.76855 9.1201 3.83477 9.23796 3.95263C9.35582 4.07049 9.42203 4.23034 9.42203 4.39702C9.42203 4.56369 9.35582 4.72354 9.23796 4.8414L4.65667 9.42191H16.959C17.1256 9.42191 17.2854 9.48808 17.4032 9.60588C17.521 9.72367 17.5871 9.88343 17.5871 10.05Z" fill="white"/>
    <path d="M27.078 15.1141V13.7313H30.3583C30.9908 13.7313 31.4785 13.5544 31.8215 13.2006C32.1753 12.8362 32.3522 12.3538 32.3522 11.7535C32.3522 11.1424 32.1807 10.6654 31.8376 10.3224C31.4946 9.96863 31.0015 9.79176 30.3583 9.79176H27.078V8.76266H30.1332C30.8836 8.76266 31.5428 8.85378 32.111 9.03601C32.6898 9.21825 33.1401 9.52376 33.4617 9.95255C33.794 10.3706 33.9601 10.9441 33.9601 11.6731V11.8982C33.9601 12.5843 33.8208 13.1685 33.5421 13.6509C33.2633 14.1225 32.8399 14.487 32.2718 14.7443C31.7036 14.9908 30.9908 15.1141 30.1332 15.1141H27.078ZM25.8238 15.1141V3.24734H27.3996V15.1141H25.8238ZM27.078 9.50232V8.47323H29.9241C30.5888 8.47323 31.0765 8.29635 31.3874 7.9426C31.709 7.57813 31.8698 7.11718 31.8698 6.55975C31.8698 5.9916 31.709 5.53065 31.3874 5.1769C31.0765 4.81243 30.5888 4.63019 29.9241 4.63019H27.078V3.24734H29.6508C30.9372 3.24734 31.8966 3.52069 32.529 4.0674C33.1615 4.60339 33.4777 5.38057 33.4777 6.39895V6.62407C33.4777 7.34229 33.3169 7.9158 32.9954 8.34459C32.6738 8.76266 32.2235 9.06281 31.6447 9.24505C31.0765 9.41657 30.4119 9.50232 29.6508 9.50232H27.078ZM41.7216 15.0498V12.4771H41.4643V9.50232C41.4643 8.91274 41.3089 8.46787 40.998 8.16771C40.6978 7.86756 40.253 7.71748 39.6634 7.71748C39.3311 7.71748 38.988 7.72284 38.6343 7.73356C38.2805 7.74428 37.9429 7.755 37.6213 7.76572C37.2997 7.77644 37.021 7.79252 36.7851 7.81396V6.46327C37.021 6.44183 37.2675 6.42575 37.5248 6.41503C37.7928 6.39359 38.0661 6.38287 38.3449 6.38287C38.6236 6.37215 38.8916 6.36679 39.1488 6.36679C40.0279 6.36679 40.7461 6.47399 41.3035 6.68838C41.8609 6.89206 42.2736 7.22973 42.5416 7.7014C42.8096 8.17307 42.9436 8.8109 42.9436 9.61488V15.0498H41.7216ZM38.9076 15.2749C38.2645 15.2749 37.707 15.1677 37.2354 14.9533C36.7744 14.7282 36.4153 14.4066 36.158 13.9885C35.9115 13.5705 35.7882 13.0666 35.7882 12.4771C35.7882 11.866 35.9222 11.3568 36.1902 10.9495C36.4689 10.5421 36.8709 10.2366 37.3962 10.033C37.9214 9.81856 38.5539 9.71136 39.2936 9.71136H41.6251V10.8406H39.2936C38.6719 10.8406 38.2001 10.9656 37.8785 11.2157C37.5677 11.4551 37.4123 11.8142 37.4123 12.2929C37.4123 12.7967 37.5784 13.1935 37.9107 13.4831C38.2537 13.7727 38.7253 13.9175 39.3257 13.9175C39.7652 13.9175 40.1619 13.8318 40.516 13.6616C40.8808 13.4831 41.1703 13.2223 41.3846 12.8791C41.5989 12.5359 41.706 12.1104 41.706 11.6027V10.8406H42.9436V11.6027C42.9436 12.3209 42.7936 12.9427 42.4935 13.4671C42.1934 13.9914 41.7647 14.3936 41.2073 14.6736C40.6499 14.9533 39.9961 15.0927 39.2454 15.0927L38.9076 15.2749ZM38.9076 15.2749V14.0373C39.5507 14.0373 40.0815 13.8854 40.5 13.5812C40.9185 13.2771 41.128 12.8469 41.128 12.2929C41.128 11.7389 40.9185 11.3087 40.5 11.0046C40.0815 10.7004 39.5507 10.5485 38.9076 10.5485H37.4123V9.31884H38.9076C39.8403 9.31884 40.5852 9.54396 41.1426 9.99419C41.7 10.4337 41.9787 11.0716 41.9787 11.9078V12.6778C41.9787 13.5033 41.7 14.1412 41.1426 14.5914C40.5852 15.0416 39.8403 15.2667 38.9076 15.2667V15.2749ZM50.0326 15.2749C49.2175 15.2749 48.4941 15.0927 47.8617 14.7282C47.2292 14.3531 46.7308 13.8318 46.3664 13.1643C46.002 12.4968 45.8198 11.7175 45.8198 10.8263V10.2723C45.8198 9.38109 46.002 8.60178 46.3664 7.93428C46.7308 7.26678 47.2292 6.75084 47.8617 6.38637C48.4941 6.0219 49.2175 5.83966 50.0326 5.83966C50.8477 5.83966 51.5711 6.0219 52.2035 6.38637C52.836 6.75084 53.3344 7.26678 53.6988 7.93428C54.0632 8.60178 54.2454 9.38109 54.2454 10.2723V10.8263C54.2454 11.7175 54.0632 12.4968 53.6988 13.1643C53.3344 13.8318 52.836 14.3531 52.2035 14.7282C51.5711 15.0927 50.8477 15.2749 50.0326 15.2749ZM50.0326 13.9175C50.5901 13.9175 51.0778 13.7834 51.4958 13.5151C51.9139 13.2467 52.2408 12.8684 52.4766 12.3799C52.7124 11.8914 52.8303 11.3197 52.8303 10.6654V10.4337C52.8303 9.77942 52.7124 9.20825 52.4766 8.72014C52.2408 8.23204 51.9139 7.85364 51.4958 7.58494C51.0778 7.31624 50.5901 7.18189 50.0326 7.18189C49.4751 7.18189 48.9874 7.31624 48.5694 7.58494C48.1513 7.85364 47.8244 8.23204 47.5886 8.72014C47.3528 9.20825 47.2349 9.77942 47.2349 10.4337V10.6654C47.2349 11.3197 47.3528 11.8914 47.5886 12.3799C47.8244 12.8684 48.1513 13.2467 48.5694 13.5151C48.9874 13.7834 49.4751 13.9175 50.0326 13.9175Z" fill="white"/>
  </svg>
);

const UploadSVG = () => (
  <svg width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00498" y="1.00498" width="98.4879" height="98.4879" rx="49.2439" fill="#F3F5F7"/>
    <rect x="1.00498" y="1.00498" width="98.4879" height="98.4879" rx="49.2439" stroke="#D0D5DD" strokeWidth="2.00996" strokeDasharray="8.04 8.04"/>
    <path d="M50.2489 38.1895V54.2691M50.2489 38.1895L56.9488 44.8893M50.2489 38.1895L43.5491 44.8893M62.3087 54.2691V59.629C62.3087 60.3398 62.0263 61.0214 61.5238 61.524C61.0212 62.0266 60.3395 62.3089 59.6287 62.3089H40.8692C40.1584 62.3089 39.4767 62.0266 38.9741 61.524C38.4716 61.0214 38.1892 60.3398 38.1892 59.629V54.2691" stroke="#67777E" strokeWidth="2.00996" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckCircleSVG = ({ filled }: { filled: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    {filled ? (
      <>
        <circle cx="10" cy="10" r="10" fill="#A2CE3A"/>
        <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ) : (
      <circle cx="10" cy="10" r="9" stroke="#555" strokeWidth="2"/>
    )}
  </svg>
);

const UploadIconSVG = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 13.3333V26.6666M20 13.3333L26.6667 19.9999M20 13.3333L13.3333 19.9999M33.3333 26.6666V33.3333C33.3333 34.2173 32.9821 35.0652 32.357 35.6903C31.7319 36.3154 30.8841 36.6666 30 36.6666H10C9.11594 36.6666 8.2681 36.3154 7.64298 35.6903C7.01786 35.0652 6.66667 34.2173 6.66667 33.3333V26.6666" stroke="#67777E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckGreenSVG = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="30" fill="#A2CE3A" fillOpacity="0.2"/>
    <circle cx="30" cy="30" r="20" fill="#A2CE3A"/>
    <path d="M22 30L27 35L38 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditIconSVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.1667 2.49993C14.3856 2.28106 14.6454 2.10744 14.9314 1.98899C15.2173 1.87054 15.5238 1.80957 15.8334 1.80957C16.1429 1.80957 16.4494 1.87054 16.7353 1.98899C17.0213 2.10744 17.2811 2.28106 17.5 2.49993C17.7189 2.7188 17.8925 2.97863 18.011 3.2646C18.1294 3.55057 18.1904 3.85706 18.1904 4.16659C18.1904 4.47612 18.1294 4.78262 18.011 5.06859C17.8925 5.35455 17.7189 5.61439 17.5 5.83326L6.25002 17.0833L1.66669 18.3333L2.91669 13.7499L14.1667 2.49993Z" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Data ─── */

const STEPS = ["Profile", "Basic Info", "CV Upload", "Review"];

const LANGUAGES = ["English", "Spanish", "French", "German", "Hindi", "Portuguese"];

const COUNTRIES = [
  { name: "Nigeria", code: "+234", flag: "🇳🇬" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
];

const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"];

const EXPERIENCE_LEVELS = ["Entry Level", "Mid Level", "Senior Level", "Lead/Principal", "Executive"];

const INDUSTRIES = ["Technology", "Finance", "Healthcare", "Education", "Consulting", "Marketing", "Sales", "Design"];

/* ─── Dropdown Component ─── */

function Dropdown({ label, placeholder, options, value, onChange }: {
  label: string; placeholder: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4 relative">
      <label className="block text-white font-mona-sans text-sm font-semibold mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-11 px-4 bg-white border border-white/10 rounded-[8px] text-left text-sm font-sora flex items-center justify-between cursor-pointer"
      >
        <span className={value ? "text-[#121212]" : "text-[#ACACAC]"}>{value || placeholder}</span>
        <ChevronDownSVG />
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-[8px] border border-gray-200 shadow-lg max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full px-4 py-2.5 text-left text-sm font-sora hover:bg-gray-100 cursor-pointer ${value === opt ? "text-[#A2CE3A] font-semibold" : "text-[#121212]"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─── */

export default function JobseekerCompleteProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Step 0: Profile
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [gender, setGender] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 1: Basic Info
  const [targetRole, setTargetRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [industry, setIndustry] = useState("");

  // Step 2: CV Upload
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUploaded, setCvUploaded] = useState(false);
  const cvInputRef = useRef<HTMLInputElement>(null);

  // Step 3: Review (extracted data)
  const [extractedData, setExtractedData] = useState({
    fullName: "Richard Samson",
    currentRole: "Product Manager",
    experience: "5+ Experience",
    education: "BSc Computer Science — University of London",
    topSkills: ["Product Strategy", "Agile", "Stakeholder Management"],
    languages: ["English", "French", "Spanish"]
  });

  const toggleChip = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      setCvUploaded(true);
    }
  };

  const handleCvDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setCvFile(file);
      setCvUploaded(true);
    }
  };

  const goNext = () => {
    if (step === 2 && cvUploaded) {
      // Simulate CV analysis
      setStep(3);
    } else {
      setStep((s) => Math.min(s + 1, 3));
    }
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleFindCoaches = () => {
    router.push("/dashboard?us=jobseeker");
  };

  return (
    <div className="min-h-screen bg-[#0B0D0F] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "url('/img3.png')", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
        <Link href="/" className="cursor-pointer">
          <BackArrowSVG />
        </Link>
        <button className="px-6 py-2.5 bg-[#E8F5D0] hover:bg-[#d9ebc1] text-black font-mona-sans font-semibold text-sm rounded-[10px] transition-colors">
          Save & Exit
        </button>
      </div>

      {/* Progress Stepper */}
      <div className="relative z-10 flex items-center justify-center gap-4 px-6 mb-10">
        {STEPS.map((label, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <CheckCircleSVG filled={step >= idx} />
              <span className={`text-xs font-mona-sans ${step >= idx ? "text-[#A2CE3A]" : "text-white/50"}`}>{label}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`w-16 h-0.5 ${step > idx ? "bg-[#A2CE3A]" : "bg-white/20"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="relative z-10 w-full h-px bg-[#D0D5DD]/80" />

      {/* Form Card */}
      <div className="relative z-10 flex justify-center px-4 pb-10 pt-8">
        <div className="w-full max-w-[700px] bg-[#141619] border border-white/10 rounded-[18px] p-6 lg:p-10">
          
          {/* Step 0: Profile */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-mona-sans font-bold text-white text-center mb-6">Complete Profile Setup</h2>

              {/* Upload Photo */}
              <div className="flex flex-col items-center mt-6 mb-6">
                <input type="file" ref={fileInputRef} accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Photo" className="w-40 h-40 object-cover rounded-full" />
                  ) : (
                    <UploadSVG />
                  )}
                </button>
                <span className="text-white/50 text-sm font-mona-sans mt-2">Upload Photo</span>
              </div>

              {/* Username */}
              <div className="mb-4">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-2">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-11 px-4 bg-white border border-white/10 rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors"
                />
              </div>

              {/* Location */}
              <Dropdown
                label="Location (Country)"
                placeholder="Select your location"
                options={COUNTRIES.map((c) => c.name)}
                value={location}
                onChange={setLocation}
              />

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-2">Phone number</label>
                <PhoneInput
                  international
                  defaultCountry="NG"
                  value={phone}
                  onChange={setPhone}
                  placeholder="Your phone number"
                  className="phone-input-custom w-full h-11 px-4 bg-white border border-white/10 rounded-[8px] text-[#121212] font-sora text-sm outline-none focus-within:border-[#A2CE3A] transition-colors"
                />
              </div>

              {/* Gender */}
              <Dropdown
                label="Gender"
                placeholder="Select your gender"
                options={GENDERS}
                value={gender}
                onChange={setGender}
              />

              {/* Languages Spoken */}
              <div className="mb-6">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-2">Languages Spoken</label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => {
                    const selected = selectedLanguages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleChip(selectedLanguages, setSelectedLanguages, lang)}
                        className={`px-4 py-2 rounded-full text-sm font-mona-sans cursor-pointer transition-colors ${
                          selected
                            ? "bg-[#A2CE3A]/20 text-[#A2CE3A] border border-[#A2CE3A]"
                            : "bg-white/10 text-white/60 border border-white/10"
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={goNext}
                className="w-full py-3 bg-[#A2CE3A] hover:bg-[#8fb832] text-black font-mona-sans font-semibold text-base rounded-[10px] transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-mona-sans font-bold text-white text-center mb-2">Build your profile</h2>
              <p className="text-white/50 font-mona-sans text-sm text-center mb-6">This helps us match you with the right coaches</p>

              {/* Target Role */}
              <div className="mb-4">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-2">Target Role</label>
                <input
                  type="text"
                  placeholder="e.g, Senior Product Manager"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full h-11 px-4 bg-white border border-white/10 rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors"
                />
              </div>

              {/* Experience Level */}
              <Dropdown
                label="Experience Level"
                placeholder="Select your level"
                options={EXPERIENCE_LEVELS}
                value={experienceLevel}
                onChange={setExperienceLevel}
              />

              {/* Industry */}
              <Dropdown
                label="Industry (optional)"
                placeholder="Select your Industry"
                options={INDUSTRIES}
                value={industry}
                onChange={setIndustry}
              />

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={goBack}
                  className="flex-1 py-3 bg-[#E8F5D0] hover:bg-[#d9ebc1] text-black font-mona-sans font-semibold text-base rounded-[10px] transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={goNext}
                  className="flex-1 py-3 bg-[#A2CE3A] hover:bg-[#8fb832] text-black font-mona-sans font-semibold text-base rounded-[10px] transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: CV Upload */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-mona-sans font-bold text-white mb-2">Upload your CV</h2>
              <p className="text-white/50 font-mona-sans text-sm mb-6">We'll analyze it to find the best coach matches</p>

              <input
                type="file"
                ref={cvInputRef}
                accept=".pdf,.doc,.docx"
                onChange={handleCvUpload}
                className="hidden"
              />

              <div
                onClick={() => !cvUploaded && cvInputRef.current?.click()}
                onDrop={handleCvDrop}
                onDragOver={(e) => e.preventDefault()}
                className={`border-2 border-dashed rounded-[12px] p-12 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  cvUploaded
                    ? "border-[#A2CE3A] bg-[#A2CE3A]/5"
                    : "border-white/20 bg-white/5 hover:border-[#A2CE3A]/50"
                }`}
              >
                {cvUploaded ? (
                  <>
                    <CheckGreenSVG />
                    <p className="text-white font-mona-sans font-semibold text-base mt-4">{cvFile?.name || "My Recent Portfolio - Updated"}</p>
                    <p className="text-white/50 font-mona-sans text-sm mt-1">
                      {cvFile ? `${(cvFile.size / 1024).toFixed(2)} KB` : "104 KB"} • Click to change
                    </p>
                  </>
                ) : (
                  <>
                    <UploadIconSVG />
                    <p className="text-white/70 font-mona-sans text-sm mt-4">Drop your CV here or click to Browse</p>
                    <p className="text-white/40 font-mona-sans text-xs mt-1">PDF or DOC, up to 10MB</p>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={goBack}
                  className="flex-1 py-3 bg-[#E8F5D0] hover:bg-[#d9ebc1] text-black font-mona-sans font-semibold text-base rounded-[10px] transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={goNext}
                  disabled={!cvUploaded}
                  className={`flex-1 py-3 font-mona-sans font-semibold text-base rounded-[10px] transition-colors ${
                    cvUploaded
                      ? "bg-[#A2CE3A] hover:bg-[#8fb832] text-black"
                      : "bg-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  Upload and Analyze
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="px-4 py-1.5 bg-[#A2CE3A]/20 border border-[#A2CE3A] rounded-full flex items-center gap-2">
                  <CheckCircleSVG filled={true} />
                  <span className="text-[#A2CE3A] font-mona-sans text-sm font-semibold">Analysis Complete</span>
                </div>
              </div>

              <h2 className="text-2xl font-mona-sans font-bold text-white text-center mb-2">Here's what we found</h2>
              <p className="text-white/50 font-mona-sans text-sm text-center mb-8">Review and edit any information below</p>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="bg-[#0B0D0F] border border-white/10 rounded-[12px] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/50 font-mona-sans text-xs mb-1">Full Name</p>
                      <p className="text-white font-mona-sans font-semibold text-base">{extractedData.fullName}</p>
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-[8px] transition-colors">
                      <EditIconSVG />
                    </button>
                  </div>
                </div>

                {/* Current Role */}
                <div className="bg-[#0B0D0F] border border-white/10 rounded-[12px] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/50 font-mona-sans text-xs mb-1">Current Role</p>
                      <p className="text-white font-mona-sans font-semibold text-base">{extractedData.currentRole}</p>
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-[8px] transition-colors">
                      <EditIconSVG />
                    </button>
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-[#0B0D0F] border border-white/10 rounded-[12px] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/50 font-mona-sans text-xs mb-1">Experience</p>
                      <p className="text-white font-mona-sans font-semibold text-base">{extractedData.experience}</p>
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-[8px] transition-colors">
                      <EditIconSVG />
                    </button>
                  </div>
                </div>

                {/* Education */}
                <div className="bg-[#0B0D0F] border border-white/10 rounded-[12px] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/50 font-mona-sans text-xs mb-1">Education</p>
                      <p className="text-white font-mona-sans font-semibold text-base">{extractedData.education}</p>
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-[8px] transition-colors">
                      <EditIconSVG />
                    </button>
                  </div>
                </div>

                {/* Top Skills */}
                <div className="bg-[#0B0D0F] border border-white/10 rounded-[12px] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white/50 font-mona-sans text-xs">Top Skills</p>
                    <button className="p-2 hover:bg-white/5 rounded-[8px] transition-colors">
                      <EditIconSVG />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.topSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-[#A2CE3A]/20 text-[#A2CE3A] border border-[#A2CE3A] rounded-full text-sm font-mona-sans"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="bg-[#0B0D0F] border border-white/10 rounded-[12px] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white/50 font-mona-sans text-xs">Languages</p>
                    <button className="p-2 hover:bg-white/5 rounded-[8px] transition-colors">
                      <EditIconSVG />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1.5 bg-[#A2CE3A]/20 text-[#A2CE3A] border border-[#A2CE3A] rounded-full text-sm font-mona-sans"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={goBack}
                  className="flex-1 py-3 bg-[#E8F5D0] hover:bg-[#d9ebc1] text-black font-mona-sans font-semibold text-base rounded-[10px] transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleFindCoaches}
                  className="flex-1 py-3 bg-[#A2CE3A] hover:bg-[#8fb832] text-black font-mona-sans font-semibold text-base rounded-[10px] transition-colors"
                >
                  Find My Coaches
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
