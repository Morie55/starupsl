"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import InvestorInterestForm from "@/components/investor-interest-form";

export default function ExpressInterestPage() {
  const params = useParams();
  const router = useRouter();
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch the company data from your API
    // This is a placeholder to simulate fetching company data
    const fetchCompany = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch(`/api/companies/${params.id}`);
        // const data = await response.json();

        // Simulating API response
        setTimeout(() => {
          setCompany({
            _id: params.id,
            name: "Example Company",
            // Other company details would be here
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching company:", error);
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCompany();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse">Loading company information...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <Link
          href={`/companies/${params.id}`}
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Company Details
        </Link>
      </div>

      <InvestorInterestForm company={company} />
    </div>
  );
}
