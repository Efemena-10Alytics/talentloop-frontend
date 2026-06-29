import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getApiUrl, buildAuthHeaders, getStoredAuthToken } from "@/lib/api";

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

interface UserDataResponse {
  user: UserData;
  onboarding_status: string;
  assessment_status: string;
  profile_summary: ProfileSummary;
  profile?: ProfileData;
}

/**
 * Resolve the backend auth token, preferring the NextAuth session token and
 * falling back to localStorage. Returns a stable primitive so it can be used
 * safely as part of a React Query key.
 */
function useAuthToken(): string | null {
  const { data: session } = useSession();
  return session?.backendToken ?? getStoredAuthToken();
}

async function fetchAuthMe(token: string): Promise<Omit<UserDataResponse, "profile">> {
  const res = await fetch(`${getApiUrl()}/api/v1/auth/me`, {
    method: "GET",
    headers: buildAuthHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch user data");
  const json = await res.json();
  return json.data;
}

async function fetchProfile(token: string): Promise<ProfileData | null> {
  const res = await fetch(`${getApiUrl()}/api/v1/profile`, {
    method: "GET",
    headers: buildAuthHeaders(token),
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null;
}

/**
 * Current authenticated user (GET /api/v1/auth/me) via React Query.
 */
export function useAuthMe() {
  const token = useAuthToken();
  return useQuery({
    queryKey: ["auth-me", token],
    queryFn: () => fetchAuthMe(token as string),
    enabled: !!token,
  });
}

/**
 * Authenticated user's profile (GET /api/v1/profile) via React Query.
 */
export function useProfile() {
  const token = useAuthToken();
  return useQuery<ProfileData | null>({
    queryKey: ["profile", token],
    queryFn: () => fetchProfile(token as string),
    enabled: !!token,
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
