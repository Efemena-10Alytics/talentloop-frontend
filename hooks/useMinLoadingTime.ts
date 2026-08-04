"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ensures a loading state stays true for at least `minMs` milliseconds,
 * even if the underlying `isLoading` flag resolves faster. This is used
 * to guarantee skeleton loaders are visible for a minimum duration.
 */
export function useMinLoadingTime(isLoading: boolean, minMs: number = 3000): boolean {
  const [showLoading, setShowLoading] = useState(isLoading);
  const startedAtRef = useRef<number | null>(isLoading ? Date.now() : null);

  useEffect(() => {
    if (isLoading) {
      if (startedAtRef.current === null) {
        startedAtRef.current = Date.now();
      }
      setShowLoading(true);
      return;
    }

    const startedAt = startedAtRef.current;
    if (startedAt === null) {
      setShowLoading(false);
      return;
    }

    const elapsed = Date.now() - startedAt;
    const remaining = minMs - elapsed;

    if (remaining <= 0) {
      startedAtRef.current = null;
      setShowLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      startedAtRef.current = null;
      setShowLoading(false);
    }, remaining);

    return () => clearTimeout(timer);
  }, [isLoading, minMs]);

  return showLoading;
}

export default useMinLoadingTime;
