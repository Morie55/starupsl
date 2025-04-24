"use server";

import { revalidatePath } from "next/cache";

import { auth, clerkClient } from "@clerk/nextjs/server";
import Investor from "@/models/Investor";

// Add a new investor
export async function createInvestor(data: any) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { message: "No Logged In User" };
    }

    const newInvestor = await new Investor(data);
    const investor = await newInvestor.save();

    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        onboardingCompleted: true,
        companyId: investor._id,
        companyName: investor.name,
        role: "investor",
      },
    });

    return JSON.parse(JSON.stringify({ success: true, investor }));
  } catch (error) {
    console.error("Error creating investor:", error);
    return { success: false, error: "Failed to create investor" };
  }
}

// Update an existing investor
export async function updateInvestorAction(
  id: string,
  data: Partial<Investor>
) {
  try {
    // In a real app, you would verify the user has permission to update this investor

    // Update the investor
    const investor = await updateInvestor(id, data);

    if (!investor) {
      return { success: false, error: "Investor not found" };
    }

    // Revalidate the investor detail and list pages
    revalidatePath(`/investors/${id}`);
    revalidatePath("/investors");

    return { success: true, investor };
  } catch (error) {
    console.error("Error updating investor:", error);
    return { success: false, error: "Failed to update investor" };
  }
}

// Get all investors with filters
export async function getInvestorsAction(filters?: {
  userId?: string;
  sectorInterested?: string;
  type?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const result = await getAllInvestors(filters);
    return { success: true, ...result };
  } catch (error) {
    console.error("Error fetching investors:", error);
    return {
      success: false,
      error: "Failed to fetch investors",
      data: [],
      total: 0,
      page: 1,
      totalPages: 0,
    };
  }
}

// Get a single investor by ID
export async function getInvestorByIdAction(id: string) {
  try {
    const investor = await getInvestorById(id);

    if (!investor) {
      return { success: false, error: "Investor not found" };
    }

    return { success: true, investor };
  } catch (error) {
    console.error("Error fetching investor:", error);
    return { success: false, error: "Failed to fetch investor" };
  }
}

// Delete an investor
export async function deleteInvestorAction(id: string) {
  try {
    // In a real app, you would verify the user has permission to delete this investor

    const deleted = await deleteInvestor(id);

    if (!deleted) {
      return {
        success: false,
        error: "Investor not found or could not be deleted",
      };
    }

    // Revalidate the investors list page
    revalidatePath("/investors");

    return { success: true };
  } catch (error) {
    console.error("Error deleting investor:", error);
    return { success: false, error: "Failed to delete investor" };
  }
}
