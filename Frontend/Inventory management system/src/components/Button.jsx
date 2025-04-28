import React from "react";

const Button = ({ text, className, ...props}) => {
  return (
    <button
      className={`bg-button hover:bg-button-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
