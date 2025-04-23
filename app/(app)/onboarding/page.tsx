"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  CalendarIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { toast } from "@/components/ui/use-toast";
import { sectorsData } from "@/data/sectors";
import { useCompany } from "@/contexts/company-context";
import { useInvestor } from "@/contexts/investor-context";
import {
  companyRanges,
  companyStages,
  companyTypes,
  fundingStatus,
} from "@/data";
import { useUser } from "@clerk/nextjs";

// Entity type selection schema
const entityTypeSchema = z.object({
  entityType: z.enum(["company", "investor", "government", "ngo"]),
});

// Company form schema
const companyFormSchema = z.object({
  // Step 1: Basic Information
  name: z.string().min(2, "Company name must be at least 2 characters"),
  sector: z.string().min(1, "Sector is required"),
  type: z.string().optional(),
  stage: z.string().optional(),

  // Step 2: Contact Information
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  socialLinks: z
    .array(
      z.object({
        name: z.string(),
        link: z.string().url("Invalid URL").or(z.literal("")),
      })
    )
    .optional(),

  // Step 3: Company Details
  location: z.string().optional(),
  foundedAt: z.date().optional(),
  registrationNumber: z.string().optional(),
  description: z.string().optional(),
  missionStatement: z.string().optional(),
  employeesRange: z.string().optional(),

  // Step 4: Funding Information
  fundingStatus: z.string().optional(),
  amountRaised: z.number().nonnegative().optional(),
  fundingNeeded: z.number().nonnegative().optional(),
  foundingDocuments: z.string().optional(),
  pitchDeck: z.string().optional(),
});

// Investor form schema
const investorFormSchema = z.object({
  // Step 1: Basic Information
  name: z.string().min(2, "Investor name must be at least 2 characters"),
  type: z.string().optional(),
  sectorInterested: z.array(z.string()).min(1, "Select at least one sector"),

  // Step 2: Contact Information
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  socialLinks: z
    .array(
      z.object({
        name: z.string(),
        link: z.string().url("Invalid URL").or(z.literal("")),
      })
    )
    .optional(),

  // Step 3: Investment Details
  location: z.string().optional(),
  foundedAt: z.date().optional(),
  registrationNumber: z.string().optional(),
  description: z.string().optional(),
  fundingCapacity: z.string().optional(),
  stage: z.string().optional(),

  // Step 4: Documents & Additional Info
  amountRaised: z.number().nonnegative().optional(),
  businessRegistrationDocuments: z.string().optional(),
  profileDocuments: z.string().optional(),
  goalExpected: z.string().optional(),
});

// Government form schema (placeholder)
const governmentFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.string().optional(),
  // Add more fields as needed
});

// NGO form schema (placeholder)
const ngoFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.string().optional(),
  // Add more fields as needed
});

