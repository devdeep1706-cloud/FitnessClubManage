import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";
import API from "../../api/axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { planId, planName, price } = location.state || {};

  // Safety check (direct URL access)
  if (!planId) {
    return (
      <div className="payment-container">
        <h2>No plan selected</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const handlePayment = async () => {
    try{
      await API.post("/purchase",{planId});
      alert("Payment Successful ✅");
      navigate("/dashboard");
    }catch(error){
      alert(error.response?.data?.message|| "Payment failed");
    }
    
  };

  return (
    <div className="payment-container">
      <h1>Confirm Your Payment</h1>

      <div className="payment-card">
        <p><strong>Plan:</strong> {planName}</p>
        <p><strong>Amount:</strong> ₹{price}</p>

        <button className="pay-btn" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;