"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (status === "authenticated") {
      toast({
        variant: "default",
        title: "Already logged in",
        description: "You are already signed in.",
      });
      router.replace("/");
    }
  }, [status, router, toast]);

  if (status === "authenticated" || status === "loading") {
    return <div className="min-h-screen bg-[#0B0D0F]" />;
  }

  return <>{children}</>;
}
