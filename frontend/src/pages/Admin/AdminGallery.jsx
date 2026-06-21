import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import "./AdminTrainers.css"; 

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [category, setCategory] = useState("Gym"); 
  const [uploading, setUploading] = useState(false);

  // Categories list
  const categories = ["Gym", "Cardio", "Pool", "Boxing", "Yoga", "Zumba"];

  const fetchImages = async () => {
    try {
      const { data } = await API.get("/gallery");
      setImages(data);
    } catch (error) {
      console.error("Error fetching gallery", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle File Upload
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await API.post("/upload", formData, config);
      setImagePath(`http://localhost:5000${data}`);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert("Image upload failed");
    }
  };

  // Handle Add Image
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!imagePath) return alert("Please upload an image");

    try {
      
      await API.post("/gallery", { image: imagePath, category });
      alert("Image added to gallery!");
      setImagePath("");
      setCategory("Gym"); 
      fetchImages();
    } catch (error) {
      alert("Failed to add image");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await API.delete(`/gallery/${id}`);
      fetchImages();
    } catch (error) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="admin-trainers">
      <h2>Manage Gallery</h2>

      <div className="trainer-form-card">
        <h3>Add New Photo</h3>
        <form onSubmit={handleAdd}>
          
          {/*  CATEGORY DROPDOWN */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#aaa" }}>Select Category:</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: "100%", padding: "10px", background: "#111", border: "1px solid #333", color: "white" }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* FILE UPLOAD */}
          <div className="file-upload-section">
             <label>Photo:</label>
             <input type="text" value={imagePath} readOnly className="readonly-input" placeholder="Image path..." />
             <input type="file" accept="image/*" onChange={uploadFileHandler} />
             {uploading && <p className="uploading-text">Uploading...</p>}
          </div>

          <button type="submit" disabled={uploading}>Add to Gallery</button>
        </form>
      </div>

      {/* GALLERY GRID */}
      <div className="trainers-grid">
        {images.map((img) => (
          <div key={img._id} className="trainer-card-admin">
            <img src={img.image} alt="Gallery" />
            <div className="info">
               
               <span style={{ color: "#e63946", fontSize: "12px", fontWeight: "bold", display:"block", marginBottom:"5px" }}>
                 {img.category || "General"}
               </span>
               <button onClick={() => handleDelete(img._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;