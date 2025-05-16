"use server";

import { revalidatePath } from "next/cache";
import { connect } from "@/lib/mongoDB";
import Event from "@/models/Event";
import { auth } from "@clerk/nextjs/server";

export async function createEvent(formData: FormData) {
  try {
    // Connect to the database
    await connect();

    // Get the current user from Clerk
    const { userId }: any = auth();

    if (!userId) {
      return { error: "You must be logged in to create an event" };
    }

    // Create a new event
    const event = await Event.create({
      title: formData.get("title"),
      description: formData.get("description"),
      type: formData.get("type"),
      date: new Date(formData.get("date") as string),
      time: formData.get("time"),
      location: formData.get("location"),
      attendees: Number(formData.get("attendees")),
      organizer: userId, // Use Clerk's userId directly
    });

    // Revalidate the events page
    revalidatePath("/events");

    return { success: true, eventId: event._id };
  } catch (error: any) {
    console.error("Error creating event:", error);
    return {
      error: error.message || "Failed to create event",
      validationErrors: error.errors,
    };
  }
}

export async function getEvents(type?: string) {
  try {
    await connect();

    const query = type && type !== "all" ? { type } : {};
    const events = await Event.find(query).sort({ date: 1 }).limit(50);

    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}
