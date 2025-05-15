"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarIcon,
  Download,
  Edit,
  Share2,
  Trash2,
  Users,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
// import { useRounds } from "@/context/rounds-context";
import { useRounds } from "@/contexts/rounds-context";
import { RoundFormData } from "@/types/types";
import { deleteRound } from "@/app/actions/round-actions";

// Helper function to get status badge color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "draft":
      return "bg-gray-200 text-gray-800";
    case "under review":
      return "bg-yellow-100 text-yellow-800";
    case "open":
      return "bg-green-100 text-green-800";
    case "closed":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

export default function RoundDetail({ round }: { round: RoundFormData }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  async function handleDelete() {
    try {
      await deleteRound(round._id!);
      toast({
        title: "Round deleted",
        description: "The funding round has been permanently deleted.",
        variant: "destructive",
      });
      window.location.href = "/rounds";
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete round",
        variant: "destructive",
      });
    }
  }

  if (!round) {
    return (
      <div className=" py-8">
        <Card>
          <CardContent className="pt-6">
            <p>
              Round not found. The round may have been deleted or you don't have
              permission to view it.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/rounds">Back to Rounds</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progressPercentage = 0;

  return (
    <div className="p-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{round.roundTitle}</h1>
            <Badge className={getStatusColor(round.roundStatus)}>
              {round.roundStatus}
            </Badge>
          </div>

          <p className="text-muted-foreground mt-1"> {round.companyName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/rounds">Back to Rounds</Link>
          </Button>
          {/* {round.userId === user?.id || user?.publicMetadata?.isAdmin  ?"":""} */}
          <Button variant="outline" size="icon" asChild>
            <Link href={`/round/${round?._id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                Share with Investors
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
          >
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon" className="text-red-500">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this funding round and all
                  associated data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete Round
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Funding Progress Card */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Funding Progress</CardTitle>
          <CardDescription>
            {round.raisedAmount} raised of {round.fundingGoal} goal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{progressPercentage}% Complete</span>
              <span>
                <CalendarIcon className="inline-block h-4 w-4 mr-1" />
                {format(new Date(round.closingDate), "PPP")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Key Details */}
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Round Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Round Type
                  </h3>
                  <p>{round.roundType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Company Stage
                  </h3>
                  <p>{round.companyStage}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Valuation
                  </h3>
                  <p>{round.valuation || "Not specified"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Equity Offered
                  </h3>
                  <p>{round.equityOffered || "Not specified"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Minimum Investment
                  </h3>
                  <p>{round.minimumInvestment || "Not specified"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Contact Person
                  </h3>
                  <p>{round.contactPerson}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Open Date
                  </h3>
                  <p>{format(new Date(round.openDate), "PPP")}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Closing Date
                  </h3>
                  <p>{format(new Date(round.closingDate), "PPP")}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Use of Funds
                </h3>
                <p className="text-sm">{round.useOfFunds}</p>
              </div>

              {round.supportingDocuments && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Supporting Documents
                  </h3>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Pitch Deck
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Investors List */}
          <Card>
            <CardHeader>
              <CardTitle>Investors</CardTitle>
              <CardDescription>
                {round.investors?.length || 0} investors have committed to this
                round
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {round.investors && round.investors.length > 0 ? (
                  round.investors.map((investor: any) => (
                    <div
                      key={investor.id}
                      className="flex justify-between items-center p-3 bg-muted/50 rounded-md"
                    >
                      <div>
                        <h4 className="font-medium">{investor.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Committed on {investor.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{investor.amount}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No investors have committed to this round yet.
                  </p>
                )}
                {round.investors && round.investors.length > 0 && (
                  <Button variant="outline" className="w-full">
                    View All Investors
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Timeline & Actions */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Round Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l space-y-6">
                <div className="relative">
                  <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-green-500"></div>
                  <h4 className="font-medium">Round Created</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(round.createdAt!), "PPP")}
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-green-500"></div>
                  <h4 className="font-medium">Round Opened</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(round.openDate), "PPP")}
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-gray-300"></div>
                  <h4 className="font-medium">Round Closing</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(round.closingDate), "PPP")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">
                <Link href={`/investor-interest?roundId=${round._id}`}>
                  Show Interest
                </Link>
              </Button>
              <Button variant="outline" className="w-full">
                Generate Term Sheet
              </Button>
              <Button variant="outline" className="w-full">
                Schedule Investor Call
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
