"use server";

import { revalidatePath } from "next/cache";

import { auth, clerkClient } from "@clerk/nextjs/server";
import Investor from "@/models/Investor";
import { connect } from "@/lib/mongoDB";
import { ObjectId } from "mongodb";

// Investor Mock Data

const mockInvestors = [
  {
    id: "1",
    name: "Acme Ventures",
    email: "contact@acmeventures.com",
    registrationDate: new Date("2024-01-15"),
    status: "Pending" as const,
    type: "Venture Capital",
    fundingCapacity: "$1M - $5M",
  },
  {
    id: "2",
    name: "Tech Angels Group",
    email: "info@techangels.com",
    registrationDate: new Date("2024-01-18"),
    status: "Pending" as const,
    type: "Angel Investor",
    fundingCapacity: "$100K - $500K",
  },
  {
    id: "3",
    name: "Growth Capital Partners",
    email: "partners@growthcap.com",
    registrationDate: new Date("2024-01-20"),
    status: "Approved" as const,
    type: "Private Equity",
    fundingCapacity: "$5M - $10M",
  },
  {
    id: "4",
    name: "Innovation Fund",
    email: "hello@innovationfund.com",
    registrationDate: new Date("2024-01-22"),
    status: "Pending" as const,
    type: "Corporate VC",
    fundingCapacity: "$500K - $1M",
  },
  {
    id: "5",
    name: "Seed Investors LLC",
    email: "team@seedinvestors.com",
    registrationDate: new Date("2024-01-25"),
    status: "Rejected" as const,
    type: "Seed Fund",
    fundingCapacity: "Under $100K",
  },
  {
    id: "6",
    name: "Alpha Capital Management",
    email: "invest@alphacapital.com",
    registrationDate: new Date("2024-02-01"),
    status: "Pending" as const,
    type: "Hedge Fund",
    fundingCapacity: "$10M+",
  },
  {
    id: "7",
    name: "Beta Venture Partners",
    email: "contact@betaventures.com",
    registrationDate: new Date("2024-02-05"),
    status: "Approved" as const,
    type: "Venture Capital",
    fundingCapacity: "$1M - $5M",
  },
  {
    id: "8",
    name: "Gamma Investment Group",
    email: "info@gammainvest.com",
    registrationDate: new Date("2024-02-10"),
    status: "Pending" as const,
    type: "Family Office",
    fundingCapacity: "$500K - $1M",
  },
  {
    id: "9",
    name: "Delta Angels Network",
    email: "network@deltaangels.com",
    registrationDate: new Date("2024-02-15"),
    status: "Rejected" as const,
    type: "Angel Investor",
    fundingCapacity: "$100K - $500K",
  },
  {
    id: "10",
    name: "Epsilon Growth Fund",
    email: "growth@epsilonfund.com",
    registrationDate: new Date("2024-02-20"),
    status: "Approved" as const,
    type: "Growth Equity",
    fundingCapacity: "$5M - $10M",
  },
];

// Check if MongoDB is available
const isMongoDBAvailable = () => {
  const uri = process.env.MONGODB_URI;
  return (
    uri && (uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"))
  );
};

// Add a new investor
export async function createInvestor(data: any) {
  try {
    await connect();
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

    return JSON.parse(JSON.stringify({ success: true, investor: investor }));
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
    await connect();
    console.log(filters);
    const result = await Investor.find();

    return JSON.parse(JSON.stringify({ success: true, data: result }));
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
    await connect();
    const investor = await Investor.findById(id);

    if (!investor) {
      return { success: false, error: "Investor not found" };
    }

    return JSON.parse(JSON.stringify({ success: true, investor: investor }));
  } catch (error) {
    console.error("Error fetching investor:", error);
    return { success: false, error: "Failed to fetch investor" };
  }
}

// Delete an investor
export async function deleteInvestorAction(id: string) {
  try {
    // In a real app, you would verify the user has permission to delete this investor

    const deleted = {};

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

export async function getPendingInvestors() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const userRole = (sessionClaims?.metadata as { role?: string })?.role;

  if (userRole !== "admin") {
    throw new Error("Insufficient permissions");
  }

  try {
    const db = await connect();

    // Fetch investors from MongoDB
    // Adjust the query based on your actual collection and schema
    const investors = await db
      .collection("investors")
      .find({})
      .sort({ registrationDate: -1 })
      .toArray();

    // Transform MongoDB documents to match the expected format
    return investors.map((investor) => ({
      id: investor._id.toString(),
      name: investor.name,
      email: investor.email,
      registrationDate: new Date(investor.registrationDate),
      status: investor.status || "Pending",
      type: investor.type,
      fundingCapacity: investor.fundingCapacity,
    }));
  } catch (error) {
    console.error("Error fetching investors:", error);
    throw new Error("Failed to fetch investors");
  }
}

export async function approveInvestor(investorId: string) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  const userRole = (sessionClaims?.metadata as { role?: string })?.role;

  if (userRole !== "admin") {
    return { success: false, error: "Insufficient permissions" };
  }

  try {
    const db = await connect();

    // Update investor status in MongoDB
    const result = await db.collection("investors").updateOne(
      { _id: new ObjectId(investorId) },
      {
        $set: {
          status: "Approved",
          approvedAt: new Date(),
          approvedBy: userId,
        },
      }
    );

    if (result.matchedCount === 0) {
      return { success: false, error: "Investor not found" };
    }

    revalidatePath("/admin/investor-approvals");
    return { success: true };
  } catch (error) {
    console.error("Error approving investor:", error);
    return { success: false, error: "Failed to approve investor" };
  }
}

export async function rejectInvestor(investorId: string) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  const userRole = (sessionClaims?.metadata as { role?: string })?.role;

  if (userRole !== "admin") {
    return { success: false, error: "Insufficient permissions" };
  }

  try {
    const db = await connect();

    // Update investor status in MongoDB
    const result = await db.collection("investors").updateOne(
      { _id: new ObjectId(investorId) },
      {
        $set: {
          status: "Rejected",
          rejectedAt: new Date(),
          rejectedBy: userId,
        },
      }
    );

    if (result.matchedCount === 0) {
      return { success: false, error: "Investor not found" };
    }

    revalidatePath("/admin/investor-approvals");
    return { success: true };
  } catch (error) {
    console.error("Error rejecting investor:", error);
    return { success: false, error: "Failed to reject investor" };
  }
}
