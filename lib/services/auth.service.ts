// Authentication Service Functions
import { getApiUrl, getAuthHeaders } from "@/lib/api";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  provider: string | null;
  provider_id: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface GetCurrentUserResponse {
  user: User;
}

/**
 * Login user with email and password
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${getApiUrl()}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

/**
 * Logout current user
 * Clears all storage before calling the logout endpoint
 */
export const logout = async (): Promise<LogoutResponse> => {
  const { clearAuthStorage } = await import("@/lib/auth");
  
  // Clear all storage FIRST before calling endpoint
  clearAuthStorage();
  
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${getApiUrl()}/api/v1/auth/logout`, {
      method: "POST",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Logout failed");
    }

    return data;
  } catch (error) {
    // Even if logout endpoint fails, storage is already cleared
    // Return a success response so the user is redirected to signin
    return { message: "Logged out (storage cleared)" };
  }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (): Promise<GetCurrentUserResponse> => {
  const headers = await getAuthHeaders();
  
  const response = await fetch(`${getApiUrl()}/api/v1/auth/me`, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user");
  }

  return data;
};
