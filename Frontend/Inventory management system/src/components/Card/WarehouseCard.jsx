import * as React from "react";
export default function WarehouseCard({ image, name, address, onClick }) {
  return (
    <div
      className="bg-card-header max-w-sm max-h-sm md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-lg shadow-2xl hover:shadow-custom-card-hover transition hover:scale-105 duration-1000 overflow-hidden m-8 max-[425px]:ml-2 max-[425px]:mr-2"
      onClick={onClick}
    >
      <img src={image} alt={name} className="w-full h-70 object-cover " />
      <div className="p-4">
        <h2 className="text-lg font-semibold px-4">{name}</h2>
        <p className="text-gray-500 text-sm px-4">
          <h3 className="inline font-bold">Address: </h3>
          {address}
        </p>
      </div>
    </div>
  );
}
