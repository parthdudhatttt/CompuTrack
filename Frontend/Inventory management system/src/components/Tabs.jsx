import React from "react";

const Tabs = ({ list, onClick, activeTab, className}) => {
  return (
    <div className={`flex flex-wrap space-x-4 my-4 ${className}`}>
      {list.map((tab) => (
        <button
        key={tab}
          onClick={() => onClick(tab)}
          className={`max-[388px]:mt-4  px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === tab
              ? "bg-white text-purple-500"
              : "bg-purple-700 hover:bg-purple-600 text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
