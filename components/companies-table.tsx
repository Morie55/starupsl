"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Search,
  SlidersHorizontal,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample company data
const companies = [
  {
    id: 1,
    name: "Acme Corporation",
    industry: "Technology",
    location: "New York, USA",
    employees: 1250,
    founded: 2005,
    status: "Active",
    revenue: "$25M",
  },
  {
    id: 2,
    name: "Globex Industries",
    industry: "Manufacturing",
    location: "Chicago, USA",
    employees: 3200,
    founded: 1998,
    status: "Active",
    revenue: "$120M",
  },
  {
    id: 3,
    name: "Stark Enterprises",
    industry: "Technology",
    location: "San Francisco, USA",
    employees: 850,
    founded: 2010,
    status: "Active",
    revenue: "$42M",
  },
  {
    id: 4,
    name: "Wayne Industries",
    industry: "Manufacturing",
    location: "Gotham, USA",
    employees: 4500,
    founded: 1975,
    status: "Active",
    revenue: "$350M",
  },
  {
    id: 5,
    name: "Umbrella Corporation",
    industry: "Pharmaceuticals",
    location: "Boston, USA",
    employees: 2100,
    founded: 1992,
    status: "Inactive",
    revenue: "$80M",
  },
  {
    id: 6,
    name: "Cyberdyne Systems",
    industry: "Technology",
    location: "Los Angeles, USA",
    employees: 750,
    founded: 2008,
    status: "Active",
    revenue: "$18M",
  },
  {
    id: 7,
    name: "Oscorp Industries",
    industry: "Biotechnology",
    location: "New York, USA",
    employees: 1800,
    founded: 1995,
    status: "Active",
    revenue: "$65M",
  },
  {
    id: 8,
    name: "Massive Dynamic",
    industry: "Research",
    location: "Boston, USA",
    employees: 920,
    founded: 2003,
    status: "Active",
    revenue: "$38M",
  },
  {
    id: 9,
    name: "Soylent Corp",
    industry: "Food Processing",
    location: "Seattle, USA",
    employees: 1450,
    founded: 1990,
    status: "Active",
    revenue: "$55M",
  },
  {
    id: 10,
    name: "Initech",
    industry: "Technology",
    location: "Austin, USA",
    employees: 320,
    founded: 2001,
    status: "Inactive",
    revenue: "$12M",
  },
  {
    id: 11,
    name: "Weyland-Yutani",
    industry: "Aerospace",
    location: "Houston, USA",
    employees: 5200,
    founded: 1979,
    status: "Active",
    revenue: "$280M",
  },
  {
    id: 12,
    name: "Tyrell Corporation",
    industry: "Biotechnology",
    location: "San Diego, USA",
    employees: 1100,
    founded: 1999,
    status: "Active",
    revenue: "$48M",
  },
];

// Available industries for filtering
const industries = [...new Set(companies.map((company) => company.industry))];

export default function CompaniesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filter companies based on search term and filters
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry =
      industryFilter === "All" || company.industry === industryFilter;
    const matchesStatus =
      statusFilter === "All" || company.status === statusFilter;

    return matchesSearch && matchesIndustry && matchesStatus;
  });

  // Sort companies
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === "asc"
        ? aValue < bValue
          ? -1
          : 1
        : bValue < aValue
        ? -1
        : 1;
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Companies</CardTitle>
        <CardDescription>
          Manage and view all companies in your organization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {/* Filters */}
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
              <div className="flex items-center gap-2">
                <Select
                  value={industryFilter}
                  onValueChange={(value) => {
                    setIndustryFilter(value);
                    setCurrentPage(1); // Reset to first page on filter change
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Industries</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1); // Reset to first page on filter change
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="ml-auto">
                <Download className="mr-2 h-4 w-4" />
                Export
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
                      Company Name
                      {renderSortIndicator("name")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("industry")}
                  >
                    <div className="flex items-center">
                      Industry
                      {renderSortIndicator("industry")}
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
                    className="hidden md:table-cell cursor-pointer text-right"
                    onClick={() => handleSort("employees")}
                  >
                    <div className="flex items-center justify-end">
                      Employees
                      {renderSortIndicator("employees")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="hidden lg:table-cell cursor-pointer text-right"
                    onClick={() => handleSort("founded")}
                  >
                    <div className="flex items-center justify-end">
                      Founded
                      {renderSortIndicator("founded")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer text-center"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center justify-center">
                      Status
                      {renderSortIndicator("status")}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCompanies.length > 0 ? (
                  paginatedCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">
                        {company.name}
                      </TableCell>
                      <TableCell>{company.industry}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {company.location}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-right">
                        {company.employees.toLocaleString()}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-right">
                        {company.founded}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            company.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {company.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <SlidersHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit company</DropdownMenuItem>
                            <DropdownMenuItem>View history</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
                  <span className="text-sm font-medium">{totalPages || 1}</span>
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
  );
}
