import express from "express";
import { addTrainer, getTrainers, deleteTrainer } from "../controllers/trainerController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getTrainers); // Public 
router.post("/", authMiddleware, adminMiddleware, addTrainer); // Admin Only
router.delete("/:id", authMiddleware, adminMiddleware, deleteTrainer); // Admin Only

export default router;