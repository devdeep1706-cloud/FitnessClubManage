import express from "express";
import User from "../models/User.js"; 
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  getAllUsers,
  getDashboardStats,
} from "../controllers/adminController.js";

const router = express.Router();

/* ===================== USERS ===================== */

/* GET ALL USERS */
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

/* UPDATE USER ROLE */
router.put(
  "/users/:id/role",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { role } = req.body;

      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.role = role;
      await user.save();

      res.json({ message: "Role updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* DELETE USER */
router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* ===================== DASHBOARD ===================== */

/* GET DASHBOARD STATS */
router.get(
  "/dashboard-stats",
  authMiddleware,
  adminMiddleware,
  getDashboardStats
);

export default router;