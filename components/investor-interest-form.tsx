"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

export default function InvestorInterestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Interest submitted",
        description:
          "Your investment interest has been submitted successfully. We'll be in touch soon.",
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 p-6 md:gap-8 md:p-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/companies">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to companies</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Investor Interest Form
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-3 lg:gap-8">
        {/* Main form content */}
        <div className="md:col-span-4 lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Investment Interest</CardTitle>
                <CardDescription>
                  Please provide your information and investment preferences to
                  express interest in this company.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Investor Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Investor Information</h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="investor-type">Investor Type</Label>
                      <RadioGroup
                        defaultValue="individual"
                        id="investor-type"
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="individual" id="individual" />
                          <Label htmlFor="individual">Individual</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="organization"
                            id="organization"
                          />
                          <Label htmlFor="organization">Organization</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="investor-name">
                        Full Name / Organization Name
                      </Label>
                      <Input
                        id="investor-name"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Investment Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Investment Details</h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="investment-range">Investment Range</Label>
                      <Select required>
                        <SelectTrigger id="investment-range">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-10k">
                            Under $10,000
                          </SelectItem>
                          <SelectItem value="10k-50k">
                            $10,000 - $50,000
                          </SelectItem>
                          <SelectItem value="50k-100k">
                            $50,000 - $100,000
                          </SelectItem>
                          <SelectItem value="100k-500k">
                            $100,000 - $500,000
                          </SelectItem>
                          <SelectItem value="500k-1m">
                            $500,000 - $1 million
                          </SelectItem>
                          <SelectItem value="over-1m">
                            Over $1 million
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="investment-timeline">
                        Investment Timeline
                      </Label>
                      <Select required>
                        <SelectTrigger id="investment-timeline">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">
                            Immediate (0-3 months)
                          </SelectItem>
                          <SelectItem value="short">
                            Short-term (3-6 months)
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium-term (6-12 months)
                          </SelectItem>
                          <SelectItem value="long">
                            Long-term (12+ months)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investment-goals">Investment Goals</Label>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="goal-growth" />
                        <Label htmlFor="goal-growth">Growth</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="goal-income" />
                        <Label htmlFor="goal-income">Income</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="goal-diversification" />
                        <Label htmlFor="goal-diversification">
                          Diversification
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="goal-impact" />
                        <Label htmlFor="goal-impact">Impact Investing</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prior-experience">
                      Prior Investment Experience
                    </Label>
                    <Select>
                      <SelectTrigger id="prior-experience">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="limited">
                          Limited (1-2 investments)
                        </SelectItem>
                        <SelectItem value="moderate">
                          Moderate (3-5 investments)
                        </SelectItem>
                        <SelectItem value="experienced">
                          Experienced (6+ investments)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Additional Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="questions">Questions or Comments</Label>
                    <Textarea
                      id="questions"
                      placeholder="Please share any questions or additional information about your investment interest"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm font-normal leading-snug text-muted-foreground"
                      >
                        I agree to the terms and conditions and understand that
                        my information will be used as described in the privacy
                        policy.
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="ml-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Interest"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-3 lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About This Company</CardTitle>
              <CardDescription>
                Key information about the investment opportunity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Company Name
                </h3>
                <p>Morie Keita</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Sector
                </h3>
                <p>Energy</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Stage
                </h3>
                <p>Pre-Seed</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Funding Needed
                </h3>
                <p>$100,000</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Founded
                </h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>April 2, 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal pl-4 space-y-2">
                <li>We'll review your investment interest</li>
                <li>A company representative will contact you</li>
                <li>You'll receive detailed investment information</li>
                <li>Schedule a meeting to discuss next steps</li>
              </ol>

              <p className="text-sm text-muted-foreground mt-4">
                For immediate assistance, please contact our investment
                relations team at
                <a
                  href="mailto:invest@startupsl.com"
                  className="text-primary hover:underline ml-1"
                >
                  invest@startupsl.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
