import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    inverstorId: {
      type: String,
      required: true,
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    roundId: {
      type: String,
    },

    amountInterested: {
      type: Number,
      required: true,
    },
    investmentType: {
      type: String,
    },
    investmentRationale: {
      type: String,
    },
    preferredContactMethod: {
      type: String,
    },
    experience: {
      type: String,
    },
    engagementPreferences: {
      updates: { type: Boolean, default: false },
      strategicPartner: { type: Boolean, default: false },
      advisoryRole: { type: Boolean, default: false },
      meetFounder: { type: Boolean, default: false },
    },
    commitment: {
      type: Boolean,
      required: true,
      default: false,
    },

    questions: {
      text: { type: String },
      fileUrl: { type: String },
    },

    status: {
      type: String,
      enum: ["Pending", "Under Review", "Accepted", "Declined"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Investment =
  mongoose.models.Investment || mongoose.model("Investment", investmentSchema);
export default Investment;
