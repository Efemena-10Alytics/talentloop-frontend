"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navbar1 } from "@/components/manage-your-profile/Navbar1";
import { GlassCard } from "@/components/manage-your-profile/GlassCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getApiUrl, getAuthHeaders } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useUserData } from "@/hooks/useUserData";

/* ─── SVG Icons ─── */

const SuggestedPricingSVG = () => (
  <svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="68.3385" height="68.3385" rx="16.0797" fill="#161719"/>
    <path d="M27.2232 46.8788L27.203 46.8825L27.0721 46.947L27.0353 46.9544L27.0095 46.947L26.8786 46.8825C26.859 46.8764 26.8442 46.8794 26.8344 46.8917L26.827 46.9101L26.7957 47.6988L26.8049 47.7356L26.8233 47.7596L27.015 47.896L27.0426 47.9033L27.0647 47.896L27.2564 47.7596L27.2785 47.7301L27.2859 47.6988L27.2545 46.912C27.2496 46.8923 27.2392 46.8813 27.2232 46.8788ZM27.7116 46.6706L27.6876 46.6743L27.3467 46.8456L27.3283 46.8641L27.3227 46.8843L27.3559 47.6767L27.3651 47.6988L27.3799 47.7117L27.7503 47.8831C27.7736 47.8892 27.7914 47.8843 27.8037 47.8683L27.8111 47.8425L27.7484 46.7111C27.7423 46.689 27.73 46.6755 27.7116 46.6706ZM26.394 46.6743C26.3859 46.6694 26.3761 46.6678 26.3669 46.6698C26.3576 46.6719 26.3495 46.6774 26.3442 46.6853L26.3332 46.7111L26.2705 47.8425C26.2717 47.8646 26.2822 47.8794 26.3018 47.8867L26.3295 47.8831L26.6999 47.7117L26.7183 47.6969L26.7257 47.6767L26.757 46.8843L26.7515 46.8622L26.733 46.8438L26.394 46.6743Z" fill="#A2CE3A"/>
    <path d="M34.1697 52.2593C44.1603 52.2593 52.2593 44.1603 52.2593 34.1697C52.2593 24.1791 44.1603 16.0801 34.1697 16.0801C24.1791 16.0801 16.0801 24.1791 16.0801 34.1697C16.0801 44.1603 24.1791 52.2593 34.1697 52.2593Z" stroke="#A2CE3A" strokeWidth="3.01494" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M34.1699 41.4053V34.1694M34.1699 26.9336H34.188" stroke="#A2CE3A" strokeWidth="3.01494" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckCircleSVG = () => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.0597 0C18.7203 0 24.1195 5.39915 24.1195 12.0597C24.1195 18.7203 18.7203 24.1195 12.0597 24.1195C5.39915 24.1195 0 18.7203 0 12.0597C0 5.39915 5.39915 0 12.0597 0ZM12.0597 1.80896C9.34106 1.80896 6.73374 2.88895 4.81134 4.81134C2.88895 6.73374 1.80896 9.34106 1.80896 12.0597C1.80896 14.7784 2.88895 17.3857 4.81134 19.3081C6.73374 21.2305 9.34106 22.3105 12.0597 22.3105C14.7784 22.3105 17.3857 21.2305 19.3081 19.3081C21.2305 17.3857 22.3105 14.7784 22.3105 12.0597C22.3105 9.34106 21.2305 6.73374 19.3081 4.81134C17.3857 2.88895 14.7784 1.80896 12.0597 1.80896ZM10.5523 13.7963L15.943 8.40564C16.1046 8.2453 16.3207 8.15179 16.5482 8.14377C16.7757 8.13576 16.9979 8.21384 17.1704 8.36242C17.3428 8.51099 17.4529 8.71915 17.4787 8.94534C17.5045 9.17152 17.444 9.39911 17.3093 9.58267L17.2213 9.68397L11.1914 15.7138C11.0383 15.867 10.8353 15.9602 10.6193 15.9763C10.4033 15.9925 10.1886 15.9306 10.0144 15.8019L9.91311 15.7138L6.89817 12.6989C6.73783 12.5373 6.64432 12.3212 6.63631 12.0937C6.6283 11.8662 6.70637 11.644 6.85495 11.4715C7.00353 11.299 7.21168 11.1889 7.43787 11.1632C7.66406 11.1374 7.89164 11.1979 8.0752 11.3325L8.1765 11.4206L10.5523 13.7963Z" fill="#A2CE3A"/>
  </svg>
);

