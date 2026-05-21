"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import V1SigninForm from "@/components/auth/v1-signin-form";
import OriginalSigninForm from "@/components/auth/original-signin-form";

function SignInContent() {
  const searchParams = useSearchParams();
  const isV1 = searchParams.get("v1") === "true";
  const isEmailVerification = searchParams.get("e_v") === "true";

  if (isV1) {
    return <V1SigninForm isEmailVerification={isEmailVerification} />;
  }

  return <OriginalSigninForm isEmailVerification={isEmailVerification} />;
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0D0F]" />}>
      <SignInContent />
    </Suspense>
  );
}
