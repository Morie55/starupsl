"use server";

import { connect } from "@/lib/mongoDB";
import Company from "@/models/Company";
import Investor from "@/models/Investor";
import InvestorInterest from "@/models/InvestorInterest";
import Round from "@/models/Round";

export async function createInterest(formData: any) {
  try {
    await connect();
    const newInterest = new InvestorInterest(formData);

    const saveNewInterest = await newInterest.save();
    return JSON.parse(
      JSON.stringify({ success: true, interestId: saveNewInterest._id })
    );
  } catch (error) {
    console.error("Error submitting investor interest:", error);
    return {
      error: "Failed to submit investor interest",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getInterestDetails(id: string) {
  try {
    await connect();

    const interest = await InvestorInterest.findById(id);
    const round = await Round.findById(interest.roundId);
    const company = await Company.findById(interest.companyId);
    const investor = await Investor.findById(interest.investorId);
    const interestDoc = JSON.parse(JSON.stringify(interest));
    const roundDoc = JSON.parse(JSON.stringify(interest));
    const companyDoc = JSON.parse(JSON.stringify(company));
    const investorDoc = JSON.parse(JSON.stringify(investor));
    const interestData = {
      ...interestDoc,
      round: {
        name: round?.roundTitle,
        id: round?._id,
      },
      companyData: {
        name: companyDoc?.name,
        logo: companyDoc?.logo,
        id: companyDoc?._id,
      },
      investor: {
        name: investorDoc?.name,
        logo: investorDoc?.logo,
        id: investorDoc?._id,
      },
    };

    const interestJson = JSON.parse(JSON.stringify(interestData));

    return { success: true, interest: interestJson };
  } catch (error) {
    console.error("Error Fetching investor interest:", error);
    return {
      error: "Failed to Fetching investor interest",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
export async function updateInterestData(id: string, data: any) {
  try {
    await connect();

    const interest = await InvestorInterest.findById(id);

    interest.status = data.status;
    interest.responseMessage = data.responseMessage;
    interest.termSheet = data.termSheet;

    const saveData = await interest.save();

    return JSON.parse(JSON.stringify({ success: true, interest: saveData }));
  } catch (error) {
    console.error("Error Fetching investor interest:", error);
    return {
      error: "Failed to Fetching investor interest",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getInterestsByRoundId(roundId: string) {
  try {
    await connect();

    const interests = await InvestorInterest.find({ roundId: roundId });

    return JSON.parse(JSON.stringify({ success: true, interests: interests }));
  } catch (error) {
    console.log("error:", error);
  }
}

export async function getInterestsByUserId(id: string) {}
