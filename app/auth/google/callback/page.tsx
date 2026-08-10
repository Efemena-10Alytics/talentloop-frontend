import { Suspense } from "react";
import SocialCallback, { SocialCallbackScreen } from "@/components/auth/SocialCallback";

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<SocialCallbackScreen>Completing sign in...</SocialCallbackScreen>}>
      <SocialCallback provider="google" />
    </Suspense>
  );
}
