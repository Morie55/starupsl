import mongoose from "mongoose";

const InvestorSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    sectorInterested: [{ type: String }],
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
    profileDocuments: { type: String },
    fundingCapacity: { type: String },
    amountRaised: { type: Number },
    businessRegistrationDocuments: { type: String },
    goalExpected: { type: String },
  },
  { timestamps: true }
);

const Investor =
  mongoose.models.Investor || mongoose.model("Investor", InvestorSchema);
export default Investor;
