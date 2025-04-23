import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
// import { currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "StartUp SL Project",
  description: "Created with v0",
  generator: "v0.dev",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = await currentUser();

  // if (user) {
  //   if (!user.publicMetadata.onboardingCompleted) {
  //     redirect("/onboarding");
  //   }
  // }

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>{children}</Providers>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
