import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      status: string;
    } & DefaultSession["user"];
    backendToken: string;
    hasEnrollment: boolean;
  }

  interface User {
    id: string;
    email: string;
    role?: string;
    status?: string;
    token?: string;
    hasEnrollment?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: string;
    status: string;
    backendToken: string;
    hasEnrollment: boolean;
  }
}
