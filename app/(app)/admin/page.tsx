import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Users,
  Clock,
  AlertCircle,
  TrendingUp,
  Eye,
} from "lucide-react";
import { events, investors, adminStats } from "@/lib/mock-data";

export default function AdminDashboard() {
  const pendingEvents = events.filter((e) => e.approvalStatus === "pending");
  const pendingInvestors = investors.filter(
    (i) => i.approvalStatus === "pending"
  );

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div>
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Manage events, investors, and system approvals
            </p>
          </div>
        </div>
      </header>

      <main className="px-6 py-10 mx-auto space-y-10 max-w-7xl">
        {/* Stats Overview */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Pending Events",
              value: adminStats.pendingEvents,
              icon: <Clock className="w-8 h-8 text-orange-500" />,
              color: "text-orange-500",
            },
            {
              label: "Pending Investors",
              value: adminStats.pendingInvestors,
              icon: <Users className="w-8 h-8 text-orange-500" />,
              color: "text-orange-500",
            },
            {
              label: "Total Events",
              value: adminStats.totalEvents,
              icon: <Calendar className="w-8 h-8 text-emerald-500" />,
              color: "text-emerald-500",
            },
            {
              label: "Total Investors",
              value: adminStats.totalInvestors,
              icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
              color: "text-emerald-500",
            },
          ].map(({ label, value, icon, color }, idx) => (
            <Card key={idx} className="bg-white shadow-sm dark:bg-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {label}
                    </p>
                    <p className={`text-3xl font-bold ${color}`}>{value}</p>
                  </div>
                  {icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="grid gap-8 lg:grid-cols-2">
          {/* Pending Events */}
          <Card className="bg-white shadow-sm dark:bg-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Pending Events
                </CardTitle>
                <Link href="/admin/events">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {pendingEvents.length ? (
                <div className="space-y-4">
                  {pendingEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 rounded-md bg-slate-100 dark:bg-slate-700"
                    >
                      <div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {event.category} •{" "}
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Link href={`/admin/events/${event.id}`}>
                        <Button size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-slate-500">
                  No pending events
                </p>
              )}
            </CardContent>
          </Card>

          {/* Pending Investors */}
          <Card className="bg-white shadow-sm dark:bg-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Pending Investors
                </CardTitle>
                <Link href="/admin/investors">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {pendingInvestors.length ? (
                <div className="space-y-4">
                  {pendingInvestors.slice(0, 3).map((investor) => (
                    <div
                      key={investor.id}
                      className="flex items-center justify-between p-4 rounded-md bg-slate-100 dark:bg-slate-700"
                    >
                      <div>
                        <h4 className="font-semibold">{investor.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {investor.company} • {investor.investmentRange}
                        </p>
                      </div>
                      <Link href={`/admin/investors/${investor.id}`}>
                        <Button size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-slate-500">
                  No pending investors
                </p>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
