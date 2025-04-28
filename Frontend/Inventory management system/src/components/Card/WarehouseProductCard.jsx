import React from "react";

const WarehouseProductCard = ({
  quantity,
  available,
  product,
  warehouse,
  onClick,
}) => {
  return (
    <div
      className="bg-card-header w-80 sm:w-96 h-auto rounded-lg shadow-lg hover:shadow-custom-card overflow-hidden m-4 transition-shadow duration-300 flex flex-col"
      onClick={onClick}
    >
      <div className="w-full h-52 bg-gray-200">
        <img
          src={product.image ? product.image : "/warehouse.png"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-4">
          <p className="text-gray-600">Quantity: {quantity}</p>
          <p
            className={available ? "text-green-600 flex" : "text-red-600 flex"}
          >
            Available:
            {available ? (
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
          <p className="text-gray-600">
            Selling Price: {product.selling_price}
          </p>
          <p className="text-gray-600">Actual Price: {product.actual_price}</p>
          <p className="text-gray-600">Product No.: {product.productNo}</p>
          <p className="text-gray-600">
            Profit: {parseFloat(product.profit).toFixed(2)}
          </p>
        </div>
        <p className="text-gray-600 mt-4">Category: {product.category.name}</p>
      </div>
    </div>
  );
};

export default WarehouseProductCard;
