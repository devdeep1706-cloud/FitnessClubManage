import express from "express";
import {
  markAttendance,
  getMyAttendance,
} from "../controllers/attendanceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/mark", authMiddleware, markAttendance);
router.get("/me", authMiddleware, getMyAttendance);

export default router;