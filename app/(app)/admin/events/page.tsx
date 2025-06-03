import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { events } from "@/lib/mock-data";

function EventCard({ event }: { event: (typeof events)[0] }) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return { variant: "default", label: "Approved" };
      case "pending":
        return { variant: "secondary", label: "Pending" };
      case "rejected":
        return { variant: "destructive", label: "Rejected" };
      default:
        return { variant: "outline", label: "Unknown" };
    }
  };

  const status = getStatusStyle(event.approvalStatus);

  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-slate-200 dark:border-slate-600">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
              {event.title}
            </CardTitle>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline">{event.category}</Badge>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
          {event.description}
        </p>

        <div className="mb-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(event.date).toLocaleDateString()} at {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Max {event.maxAttendees} attendees</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Link href={`/admin/events/${event.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </Link>

          {event.approvalStatus === "pending" && (
            <div className="flex gap-2">
              <Button
                size="sm"
                className="text-white bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button size="sm" variant="destructive">
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminEventsPage() {
  const pendingEvents = events.filter((e) => e.approvalStatus === "pending");
  const approvedEvents = events.filter((e) => e.approvalStatus === "approved");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Event Management</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Review and manage event submissions
            </p>
          </div>
          <Link href="/admin">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 md:grid-cols-3">
          <Card className="text-center">
            <CardContent className="py-6">
              <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold text-orange-600">
                {pendingEvents.length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Pending Review
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="py-6">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-600">
                {approvedEvents.length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Approved Events
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="py-6">
              <XCircle className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <p className="text-2xl font-bold text-red-600">0</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Rejected Events
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Events */}
        {pendingEvents.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl font-semibold">Pending Events</h2>
              <Badge variant="secondary">{pendingEvents.length}</Badge>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pendingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Approved Events */}
        {approvedEvents.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-semibold">Approved Events</h2>
              <Badge variant="default">{approvedEvents.length}</Badge>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {approvedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
