"use server";

import { revalidatePath } from "next/cache";
import { connect } from "@/lib/mongoDB";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Notification, { INotification } from "@/models/Notification";
import { Types } from "mongoose";

// Get notifications for a user
export async function getUserNotifications(
  userId: string,
  options: { limit?: number; skip?: number; read?: boolean } = {}
) {
  try {
    await connect();

    const { limit = 50, skip = 0, read } = options;

    // Build query
    const query: any = { userId };
    if (read !== undefined) {
      query.read = read;
    }

    // Fetch notifications
    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get unread count
    const unreadCount = await Notification.countDocuments({
      userId,
      read: false,
    });

    return {
      notifications: notifications.map((n) => ({
        ...n,
        id: n._id.toString(),
        timestamp: n.createdAt,
      })),
      unreadCount,
    };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
}

// Mark a notification as read
export async function markNotificationAsRead(notificationId: string) {
  try {
    await connect();

    await Notification.findByIdAndUpdate(notificationId, { read: true });

    revalidatePath("/dashboard");
    revalidatePath("/notifications");

    return { success: true };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw new Error("Failed to mark notification as read");
  }
}

// Mark all notifications as read for a user
export async function markAllNotificationsAsRead(userId: string) {
  try {
    await connect();

    const result = await Notification.updateMany(
      { userId, read: false },
      { read: true }
    );

    revalidatePath("/dashboard");
    revalidatePath("/notifications");

    return { success: true, count: result.modifiedCount };
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw new Error("Failed to mark all notifications as read");
  }
}

// Create a notification
export async function createNotification(data: {
  userId: string;
  title: string;
  message: string;
  content?: string;
  startupId?: string;
  roundId?: string;
  roundType?: string;
  amount?: string;
}) {
  try {
    await connect();

    const notification = new Notification({
      ...data,
      read: false,
    });

    await notification.save();

    revalidatePath("/dashboard");
    revalidatePath("/notifications");

    return {
      success: true,
      notification: {
        ...notification.toObject(),
        id: (notification._id as Types.ObjectId).toString(),
        timestamp: notification.createdAt,
      },
    };
  } catch (error) {
    console.error("Error creating notification:", error);
    throw new Error("Failed to create notification");
  }
}

// Delete a notification
export async function deleteNotification(notificationId: string) {
  try {
    await connect();

    await Notification.findByIdAndDelete(notificationId);

    revalidatePath("/dashboard");
    revalidatePath("/notifications");

    return { success: true };
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw new Error("Failed to delete notification");
  }
}
