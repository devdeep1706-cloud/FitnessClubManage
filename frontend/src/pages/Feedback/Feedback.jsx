import React, { useState } from "react";
import "./Feedback.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // UI success simulation
    setSuccess(true);
    setMessage("");
    setRating("");

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <>
      <Navbar />

      <section className="feedback-section">
        <div className="feedback-card">
          <h2 className="feedback-title">Submit Feedback</h2>

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="feedback-success">
              ✅ Thank you! Your feedback has been submitted.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label>Message</label>
            <textarea
              placeholder="Write your feedback..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <label>Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            >
              <option value="">Select rating</option>
              <option value="1">⭐ Poor</option>
              <option value="2">⭐⭐ Fair</option>
              <option value="3">⭐⭐⭐ Good</option>
              <option value="4">⭐⭐⭐⭐ Very Good</option>
              <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            </select>

            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </section>

      
    </>
  );
};

export default Feedback;