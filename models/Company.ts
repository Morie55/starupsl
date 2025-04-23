import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    sector: { type: String, required: true },
    location: { type: String },
    foundedAt: { type: String },
    logo: { type: String },
    registrationNumber: { type: String },
    type: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    socialLinks: [
      {
        name: String,
        link: String,
      },
    ],
    website: { type: String },
    stage: {
      type: String,
    },
    description: { type: String },
    missionStatement: { type: String },
    fundingStatus: { type: String },
    amountRaised: { type: Number },
    foundingDocuments: { type: String },
    pitchDeck: { type: String },
    fundingNeeded: { type: Number },
    employeesRange: { type: String },
  },
  { timestamps: true }
);

const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);
export default Company;
