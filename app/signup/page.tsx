"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import V1SignupForm from "@/components/auth/v1-signup-form";
import OriginalSignupForm from "@/components/auth/original-signup-form";


export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0D0F]" />}>
      <SignUpContent />
    </Suspense>
  );
}

function SignUpContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "jobseeker";
  const isEmailVerification = searchParams.get("e_v") === "true";
  const isV1 = searchParams.get("v1") === "true";

  // Render V1 signup form for jobseekers when v1=true
  if (isV1) {
    return <V1SignupForm isEmailVerification={isEmailVerification} />;
  }

  // Render original signup form for all other cases
  return <OriginalSignupForm type={type} isEmailVerification={isEmailVerification} />;
}

