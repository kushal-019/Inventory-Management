import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

function ShowInventory({ supplierId }) {
  const [investment, setInvestment] = useState(0);
  const [inventory, setInventory] = useState(null); // Initialize as null instead of an empty array
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role); // Assuming role is in the token
    }
  }, []);

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
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/supplier/showinventory/${supplierId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Token in header
            },
          }
        );
        setInventory(data);
      } catch (error) {
        console.error(error.message);
        setInventory([]); // Handle the error scenario by setting inventory to an empty array
      }
    };
    fetchInventory();
  }, [supplierId]);

  const handleEdit = (itemId, field, value) => {
    // Handle the edit logic here, e.g., make a PUT request to update the product details
    console.log(`Edit ${field} for item ${itemId} with value: ${value}`);
  };

  if (inventory === null || inventory.length === 0 || !inventory.stock) {
    return <div>No inventory found for this supplier.</div>;
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
                  {role === "wholesaler" && <th className="p-3 border border-midblue">Edit</th>}
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
                      {role === "WholeSaler" ? (
                        <>
                          <input
                            type="number"
                            value={item.costPerUnit}

                            onChange={(e) =>
                              handleEdit(item.product.itemId, "costPerUnit", e.target.value)
                            }
                          />
                        </>
                      ) : (
                        item.costPerUnit
                      )}
                    </td>
                    <td className="p-2 border border-midblue text-dark">
                      {role === "WholeSaler" || role === "Retailer" ? (
                        <>
                          <input
                            type="number"
                            value={item.pricePerUnit}
                            onChange={(e) =>
                              handleEdit(item.product.itemId, "pricePerUnit", e.target.value)
                            }
                          />
                        </>
                      ) : (
                        item.pricePerUnit
                      )}
                    </td>
                    {role === "WholeSaler" && (
                      <td className="p-2 border border-midblue text-dark">
                        <button onClick={() => handleEdit(item.product.itemId, "itemName", "New Name")}>
                          Edit Name
                        </button>
                        <button onClick={() => handleEdit(item.product.itemId, "pricePerUnit", 100)}>
                          Edit Price
                        </button>
                      </td>
                    )}
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
