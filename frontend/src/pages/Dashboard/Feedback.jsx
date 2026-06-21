import React, { useState } from "react";
import API from "../../api/axios"; 
import "./Feedback.css";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0); // For star hover effect
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }

    setLoading(true);

    try {
      // 1. Send data to the real backend
      await API.post("/feedback", { rating, message });

      // 2. Success Feedback
      alert("Thank you! Your feedback helps us improve.");
      
      // 3. Reset Form
      setRating(0);
      setHover(0);
      setMessage("");
    } catch (error) {
      console.error("Feedback error:", error);
      // Optional: Check if error response has a specific message
      const errorMsg = error.response?.data?.message || "Something went wrong. Please try again.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-page">
      <h2 className="section-title">Your Feedback</h2>

      <div className="feedback-container">
        <form className="feedback-card" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Rate Your Experience</label>
            <div className="rating-stars" onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hover || rating) ? "active" : ""}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="rating-text">
              {rating === 1 && "Very Poor 😞"}
              {rating === 2 && "Poor 😐"}
              {rating === 3 && "Average 🙂"}
              {rating === 4 && "Good 😄"}
              {rating === 5 && "Excellent 🤩"}
              {!rating && "Select a rating"}
            </p>
          </div>

          <div className="form-group">
            <label>Your Message</label>
            <textarea
              placeholder="Tell us what you liked or how we can improve..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;