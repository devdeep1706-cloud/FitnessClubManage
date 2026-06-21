import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "./AdminPayments.css";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Real Payment History
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await API.get("/purchase");
        setPayments(data);
      } catch (error) {
        console.error("Failed to load payments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  //  DELETE FUNCTION
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payment record?")) return;

    try {
      await API.delete(`/purchase/${id}`);
      // Remove from UI immediately
      setPayments(payments.filter((pay) => pay._id !== id));
      alert("Record deleted successfully");
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete record");
    }
  };

  if (loading) return <p style={{ color: "white", padding: "20px" }}>Loading payments...</p>;

  
  const validPayments = payments.filter((pay) => pay.planName && pay.price);

  return (
    <div className="admin-payments">
      <h2>Payment History</h2>

      {validPayments.length === 0 ? (
        <p className="empty">No valid payment records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th> 
            </tr>
          </thead>

          <tbody>
            {validPayments.map((pay) => (
              <tr key={pay._id}>
                {/* 1. Payment ID */}
                <td style={{ fontFamily: "monospace", color: "#888", fontSize: "12px" }}>
                  {pay._id}
                </td>

                {/* 2. User Details */}
                <td>{pay.user ? pay.user.name : "Deleted User"}</td>
                <td>{pay.user ? pay.user.email : "-"}</td>

                {/* 3. Plan Details */}
                <td>{pay.planName}</td>

                <td style={{ color: "#2ecc71", fontWeight: "bold" }}>
                  ₹{pay.price}
                </td>

                {/* 4. Date */}
                <td>{new Date(pay.createdAt).toLocaleDateString()}</td>

                {/* 5. Status Badge */}
                <td>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "12px",
                      backgroundColor: pay.status === "active" ? "rgba(46, 204, 113, 0.2)" : "rgba(231, 76, 60, 0.2)",
                      color: pay.status === "active" ? "#2ecc71" : "#e74c3c",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {pay.status ? pay.status.toUpperCase() : "UNKNOWN"}
                  </span>
                </td>

                {/* 6.  Delete Button */}
                <td>
                  <button
                    onClick={() => handleDelete(pay._id)}
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPayments;