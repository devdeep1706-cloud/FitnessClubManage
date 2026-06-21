import { useState, useEffect } from "react";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css"; 

const Profile = () => {
  const { user, setUser } = useAuth();
  
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    profileImage: ""
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        profileImage: user.profileImage || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await API.post("/upload", formData, config);
      
      
      const imageUrl = `http://localhost:5000${data}`;
      setForm((prev) => ({ ...prev, profileImage: imageUrl }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.put("/users/profile", form);

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    }catch (err) {
      
      console.error("FULL ERROR DETAILS:", err); 
      
      
      if (err.response && err.response.data && err.response.data.message) {
        alert("Server Error: " + err.response.data.message);
      } else {
        alert("Error: " + err.message);
      }
    }
  };

  if (!user) return null;

  return (
    <div className="profile-layout">
      
      
      <div className="dashboard-card profile-form-section">
        <h2>My Profile</h2>
        {success && <p className="success-msg">{success}</p>}

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />

          <label>Email</label>
          <input value={user.email} disabled className="input-disabled" />

          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} />

          <label>Address</label>
          <input name="address" value={form.address} onChange={handleChange} />

          <button type="submit" disabled={loading || uploading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      
      <div className="profile-card-section">
        <div className="profile-avatar-container">
          <img 
            src={form.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
            alt="Profile" 
            className="profile-avatar"
          />
          <input 
            type="file" 
            id="fileInput" 
            style={{ display: "none" }} 
            onChange={handleImageUpload}
            accept="image/*"
          />
          <label htmlFor="fileInput" className="upload-btn">
            {uploading ? "Uploading..." : "📷 Change Photo"}
          </label>
        </div>

        <div className="profile-info">
          <h3>{user.name}</h3>
          <span className="profile-role">{user.role.toUpperCase()}</span>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

    </div>
  );
};

export default Profile;