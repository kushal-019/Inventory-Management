import React, { useState, useEffect } from "react";
import axios from "axios";

function ShowInventory({ supplierId }) {
  const [investment, setInvestment] = useState(0);
  const [inventory, setInventory] = useState({
    _id: "64b3f0d2f9e645a9df1f201",
    userId: "64b1d8f1f5e645a9df1f002",
    stock: [
      {
        product: {
          _id: "64b2e4a7f9e645a9df1f101",
          itemName: "Product A",
          description: "High-quality product A",
          category: "Electronics",
        },
        quantity: 50,
        pricePerUnit: 20,
        costPerUnit: 15,
      },
      {
        product: {
          _id: "64b2e4a7f9e645a9df1f102",
          itemName: "Product B",
          description: "High-quality product B",
          category: "Clothing",
        },
        quantity: 100,
        pricePerUnit: 30,
        costPerUnit: 25,
      },
    ],
  });

  useEffect(() => {
    // Calculate total investment whenever inventory changes
    const totalInvestment = inventory.stock.reduce(
      (acc, item) => acc + item.quantity * item.costPerUnit,
      0
    );
    setInvestment(totalInvestment);
  }, [inventory]);

  // Uncomment if fetching data is needed
  // useEffect(() => {
  //   const fetchInventory = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/inventory/${supplierId}`);
  //       setInventory(data);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };
  //   fetchInventory();
  // }, [supplierId]);

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
        {inventory && (
          <div className="w-full overflow-y-scroll border rounded-lg shadow-md max-h-96 border-lightblue">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-lightblue text-dark">
                  <th className="p-3 border border-midblue">S.No:</th>
                  <th className="p-3 border border-midblue">Product Name</th>
                  <th className="p-3 border border-midblue">Quantity</th>
                  <th className="p-3 border border-midblue">
                    Cost price per unit
                  </th>
                  <th className="p-3 border border-midblue">
                    Selling price per unit
                  </th>
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
