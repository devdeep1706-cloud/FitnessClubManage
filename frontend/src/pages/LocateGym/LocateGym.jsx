import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./LocateGym.css";

const LocateGym = () => {
  const [pincode, setPincode] = useState("");
  const [gyms, setGyms] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const searchGym = async () => {
    try {
      const res = await API.post("/gyms/check", { pincode });
      setGyms(res.data);
      setError("");
      localStorage.setItem("allowSignup", "true");
    } catch (err) {
      setGyms([]);
      setError(err.response?.data?.message || "Error");
      localStorage.removeItem("allowSignup");
    }
  };

  const handleContinue=()=>{
    localStorage.setItem("allowSignup","true");
    navigate("/register");
  }

  return (
    <div className="locate-container">
      <h2>Locate Us Near You</h2>

      <input
        placeholder="Enter Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />

      <button onClick={searchGym}>Search</button>

      {error && <p className="error">{error}</p>}

      {gyms.map((gym) => (
        <div key={gym._id} className="gym-card">
          <h4>{gym.name}</h4>
          <p>{gym.address}</p>
        </div>
      ))}

      {gyms.length > 0 && (
        <button className="continue" onClick={handleContinue}>
          Continue to Signup
        </button>
      )}
    </div>
  );
};

export default LocateGym;