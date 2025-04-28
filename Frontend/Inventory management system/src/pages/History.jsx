import React, { useEffect, useState } from "react";
import { Tabs } from "../components";
import auth from "../connection/auth";
import '../CSS/scrollbar.css'
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [history, setHistory] = useState([]);

  const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      const response = await auth.getHistory();
      if (response.success === false) {
        throw response;
      }
      if(activeTab === "all") setHistory(response.history);
      if(activeTab === "incoming") setHistory(response.history.filter(item => item.type === "incoming"));
      if(activeTab === "outgoing") setHistory(response.history.filter(item => item.type === "outgoing"));

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    // Reset scroll position on component mount
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [activeTab]);


  return (
    <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-8 flex flex-col">
      <Tabs
        list={["all", "incoming", "outgoing"]}
        onClick={setActiveTab}
        activeTab={activeTab}
        className="justify-center"
      />

      {/* Content with scrollable div */}
      <div className="flex-1 bg-white text-gray-800 rounded-lg shadow-lg p-6 max-h-[470px] overflow-y-auto overflow-x-hidden custom-scrollbar">
        {history.length ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-500">
              {activeTab === "all" ? "All" : activeTab === "incoming" ? "Incoming" : "Outgoing"} History
            </h2>
            <ul>
              {history.map((data) => (
                <li
                  key={data._id}
                  className={`mb-4 p-4 rounded-lg ${data.type === 'outgoing' ? 'bg-red-100 hover:bg-red-200' : 'bg-green-100 hover:bg-green-200'} shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center`}
                >
                  <div className="mb-2 flex flex-col flex-wrap sm:mb-0">
                    <p><strong>ID:</strong> {data._id}</p>
                    <p><strong>Warehouse:</strong> {data.warehouse?.name}</p>
                    <p><strong>Product:</strong> {data.product?.name}</p>
                  </div>
                  <div className="mb-2 sm:mb-0">
                    <p><strong>Category:</strong> {data.product?.category?.name}</p>
                    <p><strong>Quantity:</strong> {data.quantity}</p>
                    <p><strong>Date:</strong> {new Date(data.createdAt).toLocaleDateString('en-GB')}</p>
                  </div>
                  <div className="sm:text-center">
                    <p><strong>Type:</strong> {data.type}</p>
                    <p><strong>Profit:</strong> ${data.total_profit.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center opacity-50">
            <img src="/history.png" alt="No history" className="w-16 h-16 mb-4 " />
          <p>No history available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
