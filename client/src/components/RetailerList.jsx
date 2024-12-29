// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react'

// const RetailerList = ({ onSelectRetailer }) => {
//     const [suppliers, setSuppliers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchSupplier = async () => {
//           const token = localStorage.getItem("authToken");
//           if (!token) {
//             console.error("No token found!");
//             return;
//           }
//             const role = jwtDecode(token).role;
      
//           try {
//             const response = await axios.get(
//               "http://localhost:8080/api/v1/supplier", 
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`, // Pass token in header
//                   Role: role,  // Pass role in headers
//                 },
//               }
//             );
      
//             console.log(response);
//             setSuppliers(response.data.suppliers || []);
//           } catch (err) {
//             console.error("Error fetching Suppliers:", err);
//             setError("Failed to load Suppliers list. Please try again.");
//           } finally {
//             setLoading(false);
//           }
//         };
      
//         fetchSupplier();
//       }, []);
      

//     if (loading) {
//         return <p className="font-semibold ">Loading Suppliers List...</p>;
//     }

//     if (error) {
//         return <p className="text-red-500">{error}</p>;
//     }


//     return (
//         <div>
//             <h1 className="mb-4 text-4xl font-bold text-center text-midblue">Suppliers List</h1>
//             {suppliers.length === 0 ? (
//                 <p className="text-4xl font-bold text-dark">No Suppliers found.</p>
//             ) : (
//                 <div className="space-y-4 overflow-y-scroll max-h-[75vh]">
//                     {suppliers.map((supplier) => (
//                         <div
//                             key={supplier._id}
//                             className="p-4 border-2 border-black rounded-lg shadow-2xl cursor-pointer hover:border-midblue shadow-midblue hover:bg-dark hover:text-white "
//                             onClick={() => onSelectRetailer(supplier)}
//                         >
//                             <h3 className="text-2xl font-bold text-lightblue">{supplier.ferm}</h3>
//                             <div className="flex justify-between text-xl font-semibold">
//                                 <p className="text-xl font-semibold">GST No: {supplier.gst}</p>
//                                 <p>Owner : {supplier.name}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default RetailerList

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
          "http://localhost:8080/api/v1/supplier", 
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
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        <p className="text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center text-blue-600">
        Available Suppliers
      </h1>

      {suppliers.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-lg">
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
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold group-hover:text-blue-600">
                    {supplier.ferm}
                  </h3>
                </div>
                <span className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full">
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