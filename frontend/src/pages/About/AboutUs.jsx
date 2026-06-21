import React from "react";
import "./AboutUs.css";
import aboutBanner from "../../assets/breadcrumb-bg.jpg";
import { useState, useEffect } from "react"; 
import API from "../../api/axios"; 

import icon1 from "../../assets/icon1.svg";
import icon2 from "../../assets/icon2.svg";
import icon3 from "../../assets/icon3.svg";
import icon4 from "../../assets/icon4.svg";

const About = () => {
  const [trainers, setTrainers] = useState([]);

  // Fetch Trainers Data
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const { data } = await API.get("/trainers");
        setTrainers(data);
      } catch (error) {
        console.error("Failed to load trainers");
      }
    };
    fetchTrainers();
  }, []);
  return (
    <>
      {/* HERO */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${aboutBanner})` }}
      >
        <div className="about-overlay">
          <h1 className="about-title">ABOUT US</h1>

          <div className="about-breadcrumb">
            <span>Home</span>
            <span className="dot">•</span>
            <span className="active">About</span>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="features">
        <h2 className="features-title">WHY CHOOSE US?</h2>
        <p className="features-desc">PUSH YOUR LIMITS FORWARD</p>

        <div className="features-grid">
          <div className="feature-card">
            <img src={icon1} alt="Modern Equipment" />
            <h3>Modern Equipment</h3>
            <p>
              Train with advanced gym machines designed for safety,
              performance, and maximum results.
            </p>
          </div>

          <div className="feature-card">
            <img src={icon2} alt="Healthy Nutrition" />
            <h3>Healthy Nutrition Plan</h3>
            <p>
              Get expert nutrition guidance to support muscle growth,
              recovery, and long-term fitness.
            </p>
          </div>

          <div className="feature-card">
            <img src={icon3} alt="Professional Training" />
            <h3>Professional Training Plan</h3>
            <p>
              Certified trainers create structured programs tailored to
              your goals and fitness level.
            </p>
          </div>

          <div className="feature-card">
            <img src={icon4} alt="Unique Needs" />
            <h3>Unique to Your Needs</h3>
            <p>
              Every workout adapts to your lifestyle, strength,
              and personal fitness journey.
            </p>
          </div>
        </div>
      </section>
      {/* ================= WHAT WE HAVE DONE ================= */}
<section className="about-progress">
  <div className="about-progress-container">

    {/* LEFT IMAGE */}
    <div className="about-progress-image">
      <img src="/assets/about-us.jpg" alt="Workout Session" />
      
    </div>

    {/* RIGHT CONTENT */}
    <div className="about-progress-content">
      <span className="about-tag">ABOUT US</span>
      <h2>WHAT WE HAVE DONE</h2>
      

      <p>
        Over the years, we have helped hundreds of members transform their
        bodies and lifestyles. Our focus is on sustainable fitness,
        expert coaching, and a motivating environment that delivers
        real results.
      </p>

      {/* PROGRESS BARS */}
      <div className="progress-item">
        <div className="progress-label">
          <span>Body Building</span>
          <span>80%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "80%" }}></div>
        </div>
      </div>

      <div className="progress-item">
        <div className="progress-label">
          <span>Training</span>
          <span>85%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "85%" }}></div>
        </div>
      </div>

      <div className="progress-item">
        <div className="progress-label">
          <span>Fitness</span>
          <span>75%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "75%" }}></div>
        </div>
      </div>

    </div>
  </div>
</section>
{/* ================= TEAM ================= */}
      <section className="team">
        <div className="team-header">
          <span className="team-subtitle">OUR TEAM</span>
          <h2 className="team-title">TRAIN WITH EXPERTS</h2>
        </div>

        <div className="team-grid">
          {trainers.length === 0 ? (
            <p>Loading trainers...</p>
          ) : (
            trainers.map((trainer) => (
              <div className="team-card" key={trainer._id}>
                <img src={trainer.image} alt={trainer.name} />
                <div className="team-overlay">
                  <h3>{trainer.name}</h3>
                  <p>{trainer.role.toUpperCase()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      {/* ================= CTA SECTION ================= */}
<section
  className="cta-section"
  style={{ backgroundImage: "url(/assets/banner-bg.jpg)" }}
>
  <div className="cta-overlay">
    <h2 className="cta-title">
      REGISTRATION NOW TO GET MORE DEALS
    </h2>

    <p className="cta-subtitle">
      WHERE HEALTH, BEAUTY AND FITNESS MEET.
    </p>

    <button className="cta-btn">APPOINTMENT</button>
  </div>
</section>

    </>
  );
};

export default About;