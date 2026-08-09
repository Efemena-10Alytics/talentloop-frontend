import { getSession, signIn } from "next-auth/react";

export interface SocialSignInResult {
  email: string;
  name: string;
  role: string;
  token: string;
  hasEnrollment: boolean;
}

/**
 * Signs in with a social provider.
 *
 * The provider access token is handed to NextAuth, which exchanges it with the
 * backend server-side and derives the identity from that response. The browser
 * never asserts who it is — passing an email/role/token from here would let any
 * caller mint a session for an arbitrary account.
 */
export async function socialSignIn(
  provider: "google" | "linkedin",
  access_token: string
): Promise<SocialSignInResult> {
  const result = await signIn("social-token", {
    provider,
    access_token,
    redirect: false,
  });

  if (!result?.ok || result.error) {
    throw new Error(result?.error || `${provider} sign in failed`);
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

export function openLinkedInOAuth(clientId: string, redirectUri: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const state = Math.random().toString(36).substring(2);
    const scope = "openid profile email";
    const authUrl =
      `https://www.linkedin.com/oauth/v2/authorization` +
      `?response_type=code` +
      `&client_id=${encodeURIComponent(clientId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${state}` +
      `&scope=${encodeURIComponent(scope)}`;

    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      authUrl,
      "linkedin-oauth",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popup) {
      reject(new Error("Popup blocked. Please allow popups for this site."));
      return;
    }

    const timer = setInterval(() => {
      try {
        if (popup.closed) {
          clearInterval(timer);
          reject(new Error("LinkedIn sign in was cancelled"));
          return;
        }

        const url = popup.location.href;
        if (url.includes(redirectUri)) {
          clearInterval(timer);
          popup.close();

          const params = new URL(url).searchParams;
          const code = params.get("code");
          const returnedState = params.get("state");
          const error = params.get("error");

          if (error) {
            reject(new Error(params.get("error_description") || "LinkedIn auth error"));
            return;
          }

          if (!code || returnedState !== state) {
            reject(new Error("Invalid response from LinkedIn"));
            return;
          }

          resolve(code);
        }
      } catch {
        // Cross-origin — popup hasn't redirected yet, keep polling
      }
    }, 500);
  });
}
