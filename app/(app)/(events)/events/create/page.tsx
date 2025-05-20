"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { createEvent } from "@/app/actions/event-actions";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  type: z.enum(["In-person", "Virtual", "Hybrid"]),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string().min(1, {
    message: "Please enter a valid time.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  attendees: z.coerce.number().min(1, {
    message: "At least 1 attendee is required.",
  }),
  organizer: z.string().optional(),
});

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "In-person",
      time: "",
      location: "",
      attendees: 10,
      organizer: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setServerErrors(null);

    try {
      // Convert form data to FormData for server action
      const formData = new FormData();

      // Add all form values to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof Date) {
          formData.append(key, value.toISOString().split("T")[0]);
        } else if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      // Add a default image
      formData.append("image", "/placeholder.svg?height=400&width=800");

      // Call the server action
      const result = await createEvent(formData);

      if (result && !result.success) {
        setServerErrors(result.errors);
        setIsSubmitting(false);
      }

      // The server action handles redirection on success
    } catch (error) {
      console.error("Error creating event:", error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-8 px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Event</CardTitle>
          <CardDescription>
            Fill out the form below to create a new event for your organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {serverErrors && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-6">
              <p className="font-semibold">
                There was a problem with your submission:
              </p>
              <ul className="list-disc list-inside">
                {serverErrors.map((error: any, index: number) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Annual Conference 2025" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of your event as it will appear to attendees.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Join us for our annual conference featuring industry experts and networking opportunities."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A brief description of your event.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="In-person">In-person</SelectItem>
                          <SelectItem value="Virtual">Virtual</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The format of your event.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="attendees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Attendees</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Input type="number" min={1} {...field} />
                          <Users className="ml-2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormDescription>
                        The maximum number of people who can attend.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Event Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        The date when your event will take place.
                      </FormDescription>
                      <FormMessage />
                      {field.value && (
                        <input
                          type="hidden"
                          name="date"
                          value={format(field.value, "yyyy-MM-dd")}
                        />
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Time</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Input placeholder="6:00 PM - 9:00 PM" {...field} />
                          <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormDescription>
                        The time when your event will take place.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Location</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          placeholder="Convention Center, 123 Main St, City"
                          {...field}
                        />
                        <MapPin className="ml-2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The address or virtual link for your event.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organizer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organizer</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Organization Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of the person or organization hosting this event.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Submit Event"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
