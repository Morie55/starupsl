// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import {
//   CalendarIcon,
//   CheckIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { Checkbox } from "@/components/ui/checkbox";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";

// import { toast } from "@/components/ui/use-toast";
// import { sectorsData } from "@/data/sectors";
// import { useCompany } from "@/contexts/company-context";
// import { useInvestor } from "@/contexts/investor-context";
// import {
//   companyRanges,
//   companyStages,
//   companyTypes,
//   fundingStatus,
//   investmentTypes,
// } from "@/data";
// import { useUser } from "@clerk/nextjs";

// // Entity type selection schema
// const entityTypeSchema = z.object({
//   entityType: z.enum(["company", "investor", "government", "ngo"]),
// });

// // Company form schema
// const companyFormSchema = z.object({
//   // Step 1: Basic Information
//   name: z.string().min(2, "Company name must be at least 2 characters"),
//   sector: z.string().min(1, "Sector is required"),
//   type: z.string().optional(),
//   stage: z.string().optional(),

//   // Step 2: Contact Information
//   email: z.string().email("Invalid email address").optional(),
//   phone: z.string().optional(),
//   address: z.string().optional(),
//   website: z.string().url("Invalid website URL").optional().or(z.literal("")),
//   socialLinks: z
//     .array(
//       z.object({
//         name: z.string(),
//         link: z.string().url("Invalid URL").or(z.literal("")),
//       })
//     )
//     .optional(),

//   // Step 3: Company Details
//   location: z.string().optional(),
//   foundedAt: z.date().optional(),
//   registrationNumber: z.string().optional(),
//   description: z.string().optional(),
//   missionStatement: z.string().optional(),
//   employeesRange: z.string().optional(),

//   // Step 4: Funding Information
//   fundingStatus: z.string().optional(),
//   amountRaised: z.number().nonnegative().optional(),
//   fundingNeeded: z.number().nonnegative().optional(),
//   foundingDocuments: z.string().optional(),
//   pitchDeck: z.string().optional(),
// });

// // Investor form schema
// const investorFormSchema = z.object({
//   // Step 1: Basic Information
//   name: z.string().min(2, "Investor name must be at least 2 characters"),
//   type: z.string().optional(),
//   sectorInterested: z.array(z.string()).min(1, "Select at least one sector"),

//   // Step 2: Contact Information
//   email: z.string().email("Invalid email address").optional(),
//   phone: z.string().optional(),
//   address: z.string().optional(),
//   website: z.string().url("Invalid website URL").optional().or(z.literal("")),
//   socialLinks: z
//     .array(
//       z.object({
//         name: z.string(),
//         link: z.string().url("Invalid URL").or(z.literal("")),
//       })
//     )
//     .optional(),

//   // Step 3: Investment Details
//   location: z.string().optional(),
//   foundedAt: z.date().optional(),
//   registrationNumber: z.string().optional(),
//   description: z.string().optional(),
//   fundingCapacity: z.string().optional(),
//   stage: z.string().optional(),

//   // Step 4: Documents & Additional Info
//   amountRaised: z.number().nonnegative().optional(),
//   businessRegistrationDocuments: z.string().optional(),
//   profileDocuments: z.string().optional(),
//   goalExpected: z.string().optional(),
// });

// // NGO form schema (placeholder)
// const ngoFormSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   type: z.string().optional(),
//   // Add more fields as needed
// });

// type EntityType = z.infer<typeof entityTypeSchema>["entityType"];
// type CompanyFormData = z.infer<typeof companyFormSchema>;
// type InvestorFormData = z.infer<typeof investorFormSchema>;
// type NGOFormData = z.infer<typeof ngoFormSchema>;

// export default function OnboardingPage() {
//   const { user } = useUser();
//   const router = useRouter();
//   const { addCompany, loading: companyLoading } = useCompany();
//   const { addInvestor, loading: investorLoading } = useInvestor();

//   const [entityType, setEntityType] = useState<EntityType | null>(null);
//   const [step, setStep] = useState(0); // 0 = entity selection, 1+ = form steps
//   const [socialLinks, setSocialLinks] = useState([{ name: "", link: "" }]);
//   const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
//   const totalSteps = 4;

//   // Company form
//   const companyForm = useForm<CompanyFormData>({
//     resolver: zodResolver(companyFormSchema),
//     defaultValues: {
//       name: "",
//       sector: "",
//       type: "",
//       stage: "",
//       email: "",
//       phone: "",
//       address: "",
//       website: "",
//       socialLinks: [{ name: "", link: "" }],
//       location: "",
//       foundedAt: undefined,
//       registrationNumber: "",
//       description: "",
//       missionStatement: "",
//       employeesRange: "",
//       fundingStatus: "",
//       amountRaised: undefined,
//       fundingNeeded: undefined,
//       foundingDocuments: "",
//       pitchDeck: "",
//     },
//   });

//   // Investor form
//   const investorForm = useForm<InvestorFormData>({
//     resolver: zodResolver(investorFormSchema),
//     defaultValues: {
//       name: "",
//       type: "",
//       sectorInterested: [],
//       email: "",
//       phone: "",
//       address: "",
//       website: "",
//       socialLinks: [{ name: "", link: "" }],
//       location: "",
//       foundedAt: undefined,
//       registrationNumber: "",
//       description: "",
//       fundingCapacity: "",
//       stage: "",
//       amountRaised: undefined,
//       businessRegistrationDocuments: "",
//       profileDocuments: "",
//       goalExpected: "",
//     },
//   });

//   // NGO form (placeholder)
//   const ngoForm = useForm<NGOFormData>({
//     resolver: zodResolver(ngoFormSchema),
//     defaultValues: {
//       name: "",
//       type: "",
//     },
//   });

//   const selectEntityType = (type: EntityType) => {
//     setEntityType(type);
//     setStep(1); // Move to first step of the form
//   };

//   const nextStep = () => {
//     // Validate current step fields before proceeding
//     if (entityType === "company") {
//       if (step === 1) {
//         companyForm
//           .trigger(["name", "sector", "type", "stage"])
//           .then((isValid) => {
//             if (isValid) setStep(step + 1);
//           });
//       } else if (step === 2) {
//         companyForm
//           .trigger(["email", "phone", "address", "website"])
//           .then((isValid) => {
//             if (isValid) setStep(step + 1);
//           });
//       } else if (step === 3) {
//         companyForm
//           .trigger([
//             "location",
//             "foundedAt",
//             "registrationNumber",
//             "description",
//             "missionStatement",
//             "employeesRange",
//           ])
//           .then((isValid) => {
//             if (isValid) setStep(step + 1);
//           });
//       } else {
//         setStep(Math.min(step + 1, totalSteps));
//       }
//     } else if (entityType === "investor") {
//       if (step === 1) {
//         // Update sectorInterested in the form
//         investorForm.setValue("sectorInterested", selectedSectors);
//         investorForm
//           .trigger(["name", "type", "sectorInterested"])
//           .then((isValid) => {
//             if (isValid) setStep(step + 1);
//           });
//       } else if (step === 2) {
//         investorForm
//           .trigger(["email", "phone", "address", "website"])
//           .then((isValid) => {
//             if (isValid) setStep(step + 1);
//           });
//       } else if (step === 3) {
//         investorForm
//           .trigger([
//             "location",
//             "foundedAt",
//             "registrationNumber",
//             "description",
//             "fundingCapacity",
//           ])
//           .then((isValid) => {
//             if (isValid) setStep(step + 1);
//           });
//       } else {
//         setStep(Math.min(step + 1, totalSteps));
//       }
//     } else {
//       // For government and NGO, just proceed without validation for now
//       setStep(Math.min(step + 1, totalSteps));
//     }
//   };

//   const prevStep = () => {
//     if (step === 1) {
//       // Go back to entity selection
//       setEntityType(null);
//       setStep(0);
//     } else {
//       setStep(Math.max(step - 1, 1));
//     }
//   };

//   const addSocialLink = () => {
//     setSocialLinks([...socialLinks, { name: "", link: "" }]);
//   };

//   const updateSocialLink = (
//     index: number,
//     field: "name" | "link",
//     value: string
//   ) => {
//     const updatedLinks = [...socialLinks];
//     updatedLinks[index][field] = value;
//     setSocialLinks(updatedLinks);

//     if (entityType === "company") {
//       companyForm.setValue("socialLinks", updatedLinks);
//     } else if (entityType === "investor") {
//       investorForm.setValue("socialLinks", updatedLinks);
//     }
//   };

//   const toggleSector = (sector: string) => {
//     setSelectedSectors((prev) =>
//       prev.includes(sector)
//         ? prev.filter((s) => s !== sector)
//         : [...prev, sector]
//     );
//   };

//   const onSubmit = async (data: any) => {
//     try {
//       // Update social links in the form data
//       if (entityType === "company") {
//         data.socialLinks = socialLinks.filter((link) => link.name && link.link);

//         // Add company using context
//         const result: any = await addCompany({
//           ...data,
//           userId: user?.id,
//         });