type EntityType = z.infer<typeof entityTypeSchema>["entityType"];
type CompanyFormData = z.infer<typeof companyFormSchema>;
type InvestorFormData = z.infer<typeof investorFormSchema>;
type GovernmentFormData = z.infer<typeof governmentFormSchema>;
type NGOFormData = z.infer<typeof ngoFormSchema>;

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const { addCompany, loading: companyLoading } = useCompany();
  const { addInvestor, loading: investorLoading } = useInvestor();

  const [entityType, setEntityType] = useState<EntityType | null>(null);
  const [step, setStep] = useState(0); // 0 = entity selection, 1+ = form steps
  const [socialLinks, setSocialLinks] = useState([{ name: "", link: "" }]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const totalSteps = 4;

  // Company form
  const companyForm = useForm<CompanyFormData>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      sector: "",
      type: "",
      stage: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      socialLinks: [{ name: "", link: "" }],
      location: "",
      foundedAt: undefined,
      registrationNumber: "",
      description: "",
      missionStatement: "",
      employeesRange: "",
      fundingStatus: "",
      amountRaised: undefined,
      fundingNeeded: undefined,
      foundingDocuments: "",
      pitchDeck: "",
    },
  });

  // Investor form
  const investorForm = useForm<InvestorFormData>({
    resolver: zodResolver(investorFormSchema),
    defaultValues: {
      name: "",
      type: "",
      sectorInterested: [],
      email: "",
      phone: "",
      address: "",
      website: "",
      socialLinks: [{ name: "", link: "" }],
      location: "",
      foundedAt: undefined,
      registrationNumber: "",
      description: "",
      fundingCapacity: "",
      stage: "",
      amountRaised: undefined,
      businessRegistrationDocuments: "",
      profileDocuments: "",
      goalExpected: "",
    },
  });

  // Government form (placeholder)
  const governmentForm = useForm<GovernmentFormData>({
    resolver: zodResolver(governmentFormSchema),
    defaultValues: {
      name: "",
      type: "",
    },
  });

  // NGO form (placeholder)
  const ngoForm = useForm<NGOFormData>({
    resolver: zodResolver(ngoFormSchema),
    defaultValues: {
      name: "",
      type: "",
    },
  });

  const selectEntityType = (type: EntityType) => {
    setEntityType(type);
    setStep(1); // Move to first step of the form
  };

  const nextStep = () => {
    // Validate current step fields before proceeding
    if (entityType === "company") {
      if (step === 1) {
        companyForm
          .trigger(["name", "sector", "type", "stage"])
          .then((isValid) => {
            if (isValid) setStep(step + 1);
          });
      } else if (step === 2) {
        companyForm
          .trigger(["email", "phone", "address", "website"])
          .then((isValid) => {
            if (isValid) setStep(step + 1);
          });
      } else if (step === 3) {
        companyForm
          .trigger([
            "location",
            "foundedAt",
            "registrationNumber",
            "description",
            "missionStatement",
            "employeesRange",
          ])
          .then((isValid) => {
            if (isValid) setStep(step + 1);
          });
      } else {
        setStep(Math.min(step + 1, totalSteps));
      }
    } else if (entityType === "investor") {
      if (step === 1) {
        // Update sectorInterested in the form
        investorForm.setValue("sectorInterested", selectedSectors);
        investorForm
          .trigger(["name", "type", "sectorInterested"])
          .then((isValid) => {
            if (isValid) setStep(step + 1);
          });
      } else if (step === 2) {
        investorForm
          .trigger(["email", "phone", "address", "website"])
          .then((isValid) => {
            if (isValid) setStep(step + 1);
          });
      } else if (step === 3) {
        investorForm
          .trigger([
            "location",
            "foundedAt",
            "registrationNumber",
            "description",
            "fundingCapacity",
          ])
          .then((isValid) => {
            if (isValid) setStep(step + 1);
          });
      } else {
        setStep(Math.min(step + 1, totalSteps));
      }
    } else {
      // For government and NGO, just proceed without validation for now
      setStep(Math.min(step + 1, totalSteps));
    }
  };

  const prevStep = () => {
    if (step === 1) {
      // Go back to entity selection
      setEntityType(null);
      setStep(0);
    } else {
      setStep(Math.max(step - 1, 1));
    }
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { name: "", link: "" }]);
  };

  const updateSocialLink = (
    index: number,
    field: "name" | "link",
    value: string
  ) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);

    if (entityType === "company") {
      companyForm.setValue("socialLinks", updatedLinks);
    } else if (entityType === "investor") {
      investorForm.setValue("socialLinks", updatedLinks);
    }
  };

  const toggleSector = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector]
    );
  };

  const onSubmit = async (data: any) => {
    try {
      // Update social links in the form data
      if (entityType === "company") {
        data.socialLinks = socialLinks.filter((link) => link.name && link.link);

        // Add company using context
        const result: any = await addCompany({
          ...data,
          userId: user?.id,
        });
        console.log(result);
        if (result.success) {
          router.push(`/companies/${result.companyId}`);
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to create company profile",
            variant: "destructive",
          });
        }
      } else if (entityType === "investor") {
        data.socialLinks = socialLinks.filter((link) => link.name && link.link);
        data.sectorInterested = selectedSectors;

        // Add investor using context
        const result = await addInvestor({
          ...data,
          userId: "user_123", // In a real app, this would come from auth
        });

        if (result.success) {
          toast({
            title: "Success",
            description: "Investor profile created successfully!",
          });
          router.push("/dashboard");
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to create investor profile",
            variant: "destructive",
          });
        }
      } else {
        // For government and NGO, just show a success message for now
        toast({
          title: "Success",
          description: `${entityType} profile created successfully!`,
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  // Get the current form based on entity type
  const getCurrentForm = () => {
    switch (entityType) {
      case "company":
        return companyForm;
      case "investor":
        return investorForm;
      case "government":
        return governmentForm;
      case "ngo":
        return ngoForm;
      default:
        return companyForm;
    }
  };

  // Get step title based on entity type and step
  const getStepTitle = () => {
    if (entityType === "company") {
      return step === 1
        ? "Basic Information"
        : step === 2
        ? "Contact Information"
        : step === 3
        ? "Company Details"
        : "Funding Information";
    } else if (entityType === "investor") {
      return step === 1
        ? "Basic Information"
        : step === 2
        ? "Contact Information"
        : step === 3
        ? "Investment Details"
        : "Documents & Additional Info";
    } else if (entityType === "government") {
      return step === 1
        ? "Basic Information"
        : step === 2
        ? "Contact Information"
        : step === 3
        ? "Government Details"
        : "Additional Information";
    } else {
      return step === 1
        ? "Basic Information"
        : step === 2
        ? "Contact Information"
        : step === 3
        ? "NGO Details"
        : "Additional Information";
    }
  };

  // Get step description based on entity type and step
  const getStepDescription = () => {
    if (entityType === "company") {
      return step === 1
        ? "Let's start with the essentials about your company"
        : step === 2
        ? "How can people reach your company?"
        : step === 3
        ? "Tell us more about your company's background"
        : "Share details about your company's financial situation";
    } else if (entityType === "investor") {
      return step === 1
        ? "Let's start with the essentials about your investment firm"
        : step === 2
        ? "How can people reach you?"
        : step === 3
        ? "Tell us more about your investment preferences"
        : "Share additional documents and information";
    } else if (entityType === "government") {
      return step === 1
        ? "Let's start with the essentials about your government entity"
        : step === 2
        ? "How can people reach your office?"
        : step === 3
        ? "Tell us more about your government entity"
        : "Share additional information";
    } else {
      return step === 1
        ? "Let's start with the essentials about your NGO"
        : step === 2
        ? "How can people reach your organization?"
        : step === 3
        ? "Tell us more about your NGO's mission"
        : "Share additional information";
    }
  };

  const isLoading = companyLoading || investorLoading;

  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-3xl">
        {step === 0 ? (
          // Entity Type Selection
          <Card>
            <CardHeader>
              <CardTitle>Select Your Entity Type</CardTitle>
              <CardDescription>
                Choose the type of entity you're registering to continue with
                the appropriate onboarding process.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary",
                    entityType === "company" && "border-2 border-primary"
                  )}
                  onClick={() => selectEntityType("company")}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Company</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      For businesses, startups, and corporations
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary",
                    entityType === "investor" && "border-2 border-primary"
                  )}
                  onClick={() => selectEntityType("investor")}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Investor</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      For venture capital, angel investors, and investment firms
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary",
                    entityType === "government" && "border-2 border-primary"
                  )}
                  onClick={() => selectEntityType("government")}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Government</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      For government agencies and public sector entities
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary",
                    entityType === "ngo" && "border-2 border-primary"
                  )}
                  onClick={() => selectEntityType("ngo")}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">NGO</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      For non-profit organizations and charities
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Multi-step form based on entity type
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold">
                {entityType === "company"
                  ? "Complete Your Company Profile"
                  : entityType === "investor"
                  ? "Complete Your Investor Profile"
                  : entityType === "government"
                  ? "Complete Your Government Entity Profile"
                  : "Complete Your NGO Profile"}
              </h1>
              <p className="text-muted-foreground mt-2">
                Let's get to know your {entityType} better. This information
                will help us tailor our services to your needs.
              </p>

              {/* Progress indicator */}
              <div className="mt-8 flex justify-between">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2",
                        step > index + 1
                          ? "border-green-500 bg-green-500 text-white"
                          : step === index + 1
                          ? "border-primary bg-primary text-white"
                          : "border-gray-300 text-gray-400"
                      )}
                    >
                      {step > index + 1 ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span
                      className={cn(
                        "mt-2 text-sm",
                        step === index + 1
                          ? "font-medium text-primary"
                          : "text-gray-500"
                      )}
                    >
                      {index === 0
                        ? "Basic Info"
                        : index === 1
                        ? "Contact"
                        : index === 2
                        ? entityType === "company"
                          ? "Details"
                          : entityType === "investor"
                          ? "Investment"
                          : "Details"
                        : entityType === "company"
                        ? "Funding"
                        : entityType === "investor"
                        ? "Documents"
                        : "Additional"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{getStepTitle()}</CardTitle>
                <CardDescription>{getStepDescription()}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Company Form Steps */}
                {entityType === "company" && (
                  <form
                    onSubmit={companyForm.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Step 1: Basic Information */}
                    {step === 1 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">
                              Company Name{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="name"
                              {...companyForm.register("name")}
                              placeholder="Enter your company name"
                            />
                            {companyForm.formState.errors.name && (
                              <p className="text-sm text-red-500">
                                {companyForm.formState.errors.name.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="sector">
                              Sector <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                companyForm.setValue("sector", value)
                              }
                              defaultValue={companyForm.getValues("sector")}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select your company sector" />
                              </SelectTrigger>
                              <SelectContent>
                                {sectorsData.map((sector) => (
                                  <SelectItem
                                    key={sector.title}
                                    value={sector.title}
                                  >
                                    {sector.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {companyForm.formState.errors.sector && (
                              <p className="text-sm text-red-500">
                                {companyForm.formState.errors.sector.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="type">Company Type</Label>
                            <Select
                              onValueChange={(value) =>
                                companyForm.setValue("type", value)
                              }
                              defaultValue={companyForm.getValues("type")}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select your company type" />
                              </SelectTrigger>
                              <SelectContent>
                                {companyTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="stage">Company Stage</Label>
                            <Select
                              onValueChange={(value) =>
                                companyForm.setValue("stage", value)
                              }
                              defaultValue={companyForm.getValues("stage")}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select your company stage" />
                              </SelectTrigger>
                              <SelectContent>
                                {companyStages.map((stage) => (
                                  <SelectItem key={stage} value={stage}>
                                    {stage}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 2: Contact Information */}
                    {step === 2 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              {...companyForm.register("email")}
                              placeholder="company@example.com"
                            />
                            {companyForm.formState.errors.email && (
                              <p className="text-sm text-red-500">
                                {companyForm.formState.errors.email.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              {...companyForm.register("phone")}
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                              id="address"
                              {...companyForm.register("address")}
                              placeholder="123 Business St, City, Country"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              {...companyForm.register("website")}
                              placeholder="https://yourcompany.com"
                            />
                            {companyForm.formState.errors.website && (
                              <p className="text-sm text-red-500">
                                {companyForm.formState.errors.website.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label>Social Links</Label>
                            {socialLinks.map((link, index) => (
                              <div
                                key={index}
                                className="grid grid-cols-5 gap-2"
                              >
                                <Select
                                  onValueChange={(value) =>
                                    updateSocialLink(index, "name", value)
                                  }
                                  value={link.name}
                                >
                                  <SelectTrigger className="col-span-2">
                                    <SelectValue placeholder="Platform" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="linkedin">
                                      LinkedIn
                                    </SelectItem>
                                    <SelectItem value="twitter">
                                      Twitter
                                    </SelectItem>
                                    <SelectItem value="facebook">
                                      Facebook
                                    </SelectItem>
                                    <SelectItem value="instagram">
                                      Instagram
                                    </SelectItem>
                                    <SelectItem value="youtube">
                                      YouTube
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input
                                  className="col-span-3"
                                  placeholder="https://..."
                                  value={link.link}
                                  onChange={(e) =>
                                    updateSocialLink(
                                      index,
                                      "link",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addSocialLink}
                            >
                              Add Another Social Link
                            </Button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 3: Company Details */}
                    {step === 3 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              {...companyForm.register("location")}
                              placeholder="City, Country"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="foundedAt">Founded Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {companyForm.getValues("foundedAt") ? (
                                    format(
                                      companyForm.getValues(
                                        "foundedAt"
                                      ) as Date,
                                      "PPP"
                                    )
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={
                                    companyForm.getValues("foundedAt") as Date
                                  }
                                  onSelect={(date) =>
                                    companyForm.setValue(
                                      "foundedAt",
                                      date as Date
                                    )
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="registrationNumber">
                              Registration Number
                            </Label>
                            <Input
                              id="registrationNumber"
                              {...companyForm.register("registrationNumber")}
                              placeholder="Company registration number"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">
                              Company Description
                            </Label>
                            <Textarea
                              id="description"
                              {...companyForm.register("description")}
                              placeholder="Describe what your company does..."
                              className="min-h-[100px]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="missionStatement">
                              Mission Statement
                            </Label>
                            <Textarea
                              id="missionStatement"
                              {...companyForm.register("missionStatement")}
                              placeholder="Your company's mission statement..."
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="employeesRange">
                              Number of Employees
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                companyForm.setValue("employeesRange", value)
                              }
                              defaultValue={companyForm.getValues(
                                "employeesRange"
                              )}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select employee range" />
                              </SelectTrigger>
                              <SelectContent>
                                {companyRanges.map((range) => (
                                  <SelectItem key={range} value={range}>
                                    {range}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 4: Funding Information */}
                    {step === 4 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="fundingStatus">
                              Funding Status
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                companyForm.setValue("fundingStatus", value)
                              }
                              defaultValue={companyForm.getValues(
                                "fundingStatus"
                              )}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select funding status" />
                              </SelectTrigger>
                              <SelectContent>
                                {fundingStatus.map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="amountRaised">
                              Amount Raised (USD)
                            </Label>
                            <Input
                              id="amountRaised"
                              type="number"
                              {...companyForm.register("amountRaised", {
                                setValueAs: (v) =>
                                  v === "" ? undefined : Number.parseFloat(v),
                              })}
                              placeholder="0"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="fundingNeeded">
                              Funding Needed (USD)
                            </Label>
                            <Input
                              id="fundingNeeded"
                              type="number"
                              {...companyForm.register("fundingNeeded", {
                                setValueAs: (v) =>
                                  v === "" ? undefined : Number.parseFloat(v),
                              })}
                              placeholder="0"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="foundingDocuments">
                              Founding Documents
                            </Label>
                            <Input
                              id="foundingDocuments"
                              type="file"
                              className="cursor-pointer"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  // In a real app, you'd upload this to storage and save the URL
                                  companyForm.setValue(
                                    "foundingDocuments",
                                    e.target.files[0].name
                                  );
                                }
                              }}
                            />
                            <p className="text-xs text-muted-foreground">
                              Upload incorporation documents, business licenses,
                              etc.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="pitchDeck">Pitch Deck</Label>
                            <Input
                              id="pitchDeck"
                              type="file"
                              className="cursor-pointer"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  // In a real app, you'd upload this to storage and save the URL
                                  companyForm.setValue(
                                    "pitchDeck",
                                    e.target.files[0].name
                                  );
                                }
                              }}
                            />
                            <p className="text-xs text-muted-foreground">
                              Upload your company pitch deck (PDF preferred)
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </form>
                )}

                {/* Investor Form Steps */}
                {entityType === "investor" && (
                  <form
                    onSubmit={investorForm.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Step 1: Basic Information */}
                    {step === 1 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">
                              Investor Name{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="name"
                              {...investorForm.register("name")}
                              placeholder="Enter your investment firm name"
                            />
                            {investorForm.formState.errors.name && (
                              <p className="text-sm text-red-500">
                                {investorForm.formState.errors.name.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="type">Investor Type</Label>
                            <Select
                              onValueChange={(value) =>
                                investorForm.setValue("type", value)
                              }
                              defaultValue={investorForm.getValues("type")}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select your investor type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="venture_capital">
                                  Venture Capital
                                </SelectItem>
                                <SelectItem value="angel_investor">
                                  Angel Investor
                                </SelectItem>
                                <SelectItem value="private_equity">
                                  Private Equity
                                </SelectItem>
                                <SelectItem value="corporate_investor">
                                  Corporate Investor
                                </SelectItem>
                                <SelectItem value="family_office">
                                  Family Office
                                </SelectItem>
                                <SelectItem value="accelerator">
                                  Accelerator/Incubator
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Sectors Interested{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                "technology",
                                "healthcare",
                                "finance",
                                "education",
                                "retail",
                                "manufacturing",
                                "energy",
                                "real_estate",
                                "food",
                                "transportation",
                                "media",
                                "other",
                              ].map((sector) => (
                                <div
                                  key={sector}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`sector-${sector}`}
                                    checked={selectedSectors.includes(sector)}
                                    onCheckedChange={() => toggleSector(sector)}
                                  />
                                  <Label
                                    htmlFor={`sector-${sector}`}
                                    className="font-normal capitalize"
                                  >
                                    {sector.replace("_", " ")}
                                  </Label>
                                </div>
                              ))}
                            </div>
                            {investorForm.formState.errors.sectorInterested && (
                              <p className="text-sm text-red-500">
                                Please select at least one sector
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 2: Contact Information */}
                    {step === 2 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              {...investorForm.register("email")}
                              placeholder="investor@example.com"
                            />
                            {investorForm.formState.errors.email && (
                              <p className="text-sm text-red-500">
                                {investorForm.formState.errors.email.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              {...investorForm.register("phone")}
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                              id="address"
                              {...investorForm.register("address")}
                              placeholder="123 Investment St, City, Country"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              {...investorForm.register("website")}
                              placeholder="https://yourinvestmentfirm.com"
                            />
                            {investorForm.formState.errors.website && (
                              <p className="text-sm text-red-500">
                                {investorForm.formState.errors.website.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label>Social Links</Label>
                            {socialLinks.map((link, index) => (
                              <div
                                key={index}
                                className="grid grid-cols-5 gap-2"
                              >
                                <Select
                                  onValueChange={(value) =>
                                    updateSocialLink(index, "name", value)
                                  }
                                  value={link.name}
                                >
                                  <SelectTrigger className="col-span-2">
                                    <SelectValue placeholder="Platform" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="linkedin">
                                      LinkedIn
                                    </SelectItem>
                                    <SelectItem value="twitter">
                                      Twitter
                                    </SelectItem>
                                    <SelectItem value="facebook">
                                      Facebook
                                    </SelectItem>
                                    <SelectItem value="instagram">
                                      Instagram
                                    </SelectItem>
                                    <SelectItem value="youtube">
                                      YouTube
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input
                                  className="col-span-3"
                                  placeholder="https://..."
                                  value={link.link}
                                  onChange={(e) =>
                                    updateSocialLink(
                                      index,
                                      "link",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addSocialLink}
                            >
                              Add Another Social Link
                            </Button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 3: Investment Details */}
                    {step === 3 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              {...investorForm.register("location")}
                              placeholder="City, Country"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="foundedAt">Founded Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {investorForm.getValues("foundedAt") ? (
                                    format(
                                      investorForm.getValues(
                                        "foundedAt"
                                      ) as Date,
                                      "PPP"
                                    )
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={
                                    investorForm.getValues("foundedAt") as Date
                                  }
                                  onSelect={(date) =>
                                    investorForm.setValue(
                                      "foundedAt",
                                      date as Date
                                    )
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="registrationNumber">
                              Registration Number
                            </Label>
                            <Input
                              id="registrationNumber"
                              {...investorForm.register("registrationNumber")}
                              placeholder="Investment firm registration number"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">
                              Investor Description
                            </Label>
                            <Textarea
                              id="description"
                              {...investorForm.register("description")}
                              placeholder="Describe your investment philosophy and focus..."
                              className="min-h-[100px]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="fundingCapacity">
                              Funding Capacity
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                investorForm.setValue("fundingCapacity", value)
                              }
                              defaultValue={investorForm.getValues(
                                "fundingCapacity"
                              )}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select funding capacity" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="under_100k">
                                  Under $100K
                                </SelectItem>
                                <SelectItem value="100k_500k">
                                  $100K - $500K
                                </SelectItem>
                                <SelectItem value="500k_1m">
                                  $500K - $1M
                                </SelectItem>
                                <SelectItem value="1m_5m">$1M - $5M</SelectItem>
                                <SelectItem value="5m_10m">
                                  $5M - $10M
                                </SelectItem>
                                <SelectItem value="10m_plus">$10M+</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="stage">
                              Investment Stage Preference
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                investorForm.setValue("stage", value)
                              }
                              defaultValue={investorForm.getValues("stage")}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select preferred investment stage" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pre_seed">
                                  Pre-Seed
                                </SelectItem>
                                <SelectItem value="seed">Seed</SelectItem>
                                <SelectItem value="series_a">
                                  Series A
                                </SelectItem>
                                <SelectItem value="series_b">
                                  Series B
                                </SelectItem>
                                <SelectItem value="series_c_plus">
                                  Series C+
                                </SelectItem>
                                <SelectItem value="growth">Growth</SelectItem>
                                <SelectItem value="all_stages">
                                  All Stages
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 4: Documents & Additional Info */}
                    {step === 4 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="amountRaised">
                              Assets Under Management (USD)
                            </Label>
                            <Input
                              id="amountRaised"
                              type="number"
                              {...investorForm.register("amountRaised", {
                                setValueAs: (v) =>
                                  v === "" ? undefined : Number.parseFloat(v),
                              })}
                              placeholder="0"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="businessRegistrationDocuments">
                              Business Registration Documents
                            </Label>
                            <Input
                              id="businessRegistrationDocuments"
                              type="file"
                              className="cursor-pointer"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  // In a real app, you'd upload this to storage and save the URL
                                  investorForm.setValue(
                                    "businessRegistrationDocuments",
                                    e.target.files[0].name
                                  );
                                }
                              }}
                            />
                            <p className="text-xs text-muted-foreground">
                              Upload business registration documents
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="profileDocuments">
                              Investment Profile Documents
                            </Label>
                            <Input
                              id="profileDocuments"
                              type="file"
                              className="cursor-pointer"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  // In a real app, you'd upload this to storage and save the URL
                                  investorForm.setValue(
                                    "profileDocuments",
                                    e.target.files[0].name
                                  );
                                }
                              }}
                            />
                            <p className="text-xs text-muted-foreground">
                              Upload investment profile or portfolio documents
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="goalExpected">
                              Investment Goals
                            </Label>
                            <Textarea
                              id="goalExpected"
                              {...investorForm.register("goalExpected")}
                              placeholder="Describe your investment goals and expectations..."
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </form>
                )}

                {/* Government Form Steps (Placeholder) */}
                {entityType === "government" && (
                  <div className="space-y-4">
                    <p>
                      Government entity onboarding form will be available soon.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="name">Government Entity Name</Label>
                      <Input
                        id="name"
                        {...governmentForm.register("name")}
                        placeholder="Enter government entity name"
                      />
                    </div>
                  </div>
                )}

                {/* NGO Form Steps (Placeholder) */}
                {entityType === "ngo" && (
                  <div className="space-y-4">
                    <p>NGO onboarding form will be available soon.</p>
                    <div className="space-y-2">
                      <Label htmlFor="name">NGO Name</Label>
                      <Input
                        id="name"
                        {...ngoForm.register("name")}
                        placeholder="Enter NGO name"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ChevronLeftIcon className="mr-2 h-4 w-4" />
                  {step === 1 ? "Back to Selection" : "Previous"}
                </Button>

                {step < totalSteps ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    disabled={isLoading}
                    onClick={
                      entityType === "company"
                        ? companyForm.handleSubmit(onSubmit)
                        : entityType === "investor"
                        ? investorForm.handleSubmit(onSubmit)
                        : entityType === "government"
                        ? governmentForm.handleSubmit(onSubmit)
                        : ngoForm.handleSubmit(onSubmit)
                    }
                  >
                    {isLoading ? "Saving..." : "Complete Profile"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
