"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Filter,
  MapPin,
  Plus,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample company data based on the Mongoose schema
const companies = [
  {
    _id: "1",
    userId: "user1",
    name: "TechNova Solutions",
    sector: "Technology",
    location: "San Francisco, USA",
    foundedAt: "2018",
    logo: "/placeholder.svg?height=40&width=40",
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
      "TechNova develops cutting-edge AI solutions for enterprise clients.",
    missionStatement:
      "Transforming businesses through innovative AI technology.",
    fundingStatus: "Series A",
    amountRaised: 5000000,
    fundingNeeded: 10000000,
    employeesRange: "11-50",
    createdAt: "2023-01-15T00:00:00.000Z",
    updatedAt: "2023-11-20T00:00:00.000Z",
  },
  {
    _id: "2",
    userId: "user1",
    name: "GreenEarth Renewables",
    sector: "Clean Energy",
    location: "Berlin, Germany",
    foundedAt: "2015",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "GE87654321",
    type: "LLC",
    email: "info@greenearth.example",
    phone: "+49 30 12345678",
    address: "Friedrichstraße 123, 10117 Berlin, Germany",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/greenearth" },
      { name: "Instagram", link: "https://instagram.com/greenearth" },
    ],
    website: "https://greenearth.example",
    stage: "Expansion",
    description:
      "GreenEarth develops sustainable energy solutions for residential and commercial applications.",
    missionStatement:
      "Accelerating the world's transition to sustainable energy.",
    fundingStatus: "Series B",
    amountRaised: 12000000,
    fundingNeeded: 20000000,
    employeesRange: "51-200",
    createdAt: "2022-05-10T00:00:00.000Z",
    updatedAt: "2023-10-15T00:00:00.000Z",
  },
  {
    _id: "3",
    userId: "user2",
    name: "MediLife Sciences",
    sector: "Healthcare",
    location: "Boston, USA",
    foundedAt: "2019",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "ML98765432",
    type: "Corporation",
    email: "contact@medilife.example",
    phone: "+1 (617) 987-6543",
    address: "456 Medical Parkway, Boston, MA 02115",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/medilife" },
      { name: "Facebook", link: "https://facebook.com/medilife" },
    ],
    website: "https://medilife.example",
    stage: "Early Stage",
    description:
      "MediLife develops innovative medical devices and diagnostic tools.",
    missionStatement: "Improving patient outcomes through medical innovation.",
    fundingStatus: "Seed",
    amountRaised: 1500000,
    fundingNeeded: 5000000,
    employeesRange: "1-10",
    createdAt: "2023-03-22T00:00:00.000Z",
    updatedAt: "2023-09-05T00:00:00.000Z",
  },
  {
    _id: "4",
    userId: "user2",
    name: "FinEdge Technologies",
    sector: "Fintech",
    location: "London, UK",
    foundedAt: "2017",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "FE56789012",
    type: "Limited Company",
    email: "info@finedge.example",
    phone: "+44 20 7946 0987",
    address: "78 Finsbury Square, London EC2A 1HP",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/finedge" },
      { name: "Twitter", link: "https://twitter.com/finedge" },
    ],
    website: "https://finedge.example",
    stage: "Growth",
    description:
      "FinEdge provides blockchain-based payment solutions for global businesses.",
    missionStatement:
      "Making financial transactions secure, fast, and accessible worldwide.",
    fundingStatus: "Series A",
    amountRaised: 7500000,
    fundingNeeded: 15000000,
    employeesRange: "11-50",
    createdAt: "2022-11-08T00:00:00.000Z",
    updatedAt: "2023-08-17T00:00:00.000Z",
  },
  {
    _id: "5",
    userId: "user3",
    name: "EduSpark Learning",
    sector: "Education",
    location: "Singapore",
    foundedAt: "2020",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "ES34567890",
    type: "Private Limited",
    email: "hello@eduspark.example",
    phone: "+65 6123 4567",
    address: "123 Education Road, Singapore 123456",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/eduspark" },
      { name: "YouTube", link: "https://youtube.com/eduspark" },
    ],
    website: "https://eduspark.example",
    stage: "Early Stage",
    description:
      "EduSpark develops interactive learning platforms for K-12 students.",
    missionStatement: "Making quality education accessible to every child.",
    fundingStatus: "Pre-seed",
    amountRaised: 500000,
    fundingNeeded: 2000000,
    employeesRange: "1-10",
    createdAt: "2023-02-14T00:00:00.000Z",
    updatedAt: "2023-07-30T00:00:00.000Z",
  },
  {
    _id: "6",
    userId: "user3",
    name: "AgriTech Innovations",
    sector: "Agriculture",
    location: "Nairobi, Kenya",
    foundedAt: "2016",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "AT23456789",
    type: "Limited Company",
    email: "info@agritech.example",
    phone: "+254 20 1234567",
    address: "45 Farming Avenue, Nairobi, Kenya",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/agritech" },
      { name: "Facebook", link: "https://facebook.com/agritech" },
    ],
    website: "https://agritech.example",
    stage: "Expansion",
    description:
      "AgriTech develops IoT solutions for precision farming in Africa.",
    missionStatement:
      "Empowering farmers with technology for sustainable agriculture.",
    fundingStatus: "Series B",
    amountRaised: 8000000,
    fundingNeeded: 12000000,
    employeesRange: "51-200",
    createdAt: "2022-08-05T00:00:00.000Z",
    updatedAt: "2023-06-22T00:00:00.000Z",
  },
  {
    _id: "7",
    userId: "user4",
    name: "UrbanMobility",
    sector: "Transportation",
    location: "Amsterdam, Netherlands",
    foundedAt: "2018",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "UM45678901",
    type: "B.V.",
    email: "contact@urbanmobility.example",
    phone: "+31 20 123 4567",
    address: "78 Transit Street, Amsterdam, Netherlands",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/urbanmobility" },
      { name: "Instagram", link: "https://instagram.com/urbanmobility" },
    ],
    website: "https://urbanmobility.example",
    stage: "Growth",
    description:
      "UrbanMobility develops electric scooter sharing platforms for European cities.",
    missionStatement: "Creating sustainable urban transportation solutions.",
    fundingStatus: "Series A",
    amountRaised: 6500000,
    fundingNeeded: 10000000,
    employeesRange: "11-50",
    createdAt: "2022-09-18T00:00:00.000Z",
    updatedAt: "2023-05-12T00:00:00.000Z",
  },
  {
    _id: "8",
    userId: "user4",
    name: "CyberShield Security",
    sector: "Cybersecurity",
    location: "Tel Aviv, Israel",
    foundedAt: "2017",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "CS67890123",
    type: "Ltd.",
    email: "info@cybershield.example",
    phone: "+972 3 123 4567",
    address: "56 Security Blvd, Tel Aviv, Israel",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/cybershield" },
      { name: "Twitter", link: "https://twitter.com/cybershield" },
    ],
    website: "https://cybershield.example",
    stage: "Expansion",
    description:
      "CyberShield develops advanced threat detection and prevention solutions.",
    missionStatement:
      "Protecting digital assets in an increasingly connected world.",
    fundingStatus: "Series B",
    amountRaised: 15000000,
    fundingNeeded: 25000000,
    employeesRange: "51-200",
    createdAt: "2022-07-14T00:00:00.000Z",
    updatedAt: "2023-04-28T00:00:00.000Z",
  },
  {
    _id: "9",
    userId: "user5",
    name: "FoodConnect",
    sector: "Food & Beverage",
    location: "Toronto, Canada",
    foundedAt: "2019",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "FC78901234",
    type: "Corporation",
    email: "hello@foodconnect.example",
    phone: "+1 (416) 123-4567",
    address: "123 Culinary Street, Toronto, ON M5V 2K4",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/foodconnect" },
      { name: "Instagram", link: "https://instagram.com/foodconnect" },
    ],
    website: "https://foodconnect.example",
    stage: "Early Stage",
    description:
      "FoodConnect develops a platform connecting local food producers with consumers.",
    missionStatement: "Building sustainable local food ecosystems.",
    fundingStatus: "Seed",
    amountRaised: 2000000,
    fundingNeeded: 5000000,
    employeesRange: "11-50",
    createdAt: "2023-01-05T00:00:00.000Z",
    updatedAt: "2023-03-18T00:00:00.000Z",
  },
  {
    _id: "10",
    userId: "user5",
    name: "RetailAI",
    sector: "Retail",
    location: "Tokyo, Japan",
    foundedAt: "2018",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "RA89012345",
    type: "KK",
    email: "info@retailai.example",
    phone: "+81 3 1234 5678",
    address: "45 Shopping Avenue, Shibuya, Tokyo, Japan",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/retailai" },
      { name: "Twitter", link: "https://twitter.com/retailai" },
    ],
    website: "https://retailai.example",
    stage: "Growth",
    description:
      "RetailAI develops AI-powered inventory management and customer analytics for retailers.",
    missionStatement: "Revolutionizing retail through artificial intelligence.",
    fundingStatus: "Series A",
    amountRaised: 9000000,
    fundingNeeded: 15000000,
    employeesRange: "11-50",
    createdAt: "2022-06-30T00:00:00.000Z",
    updatedAt: "2023-02-15T00:00:00.000Z",
  },
];