//         if (result.success) {
//           router.push(`/companies/${result.companyId}`);
//         } else {
//           toast({
//             title: "Error",
//             description: result.error || "Failed to create company profile",
//             variant: "destructive",
//           });
//         }
//       } else if (entityType === "investor") {
//         data.socialLinks = socialLinks.filter((link) => link.name && link.link);
//         data.sectorInterested = selectedSectors;

//         // Add investor using context
//         const result: any = await addInvestor({
//           ...data,
//           userId: user?.id,
//         });

//         if (result.success) {
//           router.push(`/investors/${result.investorId}`);
//         } else {
//           toast({
//             title: "Error",
//             description: result.error || "Failed to create investor profile",
//             variant: "destructive",
//           });
//         }
//       } else {
//         // For government and NGO, just show a success message for now
//         toast({
//           title: "Success",
//           description: `${entityType} profile created successfully!`,
//         });
//         router.push("/dashboard");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       });
//     }
//   };

//   // Get the current form based on entity type
//   const getCurrentForm = () => {
//     switch (entityType) {
//       case "company":
//         return companyForm;
//       case "investor":
//         return investorForm;
//       case "ngo":
//         return ngoForm;
//       default:
//         return companyForm;
//     }
//   };

//   // Get step title based on entity type and step
//   const getStepTitle = () => {
//     if (entityType === "company") {
//       return step === 1
//         ? "Basic Information"
//         : step === 2
//         ? "Contact Information"
//         : step === 3
//         ? "Company Details"
//         : "Funding Information";
//     } else if (entityType === "investor") {
//       return step === 1
//         ? "Basic Information"
//         : step === 2
//         ? "Contact Information"
//         : step === 3
//         ? "Investment Details"
//         : "Documents & Additional Info";
//     } else {
//       return step === 1
//         ? "Basic Information"
//         : step === 2
//         ? "Contact Information"
//         : step === 3
//         ? "NGO Details"
//         : "Additional Information";
//     }
//   };

//   // Get step description based on entity type and step
//   const getStepDescription = () => {
//     if (entityType === "company") {
//       return step === 1
//         ? "Let's start with the essentials about your company"
//         : step === 2
//         ? "How can people reach your company?"
//         : step === 3
//         ? "Tell us more about your company's background"
//         : "Share details about your company's financial situation";
//     } else if (entityType === "investor") {
//       return step === 1
//         ? "Let's start with the essentials about your investment firm"
//         : step === 2
//         ? "How can people reach you?"
//         : step === 3
//         ? "Tell us more about your investment preferences"
//         : "Share additional documents and information";
//     } else {
//       return step === 1
//         ? "Let's start with the essentials about your ESO"
//         : step === 2
//         ? "How can people reach your organization?"
//         : step === 3
//         ? "Tell us more about your ESO's mission"
//         : "Share additional information";
//     }
//   };

//   const isLoading = companyLoading || investorLoading;

//   return (
//     <div className=" py-10">
//       <div className="p-4 sm:p-6 lg:p-8">
//         {step === 0 ? (
//           // Entity Type Selection
//           <Card className="border-none shadow-none">
//             <CardHeader>
//               <CardTitle>Select Your Entity Type</CardTitle>
//               <CardDescription>
//                 Choose the type of entity you're registering to continue with
//                 the appropriate onboarding process.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <Card
//                   className={cn(
//                     "cursor-pointer transition-all hover:border-primary",
//                     entityType === "company" && "border-2 border-primary"
//                   )}
//                   onClick={() => selectEntityType("company")}
//                 >
//                   <CardHeader className="p-4">
//                     <CardTitle className="text-lg">Company</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4 pt-0">
//                     <p className="text-sm text-muted-foreground">
//                       For businesses, startups, and corporations
//                     </p>
//                   </CardContent>
//                 </Card>

//                 <Card
//                   className={cn(
//                     "cursor-pointer transition-all hover:border-primary",
//                     entityType === "investor" && "border-2 border-primary"
//                   )}
//                   onClick={() => selectEntityType("investor")}
//                 >
//                   <CardHeader className="p-4">
//                     <CardTitle className="text-lg">Investor</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4 pt-0">
//                     <p className="text-sm text-muted-foreground">
//                       For venture capital, angel investors, and investment firms
//                     </p>
//                   </CardContent>
//                 </Card>

//                 <Card
//                   className={cn(
//                     "cursor-pointer transition-all hover:border-primary",
//                     entityType === "ngo" && "border-2 border-primary"
//                   )}
//                   onClick={() => selectEntityType("ngo")}
//                 >
//                   <CardHeader className="p-4">
//                     <CardTitle className="text-lg">NGO</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4 pt-0">
//                     <p className="text-sm text-muted-foreground">
//                       For non-profit organizations and charities
//                     </p>
//                   </CardContent>
//                 </Card>
//               </div>
//             </CardContent>
//           </Card>
//         ) : (
//           // Multi-step form based on entity type
//           <>
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold">
//                 {entityType === "company"
//                   ? "Complete Your Company Profile"
//                   : entityType === "investor"
//                   ? "Complete Your Investor Profile"
//                   : "Complete Your NGO Profile"}
//               </h1>
//               <p className="text-muted-foreground mt-2">
//                 Let's get to know your {entityType} better. This information
//                 will help us tailor our services to your needs.
//               </p>

//               {/* Progress indicator */}
//               <div className="mt-8 flex justify-between">
//                 {Array.from({ length: totalSteps }).map((_, index) => (
//                   <div key={index} className="flex flex-col items-center">
//                     <div
//                       className={cn(
//                         "flex h-10 w-10 items-center justify-center rounded-full border-2",
//                         step > index + 1
//                           ? "border-green-500 bg-green-500 text-white"
//                           : step === index + 1
//                           ? "border-primary bg-primary text-white"
//                           : "border-gray-300 text-gray-400"
//                       )}
//                     >
//                       {step > index + 1 ? (
//                         <CheckIcon className="h-5 w-5" />
//                       ) : (
//                         index + 1
//                       )}
//                     </div>
//                     <span
//                       className={cn(
//                         "mt-2 text-sm",
//                         step === index + 1
//                           ? "font-medium text-primary"
//                           : "text-gray-500"
//                       )}
//                     >
//                       {index === 0
//                         ? "Basic Info"
//                         : index === 1
//                         ? "Contact"
//                         : index === 2
//                         ? entityType === "company"
//                           ? "Details"
//                           : entityType === "investor"
//                           ? "Investment"
//                           : "Details"
//                         : entityType === "company"
//                         ? "Funding"
//                         : entityType === "investor"
//                         ? "Documents"
//                         : "Additional"}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <Card>
//               <CardHeader>
//                 <CardTitle>{getStepTitle()}</CardTitle>
//                 <CardDescription>{getStepDescription()}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {/* Company Form Steps */}
//                 {entityType === "company" && (
//                   <form
//                     onSubmit={companyForm.handleSubmit(onSubmit)}
//                     className="space-y-6"
//                   >
//                     {/* Step 1: Basic Information */}
//                     {step === 1 && (
//                       <>
//                         <div className="space-y-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="name">
//                               Company Name{" "}
//                               <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                               id="name"
//                               {...companyForm.register("name")}
//                               placeholder="Enter your company name"
//                             />
//                             {companyForm.formState.errors.name && (
//                               <p className="text-sm text-red-500">
//                                 {companyForm.formState.errors.name.message}
//                               </p>
//                             )}
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="sector">
//                               Sector <span className="text-red-500">*</span>
//                             </Label>
//                             <Select
//                               onValueChange={(value) =>
//                                 companyForm.setValue("sector", value)
//                               }
//                               defaultValue={companyForm.getValues("sector")}
//                             >
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select your company sector" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {sectorsData.map((sector) => (
//                                   <SelectItem
//                                     key={sector.title}
//                                     value={sector.title}
//                                   >
//                                     {sector.title}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                             {companyForm.formState.errors.sector && (
//                               <p className="text-sm text-red-500">
//                                 {companyForm.formState.errors.sector.message}
//                               </p>
//                             )}
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="type">Company Type</Label>
//                             <Select
//                               onValueChange={(value) =>
//                                 companyForm.setValue("type", value)
//                               }
//                               defaultValue={companyForm.getValues("type")}
//                             >
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select your company type" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {companyTypes.map((type) => (
//                                   <SelectItem key={type} value={type}>
//                                     {type}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="stage">Company Stage</Label>
//                             <Select
//                               onValueChange={(value) =>
//                                 companyForm.setValue("stage", value)
//                               }
//                               defaultValue={companyForm.getValues("stage")}
//                             >
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select your company stage" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {companyStages.map((stage) => (
//                                   <SelectItem key={stage} value={stage}>
//                                     {stage}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     {/* Step 2: Contact Information */}
//                     {step === 2 && (
//                       <>
//                         <div className="space-y-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="email">Email Address</Label>
//                             <Input
//                               id="email"
//                               type="email"
//                               {...companyForm.register("email")}
//                               placeholder="company@example.com"
//                             />
//                             {companyForm.formState.errors.email && (
//                               <p className="text-sm text-red-500">
//                                 {companyForm.formState.errors.email.message}
//                               </p>
//                             )}
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="phone">Phone Number</Label>
//                             <Input
//                               id="phone"
//                               {...companyForm.register("phone")}
//                               placeholder="+1 (555) 123-4567"
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="address">Address</Label>
//                             <Textarea
//                               id="address"
//                               {...companyForm.register("address")}
//                               placeholder="123 Business St, City, Country"
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="website">Website</Label>
//                             <Input
//                               id="website"
//                               {...companyForm.register("website")}
//                               placeholder="https://yourcompany.com"
//                             />
//                             {companyForm.formState.errors.website && (
//                               <p className="text-sm text-red-500">
//                                 {companyForm.formState.errors.website.message}
//                               </p>
//                             )}
//                           </div>

