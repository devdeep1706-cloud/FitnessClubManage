import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import "./AdminTrainers.css";

const AdminTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", image: "" });
  const [uploading, setUploading] = useState(false); 

  // 1. Fetch Trainers from DB
  const fetchTrainers = async () => {
    try {
      const { data } = await API.get("/trainers");
      setTrainers(data);
    } catch (error) {
      console.error("Error fetching trainers", error);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // 2. Handle Image Upload 
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; 
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); 
    
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // Post to  upload route
      const { data } = await API.post("/upload", formData, config);

      
      setForm({ ...form, image: `http://localhost:5000${data}` });
      
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert("Image upload failed");
    }
  };

  // 3. Submit New Trainer
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if(!form.image) {
         alert("Please upload an image first");
         return;
      }

      await API.post("/trainers", form);
      alert("Trainer added successfully!");
      
      // Reset form
      setForm({ name: "", role: "", image: "" });
      
      // Refresh list
      fetchTrainers(); 
    } catch (error) {
      alert("Failed to add trainer");
    }
  };

  // 4. Delete Trainer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/trainers/${id}`);
      fetchTrainers();
    } catch (error) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="admin-trainers">
      <h2>Manage Trainers</h2>

      {/* --- ADD TRAINER FORM --- */}
      <div className="trainer-form-card">
        <h3>Add New Trainer</h3>
        <form onSubmit={handleAdd}>
          <input
            placeholder="Trainer Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          
          <input
            placeholder="Role (e.g. Yoga Coach)"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          />

          {/* IMAGE UPLOAD SECTION */}
          <div className="file-upload-section">
             <label>Trainer Photo:</label>
             
             
             <input
              type="text"
              placeholder="Image path will appear here..."
              value={form.image}
              readOnly 
              className="readonly-input"
            />

            
            <input 
              type="file" 
              accept="image/*"
              onChange={uploadFileHandler} 
            />
            
            {uploading && <p className="uploading-text">Uploading image...</p>}
          </div>

          <button type="submit" disabled={uploading}>
             {uploading ? "Please Wait..." : "Add Trainer"}
          </button>
        </form>
      </div>

      {/* --- TRAINER LIST --- */}
      <div className="trainers-grid">
        {trainers.map((t) => (
          <div key={t._id} className="trainer-card-admin">
            <img src={t.image} alt={t.name} />
            <div className="info">
              <h4>{t.name}</h4>
              <p>{t.role}</p>
              <button onClick={() => handleDelete(t._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTrainers;