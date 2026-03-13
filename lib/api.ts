// API Configuration and Utilities

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://talentloop-api-production.up.railway.app";

/**
 * Get the base API URL
 */
export const getApiUrl = () => API_BASE_URL;

/**
 * Get headers for unauthenticated requests
 */
export const getHeaders = (): HeadersInit => {
  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };
};

/**
 * Get headers for authenticated requests
 * Includes the authorization token from NextAuth session or localStorage
 */
export const getAuthHeaders = async (): Promise<HeadersInit> => {
  // For client-side, use getSession from next-auth/react or localStorage
  if (typeof window !== "undefined") {
    const { getSession } = await import("next-auth/react");
    const session = await getSession();
    let token = session?.backendToken;

    // Fallback to localStorage if no session token
    if (!token) {
      token = localStorage.getItem("auth_token") || undefined;
    }

    console.log("TOKEN", token);
    
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }
  
  // For server-side, return basic headers
  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };
};

/**
 * Get authentication token from NextAuth session
 */
export const getAuthToken = async (): Promise<string | null> => {
  if (typeof window !== "undefined") {
    const { getSession } = await import("next-auth/react");
    const session = await getSession();
    return session?.backendToken || null;
  }
  return null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getAuthToken();
  return !!token;
};

/**
 * API request wrapper with error handling
 */
export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {},
  requireAuth: boolean = false
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = requireAuth ? await getAuthHeaders() : getHeaders();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
};