//                           <div className="space-y-2">
//                             <Label>Social Links</Label>
//                             {socialLinks.map((link, index) => (
//                               <div
//                                 key={index}
//                                 className="grid grid-cols-5 gap-2"
//                               >
//                                 <Select
//                                   onValueChange={(value) =>
//                                     updateSocialLink(index, "name", value)
//                                   }
//                                   value={link.name}
//                                 >
//                                   <SelectTrigger className="col-span-2">
//                                     <SelectValue placeholder="Platform" />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="linkedin">
//                                       LinkedIn
//                                     </SelectItem>
//                                     <SelectItem value="twitter">
//                                       Twitter
//                                     </SelectItem>
//                                     <SelectItem value="facebook">
//                                       Facebook
//                                     </SelectItem>
//                                     <SelectItem value="instagram">
//                                       Instagram
//                                     </SelectItem>
//                                     <SelectItem value="youtube">
//                                       YouTube
//                                     </SelectItem>
//                                     <SelectItem value="other">Other</SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                                 <Input
//                                   className="col-span-3"
//                                   placeholder="https://..."
//                                   value={link.link}
//                                   onChange={(e) =>
//                                     updateSocialLink(
//                                       index,
//                                       "link",
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                               </div>
//                             ))}
//                             <Button
//                               type="button"
//                               variant="outline"
//                               size="sm"
//                               onClick={addSocialLink}
//                             >
//                               Add Another Social Link
//                             </Button>
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     {/* Step 3: Company Details */}
//                     {step === 3 && (
//                       <>
//                         <div className="space-y-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="location">Location</Label>
//                             <Input
//                               id="location"
//                               {...companyForm.register("location")}
//                               placeholder="City, Country"
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="foundedAt">Founded Date</Label>
//                             <Popover>
//                               <PopoverTrigger asChild>
//                                 <Button
//                                   variant="outline"
//                                   className="w-full justify-start text-left font-normal"
//                                 >
//                                   <CalendarIcon className="mr-2 h-4 w-4" />
//                                   {companyForm.getValues("foundedAt") ? (
//                                     format(
//                                       companyForm.getValues(
//                                         "foundedAt"
//                                       ) as Date,
//                                       "PPP"
//                                     )
//                                   ) : (
//                                     <span>Pick a date</span>
//                                   )}
//                                 </Button>
//                               </PopoverTrigger>
//                               <PopoverContent className="w-auto p-0">
//                                 <Calendar
//                                   mode="single"
//                                   selected={
//                                     companyForm.getValues("foundedAt") as Date
//                                   }
//                                   onSelect={(date) =>
//                                     companyForm.setValue(
//                                       "foundedAt",
//                                       date as Date
//                                     )
//                                   }
//                                   initialFocus
//                                 />
//                               </PopoverContent>
//                             </Popover>
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="registrationNumber">
//                               Registration Number
//                             </Label>
//                             <Input
//                               id="registrationNumber"
//                               {...companyForm.register("registrationNumber")}
//                               placeholder="Company registration number"
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="description">
//                               Company Description
//                             </Label>
//                             <Textarea
//                               id="description"
//                               {...companyForm.register("description")}
//                               placeholder="Describe what your company does..."
//                               className="min-h-[100px]"
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="missionStatement">
//                               Mission Statement
//                             </Label>
//                             <Textarea
//                               id="missionStatement"
//                               {...companyForm.register("missionStatement")}
//                               placeholder="Your company's mission statement..."
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="employeesRange">
//                               Number of Employees
//                             </Label>
//                             <Select
//                               onValueChange={(value) =>
//                                 companyForm.setValue("employeesRange", value)
//                               }
//                               defaultValue={companyForm.getValues(
//                                 "employeesRange"
//                               )}
//                             >
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select employee range" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {companyRanges.map((range) => (
//                                   <SelectItem key={range} value={range}>
//                                     {range}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     {/* Step 4: Funding Information */}
//                     {step === 4 && (
//                       <>
//                         <div className="space-y-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="fundingStatus">Types of Fund</Label>
//                             <Select
//                               onValueChange={(value) =>
//                                 companyForm.setValue("fundingStatus", value)
//                               }
//                               defaultValue={companyForm.getValues(
//                                 "fundingStatus"
//                               )}
//                             >
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select funding status" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {fundingStatus.map((status) => (
//                                   <SelectItem key={status} value={status}>
//                                     {status}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="amountRaised">
//                               Amount Raised (USD)
//                             </Label>
//                             <Input
//                               id="amountRaised"
//                               type="number"
//                               {...companyForm.register("amountRaised", {
//                                 setValueAs: (v) =>
//                                   v === "" ? undefined : Number.parseFloat(v),
//                               })}
//                               placeholder="0"
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="fundingNeeded">
//                               Funding Needed (USD)
//                             </Label>
//                             <Input
//                               id="fundingNeeded"
//                               type="number"
//                               {...companyForm.register("fundingNeeded", {
//                                 setValueAs: (v) =>
//                                   v === "" ? undefined : Number.parseFloat(v),
//                               })}
//                               placeholder="0"
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="foundingDocuments">
//                               Founding Documents
//                             </Label>
//                             <Input
//                               id="foundingDocuments"
//                               type="file"
//                               className="cursor-pointer"
//                               onChange={(e) => {
//                                 if (e.target.files?.[0]) {
//                                   // In a real app, you'd upload this to storage and save the URL
//                                   companyForm.setValue(
//                                     "foundingDocuments",
//                                     e.target.files[0].name
//                                   );
//                                 }
//                               }}
//                             />
//                             <p className="text-xs text-muted-foreground">
//                               Upload incorporation documents, business licenses,
//                               etc.
//                             </p>
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="pitchDeck">Pitch Deck</Label>
//                             <Input
//                               id="pitchDeck"
//                               type="file"
//                               className="cursor-pointer"
//                               onChange={(e) => {
//                                 if (e.target.files?.[0]) {
//                                   // In a real app, you'd upload this to storage and save the URL
//                                   companyForm.setValue(
//                                     "pitchDeck",
//                                     e.target.files[0].name
//                                   );
//                                 }
//                               }}
//                             />
//                             <p className="text-xs text-muted-foreground">
//                               Upload your company pitch deck (PDF preferred)
//                             </p>
//                           </div>
//                         </div>
//                       </>
//                     )}
//                   </form>
//                 )}

//                 {/* Investor Form Steps */}
//                 {entityType === "investor" && (
//                   <form
//                     onSubmit={investorForm.handleSubmit(onSubmit)}
//                     className="space-y-6"
//                   >
//                     {/* Step 1: Basic Information */}
//                     {step === 1 && (
//                       <>
//                         <div className="space-y-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="name">
//                               Investor Name{" "}
//                               <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                               id="name"
//                               {...investorForm.register("name")}
//                               placeholder="Enter your investment firm name"
//                             />
//                             {investorForm.formState.errors.name && (
//                               <p className="text-sm text-red-500">
//                                 {investorForm.formState.errors.name.message}
//                               </p>
//                             )}
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="type">Investor Type</Label>
//                             <Select
//                               onValueChange={(value) =>
//                                 investorForm.setValue("type", value)
//                               }
//                               defaultValue={investorForm.getValues("type")}
//                             >
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select your investor type" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {investmentTypes.map((type) => (
//                                   <SelectItem key={type} value={type}>
//                                     {type}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>

//                           <div className="space-y-2">
//                             <Label>
//                               Sectors Interested{" "}
//                               <span className="text-red-500">*</span>
//                             </Label>
//                             <div className="grid grid-cols-2 gap-2">
//                               {sectorsData.map((sector) => (
//                                 <div
//                                   key={sector.title}
//                                   className="flex items-center space-x-2"
//                                 >
//                                   <Checkbox
//                                     id={`sector-${sector}`}
//                                     checked={selectedSectors.includes(
//                                       sector.title
//                                     )}
//                                     onCheckedChange={() =>
//                                       toggleSector(sector.title)
//                                     }
//                                   />
//                                   <Label
//                                     htmlFor={`sector-${sector}`}
//                                     className="font-normal capitalize"
//                                   >
//                                     {sector.title.replace("_", " ")}
//                                   </Label>
//                                 </div>
//                               ))}
//                             </div>
//                             {investorForm.formState.errors.sectorInterested && (
//                               <p className="text-sm text-red-500">
//                                 Please select at least one sector
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     {/* Step 2: Contact Information */}
//                     {step === 2 && (
//                       <>
//                         <div className="space-y-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="email">Email Address</Label>
//                             <Input
//                               id="email"
//                               type="email"
//                               {...investorForm.register("email")}
//                               placeholder="investor@example.com"
//                             />
//                             {investorForm.formState.errors.email && (
//                               <p className="text-sm text-red-500">
//                                 {investorForm.formState.errors.email.message}
//                               </p>
//                             )}
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="phone">Phone Number</Label>
//                             <Input
//                               id="phone"
//                               {...investorForm.register("phone")}
//                               placeholder="+1 (555) 123-4567"
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="address">Address</Label>
//                             <Textarea
//                               id="address"
//                               {...investorForm.register("address")}
//                               placeholder="123 Investment St, City, Country"
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="website">Website</Label>
//                             <Input
//                               id="website"
//                               {...investorForm.register("website")}
//                               placeholder="https://yourinvestmentfirm.com"
//                             />
//                             {investorForm.formState.errors.website && (
//                               <p className="text-sm text-red-500">
//                                 {investorForm.formState.errors.website.message}
//                               </p>
//                             )}
//                           </div>

