import mongoose from "mongoose";

const gymSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true }
});

export default mongoose.model("Gym", gymSchema);