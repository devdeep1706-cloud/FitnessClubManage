import React, { useState, useEffect } from "react";
import "./AdminFeedback.css";
import API from "../../api/axios"; 

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. FETCH REAL DATA
  const fetchFeedbacks = async () => {
    try {
      
      const res = await API.get("/feedback");
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Failed to fetch feedbacks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // 2. DELETE FUNCTION 
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
        try {
            await API.delete(`/feedback/${id}`);
            
            
            setFeedbacks(feedbacks.filter((fb) => fb._id !== id));
            alert("Feedback deleted");
        } catch (error) {
            console.error("Delete failed", error);
            alert("Failed to delete feedback");
        }
    }
  };

  
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="admin-feedback-page">
      <h2 className="section-title">User Feedback</h2>

      {loading ? (
        <p className="no-feedback">Loading feedback...</p>
      ) : feedbacks.length === 0 ? (
        <p className="no-feedback">No feedback received yet.</p>
      ) : (
        <div className="feedback-grid">
          {feedbacks.map((fb) => (
            
            <div key={fb._id} className="feedback-item">
              <div className="feedback-header">
                <div>
                  
                  <strong className="user-name">
                    {fb.user ? fb.user.name : "Unknown User"}
                  </strong>
                  
                  
                  <span className="feedback-date">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button 
                  className="delete-btn" 
                  
                  onClick={() => handleDelete(fb._id)}
                  title="Delete Feedback"
                >
                  🗑️
                </button>
              </div>

              <div className="star-rating">
                {renderStars(fb.rating)}
              </div>

              <p className="feedback-message">"{fb.message}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;