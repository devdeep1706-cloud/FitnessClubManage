import User from "../models/User.js";
import Attendance from "../models/Attendance.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("activePlan.plan");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get users with active plans
export const getActiveMembers = async (req, res) => {
  try {
    const users = await User.find({
      "activePlan.plan": { $exists: true },
    })
      .select("-password")
      .populate("activePlan.plan");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("user", "name email");

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeMembers = await User.countDocuments({
      "activePlan.plan": { $exists: true },
    });
    const totalAttendance = await Attendance.countDocuments();

    res.json({
      totalUsers,
      activeMembers,
      totalAttendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};