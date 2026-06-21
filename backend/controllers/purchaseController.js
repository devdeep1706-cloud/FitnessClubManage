import Plan from "../models/Plan.js";
import Purchase from "../models/Purchase.js";

// 1. CREATE PURCHASE (Updated with Restriction)
export const createPurchase = async (req, res) => {
  try {
    const { planId } = req.body;

    // ✅ CHECK: Does the user already have an ACTIVE plan?
    const existingPlan = await Purchase.findOne({ 
      user: req.user.id, 
      status: "active" 
    });

    if (existingPlan) {
      return res.status(400).json({ 
        message: "You already have an active plan. Please wait for it to expire." 
      });
    }

    if (!planId) return res.status(400).json({ message: "planId is required" });

    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + plan.durationMonths);

    const purchase = await Purchase.create({
      user: req.user.id,
      plan: plan._id,
      planName: plan.name,
      price: plan.price,
      startDate,
      endDate,
      status: "active"
    });

    res.status(201).json(purchase);
  } catch (error) {
    console.error("Create purchase error:", error);
    res.status(500).json({ message: "Purchase failed" });
  }
};

// 2. DELETE PURCHASE (New Function)
export const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    await Purchase.findByIdAndDelete(id);
    res.json({ success: true, message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete plan" });
  }
};

// 3. GET ALL PURCHASES (ADMIN ONLY)
export const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("user", "name email") // Get User Name & Email
      .sort({ createdAt: -1 });       // Newest first

    res.json(purchases);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ message: "Failed to fetch payment history" });
  }
};