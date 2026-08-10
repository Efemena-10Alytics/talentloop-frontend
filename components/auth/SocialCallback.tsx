"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  consumePendingSocialAuth,
  socialSignIn,
  SOCIAL_PROVIDER_LABELS,
  type SocialProvider,
} from "@/lib/social-auth";

/** Shared shell so the Suspense fallback and the live states look identical. */
export function SocialCallbackScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0D0F] flex items-center justify-center px-6">
      <div className="text-center font-mona-sans text-sm text-white">{children}</div>
    </div>
  );
}

/**
 * Only accept internal paths. `returnTo` comes from our own sessionStorage, but
 * treating it as untrusted costs one check and removes any chance of turning
 * the callback into an open redirect.
 */
function safeReturnTo(returnTo: string | undefined): string | null {
  if (!returnTo) return null;
  return returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : null;
}

export default function SocialCallback({ provider }: { provider: SocialProvider }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const label = SOCIAL_PROVIDER_LABELS[provider];

  // An authorization code is single-use. React's development StrictMode runs
  // effects twice, and the second exchange would fail against an already-spent
  // code — so this must run exactly once per mount.
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const complete = async () => {
      const pending = consumePendingSocialAuth();
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const providerError = searchParams.get("error");

      if (providerError) {
        setError(
          providerError === "access_denied"
            ? `${label} sign in was cancelled.`
            : searchParams.get("error_description") || `${label} sign in failed.`
        );
        return;
      }

      if (!pending || pending.provider !== provider || !state || pending.state !== state) {
        setError("This sign in link is no longer valid. Please start again.");
        return;
      }

      if (!code) {
        setError(`${label} did not return an authorization code.`);
        return;
      }

      try {
        const result = await socialSignIn(provider, code);
        localStorage.setItem("auth_token", result.token);
        router.replace(
          safeReturnTo(pending.returnTo) ?? (result.hasEnrollment ? "/dashboard" : "/")
        );
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : `${label} sign in failed.`);
      }
    };

    void complete();
  }, [searchParams, provider, router, label]);

  if (error) {
    return (
      <SocialCallbackScreen>
        <p className="mb-4">{error}</p>
        <Link href="/signin" className="text-[#A2CE3A] underline underline-offset-4">
          Back to sign in
        </Link>
      </SocialCallbackScreen>
    );
  }

  return <SocialCallbackScreen>Completing sign in...</SocialCallbackScreen>;
}
