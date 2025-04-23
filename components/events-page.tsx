"use client";

import { Calendar, Filter, MapPin, Plus, Search, Users } from "lucide-react";

import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    id: 1,
    title: "Startup Pitch Night",
    description:
      "Join us for an evening of innovative startup pitches and networking",
    date: "May 15, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Innovation Hub, Freetown",
    type: "In-person",
    attendees: 75,
  },
  {
    id: 2,
    title: "Investor Meetup",
    description: "Connect with active investors in the Sierra Leone ecosystem",
    date: "May 22, 2024",
    time: "2:00 PM - 4:00 PM",
    location: "Virtual",
    type: "Online",
    attendees: 120,
  },
  {
    id: 3,
    title: "Founder Workshop: Fundraising Strategies",
    description:
      "Learn effective strategies for raising capital for your startup",
    date: "June 5, 2024",
    time: "10:00 AM - 12:00 PM",
    location: "StartupSL Office, Freetown",
    type: "In-person",
    attendees: 40,
  },
  {
    id: 4,
    title: "Tech Meetup: AI & Machine Learning",
    description: "Explore the latest trends in AI and machine learning",
    date: "June 12, 2024",
    time: "4:00 PM - 6:00 PM",
    location: "Tech Hub, Bo",
    type: "In-person",
    attendees: 55,
  },
  {
    id: 5,
    title: "Startup Legal Clinic",
    description:
      "Get your legal questions answered by experienced startup attorneys",
    date: "June 18, 2024",
    time: "1:00 PM - 5:00 PM",
    location: "StartupSL Office, Freetown",
    type: "In-person",
    attendees: 30,
  },
  {
    id: 6,
    title: "Women in Tech Panel Discussion",
    description: "Join leading women entrepreneurs for an inspiring discussion",
    date: "June 25, 2024",
    time: "3:00 PM - 5:00 PM",
    location: "Virtual",
    type: "Online",
    attendees: 150,
  },
];

export function EventsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:gap-8 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            Connect with the startup community
          </p>
        </div>
        {/* <div className="flex items-center gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>
            Browse and register for upcoming events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="sm" className="md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="in-person">In-person</TabsTrigger>
                <TabsTrigger value="online">Online</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {events.map((event) => (
                    <Card key={event.id} className="flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {event.title}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {event.description}
                            </CardDescription>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              event.type === "In-person"
                                ? "border-green-500 text-green-500"
                                : "border-blue-500 text-blue-500"
                            }
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
              <TabsContent value="in-person" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {events
                    .filter((e) => e.type === "In-person")
                    .map((event) => (
                      <Card key={event.id} className="flex flex-col">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">
                                {event.title}
                              </CardTitle>
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
              <TabsContent value="online" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {events
                    .filter((e) => e.type === "Online")
                    .map((event) => (
                      <Card key={event.id} className="flex flex-col">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">
                                {event.title}
                              </CardTitle>
                              <CardDescription className="mt-1">
                                {event.description}
                              </CardDescription>
                            </div>
                            <Badge
                              variant="outline"
                              className="border-blue-500 text-blue-500"
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
        </CardContent>
      </Card>
    </div>
  );
}
