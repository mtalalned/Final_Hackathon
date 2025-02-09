// Button.js
import React from 'react';

// A simple Tailwind styled Button component
const Button = ({ label, onClick }) => {
  return (
    <button
      className="
        px-6 py-3
        bg-blue-500 
        text-white 
        rounded-md 
        text-lg
        font-semibold
        transition-colors 
        duration-300
        hover:bg-blue-600
        focus:outline-none
      "
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
