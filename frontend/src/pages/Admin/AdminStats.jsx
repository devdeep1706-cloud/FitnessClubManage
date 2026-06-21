import "./AdminStats.css";

const AdminStats = () => {
  return (
    <div className="admin-stats">
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-title">Total Users</p>
          <h2 className="stat-value">128</h2>
        </div>

        <div className="stat-card">
          <p className="stat-title">Active Plans</p>
          <h2 className="stat-value">86</h2>
        </div>

        <div className="stat-card">
          <p className="stat-title">Total Revenue</p>
          <h2 className="stat-value">₹2,45,000</h2>
        </div>

        <div className="stat-card">
          <p className="stat-title">Feedback</p>
          <h2 className="stat-value">34</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;