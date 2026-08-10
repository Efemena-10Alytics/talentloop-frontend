import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface UserData {
  id: number;
  name: string | null;
  email: string;
  role: string;
  status: string;
  email_verified_at: string | null;
  photo: string;
  stripe_customer_id?: string | null;
  profile?: ProfileData | null;
}

interface ProfileData {
  first_name?: string;
  last_name?: string;
  country?: string;
  phone?: string;
  referral_source?: string;
  [key: string]: any;
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

interface CurrentEnrollment {
  id: number;
  status: string;
  needs_visa_sponsorship: boolean;
  end_date: string | null;
  assigned_at: string | null;
  completed_at: string | null;
}

interface UserDataResponse {
  user: UserData;
  onboarding_status: string;
  assessment_status: string;
  profile_summary: ProfileSummary;
  profile?: ProfileData;
  current_enrollment?: CurrentEnrollment | null;
}


async function fetchAuthMe(): Promise<Omit<UserDataResponse, "profile">> {
  const res = await fetch("/api/user/me", {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch user data");
  const json = await res.json();
  return json.data ?? json;
}

async function fetchProfile(): Promise<ProfileData | null> {
  const res = await fetch("/api/user/profile", {
    method: "GET",
  });

  // "No profile yet" comes back as 200 with data:null, so any non-ok response is
  // a genuine failure and must surface as one. Callers decide whether to prompt
  // the user for details from this value; a transient 500 previously arrived as
  // null and was indistinguishable from "hasn't filled it in".
  if (!res.ok) throw new Error(`Failed to fetch profile (${res.status})`);

  const json = await res.json();
  return json.data ?? null;
}

/**
 * Current authenticated user (GET /api/v1/auth/me) via React Query.
 */
export function useAuthMe() {
  const { status } = useSession();
  return useQuery({
    queryKey: ["auth-me"],
    queryFn: fetchAuthMe,
    enabled: status === "authenticated",
    retry: false,
  });
}

/**
 * Authenticated user's profile (GET /api/v1/profile) via React Query.
 */
export function useProfile() {
  const { status } = useSession();
  return useQuery<ProfileData | null>({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    enabled: status === "authenticated",
    retry: false,
  });
}

/**
 * Combined user + profile data. Backed by the shared `auth-me` and `profile`
 * queries so every consumer (e.g. multiple Navbars) dedupes to a single request.
 */
export function useUserData() {
  const queryClient = useQueryClient();
  const authMe = useAuthMe();
  const profile = useProfile();

  // Clear onboarding progress from localStorage if already submitted
  useEffect(() => {
    const data = authMe.data;
    if (data?.onboarding_status === "submitted") {
      const storageKey =
        data?.user?.role === "coach"
          ? "coach_onboarding_progress"
          : "jobseeker_onboarding_progress";
      localStorage.removeItem(storageKey);
    }
  }, [authMe.data]);

  // Refetch on profile-updated events fired elsewhere in the app
  useEffect(() => {
    const handleProfileUpdated = () => {
      queryClient.invalidateQueries({ queryKey: ["auth-me"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    };
    window.addEventListener("profile-updated", handleProfileUpdated);
    return () => window.removeEventListener("profile-updated", handleProfileUpdated);
  }, [queryClient]);

  const userData: UserDataResponse | null = authMe.data
    ? { ...authMe.data, profile: profile.data ?? undefined }
    : null;

  const refetch = useCallback(() => {
    authMe.refetch();
    profile.refetch();
  }, [authMe, profile]);

  return {
    userData,
    loading: authMe.isLoading || profile.isLoading,
    refetch,
  };
}
