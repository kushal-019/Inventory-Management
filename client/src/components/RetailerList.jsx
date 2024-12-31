
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Building2, User } from 'lucide-react';

const RetailerList = ({ onSelectRetailer }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        setError("Authentication required");
        setLoading(false);
        return;
      }

      try {
        const role = jwtDecode(token).role;
        
        const response = await axios.get(
          "https://inventory-management-mag3.onrender.com/api/v1/supplier", 
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Role: role,
            },
          }
        );

        setSuppliers(response.data.suppliers || []);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
        setError("Failed to load suppliers list. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-lg text-gray-600">Loading suppliers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 rounded-lg bg-red-50">
        <p className="text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center text-midblue">
        Available Suppliers
      </h1>

      {suppliers.length === 0 ? (
        <div className="p-8 text-center rounded-lg bg-gray-50">
          <p className="text-xl text-gray-600">No suppliers found.</p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
          {suppliers.map((supplier) => (
            <div
              key={supplier._id}
              onClick={() => onSelectRetailer(supplier)}
              className="p-6 transition-all duration-300 bg-white border rounded-lg shadow-sm cursor-pointer hover:shadow-md hover:border-blue-500 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-midblue" />
                  <h3 className="text-xl font-semibold group-hover:text-midblue">
                    {supplier.ferm}
                  </h3>
                </div>
                <span className="px-3 py-1 text-sm rounded-full text-midblue bg-blue-50">
                  Verified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-sm font-medium">GST No:</span>
                  <span className="text-sm">{supplier.gst}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Owner:</span>
                  <span className="text-sm">{supplier.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RetailerList;