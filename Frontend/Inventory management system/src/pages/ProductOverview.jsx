import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../connection/auth";
import { RoundedBackButton } from "../components";

const ProductOverview = () => {
  const { productNo } = useParams();
  const [product, setProduct] = useState({});
  const [warehouseProducts, setWarehouseProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await auth.getProductByProductNo(productNo);
      if (!response.success) {
        throw response;
      }
      setProduct(response.product);
      console.log(response.product);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductDetails = async () => {
    try {
      const response = await auth.getWarehouseProductByProductNo(productNo);
      if (!response.success) {
        throw response;
      }
      setWarehouseProducts(response.warehouseProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productNo]);

  useEffect(() => {
    fetchProduct();
  }, [productNo]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    // Reset scroll position on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4 py-6">
        {product ? (
          <div className="flex flex-col items-center">
            {/* Product Overview Card */}
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden md:flex">
              <div className="w-full md:w-2/3">
                <img
                  className="h-64 w-full object-cover md:h-full"
                  src={product.image ? product.image : "https://cdn.shopify.com/s/files/1/0070/7032/files/how_20to_20start_20a_20clothing_20brand.png?v=1693935729"}
                  alt="Product"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="uppercase tracking-wide text-lg text-indigo-500 font-extrabold mb-4">
                  {product.name}
                </div>
                {/* Grid for Product Details */}
                <div className="grid grid-cols-2 gap-y-4">
                  <p className="font-bold text-gray-700">Category:</p>
                  <p className="text-gray-500">{product.category?.name}</p>

                  <p className="font-bold text-gray-700">Product No:</p>
                  <p className="text-gray-500">{product.productNo}</p>

                  <p className="font-bold text-gray-700">Actual Price:</p>
                  <p className="text-gray-500">
                    <span className="text-gray-400">$</span> {product.actual_price}
                  </p>

                  <p className="font-bold text-gray-700">Selling Price:</p>
                  <p className="text-gray-500">
                    <span className="text-gray-400">$</span> {product.selling_price}
                  </p>

                  <p className="font-bold text-gray-700">Profit:</p>
                  <p className="text-gray-500">
                    <span className="text-gray-400">$</span> {parseFloat(product.profit).toFixed(2)}
                  </p>

                  <p className="font-bold text-gray-700">Total Quantity:</p>
                  <p className="text-gray-500">{product.total_quantity}</p>
                </div>
                {/* Description Section */}
                <div className="mt-6">
                  <p className="font-bold text-gray-700">Description:</p>
                  <p className="text-gray-500">{product.description}</p>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-6">
              <RoundedBackButton onClick={() => navigate(-1)} />
            </div>
          </div>
        ) : (
          <div className="text-xl text-gray-500 flex justify-center items-center w-full h-96">
            <h1>Loading.....</h1>
          </div>
        )}

        {/* Warehouse Products */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {warehouseProducts.length !== 0 &&
            warehouseProducts.map((warehouseProduct, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-xl shadow-md p-6 flex flex-col items-start"
              >
                <div className="uppercase tracking-wide text-lg text-indigo-500 font-extrabold mb-4">
                  {warehouseProduct.warehouse?.name}
                </div>
                <p className="text-gray-500">Quantity: {warehouseProduct.quantity}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductOverview;
