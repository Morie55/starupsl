"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Define Event type
export type Event = {
  id: string;
  title: string;
  description: string;
  type: "In-person" | "Virtual" | "Hybrid";
  date: string;
  time: string;
  location: string;
  attendees: number;
  image?: string;
  organizer?: string;
};

// In-memory storage for demo purposes
// In a real app, you would use a database
let events: Event[] = [
  {
    id: "1",
    title: "Annual Tech Conference",
    description:
      "Join us for our annual tech conference featuring speakers from around the world discussing the latest in technology trends and innovations.",
    type: "In-person",
    date: "2025-06-15",
    time: "09:00 - 18:00",
    location: "Tech Convention Center, San Francisco",
    attendees: 250,
    image: "/placeholder.svg?height=400&width=800",
    organizer: "Tech Events Inc.",
  },
  {
    id: "2",
    title: "Virtual Product Launch",
    description:
      "Be the first to see our new product lineup and exclusive demos. Our virtual product launch will showcase the latest innovations and features.",
    type: "Virtual",
    date: "2025-07-20",
    time: "14:00 - 16:00",
    location: "Online (Zoom)",
    attendees: 500,
    image: "/placeholder.svg?height=400&width=800",
    organizer: "InnovateTech",
  },
  {
    id: "3",
    title: "Networking Mixer",
    description:
      "Connect with professionals in your industry in a casual setting. Enjoy refreshments while building valuable relationships.",
    type: "In-person",
    date: "2025-08-10",
    time: "18:00 - 21:00",
    location: "Downtown Lounge, New York",
    attendees: 75,
    image: "/placeholder.svg?height=400&width=800",
    organizer: "Professional Network Group",
  },
];

// Event validation schema
const eventSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  type: z.enum(["In-person", "Virtual", "Hybrid"]),
  date: z.string().min(1, { message: "Date is required." }),
  time: z.string().min(1, { message: "Time is required." }),
  location: z
    .string()
    .min(3, { message: "Location must be at least 3 characters." }),
  attendees: z.coerce
    .number()
    .min(1, { message: "At least 1 attendee is required." }),
  image: z.string().optional(),
  organizer: z.string().optional(),
});

// Server action to get all events
export async function getEvents() {
  // In a real app, you would fetch from a database
  // Example with Prisma: return await prisma.event.findMany()
  // Example with Supabase: return await supabase.from('events').select('*')

  return events;
}

// Server action to get a single event by ID
export async function getEvent(id: string) {
  // In a real app, you would fetch from a database
  // Example with Prisma: return await prisma.event.findUnique({ where: { id } })
  // Example with Supabase: return await supabase.from('events').select('*').eq('id', id).single()

  return events.find((event) => event.id === id) || null;
}

// Server action to create a new event
export async function createEvent(formData: FormData) {
  // Parse and validate form data
  const rawData = Object.fromEntries(formData.entries());

  // Convert date object to string if needed
  if (rawData.date instanceof Date) {
    rawData.date = rawData.date.toISOString().split("T")[0];
  }

  try {
    const validatedData = eventSchema.parse(rawData);

    // Generate a new ID (in a real app, your database would handle this)
    const newId = (events.length + 1).toString();

    // Create the new event
    const newEvent: Event = {
      id: newId,
      ...validatedData,
      organizer: validatedData.organizer || "Event Organizer",
    };

    // In a real app, you would save to a database
    // Example with Prisma: await prisma.event.create({ data: newEvent })
    // Example with Supabase: await supabase.from('events').insert(newEvent)

    // For demo, add to our in-memory array
    events.push(newEvent);

    // Revalidate the events page to show the new event
    revalidatePath("/events");

    // Redirect to the events page
    redirect("/events");
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return { success: false, errors: error.errors };
    }

    // Return generic error
    return { success: false, errors: [{ message: "Failed to create event" }] };
  }
}

// Server action to update an existing event
export async function updateEvent(id: string, formData: FormData) {
  // Parse and validate form data
  const rawData = Object.fromEntries(formData.entries());

  // Convert date object to string if needed
  if (rawData.date instanceof Date) {
    rawData.date = rawData.date.toISOString().split("T")[0];
  }

  try {
    const validatedData = eventSchema.parse(rawData);

    // In a real app, you would update in a database
    // Example with Prisma: await prisma.event.update({ where: { id }, data: validatedData })
    // Example with Supabase: await supabase.from('events').update(validatedData).eq('id', id)

    // For demo, update our in-memory array
    const eventIndex = events.findIndex((event) => event.id === id);
    if (eventIndex !== -1) {
      events[eventIndex] = { ...events[eventIndex], ...validatedData };
    } else {
      return { success: false, errors: [{ message: "Event not found" }] };
    }

    // Revalidate the events pages
    revalidatePath("/events");
    revalidatePath(`/events/${id}`);

    // Redirect to the event detail page
    redirect(`/events/${id}`);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return { success: false, errors: error.errors };
    }

    // Return generic error
    return { success: false, errors: [{ message: "Failed to update event" }] };
  }
}

// Server action to delete an event
export async function deleteEvent(id: string) {
  try {
    // In a real app, you would delete from a database
    // Example with Prisma: await prisma.event.delete({ where: { id } })
    // Example with Supabase: await supabase.from('events').delete().eq('id', id)

    // For demo, remove from our in-memory array
    events = events.filter((event) => event.id !== id);

    // Revalidate the events page
    revalidatePath("/events");

    // Return success
    return { success: true };
  } catch (error) {
    // Return error
    return { success: false, error: "Failed to delete event" };
  }
}

// Server action to register for an event
export async function registerForEvent(eventId: string, formData: FormData) {
  // In a real app, you would save registration to a database
  // and handle user authentication

  try {
    // For demo, just log the registration
    console.log(
      `Registered for event ${eventId}`,
      Object.fromEntries(formData.entries())
    );

    // Return success
    return { success: true, message: "Registration successful" };
  } catch (error) {
    // Return error
    return { success: false, error: "Failed to register for event" };
  }
}