// Available sectors and stages for filtering
const sectors = [...new Set(companies.map((company) => company.sector))];
const stages = [...new Set(companies.map((company) => company.stage))];
const fundingStatuses = [
  ...new Set(companies.map((company) => company.fundingStatus)),
];

export default function CompaniesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [fundingStatusFilter, setFundingStatusFilter] = useState("All");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filter companies based on search term and filters
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector =
      sectorFilter === "All" || company.sector === sectorFilter;
    const matchesStage = stageFilter === "All" || company.stage === stageFilter;
    const matchesFundingStatus =
      fundingStatusFilter === "All" ||
      company.fundingStatus === fundingStatusFilter;

    return (
      matchesSearch && matchesSector && matchesStage && matchesFundingStatus
    );
  });

  // Sort companies
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return 0;
    }
  });

  // Paginate companies
  const totalPages = Math.ceil(sortedCompanies.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCompanies = sortedCompanies.slice(
    startIndex,
    startIndex + pageSize
  );

  // Handle sort
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Render sort indicator
  const renderSortIndicator = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4" />
    );
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="w-full border-none">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle>Companies</CardTitle>
            <CardDescription>
              Manage and view all companies in StartUp SL.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            {/* Filters */}
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search companies..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page on search
                    }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href="/companies/new"
                      className="flex items-center gap-2"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Company
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-2">
                  <Select
                    value={sectorFilter}
                    onValueChange={(value) => {
                      setSectorFilter(value);
                      setCurrentPage(1); // Reset to first page on filter change
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Sectors</SelectItem>
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={stageFilter}
                    onValueChange={(value) => {
                      setStageFilter(value);
                      setCurrentPage(1); // Reset to first page on filter change
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Stages</SelectItem>
                      {stages.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={fundingStatusFilter}
                    onValueChange={(value) => {
                      setFundingStatusFilter(value);
                      setCurrentPage(1); // Reset to first page on filter change
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Funding" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Funding</SelectItem>
                      {fundingStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1"
                  onClick={() => {
                    setSectorFilter("All");
                    setStageFilter("All");
                    setFundingStatusFilter("All");
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                >
                  <Filter className="h-4 w-4" />
                  Clear filters
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="w-[250px] cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        Company
                        {renderSortIndicator("name")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("sector")}
                    >
                      <div className="flex items-center">
                        Sector
                        {renderSortIndicator("sector")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="hidden md:table-cell cursor-pointer"
                      onClick={() => handleSort("location")}
                    >
                      <div className="flex items-center">
                        Location
                        {renderSortIndicator("location")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("stage")}
                    >
                      <div className="flex items-center">
                        Stage
                        {renderSortIndicator("stage")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="hidden lg:table-cell cursor-pointer"
                      onClick={() => handleSort("fundingStatus")}
                    >
                      <div className="flex items-center">
                        Funding
                        {renderSortIndicator("fundingStatus")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="hidden lg:table-cell cursor-pointer text-right"
                      onClick={() => handleSort("amountRaised")}
                    >
                      <div className="flex items-center justify-end">
                        Raised
                        {renderSortIndicator("amountRaised")}
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCompanies.length > 0 ? (
                    paginatedCompanies.map((company) => (
                      <TableRow key={company._id}>
                        <TableCell>
                          <Link
                            href={`/companies/${company._id}`}
                            className="flex items-center gap-3 hover:underline"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={company.logo || "/placeholder.svg"}
                                alt={company.name}
                              />
                              <AvatarFallback>
                                {company.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{company.name}</span>
                          </Link>
                        </TableCell>
                        <TableCell>{company.sector}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                            {company.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">
                            {company.stage}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge
                            variant="secondary"
                            className={`font-normal ${
                              company.fundingStatus === "Series A" ||
                              company.fundingStatus === "Series B"
                                ? "bg-green-100 text-green-800"
                                : company.fundingStatus === "Seed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {company.fundingStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-right">
                          {formatCurrency(company.amountRaised)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/companies/${company._id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No companies found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="flex-1 text-sm text-muted-foreground">
                Showing{" "}
                <strong>
                  {paginatedCompanies.length > 0 ? startIndex + 1 : 0}
                </strong>{" "}
                to{" "}
                <strong>
                  {Math.min(startIndex + pageSize, filteredCompanies.length)}
                </strong>{" "}
                of <strong>{filteredCompanies.length}</strong> companies
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Select
                    value={pageSize.toString()}
                    onValueChange={(value) => {
                      setPageSize(Number(value));
                      setCurrentPage(1); // Reset to first page when changing page size
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder={pageSize.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm font-medium">per page</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                    <span className="sr-only">First page</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous page</span>
                  </Button>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{currentPage}</span>
                    <span className="text-sm text-muted-foreground">of</span>
                    <span className="text-sm font-medium">
                      {totalPages || 1}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next page</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <ChevronsRight className="h-4 w-4" />
                    <span className="sr-only">Last page</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
