import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // ✅ Ensures feedback always belongs to a user
    },
    rating: {
      type: Number,
      required: true, // ✅ Ensures a rating is always picked
      min: 1,
      max: 5
    },
    message: {
      type: String,
      required: true, // ✅ Ensures message isn't empty
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);