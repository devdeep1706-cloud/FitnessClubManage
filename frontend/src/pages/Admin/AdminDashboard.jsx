import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

import AdminSidebar from "./AdminSidebar";
import AdminStats from "./AdminStats";
import AdminUsers from "./AdminUsers";
import AdminPlans from "./AdminPlans";
import AdminPayments from "./AdminPayments";
import AdminFeedback from "./AdminFeedback";
import AdminTrainers from "./AdminTrainers";
import AdminGallery from "./AdminGallery";

import "./AdminDashboard.css";

const AdminDashboard = () => {
const [active, setActive] = useState("stats");

return (
<>
<Navbar />

<div className="admin-layout">  
    <AdminSidebar active={active} setActive={setActive} />  

    <main className="admin-main">  
      {active === "stats" && <AdminStats />}  
      {active === "users" && <AdminUsers />}  
      {active === "plans" && <AdminPlans />}  
      {active === "payments" && <AdminPayments />}  
      {active === "feedback" && <AdminFeedback />}
      {active === "trainers" && <AdminTrainers />}  
      {active === "gallery" && <AdminGallery />}  
    </main>  
  </div>  
  {/* <AdminUsers/>   */}
  {/* <AdminPlans/>  
  <AdminPayments/>  
  <AdminUsers/>   */}
</>

);
};

export default AdminDashboard;

