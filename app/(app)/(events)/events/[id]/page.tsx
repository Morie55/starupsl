import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, MapPinIcon, PlusCircle, UsersIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEvents } from "@/app/actions/event-actions";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="container px-6 py-8 mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Upcoming Events
            </h1>
            <p className="mt-1 text-muted-foreground">
              Discover and register for exciting events.
            </p>
          </div>
          <Link href="/events/create">
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No events found. Create your first event to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="flex flex-col overflow-hidden">
                <div className="relative w-full h-48">
                  <Image
                    src={event.imageUrl || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                    {event.category}
                  </Badge>
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xl line-clamp-1">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow p-4 pt-2">
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {new Date(event.startDateTime).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                        {" · "}
                        {new Date(event.startDateTime).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPinIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <UsersIcon className="w-4 h-4 text-muted-foreground" />
                      <span>{event.attendeesLimit} attendees</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/events/${event.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
