"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Filter,
  Plus,
  Search,
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Calendar,
} from "lucide-react";

// import { AppLayout } from "@/components/app-layout";
// import { CompaniesTable } from "@/components/companies-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const companies = [
  {
    id: 1,
    name: "EcoHarvest",
    sector: "Agriculture",
    founded: 2020,
    employees: "20-50",
    location: "Freetown",
    status: "Active",
  },
  {
    id: 2,
    name: "PayQuick",
    sector: "Fintech",
    founded: 2019,
    employees: "50-100",
    location: "Freetown",
    status: "Active",
  },
  {
    id: 3,
    name: "MediConnect",
    sector: "Healthcare",
    founded: 2021,
    employees: "20-50",
    location: "Bo",
    status: "Active",
  },
  {
    id: 4,
    name: "SolarGrid",
    sector: "Energy",
    founded: 2020,
    employees: "10-20",
    location: "Freetown",
    status: "Active",
  },
  {
    id: 5,
    name: "EduTech",
    sector: "Education",
    founded: 2022,
    employees: "5-10",
    location: "Kenema",
    status: "Early Stage",
  },
  {
    id: 6,
    name: "LogiMove",
    sector: "Transportation",
    founded: 2021,
    employees: "10-20",
    location: "Freetown",
    status: "Active",
  },
  {
    id: 7,
    name: "BuildRight",
    sector: "Construction",
    founded: 2018,
    employees: "100+",
    location: "Bo",
    status: "Active",
  },
  {
    id: 8,
    name: "FreshFoods",
    sector: "Retail",
    founded: 2019,
    employees: "50-100",
    location: "Freetown",
    status: "Active",
  },
];

// Company details data in MongoDB format
const companyDetailsData = {
  _id: { $oid: "67f6df455b76985dbb65d376" },
  userId: "user_2vQDnua8QiZU5b4T0Sb64d3CpBz",
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
    {
      name: "facebook",
      link: "https://www.facebook.com",
      _id: { $oid: "67f6df455b76985dbb65d377" },
    },
    {
      name: "twitter",
      link: "https://www.x.com",
      _id: { $oid: "67f6df455b76985dbb65d378" },
    },
    {
      name: "instagram",
      link: "https://www.instagram.com",
      _id: { $oid: "67f6df455b76985dbb65d379" },
    },
  ],
  website: "https://kabadev.com",
  stage: "Pre-Seed",
  description: "Description of company",
  missionStatement: "Mission Statement of the company",
  fundingStatus: "Series A",
  amountRaised: { $numberInt: "100" },
  foundingDocuments: "70029-eng_ai-for-africa-blueprint.pdf",
  pitchDeck: "70029-eng_ai-for-africa-blueprint.pdf",
  fundingNeeded: { $numberInt: "100000" },
  employeesRange: "201-500",
  createdAt: { $date: { $numberLong: "1744232261334" } },
  updatedAt: { $date: { $numberLong: "1744232261334" } },
  __v: { $numberInt: "0" },
};

