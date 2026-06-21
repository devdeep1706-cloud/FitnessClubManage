import express from "express";
import { submitFeedback, getAllFeedbacks, deleteFeedback } from "../controllers/feedbackController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// User submits feedback (Needs Login)
router.post("/", authMiddleware, submitFeedback);

// Admin views all feedback (Needs Login)
// Note: In a real app, you might want an 'adminMiddleware' here too
router.get("/", authMiddleware, getAllFeedbacks);

// Admin deletes feedback
router.delete("/:id", authMiddleware, deleteFeedback);

export default router;