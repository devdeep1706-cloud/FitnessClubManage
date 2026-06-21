import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

import Logo from "../Logo";
//import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      {/* 1. LOGO */}
      {/* 1. LOGO SECTION */}
      <div className="navbar-left" onClick={() => navigate("/")}>
        
        <Logo width={180} color="#e63946" /> 
      </div>
      {/* <div className="navbar-left">
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
          className="logo-img"
        />
      </div> */}

      {/* 2. HAMBURGER ICON (Visible on Mobile) */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </div>

      {/* 3. MENU LINKS (Desktop + Mobile Wrapper) */}
      <ul className={`navbar-centre ${isOpen ? "active" : ""}`}>
        <li onClick={() => setIsOpen(false)}><NavLink to="/">Home</NavLink></li>
        <li onClick={() => setIsOpen(false)}><NavLink to="/about">About Us</NavLink></li>
        <li onClick={() => setIsOpen(false)}><NavLink to="/services">Services</NavLink></li>
        <li onClick={() => setIsOpen(false)}><NavLink to="/gallery">Gallery</NavLink></li>
        
        {/* AUTH LINKS */}
        {!user ? (
          <>
            <li onClick={() => setIsOpen(false)}><NavLink to="/locate-gym">Register</NavLink></li>
            <li onClick={() => setIsOpen(false)}><NavLink to="/login">Login</NavLink></li>
          </>
        ) : (
          <>
            {user.role === "admin" && (
              <li className="nav-user" onClick={() => {navigate("/admin"); setIsOpen(false);}}>
                🛠 Admin
              </li>
            )}

            <li className="nav-user" onClick={() => {navigate("/dashboard"); setIsOpen(false);}}>
              👤 {user.name}
            </li>

            <li className="nav-logout" onClick={handleLogout}>
              Logout
            </li>
          </>
        )}
      </ul>


      <div className="navbar-right">
        <img src={search_icon} alt="search" />
        
      </div>
    </div>
  );
};

export default Navbar;