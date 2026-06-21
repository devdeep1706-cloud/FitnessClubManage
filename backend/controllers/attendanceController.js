import Attendance from "../models/Attendance.js";

// MARK ATTENDANCE (USER)
export const markAttendance = async (req, res) => {
  try {
    const userId = req.user._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.create({
      user: userId,
      date: today,
    });

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for today" });
    }

    res.status(500).json({ message: error.message });
  }
};

// GET MY ATTENDANCE (USER)
export const getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      user: req.user._id,
    }).sort({ date: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};