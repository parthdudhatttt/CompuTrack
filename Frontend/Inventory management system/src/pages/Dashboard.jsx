import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../connection/auth";
import { NotFound, RoundedAddButton, WarehouseCard, Button, SecondaryButton } from "../components";

const Dashboard = () => {
  const [warehousers, setWarehousers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchWarehouses = async () => {
    try {
      const response = await auth.getWarehouses();
      if (response.success === false) {
        throw response;
      }
      setWarehousers(response.warehouses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    // Reset scroll position on component mount
    window.scrollTo(0, 0);
  }, []);

  const handleCancel = () => {
    setIsModalOpen(!isModalOpen);
    setNewWarehouse({});
    setError("");
  };

  const handleAddWarehouse = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(newWarehouse.name && newWarehouse.address) {
      const response = await auth.addWarehouse(newWarehouse);
      if (response.success === false) {
        throw response;
      }
      fetchWarehouses();
      setIsModalOpen(false);
      setNewWarehouse({});
      setError("");
    }
    else{
      setError("Please fill in all the fields.");
    }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4 md:px-0">
        {warehousers.length !== 0 ? (
          <div className="flex flex-wrap justify-center items-center">
            {warehousers.map((warehouse, index) => (
              <WarehouseCard
                key={index}
                image="warehouse.png"
                name={warehouse.name}
                address={warehouse.address}
                onClick={() => navigate(`/warehouse/${warehouse._id}`)}
              />
            ))}
          </div>
        ) : (
          <NotFound text="No Warehouse Found" />
        )}
      </div>
      <RoundedAddButton onClick={handleAddWarehouse} title="Add new Warehouse"/>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl max-[768px]:mx-4">
            <h2 className="text-xl font-bold mb-4">Add Warehouse</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={newWarehouse.name}
                  onChange={(e) =>
                    setNewWarehouse({ ...newWarehouse, name: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  value={newWarehouse.address}
                  onChange={(e) =>
                    setNewWarehouse({
                      ...newWarehouse,
                      address: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {error && <div className="flex justify-center items-center mt-2"><p className="text-red-500 text-md ">{error}</p></div>}
              </div>
              <div className="flex items-center justify-between">
                <SecondaryButton text="Cancel" onClick={handleCancel} />
                <Button text="Add Warehouse" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
