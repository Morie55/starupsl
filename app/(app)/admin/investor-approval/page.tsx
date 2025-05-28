// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Users,
//   Calendar,
//   FileText,
//   Upload,
//   Check,
//   X,
//   Eye,
//   Download,
//   Settings,
//   BarChart3,
//   TrendingUp,
//   Building2,
//   DollarSign,
// } from "lucide-react";

// export default function AdminDashboard() {
//   const [selectedTab, setSelectedTab] = useState("overview");

//   const pendingInvestors = [
//     {
//       id: 1,
//       name: "John Doe",
//       company: "Venture Capital SL",
//       email: "john@vcsl.com",
//       status: "pending",
//       date: "2024-01-15",
//     },
//     {
//       id: 2,
//       name: "Sarah Johnson",
//       company: "Impact Investors",
//       email: "sarah@impact.com",
//       status: "pending",
//       date: "2024-01-14",
//     },
//     {
//       id: 3,
//       name: "Michael Chen",
//       company: "Tech Fund Africa",
//       email: "michael@techfund.com",
//       status: "pending",
//       date: "2024-01-13",
//     },
//   ];

//   const pendingEvents = [
//     {
//       id: 1,
//       title: "Startup Pitch Night",
//       organizer: "Innovation Hub SL",
//       date: "2024-02-15",
//       status: "pending",
//     },
//     {
//       id: 2,
//       title: "Tech Conference 2024",
//       organizer: "TechSL",
//       date: "2024-03-10",
//       status: "pending",
//     },
//     {
//       id: 3,
//       title: "Investor Meetup",
//       organizer: "Angel Network SL",
//       date: "2024-02-28",
//       status: "pending",
//     },
//   ];

//   const systemDocuments = [
//     {
//       id: 1,
//       name: "Investment Guidelines 2024",
//       type: "PDF",
//       size: "2.4 MB",
//       uploadDate: "2024-01-10",
//     },
//     {
//       id: 2,
//       name: "Startup Registration Form",
//       type: "PDF",
//       size: "1.8 MB",
//       uploadDate: "2024-01-08",
//     },
//     {
//       id: 3,
//       name: "Terms of Service",
//       type: "PDF",
//       size: "3.2 MB",
//       uploadDate: "2024-01-05",
//     },
//   ];

//   return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <div className="border-b ">
//         <div className="flex items-center justify-between px-6 py-4">
//           <div>
//             <h1 className="text-2xl font-bold text-black dark:text-slate-400">
//               Admin Dashboard
//             </h1>
//             <p className="text-sm text-black dark:text-white">
//               Manage investors, events, and system resources
//             </p>
//           </div>
//           <div className="flex items-center gap-4">
//             <Button variant="outline" size="sm">
//               <Settings className="w-4 h-4 mr-2" />
//               Settings
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         <Tabs
//           value={selectedTab}
//           onValueChange={setSelectedTab}
//           className="space-y-6"
//         >
//           <TabsList className="grid w-full grid-cols-5">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="investors">Investors</TabsTrigger>
//             <TabsTrigger value="events">Events</TabsTrigger>
//             <TabsTrigger value="documents">Documents</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//           </TabsList>

