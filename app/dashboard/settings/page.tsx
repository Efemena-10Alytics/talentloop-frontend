"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { SettingsLayout, SettingsCard, TabNav, FormInput, FormTextarea, ActionButtons } from "@/components/settings/SettingsLayout";
import { ToggleItem } from "@/components/settings/Toggle";
import { Select } from "@/components/ui/Select";
import { MultiSelect } from "@/components/ui/MultiSelect";
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

const ClockSVG = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M20 11V20L25 25" stroke="#A2CE3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="20" r="9" stroke="#A2CE3A" strokeWidth="2"/>
  </svg>
);

const TrashSVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 5H4.16667H17.5" stroke="#FF4444" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.8333 4.99984V16.6665C15.8333 17.1085 15.6577 17.5325 15.3452 17.845C15.0326 18.1576 14.6087 18.3332 14.1667 18.3332H5.83333C5.39131 18.3332 4.96738 18.1576 4.65482 17.845C4.34226 17.5325 4.16667 17.1085 4.16667 16.6665V4.99984M6.66667 4.99984V3.33317C6.66667 2.89114 6.84226 2.46722 7.15482 2.15466C7.46738 1.8421 7.89131 1.6665 8.33333 1.6665H11.6667C12.1087 1.6665 12.5326 1.8421 12.8452 2.15466C13.1577 2.46722 13.3333 2.89114 13.3333 3.33317V4.99984" stroke="#FF4444" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EyeSVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.66669 10C1.66669 10 4.16669 4.16667 10 4.16667C15.8334 4.16667 18.3334 10 18.3334 10C18.3334 10 15.8334 15.8333 10 15.8333C4.16669 15.8333 1.66669 10 1.66669 10Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EyeOffSVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.95 14.95C13.5255 16.0358 11.7909 16.6374 10 16.6667C4.16669 16.6667 1.66669 10.8333 1.66669 10.8333C2.49598 9.19072 3.64607 7.73527 5.05002 6.55M8.25002 4.53333C8.82365 4.39907 9.41093 4.33195 10 4.33333C15.8334 4.33333 18.3334 10.1667 18.3334 10.1667C17.9286 10.9463 17.4489 11.6846 16.9 12.3667M11.7667 11.7667C11.5378 12.0123 11.2617 12.2093 10.9552 12.3459C10.6487 12.4826 10.3181 12.556 9.98297 12.5619C9.64782 12.5678 9.31488 12.5061 9.00382 12.3804C8.69275 12.2547 8.40995 12.0675 8.17253 11.8301C7.93511 11.5927 7.74791 11.3099 7.62219 10.9988C7.49648 10.6877 7.43479 10.3548 7.44072 10.0197C7.44665 9.68451 7.51998 9.35391 7.65667 9.04741C7.79335 8.74091 7.99032 8.46485 8.23585 8.23583" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.66669 1.66667L18.3334 18.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#A2CE3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LockSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6667 7.33333H3.33333C2.59695 7.33333 2 7.93029 2 8.66667V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V8.66667C14 7.93029 13.403 7.33333 12.6667 7.33333Z" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.66669 7.33333V4.66667C4.66669 3.78261 5.01788 2.93476 5.64300 2.30964C6.26812 1.68452 7.11597 1.33333 8.00002 1.33333C8.88408 1.33333 9.73193 1.68452 10.357 2.30964C10.9822 2.93476 11.3334 3.78261 11.3334 4.66667V7.33333" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Data ─── */

const locationOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "ng", label: "Nigeria" },
];

const timezoneOptions = [
  { value: "pst", label: "UTC-08:00 (PST)" },
  { value: "est", label: "UTC-05:00 (EST)" },
  { value: "gmt", label: "UTC+00:00 (GMT)" },
  { value: "wat", label: "UTC+01:00 (WAT)" },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
];

