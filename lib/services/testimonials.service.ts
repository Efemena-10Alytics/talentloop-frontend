// Testimonials Service Functions
import { getApiUrl } from "@/lib/api";

export interface ImageTestimonial {
  id: number;
  type: string;
  title: string | null;
  file_url: string;
  sort_order: number;
  hide: boolean;
  created_at: string;
  updated_at: string;
}

export interface VideoTestimonial {
  id: number;
  type: string;
  title: string | null;
  file_url: string;
  sort_order: number;
  hide: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetImageTestimonialsResponse {
  status: string;
  data: ImageTestimonial[];
}

export interface GetVideoTestimonialsResponse {
  status: string;
  data: VideoTestimonial[];
}

/**
 * Get all visible image testimonials
 */
export const getImageTestimonials = async (): Promise<GetImageTestimonialsResponse> => {
  const response = await fetch(`${getApiUrl()}/api/v1/testimonies/images`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch image testimonials");
  }

  return data;
};

/**
 * Get all visible video testimonials
 */
export const getVideoTestimonials = async (): Promise<GetVideoTestimonialsResponse> => {
  const response = await fetch(`${getApiUrl()}/api/v1/testimonies/videos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch video testimonials");
  }

  return data;
};
