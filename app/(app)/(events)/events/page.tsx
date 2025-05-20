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
    <div className="container mx-auto py-8 px-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Upcoming Events
            </h1>
            <p className="text-muted-foreground mt-1">
              Discover and register for exciting events.
            </p>
          </div>
          <Link href="/events/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No events found. Create your first event to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden flex flex-col">
                <div className="relative h-48 w-full">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                    {event.type}
                  </Badge>
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="line-clamp-1 text-xl">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2 flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {" · "}
                        {event.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <UsersIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{event.attendees} attendees</span>
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
