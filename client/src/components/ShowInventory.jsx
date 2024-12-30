import axios from "axios";
import React, { useState, useEffect } from "react";

const ShowInventory = ({ supplierId }) => {
  const [inventory, setInventory] = useState(null);
  const [investment, setInvestment] = useState(0);
  const [role, setRole] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedItems, setEditedItems] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Simple JWT decoder function
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = parseJwt(token);
        setRole(decodedToken.role);
      } catch (error) {
        setError("Invalid authentication token");
      }
    }
  }, []);

  useEffect(() => {
    if (inventory?.stock?.length) {
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
        setError("Authentication required");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/supplier/showinventory/${supplierId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch inventory");
        }

        const data = await response.json();
        setInventory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [supplierId]);

  const handleInputChange = (productId, itemName, quantity, costPerUnit,pricePerUnit, field, value) => {
    setEditedItems((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        productId,
        itemName,
        quantity: field === 'quantity' ? value : quantity,
        costPerUnit: field === 'costPerUnit' ? value : costPerUnit,
        pricePerUnit: field === 'pricePerUnit' ? value : pricePerUnit,
        id : supplierId,
      },
    }));
  };

  const handleSave = async (productId) => {
    if (!editedItems[productId]) return;

    console.log(editedItems[productId]);

    setIsSaving(true);
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.patch(`http://localhost:8080/api/v1/supplier/updateinventory/${supplierId}`,
        editedItems[productId],
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in header
            },
          }
        );

      console.log(response.data.message)

      setInventory((prev) => ({
        ...prev,
        stock: prev.stock.map((item) =>
          item.product._id === productId
            ? { ...item, ...editedItems[productId] }
            : item
        ),
      }));

      setEditedItems((prev) => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading inventory...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-700 bg-red-100 border border-red-400 rounded">
        <p>{error}</p>
      </div>
    );
  }

  if (!inventory?.stock?.length) {
    return (
      <div className="p-4 text-blue-700 bg-blue-100 border border-blue-400 rounded">
        <p>No inventory found for this supplier.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="mb-4 text-2xl font-bold">Stock List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left border">S.No</th>
                  <th className="p-4 text-left border">Product Name</th>
                  <th className="p-4 text-left border">Quantity</th>
                  <th className="p-4 text-left border">Cost per Unit</th>
                  <th className="p-4 text-left border">Selling Price</th>
                  {(role === "WholeSaler" || role === "Retailer") && (
                    <th className="p-4 text-left border">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {inventory.stock.map((item, index) => (
                  <tr key={item.product._id} className="hover:bg-gray-50">
                    <td className="p-4 border">{index + 1}</td>
                    <td className="p-4 border">{item.product.itemName}</td>
                    <td className="p-4 border">
                      {role === "WholeSaler" ? (
                        <input
                          type="number"
                          value={
                            editedItems[item.product._id]?.quantity ?? item.quantity
                          }
                          onChange={(e) =>
                            handleInputChange(
                              item.product._id,
                              item.product.itemName,
                              item.quantity,
                              item.costPerUnit,
                              item.pricePerUnit,
                              "quantity",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-24 p-1 border rounded"
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>
                    <td className="p-4 border">
                      {role === "WholeSaler" ? (
                        <input
                          type="number"
                          value={
                            editedItems[item.product._id]?.costPerUnit ??
                            item.costPerUnit
                          }
                          onChange={(e) =>
                            handleInputChange(
                              item.product._id,
                              item.product.itemName,
                              item.quantity,
                              item.costPerUnit,
                              item.pricePerUnit,
                              "costPerUnit",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-24 p-1 border rounded"
                        />
                      ) : (
                        `₹${item.costPerUnit}`
                      )}
                    </td>
                    <td className="p-4 border">
                      {role === "WholeSaler" || role === "Retailer" ? (
                        <input
                          type="number"
                          value={
                            editedItems[item.product._id]?.pricePerUnit ??
                            item.pricePerUnit
                          }
                          onChange={(e) =>
                            handleInputChange(
                              item.product._id,
                              item.product.itemName,
                              item.quantity,
                              item.costPerUnit,
                              item.pricePerUnit,
                              "pricePerUnit",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-24 p-1 border rounded"
                        />
                      ) : (
                        `₹${item.pricePerUnit}`
                      )}
                    </td>
                    {(role === "WholeSaler" || role === "Retailer") && (
                      <td className="p-4 border">
                        {editedItems[item.product._id] && (
                          <button
                            onClick={() => handleSave(item.product._id)}
                            disabled={isSaving}
                            className="px-4 py-2 text-white rounded bg-midblue hover:bg-lightblue disabled:bg-blue-300"
                          >
                            {isSaving ? "Saving..." : "Save"}
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowInventory;