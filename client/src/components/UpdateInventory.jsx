import React, { useState } from "react";
import axios from "axios";

function UpdateInventory() {
  const [formData, setFormData] = useState({
    id: "",
    productId: "",
    itemName: "",
    quantity: 0,
    pricePerUnit: 0,
    costPerUnit: 0,
  });

  const handleInputChange = (e) => {
    const value =
      e.target.name === "quantity" || e.target.name === "pricePerUnit" || e.target.name === "costPerUnit"
        ? parseFloat(e.target.value) || 0
        : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const updateInventory = async () => {
    try {
      const { data } = await axios.patch(`/api/v1/supplier/updateinventory/${formData.id}`, formData);
      alert(data.message || "Inventory updated successfully!");
      console.log("Updated Inventory:", data.inventory);
    } catch (error) {
      console.error(error.message);
      alert("Error updating inventory. Please try again.");
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto bg-white shadow-2xl rounded-2xl shadow-midblue ">
    <h2 className="mb-4 text-3xl font-bold text-center text-midblue">
      Update Inventory
    </h2>
    <div className="overflow-y-scroll max-h-[60vh]">
    <div className="space-y-4">
      {["id", "productId", "itemName"].map((field) => (
        <div key={field} className="flex flex-col">
          <label
            htmlFor={field}
            className="mb-1 text-sm font-medium text-gray-600 capitalize"
          >
            {field}
          </label>
          <input
            id={field}
            type="text"
            name={field}
            placeholder={`Enter ${field}`}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-400"
            onChange={handleInputChange}
          />
        </div>
      ))}
      {["quantity", "pricePerUnit", "costPerUnit"].map((field) => (
        <div key={field} className="flex flex-col">
          <label
            htmlFor={field}
            className="mb-1 text-sm font-medium text-gray-600 capitalize"
          >
            {field}
          </label>
          <input
            id={field}
            type="number"
            name={field}
            placeholder={`Enter ${field}`}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-400"
            onChange={handleInputChange}
          />
        </div>
      ))}
    </div></div>
    <button
      className="w-full py-3 mt-6 font-medium text-white transition duration-200 rounded-md bg-midblue hover:bg-lightblue focus:outline-none focus:ring focus:ring-[#abc8d5]"
      onClick={updateInventory}
    >
      Add Item
    </button>
  </div>
  
  );
}

export default UpdateInventory;
