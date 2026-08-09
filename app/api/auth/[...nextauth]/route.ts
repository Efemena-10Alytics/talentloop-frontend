import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getApiUrl } from "@/lib/api";

export const authOptions: NextAuthOptions = {
  providers: [
    // Social sign-in runs entirely through this provider. NextAuth's own
    // Google/LinkedIn providers are deliberately absent: nothing called them,
    // and they exposed a second /api/auth/signin/* entry point that handed the
    // backend a raw access token — the credential the backend no longer trusts.
    CredentialsProvider({
      id: "social-token",
      name: "Social Token",
      credentials: {
        provider: { label: "Provider", type: "text" },
        code: { label: "Authorization Code", type: "text" },
      },
      async authorize(credentials) {
        // A one-time authorization code is the ONLY thing accepted from the
        // client. Identity (id, email, role) is read from the backend's response
        // to the exchange — never from the request — so a caller cannot mint a
        // session for an arbitrary email or role.
        const provider = credentials?.provider;

        if (provider !== "google" && provider !== "linkedin") {
          throw new Error("Unsupported sign in provider");
        }

        if (!credentials?.code) {
          throw new Error("Missing social login credentials");
        }

        const res = await fetch(`${getApiUrl()}/api/v1/auth/social/${provider}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ code: credentials.code }),
        });

        const body = await res.json().catch(() => null);

        if (!res.ok || !body?.data?.token || !body?.data?.user) {
          console.error(`${provider} social login failed`, res.status, body?.code, body?.message);

          // Only refusals the backend marks as user-facing get their message
          // forwarded. Anything else (a failed exchange, an unexpected status)
          // is reported generically — those messages can carry provider
          // internals that shouldn't reach the browser.
          const explained = ["provider_email_unverified", "staff_account", "account_inactive"];

          throw new Error(
            explained.includes(body?.code) && body?.message
              ? body.message
              : `${provider === "google" ? "Google" : "LinkedIn"} sign in failed`
          );
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
    async jwt({ token, user }) {
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
