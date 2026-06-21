import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true, // e.g. "Yoga Instructor"
    },
    image: {
      type: String,
      required: true, // We will paste a URL for now
    },
    socials: {
      facebook: String,
      instagram: String,
      twitter: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Trainer", trainerSchema);