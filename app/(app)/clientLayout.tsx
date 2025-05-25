"use client";

import type React from "react";

import { useUser } from "@clerk/nextjs";
import { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  Calendar,
  Download,
  Home,
  Info,
  Layers,
  Menu,
  TrendingUp,
  Users,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationBell } from "@/components/notification-bell";
import { User } from "@clerk/nextjs/server";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Sectors", href: "/sectors", icon: Layers },
  { name: "Companies", href: "/companies", icon: Building2 },
  { name: "Investors", href: "/investors", icon: Users },
  { name: "Funding Rounds", href: "/rounds", icon: TrendingUp },
  { name: "Downloads", href: "/downloads", icon: Download },
  { name: "Admin", href: "/", icon: Download },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "About", href: "/about", icon: Info },
];

interface RootLayoutProps {
  children: React.ReactNode;
  notifications?: any[];
  unreadCount?: number;
}

export default function ClientLayout({
  children,
  notifications = [],
  unreadCount = 0,
}: RootLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;
  if (!user) return null; // Handle unauthenticated state if needed

  const handleNewNotification = (notification: any) => {
    // Optional: handle new notification logic
  };

  return (
    <div>
      {/* Header */}
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

          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <img
                src="/images/startup-sl_logos2.png"
                alt="StartUp-SL Logo"
                className="h-full w-full object-contain rounded-md"
              />
            </div>
            <span className="text-xl font-bold">StartUp-SL</span>
          </Link>

          <div className="hidden md:flex flex-1 justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
                type="search"
                placeholder="Search companies, investors, startups..."
                className="h-11 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-white/10 backdrop-blur-md pl-11 pr-4 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm transition-all duration-300 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:ring-offset-0"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4 justify-between">
            <Button variant="ghost" size="icon" className="relative">
              <NotificationBell
                userId={user.id}
                initialNotifications={notifications}
                unreadCount={unreadCount}
                onNewNotification={handleNewNotification}
              />
              <span className="sr-only">Notifications</span>
            </Button>
            <ThemeToggle />
            <UserButton />
          </div>
        </div>
      </header>

      {/* Sidebar and Main */}
      <div className="flex flex-1">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 sm:max-w-xs">
            <nav className="flex h-full flex-col border-r bg-muted/40">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2">
                  <img
                    src="/images/startup-sl_logos2.png"
                    alt="StartUp-SL Logo"
                    className="h-8 w-8 object-contain rounded-md"
                  />
                  <span className="text-lg font-bold">StartUpSL</span>
                </Link>
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

        <main className="flex-1 md:ml-64 overflow-auto">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
