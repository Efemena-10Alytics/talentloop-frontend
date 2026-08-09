import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { getApiUrl } from "@/lib/api";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
      authorization: {
        params: { scope: "openid profile email" },
      },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      id: "social-token",
      name: "Social Token",
      credentials: {
        provider: { label: "Provider", type: "text" },
        access_token: { label: "Access Token", type: "text" },
      },
      async authorize(credentials) {
        // The provider access token is the ONLY thing accepted from the client.
        // Identity (id, email, role) is read from the backend's response to the
        // exchange — never from the request — so a caller cannot mint a session
        // for an arbitrary email or role.
        const provider = credentials?.provider;

        if (provider !== "google" && provider !== "linkedin") {
          throw new Error("Unsupported sign in provider");
        }

        if (!credentials?.access_token) {
          throw new Error("Missing social login credentials");
        }

        const res = await fetch(`${getApiUrl()}/api/v1/auth/social/${provider}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ access_token: credentials.access_token }),
        });

        const body = await res.json().catch(() => null);

        if (!res.ok || !body?.data?.token || !body?.data?.user) {
          // Keep the backend's message server-side; it can carry provider
          // internals that shouldn't reach the browser.
          console.error(`${provider} social login failed`, res.status, body?.message);
          throw new Error(`${provider === "google" ? "Google" : "LinkedIn"} sign in failed`);
        }

        const { user, token, current_enrollment } = body.data;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name || user.email,
          role: user.role || "user",
          status: user.status || "active",
          token,
          hasEnrollment: !!current_enrollment?.id,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const apiUrl = getApiUrl();
          console.log("Attempting login to:", `${apiUrl}/api/v1/auth/login`);
          
          const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          console.log("Login Response Status:", response.status);
          console.log("Login Response Data:", data);

          if (!response.ok) {
            // Handle validation errors
            if (data.errors) {
              const firstErrorField = Object.keys(data.errors)[0];
              const firstErrorMessage = data.errors[firstErrorField][0];
              throw new Error(firstErrorMessage || data.message || "Login failed");
            }
            throw new Error(data.message || "Invalid credentials");
          }

          // Check if we have the expected response structure
          if (!data.user || !data.token) {
            console.error("Unexpected response structure:", data);
            throw new Error("Invalid response from server");
          }

          // v1 API response structure
          return {
            id: data.user.id.toString(),
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            status: data.user.status || "active",
            token: data.token,
          };
        } catch (error: any) {
          console.error("Login error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // For OAuth providers (Google, LinkedIn)
      if (account?.provider === "google" || account?.provider === "linkedin") {
        try {
          // Send OAuth access token to v1 backend
          const endpoint = account.provider === "google" 
            ? `${getApiUrl()}/api/v1/auth/social/google`
            : `${getApiUrl()}/api/v1/auth/social/linkedin`;
          
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({
              access_token: account.access_token,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            console.error("OAuth backend error:", data);
            return false;
          }

          // v1 API response structure for OAuth
          user.token = data.data.token;
          user.role = data.data.user.role;
          user.status = data.data.user.status || "active";
          user.id = data.data.user.id.toString();
          user.hasEnrollment = !!data.data.current_enrollment?.id;

          return true;
        } catch (error) {
          console.error("OAuth sign in error:", error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role || "";
        token.status = user.status || "";
        token.backendToken = user.token || "";
        token.hasEnrollment = user.hasEnrollment ?? false;
      }

      return token;
    },
    async session({ session, token }) {
      // Add custom fields to session
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.status = token.status as string;
        session.backendToken = token.backendToken as string;
        session.hasEnrollment = (token.hasEnrollment as boolean) ?? false;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
