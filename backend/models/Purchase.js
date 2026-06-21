import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true
    },

    planName: String,
    price: Number,

    startDate: {
      type: Date,
      default: Date.now
    },

    endDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Purchase", purchaseSchema);