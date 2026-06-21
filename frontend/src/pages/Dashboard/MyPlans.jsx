import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import API from "../../api/axios";

import "./MyPlans.css"; 

const MyPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyPlans();
  }, []);

  const fetchMyPlans = async () => {
    try {
      const res = await API.get("/users/my-plans");
      const allPlans = Array.isArray(res.data.plans) ? res.data.plans : [];
      // Filter out garbage data
      const validPlans = allPlans.filter(p => p && typeof p === 'object');
      setPlans(validPlans);
    } catch (error) {
      console.error("Failed to load plans", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FUNCTION: Delete a plan
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    
    try {
      
      await API.delete(`/purchase/${id}`); 
      alert("Plan deleted!");
      fetchMyPlans(); 
    } catch (error) {
      console.error("Delete failed", error);
      alert("Could not delete plan. Check console.");
    }
  };

  // ✅ FUNCTION: Renew a plan
  const handleRenew = (plan) => {
    
    navigate("/payment", { 
      state: { 
        planId: plan.plan._id, 
        planName: plan.plan.name, 
        price: plan.price 
      } 
    });
  };

  // --- STYLES ---
  const pageStyle = { width: "100%", padding: "20px", color: "white", minHeight: "80vh" };
  const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "20px" };
  
  const cardStyle = {
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative" 
  };

  return (
    <div style={pageStyle}>
      <h2 style={{ borderLeft: "4px solid #e63946", paddingLeft: "15px", marginBottom: "20px" }}>
        My Plans
      </h2>

      {loading ? (
        <p>Loading your plans...</p>
      ) : plans.length === 0 ? (
        <p>You have no active plans.</p>
      ) : (
        <div style={gridStyle}>
          {plans.map((purchase, index) => {
            const planName = purchase.plan?.name || "Old Data"; 
            const price = purchase.price || purchase.amount || 0;
            const startDate = purchase.startDate ? new Date(purchase.startDate).toLocaleDateString() : "N/A";
            const endDate = purchase.endDate ? new Date(purchase.endDate).toLocaleDateString() : "N/A";
            const isExpired = purchase.endDate ? new Date(purchase.endDate) < new Date() : false;

            if (planName === "Old Data" && price === 0) return null;

            return (
              <div key={purchase._id || index} style={cardStyle}>
                
                {/* 🗑️ DELETE BUTTON  */}
                <button 
                  onClick={() => handleDelete(purchase._id)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "transparent",
                    border: "none",
                    color: "#666",
                    cursor: "pointer",
                    fontSize: "1.2rem"
                  }}
                  title="Delete Plan"
                >
                  🗑️
                </button>

                <div>
                  <h3 style={{ margin: "0 0 10px 0", color: "#fff", fontSize: "1.4rem" }}>{planName}</h3>
                  <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#e63946", margin: "0 0 15px 0" }}>₹{price}</p>
                  
                  <div style={{ color: "#aaa", fontSize: "0.9rem", marginBottom: "15px" }}>
                    <div style={{ marginBottom: "5px" }}><strong>Start:</strong> {startDate}</div>
                    <div><strong>End:</strong> {endDate}</div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/* Status Badge */}
                    <div 
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        backgroundColor: isExpired ? "rgba(244, 67, 54, 0.2)" : "rgba(76, 175, 80, 0.2)",
                        color: isExpired ? "#f44336" : "#4caf50",
                        border: isExpired ? "1px solid #f44336" : "1px solid #4caf50"
                      }}
                    >
                      {isExpired ? "EXPIRED" : "ACTIVE"}
                    </div>

                    {/* 🔄 RENEW BUTTON  */}
                    {isExpired && (
                        <button
                            onClick={() => handleRenew(purchase)}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "5px",
                                border: "none",
                                backgroundColor: "#e63946",
                                color: "white",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            Renew Now
                        </button>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyPlans;