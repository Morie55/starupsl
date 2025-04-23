import mongoose from "mongoose";

const pitchCompetitionResultSchema = new mongoose.Schema(
  {
    competitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PitchCompetition", // Reference to the competition
      required: true,
    },
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup", // Reference to the winning startup
      required: true,
    },
    rank: {
      type: Number, // e.g., 1 for 1st place, 2 for 2nd place
      required: true,
    },
    prize: {
      type: String, // Description of the prize (e.g., Cash prize, Mentorship)
      required: true,
    },
    dateOfWinning: {
      type: Date,
      default: Date.now,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // Reference to the event where the competition took place
    },
    additionalNotes: {
      type: String, // Any other notes related to the achievement
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Event =
  mongoose.models.event ||
  mongoose.model("pitchCompetitionResult", pitchCompetitionResultSchema);
export default Event;
