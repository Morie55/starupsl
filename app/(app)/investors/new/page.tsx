import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const investmentSchema = z.object({
  inverstorId: z.string().min(1),
  companyId: z.string().min(1),
  roundId: z.string().optional(),
  amountInterested: z.coerce.number().min(1),
  investmentType: z.string().optional(),
  investmentRationale: z.string().optional(),
  preferredContactMethod: z.string().optional(),
  experience: z.string().optional(),
  engagementPreferences: z.object({
    updates: z.boolean().optional(),
    strategicPartner: z.boolean().optional(),
    advisoryRole: z.boolean().optional(),
    meetFounder: z.boolean().optional(),
  }),
  commitment: z.boolean(),
  questions: z.object({
    text: z.string().optional(),
    fileUrl: z.string().optional(),
  }),
});

export default function InvestmentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(investmentSchema),
  });

  const onSubmit = async (data: any) => {
    "use server";
    const res = await fetch("/api/investments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) alert("Submission failed.");
    else alert("Investment submitted successfully.");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl mx-auto p-4"
    >
      <div>
        <Label>Investor ID</Label>
        <Input {...register("inverstorId")} />
      </div>
      <div>
        <Label>Company ID</Label>
        <Input {...register("companyId")} />
      </div>
      <div>
        <Label>Round ID</Label>
        <Input {...register("roundId")} />
      </div>
      <div>
        <Label>Amount Interested</Label>
        <Input type="number" {...register("amountInterested")} />
      </div>
      <div>
        <Label>Investment Type</Label>
        <Input {...register("investmentType")} />
      </div>
      <div>
        <Label>Investment Rationale</Label>
        <Textarea {...register("investmentRationale")} />
      </div>
      <div>
        <Label>Preferred Contact Method</Label>
        <Input {...register("preferredContactMethod")} />
      </div>
      <div>
        <Label>Experience</Label>
        <Textarea {...register("experience")} />
      </div>
      <div>
        <Label>Engagement Preferences</Label>
        <div className="space-y-1">
          <Checkbox {...register("engagementPreferences.updates")} /> Updates
          <br />
          <Checkbox
            {...register("engagementPreferences.strategicPartner")}
          />{" "}
          Strategic Partner
          <br />
          <Checkbox {...register("engagementPreferences.advisoryRole")} />{" "}
          Advisory Role
          <br />
          <Checkbox {...register("engagementPreferences.meetFounder")} /> Meet
          Founder
        </div>
      </div>
      <div>
        <Label>Commitment</Label>
        <Checkbox {...register("commitment")} /> I am committed
      </div>
      <div>
        <Label>Questions</Label>
        <Textarea
          placeholder="Any questions..."
          {...register("questions.text")}
        />
        <Input
          placeholder="File URL (optional)"
          {...register("questions.fileUrl")}
        />
      </div>
      <Button type="submit">Submit Investment</Button>
    </form>
  );
}
