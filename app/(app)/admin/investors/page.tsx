"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  DollarSign,
} from "lucide-react";
import { investors } from "@/lib/mock-data";

// Mock authentication components
const UserButton = () => (
  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200">
    <span className="text-sm font-medium">AD</span>
  </div>
);

// Convert server actions to client-side functions
async function approveInvestor(investorId: number) {
  console.log(`Approving investor ${investorId}`);
  // In a real app, this would call an API endpoint
  return { success: true };
}

async function rejectInvestor(investorId: number) {
  console.log(`Rejecting investor ${investorId}`);
  // In a real app, this would call an API endpoint
  return { success: true };
}

function InvestorCard({ investor }: { investor: (typeof investors)[0] }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      await approveInvestor(investor.id);
      // In a real app, you would refresh the data or update the UI
    } catch (error) {
      console.error("Error approving investor:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    try {
      await rejectInvestor(investor.id);
      // In a real app, you would refresh the data or update the UI
    } catch (error) {
      console.error("Error rejecting investor:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="transition-all bg-white border shadow-sm dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl hover:shadow-md">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 rounded-full shadow">
            <AvatarImage
              src={investor.avatar || "/placeholder.svg"}
              alt={investor.name}
            />
            <AvatarFallback>
              {investor.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between">
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white">
                {investor.name}
              </CardTitle>
              <Badge
                variant={getStatusColor(investor.approvalStatus)}
                className="text-xs"
              >
                {investor.approvalStatus}
              </Badge>
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {investor.position}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {investor.company}
            </p>
          </div>
        </div>
      </CardHeader>

      {/* <CardContent className="pt-0">
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
          {investor.bio}
        </p>

        <div className="my-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>{investor.investmentRange}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{investor.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              Applied: {new Date(investor.submittedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Investment Sectors:
          </p>
          <div className="flex flex-wrap gap-2">
            {investor.sectors.map((sector, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                {sector}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link href={`/admin/investors/${investor.id}`}>
            <Button variant="outline" className="w-full sm:w-auto">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </Link>

          {investor.approvalStatus === "pending" && (
            <div className="flex w-full gap-2 sm:w-auto">
              <Button
                size="sm"
                className="w-full text-white bg-green-600 hover:bg-green-700 sm:w-auto"
                onClick={handleApprove}
                disabled={isProcessing}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="w-full sm:w-auto"
                onClick={handleReject}
                disabled={isProcessing}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardContent> */}

      <CardContent className="px-6 pt-0 pb-6">
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
          {investor.bio}
        </p>

        <div className="my-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>{investor.investmentRange}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{investor.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              Applied: {new Date(investor.submittedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Investment Sectors:
          </p>
          <div className="flex flex-wrap gap-2">
            {investor.sectors.map((sector, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                {sector}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href={`/admin/investors/${investor.id}`}>
            <Button
              variant="outline"
              className="w-full sm:w-auto min-w-[120px]"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </Link>

          {investor.approvalStatus === "pending" && (
            <div className="flex flex-wrap w-full gap-2 sm:w-auto">
              <Button
                size="sm"
                className="w-full sm:w-auto min-w-[100px] text-white bg-green-600 hover:bg-green-700 flex items-center justify-center"
                onClick={handleApprove}
                disabled={isProcessing}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="w-full sm:w-auto min-w-[100px] flex items-center justify-center"
                onClick={handleReject}
                disabled={isProcessing}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Rest of the component remains the same
export default function AdminInvestorsPage() {
  const pendingInvestors = investors.filter(
    (i) => i.approvalStatus === "pending"
  );
  const approvedInvestors = investors.filter(
    (i) => i.approvalStatus === "approved"
  );
  const rejectedInvestors = investors.filter(
    (i) => i.approvalStatus === "rejected"
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-slate-200 dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
                Investor Management
              </h1>
              <p className="text-slate-600 dark:text-slate-200">
                Review and approve investor applications
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold text-orange-600">
                {pendingInvestors.length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-200">
                Pending Review
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-600">
                {approvedInvestors.length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-200">
                Approved
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <XCircle className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <p className="text-2xl font-bold text-red-600">
                {rejectedInvestors.length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-200">
                Rejected
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Investors */}
        {pendingInvestors.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-orange-600" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
                Pending Investors
              </h2>
              <Badge variant="secondary">{pendingInvestors.length}</Badge>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pendingInvestors.map((investor) => (
                <InvestorCard key={investor.id} investor={investor} />
              ))}
            </div>
          </section>
        )}

        {/* Approved Investors */}
        {approvedInvestors.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
                Approved Investors
              </h2>
              <Badge variant="default">{approvedInvestors.length}</Badge>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {approvedInvestors.map((investor) => (
                <InvestorCard key={investor.id} investor={investor} />
              ))}
            </div>
          </section>
        )}

        {/* Rejected Investors */}
        {rejectedInvestors.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <XCircle className="w-5 h-5 text-red-600" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
                Rejected Investors
              </h2>
              <Badge variant="destructive">{rejectedInvestors.length}</Badge>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rejectedInvestors.map((investor) => (
                <InvestorCard key={investor.id} investor={investor} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
