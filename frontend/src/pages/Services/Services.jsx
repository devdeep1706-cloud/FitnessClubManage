import React, {useState} from "react";

import "./Services.css";

//import Navbar from "../../components/Navbar/Navbar";
//import Footer from "../../components/Footer/Footer";
import servicesBanner from "../../assets/breadcrumb-bg.jpg";

const Services = () => {
  const  [showVideo, setShowVideo]=
  useState(false);
  return (
    <>
      {/* <Navbar /> */}

      {/* ===== HERO  ===== */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${servicesBanner})` }}
      >
        <div className="about-overlay">
          <h1 className="about-title">SERVICES</h1>

          <div className="about-breadcrumb">
            <span>Home</span>
            <span className="dot">•</span>
            <span className="active">Services</span>
          </div>
        </div>
      </section>

      {/* ===== SERVICES PANEL ===== */}
      <section className="services-section">
        <div className="services-header">
          <span className="services-subtitle">WHAT WE DO?</span>
          <h2 className="services-title">PUSH YOUR LIMITS FORWARD</h2>
        </div>

        <div className="services-grid">
          <div className="service-box">
            <img src="/assets/services-1.jpg" alt="Strength Training" />
            <div className="service-content">
              <h3>Strength Training</h3>
              <p>
                Build muscle, increase power, and improve overall performance
                with structured strength workouts for all fitness levels.
              </p>
              <span className="explore">EXPLORE</span>
            </div>
          </div>

          <div className="service-box highlight">
            <img src="/assets/services-2.jpg" alt="Personal Training" />
            <div className="service-content">
              <h3>Personal Training</h3>
              <p>
                One-on-one coaching tailored to your goals, body type, and
                fitness journey with expert trainers.
              </p>
              <span className="explore">EXPLORE</span>
            </div>
          </div>

          <div className="service-box">
            <img src="/assets/services-3.jpg" alt="Body Building" />
            <div className="service-content">
              <h3>Body Building</h3>
              <p>
                Advanced muscle-building programs focused on strength,
                symmetry, and endurance.
              </p>
              <span className="explore">EXPLORE</span>
            </div>
          </div>

          <div className="service-box">
            <img src="/assets/services-4.jpg" alt="Group Fitness Classes" />
            <div className="service-content">
              <h3>Group Fitness Classes</h3>
              <p>
                High-energy group workouts including HIIT, cardio, and
                functional training.
              </p>
              <span className="explore">EXPLORE</span>
            </div>
          </div>
        </div>
      </section>
      {/* ========= VIDEO CTA SECTION ========= */}
<section className="services-video">
  <div className="services-video-overlay">
    <h2 className="services-video-title">
      EXERCISE UNTIL THE BODY OBEYS.
    </h2>

    <p className="services-video-subtitle">
      WHERE HEALTH, BEAUTY AND FITNESS MEET.
    </p>

    {/* PLAY BUTTON */}
    <button
      className="services-play-btn"
      onClick={() => setShowVideo(true)}
    >
      ▶
    </button>
  </div>
</section>

{/* ========= VIDEO MODAL ========= */}
{showVideo && (
  <div className="video-modal">
    <div className="video-wrapper">
      <button
        className="video-close"
        onClick={() => setShowVideo(false)}
      >
        ✕
      </button>

      <iframe
        src="https://www.youtube.com/embed/7-sUsXB8LrU?autoplay=1"
        title="Gym Video"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  </div>
)}
  {/* ================= PLANS ================= */}
<section className="plans">
  <h4 className="plans-subtitle">OUR PLAN</h4>
  <h2 className="plans-title">CHOOSE YOUR PRICING PLAN</h2>

  <div className="plans-grid">
    {/* 1 MONTH */}
    <div className="plan-card">
      <h3 className="plan-name">1 Month Unlimited</h3>
      <div className="plan-price">₹1000.0</div>
      <span className="plan-type">SINGLE CLASS</span>

      <ul>
        <li>Free riding</li>
        <li>Unlimited equipments</li>
        <li>Personal trainer</li>
        <li>Weight losing classes</li>
        <li>Month to month</li>
        <li>No time restriction</li>
      </ul>

      <button
        className="plan-btn"
        onClick={() => handleEnroll("1 Month Unlimited", 39)}
      >
        ENROLL NOW
      </button>
    </div>

    {/* 12 MONTH */}
    <div className="plan-card">
      <h3 className="plan-name">12 Month Unlimited</h3>
      <div className="plan-price">₹10000.0</div>
      <span className="plan-type">SINGLE CLASS</span>

      <ul>
        <li>Free riding</li>
        <li>Unlimited equipments</li>
        <li>Personal trainer</li>
        <li>Weight losing classes</li>
        <li>Month to month</li>
        <li>No time restriction</li>
      </ul>

      <button
        className="plan-btn"
        onClick={() => handleEnroll("12 Month Unlimited", 99)}
      >
        ENROLL NOW
      </button>
    </div>

    {/* 6 MONTH */}
    <div className="plan-card">
      <h3 className="plan-name">6 Month Unlimited</h3>
      <div className="plan-price">₹5000.0</div>
      <span className="plan-type">SINGLE CLASS</span>

      <ul>
        <li>Free riding</li>
        <li>Unlimited equipments</li>
        <li>Personal trainer</li>
        <li>Weight losing classes</li>
        <li>Month to month</li>
        <li>No time restriction</li>
      </ul>

      <button
        className="plan-btn"
        onClick={() => handleEnroll("6 Month Unlimited", 59)}
      >
        ENROLL NOW
      </button>
    </div>
  </div>
</section>
    </>
  );
};

export default Services;