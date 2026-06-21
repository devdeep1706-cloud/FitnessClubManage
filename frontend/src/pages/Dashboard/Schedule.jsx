import React, { useState, useEffect } from "react";
import API from "../../api/axios"; 
import "./Schedule.css";

const Schedule = () => {
  const [filter, setFilter] = useState("All");
  const [userPlan, setUserPlan] = useState(null); 
  const [loading, setLoading] = useState(true);


  const planPermissions = {
    "1 Month Unlimited": ["Fitness", "Cardio", "Yoga" ], 
    "6 Month Unlimited": ["All"], 
    "12 Month Unlimited": ["All"], 
    "Gold": ["Fitness", "Cardio", "Yoga", "Body Building", "Boxing"], 
    "Silver": ["Cardio", "Yoga"], 
    "Bronze": ["Cardio"] 
  };

  // Filter Categories
  const categories = ["All", "Fitness", "Body Building", "Yoga", "Cardio", "Boxing"];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // --- HARDCODED SCHEDULE DATA ---
  const scheduleData = [
    {
      time: "06:00 AM - 08:00 AM",
      monday: { class: "Yoga", trainer: "Sarah", type: "Yoga" },
      tuesday: { class: "Cardio", trainer: "Mike", type: "Cardio" },
      wednesday: { class: "Boxing", trainer: "John", type: "Boxing" },
      thursday: { class: "Yoga", trainer: "Sarah", type: "Yoga" },
      friday: { class: "CrossFit", trainer: "Alex", type: "Fitness" },
      saturday: null,
      sunday: { class: "Rest", trainer: "", type: "All" },
    },
    {
      time: "10:00 AM - 12:00 PM",
      monday: { class: "CrossFit", trainer: "Alex", type: "Fitness" },
      tuesday: { class: "Body Building", trainer: "Jake", type: "Body Building" },
      wednesday: { class: "Cardio", trainer: "Mike", type: "Cardio" },
      thursday: { class: "CrossFit", trainer: "Alex", type: "Fitness" },
      friday: { class: "Boxing", trainer: "John", type: "Boxing" },
      saturday: { class: "Yoga", trainer: "Sarah", type: "Yoga" },
      sunday: { class: "Rest", trainer: "", type: "All" },
    },
    {
      time: "05:00 PM - 07:00 PM",
      monday: { class: "Boxing", trainer: "John", type: "Boxing" },
      tuesday: { class: "Yoga", trainer: "Sarah", type: "Yoga" },
      wednesday: { class: "CrossFit", trainer: "Alex", type: "Fitness" },
      thursday: { class: "Body Building", trainer: "Jake", type: "Body Building" },
      friday: { class: "Cardio", trainer: "Mike", type: "Cardio" },
      saturday: { class: "Zumba", trainer: "Emily", type: "Fitness" },
      sunday: { class: "Rest", trainer: "", type: "All" },
    },
    {
      time: "07:00 PM - 09:00 PM",
      monday: { class: "Body Building", trainer: "Jake", type: "Body Building" },
      tuesday: { class: "CrossFit", trainer: "Alex", type: "Fitness" },
      wednesday: { class: "Yoga", trainer: "Sarah", type: "Yoga" },
      thursday: { class: "Boxing", trainer: "John", type: "Boxing" },
      friday: null,
      saturday: { class: "Cardio", trainer: "Mike", type: "Cardio" },
      sunday: { class: "Rest", trainer: "", type: "All" },
    },
  ];

  // --- 2. FETCH USER PLAN ---
  useEffect(() => {
  const fetchUserPlan = async () => {
    try {
      const res = await API.get("/users/my-plans");
      
      
      const plansFromApi = Array.isArray(res.data.plans) ? res.data.plans : [];
      
      const activePlans = plansFromApi.filter(
          p => p.plan && new Date(p.endDate) > new Date()
      );

      if (activePlans.length > 0) {
        
        setUserPlan(activePlans[0].plan.name); 
      } else {
        setUserPlan("None");
      }
    } catch (error) {
      console.error("Error fetching plan permissions", error);
      setUserPlan("None");
    } finally {
      setLoading(false);
    }
  };

  fetchUserPlan();
}, []);

   

  // --- 3. CHECK ACCESS FUNCTION ---
  const checkAccess = (classType) => {
    if (!userPlan || userPlan === "None") return false; 
    if (classType === "All") return true; 

    const allowedTypes = planPermissions[userPlan] || [];
    
    // If plan has "All", they can see everything
    if (allowedTypes.includes("All")) return true;

    //  check specific type
    return allowedTypes.includes(classType);
  };

  const renderCell = (data) => {
    if (!data) return <span className="empty-cell">-</span>;

    // 1. Filter logic (Category Tabs)
    const matchesFilter = filter === "All" || data.type === filter;

    // 2. Permission Logic (User Plan)
    const hasAccess = checkAccess(data.type);

    if (matchesFilter) {
      if (hasAccess) {
        // ✅ USER HAS ACCESS
        return (
          <div className="class-info">
            <span className="class-name">{data.class}</span>
            {data.trainer && <span className="trainer-name">{data.trainer}</span>}
          </div>
        );
      } else {
        // 🔒 USER LOCKED OUT
        return (
          <div className="class-info locked-cell">
            <div className="locked-content">
              <span className="class-name">{data.class}</span>
            </div>
            <div className="lock-icon">🔒</div>
            <span className="upgrade-badge">Upgrade Plan</span>
          </div>
        );
      }
    } else {
      return <span className="empty-cell">-</span>;
    }
  };

  return (
    <div className="schedule-container">
      <h2 className="section-title">Class Schedule</h2>
      
      
      <div style={{ marginBottom: "20px", color: "#aaa" }}>
        Your Plan: <span style={{ color: "#e63946", fontWeight: "bold" }}>{loading ? "Loading..." : (userPlan || "No Active Plan")}</span>
      </div>

      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th className="time-header">Time</th>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((row, index) => (
              <tr key={index}>
                <td className="time-slot">{row.time}</td>
                <td>{renderCell(row.monday)}</td>
                <td>{renderCell(row.tuesday)}</td>
                <td>{renderCell(row.wednesday)}</td>
                <td>{renderCell(row.thursday)}</td>
                <td>{renderCell(row.friday)}</td>
                <td>{renderCell(row.saturday)}</td>
                <td>{renderCell(row.sunday)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;