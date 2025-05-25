"use client";

import { CompanyProvider } from "../contexts/company-context";
import { InvestorProvider } from "../contexts/investor-context";
import { type ReactNode, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { RoundsProvider } from "@/contexts/rounds-context";

export function Providers({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user exists and onboarding is not completed
    if (user && !user?.publicMetadata?.onboardingCompleted) {
      // Only redirect if not already on the onboarding page

      if (pathname !== "/onboarding") {
        router.push("/onboarding");
      }
    }
    if (user && user?.publicMetadata?.onboardingCompleted) {
      if (pathname === "/onboarding") {
        if (user?.publicMetadata?.role === "investor") {
          router.push(`/investors/${user?.publicMetadata?.companyId}`);
        } else {
          router.push(`/companies/${user?.publicMetadata?.companyId}`);
        }
      }
    }
  }, [pathname, user]);

  return (
    <RoundsProvider>
      <CompanyProvider>
        <InvestorProvider>{children}</InvestorProvider>
      </CompanyProvider>
    </RoundsProvider>
  );
}
