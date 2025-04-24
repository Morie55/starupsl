"use client";

import {
  ArrowLeft,
  Calendar,
  DollarSign,
  ExternalLink,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ReceiptIcon,
  Twitter,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import CompanyRounds from "./companyRounds";

// This would typically come from an API or database
const companyData = {
  name: "Morie Keita",
  sector: "Energy",
  location: "Freetown Sierra Leone",
  foundedAt: "Wed Apr 02 2025 00:00:00 GMT+0000 (Greenwich Mean Time)",
  registrationNumber: "2794uwifhjaskfjask",
  type: "Scaleup",
  email: "keitamorie@gmail.com",
  phone: "+23279331413",
  address: "3 sewa drive k-step calaba town",
  socialLinks: [
    { name: "facebook", link: "https://www.facebook.com" },
    { name: "twitter", link: "https://www.x.com" },
    { name: "instagram", link: "https://www.instagram.com" },
  ],
  website: "https://kabadev.com",
  stage: "Pre-Seed",
  description: "Description of company",
  missionStatement: "Mission Statement of the company",
  fundingStatus: "Series A",
  amountRaised: 100,
  foundingDocuments: "70029-eng_ai-for-africa-blueprint.pdf",
  pitchDeck: "70029-eng_ai-for-africa-blueprint.pdf",
  fundingNeeded: 100000,
  employeesRange: "201-500",
};

export default function CompanyDetailsPage({ comapnay }: any) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex min-h-screen flex-col p-4 gap-2 md:p-4 bg-accent">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/companies">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to companies</span>
          </Link>
        </Button>
        <h1 className="text-xl font-bold tracking-tight md:text-2xl">
          Company Details
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-7s lg:grid-cols-3s lg:gap-8s">
        {/* Main content */}
        <div className="w-full">
          <Card className="border-none shadow-none">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">
                  {getInitials(companyData.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <CardTitle className="text-2xl">{companyData.name}</CardTitle>
                <span className="text-blue-500 text-sm">
                  {companyData.website}
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="border-green-500 text-green-500"
                  >
                    {companyData.type}
                  </Badge>
                  <Badge variant="outline">{companyData.sector}</Badge>
                  <Badge variant="outline">{companyData.stage}</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex max-md:gap-4 md:items-center md:justify-between max-md:flex-col">
                  <div>
                    <div className="mt-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm  text-muted-foreground">
                        Founded
                      </h3>
                    </div>
                    <div className="mt-1 ">
                      <span className="font-bold">
                        {formatDate(companyData.foundedAt)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="mt-1 flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm  text-muted-foreground">
                        Employees
                      </h3>
                    </div>
                    <div className="mt-1 ">
                      <span className="font-bold">
                        {companyData.employeesRange}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="mt-1 flex items-center gap-2">
                      <ReceiptIcon className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Registration Number
                      </h3>
                    </div>
                    <div className="mt-1 ">
                      <span className="font-bold">
                        {companyData.registrationNumber}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-accent rounded-md">
                  <h3 className="font-bold border-bs mt-2 pb-2 ">
                    Funding Information
                  </h3>
                  <div className="mt-2s flex items-centers justify-between ">
                    <div className="">
                      <div className="mt-1 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Funding Status
                        </h3>
                      </div>
                      <div className="mt-1 ">
                        <span className="font-bold">
                          {companyData.fundingStatus}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 ">
                      <div>
                        <div className="mt-1 flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Funding Needed
                          </h3>
                        </div>
                        <div className="mt-1 ">
                          <span className="font-bold">
                            ${companyData.fundingNeeded.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="mt-1 flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Amount Raised
                          </h3>
                        </div>
                        <div className="mt-1 ">
                          <span className="font-bold">
                            ${companyData.amountRaised.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs
            defaultValue="overview"
            className="w-full mt-4 bg-background p-4"
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rounds">Rounds</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>

            <TabsContent
              value="overview"
              className=" rounded-md bg-accent borderd  p-3"
            >
              <div>
                <h3 className="text-md font-bold border-b  p-1 ">
                  Description
                </h3>
                <p className="leading-[1.8] mt-2 text-sm text-muted-foreground">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Corrupti et dolor asperiores illum omnis deleniti, eius,
                  numquam magni dolores, recusandae non? Perferendis distinctio
                  deserunt dolores ratione, repellat in velit rem. Saepe alias
                  quis dolorem consequatur iste, architecto iure eligendi
                  debitis nisi assumenda dolore mollitia veniam commodi
                  laboriosam officia, adipisci amet. Facilis officia laboriosam
                  doloremque enim corporis ad, optio perferendis minima. Dicta,
                  illum? Nobis voluptas odit pariatur. Distinctio, sequi vel
                  reprehenderit nulla fugiat, ullam illo, quisquam pariatur
                  necessitatibus delectus harum numquam rerum esse a dicta?
                  Maxime odio neque reiciendis facilis est?
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-md font-bold border-b inlinea p-1 ">
                  Mission Statement
                </h3>
                <p className="leading-[1.8] mt-2 text-sm text-muted-foreground">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Corrupti et dolor asperiores illum omnis deleniti, eius,
                  numquam magni dolores, recusandae non? Perferendis distinctio
                  deserunt dolores ratione, repellat in velit rem. Saepe alias
                  quis dolorem consequatur iste, architecto iure eligendi
                  debitis nisi assumenda dolore mollitia veniam commodi
                  laboriosam officia, adipisci amet. Facilis officia laboriosam
                  doloremque enim corporis ad, optio perferendis minima. Dicta,
                  illum? Nobis voluptas odit pariatur. Distinctio, sequi vel
                  reprehenderit nulla fugiat, ullam illo, quisquam pariatur
                  necessitatibus delectus harum numquam rerum esse a dicta?
                  Maxime odio neque reiciendis facilis est?
                </p>
              </div>
            </TabsContent>

            <TabsContent value="rounds" className="mt-4 p-4 space-y-4">
              <CompanyRounds />
            </TabsContent>

            <TabsContent
              value="documents"
              className="mt-4  rounded-md bg-accent borderd  p-3 "
            >
              <div className="md:col-span-3 lg:col-span-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold">Documents</h3>
                  <span className="text-sm text-muted-foreground">
                    Ways to reach this company
                  </span>
                </div>

                <div className="flex w-full gap-6 ">
                  <div className=" flex gap-3 flex-col ">
                    <div className="flex gap-4x items-center bg-card p-4 relative cursor-pointer hover:bg-gray-50 transition-all duration-300">
                      <ExternalLink className="size-3 text-muted-foreground absolute top-2 right-2" />

                      <Image
                        alt=""
                        src={"/icons/pdf-file.png"}
                        className="w-8 h-8 rounded-md"
                        width={32}
                        height={32}
                      />
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Founding Documents
                      </h3>
                    </div>
                    <Button>Download</Button>
                  </div>

                  <div className=" flex gap-3 flex-col ">
                    <div className="flex gap-4x items-center bg-card p-4 relative cursor-pointer hover:bg-gray-50 transition-all duration-300">
                      <ExternalLink className="size-3 text-muted-foreground absolute top-2 right-2" />

                      <Image
                        alt=""
                        src={"/icons/pdf-file.png"}
                        className="w-8 h-8 rounded-md"
                        width={32}
                        height={32}
                      />
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Pitch Deck Documents
                      </h3>
                    </div>
                    <Button>Download</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="contacts"
              className="mt-4 space-y-4 rounded-md bg-accent borderd  p-3"
            >
              <div className="md:col-span-3 lg:col-span-1 space-y-6">
                <Card className="border-none shadow-none bg-accent">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Ways to reach this company
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">Address</h3>
                          <p className="text-sm text-muted-foreground">
                            {companyData.address}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {companyData.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <a
                            href={`mailto:${companyData.email}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {companyData.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">Phone</h3>
                          <a
                            href={`tel:${companyData.phone}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {companyData.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="font-medium">Social Media</h3>
                      <div className="flex gap-2">
                        {companyData.socialLinks.map((social) => {
                          let Icon = Facebook;
                          if (social.name === "twitter") Icon = Twitter;
                          if (social.name === "instagram") Icon = Instagram;

                          return (
                            <Button
                              key={social.name}
                              variant="outline"
                              size="icon"
                              asChild
                            >
                              <a
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Icon className="h-4 w-4" />
                                <span className="sr-only">{social.name}</span>
                              </a>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
