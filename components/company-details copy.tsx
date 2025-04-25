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

<div className="container mx-auto px-4 py-6 max-w-7xl">
  {/* Back button and actions */}
  <div className="flex items-center justify-between mb-6">
    <Link
      href="/companies"
      className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Companies
    </Link>
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
      <Link href="/companies/id/edit">
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Export as PDF</DropdownMenuItem>
          <DropdownMenuItem>Print details</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            Delete company
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

  {/* Company header */}
  <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
    <div className="flex-shrink-0">
      <div className="relative h-20 w-20 rounded-lg overflow-hidden border bg-background">
        <Image
          src={company.logo || "/placeholder.svg"}
          alt={`${company.name} logo`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 80px, 80px"
        />
      </div>
    </div>
    <div className="flex-grow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{company.name}</h1>
            <Badge variant="outline" className="font-normal">
              {company.stage}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            {company.missionStatement}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="ml-1">{company.sector}</span>
          </div>
          <span className="text-muted-foreground mx-2">•</span>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="ml-1">{company.location}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Key metrics */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Founded</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{company.foundedAt}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Funding Status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div className="text-2xl font-bold">{company.fundingStatus}</div>
          <Badge className="ml-2 bg-green-100 text-green-800">
            {formatCurrency(company.amountRaised)}
          </Badge>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Funding Needed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {formatCurrency(company.fundingNeeded)}
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Team Size</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{company.employeesRange}</div>
      </CardContent>
    </Card>
  </div>

  {/* Tabs and content */}
  <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
    <TabsList className="bg-background border">
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="funding">Funding</TabsTrigger>
      <TabsTrigger value="documents">Documents</TabsTrigger>
      <TabsTrigger value="contact">Contact</TabsTrigger>
    </TabsList>

    {/* Overview Tab */}
    <TabsContent value="overview" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="whitespace-pre-line">{company.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Industry</span>
              <span className="font-medium">{company.sector}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Company Type</span>
              <span className="font-medium">{company.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Founded</span>
              <span className="font-medium">{company.foundedAt}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Registration Number</span>
              <span className="font-medium">{company.registrationNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium">{company.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Team Size</span>
              <span className="font-medium">{company.employeesRange}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mission Statement</CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="border-l-4 pl-4 italic">
            "{company.missionStatement}"
          </blockquote>
        </CardContent>
      </Card>
    </TabsContent>

    {/* Funding Tab */}
    <TabsContent value="funding" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Funding Overview</CardTitle>
          <CardDescription>
            Current funding status and requirements
          </CardDescription>
        </CardHeader>
        <RoundsTable />
        <CardFooter>
          <Button className="w-full">Contact for Investment</Button>
        </CardFooter>
      </Card>
    </TabsContent>

    {/* Documents Tab */}
    <TabsContent value="documents" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Documents</CardTitle>
          <CardDescription>Important documents and resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <h3 className="font-medium">Founding Documents</h3>
                  <p className="text-sm text-muted-foreground">
                    Legal incorporation documents
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={company.foundingDocuments}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <h3 className="font-medium">Pitch Deck</h3>
                  <p className="text-sm text-muted-foreground">
                    Company presentation for investors
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={company.pitchDeck}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Upload New Document
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>

    {/* Contact Tab */}
    <TabsContent value="contact" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Company Contact</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${company.email}`}
                      className="font-medium text-primary"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href={`tel:${company.phone}`} className="font-medium">
                      {company.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{company.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary flex items-center"
                    >
                      {company.website.replace("https://", "")}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Social Media</h3>
              <div className="space-y-3">
                {company.socialLinks.map((social, index) => (
                  <div key={index} className="flex items-start">
                    <Globe className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {social.name}
                      </p>
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary flex items-center"
                      >
                        {social.link.replace("https://", "")}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</div>;
