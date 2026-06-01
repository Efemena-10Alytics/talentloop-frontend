// Testimonials Hooks using Tanstack Query
"use client";

import { useQuery } from "@tanstack/react-query";
import { 
  getImageTestimonials, 
  getVideoTestimonials,
  type ImageTestimonial,
  type VideoTestimonial 
} from "@/lib/services/testimonials.service";

/**
 * Hook to get all image testimonials using Tanstack Query
 */
export const useImageTestimonials = () => {
  return useQuery({
    queryKey: ["imageTestimonials"],
    queryFn: getImageTestimonials,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

/**
 * Hook to get visible image testimonials (not hidden) sorted by sort_order
 */
export const useVisibleImageTestimonials = () => {
  const { data, ...rest } = useImageTestimonials();

  const visibleTestimonials = data?.data
    ?.filter((testimonial) => !testimonial.hide)
    .sort((a, b) => a.sort_order - b.sort_order) || [];

  return {
    ...rest,
    data: visibleTestimonials,
  };
};

/**
 * Hook to get all video testimonials using Tanstack Query
 */
export const useVideoTestimonials = () => {
  return useQuery({
    queryKey: ["videoTestimonials"],
    queryFn: getVideoTestimonials,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

/**
 * Hook to get visible video testimonials (not hidden) sorted by sort_order
 */
export const useVisibleVideoTestimonials = () => {
  const { data, ...rest } = useVideoTestimonials();

  const visibleTestimonials = data?.data
    ?.filter((testimonial) => !testimonial.hide)
    .sort((a, b) => a.sort_order - b.sort_order) || [];

  return {
    ...rest,
    data: visibleTestimonials,
  };
};