//                           <div className="space-y-2">
//                             <Label>Social Links</Label>
//                             {socialLinks.map((link, index) => (
//                               <div
//                                 key={index}
//                                 className="grid grid-cols-5 gap-2"
//                               >
//                                 <Select
//                                   onValueChange={(value) =>
//                                     updateSocialLink(index, "name", value)
//                                   }
//                                   value={link.name}
//                                 >
//                                   <SelectTrigger className="col-span-2">
//                                     <SelectValue placeholder="Platform" />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="linkedin">
//                                       LinkedIn
//                                     </SelectItem>
//                                     <SelectItem value="twitter">
//                                       Twitter
//                                     </SelectItem>
//                                     <SelectItem value="facebook">
//                                       Facebook
//                                     </SelectItem>
//                                     <SelectItem value="instagram">
//                                       Instagram
//                                     </SelectItem>
//                                     <SelectItem value="youtube">
//                                       YouTube
//                                     </SelectItem>
//                                     <SelectItem value="other">Other</SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                                 <Input
//                                   className="col-span-3"
//                                   placeholder="https://..."
//                                   value={link.link}
//                                   onChange={(e) =>
//                                     updateSocialLink(
//                                       index,
//                                       "link",
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                               </div>
//                             ))}
//                             <Button
//                               type="button"
//                               variant="outline"
//                               size="sm"
//                               onClick={addSocialLink}
//                             >
//                               Add Another Social Link
//                             </Button>
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     {/* Step 3: Investment Details */}
//                     {step === 3 && (
//                       <>
//                         <div className="space-y-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="location">Location</Label>
//                             <Input
//                               id="location"
//                               {...investorForm.register("location")}
//                               placeholder="City, Country"
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="foundedAt">Founded Date</Label>
//                             <Popover>
//                               <PopoverTrigger asChild>
//                                 <Button
//                                   variant="outline"
//                                   className="w-full justify-start text-left font-normal"
//                                 >
//                                   <CalendarIcon className="mr-2 h-4 w-4" />
//                                   {investorForm.getValues("foundedAt") ? (
//                                     format(
//                                       investorForm.getValues(
//                                         "foundedAt"
//                                       ) as Date,
//                                       "PPP"
//                                     )
//                                   ) : (
//                                     <span>Pick a date</span>
//                                   )}
//                                 </Button>
//                               </PopoverTrigger>
//                               <PopoverContent className="w-auto p-0">
//                                 <Calendar
//                                   mode="single"
//                                   selected={
//                                     investorForm.getValues("foundedAt") as Date
//                                   }
//                                   onSelect={(date) =>
//                                     investorForm.setValue(
//                                       "foundedAt",
//                                       date as Date
//                                     )
//                                   }
//                                   initialFocus
//                                 />
//                               </PopoverContent>
//                             </Popover>
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="registrationNumber">
//                               Registration Number
//                             </Label>
//                             <Input
//                               id="registrationNumber"
//                               {...investorForm.register("registrationNumber")}
//                               placeholder="Investment firm registration number"
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="description">
//                               Investor Description
//                             </Label>
//                             <Textarea
//                               id="description"
//                               {...investorForm.register("description")}
//                               placeholder="Describe your investment philosophy and focus..."
//                               className="min-h-[100px]"
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="fundingCapacity">
//                               Funding Capacity
//                             </Label>
//                             <Select
//                               onValueChange={(value) =>
//                                 investorForm.setValue("fundingCapacity", value)
//                               }
//                               defaultValue={investorForm.getValues(
//                                 "fundingCapacity"
//                               )}
//                             >
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select funding capacity" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="under_100k">
//                                   Under $100K
//                                 </SelectItem>
//                                 <SelectItem value="100k_500k">
//                                   $100K - $500K
//                                 </SelectItem>
//                                 <SelectItem value="500k_1m">
//                                   $500K - $1M
//                                 </SelectItem>
//                                 <SelectItem value="1m_5m">$1M - $5M</SelectItem>
//                                 <SelectItem value="5m_10m">
//                                   $5M - $10M
//                                 </SelectItem>
//                                 <SelectItem value="10m_plus">$10M+</SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="stage">
//                               Investment Stage Preference
//                             </Label>
//                             <Select
//                               onValueChange={(value) =>
//                                 investorForm.setValue("stage", value)
//                               }
//                               defaultValue={investorForm.getValues("stage")}
//                             >
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select preferred investment stage" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {fundingStatus.map((status) => (
//                                   <SelectItem key={status} value={status}>
//                                     {status}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     {/* Step 4: Documents & Additional Info */}
//                     {step === 4 && (
//                       <>
//                         <div className="space-y-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="amountRaised">
//                               Assets Under Management (USD)
//                             </Label>
//                             <Input
//                               id="amountRaised"
//                               type="number"
//                               {...investorForm.register("amountRaised", {
//                                 setValueAs: (v) =>
//                                   v === "" ? undefined : Number.parseFloat(v),
//                               })}
//                               placeholder="0"
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="businessRegistrationDocuments">
//                               Business Registration Documents
//                             </Label>
//                             <Input
//                               id="businessRegistrationDocuments"
//                               type="file"
//                               className="cursor-pointer"
//                               onChange={(e) => {
//                                 if (e.target.files?.[0]) {
//                                   // In a real app, you'd upload this to storage and save the URL
//                                   investorForm.setValue(
//                                     "businessRegistrationDocuments",
//                                     e.target.files[0].name
//                                   );
//                                 }
//                               }}
//                             />
//                             <p className="text-xs text-muted-foreground">
//                               Upload business registration documents
//                             </p>
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="profileDocuments">
//                               Investment Profile Documents
//                             </Label>
//                             <Input
//                               id="profileDocuments"
//                               type="file"
//                               className="cursor-pointer"
//                               onChange={(e) => {
//                                 if (e.target.files?.[0]) {
//                                   // In a real app, you'd upload this to storage and save the URL
//                                   investorForm.setValue(
//                                     "profileDocuments",
//                                     e.target.files[0].name
//                                   );
//                                 }
//                               }}
//                             />
//                             <p className="text-xs text-muted-foreground">
//                               Upload investment profile or portfolio documents
//                             </p>
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="goalExpected">
//                               Investment Goals
//                             </Label>
//                             <Textarea
//                               id="goalExpected"
//                               {...investorForm.register("goalExpected")}
//                               placeholder="Describe your investment goals and expectations..."
//                               className="min-h-[100px]"
//                             />
//                           </div>
//                         </div>
//                       </>
//                     )}
//                   </form>
//                 )}

//                 {/* ESO Form Steps (Placeholder) */}
//                 {entityType === "ngo" && (
//                   <div className="space-y-4">
//                     <p>NGO onboarding form will be available soon.</p>
//                     <div className="space-y-2">
//                       <Label htmlFor="name">NGO Name</Label>
//                       <Input
//                         id="name"
//                         {...ngoForm.register("name")}
//                         placeholder="Enter NGO name"
//                       />
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//               <CardFooter className="flex justify-between">
//                 <Button type="button" variant="outline" onClick={prevStep}>
//                   <ChevronLeftIcon className="mr-2 h-4 w-4" />
//                   {step === 1 ? "Back to Selection" : "Previous"}
//                 </Button>