const ClockSmallSVG = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C21.732 0 28 6.268 28 14C28 21.732 21.732 28 14 28C6.268 28 0 21.732 0 14C0 6.268 6.268 0 14 0ZM14 2.8C10.8296 2.8 7.78918 4.0593 5.52424 6.32424C3.2593 8.58918 2 11.6296 2 14.8C2 14.8 2 14 14 14C14 14 14 2.8 14 2.8Z" fill="#A2CE3A"/>
  </svg>
);

const DollarSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#A2CE3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SaveIconSVG = () => (
  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.8135 17.5871H2.76369C2.03071 17.5871 1.32776 17.2959 0.809466 16.7777C0.291174 16.2594 0 15.5564 0 14.8234V2.76369C0 2.03071 0.291174 1.32776 0.809466 0.809466C1.32776 0.291173 2.03071 0 2.76369 0H10.301C10.5009 0.000175923 10.6924 0.0797023 10.8337 0.221095L15.3561 4.77365C15.4975 4.91486 15.577 5.10645 15.5772 5.30628V14.8234C15.5772 15.5564 15.286 16.2594 14.7677 16.7777C14.2494 17.2959 13.5464 17.5871 12.8135 17.5871ZM2.76369 1.50747C2.43052 1.50747 2.11099 1.63982 1.87541 1.87541C1.63982 2.11099 1.50747 2.43052 1.50747 2.76369V14.8234C1.50747 15.1566 1.63982 15.4761 1.87541 15.7117C2.11099 15.9473 2.43052 16.0797 2.76369 16.0797H12.8135C13.1466 16.0797 13.4662 15.9473 13.7018 15.7117C13.9373 15.4761 14.0697 15.1566 14.0697 14.8234V5.58768L9.98948 1.50747H2.76369Z" fill="#0F4F3A"/>
    <path d="M12.562 16.8336H11.0545V10.5524H4.52216V16.8336H3.01469V10.3012C3.01469 9.96803 3.14704 9.6485 3.38263 9.41292C3.61821 9.17733 3.93774 9.04498 4.27091 9.04498H11.3058C11.6389 9.04498 11.9585 9.17733 12.194 9.41292C12.4296 9.6485 12.562 9.96803 12.562 10.3012V16.8336ZM8.26067 5.52755H4.30106C4.13081 5.52624 3.96249 5.4914 3.8057 5.42503C3.64891 5.35866 3.50674 5.26206 3.38728 5.14074C3.26783 5.01943 3.17345 4.87577 3.10952 4.71797C3.04559 4.56017 3.01336 4.39133 3.01469 4.22108V0.753906H4.52216V4.02009H8.03958V0.753906H9.54705V4.22108C9.54837 4.39133 9.51615 4.56017 9.45222 4.71797C9.38829 4.87577 9.2939 5.01943 9.17445 5.14074C9.055 5.26206 8.91282 5.35866 8.75604 5.42503C8.59925 5.4914 8.43092 5.52624 8.26067 5.52755Z" fill="#0F4F3A"/>
  </svg>
);

const ChevronDownSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BackArrowSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── API Interfaces ─── */
interface PlanOffer {
  text: string;
  style: "check";
}

