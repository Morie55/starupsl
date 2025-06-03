"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, Calendar, MapPin, Users, Clock } from "lucide-react";

// Mock authentication components
const UserButton = () => (
  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200">
    <span className="text-sm font-medium">DU</span>
  </div>
);

const SignedIn = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
const SignedOut = ({ children }: { children: React.ReactNode }) => <></>;
const SignInButton = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

// Remove the server action and replace with client-side function
async function createEvent(formData: FormData) {
  // This would typically:
  // 1. Validate the form data
  // 2. Send to API endpoint
  // 3. Redirect to the event page

  // Extract form data
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;

  console.log("Creating event:", { title, description, date, time });

  // In a real app, we would call an API endpoint here
  // For now, we'll just simulate success
  return { success: true };
}

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      await createEvent(formData);
      // Redirect on success
      router.push("/events");
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-800">
      {/* Header remains the same */}
      <header className="px-6 py-4 bg-white border-b dark:bg-slate-800 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/events"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl px-6 py-8 mx-auto">
        <SignedOut>
          <Card className="p-8 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <h2 className="mb-2 text-2xl font-bold text-slate-900">
              Sign In Required
            </h2>
            <p className="mb-6 text-slate-600">
              You need to be signed in to create an event.
            </p>
            <SignInButton>
              <Button size="lg">Sign In to Continue</Button>
            </SignInButton>
          </Card>
        </SignedOut>

        <SignedIn>
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-200">
              Create New Event
            </h1>
            <p className="text-slate-600 dark:text-slate-200">
              Share your event with the StartUp-SL community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Rest of the form content remains exactly the same */}
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Brief description of your event (max 200 characters)"
                    maxLength={200}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="fullDescription">Full Description</Label>
                  <Textarea
                    id="fullDescription"
                    name="fullDescription"
                    placeholder="Detailed description of your event, agenda, what attendees can expect..."
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select name="category">
                    <SelectTrigger>
                      <SelectValue placeholder="Select event category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="meetup">Meetup</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="Enter tags separated by commas (e.g., startups, tech, funding)"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="date">Event Date *</Label>
                  <Input id="date" name="date" type="date" required />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="time">Start Time *</Label>
                    <Input id="time" name="time" type="time" required />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input id="endTime" name="endTime" type="time" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="location">Venue Name *</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Freetown Innovation Hub"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Full Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Street address, city, country"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Capacity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Capacity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="maxAttendees">Maximum Attendees *</Label>
                  <Input
                    id="maxAttendees"
                    name="maxAttendees"
                    type="number"
                    placeholder="e.g., 100"
                    min="1"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Event"}
              </Button>
              <Link href="/events">
                <Button type="button" variant="outline" size="lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </SignedIn>
      </div>
    </div>
  );
}
