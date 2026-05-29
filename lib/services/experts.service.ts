// Meet Our Experts Service Functions
import { getApiUrl } from "@/lib/api";

export interface Expert {
  id: number;
  name: string;
  job_title: string;
  details: string;
  photo: string;
  interview_prep_counts: number;
  clients_counts: number;
  hide: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  photo_url: string;
}

export interface GetExpertsResponse {
  status: string;
  data: Expert[];
}

/**
 * Get all experts for "Meet Our Experts" section
 */
export const getExperts = async (): Promise<GetExpertsResponse> => {
  const response = await fetch(`${getApiUrl()}/api/v1/meet-our-experts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch experts");
  }

  return data;
};
