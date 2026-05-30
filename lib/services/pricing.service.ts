// Pricing Service Functions
import { getApiUrl } from "@/lib/api";

export interface PricingPlan {
  id: number;
  title: string;
  description: string;
  amount: string;
  tags: string[];
  status: string;
  sort_order: number;
  is_popular: boolean;
  installments: number[][] | null;
  created_at: string;
  updated_at: string;
}

export interface GetPricingPlansResponse {
  status: string;
  data: PricingPlan[];
}

export interface GetPricingPlanResponse {
  status: string;
  data: PricingPlan;
}

/**
 * Get all active pricing plans
 */
export const getPricingPlans = async (): Promise<GetPricingPlansResponse> => {
  const response = await fetch(`${getApiUrl()}/api/v1/pricing`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch pricing plans");
  }

  return data;
};

/**
 * Get a single pricing plan by ID
 */
export const getPricingPlan = async (id: number): Promise<GetPricingPlanResponse> => {
  const response = await fetch(`${getApiUrl()}/api/v1/pricing/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch pricing plan");
  }

  return data;
};
