import axios from 'axios';
import React, { useEffect, useState } from 'react'

const RetailerList = ({ onSelectRetailer }) => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSupplier = async () => {
          const token = localStorage.getItem("authToken");
          if (!token) {
            console.error("No token found!");
            return;
          }
      
          console.log(token);
      
          try {
            const response = await axios.get(
              "http://localhost:8080/api/v1/supplier", 
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Pass token in header
                  Role: "Retailer",  // Pass role in headers
                },
              }
            );
      
            console.log(response);
            setSuppliers(response.data.suppliers || []);
          } catch (err) {
            console.error("Error fetching Suppliers:", err);
            setError("Failed to load Suppliers list. Please try again.");
          } finally {
            setLoading(false);
          }
        };
      
        fetchSupplier();
      }, []);
      

    if (loading) {
        return <p className="font-semibold ">Loading Suppliers List...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }


    return (
        <div>
            <h1 className="mb-4 text-4xl font-bold text-center text-midblue">Suppliers List</h1>
            {suppliers.length === 0 ? (
                <p className="text-4xl font-bold text-dark">No Suppliers found.</p>
            ) : (
                <div className="space-y-4 overflow-y-scroll max-h-[75vh]">
                    {suppliers.map((supplier) => (
                        <div
                            key={supplier._id}
                            className="p-4 border-2 border-black rounded-lg shadow-2xl cursor-pointer hover:border-midblue shadow-midblue hover:bg-dark hover:text-white "
                            onClick={() => onSelectRetailer(supplier)}
                        >
                            <h3 className="text-2xl font-bold text-lightblue">{supplier.ferm}</h3>
                            <div className="flex justify-between text-xl font-semibold">
                                <p className="text-xl font-semibold">GST No: {supplier.gst}</p>
                                <p>Owner : {supplier.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RetailerList

