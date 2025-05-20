import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock function to fetch event data - replace with your actual data fetching logic
async function getEvent(id: string) {
  // This is where you would fetch your event data from an API or database
  // For example: return await db.event.findUnique({ where: { id } })

  // Mock data for demonstration
  const events = {
    "1": {
      id: "1",
      title: "Annual Tech Conference",
      description:
        "Join us for our annual tech conference featuring speakers from around the world discussing the latest in technology trends and innovations. Network with industry professionals and gain insights into emerging technologies.",
      date: "2025-06-15",
      time: "09:00 - 18:00",
      location: "Tech Convention Center, San Francisco",
      image: "/placeholder.svg?height=400&width=800",
      type: "In-person",
      attendees: 250,
      organizer: "Tech Events Inc.",
    },
    "2": {
      id: "2",
      title: "Virtual Product Launch",
      description:
        "Be the first to see our new product lineup and exclusive demos. Our virtual product launch will showcase the latest innovations and features that will revolutionize the industry.",
      date: "2025-07-20",
      time: "14:00 - 16:00",
      location: "Online (Zoom)",
      image: "/placeholder.svg?height=400&width=800",
      type: "Virtual",
      attendees: 500,
      organizer: "InnovateTech",
    },
    "3": {
      id: "3",
      title: "Networking Mixer",
      description:
        "Connect with professionals in your industry in a casual setting. Enjoy refreshments while building valuable relationships that can help advance your career and business opportunities.",
      date: "2025-08-10",
      time: "18:00 - 21:00",
      location: "Downtown Lounge, New York",
      image: "/placeholder.svg?height=400&width=800",
      type: "In-person",
      attendees: 75,
      organizer: "Professional Network Group",
    },
  };

  return events[id] || null;
}

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEvent(params.id);

  if (!event) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/events">Back to Events</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Organized by {event.organizer}
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {event.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">About this event</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">
                    {event.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <UsersIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Attendees</p>
                  <p className="text-sm text-muted-foreground">
                    {event.attendees} people attending
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Register Now</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Share this event</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button variant="outline" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="outline" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