export function CompaniesPage() {
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const router = useRouter();
  const handleRowClick = (companyId: number) => {
    router.push("/companies/67f6ed4f5b76985dbb65d398");
    // setSelectedCompany(companyId);
  };

  const closeDetails = () => {
    setSelectedCompany(null);
  };

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

  // Helper function to get number values from MongoDB format
  const getNumberValue = (field: { $numberInt: string } | undefined) => {
    return field ? Number.parseInt(field.$numberInt) : 0;
  };

  return (
    <div className="flex flex-col gap-6 p-6 md:gap-8 md:p-8">
      {selectedCompany === null ? (
        <>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
              <p className="text-muted-foreground">
                Browse and discover companies in the ecosystem
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Company Directory</CardTitle>
              <CardDescription>Browse all registered companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Filter companies..."
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="md:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="flex flex-col sm:flex-row w-full h-auto sm:justify-start">
                    <TabsTrigger
                      value="all"
                      className="w-full sm:w-auto justify-center sm:justify-start"
                    >
                      All Companies
                    </TabsTrigger>
                    <TabsTrigger
                      value="startups"
                      className="w-full sm:w-auto justify-center sm:justify-start"
                    >
                      Startups
                    </TabsTrigger>
                    <TabsTrigger
                      value="scaleups"
                      className="w-full sm:w-auto justify-center sm:justify-start"
                    >
                      Scaleups
                    </TabsTrigger>
                    <TabsTrigger
                      value="established"
                      className="w-full sm:w-auto justify-center sm:justify-start"
                    >
                      Established
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Sector</TableHead>
                            <TableHead>Founded</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Employees
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Location
                            </TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {companies.map((company) => (
                            <TableRow
                              key={company.id}
                              onClick={() => handleRowClick(company.id)}
                              className="cursor-pointer hover:bg-muted/50"
                            >
                              <TableCell className="font-medium">
                                {company.name}
                              </TableCell>
                              <TableCell>{company.sector}</TableCell>
                              <TableCell>{company.founded}</TableCell>
                              <TableCell className="hidden md:table-cell">
                                {company.employees}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {company.location}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    company.status === "Active"
                                      ? "border-green-500 text-green-500"
                                      : "border-amber-500 text-amber-500"
                                  }
                                >
                                  {company.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="startups" className="mt-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Sector</TableHead>
                            <TableHead>Founded</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Employees
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Location
                            </TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {companies
                            .filter((c) => c.founded >= 2020)
                            .map((company) => (
                              <TableRow
                                key={company.id}
                                onClick={() => handleRowClick(company.id)}
                                className="cursor-pointer hover:bg-muted/50"
                              >
                                <TableCell className="font-medium">
                                  {company.name}
                                </TableCell>
                                <TableCell>{company.sector}</TableCell>
                                <TableCell>{company.founded}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {company.employees}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {company.location}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={
                                      company.status === "Active"
                                        ? "border-green-500 text-green-500"
                                        : "border-amber-500 text-amber-500"
                                    }
                                  >
                                    {company.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="scaleups" className="mt-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Sector</TableHead>
                            <TableHead>Founded</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Employees
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Location
                            </TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {companies
                            .filter(
                              (c) =>
                                c.employees === "50-100" ||
                                c.employees === "100+"
                            )
                            .map((company) => (
                              <TableRow
                                key={company.id}
                                onClick={() => handleRowClick(company.id)}
                                className="cursor-pointer hover:bg-muted/50"
                              >
                                <TableCell className="font-medium">
                                  {company.name}
                                </TableCell>
                                <TableCell>{company.sector}</TableCell>
                                <TableCell>{company.founded}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {company.employees}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {company.location}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={
                                      company.status === "Active"
                                        ? "border-green-500 text-green-500"
                                        : "border-amber-500 text-amber-500"
                                    }
                                  >
                                    {company.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="established" className="mt-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Sector</TableHead>
                            <TableHead>Founded</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Employees
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Location
                            </TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {companies
                            .filter((c) => c.founded < 2020)
                            .map((company) => (
                              <TableRow
                                key={company.id}
                                onClick={() => handleRowClick(company.id)}
                                className="cursor-pointer hover:bg-muted/50"
                              >
                                <TableCell className="font-medium">
                                  {company.name}
                                </TableCell>
                                <TableCell>{company.sector}</TableCell>
                                <TableCell>{company.founded}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {company.employees}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {company.location}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={
                                      company.status === "Active"
                                        ? "border-green-500 text-green-500"
                                        : "border-amber-500 text-amber-500"
                                    }
                                  >
                                    {company.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
          {/* <companies-table /> */}
        </>
      ) : (
        <>
          {/* Company Details View */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={closeDetails}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to companies</span>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Company Details
            </h1>
          </div>

          <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-3 lg:gap-8">
            {/* Main content */}
            <div className="md:col-span-4 lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {getInitials(companyDetailsData.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <CardTitle className="text-2xl">
                      {companyDetailsData.name}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="border-green-500 text-green-500"
                      >
                        {companyDetailsData.type}
                      </Badge>
                      <Badge variant="outline">
                        {companyDetailsData.sector}
                      </Badge>
                      <Badge variant="outline">
                        {companyDetailsData.stage}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold">About</h3>
                      <p className="mt-2 text-muted-foreground">
                        {companyDetailsData.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Mission Statement</h3>
                      <p className="mt-2 text-muted-foreground">
                        {companyDetailsData.missionStatement}
                      </p>
                    </div>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Founded
                        </h3>
                        <div className="mt-1 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {formatDate(companyDetailsData.foundedAt)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Employees
                        </h3>
                        <div className="mt-1">
                          {companyDetailsData.employeesRange}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Registration Number
                        </h3>
                        <div className="mt-1">
                          {companyDetailsData.registrationNumber}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Website
                        </h3>
                        <div className="mt-1">
                          <a
                            href={companyDetailsData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {companyDetailsData.website}
                          </a>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold">Funding Information</h3>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Funding Status
                          </h4>
                          <div className="mt-1">
                            {companyDetailsData.fundingStatus}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Amount Raised
                          </h4>
                          <div className="mt-1">
                            $
                            {getNumberValue(
                              companyDetailsData.amountRaised
                            ).toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Funding Needed
                          </h4>
                          <div className="mt-1">
                            $
                            {getNumberValue(
                              companyDetailsData.fundingNeeded
                            ).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold">Documents</h3>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Founding Documents
                          </h4>
                          <Button
                            variant="link"
                            className="mt-1 h-auto p-0 text-primary"
                          >
                            {companyDetailsData.foundingDocuments}
                          </Button>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Pitch Deck
                          </h4>
                          <Button
                            variant="link"
                            className="mt-1 h-auto p-0 text-primary"
                          >
                            {companyDetailsData.pitchDeck}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-3 lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Ways to reach this company</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-sm text-muted-foreground">
                        {companyDetailsData.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {companyDetailsData.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a
                        href={`mailto:${companyDetailsData.email}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {companyDetailsData.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <a
                        href={`tel:${companyDetailsData.phone}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {companyDetailsData.phone}
                      </a>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Social Media</h3>
                    <div className="flex gap-2">
                      {companyDetailsData.socialLinks.map((social) => {
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

              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">Contact Company</Button>
                  <Button variant="outline" className="w-full">
                    Request Meeting
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
