"use client";

import { useQuery } from "@tanstack/react-query";

/**
 * The visitor's country code from the platform edge, or null when it can't be
 * determined (local dev, or a host that doesn't set a geo header).
 *
 * Never retried and never treated as an error: a failed lookup just means no
 * pre-selection, which is the same as today's behaviour.
 */
export function useGeoCountry() {
  const { data } = useQuery({
    queryKey: ["geo-country"],
    queryFn: async (): Promise<string | null> => {
      try {
        const res = await fetch("/api/geo");
        if (!res.ok) return null;
        const json = (await res.json()) as { country?: string | null };
        return json.country ?? null;
      } catch {
        return null;
      }
    },
    staleTime: Infinity,
    retry: false,
  });

  return data ?? null;
}
