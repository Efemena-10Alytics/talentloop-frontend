// Authentication Hooks using Tanstack Query
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { clearAuthStorage } from "@/lib/auth";
import { getCurrentUser, logout, type User } from "@/lib/services/auth.service";
import { useRouter } from "next/navigation";

/**
 * Hook to get current authenticated user using Tanstack Query
 */
export const useCurrentUser = () => {
  const { data: session, status } = useSession();
  
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: status === "authenticated" && !!session?.backendToken,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to logout user
 * Clears storage before calling logout endpoint
 * Redirects to signin regardless of endpoint success/failure
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      // Storage is already cleared in logout function
      queryClient.clear();
      await nextAuthSignOut({ redirect: false });
      router.push("/signin");
    },
    onError: async (error) => {
      // Storage is already cleared in logout function, even if endpoint fails
      console.error("Logout error:", error);
      queryClient.clear();
      await nextAuthSignOut({ redirect: false });
      router.push("/signin");
    },
  });
};

/**
 * Hook to get user data from session or query
 */
export const useUser = (): {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
} => {
  const { data: session, status } = useSession();
  const { data: userData, isLoading: isQueryLoading } = useCurrentUser();

  const isLoading = status === "loading" || isQueryLoading;
  const isAuthenticated = status === "authenticated";

  // Prefer data from Tanstack Query, fallback to session
  const user = userData?.user || null;

  return {
    user,
    isLoading,
    isAuthenticated,
  };
};
