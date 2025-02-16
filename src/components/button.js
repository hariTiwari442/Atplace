import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ label, to, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Execute custom click handler if provided
    }
    if (to) {
      navigate(to); // Navigate to specified route if 'to' prop exists
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white text-black px-6 py-2 rounded-lg shadow-md hover:bg-gray-800 hover:text-white transition-all duration-300"
    >
      {label}
    </button>
  );
};

export default Button;
