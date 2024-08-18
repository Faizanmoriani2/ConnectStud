import React from "react";

const CustomIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 80"
      width="20"
      height="20"
      fill="#6c63ff" // Adjust the color as needed
      className="logo-icon"
    >
      <polygon points="0,0 50,0 25,25" />
      <polygon points="50,0 100,0 75,25" />
      <polygon points="0,50 50,50 25,75" />
      <polygon points="50,50 100,50 75,75" />
    </svg>
  );
};

export default CustomIcon;
