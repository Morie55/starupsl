"use client";

import { BarChart3, Filter, TrendingUp } from "lucide-react";

import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectorCard } from "@/components/sector-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SectorsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:gap-8 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sectors</h1>
          <p className="text-muted-foreground">
            Explore different sectors in the startup ecosystem
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <TrendingUp className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Sectors</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="emerging">Emerging</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <SectorCard title="Technology" count={156} color="bg-blue-500" />
            <SectorCard title="Healthcare" count={87} color="bg-green-500" />
            <SectorCard title="Finance" count={124} color="bg-purple-500" />
            <SectorCard title="Education" count={93} color="bg-amber-500" />
            <SectorCard
              title="Agriculture"
              count={142}
              color="bg-emerald-500"
            />
            <SectorCard title="Energy" count={68} color="bg-red-500" />
            <SectorCard title="Retail" count={112} color="bg-indigo-500" />
            <SectorCard
              title="Transportation"
              count={52}
              color="bg-orange-500"
            />
            <SectorCard title="Manufacturing" count={78} color="bg-cyan-500" />
            <SectorCard title="Media" count={64} color="bg-pink-500" />
            <SectorCard title="Real Estate" count={45} color="bg-lime-500" />
            <SectorCard title="Tourism" count={38} color="bg-teal-500" />
          </div>
        </TabsContent>
        <TabsContent value="trending" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <SectorCard title="Technology" count={156} color="bg-blue-500" />
            <SectorCard title="Finance" count={124} color="bg-purple-500" />
            <SectorCard
              title="Agriculture"
              count={142}
              color="bg-emerald-500"
            />
            <SectorCard title="Healthcare" count={87} color="bg-green-500" />
          </div>
        </TabsContent>
        <TabsContent value="emerging" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <SectorCard title="Energy" count={68} color="bg-red-500" />
            <SectorCard title="Tourism" count={38} color="bg-teal-500" />
            <SectorCard title="Real Estate" count={45} color="bg-lime-500" />
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Sector Growth Analysis</CardTitle>
          <CardDescription>Year-over-year growth by sector</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-muted/25 rounded-md flex items-center justify-center text-muted-foreground">
            <BarChart3 className="mr-2 h-5 w-5" />
            Sector growth chart visualization
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
