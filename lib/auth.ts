/**
 * Clears all client-side auth state: localStorage, sessionStorage, and the
 * auth-related cookies set by NextAuth. Call this before signOut() so stale
 * tokens and cached data are never left on the device.
 */
export function clearAuthStorage() {
  if (typeof window === "undefined") return;

  // localStorage
  localStorage.removeItem("auth_token");
  localStorage.removeItem("jobseeker_onboarding_progress");
  localStorage.removeItem("coach_onboarding_progress");

  // sessionStorage (payment flow, etc.)
  sessionStorage.clear();

  // NextAuth cookies — remove by setting maxAge=0
  const cookiesToClear = [
    "next-auth.session-token",
    "__Secure-next-auth.session-token",
    "next-auth.csrf-token",
    "__Host-next-auth.csrf-token",
    "next-auth.callback-url",
  ];
  cookiesToClear.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax; Secure`;
  });
}
