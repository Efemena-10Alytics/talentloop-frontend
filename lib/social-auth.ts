import { getSession, signIn } from "next-auth/react";

export type SocialProvider = "google" | "linkedin";

export const SOCIAL_PROVIDER_LABELS: Record<SocialProvider, string> = {
  google: "Google",
  linkedin: "LinkedIn",
};

/** Survives the round trip to the provider and back; cleared on the way out. */
const PENDING_KEY = "social_oauth_pending";

interface PendingSocialAuth {
  provider: SocialProvider;
  state: string;
  returnTo?: string;
}

export interface SocialSignInResult {
  email: string;
  name: string;
  role: string;
  token: string;
  hasEnrollment: boolean;
}

/**
 * Completes a social sign-in from the authorization code the provider handed
 * back. Called by the callback page, never by a form.
 *
 * The code goes to NextAuth, which forwards it to the backend; the backend
 * redeems it with the client secret and derives the identity from the
 * provider's response. So the browser never asserts who it is, and the
 * credential is bound to our client_id — a token minted for some other OAuth
 * app cannot be replayed here.
 */
export async function socialSignIn(
  provider: SocialProvider,
  code: string
): Promise<SocialSignInResult> {
  const result = await signIn("social-token", {
    provider,
    code,
    redirect: false,
  });

  if (!result?.ok || result.error) {
    throw new Error(result?.error || `${SOCIAL_PROVIDER_LABELS[provider]} sign in failed`);
  }

  const session = await getSession();

  if (!session?.backendToken) {
    throw new Error("Failed to establish session");
  }

  return {
    email: session.user.email,
    name: session.user.name || session.user.email,
    role: session.user.role,
    token: session.backendToken,
    hasEnrollment: session.hasEnrollment,
  };
}

/**
 * The callback page the provider redirects back to. The backend replays this
 * exact value when it redeems the code, so both sides read it from config
 * rather than deriving it independently.
 */
function redirectUriFor(provider: SocialProvider): string {
  const configured =
    provider === "google"
      ? process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
      : process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI;

  return configured || `${window.location.origin}/auth/${provider}/callback`;
}

function authorizeUrl(provider: SocialProvider, clientId: string, state: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUriFor(provider),
    scope: provider === "google" ? "openid email profile" : "openid profile email",
    state,
  });

  if (provider === "google") {
    // Without this Google silently reuses whichever account is already signed
    // in, which is surprising on a button the user pressed deliberately.
    params.set("prompt", "select_account");
    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  }

  return `https://www.linkedin.com/oauth/v2/authorization?${params}`;
}

/** Cryptographically random CSRF state for the OAuth round trip. */
function randomState(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Sends the whole tab to the provider's consent screen.
 *
 * A top-level redirect rather than a popup: popups are blocked by default in
 * plenty of browsers and are unreliable inside mobile and in-app webviews,
 * which is exactly where sign-in has to work.
 *
 * `returnTo` is where the callback page should land the user afterwards —
 * normally the page they started from.
 */
export function beginSocialRedirect(provider: SocialProvider, returnTo?: string): void {
  const clientId =
    provider === "google"
      ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      : process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;

  if (!clientId) {
    throw new Error(`${SOCIAL_PROVIDER_LABELS[provider]} sign in is not set up yet`);
  }

  const state = randomState();

  const pending: PendingSocialAuth = { provider, state, returnTo };
  sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending));

  window.location.assign(authorizeUrl(provider, clientId, state));
}

/**
 * Reads back what `beginSocialRedirect` stashed, clearing it either way so a
 * stale record can't be replayed against a later callback.
 */
export function consumePendingSocialAuth(): PendingSocialAuth | null {
  const raw = sessionStorage.getItem(PENDING_KEY);
  sessionStorage.removeItem(PENDING_KEY);

  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as PendingSocialAuth;
    return parsed?.provider && parsed?.state ? parsed : null;
  } catch {
    return null;
  }
}
