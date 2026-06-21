import Gym from "../models/Gym.js";

export const findGymsByPincode = async (req, res) => {
  const { pincode } = req.body;

  if (!pincode) {
    return res.status(400).json({ message: "Pincode required" });
  }

  const gyms = await Gym.find({ pincode });

  if (gyms.length === 0) {
    return res.status(404).json({
      message: "We are not available in your area yet"
    });
  }

  res.json(gyms);
};