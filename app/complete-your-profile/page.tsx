"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

/* ─── Back Arrow SVG ─── */
const BackArrowSVG = () => (
  <svg width="65" height="21" viewBox="0 0 65 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5871 10.05C17.5871 10.2166 17.521 10.3764 17.4032 10.4942C17.2854 10.612 17.1256 10.6781 16.959 10.6781H4.65667L9.23796 15.2586C9.29632 15.317 9.34261 15.3863 9.37419 15.4625C9.40578 15.5388 9.42203 15.6205 9.42203 15.703C9.42203 15.7856 9.40578 15.8673 9.37419 15.9435C9.34261 16.0198 9.29632 16.0891 9.23796 16.1474C9.1796 16.2058 9.11032 16.2521 9.03407 16.2836C8.95782 16.3152 8.8761 16.3315 8.79357 16.3315C8.71104 16.3315 8.62932 16.3152 8.55307 16.2836C8.47682 16.2521 8.40754 16.2058 8.34918 16.1474L2.69618 10.4944C2.63778 10.4361 2.59145 10.3668 2.55984 10.2905C2.52823 10.2143 2.51196 10.1326 2.51196 10.05C2.51196 9.96747 2.52823 9.88574 2.55984 9.80949C2.59145 9.73324 2.63778 9.66396 2.69618 9.60563L8.34918 3.95263C8.46704 3.83477 8.62689 3.76855 8.79357 3.76855C8.96025 3.76855 9.1201 3.83477 9.23796 3.95263C9.35582 4.07049 9.42203 4.23034 9.42203 4.39702C9.42203 4.56369 9.35582 4.72354 9.23796 4.8414L4.65667 9.42191H16.959C17.1256 9.42191 17.2854 9.48808 17.4032 9.60588C17.521 9.72367 17.5871 9.88343 17.5871 10.05Z" fill="white"/>
    <path d="M27.078 15.1141V13.7313H30.3583C30.9908 13.7313 31.4785 13.5544 31.8215 13.2006C32.1753 12.8362 32.3522 12.3538 32.3522 11.7535C32.3522 11.1424 32.1807 10.6654 31.8376 10.3224C31.4946 9.96863 31.0015 9.79176 30.3583 9.79176H27.078V8.76266H30.1332C30.8836 8.76266 31.5428 8.85378 32.111 9.03601C32.6898 9.21825 33.1401 9.52376 33.4617 9.95255C33.794 10.3706 33.9601 10.9441 33.9601 11.6731V11.8982C33.9601 12.5843 33.8208 13.1685 33.5421 13.6509C33.2633 14.1225 32.8399 14.487 32.2718 14.7443C31.7036 14.9908 30.9908 15.1141 30.1332 15.1141H27.078ZM25.8238 15.1141V3.24734H27.3996V15.1141H25.8238ZM27.078 9.50232V8.47323H29.9241C30.5888 8.47323 31.0765 8.29635 31.3874 7.9426C31.709 7.57813 31.8698 7.11718 31.8698 6.55975C31.8698 5.9916 31.709 5.53065 31.3874 5.1769C31.0765 4.81243 30.5888 4.63019 29.9241 4.63019H27.078V3.24734H29.6508C30.9372 3.24734 31.8966 3.52069 32.529 4.0674C33.1615 4.60339 33.4777 5.38057 33.4777 6.39895V6.62407C33.4777 7.34229 33.3169 7.9158 32.9954 8.34459C32.6738 8.76266 32.2235 9.06281 31.6447 9.24505C31.0765 9.41657 30.4119 9.50232 29.6508 9.50232H27.078ZM41.7216 15.0498V12.4771H41.4643V9.50232C41.4643 8.91274 41.3089 8.46787 40.998 8.16771C40.6978 7.86756 40.253 7.71748 39.6634 7.71748C39.3311 7.71748 38.988 7.72284 38.6343 7.73356C38.2805 7.74428 37.9429 7.755 37.6213 7.76572C37.2997 7.77644 37.021 7.79252 36.7851 7.81396V6.46327C37.021 6.44183 37.2675 6.42575 37.5248 6.41503C37.7928 6.39359 38.0661 6.38287 38.3449 6.38287C38.6236 6.37215 38.8916 6.36679 39.1488 6.36679C40.0279 6.36679 40.7461 6.47399 41.3035 6.68838C41.8609 6.89206 42.2736 7.22973 42.5416 7.7014C42.8096 8.17307 42.9436 8.8109 42.9436 9.61488V15.0498H41.7216ZM38.9076 15.2749C38.2645 15.2749 37.707 15.1677 37.2354 14.9533C36.7744 14.7282 36.4153 14.4066 36.158 13.9885C35.9115 13.5705 35.7882 13.0666 35.7882 12.4771C35.7882 11.866 35.9222 11.3568 36.1902 10.9495C36.4689 10.5421 36.8709 10.2366 37.3962 10.033C37.9214 9.81856 38.5539 9.71136 39.2936 9.71136H41.6251V10.8691H39.2292C38.6075 10.8691 38.1305 11.0192 37.7981 11.3193C37.4658 11.6195 37.2997 12.0054 37.2997 12.4771C37.2997 12.9487 37.4658 13.3293 37.7981 13.6187C38.1305 13.9081 38.6075 14.0529 39.2292 14.0529C39.5937 14.0529 39.9421 13.9885 40.2744 13.8599C40.6067 13.7206 40.8801 13.4954 41.0945 13.1846C41.3196 12.863 41.4429 12.4235 41.4643 11.866L41.8824 12.4771C41.8288 13.0881 41.6787 13.6026 41.4321 14.0207C41.1963 14.4281 40.864 14.7389 40.4352 14.9533C40.0171 15.1677 39.5079 15.2749 38.9076 15.2749ZM49.459 15.3392C48.7194 15.3392 48.0762 15.2106 47.5295 14.9533C46.9935 14.6961 46.5486 14.353 46.1949 13.9242C45.8411 13.4847 45.5731 13.0023 45.3909 12.4771C45.2194 11.9518 45.1336 11.4265 45.1336 10.9013V10.6118C45.1336 10.0651 45.2194 9.52912 45.3909 9.00385C45.5731 8.47859 45.8411 8.00692 46.1949 7.58885C46.5593 7.16005 47.0096 6.81702 47.5456 6.55975C48.0815 6.30247 48.7086 6.17384 49.4269 6.17384C50.1451 6.17384 50.7883 6.30783 51.3564 6.57583C51.9353 6.84382 52.3963 7.22437 52.7393 7.71748C53.093 8.19987 53.2914 8.77338 53.3342 9.43801H51.8549C51.7799 8.90202 51.5333 8.45715 51.1152 8.10339C50.6972 7.73892 50.1344 7.55669 49.4269 7.55669C48.8158 7.55669 48.3067 7.69604 47.8993 7.97476C47.492 8.25347 47.1864 8.63402 46.9828 9.11641C46.7791 9.5988 46.6773 10.1455 46.6773 10.7565C46.6773 11.3461 46.7791 11.8875 46.9828 12.3806C47.1864 12.863 47.492 13.2489 47.8993 13.5383C48.3174 13.817 48.8373 13.9564 49.459 13.9564C49.9414 13.9564 50.3595 13.8706 50.7132 13.6991C51.067 13.5276 51.3511 13.2971 51.5655 13.0077C51.7799 12.7183 51.9085 12.3913 51.9514 12.0268H53.4307C53.3985 12.7022 53.2002 13.2864 52.8358 13.7795C52.482 14.2726 52.0103 14.6585 51.4208 14.9372C50.8419 15.2052 50.188 15.3392 49.459 15.3392ZM61.4455 15.0498L58.2135 11.046H56.7985L60.738 6.46327H62.3621L58.7924 10.5957L58.905 9.77568L63.2304 15.0498H61.4455ZM55.5282 15.0498V3.31166H57.0719V15.0498H55.5282Z" fill="white"/>
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

/* ─── Data ─── */
const STEPS = ["Basic Info", "Background", "Coaching", "Review"];

const LANGUAGES = ["English", "Spanish", "French", "German", "Hindi", "Portuguese"];

const COUNTRIES = [
  { name: "Nigeria", code: "+234", flag: "🇳🇬" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Ghana", code: "+233", flag: "🇬🇭" },
  { name: "South Africa", code: "+27", flag: "🇿🇦" },
  { name: "Kenya", code: "+254", flag: "🇰🇪" },
];

const INDUSTRIES = ["Technology", "Finance", "Healthcare", "Education", "Consulting", "Marketing"];
const FIELDS_COACHED = ["Software Engineering", "Product Management", "Data Science", "Design", "Marketing", "Sales"];
const EXPERIENCE_YEARS = ["0-2 years", "3-5 years", "5-10 years", "10-15 years", "15+ years"];
const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"];
const INTERVIEW_TYPES = ["Behavioral Interviews", "Technical Interviews", "System Design", "Product Interviews"];
const TARGET_LEVELS = ["Entry Levels", "Mid Levels", "Senior Levels", "Executive Levels"];

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
export default function CompleteProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0D0F]" />}>
      <CompleteProfileContent />
    </Suspense>
  );
}

function CompleteProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState(0);

  /* Step 1: Basic Info */
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [gender, setGender] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Step 2: Background */
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [fieldsCoached, setFieldsCoached] = useState("");
  const [experience, setExperience] = useState("");
  const [companies, setCompanies] = useState("");
  const [linkedin, setLinkedin] = useState("");

  /* Step 3: Coaching */
  const [interviewTypes, setInterviewTypes] = useState<string[]>([]);
  const [targetLevels, setTargetLevels] = useState<string[]>([]);
  const [bio, setBio] = useState("");

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

  const goNext = () => setStep((s) => Math.min(s + 1, 3));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-[#0B0D0F] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] opacity-20 pointer-events-none">
        <img src="/LooperGroup.svg" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 lg:px-10 py-5">
        <button onClick={() => router.back()} className="cursor-pointer">
          <BackArrowSVG />
        </button>
        <button className="px-6 py-2.5 rounded-full text-sm font-mona-sans font-semibold cursor-pointer" style={{ backgroundColor: "#ECF8C7", color: "#054711" }}>
          Save &amp; Exit
        </button>
      </div>

            {/* Divider */}
      <div className="relative z-10 w-full h-px bg-[#D0D5DD]/80" />

      {/* Step Indicator */}
      <div className="relative z-10 flex items-center justify-center px-4 my-5">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mona-sans font-bold ${i <= step ? "bg-[#A2CE3A] text-[#0B0D0F]" : "bg-[#E8EFF1] text-[#A1A8B1]"}`}>
                {i + 1}
              </div>
              <span className={`text-xs font-mona-sans ${i <= step ? "text-[#A2CE3A]" : "text-white/40"}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-12 lg:w-20 h-px mx-2 mt-[-16px] bg-[#D0D5DD]/80`} />
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="relative z-10 w-full h-px bg-[#D0D5DD]/80" />

      {/* Form Card */}
      <div className="relative z-10 flex justify-center px-4 pb-10">
        <div className="lg:scale-[80%] w-full max-w-[700px] bg-[#141619] border border-white/10 rounded-[18px] p-6 lg:p-10">

          {/* ─── Step 1: Basic Info ─── */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-mona-sans font-bold text-white text-center">Complete Profile Setup</h2>

              {/* Upload Photo */}
              <div className="flex flex-col items-center mt-6 mb-6">
                <input type="file" ref={fileInputRef} accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Photo" className="w-full h-full object-cover" />
                  ) : (
                    <UploadSVG />
                  )}
                </button>
                <span className="text-white/50 text-sm font-mona-sans mt-2">Upload Photo</span>
              </div>

              {/* Username */}
              <div className="mb-4">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-2">Username</label>
                <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full h-11 px-4 bg-white border border-white/10 rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors" />
              </div>

              {/* Location */}
              <Dropdown label="Location (Country)" placeholder="Select your location" options={COUNTRIES.map((c) => c.name)} value={location} onChange={setLocation} />

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
              <Dropdown label="Gender" placeholder="Select your gender" options={GENDERS} value={gender} onChange={setGender} />

              {/* Languages Spoken */}
              <div className="mb-6">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-2">Languages Spoken</label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => {
                    const selected = selectedLanguages.includes(lang);
                    return (
                      <button key={lang} type="button" onClick={() => toggleChip(selectedLanguages, setSelectedLanguages, lang)} className={`px-4 py-2 rounded-full text-sm font-mona-sans cursor-pointer transition-colors ${selected ? "bg-[#A2CE3A]/20 text-[#A2CE3A] border border-[#A2CE3A]" : "bg-white/10 text-white/60 border border-white/10"}`}>
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Continue */}
              <button onClick={goNext} className="w-full py-3 bg-[#A2CE3A] rounded-[8px] text-[#121212] font-mona-sans text-base font-bold hover:bg-[#92BE2A] transition-colors cursor-pointer">
                Continue
              </button>
            </div>
          )}

          {/* ─── Step 2: Background ─── */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-mona-sans font-bold text-white italic">Background</h2>
              <p className="text-white/50 text-sm font-mona-sans mt-1 mb-6">Tell us about your experience</p>

              <div className="mb-4">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-2">Job Title</label>
                <input type="text" placeholder="e.g. Senior Product Manager" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="w-full h-11 px-4 bg-white border border-white/10 rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors" />
              </div>

              <Dropdown label="Industries You want to Prep Candidates For" placeholder="Select your Industry" options={INDUSTRIES} value={industry} onChange={setIndustry} />
              <Dropdown label="Fields Coached" placeholder="Select your Industry" options={FIELDS_COACHED} value={fieldsCoached} onChange={setFieldsCoached} />
              <Dropdown label="Years of Experience" placeholder="Select" options={EXPERIENCE_YEARS} value={experience} onChange={setExperience} />

              <div className="mb-4">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-2">Companies Worked At</label>
                <input type="text" placeholder="e.g. Google, Meta" value={companies} onChange={(e) => setCompanies(e.target.value)} className="w-full h-11 px-4 bg-white border border-white/10 rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors" />
              </div>

              <div className="mb-6">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-2">LinkedIn Profile</label>
                <input type="url" placeholder="https://linkedin.com/in/yourprofile" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full h-11 px-4 bg-white border border-white/10 rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors" />
              </div>

              <div className="flex gap-3">
                <button onClick={goBack} className="flex-1 py-3 bg-[#A2CE3A]/20 rounded-[8px] text-[#121212] font-mona-sans text-base font-bold hover:bg-[#A2CE3A]/30 transition-colors cursor-pointer" style={{ backgroundColor: "#ECF8C7", color: "#054711" }}>
                  Back
                </button>
                <button onClick={goNext} className="flex-[1.4] py-3 bg-[#A2CE3A] rounded-[8px] text-[#121212] font-mona-sans text-base font-bold hover:bg-[#92BE2A] transition-colors cursor-pointer">
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* ─── Step 3: Coaching ─── */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-mona-sans font-bold text-white italic">Coaching</h2>
              <p className="text-white/50 text-sm font-mona-sans mt-1 mb-6">What type of interviews will you coach?</p>

              {/* Interview Types */}
              <div className="mb-6">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-3">Interview Types</label>
                <div className="grid grid-cols-2 gap-3">
                  {INTERVIEW_TYPES.map((t) => {
                    const selected = interviewTypes.includes(t);
                    return (
                      <button key={t} type="button" onClick={() => toggleChip(interviewTypes, setInterviewTypes, t)} className={`flex items-center gap-2.5 px-4 py-3 rounded-[8px] text-sm font-mona-sans cursor-pointer transition-colors border ${selected ? "bg-[#A2CE3A]/10 border-[#A2CE3A] text-white" : "bg-white/5 border-white/10 text-white/70"}`}>
                        <CheckCircleSVG filled={selected} />
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Target Job Levels */}
              <div className="mb-6">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-3">Target Job Levels</label>
                <div className="grid grid-cols-2 gap-3">
                  {TARGET_LEVELS.map((t) => {
                    const selected = targetLevels.includes(t);
                    return (
                      <button key={t} type="button" onClick={() => toggleChip(targetLevels, setTargetLevels, t)} className={`flex items-center gap-2.5 px-4 py-3 rounded-[8px] text-sm font-mona-sans cursor-pointer transition-colors border ${selected ? "bg-[#A2CE3A]/10 border-[#A2CE3A] text-white" : "bg-white/5 border-white/10 text-white/70"}`}>
                        <CheckCircleSVG filled={selected} />
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brief Bio */}
              <div className="mb-6">
                <label className="block text-white font-mona-sans text-sm font-semibold mb-2">Brief Bio</label>
                <textarea placeholder="Tell candidates a bit about yourself and your coaching style" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="w-full px-4 py-3 bg-white border border-white/10 rounded-[8px] text-[#121212] placeholder-[#ACACAC] font-sora text-sm outline-none focus:border-[#A2CE3A] transition-colors resize-none" />
              </div>

              <div className="flex gap-3">
                <button onClick={goBack} className="flex-1 py-3 rounded-[8px] font-mona-sans text-base font-bold transition-colors cursor-pointer" style={{ backgroundColor: "#ECF8C7", color: "#054711" }}>
                  Back
                </button>
                <button onClick={goNext} className="flex-[1.4] py-3 bg-[#A2CE3A] rounded-[8px] text-[#121212] font-mona-sans text-base font-bold hover:bg-[#92BE2A] transition-colors cursor-pointer">
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* ─── Step 4: Review ─── */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-mona-sans font-bold text-white text-center">Review Your Profile</h2>
              <p className="text-[#A2CE3A] text-sm font-mona-sans text-center mt-1 mb-6">Make sure everything looks good</p>

              {/* Profile Card */}
              <div className="border border-white/10 rounded-[12px] p-5 mb-6">
                {/* Name & Title */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden flex-shrink-0">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-white/20" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-mona-sans font-bold text-sm">{username || "Richard Samson"}</p>
                    <p className="text-white/50 font-mona-sans text-xs">{jobTitle || "Senior Product Designer"}</p>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-5">
                  <div>
                    <p className="text-white/50 text-xs font-mona-sans">Location</p>
                    <p className="text-white text-sm font-mona-sans font-semibold">{location || "Lagos, Nigeria"}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-mona-sans">Experience</p>
                    <p className="text-white text-sm font-mona-sans font-semibold">{experience || "10-15years"}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-mona-sans">Industry</p>
                    <p className="text-white text-sm font-mona-sans font-semibold">{industry || "Technology"}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-mona-sans">Languages</p>
                    <p className="text-white text-sm font-mona-sans font-semibold">{selectedLanguages.length > 0 ? selectedLanguages.join(", ") : "English, Spanish, French"}</p>
                  </div>
                </div>

                {/* Interview Types */}
                <div className="mb-4">
                  <p className="text-white/50 text-xs font-mona-sans mb-2">Interview Types</p>
                  <div className="flex flex-wrap gap-2">
                    {(interviewTypes.length > 0 ? interviewTypes : ["Technical Interviews", "Behavioral Interviews"]).map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs font-mona-sans text-[#7FA429] bg-[#E0EFBD]">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Target Levels */}
                <div>
                  <p className="text-white/50 text-xs font-mona-sans mb-2">Target levels</p>
                  <div className="flex flex-wrap gap-2">
                    {(targetLevels.length > 0 ? targetLevels : ["Mid Level", "Senior Level"]).map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs font-mona-sans text-[#7FA429] bg-[#E0EFBD]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-white/50 text-sm font-mona-sans mb-6">
                By submitting, you agree to our quality standards and coaching guidelines.
              </p>

              <div className="flex gap-3">
                <button onClick={goBack} className="flex-1 py-3 rounded-[8px] font-mona-sans text-base font-bold transition-colors cursor-pointer" style={{ backgroundColor: "#ECF8C7", color: "#054711" }}>
                  Back
                </button>
                <button className="flex-[1.4] py-3 bg-[#A2CE3A] rounded-[8px] text-[#121212] font-mona-sans text-base font-bold hover:bg-[#92BE2A] transition-colors cursor-pointer">
                  Submit Application
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
