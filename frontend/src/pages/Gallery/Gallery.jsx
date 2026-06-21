import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import "./Gallery.css";
import galleryBanner from "../../assets/breadcrumb-bg.jpg";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("All"); 
  const [loading, setLoading] = useState(true);

  // Define your categories 
  const categories = ["All", "Gym", "Cardio", "Pool", "Boxing", "Yoga", "Zumba"];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await API.get("/gallery");
        setImages(data);
      } catch (error) {
        console.error("Error loading gallery");
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  //  Filtering Logic
  const filteredImages = filter === "All" 
    ? images 
    : images.filter((img) => img.category === filter);

  return (
    <>
      {/* HERO SECTION */}
      <section className="about-hero" style={{ backgroundImage: `url(${galleryBanner})` }}>
        <div className="about-overlay">
          <h1 className="about-title">OUR GALLERY</h1>
          <div className="about-breadcrumb">
             <span>Home</span> <span className="dot">•</span> <span className="active">Gallery</span>
          </div>
        </div>
      </section>

      <div className="gallery-page">
        
        {/*  FILTER BUTTONS */}
        <div className="gallery-filter-bar">
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

        {/* IMAGES GRID */}
        {loading ? (
          <p style={{textAlign:"center", color:"#aaa"}}>Loading photos...</p>
        ) : (
          <div className="gallery-grid">
            {filteredImages.length === 0 ? (
              <div style={{ width: "100%", gridColumn: "1 / -1", textAlign: "center", color: "#666" }}>
                <p>No photos found in this category.</p>
              </div>
            ) : (
              filteredImages.map((img) => (
                <div key={img._id} className="gallery-item">
                  <img src={img.image} alt={img.category} />
                  
                  <div className="gallery-overlay">
                    <span>{img.category}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </>
  );
};

export default Gallery;