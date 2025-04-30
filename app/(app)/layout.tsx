"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  Calendar,
  Download,
  FileText,
  Home,
  Info,
  Layers,
  Menu,
  TrendingUp,
  Users,
  X,
  Search,
  Bell,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Sectors", href: "/sectors", icon: Layers },
  { name: "Companies", href: "/companies", icon: Building2 },
  { name: "Investors", href: "/investors", icon: Users },
  { name: "Funding Rounds", href: "/rounds", icon: TrendingUp },
  { name: "Downloads", href: "/downloads", icon: Download },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "About", href: "/about", icon: Info },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const { user } = useUser();

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <img
                  src="/images/startup-sl_logos.png"
                  alt="StartUp-SL Logo"
                  className="h-full w-full object-contain rounded-md"
                />
              </div>
              <span className="text-xl font-bold">StartUp-SL</span>
            </Link>
          </div>

          {/* Centered and Responsive Search bar in navbar */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search companies, investors, startups..."
                className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>

          {user ? (
            <div className="ml-auto flex items-center gap-4 justify-between">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
                <span className="sr-only">Notifications</span>
              </Button>
              {/* <ModeToggle /> */}
              <ThemeToggle />
              <UserButton />
            </div>
          ) : (
            <div className="ml-auto flex items-center gap-4 justify-between">
              <Button size="sm">Sign In</Button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTitle className=""></SheetTitle>
          <SheetContent side="left" className="p-0 sm:max-w-xs">
            <nav className="flex h-full flex-col border-r bg-muted/40">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md">
                    {/* <FileText className="h-4 w-4" /> */}
                    <img
                      src="/images/startup-sl_logos.png"
                      alt="StartUp-SL Logo"
                      className="h-full w-full object-contain rounded-md"
                    />
                  </div>
                  <span className="text-lg font-bold">StartUpSL</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                >
                  {/* <X className="h-5 w-5" /> */}
                  <span className="sr-only">Close sidebar</span>
                </Button>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <div className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <aside className="hidden fixed h-full w-64 flex-col border-r bg-muted/40 lg:flex">
          <div className="flex-1 overflow-auto py-4">
            <div className="space-y-1 px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 md:ml-64 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