//                 {step < totalSteps ? (
//                   <Button type="button" onClick={nextStep}>
//                     Next
//                     <ChevronRightIcon className="ml-2 h-4 w-4" />
//                   </Button>
//                 ) : (
//                   <Button
//                     type="button"
//                     disabled={isLoading}
//                     onClick={
//                       entityType === "company"
//                         ? companyForm.handleSubmit(onSubmit)
//                         : entityType === "investor"
//                         ? investorForm.handleSubmit(onSubmit)
//                         : ngoForm.handleSubmit(onSubmit)
//                     }
//                   >
//                     {isLoading ? "Saving..." : "Complete Profile"}
//                   </Button>
//                 )}
//               </CardFooter>
//             </Card>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
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
  investmentTypes,
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

  // General Business Information
  headOfficeAddress: z.string().optional(),
  businessPhone: z.string().optional(),
  businessDescription: z.string().optional(),
  isYouthLed: z.boolean().optional(),
  isWomanLed: z.boolean().optional(),

  // Ownership & Management
  founderName: z.string().optional(),
  founderGender: z.enum(["male", "female", "prefer_not_to_say"]).optional(),
  founderDob: z.date().optional(),
  founderEducation: z
    .enum([
      "primary",
      "secondary",
      "tertiary",
      "technical_vocational",
      "university",
      "post_graduate",
      "other",
    ])
    .optional(),

  // Tax Compliance
  taxCompliance: z.array(z.string()).optional(),
  sectorLicenses: z
    .enum(["yes_hold", "yes_not_hold", "not_required"])
    .optional(),
  intellectualProperty: z.boolean().optional(),

  // Financial & Banking
  annualTurnover: z.string().optional(),
  businessBankAccount: z.boolean().optional(),
  externalFunding: z.array(z.string()).optional(),
  financialRecords: z.boolean().optional(),

  // Innovation & Digital Tools
  usesDigitalTools: z.boolean().optional(),
  digitalTools: z.array(z.string()).optional(),
  isInnovative: z.boolean().optional(),
  innovationDescription: z.string().optional(),

  // Challenges
  businessChallenges: z.array(z.string()).optional(),
  supportNeeded: z.string().optional(),
  planToExpand: z.boolean().optional(),
  expansionPlans: z.string().optional(),

  // Social & Environmental Impact
  employsVulnerableGroups: z.boolean().optional(),
  addressesEnvironmentalSustainability: z.boolean().optional(),
  impactInitiatives: z.string().optional(),

  // Consent & Follow Up
  joinEcosystemPrograms: z.boolean().optional(),
  agreeToDataStorage: z.boolean().optional(),
  additionalComments: z.string().optional(),
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

// NGO form schema (placeholder)
const ngoFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.string().optional(),
  // Add more fields as needed
});

