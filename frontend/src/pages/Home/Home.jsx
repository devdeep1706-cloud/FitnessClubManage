import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

/* HERO IMAGE */
import banner from "../../assets/banner.png";

/* FEATURE ICONS */
import icon1 from "../../assets/icon1.svg";
import icon2 from "../../assets/icon2.svg";
import icon3 from "../../assets/icon3.svg";
import icon4 from "../../assets/icon4.svg";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PLANS ================= */
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await API.get("/plans");
        setPlans(res.data);
      } catch (error) {
        console.error("Failed to fetch plans", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  /* ================= SCROLL ANIMATION ================= */
  useEffect(() => {
    const cards = document.querySelectorAll(".plan-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [plans]);

  /* ================= ENROLL ================= */
  const handleEnroll = (plan) => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/payment", {
      state: {
        planId: plan._id,
        planName: plan.name,
        price: plan.price
      }
    });
  };

  return (
    <div className="home">

      {/* ================= HERO ================= */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="hero-overlay">
          <h1 className="hero-title">
            BUILD UP YOUR <span>SHAPE</span>
          </h1>
          <p className="hero-subtitle">
            Build your body and fitness with professional touch
          </p>

          {!user && (
            <div className="hero-buttons">
              <button className="signup" onClick={() => navigate("/locate-gym")}>
                Sign Up
              </button>
              <button className="login" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features">
        <h2 className="features-title">OUR FEATURES</h2>
        <p className="features-desc">
          Strength, endurance, expert trainers, and world-class equipment
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <img src={icon1} alt="Weightlifting" />
            <h3>Weightlifting</h3>
            <p>Build muscle with expert guidance</p>
          </div>

          <div className="feature-card">
            <img src={icon2} alt="Specific Muscles" />
            <h3>Specific Muscles</h3>
            <p>Targeted training plans</p>
          </div>

          <div className="feature-card">
            <img src={icon3} alt="Flexibility" />
            <h3>Flex Your Muscles</h3>
            <p>Improve mobility and balance</p>
          </div>

          <div className="feature-card">
            <img src={icon4} alt="Cardio" />
            <h3>Cardio Exercises</h3>
            <p>Boost stamina and endurance</p>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ================= PLANS ================= */}
      <section className="plans">
        <h4 className="plans-subtitle">OUR PLAN</h4>
        <h2 className="plans-title">CHOOSE YOUR PRICING PLAN</h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading plans...</p>
        ) : (
          <div className="plans-grid">
            {plans.map((plan) => (
              <div className="plan-card" key={plan._id}>
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">₹{plan.price}</div>
                <span className="plan-type">
                  {plan.durationMonths} MONTH{plan.durationMonths > 1 ? "S" : ""}
                </span>

                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

                <button
                  className="plan-btn"
                  onClick={() => handleEnroll(plan)}
                >
                  ENROLL NOW
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Home;