"use server";

import { z } from "zod";

// Form schema for validation
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  organization: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  investorType: z.enum([
    "Individual",
    "Angel",
    "VC Firm",
    "Corporate",
    "Other",
  ]),
  roundTitle: z.string().min(1, { message: "Round title is required" }),
  startupId: z.string(),
  investmentCurrency: z.string().default("USD"),
  investmentAmount: z.coerce
    .number()
    .min(100, { message: "Minimum investment amount must be at least 100" }),
  investmentType: z.enum([
    "Equity",
    "Convertible Note",
    "Debt",
    "SAFE",
    "Other",
  ]),
  investmentRationale: z.string().optional(),
  engagementPreferences: z.object({
    wantUpdates: z.boolean().default(false),
    strategicPartnership: z.boolean().default(false),
    advisoryRole: z.boolean().default(false),
    meetTeam: z.boolean().default(false),
  }),
  previousExperience: z.string().optional(),
  preferredContactMethod: z.enum([
    "Email",
    "Phone Call",
    "Video Call",
    "In-Person Meeting",
  ]),
  additionalQuestions: z.string().optional(),
  commitmentConfirmed: z.boolean(),
});

export async function submitInvestorInterest(formData: FormData) {
  // Extract and validate form data
  const validatedFields = formSchema.safeParse({
    fullName: formData.get("fullName"),
    organization: formData.get("organization"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    investorType: formData.get("investorType"),
    roundTitle: formData.get("roundTitle"),
    startupId: formData.get("startupId"),
    investmentCurrency: formData.get("investmentCurrency"),
    investmentAmount: formData.get("investmentAmount"),
    investmentType: formData.get("investmentType"),
    investmentRationale: formData.get("investmentRationale"),
    engagementPreferences: {
      wantUpdates: formData.get("engagementPreferences.wantUpdates") === "on",
      strategicPartnership:
        formData.get("engagementPreferences.strategicPartnership") === "on",
      advisoryRole: formData.get("engagementPreferences.advisoryRole") === "on",
      meetTeam: formData.get("engagementPreferences.meetTeam") === "on",
    },
    previousExperience: formData.get("previousExperience"),
    preferredContactMethod: formData.get("preferredContactMethod"),
    additionalQuestions: formData.get("additionalQuestions"),
    commitmentConfirmed: formData.get("commitmentConfirmed") === "on",
  });

  // Return early if validation fails
  if (!validatedFields.success) {
    return {
      error: "Invalid form data",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Process the validated data
  const data = validatedFields.data;

  try {
    // Here you would typically save to your database using Mongoose
    // For example:
    await InvestorInterest.create({
      ...data,
      investorId: "user-id-from-auth", // You'd get this from your auth system
    });

    // For now, we'll just simulate a successful submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { success: true };
  } catch (error) {
    console.error("Error submitting investor interest:", error);
    return {
      error: "Failed to submit investor interest",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
