"use server";

import { revalidatePath } from "next/cache";

import Company from "@/models/Company";
import { connect } from "@/lib/mongoDB";
import { auth, clerkClient } from "@clerk/nextjs/server";

// Add a new company
export async function createCompany(data: any) {
  try {
    await connect();
    const { userId } = await auth();

    if (!userId) {
      return { message: "No Logged In User" };
    }

    const newCompany = await new Company(data);
    const company = await newCompany.save();

    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        onboardingCompleted: true,
        companyId: company._id,
        companyName: company.name,
        role: "company",
      },
    });

    return JSON.parse(JSON.stringify({ success: true, company }));
  } catch (error) {
    console.error("Error creating company:", error);
    return { success: false, error: "Failed to create company" };
  }
}

// Update an existing company
export async function updateCompanyAction(id: string, data: Partial<Company>) {
  try {
    // Update the company
    const company = await updateCompany(id, data);

    if (!company) {
      return { success: false, error: "Company not found" };
    }

    // Revalidate the company detail and list pages
    revalidatePath(`/companies/${id}`);
    revalidatePath("/companies");

    return { success: true, company };
  } catch (error) {
    console.error("Error updating company:", error);
    return { success: false, error: "Failed to update company" };
  }
}

// Get all companies with filters
export async function getCompaniesAction(filters?: {
  userId?: string;
  sector?: string;
  stage?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const result = await getAllCompanies(filters);
    return { success: true, ...result };
  } catch (error) {
    console.error("Error fetching companies:", error);
    return {
      success: false,
      error: "Failed to fetch companies",
      data: [],
      total: 0,
      page: 1,
      totalPages: 0,
    };
  }
}

// Get a single company by ID
export async function getCompanyByIdAction(id: string) {
  try {
    await connect();
    const company = await Company.findById(id);

    if (!company) {
      return { success: false, error: "Company not found" };
    }

    return { success: true, company };
  } catch (error: any) {
    console.error("Error fetching company:", error);
    return { success: false, error: "Failed to fetch company" };
  }
}

// Delete a company
export async function deleteCompanyAction(id: string) {
  try {
    // In a real app, you would verify the user has permission to delete this company

    const deleted = await deleteCompany(id);

    if (!deleted) {
      return {
        success: false,
        error: "Company not found or could not be deleted",
      };
    }

    // Revalidate the companies list page
    revalidatePath("/companies");

    return { success: true };
  } catch (error) {
    console.error("Error deleting company:", error);
    return { success: false, error: "Failed to delete company" };
  }
}
