import React from 'react';

const NotFound = ({text, className}) => {
  return (
    <div className={`flex flex-col justify-center items-center w-full py-2 overflow-hidden`}>
      <img
        src="/notFound.png"
        alt="No Warehouse Products Found"
        className="w-full max-w-md h-auto object-contain mb-4"
      />
      <p className={`text-xl text-gray-300 ${className}`}>{text}</p>
    </div>
  );
};

export default NotFound;
