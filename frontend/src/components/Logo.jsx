import React from "react";

const Logo = ({ width = 150, color = "#e63946" }) => {
  return (
    <svg
      width={width}
      viewBox="0 0 300 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
    >
      {/* --- ICON: Stylized Kettlebell / Spartan Helmet --- */}
      <g transform="translate(10, 10) scale(0.8)">
        {/* Kettlebell Handle */}
        <path
          d="M25 15 C25 5, 55 5, 55 15 L55 25 L25 25 Z"
          stroke={color}
          strokeWidth="6"
          fill="none"
        />
        {/* Kettlebell Body */}
        <path
          d="M15 25 H65 V55 C65 65, 55 75, 40 75 C25 75, 15 65, 15 55 Z"
          fill={color}
        />
        {/* Inner Detail (Spartan Slit) */}
        <path
          d="M38 35 L42 35 L40 60 Z"
          fill="#0b0b0b" 
        />
      </g>

      {/* --- TEXT: IRON --- */}
      <text
        x="80"
        y="55"
        fontFamily="Verdana, sans-serif"
        fontSize="48"
        fontWeight="900"
        fill="#ffffff"
        letterSpacing="2"
      >
        IRON
      </text>

      {/* --- TEXT: CULT (Accent Color) --- */}
      <text
        x="225"
        y="55"
        fontFamily="Verdana, sans-serif"
        fontSize="48"
        fontWeight="900"
        fill={color}
        letterSpacing="2"
      >
        CULT
      </text>
      
      {/* Underline Effect */}
      <rect x="82" y="65" width="230" height="4" fill={color} />
    </svg>
  );
};

export default Logo;