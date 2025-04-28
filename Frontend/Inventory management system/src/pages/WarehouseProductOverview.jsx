import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  RoundedBackButton,
  WarningImg,
  SecondaryButton,
} from "../components";
import auth from "../connection/auth";

const WarehouseProductOverview = () => {
  const [warehouseProduct, setWarehouseProduct] = useState({});
  const [updatedWarehouseProduct, setUpdatedWarehouseProduct] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const fetchWarehouseProduct = async () => {
    try {
      const response = await auth.getWarehouseProductById(id);
      if (response.success === false) {
        throw response;
      }
      setWarehouseProduct(response.warehouseProduct);
      setUpdatedWarehouseProduct(response.warehouseProduct);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchWarehouseProduct();
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    // Reset scroll position on component mount
    window.scrollTo(0, 0);
  }, []);

  const handleCancelClick = () => {
    setIsEditable(false);
    setUpdatedWarehouseProduct(warehouseProduct);
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const handelUpdateClick = async () => {
    try {
      const response = await auth.updateWarehouseProduct(
        updatedWarehouseProduct
      );
      if (response.success === false) {
        setError(response.message);
      }
      setWarehouseProduct(response.warehouseProduct);
      setIsEditable(false);
    } catch (error) {
      throw error;
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  const confirmDelete = async () => {
    try {
      const response = await auth.deleteWarehouseProduct(id);
      if (response.success === false) {
        throw response;
      }
      navigate(-1);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center p-4 max-[468px]:pt-14">

          <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden md:flex mx-4">

            <div className="w-full md:w-2/3">
              <img
                className="h-64 w-full object-cover md:h-full"
                src={
                  warehouseProduct.product?.image
                    ? warehouseProduct.product?.image
                    : "https://cdn.shopify.com/s/files/1/0070/7032/files/how_20to_20start_20a_20clothing_20brand.png?v=1693935729"
                }
                alt="Picture"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <div className="uppercase tracking-wide text-lg text-indigo-500 font-extrabold mb-4">
                {warehouseProduct.product?.name}
              </div>
              <div className="grid grid-cols-2 gap-y-4">
                <p
                  className={`font-bold ${
                    warehouseProduct.available
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Available :{" "}
                </p>
                <p className="font-bold">
                  {warehouseProduct.available ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#41B06E"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#FF0000"
                    >
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                  )}
                </p>
                <p className="font-bold text-gray-700">Product No : </p>
                <p className="text-gray-500">
                  {warehouseProduct.product?.productNo}
                </p>
                <p className="font-bold text-gray-700">Category : </p>
                <p className="text-gray-500">
                  {warehouseProduct.product?.category?.name}
                </p>
                <p className="font-bold text-gray-700">Actual price : </p>
                <p className="text-gray-500">
                  <span className="text-gray-400 text-lg">$ </span>
                  {warehouseProduct.product?.actual_price}
                </p>
                <p className="font-bold text-gray-700">Selling price : </p>
                <p className="text-gray-500">
                  <span className="text-gray-400 text-lg">$ </span>
                  {warehouseProduct.product?.selling_price}
                </p>
                <p className="font-bold text-gray-700">Profit : </p>
                <p className="text-gray-500">
                  <span className="text-gray-400 text-lg">$ </span>
                  {parseFloat(warehouseProduct.product?.profit).toFixed(2)}
                </p>
                <p className="font-bold text-gray-700">Description : </p>
                <p className="text-gray-500">
                  {warehouseProduct.product?.description}
                </p>
              </div>
              {isEditable ? (
                <div className="mt-2">
                  <label
                    className="block font-bold text-gray-700 mt-2"
                    htmlFor="quantity"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={updatedWarehouseProduct.quantity}
                    min={0}
                    onChange={(e) =>
                      setUpdatedWarehouseProduct({
                        ...updatedWarehouseProduct,
                        quantity: Math.max(0, parseInt(e.target.value, 10)), // Ensure non-negative value
                      })
                    }
                    placeholder="Quantity"
                    className="border border-gray-300 p-2 rounded-md w-full mt-1"
                    required
                  />
                  {error && (
                    <div className="flex justify-center items-center mt-2">
                      <p className="text-red-500 text-md">{error}</p>
                    </div>
                  )}
                  <div className="mt-6 flex space-x-2">
                    <SecondaryButton
                      text="Cancel"
                      onClick={handleCancelClick}
                      className="w-28"
                    />
                    <Button
                      text="Update"
                      onClick={handelUpdateClick}
                      className="w-28"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex mt-4">
                  <p className="font-bold text-gray-700">Quantity : </p>
                  <p className="text-gray-500 pl-1">{warehouseProduct.quantity}</p>
                  </div>
                  <div className="mt-6 flex space-x-2">
                    <Button
                      text="Edit"
                      onClick={handleEditClick}
                      className="w-28"
                    />
                    <Button
                      text="Delete"
                      onClick={handleDeleteClick}
                      className="w-28"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        <RoundedBackButton onClick={handleBackClick} />
      </div>
      {isConfirmingDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl max-[768px]:mx-4">
            <div className="flex ">
              <WarningImg />
              <p className="text-gray-700 flex justify-center items-center">
                Are you sure you want to delete this warehouse product?
              </p>
            </div>
            <div className="flex">
              <WarningImg />
              <p className="text-gray-700 flex justify-center items-center">
                This change is not stored in history.
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <SecondaryButton
                text="Cancel"
                onClick={cancelDelete}
                className="mr-4 w-28"
              />
              <Button
                text="Confirm"
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white w-28"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WarehouseProductOverview;