//           {/* Overview Tab */}
//           <TabsContent value="overview" className="space-y-6">
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                   <CardTitle className="text-sm font-medium">
//                     Pending Approvals
//                   </CardTitle>
//                   <Users className="w-4 h-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">8</div>
//                   <p className="text-xs text-muted-foreground">
//                     +2 from yesterday
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                   <CardTitle className="text-sm font-medium">
//                     Active Events
//                   </CardTitle>
//                   <Calendar className="w-4 h-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">12</div>
//                   <p className="text-xs text-muted-foreground">+3 this month</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                   <CardTitle className="text-sm font-medium">
//                     System Documents
//                   </CardTitle>
//                   <FileText className="w-4 h-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">45</div>
//                   <p className="text-xs text-muted-foreground">+5 this week</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                   <CardTitle className="text-sm font-medium">
//                     Total Users
//                   </CardTitle>
//                   <TrendingUp className="w-4 h-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">1,234</div>
//                   <p className="text-xs text-muted-foreground">
//                     +12% from last month
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Recent Activity</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium">
//                         New investor approved
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         2 hours ago
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium">Event published</p>
//                       <p className="text-xs text-muted-foreground">
//                         4 hours ago
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium">Document uploaded</p>
//                       <p className="text-xs text-muted-foreground">
//                         6 hours ago
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Quick Actions</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <Button className="justify-start w-full" variant="outline">
//                     <Users className="w-4 h-4 mr-2" />
//                     Review Pending Investors
//                   </Button>
//                   <Button className="justify-start w-full" variant="outline">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     Approve Events
//                   </Button>
//                   <Button className="justify-start w-full" variant="outline">
//                     <Upload className="w-4 h-4 mr-2" />
//                     Upload Documents
//                   </Button>
//                   <Button className="justify-start w-full" variant="outline">
//                     <BarChart3 className="w-4 h-4 mr-2" />
//                     View Analytics
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           {/* Investors Tab */}
//           <TabsContent value="investors" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Investor Approvals</CardTitle>
//                 <CardDescription>
//                   Review and approve pending investor registrations
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Name</TableHead>
//                       <TableHead>Company</TableHead>
//                       <TableHead>Email</TableHead>
//                       <TableHead>Date Applied</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {pendingInvestors.map((investor) => (
//                       <TableRow key={investor.id}>
//                         <TableCell className="font-medium">
//                           {investor.name}
//                         </TableCell>
//                         <TableCell>{investor.company}</TableCell>
//                         <TableCell>{investor.email}</TableCell>
//                         <TableCell>{investor.date}</TableCell>
//                         <TableCell>
//                           <Badge variant="secondary">{investor.status}</Badge>
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex space-x-2">
//                             <Button size="sm" variant="outline">
//                               <Eye className="w-4 h-4" />
//                             </Button>
//                             <Button size="sm" variant="default">
//                               <Check className="w-4 h-4" />
//                             </Button>
//                             <Button size="sm" variant="destructive">
//                               <X className="w-4 h-4" />
//                             </Button>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Events Tab */}
//           <TabsContent value="events" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Event Management</CardTitle>
//                 <CardDescription>
//                   Review and approve upcoming events
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Event Title</TableHead>
//                       <TableHead>Organizer</TableHead>
//                       <TableHead>Date</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {pendingEvents.map((event) => (
//                       <TableRow key={event.id}>
//                         <TableCell className="font-medium">
//                           {event.title}
//                         </TableCell>
//                         <TableCell>{event.organizer}</TableCell>
//                         <TableCell>{event.date}</TableCell>
//                         <TableCell>
//                           <Badge variant="secondary">{event.status}</Badge>
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex space-x-2">
//                             <Button size="sm" variant="outline">
//                               <Eye className="w-4 h-4" />
//                             </Button>
//                             <Button size="sm" variant="default">
//                               <Check className="w-4 h-4" />
//                             </Button>
//                             <Button size="sm" variant="destructive">
//                               <X className="w-4 h-4" />
//                             </Button>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Documents Tab */}
//           <TabsContent value="documents" className="space-y-6">
//             <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Upload New Document</CardTitle>
//                   <CardDescription>Add documents to the system</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="document-title">Document Title</Label>
//                     <Input
//                       id="document-title"
//                       placeholder="Enter document title"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="document-description">Description</Label>
//                     <Textarea
//                       id="document-description"
//                       placeholder="Enter document description"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="document-category">Category</Label>
//                     <Select>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="guidelines">Guidelines</SelectItem>
//                         <SelectItem value="forms">Forms</SelectItem>
//                         <SelectItem value="legal">Legal Documents</SelectItem>
//                         <SelectItem value="reports">Reports</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="p-6 text-center border-2 border-gray-300 border-dashed rounded-lg">
//                     <Upload className="w-12 h-12 mx-auto text-gray-400" />
//                     <div className="mt-4">
//                       <Button variant="outline">Choose File</Button>
//                       <p className="mt-2 text-sm text-gray-500">
//                         or drag and drop files here
//                       </p>
//                     </div>
//                   </div>
//                   <Button className="w-full">Upload Document</Button>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>System Documents</CardTitle>
//                   <CardDescription>Manage existing documents</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {systemDocuments.map((doc) => (
//                       <div
//                         key={doc.id}
//                         className="flex items-center justify-between p-3 border rounded-lg"
//                       >
//                         <div className="flex items-center space-x-3">
//                           <FileText className="w-8 h-8 text-blue-500" />
//                           <div>
//                             <p className="font-medium">{doc.name}</p>
//                             <p className="text-sm text-gray-500">
//                               {doc.type} • {doc.size}
//                             </p>
//                             <p className="text-xs text-gray-400">
//                               Uploaded {doc.uploadDate}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex space-x-2">
//                           <Button size="sm" variant="outline">
//                             <Download className="w-4 h-4" />
//                           </Button>
//                           <Button size="sm" variant="destructive">
//                             <X className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           {/* Analytics Tab */}
//           <TabsContent value="analytics" className="space-y-6">
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                   <CardTitle className="text-sm font-medium">
//                     Total Startups
//                   </CardTitle>
//                   <Building2 className="w-4 h-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">934</div>
//                   <p className="text-xs text-muted-foreground">
//                     +12% from last month
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                   <CardTitle className="text-sm font-medium">
//                     Active Investors
//                   </CardTitle>
//                   <Users className="w-4 h-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">156</div>
//                   <p className="text-xs text-muted-foreground">
//                     +8% from last month
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                   <CardTitle className="text-sm font-medium">
//                     Total Funding
//                   </CardTitle>
//                   <DollarSign className="w-4 h-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">$42M</div>
//                   <p className="text-xs text-muted-foreground">
//                     +23% from last month
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                   <CardTitle className="text-sm font-medium">
//                     Platform Usage
//                   </CardTitle>
//                   <BarChart3 className="w-4 h-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">89%</div>
//                   <p className="text-xs text-muted-foreground">
//                     +5% from last week
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Platform Analytics</CardTitle>
//                 <CardDescription>
//                   Detailed insights into platform performance
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
//                   <div className="text-center">
//                     <BarChart3 className="w-12 h-12 mx-auto text-gray-400" />
//                     <p className="mt-2 text-gray-500">
//                       Analytics charts would be displayed here
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InvestorApprovalsTable } from "@/components/investor-approvals-table";
import { InvestorApprovalsTableSkeleton } from "@/components/investor-approvals-table-skeleton";

export default async function InvestorApprovalsPage() {
  const { userId, sessionClaims } = await auth();

  // Check if user is authenticated and has admin role
  if (!userId) {
    redirect("/sign-in");
  }

  const userRole = sessionClaims?.metadata?.role;
  if (userRole !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Investor Approvals
        </h1>
        <p className="mt-2 text-muted-foreground">
          Review and manage investor registration requests
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Investor Registrations</CardTitle>
          <CardDescription>
            Review investor applications and approve or reject their
            registration requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<InvestorApprovalsTableSkeleton />}>
            <InvestorApprovalsTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
