import React from "react";

const SecondaryButton = ({className, text, ...props}) => {
  return (
    <button
      type="button"
      className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
