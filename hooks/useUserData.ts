import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getApiUrl, getAuthHeaders } from "@/lib/api";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  email_verified_at: string;
  photo: string;
  stripe_customer_id?: string | null;
}

interface ProfileSummary {
  type: string;
  onboarding_status: string;
  approval_status: string;
  current_step: number;
  basic_completed: string;
  background_completed: string;
  coaching_completed: string;
  submitted: boolean;
  assessment_required: string;
  assessment_passed: string;
}

interface UserDataResponse {
  user: UserData;
  onboarding_status: string;
  assessment_status: string;
  profile_summary: ProfileSummary;
}

export function useUserData() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserDataResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) {
        setUserData(null);
        return;
      }

      setLoading(true);

      try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${getApiUrl()}/api/v1/auth/me`, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const result = await response.json();
        setUserData(result.data);

        // Clear onboarding progress from localStorage if already submitted
        if (result.data?.onboarding_status === "submitted") {
          const storageKey = result.data?.user?.role === "coach" 
            ? "coach_onboarding_progress" 
            : "jobseeker_onboarding_progress";
          localStorage.removeItem(storageKey);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  return { userData, loading };
}
