import { Calendar, MapPin, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data - in a real app, this would come from a database
const events = [
  {
    id: 1,
    title: "Annual Tech Conference",
    description:
      "Join us for our annual tech conference featuring industry experts and networking opportunities.",
    type: "In-person",
    date: "May 20, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center, San Francisco",
    attendees: 250,
  },
  {
    id: 2,
    title: "Product Launch",
    description:
      "Be the first to see our new product line and meet the team behind it.",
    type: "In-person",
    date: "June 15, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "Downtown Gallery, New York",
    attendees: 120,
  },
  {
    id: 3,
    title: "Leadership Workshop",
    description:
      "A hands-on workshop focused on developing leadership skills for the modern workplace.",
    type: "In-person",
    date: "July 8, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Business Center, Chicago",
    attendees: 50,
  },
];

export default function EventsPage() {
  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button asChild>
          <a href="events/create-event">Create Event</a>
        </Button>
      </div>

      <Tabs defaultValue="in-person" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="in-person">In-person</TabsTrigger>
          <TabsTrigger value="virtual">Virtual</TabsTrigger>
          <TabsTrigger value="all">All Events</TabsTrigger>
        </TabsList>

        <TabsContent value="in-person" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events
              .filter((e) => e.type === "In-person")
              .map((event) => (
                <Card key={event.id} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {event.description}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-green-500 text-green-500"
                      >
                        {event.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        {event.date} • {event.time}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="mr-2 h-4 w-4" />
                        {event.attendees} attendees
                      </div>
                    </div>
                    <div className="mt-auto pt-4">
                      <Button className="w-full">Register</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="virtual" className="mt-4">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">
              No virtual events available at this time.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {event.description}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-green-500 text-green-500"
                    >
                      {event.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {event.date} • {event.time}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="mr-2 h-4 w-4" />
                      {event.attendees} attendees
                    </div>
                  </div>
                  <div className="mt-auto pt-4">
                    <Button className="w-full">Register</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
