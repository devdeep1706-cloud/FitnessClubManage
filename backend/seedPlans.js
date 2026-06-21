import mongoose from "mongoose";
import dotenv from "dotenv";
import Plan from "./models/Plan.js";

dotenv.config();

const seedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Plan.insertMany([
      {
        name: "1 Month Unlimited",
        price: 1000,
        durationMonths: 1,
        features: [
          "Unlimited equipment",
          "Personal trainer",
          "No time restriction"
        ]
      },
      {
        name: "6 Month Unlimited",
        price: 5000,
        durationMonths: 6,
        features: [
          "Unlimited equipment",
          "Personal trainer",
          "No time restriction"
        ]
      },
      {
        name: "12 Month Unlimited",
        price: 10000,
        durationMonths: 12,
        features: [
          "Unlimited equipment",
          "Personal trainer",
          "No time restriction"
        ]
      }
    ]);

    console.log("✅ Plans inserted successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting plans:", error);
    process.exit(1);
  }
};

seedPlans();