const industryOptions = [
  { value: "tech", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
];

const experienceOptions = [
  { value: "0-1", label: "0-1 years" },
  { value: "1-3", label: "1-3 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5-10", label: "5-10 years" },
  { value: "10+", label: "10+ years" },
];

/* ─── Components ─── */

function SettingsContent() {
  const [activeTab, setActiveTab] = useState("profile");
  const { data: session } = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Profile tab state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [fieldsCoached, setFieldsCoached] = useState("");
  const [experience, setExperience] = useState("");
  const [profTimezone, setProfTimezone] = useState("");
  const [profLanguages, setProfLanguages] = useState<string[]>([]);
  const [companies, setCompanies] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [bio, setBio] = useState("");

  // Availability tab state
  const [weeklySchedule, setWeeklySchedule] = useState<any>({
    Monday: { enabled: false, slots: [] },
    Tuesday: { enabled: false, slots: [] },
    Wednesday: { enabled: false, slots: [] },
    Thursday: { enabled: false, slots: [] },
    Friday: { enabled: false, slots: [] },
    Saturday: { enabled: false, slots: [] },
    Sunday: { enabled: false, slots: [] },
  });
  const [originalSlots, setOriginalSlots] = useState<Map<number, { day: number; start: string; end: string }>>(new Map());
  const [deletedSlots, setDeletedSlots] = useState<number[]>([]);

  // Notifications tab state
  const [notifications, setNotifications] = useState({
    newBooking: true,
    sessionReminders: true,
    reviewNotifications: true,
    paymentNotifications: true,
    marketingEmails: true,
  });

  // Account tab state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Set email from session
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  // Fetch coach profile data
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ["coach-profile"],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const response = await fetch(`${getApiUrl()}/api/coach/profile/setup/review`, {
        method: "GET",
        headers,
      });
      if (!response.ok) throw new Error("Failed to fetch profile");
      const result = await response.json();
      return result.data;
    },
  });

  // Fetch availability data
  const { data: availabilityData, isLoading: availabilityLoading } = useQuery({
    queryKey: ["coach-availability"],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const response = await fetch(`${getApiUrl()}/api/coach/availability`, {
        method: "GET",
        headers,
      });
      if (!response.ok) throw new Error("Failed to fetch availability");
      const result = await response.json();
      return result.data;
    },
  });

  // Process profile data when loaded
  useEffect(() => {
    if (!profileData) return;
    
    setFullName(profileData.name || "");
    setPhone(profileData.phone_number || "");
    setLocation(profileData.country || "");
    setLinkedin(profileData.linkedin_url || "");
    if (profileData.photo_url) setPhotoPreview(profileData.photo_url);
    
    setJobTitle(profileData.job_title || "");
    setIndustry(profileData.industry || "");
    setFieldsCoached(profileData.fields_coached?.join(", ") || "");
    setExperience(profileData.years_of_experience || "");
    setCompanies(profileData.companies_worked_at || "");
    setProfLanguages(profileData.languages_spoken || []);
    setBio(profileData.bio || "");
  }, [profileData]);

  // Process availability data when loaded
  useEffect(() => {
    if (!availabilityData) return;

    const dayNumberToName: Record<number, string> = {
      0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday",
      4: "Thursday", 5: "Friday", 6: "Saturday",
    };

    const originalMap = new Map();
    availabilityData.forEach((slot: any) => {
      originalMap.set(slot.id, {
        day: slot.day_of_week,
        start: slot.start_time,
        end: slot.end_time,
      });
    });
    setOriginalSlots(originalMap);

    const newSchedule: any = {
      Monday: { enabled: false, slots: [] },
      Tuesday: { enabled: false, slots: [] },
      Wednesday: { enabled: false, slots: [] },
      Thursday: { enabled: false, slots: [] },
      Friday: { enabled: false, slots: [] },
      Saturday: { enabled: false, slots: [] },
      Sunday: { enabled: false, slots: [] },
    };

    availabilityData.forEach((slot: any) => {
      const dayName = dayNumberToName[slot.day_of_week];
      if (dayName) {
        if (!newSchedule[dayName].enabled) {
          newSchedule[dayName] = { enabled: true, slots: [] };
        }
        newSchedule[dayName].slots.push({
          id: slot.id,
          start: slot.start_time,
          end: slot.end_time,
        });
      }
    });

    setWeeklySchedule(newSchedule);
  }, [availabilityData]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast({
          variant: "error",
          title: "File too large",
          description: "Please upload an image smaller than 5MB.",
        });
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addTimeSlot = (day: string) => {
    setWeeklySchedule((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { id: `new-${Date.now()}`, start: "09:00", end: "17:00", isNew: true }]
      }
    }));
  };

  const removeTimeSlot = (day: string, slotId: number | string) => {
    if (typeof slotId === "number") {
      setDeletedSlots((prev) => [...prev, slotId]);
    }
    setWeeklySchedule((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((s: any) => s.id !== slotId)
      }
    }));
  };

  const handleSlotChange = (day: string, slotId: string | number, field: "start" | "end", value: string) => {
    setWeeklySchedule((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((s: any) => {
          if (s.id === slotId) {
            const isModified = typeof s.id === "number" ? true : s.isModified;
            return { ...s, [field]: value, isModified };
          }
          return s;
        }),
      },
    }));
  };

  const toggleDay = (day: string) => {
    setWeeklySchedule((prev: any) => {
      const daySchedule = prev[day];
      if (!daySchedule.enabled && daySchedule.slots.length > 0) {
        const slotsToDelete = daySchedule.slots
          .filter((s: any) => typeof s.id === "number")
          .map((s: any) => s.id as number);
        setDeletedSlots((prevDeleted) => [...prevDeleted, ...slotsToDelete]);
      }
      return {
        ...prev,
        [day]: {
          ...prev[day],
          enabled: !prev[day].enabled,
          slots: !prev[day].enabled && prev[day].slots.length === 0
            ? [{ id: `new-${Date.now()}`, start: "09:00", end: "17:00", isNew: true }]
            : !prev[day].enabled ? prev[day].slots : [],
        },
      };
    });
  };

  // Save profile mutation
  const saveProfileMutation = useMutation({
    mutationFn: async () => {
      const headers = await getAuthHeaders();
      
      // Update coaching information
      await fetch(`${getApiUrl()}/api/coach/profile/setup/coaching`, {
        method: "PATCH",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ bio }),
      });

      // Update background information
      await fetch(`${getApiUrl()}/api/coach/profile/setup/background`, {
        method: "PATCH",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          job_title: jobTitle,
          industry,
          years_of_experience: experience,
          companies_worked_at: companies,
          fields_coached: fieldsCoached.split(",").map(f => f.trim()).filter(Boolean),
        }),
      });
    },
    onSuccess: () => {
      toast({ variant: "success", title: "Success", description: "Profile updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["coach-profile"] });
    },
    onError: (error: any) => {
      toast({ variant: "error", title: "Error", description: error.message || "Failed to update profile" });
    },
  });

  // Save availability mutation
  const saveAvailabilityMutation = useMutation({
    mutationFn: async () => {
      const headers = await getAuthHeaders();
      const dayNameToNumber: Record<string, number> = {
        Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
        Thursday: 4, Friday: 5, Saturday: 6,
      };

      // Delete removed slots
      for (const slotId of deletedSlots) {
        await fetch(`${getApiUrl()}/api/coach/availability/${slotId}`, {
          method: "DELETE",
          headers,
        });
      }

      // Process all enabled days
      for (const [dayName, daySchedule] of Object.entries(weeklySchedule)) {
        const schedule = daySchedule as { enabled: boolean; slots: any[] };
        if (!schedule.enabled) continue;
        const dayOfWeek = dayNameToNumber[dayName];

        for (const slot of schedule.slots) {
          const payload = {
            day_of_week: dayOfWeek,
            start_time: slot.start,
            end_time: slot.end,
          };

          if (slot.isNew || typeof slot.id === "string") {
            await fetch(`${getApiUrl()}/api/coach/availability`, {
              method: "POST",
              headers: { ...headers, "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
          } else if (slot.isModified && typeof slot.id === "number") {
            const original = originalSlots.get(slot.id);
            const hasChanged = !original || 
              original.day !== dayOfWeek || 
              original.start !== slot.start || 
              original.end !== slot.end;
            
            if (hasChanged) {
              await fetch(`${getApiUrl()}/api/coach/availability/${slot.id}`, {
                method: "PATCH",
                headers: { ...headers, "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
            }
          }
        }
      }
    },
    onSuccess: () => {
      toast({ variant: "success", title: "Success", description: "Availability updated successfully" });
      setDeletedSlots([]);
      queryClient.invalidateQueries({ queryKey: ["coach-availability"] });
    },
    onError: (error: any) => {
      toast({ variant: "error", title: "Error", description: error.message || "Failed to save availability" });
    },
  });

  const passwordRequirements = [
    { text: "Contains at least 8 characters", met: newPassword.length >= 8 },
    { text: "One upper case", met: /[A-Z]/.test(newPassword) },
    { text: "One lower case", met: /[a-z]/.test(newPassword) },
    { text: "One special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) },
  ];

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "availability", label: "Availability" },
    { id: "notifications", label: "Notifications" },
    { id: "account", label: "Account" },
  ];

  return (
    <SettingsLayout>
      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          <SettingsCard title="Profile Photo">
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
                  Change Photo
                </button>
                <p className="text-white/40 font-mona-sans text-xs mt-1.5">JPG, PNG, or GIF. Max 5MB.</p>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </div>
          </SettingsCard>

          <SettingsCard title="Basic Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput label="Full Name" placeholder="John Doe" value={fullName} onChange={setFullName} />
              <FormInput label="Email" placeholder="example@gmail.com" value={email} onChange={setEmail} type="email" />
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
              <Select label="Location (Country)" placeholder="Select your location" value={location} onChange={setLocation} options={locationOptions} />
              <Select label="Timezone" placeholder="Select your timezone" value={timezone} onChange={setTimezone} options={timezoneOptions} />
              <MultiSelect label="Languages Spoken" placeholder="Select languages" value={languages} onChange={setLanguages} options={languageOptions} />
            </div>
          </SettingsCard>

          <SettingsCard title="Professional Background">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput label="Job Title" placeholder="e.g. Senior Product Manager" value={jobTitle} onChange={setJobTitle} />
              <Select label="Industries You want to Prep Candidates For" placeholder="Select your Industry" value={industry} onChange={setIndustry} options={industryOptions} />
              <Select label="Fields Coached" placeholder="Select your Industry" value={fieldsCoached} onChange={setFieldsCoached} options={industryOptions} />
              <Select label="Years of Experience" placeholder="Select" value={experience} onChange={setExperience} options={experienceOptions} />
              <Select label="Timezone" placeholder="Select your timezone" value={profTimezone} onChange={setProfTimezone} options={timezoneOptions} />
              <MultiSelect label="Languages Spoken" placeholder="Select languages" value={profLanguages} onChange={setProfLanguages} options={languageOptions} />
              <FormInput label="Companies Worked At" placeholder="e.g. Google, Meta" value={companies} onChange={setCompanies} />
              <FormInput label="LinkedIn Profile" placeholder="https://linkedin.com/in/yourprofile" value={linkedin} onChange={setLinkedin} />
            </div>
          </SettingsCard>

          <SettingsCard title="Bio">
            <FormTextarea
              label="About you"
              placeholder="Tell candidates a bit about yourself and your coaching style"
              value={bio}
              onChange={setBio}
              rows={5}
              helperText="A compelling bio helps attract more clients."
            />
          </SettingsCard>

          <ActionButtons 
            onSave={() => saveProfileMutation.mutate()}
            saveText={saveProfileMutation.isPending ? "Saving..." : "Save Changes"}
          />
        </div>
      )}

      {/* Availability Tab */}
      {activeTab === "availability" && (
        <div className="space-y-6">
          <div className="bg-[#0B0D0F] border border-white/10 rounded-[16px] p-6 flex items-start gap-4">
            <ClockSVG />
            <div>
              <h3 className="text-white font-mona-sans font-bold text-lg mb-1">Configure Your Weekly Schedule</h3>
              <p className="text-white/50 font-mona-sans text-sm">Set the hours you're available for coaching sessions. Clients will only be able to book during these times.</p>
            </div>
          </div>

          <SettingsCard title="Weekly Availability">
            <p className="text-white/50 font-mona-sans text-sm mb-6">Toggle days on/off and set your available hours</p>
            <div className="space-y-4">
              {Object.entries(weeklySchedule).map(([day, dayData]) => {
                const data = dayData as { enabled: boolean; slots: any[] };
                return (
                <div key={day} className="border-b border-white/5 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleDay(day)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          data.enabled ? "bg-[#A2CE3A]" : "bg-white/20"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            data.enabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                      <span className="text-white font-mona-sans font-semibold text-sm capitalize">{day}</span>
                    </div>
                    {data.enabled && (
                      <button
                        onClick={() => addTimeSlot(day)}
                        className="text-[#A2CE3A] font-mona-sans text-sm font-medium hover:text-[#8fb832] transition-colors"
                      >
                        + Add Slot
                      </button>
                    )}
                  </div>
                  {data.enabled && (
                    <div className="space-y-2 ml-14">
                      {data.slots.map((slot: any) => (
                        <div key={slot.id} className="flex items-center gap-2">
                          <input
                            type="time"
                            value={slot.start}
                            onChange={(e) => handleSlotChange(day, slot.id, "start", e.target.value)}
                            className="px-3 py-2 rounded-[8px] border border-white/10 bg-white text-black font-mona-sans text-sm outline-none focus:border-[#A2CE3A] transition-colors"
                          />
                          <span className="text-white/50 font-mona-sans text-sm">to</span>
                          <input
                            type="time"
                            value={slot.end}
                            onChange={(e) => handleSlotChange(day, slot.id, "end", e.target.value)}
                            className="px-3 py-2 rounded-[8px] border border-white/10 bg-white text-black font-mona-sans text-sm outline-none focus:border-[#A2CE3A] transition-colors"
                          />
                          {data.slots.length > 1 && (
                            <button
                              onClick={() => removeTimeSlot(day, slot.id)}
                              className="p-2 hover:bg-white/5 rounded-[8px] transition-colors"
                            >
                              <TrashSVG />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          </SettingsCard>

          <ActionButtons 
            onSave={() => saveAvailabilityMutation.mutate()}
            saveText={saveAvailabilityMutation.isPending ? "Saving..." : "Save Changes"}
          />
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <SettingsCard title="Notification Preferences">
            <ToggleItem
              title="New booking notifications"
              description="Toggle days on/off and set your available hours"
              enabled={notifications.newBooking}
              onChange={(enabled) => setNotifications(prev => ({ ...prev, newBooking: enabled }))}
            />
            <ToggleItem
              title="Session reminders"
              description="Receive reminders before upcoming sessions"
              enabled={notifications.sessionReminders}
              onChange={(enabled) => setNotifications(prev => ({ ...prev, sessionReminders: enabled }))}
            />
            <ToggleItem
              title="Review notifications"
              description="Get notified when you receive a new review"
              enabled={notifications.reviewNotifications}
              onChange={(enabled) => setNotifications(prev => ({ ...prev, reviewNotifications: enabled }))}
            />
            <ToggleItem
              title="Payment notifications"
              description="Get notified about earnings and payouts"
              enabled={notifications.paymentNotifications}
              onChange={(enabled) => setNotifications(prev => ({ ...prev, paymentNotifications: enabled }))}
            />
            <ToggleItem
              title="Marketing emails"
              description="Receive tips and platform updates"
              enabled={notifications.marketingEmails}
              onChange={(enabled) => setNotifications(prev => ({ ...prev, marketingEmails: enabled }))}
            />
          </SettingsCard>

          <ActionButtons />
        </div>
      )}

      {/* Account Tab */}
      {activeTab === "account" && (
        <div className="space-y-6">
          <SettingsCard title="Account Settings">
            <div className="space-y-4">
              <FormInput
                label="Current Password"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={setCurrentPassword}
                type="password"
              />
              
              <div className="flex flex-col gap-1.5">
                <label className="text-white font-mona-sans text-sm font-semibold">Create New password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="***********"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-[10px] border border-white/10 bg-[#FFFFFF0D] text-white font-mona-sans text-sm outline-none placeholder:text-white/30 focus:border-[#A2CE3A] transition-colors"
                  />
                  <button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showNewPassword ? <EyeOffSVG /> : <EyeSVG />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white font-mona-sans text-sm font-semibold">Confirm New password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ric123456#"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-[10px] border border-white/10 bg-[#FFFFFF0D] text-white font-mona-sans text-sm outline-none placeholder:text-white/30 focus:border-[#A2CE3A] transition-colors"
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOffSVG /> : <EyeSVG />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 mt-4">
                <LockSVG />
                <div className="flex-1">
                  <p className="text-white/50 font-mona-sans text-xs mb-3">Password hint</p>
                  <div className="space-y-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded flex items-center justify-center ${req.met ? 'bg-[#A2CE3A]/15' : 'bg-white/5'}`}>
                          {req.met && <CheckSVG />}
                        </div>
                        <span className={`font-mona-sans text-sm ${req.met ? 'text-[#A2CE3A]' : 'text-white/50'}`}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SettingsCard>

          <ActionButtons />
        </div>
      )}
    </SettingsLayout>
  );
}

export default function SettingsPage() {
  return (
    <>
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <SettingsContent />
      </Suspense>
      
      {/* Phone Input Custom Styles */}
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
    </>
  );
}
