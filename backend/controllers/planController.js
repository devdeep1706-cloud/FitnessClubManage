import Plan from "../models/Plan.js";

// CREATE PLAN (ADMIN)
export const createPlan = async (req, res) => {
  try {
    const { name, durationMonths, price, features } = req.body;

    if (!name || !durationMonths || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const plan = await Plan.create({
      name,
      durationMonths,
      price,
      features,
    });

    res.status(201).json({
      message: "Plan created successfully",
      plan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PLANS (PUBLIC)
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({});
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PLAN (ADMIN)
export const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({
      message: "Plan updated",
      plan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PLAN (ADMIN)
export const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};