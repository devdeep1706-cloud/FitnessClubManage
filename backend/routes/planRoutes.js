import express from "express";
import { createPlan, getPlans, updatePlan, deletePlan } from "../controllers/planController.js";
//import { protect, authMiddleware } from "../middleware/authMiddleware.js"; 
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const router = express.Router();

router.get("/", getPlans);
router.post("/", authMiddleware, adminMiddleware, createPlan);
router.put("/:id", authMiddleware, adminMiddleware, updatePlan);
router.delete("/:id", authMiddleware, adminMiddleware, deletePlan);

export default router;