"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  Download,
  Edit,
  ExternalLink,
  FileText,
  Globe,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Share2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FundingRoundsPage } from "@/components/funding-rounds-page";
import RoundsTable from "@/components/rounds-table";

// Sample company data based on the Mongoose schema
const companies = [
  {
    _id: "1",
    userId: "user1",
    name: "TechNova Solutions",
    sector: "Technology",
    location: "San Francisco, USA",
    foundedAt: "2018",
    logo: "/placeholder.svg?height=80&width=80",
    registrationNumber: "TN12345678",
    type: "Corporation",
    email: "contact@technova.example",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Drive, San Francisco, CA 94105",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/technova" },
      { name: "Twitter", link: "https://twitter.com/technova" },
    ],
    website: "https://technova.example",
    stage: "Growth",
    description:
      "TechNova develops cutting-edge AI solutions for enterprise clients. Our platform leverages machine learning and natural language processing to automate complex business processes and extract valuable insights from unstructured data. We specialize in custom AI implementations that integrate seamlessly with existing enterprise systems.",
    missionStatement:
      "Transforming businesses through innovative AI technology.",
    fundingStatus: "Series A",
    amountRaised: 5000000,
    fundingNeeded: 10000000,
    foundingDocuments: "https://example.com/founding-docs",
    pitchDeck: "https://example.com/pitch-deck",
    employeesRange: "11-50",
    createdAt: "2023-01-15T00:00:00.000Z",
    updatedAt: "2023-11-20T00:00:00.000Z",
  },
];

export default function CompanyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState("overview");

  // Find company by ID from the params
  const company = companies.find((c) => c._id === params.id) || companies[0];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date string to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
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
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
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
                  <span className="text-muted-foreground">
                    Registration Number
                  </span>
                  <span className="font-medium">
                    {company.registrationNumber}
                  </span>
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
              <CardDescription>
                Important documents and resources
              </CardDescription>
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
                        <a
                          href={`tel:${company.phone}`}
                          className="font-medium"
                        >
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
    </div>
  );
}
