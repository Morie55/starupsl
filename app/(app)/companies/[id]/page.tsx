"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  Download,
  Edit,
  ExternalLink,
  FileText,
  Globe,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Share2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FundingRoundsPage } from "@/components/funding-rounds-page";
import RoundsTable from "@/components/rounds-table";
import CompanyDetailsPage from "@/components/company-details";

// Sample company data based on the Mongoose schema
const companies = [
  {
    _id: "1",
    userId: "user1",
    name: "TechNova Solutions",
    sector: "Technology",
    location: "San Francisco, USA",
    foundedAt: "2018",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "TN12345678",
    type: "Corporation",
    email: "contact@technova.example",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Drive, San Francisco, CA 94105",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/technova" },
      { name: "Twitter", link: "https://twitter.com/technova" },
    ],
    website: "https://technova.example",
    stage: "Growth",
    description:
      "TechNova develops cutting-edge AI solutions for enterprise clients.",
    missionStatement:
      "Transforming businesses through innovative AI technology.",
    fundingStatus: "Series A",
    amountRaised: 5000000,
    fundingNeeded: 10000000,
    employeesRange: "11-50",
    createdAt: "2023-01-15T00:00:00.000Z",
    updatedAt: "2023-11-20T00:00:00.000Z",
  },
  {
    _id: "2",
    userId: "user1",
    name: "GreenEarth Renewables",
    sector: "Clean Energy",
    location: "Berlin, Germany",
    foundedAt: "2015",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "GE87654321",
    type: "LLC",
    email: "info@greenearth.example",
    phone: "+49 30 12345678",
    address: "Friedrichstraße 123, 10117 Berlin, Germany",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/greenearth" },
      { name: "Instagram", link: "https://instagram.com/greenearth" },
    ],
    website: "https://greenearth.example",
    stage: "Expansion",
    description:
      "GreenEarth develops sustainable energy solutions for residential and commercial applications.",
    missionStatement:
      "Accelerating the world's transition to sustainable energy.",
    fundingStatus: "Series B",
    amountRaised: 12000000,
    fundingNeeded: 20000000,
    employeesRange: "51-200",
    createdAt: "2022-05-10T00:00:00.000Z",
    updatedAt: "2023-10-15T00:00:00.000Z",
  },
  {
    _id: "3",
    userId: "user2",
    name: "MediLife Sciences",
    sector: "Healthcare",
    location: "Boston, USA",
    foundedAt: "2019",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "ML98765432",
    type: "Corporation",
    email: "contact@medilife.example",
    phone: "+1 (617) 987-6543",
    address: "456 Medical Parkway, Boston, MA 02115",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/medilife" },
      { name: "Facebook", link: "https://facebook.com/medilife" },
    ],
    website: "https://medilife.example",
    stage: "Early Stage",
    description:
      "MediLife develops innovative medical devices and diagnostic tools.",
    missionStatement: "Improving patient outcomes through medical innovation.",
    fundingStatus: "Seed",
    amountRaised: 1500000,
    fundingNeeded: 5000000,
    employeesRange: "1-10",
    createdAt: "2023-03-22T00:00:00.000Z",
    updatedAt: "2023-09-05T00:00:00.000Z",
  },
  {
    _id: "4",
    userId: "user2",
    name: "FinEdge Technologies",
    sector: "Fintech",
    location: "London, UK",
    foundedAt: "2017",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "FE56789012",
    type: "Limited Company",
    email: "info@finedge.example",
    phone: "+44 20 7946 0987",
    address: "78 Finsbury Square, London EC2A 1HP",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/finedge" },
      { name: "Twitter", link: "https://twitter.com/finedge" },
    ],
    website: "https://finedge.example",
    stage: "Growth",
    description:
      "FinEdge provides blockchain-based payment solutions for global businesses.",
    missionStatement:
      "Making financial transactions secure, fast, and accessible worldwide.",
    fundingStatus: "Series A",
    amountRaised: 7500000,
    fundingNeeded: 15000000,
    employeesRange: "11-50",
    createdAt: "2022-11-08T00:00:00.000Z",
    updatedAt: "2023-08-17T00:00:00.000Z",
  },
  {
    _id: "5",
    userId: "user3",
    name: "EduSpark Learning",
    sector: "Education",
    location: "Singapore",
    foundedAt: "2020",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "ES34567890",
    type: "Private Limited",
    email: "hello@eduspark.example",
    phone: "+65 6123 4567",
    address: "123 Education Road, Singapore 123456",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/eduspark" },
      { name: "YouTube", link: "https://youtube.com/eduspark" },
    ],
    website: "https://eduspark.example",
    stage: "Early Stage",
    description:
      "EduSpark develops interactive learning platforms for K-12 students.",
    missionStatement: "Making quality education accessible to every child.",
    fundingStatus: "Pre-seed",
    amountRaised: 500000,
    fundingNeeded: 2000000,
    employeesRange: "1-10",
    createdAt: "2023-02-14T00:00:00.000Z",
    updatedAt: "2023-07-30T00:00:00.000Z",
  },
  {
    _id: "6",
    userId: "user3",
    name: "AgriTech Innovations",
    sector: "Agriculture",
    location: "Nairobi, Kenya",
    foundedAt: "2016",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "AT23456789",
    type: "Limited Company",
    email: "info@agritech.example",
    phone: "+254 20 1234567",
    address: "45 Farming Avenue, Nairobi, Kenya",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/agritech" },
      { name: "Facebook", link: "https://facebook.com/agritech" },
    ],
    website: "https://agritech.example",
    stage: "Expansion",
    description:
      "AgriTech develops IoT solutions for precision farming in Africa.",
    missionStatement:
      "Empowering farmers with technology for sustainable agriculture.",
    fundingStatus: "Series B",
    amountRaised: 8000000,
    fundingNeeded: 12000000,
    employeesRange: "51-200",
    createdAt: "2022-08-05T00:00:00.000Z",
    updatedAt: "2023-06-22T00:00:00.000Z",
  },
  {
    _id: "7",
    userId: "user4",
    name: "UrbanMobility",
    sector: "Transportation",
    location: "Amsterdam, Netherlands",
    foundedAt: "2018",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "UM45678901",
    type: "B.V.",
    email: "contact@urbanmobility.example",
    phone: "+31 20 123 4567",
    address: "78 Transit Street, Amsterdam, Netherlands",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/urbanmobility" },
      { name: "Instagram", link: "https://instagram.com/urbanmobility" },
    ],
    website: "https://urbanmobility.example",
    stage: "Growth",
    description:
      "UrbanMobility develops electric scooter sharing platforms for European cities.",
    missionStatement: "Creating sustainable urban transportation solutions.",
    fundingStatus: "Series A",
    amountRaised: 6500000,
    fundingNeeded: 10000000,
    employeesRange: "11-50",
    createdAt: "2022-09-18T00:00:00.000Z",
    updatedAt: "2023-05-12T00:00:00.000Z",
  },
  {
    _id: "8",
    userId: "user4",
    name: "CyberShield Security",
    sector: "Cybersecurity",
    location: "Tel Aviv, Israel",
    foundedAt: "2017",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "CS67890123",
    type: "Ltd.",
    email: "info@cybershield.example",
    phone: "+972 3 123 4567",
    address: "56 Security Blvd, Tel Aviv, Israel",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/cybershield" },
      { name: "Twitter", link: "https://twitter.com/cybershield" },
    ],
    website: "https://cybershield.example",
    stage: "Expansion",
    description:
      "CyberShield develops advanced threat detection and prevention solutions.",
    missionStatement:
      "Protecting digital assets in an increasingly connected world.",
    fundingStatus: "Series B",
    amountRaised: 15000000,
    fundingNeeded: 25000000,
    employeesRange: "51-200",
    createdAt: "2022-07-14T00:00:00.000Z",
    updatedAt: "2023-04-28T00:00:00.000Z",
  },
  {
    _id: "9",
    userId: "user5",
    name: "FoodConnect",
    sector: "Food & Beverage",
    location: "Toronto, Canada",
    foundedAt: "2019",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "FC78901234",
    type: "Corporation",
    email: "hello@foodconnect.example",
    phone: "+1 (416) 123-4567",
    address: "123 Culinary Street, Toronto, ON M5V 2K4",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/foodconnect" },
      { name: "Instagram", link: "https://instagram.com/foodconnect" },
    ],
    website: "https://foodconnect.example",
    stage: "Early Stage",
    description:
      "FoodConnect develops a platform connecting local food producers with consumers.",
    missionStatement: "Building sustainable local food ecosystems.",
    fundingStatus: "Seed",
    amountRaised: 2000000,
    fundingNeeded: 5000000,
    employeesRange: "11-50",
    createdAt: "2023-01-05T00:00:00.000Z",
    updatedAt: "2023-03-18T00:00:00.000Z",
  },
  {
    _id: "10",
    userId: "user5",
    name: "RetailAI",
    sector: "Retail",
    location: "Tokyo, Japan",
    foundedAt: "2018",
    logo: "/placeholder.svg?height=40&width=40",
    registrationNumber: "RA89012345",
    type: "KK",
    email: "info@retailai.example",
    phone: "+81 3 1234 5678",
    address: "45 Shopping Avenue, Shibuya, Tokyo, Japan",
    socialLinks: [
      { name: "LinkedIn", link: "https://linkedin.com/company/retailai" },
      { name: "Twitter", link: "https://twitter.com/retailai" },
    ],
    website: "https://retailai.example",
    stage: "Growth",
    description:
      "RetailAI develops AI-powered inventory management and customer analytics for retailers.",
    missionStatement: "Revolutionizing retail through artificial intelligence.",
    fundingStatus: "Series A",
    amountRaised: 9000000,
    fundingNeeded: 15000000,
    employeesRange: "11-50",
    createdAt: "2022-06-30T00:00:00.000Z",
    updatedAt: "2023-02-15T00:00:00.000Z",
  },
];

export default async function CompanyDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Find company by ID from the params

  const company = companies.find((c) => c._id === id) || companies[0];

  return (
    <div className="">
      <CompanyDetailsPage company={company} />
    </div>
  );
}
