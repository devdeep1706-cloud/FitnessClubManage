import "./Dashboard.css";

const DashboardSidebar = ({ active, setActive }) => {
  return (
    <aside className="dashboard-sidebar">
      <h3>My Account</h3>

      <button
        className={active === "profile" ? "active" : ""}
        onClick={() => setActive("profile")}
      >
        👤 Profile
      </button>

      <button
        className={active === "plans" ? "active" : ""}
        onClick={() => setActive("plans")}
      >
        📦 My Plans
      </button>

      <button
        className={active === "schedule" ? "active" : ""}
        onClick={() => setActive("schedule")}
      >
        🗓 Schedule
      </button>

      <button
        className={active === "feedback" ? "active" : ""}
        onClick={() => setActive("feedback")}
      >
        💬 Feedback
      </button>

      <button
        className={active === "password" ? "active" : ""}
        onClick={() => setActive("password")}
      >
        🔐 Change Password
      </button>
    </aside>
  );
};

export default DashboardSidebar;