interface CoachPlan {
  id: number;
  title: string;
  description: string;
  offers: PlanOffer[];
  sessions_total: number;
  session_duration_minutes: number;
  price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/* ─── Duration Option ─── */
function DurationOption({ minutes, label, selected, onClick }: { minutes: string; label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-4 rounded-[12px] border text-center cursor-pointer transition-all ${
        selected
          ? "border-[#A2CE3A] bg-[#A2CE3A]/10"
          : "border-white/10 bg-[#FFFFFF0D] hover:bg-[#FFFFFF1A]"
      }`}
    >
      <p className="text-white font-mona-sans font-bold text-base">{minutes}</p>
      <p className="text-white/50 font-mona-sans text-xs mt-1">{label}</p>
    </button>
  );
}

/* ─── Main Page ─── */
export default function SetPricePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { userData, loading: userLoading } = useUserData();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [existingPlan, setExistingPlan] = useState<CoachPlan | null>(null);
  const [sessionName, setSessionName] = useState("");
  const [sessionDuration, setSessionDuration] = useState("30");
  const [sessionPrice, setSessionPrice] = useState("");
  const [sessionCount, setSessionCount] = useState("5");

  // Role-based access control
  useEffect(() => {
    if (!userLoading && userData) {
      if (userData.user.role !== "coach") {
        toast({
          variant: "error",
          title: "Access Denied",
          description: "This page is only accessible to coaches.",
        });
        router.push("/manage-your-profile");
      }
    }
  }, [userData, userLoading, router, toast]);

  // Fetch existing plans using TanStack Query
  const { data: plans, isLoading } = useQuery({
    queryKey: ["coach-plans"],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const response = await fetch(`${getApiUrl()}/api/coach/plans`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }

      const result = await response.json();
      return result.data as CoachPlan[];
    },
    enabled: !!userData && userData.user.role === "coach",
  });

  // Process plans data when it changes
  useEffect(() => {
    if (!plans) return;

    // If there's an active plan, populate the form
    const activePlan = plans.find((p) => p.is_active);
    if (activePlan) {
      setExistingPlan(activePlan);
      setSessionName(activePlan.title);
      setSessionDuration(`${activePlan.session_duration_minutes} mins`);
      setSessionPrice(String(activePlan.price));
      setSessionCount(String(activePlan.sessions_total));
    }
  }, [plans]);

  // Save mutation - MUST be before conditional returns
  const saveMutation = useMutation({
    mutationFn: async () => {
      const headers = await getAuthHeaders();
      
      // Extract numeric value from duration string (e.g., "30 mins" -> 30)
      const durationMinutes = parseInt(sessionDuration.replace(/\D/g, '')) || 30;
      
      const payload = {
        title: sessionName,
        description: `${sessionCount} sessions package`,
        sessions_total: Number(sessionCount),
        session_duration_minutes: durationMinutes,
        price: Number(sessionPrice),
        is_active: true,
      };

      let response;
      
      if (existingPlan) {
        // Update existing plan
        response = await fetch(
          `${getApiUrl()}/api/coach/plans/${existingPlan.id}`,
          {
            method: "PUT",
            headers: {
              ...headers,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
      } else {
        // Create new plan
        response = await fetch(`${getApiUrl()}/api/coach/plans`, {
          method: "POST",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save plan");
      }

      const result = await response.json();
      return result.data;
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Success",
        description: "Session pricing updated successfully",
      });

      setExistingPlan(data);
      
      // Invalidate and refetch plans
      queryClient.invalidateQueries({ queryKey: ["coach-plans"] });
    },
    onError: (error: any) => {
      toast({
        variant: "error",
        title: "Error",
        description: error.message || "Failed to save session pricing",
      });
    },
  });

  // Show loading while checking user role
  if (userLoading || !userData || isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0D0F] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url('/img2.png')", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }} />
        <Navbar1 />
        <div className="relative z-10 flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A2CE3A]"></div>
        </div>
      </div>
    );
  }

  // Prevent rendering if not a coach
  if (userData.user.role !== "coach") {
    return null;
  }

  const handleSave = () => {
    saveMutation.mutate();
  };

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

        {/* Page Title */}
        <h1 className="text-white font-mona-sans font-bold text-2xl lg:text-3xl mb-8">Set Price Range</h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A2CE3A]"></div>
          </div>
        ) : (
          <>

        {/* ─── Suggested Pricing Ranges ─── */}
        <GlassCard className="p-6 lg:p-8 mb-6">
          <div className="flex items-center gap-4 mb-5">
            <SuggestedPricingSVG />
            <h2 className="text-white font-mona-sans font-bold text-xl">Suggested Pricing Ranges</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <CheckCircleSVG />
              <span className="text-white/80 font-mona-sans text-sm">Entry-level coaches: <strong className="text-white">$50 - $100/hr</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleSVG />
              <span className="text-white/80 font-mona-sans text-sm">Mid-level coaches: <strong className="text-white">$100 - $200/hr</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleSVG />
              <span className="text-white/80 font-mona-sans text-sm">Senior coaches: <strong className="text-white">$200 - $400/hr</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleSVG />
              <span className="text-white/80 font-mona-sans text-sm">Executive coaches: <strong className="text-white">$400+/hr</strong></span>
            </div>
          </div>
        </GlassCard>

        {/* ─── Session Rates ─── */}
        <GlassCard className="p-6 lg:p-8 mb-10">
          <div className="flex items-center gap-2 mb-1">
            <DollarSVG />
            <h3 className="text-white font-mona-sans font-bold text-lg">Session Rates</h3>
          </div>
          <p className="text-white/50 font-mona-sans text-sm mb-5">Set your rates for different session types (USD)</p>

          <p className="text-white font-mona-sans font-bold text-sm mb-3">Session Type Pricing (Optional)</p>

          {/* Table Header - Desktop Only */}
          <div className="hidden lg:grid grid-cols-4 gap-3 mb-2">
            <span className="text-white/60 font-mona-sans text-xs font-semibold">Session Name</span>
            <span className="text-white/60 font-mona-sans text-xs font-semibold">Duration</span>
            <span className="text-white/60 font-mona-sans text-xs font-semibold">Price (USD)</span>
            <span className="text-white/60 font-mona-sans text-xs font-semibold">Number of Sessions</span>
          </div>

          {/* Table Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Session Name */}
            <div className="flex flex-col gap-1.5">
              <span className="text-white/60 font-mona-sans text-xs font-semibold lg:hidden">Session Name</span>
              <input
                type="text"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                className="px-3 py-2.5 rounded-[8px] border border-[#A2CE3A]/40 bg-[#FFFFFF0D] text-white font-mona-sans text-sm outline-none focus:border-[#A2CE3A]"
              />
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-1.5">
              <span className="text-white/60 font-mona-sans text-xs font-semibold lg:hidden">Duration</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] border border-white/10 bg-[#FFFFFF0D] text-white/70 font-mona-sans text-sm outline-none cursor-pointer hover:border-[#A2CE3A] transition-colors">
                    <span>{sessionDuration}</span>
                    <ChevronDownSVG />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full bg-[#1A1C1F] border-white/10">
                  {["30 mins", "60 mins", "90 mins"].map((duration) => (
                    <DropdownMenuItem
                      key={duration}
                      onClick={() => setSessionDuration(duration)}
                      className="text-white/70 hover:text-[#A2CE3A] hover:bg-[#FFFFFF1A] cursor-pointer"
                    >
                      {duration}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1.5">
              <span className="text-white/60 font-mona-sans text-xs font-semibold lg:hidden">Price (USD)</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 font-mona-sans text-sm">$</span>
                <input
                  type="text"
                  value={sessionPrice}
                  onChange={(e) => setSessionPrice(e.target.value)}
                  className="w-full pl-7 pr-3 py-2.5 rounded-[8px] border border-white/10 bg-[#FFFFFF0D] text-white font-mona-sans text-sm outline-none focus:border-[#A2CE3A]"
                />
              </div>
            </div>

            {/* Number of Sessions */}
            <div className="flex flex-col gap-1.5">
              <span className="text-white/60 font-mona-sans text-xs font-semibold lg:hidden">Number of Sessions</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] border border-white/10 bg-[#FFFFFF0D] text-white/70 font-mona-sans text-sm outline-none cursor-pointer hover:border-[#A2CE3A] transition-colors">
                    <span>{sessionCount}</span>
                    <ChevronDownSVG />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full bg-[#1A1C1F] border-white/10">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <DropdownMenuItem
                      key={n}
                      onClick={() => setSessionCount(String(n))}
                      className="text-white/70 hover:text-[#A2CE3A] hover:bg-[#FFFFFF1A] cursor-pointer"
                    >
                      {n}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </GlassCard>

        {/* ─── Action Buttons ─── */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => router.push("/manage-your-profile")}
            disabled={saveMutation.isPending}
            className="px-10 py-3 rounded-[8px] font-mona-sans text-sm font-bold transition-colors cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: "#ECF8C7", color: "#054711" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="flex items-center gap-2 px-10 py-3 bg-[#A2CE3A] rounded-[8px] text-[#121212] font-mona-sans text-sm font-bold hover:bg-[#92BE2A] transition-colors cursor-pointer disabled:opacity-50"
          >
            <SaveIconSVG />
            {saveMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
