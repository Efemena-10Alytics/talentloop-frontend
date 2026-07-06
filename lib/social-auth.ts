import { getApiUrl } from "@/lib/api";

const API_BASE = getApiUrl();

export interface SocialAuthResponse {
  status: string;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      email_verified_at: string | null;
      role: string;
      provider: string;
      provider_id: string;
      stripe_customer_id: string | null;
      created_at: string;
      updated_at: string;
    };
    token: string;
    token_type: string;
    current_enrollment?: {
      id: number;
      status: string;
    } | null;
  };
}

export async function socialLogin(
  provider: "google" | "linkedin",
  access_token: string
): Promise<SocialAuthResponse> {
  const res = await fetch(`${API_BASE}/api/v1/auth/social/${provider}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ access_token }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `${provider} login failed`);
  }

  return data as SocialAuthResponse;
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
