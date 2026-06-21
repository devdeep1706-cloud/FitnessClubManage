import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

import Profile from "./Profile";
import MyPlans from "./MyPlans";
import Schedule from "./Schedule";
import Feedback from "./Feedback";
import ChangePassword from "./ChangePassword";

import "./Dashboard.css";

const UserDashboard = () => {
  const [active, setActive] = useState("profile");

  return (
    <>
      <Navbar />

      <div className="user-dashboard">
        
        <aside className="user-sidebar">
          <h3>My Account</h3>

          <button
            className={active === "profile" ? "active" : ""}
            onClick={() => setActive("profile")}
          >
            Profile
          </button>

          <button
            className={active === "plans" ? "active" : ""}
            onClick={() => setActive("plans")}
          >
            My Plans
          </button>

          <button
            className={active === "schedule" ? "active" : ""}
            onClick={() => setActive("schedule")}
          >
            Schedule
          </button>

          <button
            className={active === "feedback" ? "active" : ""}
            onClick={() => setActive("feedback")}
          >
            Feedback
          </button>

          <button
            className={active === "password" ? "active" : ""}
            onClick={() => setActive("password")}
          >
            Change Password
          </button>
        </aside>

        
        <main className="user-content">
          {active === "profile" && <Profile />}
          {active === "plans" && <MyPlans />}
          {active === "schedule" && <Schedule />}
          {active === "feedback" && <Feedback />}
          {active === "password" && <ChangePassword />}
        </main>
      </div>
    </>
  );
};

export default UserDashboard;