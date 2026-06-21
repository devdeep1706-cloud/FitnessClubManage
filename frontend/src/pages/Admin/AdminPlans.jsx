import React, { useEffect, useState } from "react";
import API from "../../api/axios"; 
import "./AdminPlans.css";

const AdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    durationMonths: "",
    features: "",
  });

  // Fetch Plans from Backend
  const fetchPlans = async () => {
    try {
      const { data } = await API.get("/plans");
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const payload = {
        ...formData,
        features: formData.features.split(",").map((f) => f.trim()),
      };

      if (editingId) {
        await API.put(`/plans/${editingId}`, payload); 
        alert("Plan Updated Successfully!");
      } else {
        await API.post("/plans", payload); 
        alert("Plan Created Successfully!");
      }

      // Reset Form
      setFormData({ name: "", price: "", durationMonths: "", features: "" });
      setEditingId(null);
      fetchPlans();
    } catch (error) {
      alert("Failed to save plan. Please try again.");
    }
  };

  // Populate Form for Editing
  const handleEdit = (plan) => {
    setEditingId(plan._id);
    setFormData({
      name: plan.name,
      price: plan.price,
      
      durationMonths: plan.durationMonths || plan.duration, 
      features: Array.isArray(plan.features) ? plan.features.join(", ") : plan.features,
    });
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      await API.delete(`/plans/${id}`);
      fetchPlans();
    } catch (error) {
      alert("Failed to delete plan");
    }
  };

  if (loading) return <p style={{padding: "20px"}}>Loading Plans...</p>;

  return (
    <div className="admin-plans">
      <h2>Plan Management</h2>

      {/* --- Responsive Form Section --- */}
      <div className="plan-form-container">
        <h3>{editingId ? "Edit Plan Details" : "Create New Plan"}</h3>
        <form onSubmit={handleSubmit} className="plan-form">
          <input
            type="text" name="name" placeholder="Plan Name (e.g. Platinum)"
            value={formData.name} onChange={handleChange} required
          />
          <input
            type="number" name="price" placeholder="Price (₹)"
            value={formData.price} onChange={handleChange} required
          />
          <input
            type="number" name="durationMonths" placeholder="Duration (Months)"
            value={formData.durationMonths} onChange={handleChange} required
          />
          <input
            type="text" name="features" placeholder="Features (Gym, Sauna, Spa...)"
            value={formData.features} onChange={handleChange} required
          />
          
          <div className="form-actions">
            <button type="submit" className="form-btn btn-submit">
                {editingId ? "Update" : "Add Plan"}
            </button>
            {editingId && (
                <button type="button" className="form-btn btn-cancel" onClick={() => { setEditingId(null); setFormData({ name: "", price: "", durationMonths: "", features: "" }); }}>
                Cancel
                </button>
            )}
          </div>
        </form>
      </div>

      {/* --- Table Section --- */}
      {plans.length === 0 ? (
        <p className="empty">No active plans found. Add one above.</p>
      ) : (
        <div className="plans-table-wrapper">
            <table className="plans-table">
            <thead>
                <tr>
                <th>Plan Name</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Features included</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {plans.map((plan) => (
                <tr key={plan._id}>
                    <td><strong>{plan.name}</strong></td>
                    <td style={{fontWeight: "bold", color: "#2c3e50"}}>₹ {plan.price}</td>
                    <td>{plan.durationMonths || plan.duration} Months</td>
                    <td>
                        
                        {Array.isArray(plan.features) 
                            ? plan.features.map((f, i) => <span key={i} className="feature-tag">{f}</span>) 
                            : plan.features}
                    </td>
                    <td>
                      {/* Fixed Action Buttons Layout */}
                      <div className="action-buttons">
                        <button className="action-btn edit-btn" onClick={() => handleEdit(plan)}>
                            Edit
                        </button>
                        <button className="action-btn delete-btn" onClick={() => handleDelete(plan._id)}>
                            Delete
                        </button>
                      </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      )}
    </div>
  );
};

export default AdminPlans;