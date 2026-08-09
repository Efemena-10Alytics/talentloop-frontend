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
 * `code` is a one-time OAuth authorization code. It is handed to NextAuth, which
 * forwards it to the backend; the backend redeems it with the client secret and
 * derives the identity from the provider's response. Two things follow: the
 * browser never asserts who it is, and the credential is bound to our client_id,
 * so a token minted for some other OAuth app cannot be replayed here.
 */
export async function socialSignIn(
  provider: "google" | "linkedin",
  code: string
): Promise<SocialSignInResult> {
  const result = await signIn("social-token", {
    provider,
    code,
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

/**
 * The redirect URI LinkedIn sends the code back to. The backend has to send the
 * exact same value when it redeems the code, so it is configured rather than
 * derived from the current origin.
 */
export function linkedInRedirectUri(): string {
  return (
    process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI ||
    `${window.location.origin}/auth/linkedin/callback`
  );
}

/** Cryptographically random CSRF state for the OAuth popup. */
function randomState(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Opens Google's popup consent flow and resolves with an authorization code.
 *
 * Uses `initCodeClient` rather than `initTokenClient`: the token client hands
 * the browser an access token, which the backend cannot verify was issued to
 * us. `ux_mode: "popup"` keeps our own styled button and makes Google treat
 * `postmessage` as the redirect URI — the backend must match that on exchange.
 */
export function openGoogleOAuth(clientId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const codeClient = (
      window as unknown as {
        google?: {
          accounts?: {
            oauth2?: {
              initCodeClient: (config: Record<string, unknown>) => { requestCode: () => void };
            };
          };
        };
      }
    ).google?.accounts?.oauth2?.initCodeClient({
      client_id: clientId,
      scope: "openid email profile",
      ux_mode: "popup",
      callback: (response: { code?: string; error?: string }) => {
        if (response?.error) {
          reject(new Error("Google sign in was cancelled"));
          return;
        }

        if (!response?.code) {
          reject(new Error("Invalid response from Google"));
          return;
        }

        resolve(response.code);
      },
    });

    if (!codeClient) {
      reject(new Error("Google sign in is unavailable. Please reload and try again."));
      return;
    }

    codeClient.requestCode();
  });
}

export function openLinkedInOAuth(clientId: string, redirectUri: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const state = randomState();
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
