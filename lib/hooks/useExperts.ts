// Experts Hooks using Tanstack Query
"use client";

import { useQuery } from "@tanstack/react-query";
import { getExperts, type Expert } from "@/lib/services/experts.service";

/**
 * Hook to get all experts using Tanstack Query
 */
export const useExperts = () => {
  return useQuery({
    queryKey: ["experts"],
    queryFn: getExperts,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

/**
 * Hook to get visible experts (not hidden) sorted by sort_order
 */
export const useVisibleExperts = () => {
  const { data, ...rest } = useExperts();

  const visibleExperts = data?.data
    ?.filter((expert) => !expert.hide)
    .sort((a, b) => a.sort_order - b.sort_order) || [];

  return {
    ...rest,
    data: visibleExperts,
  };
};
