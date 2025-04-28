import React from "react";

const RoundedBackButton = ({...props}) => {
  return (
    <button
      className="bg-pink-500 hover:bg-button-hover text-white px-4 py-4 rounded-full left-14 max-[468px]:top-20 max-[1126px]:left-5 max-[468px]:px-2 max-[468px]:py-2 top-28 fixed flex justify-center items-center"
      {...props}
    >
      <span className="sr-only">Back</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e8eaed"
      >
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </svg>
    </button>
  );
};

export default RoundedBackButton;
