"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Plus, Trash2, Upload } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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

export default function EditCompanyPage({
  params,
}: {
  params: { id: string };
}) {
  // Find company by ID from the params
  const company = companies.find((c) => c._id === params.id) || companies[0];

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    location: "",
    foundedAt: "",
    registrationNumber: "",
    type: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    stage: "",
    description: "",
    missionStatement: "",
    fundingStatus: "",
    amountRaised: 0,
    fundingNeeded: 0,
    employeesRange: "",
  });

  const [socialLinks, setSocialLinks] = useState<
    { name: string; link: string }[]
  >([]);
  const [logoPreview, setLogoPreview] = useState("");
  const [hasFoundingDocuments, setHasFoundingDocuments] = useState(false);
  const [hasPitchDeck, setHasPitchDeck] = useState(false);

  // Load company data into form
  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || "",
        sector: company.sector || "",
        location: company.location || "",
        foundedAt: company.foundedAt || "",
        registrationNumber: company.registrationNumber || "",
        type: company.type || "",
        email: company.email || "",
        phone: company.phone || "",
        address: company.address || "",
        website: company.website || "",
        stage: company.stage || "",
        description: company.description || "",
        missionStatement: company.missionStatement || "",
        fundingStatus: company.fundingStatus || "",
        amountRaised: company.amountRaised || 0,
        fundingNeeded: company.fundingNeeded || 0,
        employeesRange: company.employeesRange || "",
      });

      setSocialLinks(company.socialLinks || []);
      setLogoPreview(company.logo || "");
      setHasFoundingDocuments(!!company.foundingDocuments);
      setHasPitchDeck(!!company.pitchDeck);
    }
  }, [company]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle select changes
  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Add a new social link field
  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { name: "", link: "" }]);
  };

  // Remove a social link field
  const removeSocialLink = (index: number) => {
    const updatedLinks = [...socialLinks];
    updatedLinks.splice(index, 1);
    setSocialLinks(updatedLinks);
  };

  // Update social link field
  const updateSocialLink = (
    index: number,
    field: "name" | "link",
    value: string
  ) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  };

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the updated data to your API
    console.log("Updated company data:", { ...formData, socialLinks });
    // Then redirect to the company details page
  };

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-10 mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href={`/companies/${params.id}`}
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Company Details
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            {logoPreview && (
              <div className="relative h-12 w-12 rounded-lg overflow-hidden border bg-background">
                <Image
                  src={logoPreview || "/placeholder.svg"}
                  alt={`${formData.name} logo`}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            )}
            <div>
              <CardTitle>Edit Company</CardTitle>
              <CardDescription>
                Update the details for {formData.name}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter company name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector">Sector *</Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(value) =>
                      handleSelectChange("sector", value)
                    }
                  >
                    <SelectTrigger id="sector">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Manufacturing">
                        Manufacturing
                      </SelectItem>
                      <SelectItem value="Energy">Energy</SelectItem>
                      <SelectItem value="Transportation">
                        Transportation
                      </SelectItem>
                      <SelectItem value="Agriculture">Agriculture</SelectItem>
                      <SelectItem value="Food & Beverage">
                        Food & Beverage
                      </SelectItem>
                      <SelectItem value="Clean Energy">Clean Energy</SelectItem>
                      <SelectItem value="Cybersecurity">
                        Cybersecurity
                      </SelectItem>
                      <SelectItem value="Fintech">Fintech</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foundedAt">Founded Year</Label>
                  <Input
                    id="foundedAt"
                    placeholder="e.g. 2020"
                    value={formData.foundedAt}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Company Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select company type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Corporation">Corporation</SelectItem>
                      <SelectItem value="LLC">LLC</SelectItem>
                      <SelectItem value="Partnership">Partnership</SelectItem>
                      <SelectItem value="Sole Proprietorship">
                        Sole Proprietorship
                      </SelectItem>
                      <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                      <SelectItem value="Limited Company">
                        Limited Company
                      </SelectItem>
                      <SelectItem value="B.V.">B.V.</SelectItem>
                      <SelectItem value="Ltd.">Ltd.</SelectItem>
                      <SelectItem value="KK">KK</SelectItem>
                      <SelectItem value="Private Limited">
                        Private Limited
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">
                    Registration Number
                  </Label>
                  <Input
                    id="registrationNumber"
                    placeholder="Company registration number"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Company Logo</Label>
                <div className="flex items-center gap-4">
                  {logoPreview && (
                    <div className="relative h-10 w-10 rounded-md overflow-hidden border">
                      <Image
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo preview"
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  )}
                  <Button variant="outline" type="button">
                    <Upload className="mr-2 h-4 w-4" />
                    {logoPreview ? "Change Logo" : "Upload Logo"}
                  </Button>
                  {logoPreview && (
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      className="text-destructive"
                      onClick={() => setLogoPreview("")}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Company Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Company Details</h3>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what the company does"
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="missionStatement">Mission Statement</Label>
                <Textarea
                  id="missionStatement"
                  placeholder="Company's mission statement"
                  value={formData.missionStatement}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stage">Company Stage</Label>
                  <Select
                    value={formData.stage}
                    onValueChange={(value) =>
                      handleSelectChange("stage", value)
                    }
                  >
                    <SelectTrigger id="stage">
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Idea Stage">Idea Stage</SelectItem>
                      <SelectItem value="Pre-Seed">Pre-Seed</SelectItem>
                      <SelectItem value="Seed">Seed</SelectItem>
                      <SelectItem value="Early Stage">Early Stage</SelectItem>
                      <SelectItem value="Growth">Growth</SelectItem>
                      <SelectItem value="Expansion">Expansion</SelectItem>
                      <SelectItem value="Mature">Mature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeesRange">Number of Employees</Label>
                  <Select
                    value={formData.employeesRange}
                    onValueChange={(value) =>
                      handleSelectChange("employeesRange", value)
                    }
                  >
                    <SelectTrigger id="employeesRange">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="201-500">201-500</SelectItem>
                      <SelectItem value="501-1000">501-1000</SelectItem>
                      <SelectItem value="1000+">1000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Funding Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Funding Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fundingStatus">Funding Status</Label>
                  <Select
                    value={formData.fundingStatus}
                    onValueChange={(value) =>
                      handleSelectChange("fundingStatus", value)
                    }
                  >
                    <SelectTrigger id="fundingStatus">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bootstrapped">Bootstrapped</SelectItem>
                      <SelectItem value="Pre-seed">Pre-Seed</SelectItem>
                      <SelectItem value="Seed">Seed</SelectItem>
                      <SelectItem value="Series A">Series A</SelectItem>
                      <SelectItem value="Series B">Series B</SelectItem>
                      <SelectItem value="Series C">Series C</SelectItem>
                      <SelectItem value="Series D+">Series D+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amountRaised">Amount Raised (USD)</Label>
                  <Input
                    id="amountRaised"
                    placeholder="e.g. 1000000"
                    type="number"
                    value={formData.amountRaised}
                    onChange={handleInputChange}
                  />
                  {formData.amountRaised > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(formData.amountRaised)}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fundingNeeded">Funding Needed (USD)</Label>
                <Input
                  id="fundingNeeded"
                  placeholder="e.g. 5000000"
                  type="number"
                  value={formData.fundingNeeded}
                  onChange={handleInputChange}
                />
                {formData.fundingNeeded > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(formData.fundingNeeded)}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foundingDocuments">Founding Documents</Label>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" type="button">
                      <Upload className="mr-2 h-4 w-4" />
                      {hasFoundingDocuments
                        ? "Replace Document"
                        : "Upload Document"}
                    </Button>
                    {hasFoundingDocuments ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-normal">
                          Document uploaded
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          type="button"
                          className="h-6 text-destructive"
                          onClick={() => setHasFoundingDocuments(false)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No file selected
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pitchDeck">Pitch Deck</Label>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" type="button">
                      <Upload className="mr-2 h-4 w-4" />
                      {hasPitchDeck
                        ? "Replace Pitch Deck"
                        : "Upload Pitch Deck"}
                    </Button>
                    {hasPitchDeck ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-normal">
                          Pitch deck uploaded
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          type="button"
                          className="h-6 text-destructive"
                          onClick={() => setHasPitchDeck(false)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No file selected
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="company@example.com"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Company address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={handleInputChange}
                />
                {formData.website && (
                  <div className="mt-1">
                    <a
                      href={formData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary flex items-center"
                    >
                      Visit website
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Social Links</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={addSocialLink}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Link
                  </Button>
                </div>

                <div className="space-y-3">
                  {socialLinks.map((link, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="grid grid-cols-2 gap-2 flex-1">
                        <Input
                          placeholder="Platform (e.g. LinkedIn)"
                          value={link.name}
                          onChange={(e) =>
                            updateSocialLink(index, "name", e.target.value)
                          }
                        />
                        <Input
                          placeholder="URL"
                          value={link.link}
                          onChange={(e) =>
                            updateSocialLink(index, "link", e.target.value)
                          }
                        />
                      </div>
                      {socialLinks.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={() => removeSocialLink(index)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" asChild>
              <Link href={`/companies/${params.id}`}>Cancel</Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="destructive" type="button">
                Delete Company
              </Button>
              <Button type="submit">Update Company</Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
