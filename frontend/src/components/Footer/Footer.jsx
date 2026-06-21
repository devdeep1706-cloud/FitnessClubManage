import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-col">
          <h3>Explore More</h3>
          <p>
            Discover the best fitness workouts and lifestyle content.
            Stay updated with the latest trends, offers, and fitness programs.
          </p>
        </div>

        {/* CENTER */}
        <div className="footer-col">
          <h3>Subscribe To Our Newsletter</h3>
          <div className="footer-subscribe">
            <input type="email" placeholder="Email" />
            <button>Submit</button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="footer-col">
          <h3>Follow Us</h3>
          <ul className="footer-links">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>GitHub</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © 2025 Your Gym. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;