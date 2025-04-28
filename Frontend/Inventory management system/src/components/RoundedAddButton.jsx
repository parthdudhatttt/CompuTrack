import React from "react";
import Tooltip from "@mui/material/Tooltip";

const RoundedAddButton = ({onClick, title}) => {
  return (
    <div>
      <Tooltip title={title} arrow>
        <button
          onClick={onClick}
          className="bg-button hover:bg-button-hover text-white font-bold py-4 px-6 fixed bottom-10 right-14 flex justify-center items-center rounded-full"
        >
          +
        </button>
      </Tooltip>
    </div>
  );
};

export default RoundedAddButton;
