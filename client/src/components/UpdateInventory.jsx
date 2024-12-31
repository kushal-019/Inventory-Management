import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateInventory(id) {
  const [formData, setFormData] = useState({
    id: null,
    productId: null,
    itemName: "",
    quantity: 0,
    pricePerUnit: 0,
    costPerUnit: 0,
    // imageUrl: "", 
  });

  // const [image, setImage] = useState(null); // Store the selected image

  const handleInputChange = (e) => {
    const value =
      e.target.name === "quantity" || e.target.name === "pricePerUnit" || e.target.name === "costPerUnit"
        ? parseFloat(e.target.value) || 0
        : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]); // Store the selected image file
  // };

  // const handleImageUrlChange = (e) => {
  //   setFormData({ ...formData, imageUrl: e.target.value }); // Store the user-inputted image URL
  // };

  // const uploadImageToCloudinary = async (image) => {
  //   const formData = new FormData();
  //   formData.append("file", image);
  //   formData.append("upload_preset", "InventoMart"); // Replace with your Cloudinary preset
  //   formData.append("cloud_name", "drpi70mfj");

  //   try {
  //     const response = await axios.post(
  //       "https://api.cloudinary.com/v1_1/drpi70mfj/image/upload", // Replace with your Cloudinary cloud name
  //       formData
  //     );
  //     return response.data.secure_url; // Return the image URL from Cloudinary
  //   } catch (error) {
  //     console.error("Error uploading image to Cloudinary:", error);
  //     toast.error("Error uploading image. Please try again.");
  //     return null;
  //   }
  // };

  const updateInventory = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found!");
      return;
    }
    try {
      // let cloudImageUrl ;

      // // If an image is selected, upload it to Cloudinary and get the URL
      // if (image) {
      //   cloudImageUrl = await uploadImageToCloudinary(image);
      //   if (!cloudImageUrl) return; // If image upload fails, stop further processing
      // }

      // // Set the imageUrl in formData
      // setFormData((prevData) => ({ ...prevData, imageUrl:cloudImageUrl }));

      // Send the form data to the backend
      const { data } = await axios.patch(
        `https://inventory-management-mag3.onrender.com/api/v1/supplier/updateinventory/${id.supplierId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in header
          },
        }
      );

      toast.success(data.message || "Inventory updated successfully!");
      console.log("Updated Inventory:", data.inventory);

    } catch (error) {
      console.error(error.message);
      toast.error("Error updating inventory. Please try again.");
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto bg-white shadow-2xl rounded-2xl shadow-midblue ">
      <h2 className="mb-4 text-3xl font-bold text-center text-midblue">
        Update Inventory
      </h2>
      <div className="overflow-y-scroll max-h-[60vh]">
        <div className="space-y-4">
          {["itemName"].map((field) => (
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
          {/* Image File Input */}
          {/* <div className="flex flex-col">
            <label
              htmlFor="image"
              className="mb-1 text-sm font-medium text-gray-600 capitalize"
            >
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-400"
              onChange={handleImageChange}
            />
          </div>
          <span>OR</span> */}
          {/* Image URL Input */}
          {/* <div className="flex flex-col">
            <label
              htmlFor="imageUrlInput"
              className="mb-1 text-sm font-medium text-gray-600 capitalize"
            >
              Enter Image URL
            </label>
            <input
              id="imageUrlInput"
              type="url"
              name="imageUrlInput"
              placeholder="Enter image URL"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-400"
              value={formData.imageUrlInput}
              onChange={handleImageUrlChange}
            />
          </div> */}
        </div>
      </div>
      <button
        className="w-full py-3 mt-6 font-medium text-white transition duration-200 rounded-md bg-midblue hover:bg-lightblue focus:outline-none focus:ring focus:ring-[#abc8d5]"
        onClick={updateInventory}
      >
        Update Inventory
      </button>
    </div>
  );
}

export default UpdateInventory;
