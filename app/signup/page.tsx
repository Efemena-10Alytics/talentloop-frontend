"use client";

import { Suspense } from "react";
import V1SignupForm from "@/components/auth/v1-signup-form";
import AuthGuard from "@/components/auth/AuthGuard";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0D0F]" />}>
      <AuthGuard>
        <V1SignupForm />
      </AuthGuard>
    </Suspense>
  );
}

