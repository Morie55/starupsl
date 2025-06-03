import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  Share2,
  Heart,
} from "lucide-react";
import { notFound } from "next/navigation";
import { events, userRegisteredEvents } from "@/lib/mock-data";

export default function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const event = events.find((e) => e.id === Number.parseInt(params.id));

  if (!event || event.approvalStatus !== "approved") {
    notFound();
  }

  const isUpcoming = event.status === "upcoming";
  const eventDate = new Date(event.date);
  const isRegistered = userRegisteredEvents.includes(event.id);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Link
              href="/events"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl px-6 py-8 mx-auto">
        {/* Event Header */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <Badge variant={isUpcoming ? "default" : "secondary"}>
              {event.category}
            </Badge>
            <Badge variant={isUpcoming ? "outline" : "secondary"}>
              {isUpcoming ? "Upcoming" : "Completed"}
            </Badge>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-slate-900">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-6 mb-6 text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>
                {eventDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>
                {event.time} - {event.endTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>
                {event.attendees}/{event.maxAttendees} attendees
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {isUpcoming && (
              <Button
                size="lg"
                className={
                  isRegistered ? "bg-green-600 hover:bg-green-700" : ""
                }
              >
                {isRegistered ? "Registered ✓" : "Register for Event"}
              </Button>
            )}
            <Button variant="outline" size="lg">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-slate-600">{event.description}</p>
                <p className="text-slate-600">{event.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Speakers & Panelists</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {event.speakers.map((speaker, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-lg bg-slate-50"
                      >
                        <Avatar>
                          <AvatarImage
                            src={speaker.avatar || "/placeholder.svg"}
                            alt={speaker.name}
                          />
                          <AvatarFallback>
                            {speaker.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-slate-900">
                            {speaker.name}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {speaker.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-1 font-medium text-slate-900">
                    Date & Time
                  </h4>
                  <p className="text-slate-600">
                    {eventDate.toLocaleDateString()}
                  </p>
                  <p className="text-slate-600">
                    {event.time} - {event.endTime}
                  </p>
                </div>

                <div>
                  <h4 className="mb-1 font-medium text-slate-900">Location</h4>
                  <p className="text-slate-600">{event.location}</p>
                  <p className="text-sm text-slate-500">{event.address}</p>
                </div>

                <div>
                  <h4 className="mb-1 font-medium text-slate-900">Capacity</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-slate-200">
                      <div
                        className="h-2 rounded-full bg-emerald-500"
                        style={{
                          width: `${
                            (event.attendees / event.maxAttendees) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-slate-600">
                      {event.attendees}/{event.maxAttendees}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizer */}
            <Card>
              <CardHeader>
                <CardTitle>Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={event.organizer.avatar || "/placeholder.svg"}
                      alt={event.organizer.name}
                    />
                    <AvatarFallback>
                      {event.organizer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      {event.organizer.name}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {event.organizer.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
