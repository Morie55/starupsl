"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  content?: string;
  startupId?: string;
  roundId?: string;
  roundType?: string;
  amount?: string;
}

interface NotificationBellProps {
  initialNotifications?: Notification[];
  onNewNotification?: (notification: Notification) => void;
}

export function NotificationBell({
  initialNotifications = [],
  onNewNotification,
}: NotificationBellProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Simulate receiving a new notification every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const startupNames = ["TechStart", "GreenEnergy", "HealthAI", "EduTech"];
      const roundTypes = ["Seed", "Series A", "Series B", "Pre-seed"];
      const startupName =
        startupNames[Math.floor(Math.random() * startupNames.length)];
      const roundType =
        roundTypes[Math.floor(Math.random() * roundTypes.length)];
      const amount = `$${(Math.floor(Math.random() * 10) + 1) * 500000}`;

      const newNotification = {
        id: `notification-${Date.now()}`,
        title: "New funding round",
        message: `${startupName} has created a new ${roundType} funding round`,
        timestamp: new Date(),
        read: false,
        content: `${startupName} is raising ${amount} in their ${roundType} round. They're looking for investors to help them scale their operations and expand to new markets.`,
        startupId: `startup-${Math.floor(Math.random() * 1000)}`,
        roundId: `round-${Math.floor(Math.random() * 1000)}`,
        roundType,
        amount,
      };

      setNotifications((prev) => [newNotification, ...prev]);

      if (onNewNotification) {
        onNewNotification(newNotification);
      }

      toast({
        title: newNotification.title,
        description: newNotification.message,
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [onNewNotification]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Replace the handleNotificationClick function with this direct navigation version
  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);

    // If the notification has roundId and startupId, navigate to the specific round page
    if (notification.roundId && notification.startupId) {
      window.location.href = `/startups/${notification.startupId}/rounds/${notification.roundId}?role=investor`;
    } else if (notification.startupId) {
      // If only startupId is available, navigate to the startup page
      window.location.href = `/startups/${notification.startupId}?role=investor`;
    }

    setOpen(false); // Close the popover
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";

    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h4 className="font-semibold">Notifications</h4>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs text-muted-foreground"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
          <ScrollArea className="h-[300px]">
            {notifications.length > 0 ? (
              <div className="flex flex-col">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    className={cn(
                      "flex flex-col gap-1 border-b p-4 text-left transition-colors hover:bg-muted/50",
                      !notification.read && "bg-muted/50"
                    )}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center p-8">
                <p className="text-center text-sm text-muted-foreground">
                  No notifications yet
                </p>
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </>
  );
}
