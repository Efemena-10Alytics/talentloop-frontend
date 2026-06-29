// Pricing Hooks using Tanstack Query
"use client";

import { useQuery } from "@tanstack/react-query";
import { getPricingPlans, getPricingPlan, type PricingPlan } from "@/lib/services/pricing.service";

/**
 * Hook to get all pricing plans using Tanstack Query
 */
export const usePricingPlans = () => {
  return useQuery({
    queryKey: ["pricingPlans"],
    queryFn: getPricingPlans,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

/**
 * Hook to get active pricing plans sorted by sort_order
 */
export const useActivePricingPlans = () => {
  const { data, ...rest } = usePricingPlans();

  const activePlans = data?.data
    ?.filter((plan) => plan.status === "active")
    .sort((a, b) => a.sort_order - b.sort_order) || [];

  return {
    ...rest,
    data: activePlans,
  };
};

/**
 * Hook to get a single pricing plan by ID
 */
export const usePricingPlan = (id: number) => {
  return useQuery({
    queryKey: ["pricingPlan", id],
    queryFn: () => getPricingPlan(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    enabled: !!id,
  });
};