type EntityType = z.infer<typeof entityTypeSchema>["entityType"];
type CompanyFormData = z.infer<typeof companyFormSchema>;
type InvestorFormData = z.infer<typeof investorFormSchema>;
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
  const totalSteps = 11;

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
      // General Business Information
      headOfficeAddress: "",
      businessPhone: "",
      businessDescription: "",
      isYouthLed: false,
      isWomanLed: false,

      // Ownership & Management
      founderName: "",
      founderGender: undefined,
      founderDob: undefined,
      founderEducation: undefined,

      // Tax Compliance
      taxCompliance: [],
      sectorLicenses: undefined,
      intellectualProperty: false,

      // Financial & Banking
      annualTurnover: "",
      businessBankAccount: false,
      externalFunding: [],
      financialRecords: false,

      // Innovation & Digital Tools
      usesDigitalTools: false,
      digitalTools: [],
      isInnovative: false,
      innovationDescription: "",

      // Challenges
      businessChallenges: [],
      supportNeeded: "",
      planToExpand: false,
      expansionPlans: "",

      // Social & Environmental Impact
      employsVulnerableGroups: false,
      addressesEnvironmentalSustainability: false,
      impactInitiatives: "",

      // Consent & Follow Up
      joinEcosystemPrograms: false,
      agreeToDataStorage: false,
      additionalComments: "",
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
        const result: any = await addInvestor({
          ...data,
          userId: user?.id,
        });

        if (result.success) {
          router.push(`/investors/${result.investorId}`);
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
        : step === 4
        ? "Funding Information"
        : step === 5
        ? "General Business Information"
        : step === 6
        ? "Ownership & Management"
        : step === 7
        ? "Financial & Banking"
        : step === 8
        ? "Innovation & Digital Tools"
        : step === 9
        ? "Challenges Faced"
        : step === 10
        ? "Social & Environmental Impact"
        : "Consent & Follow Up";
    } else if (entityType === "investor") {
      return step === 1
        ? "Basic Information"
        : step === 2
        ? "Contact Information"
        : step === 3
        ? "Investment Details"
        : "Documents & Additional Info";
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
        : step === 4
        ? "Share details about your company's financial situation"
        : step === 5
        ? "Tell us about your business operations"
        : step === 6
        ? "Information about the company's ownership and management"
        : step === 7
        ? "Details about your company's financial practices"
        : step === 8
        ? "Tell us about your use of technology and innovation"
        : step === 9
        ? "What challenges does your business face?"
        : step === 10
        ? "Tell us about your social and environmental impact"
        : "Final permissions and additional information";
    } else if (entityType === "investor") {
      return step === 1
        ? "Let's start with the essentials about your investment firm"
        : step === 2
        ? "How can people reach you?"
        : step === 3
        ? "Tell us more about your investment preferences"
        : "Share additional documents and information";
    } else {
      return step === 1
        ? "Let's start with the essentials about your ESO"
        : step === 2
        ? "How can people reach your organization?"
        : step === 3
        ? "Tell us more about your ESO's mission"
        : "Share additional information";
    }
  };

  const isLoading = companyLoading || investorLoading;

  return (
    <div className=" py-10">
      <div className="p-4 sm:p-6 lg:p-8">
        {step === 0 ? (
          // Entity Type Selection
          <Card className="border-none shadow-none">
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
                            <Label htmlFor="type">Are you</Label>
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
                            <Label htmlFor="stage">Type of Rounds</Label>
                            <Select
                              onValueChange={(value) =>
                                companyForm.setValue("stage", value)
                              }
                              defaultValue={companyForm.getValues("stage")}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select your type of rounds" />
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

                          {/* <div className="space-y-2">
                            <Label htmlFor="registrationNumber">
                              Registration Number
                            </Label>
                            <Input
                              id="registrationNumber"
                              {...companyForm.register("registrationNumber")}
                              placeholder="Company registration number"
                            />
                          </div> */}

                          <div className="space-y-2">
                            <Label htmlFor="registrationNumber">
                              Registration Number
                            </Label>
                            <Input
                              id="registrationNumber"
                              {...companyForm.register("registrationNumber", {
                                required: "Registration number is required",
                                maxLength: {
                                  value: 18,
                                  message: "Must not exceed 18 characters",
                                },
                                pattern: {
                                  value: /^[A-Z0-9\-]+$/i,
                                  message:
                                    "Only letters, numbers, and hyphens are allowed",
                                },
                              })}
                              placeholder="Registration number most be up to 18 character"
                            />
                            {companyForm.formState.errors
                              .registrationNumber && (
                              <p className="text-red-500 text-sm">
                                {
                                  companyForm.formState.errors
                                    .registrationNumber.message
                                }
                              </p>
                            )}
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
                            <Label htmlFor="fundingStatus">Types of Fund</Label>
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

                    {/* Step 5: General Business Information */}
                    {step === 5 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="headOfficeAddress">
                              Head Office Address{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                              id="headOfficeAddress"
                              {...companyForm.register("headOfficeAddress")}
                              placeholder="Enter your head office address"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="businessPhone">Phone</Label>
                            <Input
                              id="businessPhone"
                              {...companyForm.register("businessPhone")}
                              placeholder="Enter your business phone number"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="businessDescription">
                              Brief Description of Business Activities{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                              id="businessDescription"
                              {...companyForm.register("businessDescription")}
                              placeholder="Describe your business activities"
                              className="min-h-[100px]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Is your business youth-led (under 35)?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="youthLedYes"
                                  name="isYouthLed"
                                  checked={
                                    companyForm.getValues("isYouthLed") === true
                                  }
                                  onChange={() =>
                                    companyForm.setValue("isYouthLed", true)
                                  }
                                />
                                <Label
                                  htmlFor="youthLedYes"
                                  className="font-normal"
                                >
                                  Yes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="youthLedNo"
                                  name="isYouthLed"
                                  checked={
                                    companyForm.getValues("isYouthLed") ===
                                    false
                                  }
                                  onChange={() =>
                                    companyForm.setValue("isYouthLed", false)
                                  }
                                />
                                <Label
                                  htmlFor="youthLedNo"
                                  className="font-normal"
                                >
                                  No
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Is your business woman-led?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="womanLedYes"
                                  name="isWomanLed"
                                  checked={
                                    companyForm.getValues("isWomanLed") === true
                                  }
                                  onChange={() =>
                                    companyForm.setValue("isWomanLed", true)
                                  }
                                />
                                <Label
                                  htmlFor="womanLedYes"
                                  className="font-normal"
                                >
                                  Yes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="womanLedNo"
                                  name="isWomanLed"
                                  checked={
                                    companyForm.getValues("isWomanLed") ===
                                    false
                                  }
                                  onChange={() =>
                                    companyForm.setValue("isWomanLed", false)
                                  }
                                />
                                <Label
                                  htmlFor="womanLedNo"
                                  className="font-normal"
                                >
                                  No
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 6: Ownership & Management */}
                    {step === 6 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="founderName">
                              Name of Founder (CEO){" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="founderName"
                              {...companyForm.register("founderName")}
                              placeholder="Enter founder's name"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Gender of Founder{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="genderMale"
                                  name="founderGender"
                                  checked={
                                    companyForm.getValues("founderGender") ===
                                    "male"
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "founderGender",
                                      "male"
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="genderMale"
                                  className="font-normal"
                                >
                                  Male
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="genderFemale"
                                  name="founderGender"
                                  checked={
                                    companyForm.getValues("founderGender") ===
                                    "female"
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "founderGender",
                                      "female"
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="genderFemale"
                                  className="font-normal"
                                >
                                  Female
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="genderPreferNotToSay"
                                  name="founderGender"
                                  checked={
                                    companyForm.getValues("founderGender") ===
                                    "prefer_not_to_say"
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "founderGender",
                                      "prefer_not_to_say"
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="genderPreferNotToSay"
                                  className="font-normal"
                                >
                                  Prefer not to say
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="founderDob">
                              Date of Birth{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {companyForm.getValues("founderDob") ? (
                                    format(
                                      companyForm.getValues(
                                        "founderDob"
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
                                    companyForm.getValues("founderDob") as Date
                                  }
                                  onSelect={(date) =>
                                    companyForm.setValue(
                                      "founderDob",
                                      date as Date
                                    )
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="founderEducation">
                              Educational Background of Founder{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                companyForm.setValue(
                                  "founderEducation",
                                  value as
                                    | "primary"
                                    | "secondary"
                                    | "tertiary"
                                    | "technical_vocational"
                                    | "university"
                                    | "post_graduate"
                                    | "other"
                                    | undefined
                                )
                              }
                              defaultValue={companyForm.getValues(
                                "founderEducation"
                              )}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select educational background" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="primary">Primary</SelectItem>
                                <SelectItem value="secondary">
                                  Secondary
                                </SelectItem>
                                <SelectItem value="tertiary">
                                  Tertiary
                                </SelectItem>
                                <SelectItem value="technical_vocational">
                                  Technical/Vocational
                                </SelectItem>
                                <SelectItem value="university">
                                  University
                                </SelectItem>
                                <SelectItem value="post_graduate">
                                  Post Graduate
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Tax Compliance and Nassit Compliance{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="taxNRA"
                                  checked={companyForm
                                    .getValues("taxCompliance")
                                    ?.includes("nra")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues("taxCompliance") ||
                                      [];
                                    if (checked) {
                                      companyForm.setValue("taxCompliance", [
                                        ...current,
                                        "nra",
                                      ]);
                                    } else {
                                      companyForm.setValue(
                                        "taxCompliance",
                                        current.filter((item) => item !== "nra")
                                      );
                                    }
                                  }}
                                />
                                <Label htmlFor="taxNRA" className="font-normal">
                                  NRA Registration
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="taxNassit"
                                  checked={companyForm
                                    .getValues("taxCompliance")
                                    ?.includes("nassit")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues("taxCompliance") ||
                                      [];
                                    if (checked) {
                                      companyForm.setValue("taxCompliance", [
                                        ...current,
                                        "nassit",
                                      ]);
                                    } else {
                                      companyForm.setValue(
                                        "taxCompliance",
                                        current.filter(
                                          (item) => item !== "nassit"
                                        )
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="taxNassit"
                                  className="font-normal"
                                >
                                  Nassit Registration
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Do you hold / require sector specific licenses?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="licenseYesHold"
                                  name="sectorLicenses"
                                  checked={
                                    companyForm.getValues("sectorLicenses") ===
                                    "yes_hold"
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "sectorLicenses",
                                      "yes_hold"
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="licenseYesHold"
                                  className="font-normal"
                                >
                                  Yes, I hold
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="licenseYesNotHold"
                                  name="sectorLicenses"
                                  checked={
                                    companyForm.getValues("sectorLicenses") ===
                                    "yes_not_hold"
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "sectorLicenses",
                                      "yes_not_hold"
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="licenseYesNotHold"
                                  className="font-normal"
                                >
                                  Yes, but I do not hold
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="licenseNotRequired"
                                  name="sectorLicenses"
                                  checked={
                                    companyForm.getValues("sectorLicenses") ===
                                    "not_required"
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "sectorLicenses",
                                      "not_required"
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="licenseNotRequired"
                                  className="font-normal"
                                >
                                  No, I do not require
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Do you hold any Intellectual Property Rights
                              (Patents, Trademarks)
                            </Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="ipYes"
                                  name="intellectualProperty"
                                  checked={
                                    companyForm.getValues(
                                      "intellectualProperty"
                                    ) === true
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "intellectualProperty",
                                      true
                                    )
                                  }
                                />
                                <Label htmlFor="ipYes" className="font-normal">
                                  Yes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="ipNo"
                                  name="intellectualProperty"
                                  checked={
                                    companyForm.getValues(
                                      "intellectualProperty"
                                    ) === false
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "intellectualProperty",
                                      false
                                    )
                                  }
                                />
                                <Label htmlFor="ipNo" className="font-normal">
                                  No
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 7: Financial & Banking */}
                    {step === 7 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="annualTurnover">
                              Annual Turnover (Estimate){" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="annualTurnover"
                              {...companyForm.register("annualTurnover")}
                              placeholder="Enter estimated annual turnover"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Do you have a business bank account?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="bankYes"
                                  name="businessBankAccount"
                                  checked={
                                    companyForm.getValues(
                                      "businessBankAccount"
                                    ) === true
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "businessBankAccount",
                                      true
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="bankYes"
                                  className="font-normal"
                                >
                                  Yes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="bankNo"
                                  name="businessBankAccount"
                                  checked={
                                    companyForm.getValues(
                                      "businessBankAccount"
                                    ) === false
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "businessBankAccount",
                                      false
                                    )
                                  }
                                />
                                <Label htmlFor="bankNo" className="font-normal">
                                  No
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Have you accessed any external funding?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="fundingNone"
                                  checked={companyForm
                                    .getValues("externalFunding")
                                    ?.includes("none")}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      companyForm.setValue("externalFunding", [
                                        "none",
                                      ]);
                                    } else {
                                      companyForm.setValue(
                                        "externalFunding",
                                        []
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="fundingNone"
                                  className="font-normal"
                                >
                                  None
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="fundingGrants"
                                  checked={companyForm
                                    .getValues("externalFunding")
                                    ?.includes("grants")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues(
                                        "externalFunding"
                                      ) || [];
                                    if (checked) {
                                      const newValue = current.filter(
                                        (item) => item !== "none"
                                      );
                                      companyForm.setValue("externalFunding", [
                                        ...newValue,
                                        "grants",
                                      ]);
                                    } else {
                                      companyForm.setValue(
                                        "externalFunding",
                                        current.filter(
                                          (item) => item !== "grants"
                                        )
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="fundingGrants"
                                  className="font-normal"
                                >
                                  Grants
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="fundingLoans"
                                  checked={companyForm
                                    .getValues("externalFunding")
                                    ?.includes("loans")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues(
                                        "externalFunding"
                                      ) || [];
                                    if (checked) {
                                      const newValue = current.filter(
                                        (item) => item !== "none"
                                      );
                                      companyForm.setValue("externalFunding", [
                                        ...newValue,
                                        "loans",
                                      ]);
                                    } else {
                                      companyForm.setValue(
                                        "externalFunding",
                                        current.filter(
                                          (item) => item !== "loans"
                                        )
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="fundingLoans"
                                  className="font-normal"
                                >
                                  Loans
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="fundingAngel"
                                  checked={companyForm
                                    .getValues("externalFunding")
                                    ?.includes("angel")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues(
                                        "externalFunding"
                                      ) || [];
                                    if (checked) {
                                      const newValue = current.filter(
                                        (item) => item !== "none"
                                      );
                                      companyForm.setValue("externalFunding", [
                                        ...newValue,
                                        "angel",
                                      ]);
                                    } else {
                                      companyForm.setValue(
                                        "externalFunding",
                                        current.filter(
                                          (item) => item !== "angel"
                                        )
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="fundingAngel"
                                  className="font-normal"
                                >
                                  Angel Investment
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="fundingVC"
                                  checked={companyForm
                                    .getValues("externalFunding")
                                    ?.includes("vc")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues(
                                        "externalFunding"
                                      ) || [];
                                    if (checked) {
                                      const newValue = current.filter(
                                        (item) => item !== "none"
                                      );
                                      companyForm.setValue("externalFunding", [
                                        ...newValue,
                                        "vc",
                                      ]);
                                    } else {
                                      companyForm.setValue(
                                        "externalFunding",
                                        current.filter((item) => item !== "vc")
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="fundingVC"
                                  className="font-normal"
                                >
                                  Venture Capital
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="fundingFriends"
                                  checked={companyForm
                                    .getValues("externalFunding")
                                    ?.includes("friends_family")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues(
                                        "externalFunding"
                                      ) || [];
                                    if (checked) {
                                      const newValue = current.filter(
                                        (item) => item !== "none"
                                      );
                                      companyForm.setValue("externalFunding", [
                                        ...newValue,
                                        "friends_family",
                                      ]);
                                    } else {
                                      companyForm.setValue(
                                        "externalFunding",
                                        current.filter(
                                          (item) => item !== "friends_family"
                                        )
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="fundingFriends"
                                  className="font-normal"
                                >
                                  Friends/Family
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                {/* <Checkbox
                                  id="fundingOther"
                                  checked={companyForm.getValues("externalFunding")?.includes("other")}
                                  onCheckedChange={(checked) => {
                                    const current = companyForm.getValues("externalFunding") || [];
                                      => {
                                    const current = companyForm.getValues("externalFunding") || [];
                                    if (checked) {
                                      const newValue = current.filter(item => item !== "none");
                                      companyForm.setValue("externalFunding", [...newValue, "other"]);
                                    } else {
                                      companyForm.setValue("externalFunding", current.filter(item => item !== "other"));
                                    }
                                  }}
                                /> */}

                                <Checkbox
                                  id="fundingOther"
                                  checked={companyForm
                                    .getValues("externalFunding")
                                    ?.includes("other")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues(
                                        "externalFunding"
                                      ) || [];
                                    if (checked) {
                                      const newValue = current.filter(
                                        (item) => item !== "none"
                                      );
                                      companyForm.setValue("externalFunding", [
                                        ...newValue,
                                        "other",
                                      ]);
                                    } else {
                                      companyForm.setValue(
                                        "externalFunding",
                                        current.filter(
                                          (item) => item !== "other"
                                        )
                                      );
                                    }
                                  }}
                                />

                                <Label
                                  htmlFor="fundingOther"
                                  className="font-normal"
                                >
                                  Other
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Do you keep financial records?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="recordsYes"
                                  name="financialRecords"
                                  checked={
                                    companyForm.getValues(
                                      "financialRecords"
                                    ) === true
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "financialRecords",
                                      true
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="recordsYes"
                                  className="font-normal"
                                >
                                  Yes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="recordsNo"
                                  name="financialRecords"
                                  checked={
                                    companyForm.getValues(
                                      "financialRecords"
                                    ) === false
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "financialRecords",
                                      false
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="recordsNo"
                                  className="font-normal"
                                >
                                  No
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 8: Innovation & Digital Tools */}
                    {step === 8 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>
                              Do you use digital tools in your business?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="digitalYes"
                                  name="usesDigitalTools"
                                  checked={
                                    companyForm.getValues(
                                      "usesDigitalTools"
                                    ) === true
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "usesDigitalTools",
                                      true
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="digitalYes"
                                  className="font-normal"
                                >
                                  Yes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="digitalNo"
                                  name="usesDigitalTools"
                                  checked={
                                    companyForm.getValues(
                                      "usesDigitalTools"
                                    ) === false
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "usesDigitalTools",
                                      false
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="digitalNo"
                                  className="font-normal"
                                >
                                  No
                                </Label>
                              </div>
                            </div>
                          </div>

                          {companyForm.getValues("usesDigitalTools") && (
                            <div className="space-y-2">
                              <Label>
                                If yes, which ones?{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="toolMobileMoney"
                                    checked={companyForm
                                      .getValues("digitalTools")
                                      ?.includes("mobile_money")}
                                    onCheckedChange={(checked) => {
                                      const current =
                                        companyForm.getValues("digitalTools") ||
                                        [];
                                      if (checked) {
                                        const current =
                                          companyForm.getValues(
                                            "digitalTools"
                                          ) || [];
                                        companyForm.setValue("digitalTools", [
                                          ...current,
                                          "other",
                                        ]);
                                      } else {
                                        companyForm.setValue(
                                          "digitalTools",
                                          current.filter(
                                            (item) => item !== "other"
                                          )
                                        );
                                      }
                                      if (checked) {
                                        companyForm.setValue("digitalTools", [
                                          ...current,
                                          "mobile_money",
                                        ]);
                                      } else {
                                        companyForm.setValue(
                                          "digitalTools",
                                          current.filter(
                                            (item) => item !== "mobile_money"
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <Label
                                    htmlFor="toolMobileMoney"
                                    className="font-normal"
                                  >
                                    Mobile Money
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="toolAccounting"
                                    checked={companyForm
                                      .getValues("digitalTools")
                                      ?.includes("accounting_software")}
                                    onCheckedChange={(checked) => {
                                      const current =
                                        companyForm.getValues("digitalTools") ||
                                        [];
                                      if (checked) {
                                        companyForm.setValue("digitalTools", [
                                          ...current,
                                          "accounting_software",
                                        ]);
                                      } else {
                                        companyForm.setValue(
                                          "digitalTools",
                                          current.filter(
                                            (item) =>
                                              item !== "accounting_software"
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <Label
                                    htmlFor="toolAccounting"
                                    className="font-normal"
                                  >
                                    Accounting Software
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="toolPOS"
                                    checked={companyForm
                                      .getValues("digitalTools")
                                      ?.includes("pos")}
                                    onCheckedChange={(checked) => {
                                      const current =
                                        companyForm.getValues("digitalTools") ||
                                        [];
                                      if (checked) {
                                        companyForm.setValue("digitalTools", [
                                          ...current,
                                          "pos",
                                        ]);
                                      } else {
                                        companyForm.setValue(
                                          "digitalTools",
                                          current.filter(
                                            (item) => item !== "pos"
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <Label
                                    htmlFor="toolPOS"
                                    className="font-normal"
                                  >
                                    POS
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="toolEcommerce"
                                    checked={companyForm
                                      .getValues("digitalTools")
                                      ?.includes("ecommerce")}
                                    onCheckedChange={(checked) => {
                                      const current =
                                        companyForm.getValues("digitalTools") ||
                                        [];
                                      if (checked) {
                                        companyForm.setValue("digitalTools", [
                                          ...current,
                                          "ecommerce",
                                        ]);
                                      } else {
                                        companyForm.setValue(
                                          "digitalTools",
                                          current.filter(
                                            (item) => item !== "ecommerce"
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <Label
                                    htmlFor="toolEcommerce"
                                    className="font-normal"
                                  >
                                    E-commerce Platforms
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="toolSocialMedia"
                                    checked={companyForm
                                      .getValues("digitalTools")
                                      ?.includes("social_media")}
                                    onCheckedChange={(checked) => {
                                      const current =
                                        companyForm.getValues("digitalTools") ||
                                        [];
                                      if (checked) {
                                        companyForm.setValue("digitalTools", [
                                          ...current,
                                          "social_media",
                                        ]);
                                      } else {
                                        companyForm.setValue(
                                          "digitalTools",
                                          current.filter(
                                            (item) => item !== "social_media"
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <Label
                                    htmlFor="toolSocialMedia"
                                    className="font-normal"
                                  >
                                    Social Media Marketing
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="toolCRM"
                                    checked={companyForm
                                      .getValues("digitalTools")
                                      ?.includes("crm_erp")}
                                    onCheckedChange={(checked) => {
                                      const current =
                                        companyForm.getValues("digitalTools") ||
                                        [];
                                      if (checked) {
                                        companyForm.setValue("digitalTools", [
                                          ...current,
                                          "crm_erp",
                                        ]);
                                      } else {
                                        companyForm.setValue(
                                          "digitalTools",
                                          current.filter(
                                            (item) => item !== "crm_erp"
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <Label
                                    htmlFor="toolCRM"
                                    className="font-normal"
                                  >
                                    CRM / ERP Tools
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {/* <Checkbox
                                    id="toolOther"
                                    checked={companyForm.getValues("digitalTools")?.includes("other")}
                                    onCheckedChange={(checked) => {
                                      const current = companyForm.getValues("digitalTools") || [];
                                        => {
                                      const current = companyForm.getValues("digitalTools") || [];
                                      if (checked) {
                                        companyForm.setValue("digitalTools", [...current, "other"]);
                                      } else {
                                        companyForm.setValue("digitalTools", current.filter(item => item !== "other"));
                                      }
                                    }}
                                  /> */}

                                  <Label
                                    htmlFor="toolOther"
                                    className="font-normal"
                                  >
                                    Other
                                  </Label>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="space-y-2">
                            <Label>
                              Do you consider your business innovative?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="innovativeYes"
                                  name="isInnovative"
                                  checked={
                                    companyForm.getValues("isInnovative") ===
                                    true
                                  }
                                  onChange={() =>
                                    companyForm.setValue("isInnovative", true)
                                  }
                                />
                                <Label
                                  htmlFor="innovativeYes"
                                  className="font-normal"
                                >
                                  Yes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="innovativeNo"
                                  name="isInnovative"
                                  checked={
                                    companyForm.getValues("isInnovative") ===
                                    false
                                  }
                                  onChange={() =>
                                    companyForm.setValue("isInnovative", false)
                                  }
                                />
                                <Label
                                  htmlFor="innovativeNo"
                                  className="font-normal"
                                >
                                  No
                                </Label>
                              </div>
                            </div>
                          </div>

                          {companyForm.getValues("isInnovative") && (
                            <div className="space-y-2">
                              <Label htmlFor="innovationDescription">
                                Explain how your business is innovative{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <Textarea
                                id="innovationDescription"
                                {...companyForm.register(
                                  "innovationDescription"
                                )}
                                placeholder="Describe how your business is innovative"
                                className="min-h-[100px]"
                              />
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {/* Step 9: Challenges */}
                    {step === 9 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>CHALLENGES FACED BY YOUR BUSINESS</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="challengeFinance"
                                  checked={companyForm
                                    .getValues("businessChallenges")
                                    ?.includes("finance")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues(
                                        "businessChallenges"
                                      ) || [];
                                    if (checked) {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        [...current, "finance"]
                                      );
                                    } else {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        current.filter(
                                          (item) => item !== "finance"
                                        )
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="challengeFinance"
                                  className="font-normal"
                                >
                                  Access to Finance
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="challengeMarket"
                                  checked={companyForm
                                    .getValues("businessChallenges")
                                    ?.includes("market")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues(
                                        "businessChallenges"
                                      ) || [];
                                    if (checked) {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        [...current, "market"]
                                      );
                                    } else {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        current.filter(
                                          (item) => item !== "market"
                                        )
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="challengeMarket"
                                  className="font-normal"
                                >
                                  Market Access
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="challengeLabor"
                                  checked={companyForm
                                    .getValues("businessChallenges")
                                    ?.includes("labor")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues(
                                        "businessChallenges"
                                      ) || [];
                                    if (checked) {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        [...current, "labor"]
                                      );
                                    } else {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        current.filter(
                                          (item) => item !== "labor"
                                        )
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="challengeLabor"
                                  className="font-normal"
                                >
                                  Skilled Labour
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="challengeMaterials"
                                  checked={companyForm
                                    .getValues("businessChallenges")
                                    ?.includes("materials")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues(
                                        "businessChallenges"
                                      ) || [];
                                    if (checked) {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        [...current, "materials"]
                                      );
                                    } else {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        current.filter(
                                          (item) => item !== "materials"
                                        )
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="challengeMaterials"
                                  className="font-normal"
                                >
                                  Raw Materials
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="challengeInfrastructure"
                                  checked={companyForm
                                    .getValues("businessChallenges")
                                    ?.includes("infrastructure")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues(
                                        "businessChallenges"
                                      ) || [];
                                    if (checked) {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        [...current, "infrastructure"]
                                      );
                                    } else {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        current.filter(
                                          (item) => item !== "infrastructure"
                                        )
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="challengeInfrastructure"
                                  className="font-normal"
                                >
                                  Infrastructure
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="challengeRegulation"
                                  checked={companyForm
                                    .getValues("businessChallenges")
                                    ?.includes("regulation")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues(
                                        "businessChallenges"
                                      ) || [];
                                    if (checked) {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        [...current, "regulation"]
                                      );
                                    } else {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        current.filter(
                                          (item) => item !== "regulation"
                                        )
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="challengeRegulation"
                                  className="font-normal"
                                >
                                  Regulation / Compliance
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="challengeDigital"
                                  checked={companyForm
                                    .getValues("businessChallenges")
                                    ?.includes("digital")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues(
                                        "businessChallenges"
                                      ) || [];
                                    if (checked) {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        [...current, "digital"]
                                      );
                                    } else {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        current.filter(
                                          (item) => item !== "digital"
                                        )
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="challengeDigital"
                                  className="font-normal"
                                >
                                  Digital Skills
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="challengeOthers"
                                  checked={companyForm
                                    .getValues("businessChallenges")
                                    ?.includes("others")}
                                  onCheckedChange={(checked) => {
                                    const current =
                                      companyForm.getValues(
                                        "businessChallenges"
                                      ) || [];
                                    if (checked) {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        [...current, "others"]
                                      );
                                    } else {
                                      companyForm.setValue(
                                        "businessChallenges",
                                        current.filter(
                                          (item) => item !== "others"
                                        )
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor="challengeOthers"
                                  className="font-normal"
                                >
                                  Others
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="supportNeeded">
                              What support does your business need?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                              id="supportNeeded"
                              {...companyForm.register("supportNeeded")}
                              placeholder="Describe the support your business needs"
                              className="min-h-[100px]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Do you plan to expand in the next 12 months?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="expandYes"
                                  name="planToExpand"
                                  checked={
                                    companyForm.getValues("planToExpand") ===
                                    true
                                  }
                                  onChange={() =>
                                    companyForm.setValue("planToExpand", true)
                                  }
                                />
                                <Label
                                  htmlFor="expandYes"
                                  className="font-normal"
                                >
                                  Yes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="expandNo"
                                  name="planToExpand"
                                  checked={
                                    companyForm.getValues("planToExpand") ===
                                    false
                                  }
                                  onChange={() =>
                                    companyForm.setValue("planToExpand", false)
                                  }
                                />
                                <Label
                                  htmlFor="expandNo"
                                  className="font-normal"
                                >
                                  No
                                </Label>
                              </div>
                            </div>
                          </div>

                          {companyForm.getValues("planToExpand") && (
                            <div className="space-y-2">
                              <Label htmlFor="expansionPlans">
                                If yes, how do you plan to grow?{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <Textarea
                                id="expansionPlans"
                                {...companyForm.register("expansionPlans")}
                                placeholder="Describe your expansion plans"
                                className="min-h-[100px]"
                              />
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {/* Step 10: Social & Environmental Impact */}
                    {step === 10 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>
                              Do you create employment for vulnerable groups
                              (youth, women, PWD)?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="vulnerableYes"
                                  name="employsVulnerableGroups"
                                  checked={
                                    companyForm.getValues(
                                      "employsVulnerableGroups"
                                    ) === true
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "employsVulnerableGroups",
                                      true
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="vulnerableYes"
                                  className="font-normal"
                                >
                                  Yes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="vulnerableNo"
                                  name="employsVulnerableGroups"
                                  checked={
                                    companyForm.getValues(
                                      "employsVulnerableGroups"
                                    ) === false
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "employsVulnerableGroups",
                                      false
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="vulnerableNo"
                                  className="font-normal"
                                >
                                  No
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Do you actively address environmental
                              sustainability?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="environmentYes"
                                  name="addressesEnvironmentalSustainability"
                                  checked={
                                    companyForm.getValues(
                                      "addressesEnvironmentalSustainability"
                                    ) === true
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "addressesEnvironmentalSustainability",
                                      true
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="environmentYes"
                                  className="font-normal"
                                >
                                  Yes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="environmentNo"
                                  name="addressesEnvironmentalSustainability"
                                  checked={
                                    companyForm.getValues(
                                      "addressesEnvironmentalSustainability"
                                    ) === false
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "addressesEnvironmentalSustainability",
                                      false
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="environmentNo"
                                  className="font-normal"
                                >
                                  No
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="impactInitiatives">
                              Please describe any impact initiatives{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                              id="impactInitiatives"
                              {...companyForm.register("impactInitiatives")}
                              placeholder="Describe your social and environmental impact initiatives"
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 11: Consent & Follow Up */}
                    {step === 11 && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>
                              Would you like to be part of Innovation SL's
                              ecosystem support programs?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="ecosystemYes"
                                  name="joinEcosystemPrograms"
                                  checked={
                                    companyForm.getValues(
                                      "joinEcosystemPrograms"
                                    ) === true
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "joinEcosystemPrograms",
                                      true
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="ecosystemYes"
                                  className="font-normal"
                                >
                                  Yes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="ecosystemNo"
                                  name="joinEcosystemPrograms"
                                  checked={
                                    companyForm.getValues(
                                      "joinEcosystemPrograms"
                                    ) === false
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "joinEcosystemPrograms",
                                      false
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="ecosystemNo"
                                  className="font-normal"
                                >
                                  No
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Do you agree with us for storing and analyzing
                              your data for ecosystem development purposes?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="dataStorageYes"
                                  name="agreeToDataStorage"
                                  checked={
                                    companyForm.getValues(
                                      "agreeToDataStorage"
                                    ) === true
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "agreeToDataStorage",
                                      true
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="dataStorageYes"
                                  className="font-normal"
                                >
                                  Yes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="Specify the purpose of this input"
                                  type="radio"
                                  id="dataStorageNo"
                                  name="agreeToDataStorage"
                                  checked={
                                    companyForm.getValues(
                                      "agreeToDataStorage"
                                    ) === false
                                  }
                                  onChange={() =>
                                    companyForm.setValue(
                                      "agreeToDataStorage",
                                      false
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="dataStorageNo"
                                  className="font-normal"
                                >
                                  No
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="additionalComments">
                              Any other comments or suggestions?{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                              id="additionalComments"
                              {...companyForm.register("additionalComments")}
                              placeholder="Share any additional comments or suggestions"
                              className="min-h-[100px]"
                            />
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
                                {investmentTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Sectors Interested{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                              {sectorsData.map((sector) => (
                                <div
                                  key={sector.title}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`sector-${sector}`}
                                    checked={selectedSectors.includes(
                                      sector.title
                                    )}
                                    onCheckedChange={() =>
                                      toggleSector(sector.title)
                                    }
                                  />
                                  <Label
                                    htmlFor={`sector-${sector}`}
                                    className="font-normal capitalize"
                                  >
                                    {sector.title.replace("_", " ")}
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

                          {/* <div className="space-y-2">
                            <Label htmlFor="registrationNumber">
                              Registration Number
                            </Label>
                            <Input
                              id="registrationNumber"
                              {...investorForm.register("registrationNumber")}
                              placeholder="Investment firm registration number"
                            />
                          </div> */}

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
                            <Label htmlFor="fundingCapacity">Ticket Size</Label>
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
                                {fundingStatus.map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status}
                                  </SelectItem>
                                ))}
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

                {/* ESO Form Steps (Placeholder) */}
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
