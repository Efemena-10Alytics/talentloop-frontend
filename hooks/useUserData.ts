import { useState, useEffect, useCallback } from "react";
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

interface ProfileData {
  first_name?: string;
  last_name?: string;
  country?: string;
  phone?: string;
  referral_source?: string;
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
  profile?: ProfileData;
}

export function useUserData() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserDataResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!session) {
      setUserData(null);
      return;
    }

    setLoading(true);

    try {
      const headers = await getAuthHeaders();
      
      // Fetch user data
      const userResponse = await fetch(`${getApiUrl()}/api/v1/auth/me`, {
        method: "GET",
        headers,
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userResult = await userResponse.json();
      
      // Fetch profile data
      let profileData = null;
      try {
        const profileResponse = await fetch(`${getApiUrl()}/api/v1/profile`, {
          method: "GET",
          headers,
        });
        
        if (profileResponse.ok) {
          const profileResult = await profileResponse.json();
          profileData = profileResult.data;
        }
      } catch (profileError) {
        console.log("Profile data not available yet");
      }
      
      // Combine user and profile data
      setUserData({
        ...userResult.data,
        profile: profileData,
      });

      // Clear onboarding progress from localStorage if already submitted
      if (userResult.data?.onboarding_status === "submitted") {
        const storageKey = userResult.data?.user?.role === "coach" 
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
  }, [session]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Listen for profile-updated events to refetch data
  useEffect(() => {
    const handleProfileUpdated = () => {
      fetchUserData();
    };
    window.addEventListener('profile-updated', handleProfileUpdated);
    return () => {
      window.removeEventListener('profile-updated', handleProfileUpdated);
    };
  }, [fetchUserData]);

  return { userData, loading, refetch: fetchUserData };
}
