import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../connection/auth";
import {
  Button,
  NotFound,
  WarehouseProductCard,
  SecondaryButton,
  WarningImg,
  RoundedBackButton,
  RoundedAddButton,
} from "../components";

const WarehouseOverview = () => {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState({});
  const [error, setError] = useState("");
  const [warehouseProducts, setWarehouseProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWarehouseProduct, setNewWarehouseProduct] = useState({
    warehouse: id,
    product: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editableWarehouse, setEditableWarehouse] = useState({});
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const navigate = useNavigate();

  const fetchWarehouseProduct = async () => {
    try {
      const response = await auth.getProductsByWarehouseId(id);
      if (response.success === false) {
        throw response;
      }
      setWarehouseProducts(response.warehouseProducts);
    } catch (error) {
      throw error;
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await auth.getAllProducts();
      if (response.success === false) {
        throw response;
      }
      setProducts(response.products);
    } catch (error) {
      throw error;
    }
  };

  const fetchWarehouse = async () => {
    try {
      const response = await auth.getWarehouseById(id);
      if (response.success === false) {
        throw response;
      }
      setWarehouse(response.warehouse);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchWarehouseProduct();
  }, [id]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchWarehouse();
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    // Reset scroll position on component mount
    window.scrollTo(0, 0);
  }, []);

  const handleEdit = () => {
    setEditableWarehouse(warehouse);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditableWarehouse({});
    setIsEditing(false);
  };

  const handleWarehouseProductClick = (id) => {
    navigate(`/warehouse-product/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newWarehouseProduct);

    try {
      if (newWarehouseProduct.product && newWarehouseProduct.quantity) {
        const response = await auth.addWarehouseProduct(newWarehouseProduct);
        if (response.success === false) {
          throw response;
        }
        fetchWarehouseProduct();
        setIsModalOpen(false);
      } else {
        setError("Please fill in all the fields.");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const handleUpdate = () => {
    // Perform the update logic here (e.g., API call to update the warehouse)
    try {
      if (editableWarehouse.name && editableWarehouse.address) {
        if (
          editableWarehouse.name === warehouse.name &&
          editableWarehouse.address === warehouse.address
        ) {
          setError("No changes made.");
        } else {
          const response = auth.updateWarehouse(editableWarehouse);
          if (response.success === false) {
            setError(response.message);
          }
          setWarehouse(response.warehouse);
          setIsEditing(false);
          setEditableWarehouse({});
          setError("");
        }
      } else {
        setError("Please Name and Address");
      }
    } catch (error) {
      setError(error.message);
    }
    setWarehouse(editableWarehouse);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsConfirmingDelete(true);
  };

  const confirmDelete = async () => {
    try {
      // Perform the delete logic here (e.g., API call to delete the warehouse)
      try {
        const response = await auth.deleteWarehouse(id);
        if (response.success === false) {
          throw response.message;
        } else {
          navigate("/");
        }
      } catch (error) {
        setError(error.message);
      }
      setIsConfirmingDelete(false);
    } catch (error) {
      console.error("Failed to delete warehouse", error);
    }
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableWarehouse({ ...editableWarehouse, [name]: value });
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleAddWarehouseProduct = () => {
    setIsModalOpen(true);
  };

  const handleCancelAddProduct = () => {
    setIsModalOpen(false);
    setNewWarehouseProduct({ warehouse: id });
    setError("");
  };

  return (
    <>
      <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4 md:px-0 ">
        <div className="flex flex-col items-center max-[928px]:mx-4">
          <div className="md:flex w-full max-w-4xl bg-white rounded-lg shadow-lg mt-8 mx-auto max-[468px]:mt-14">
            <div className="rounded-lg">
              <img
                className="h-64 md:h-96 w-full object-cover md:w-96"
                src="/warehouse.png"
                alt="Picture"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              {isEditing ? (
                <>
                  <div className="">
                    <label className="text-gray-600">Name : </label>
                    <input
                      type="text"
                      name="name"
                      value={editableWarehouse.name || ""}
                      onChange={handleChange}
                      className="border border-gray-300 rounded p-2 mb-4"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600">Address : </label>
                    <input
                      type="text"
                      name="address"
                      value={editableWarehouse.address || ""}
                      onChange={handleChange}
                      className="border border-gray-300 rounded p-2"
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-md mt-2">{error}</p>
                  )}
                  <div className="mt-4">
                    <SecondaryButton
                      text="Cancel"
                      onClick={handleCancel}
                      className=""
                    />
                    <Button
                      text="Update"
                      onClick={handleUpdate}
                      className="ml-4"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="uppercase tracking-wide text-lg text-indigo-500 font-extrabold">
                    {warehouse.name}
                  </div>
                  <p className="mt-2 text-gray-500">
                    Address : {warehouse.address}
                  </p>
                  <div className="mt-4 flex space-x-4 max-[298px]:flex-col max-[298px]:space-y-2">
                    <Button text="Edit" onClick={handleEdit} className="w-28" />
                    <Button
                      text="Delete"
                      onClick={handleDelete}
                      className="w-28"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {isConfirmingDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl max-[768px]:mx-4">
              <div className="flex">
                <WarningImg />
                <p className="text-gray-700 flex justify-center items-center">
                  Are you sure you want to delete this warehouse?
                </p>
              </div>
              <div className="flex">
                <WarningImg />
                <p className="text-gray-700 flex justify-center items-center">
                  All products and their quantities in the warehouse have been
                  also deleted.
                </p>
              </div>
              <div className="flex">
                <WarningImg />
                <p className="text-gray-700 flex justify-center items-center">
                  The history of the particular warehouse has also been deleted.
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

        {warehouseProducts.length !== 0 ? (
          <div className="flex flex-wrap justify-center items-center mt-8">
            {warehouseProducts.map((warehouseProduct, index) => (
              <WarehouseProductCard
                key={index}
                product={warehouseProduct.product}
                quantity={warehouseProduct.quantity}
                available={warehouseProduct.available}
                warehouse={warehouse}
                onClick={() =>
                  handleWarehouseProductClick(warehouseProduct._id)
                }
              />
            ))}
          </div>
        ) : (
          <NotFound text="No Warehouse Products Found"/>
        )}
        <RoundedBackButton onClick={handleBackClick} />
        <RoundedAddButton
          onClick={handleAddWarehouseProduct}
          title="Add new Warehouse Product"
        />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl max-[768px]:mx-4">
            <h2 className="text-xl font-bold mb-4">Add Warehouse Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="product"
                >
                  Product
                </label>
                <select
                  id="product"
                  name="product"
                  value={
                    newWarehouseProduct.product
                  } 
                  onChange={(e) =>
                    setNewWarehouseProduct({
                      ...newWarehouseProduct,
                      product: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select Product
                  </option>
                  {products.map((product, index) => (
                    <option key={index} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="quantity"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  value={newWarehouseProduct.quantity}
                  onChange={(e) =>
                    setNewWarehouseProduct({
                      ...newWarehouseProduct,
                      quantity: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {error && (
                  <div className="flex justify-center items-center mt-2">
                    <p className="text-red-500 text-md ">{error}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <SecondaryButton
                  text="Cancel"
                  onClick={handleCancelAddProduct}
                />
                <Button text="Add Product" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default WarehouseOverview;
