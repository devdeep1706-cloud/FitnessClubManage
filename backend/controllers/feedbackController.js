import Feedback from "../models/Feedback.js";

// 1. Submit Feedback (For Users)
export const submitFeedback = async (req, res) => {
  try {
    const { rating, message } = req.body;

    // Validation
    if (!rating || !message) {
      return res.status(400).json({ message: "Rating and message are required" });
    }

    // Create Feedback
    // We assume your authMiddleware adds 'req.user'
    const newFeedback = await Feedback.create({
      user: req.user.id, 
      rating,
      message,
    });

    res.status(201).json({ 
      success: true, 
      message: "Feedback submitted successfully", 
      feedback: newFeedback 
    });

  } catch (error) {
    console.error("Submit Feedback Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 2. Get All Feedbacks (For Admin)
export const getAllFeedbacks = async (req, res) => {
  try {
    // Fetch all feedback
    // .populate("user", "name") is CRITICAL. 
    // It goes to the 'users' collection, finds the matching ID, 
    // and grabs the 'name' so we can display "Amit Kumar" instead of "64f8a..."
    const feedbacks = await Feedback.find()
      .populate("user", "name email") 
      .sort({ createdAt: -1 }); // Show newest first

    res.status(200).json(feedbacks);

  } catch (error) {
    console.error("Get Feedback Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 3. Delete Feedback (Optional - For Admin 'Trash' button)
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await Feedback.findByIdAndDelete(id);
    res.json({ message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};