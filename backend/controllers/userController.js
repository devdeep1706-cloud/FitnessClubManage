import User from "../models/User.js";
import Purchase from "../models/Purchase.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, profileImage } = req.body;

    // 1. Find user 
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    user.name = name ?? user.name;
    user.phone = phone ?? user.phone;
    user.address = address ?? user.address;

    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }

    
    const updatedUser = await user.save();

    
    res.json({
      success: true,
      user: {
        id: updatedUser._id.toString(), 
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        address: updatedUser.address,
        profileImage: updatedUser.profileImage
      }
    });
  } catch (error) {
    console.error("Profile Update CRASH:", error); 
    res.status(500).json({ message: error.message || "Failed to update profile" });
  }
};

export const getMyPlans = async (req, res) => {
  try {
    const userId = req.user.id; 

    const purchases = await Purchase.find({ user: userId })
      .populate("plan")
      .sort({ createdAt: -1 });

    const today = new Date();

    for (let purchase of purchases) {
      if (purchase.endDate < today && purchase.status === "active") {
        purchase.status = "expired";
        await purchase.save();
      }
    }

    res.json({
      success: true,
      plans: purchases
    });
  } catch (error) {
    console.error("My plans error:", error);
    res.status(500).json({ message: "Failed to fetch plans" });
  }
};