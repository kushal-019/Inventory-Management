import React, { useState, useEffect } from "react";
import axios from "axios";

function ShowInventory({ supplierId }) {
  console.log(supplierId);
  const [investment, setInvestment] = useState(0);
  const [inventory, setInventory] = useState(null); // Initialize as null instead of an empty array

  useEffect(() => {
    if (inventory && inventory.stock && inventory.stock.length !== 0) {
      // Calculate total investment whenever inventory changes
      const totalInvestment = inventory.stock.reduce(
        (acc, item) => acc + item.quantity * item.costPerUnit,
        0
      );
      setInvestment(totalInvestment);
    }
  }, [inventory]);

  useEffect(() => {
    const fetchInventory = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found!");
        return;
      }
      try {
        console.log(supplierId);

        const { data } = await axios.get(
          `http://localhost:8080/api/v1/supplier/showinventory/${supplierId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Token in header
            },
          }
        );
        setInventory(data);
        console.log("inventory:", data);
      } catch (error) {
        console.error(error.message);
        setInventory([]); // Handle the error scenario by setting inventory to an empty array
      }
    };
    fetchInventory();
  }, [supplierId]); // Adding supplierId to dependency array


  if (inventory === null || inventory.length === 0 || !inventory.stock) {
    return <div>No inventory found for this supplier.</div>; // Handle empty inventory response
  }

  return (
    <>
      <div className="flex gap-2 w-[100%]">
        <div className="w-1/2 h-32 border-gray-300 rounded-3xl border-3 bg-gradient-to-r from-sky-500 to-indigo-500">
          <p className="text-xl font-bold text-[#eee3e3ac] p-2 px-3">
            Stock's Available
          </p>
          <p className="px-4 text-5xl font-bold text-right text-white">
            {inventory.stock.length}
          </p>
        </div>
        <div className="w-1/2 h-32 border-gray-300 rounded-3xl border-3 bg-gradient-to-r from-violet-500 to-fuchsia-500">
          <p className="text-xl font-bold text-[#eee3e3ac] p-2 px-3">
            Current Investment
          </p>
          <p className="px-4 text-5xl font-bold text-right text-white">
            {investment}
          </p>
        </div>
      </div>
      <div className="p-4 rounded shadow-md bg-light">
        <h2 className="p-2 text-3xl font-bold text-center text-black">
          Stock List
        </h2>
        {inventory && inventory.stock && inventory.stock.length > 0 && (
          <div className="w-full overflow-y-scroll border rounded-lg shadow-md max-h-96 border-lightblue">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-lightblue text-dark">
                  <th className="p-3 border border-midblue">S.No:</th>
                  <th className="p-3 border border-midblue">Product Name</th>
                  <th className="p-3 border border-midblue">Quantity</th>
                  <th className="p-3 border border-midblue">Cost price per unit</th>
                  <th className="p-3 border border-midblue">Selling price per unit</th>
                </tr>
              </thead>
              <tbody>
                {inventory.stock.map((item, index) => (
                  <tr key={index} className="hover:bg-midblue bg-light">
                    <td className="p-2 border border-midblue text-dark">
                      {index + 1}
                    </td>
                    <td className="p-2 border border-midblue text-dark">
                      {item.product.itemName}
                    </td>
                    <td className="p-2 border border-midblue text-dark">
                      {item.quantity}
                    </td>
                    <td className="p-2 border border-midblue text-dark">
                      {item.costPerUnit}
                    </td>
                    <td className="p-2 border border-midblue text-dark">
                      {item.pricePerUnit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowInventory;
