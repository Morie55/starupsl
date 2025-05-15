import mongoose from "mongoose";

const investorInterestSchema = new mongoose.Schema(
  {
    // 1. Investor Identity (Auto-filled or Verified)
    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming you have a User or Investor model
      required: true,
    },
    fullName: { type: String, required: true },
    organization: { type: String },
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      required: true,
    },
    phone: { type: String },
    investorType: {
      type: String,
      enum: ["Individual", "Angel", "VC Firm", "Corporate", "Other"],
      required: true,
    },

    // 2. Target Funding Round
    roundTitle: { type: String, required: true }, // e.g., "Seed Round – Q3 2025"
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // assuming Company is the startup model
      required: true,
    },

    // 3. Amount Interested in Investing
    investmentCurrency: {
      type: String,
      required: true,
      default: "USD",
    },
    investmentAmount: {
      type: Number,
      required: true,
      min: [100, "Minimum investment amount must be at least 100"],
    },

    // 4. Investment Type
    investmentType: {
      type: String,
      enum: ["Equity", "Convertible Note", "Debt", "SAFE", "Other"],
      default: "Equity",
    },

    // 5. Investment Rationale / Strategy
    investmentRationale: { type: String },

    // 6. Engagement Preferences
    engagementPreferences: {
      wantUpdates: { type: Boolean, default: false },
      strategicPartnership: { type: Boolean, default: false },
      advisoryRole: { type: Boolean, default: false },
      meetTeam: { type: Boolean, default: false },
    },

    // 7. Previous Investment Experience
    previousExperience: { type: String },

    // 8. Preferred Contact Method
    preferredContactMethod: {
      type: String,
      enum: ["Email", "Phone Call", "Video Call", "In-Person Meeting"],
    },

    // 9. Additional Documents or Questions
    additionalDocuments: { type: String }, // file path or URL
    additionalQuestions: { type: String },

    // 10. Investor Commitment
    commitmentConfirmed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const InvestorInterest =
  mongoose.models.InvestorInterest ||
  mongoose.model("InvestorInterest", investorInterestSchema);

export default InvestorInterest;
