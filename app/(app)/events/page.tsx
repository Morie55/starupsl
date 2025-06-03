import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Calendar, MapPin, Users, Plus, Clock } from "lucide-react";
import { events } from "@/lib/mock-data";

function EventCard({ event }: { event: (typeof events)[0] }) {
  const isUpcoming = event.status === "upcoming";

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="mb-2 text-xl">{event.title}</CardTitle>
            <div className="flex gap-2 mb-2">
              <Badge variant={isUpcoming ? "default" : "secondary"}>
                {event.category}
              </Badge>
              <Badge variant={isUpcoming ? "outline" : "secondary"}>
                {isUpcoming ? "Upcoming" : "Completed"}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-slate-600 dark:text-slate-200">
          {event.description}
        </p>

        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-200">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(event.date).toLocaleDateString()} at {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-200">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-200">
            <Users className="w-4 h-4" />
            <span>
              {event.attendees}/{event.maxAttendees} attendees
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link href={`/events/${event.id}`}>
            <Button variant="outline">View Details</Button>
          </Link>
          {isUpcoming && <Button>Register</Button>}
        </div>
      </CardContent>
    </Card>
  );
}

export default function EventsPage() {
  // Only show approved events to regular users
  const approvedEvents = events.filter(
    (event) => event.approvalStatus === "approved"
  );
  const upcomingEvents = approvedEvents.filter(
    (event) => event.status === "upcoming"
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-slate-200 dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
                Events
              </h1>
              <p className="text-slate-600 dark:text-slate-200">
                Discover and join startup ecosystem events
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/events/create">
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Event
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        {/* Upcoming Events */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-emerald-600" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
              Upcoming Events
            </h2>
            <Badge variant="secondary">{upcomingEvents.length}</Badge>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="mb-2 text-lg font-medium text-slate-900">
                No upcoming events
              </h3>
              <p className="mb-4 text-slate-600">
                Be the first to create an event for the community!
              </p>
              <Link href="/events/create">
                <Button>Create Event</Button>
              </Link>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
