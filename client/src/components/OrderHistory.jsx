// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const OrderHistory = ({ onSelectOrder }) => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const token = localStorage.getItem("authToken");

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                   const response =await  axios.get("http://localhost:8080/api/v1/orders/orderhistory",
//                   {
//                     headers: {
//                       Authorization: `Bearer ${token}`, // Add the token in the Authorization header
//                     },
//                   }
//                 );
//                 setOrders(response.data.placedOrders || []);
//             } catch (err) {
//                 console.error("Error fetching order history:", err);
//                 setError("Failed to load order history. Please try again.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchOrders();
//     }, []);

//     if (loading) {
//         return <p className="font-semibold ">Loading order history...</p>;
//     }

//     if (error) {
//         return <p className="text-red-500">{error}</p>;
//     }

//     return (
//         <div className="p-6">
//             <h1 className="mb-4 text-4xl font-bold text-center text-midblue">Order History</h1>
//             {orders.length === 0 ? (
//                 <p className="text-4xl font-bold text-dark">No orders found.</p>
//             ) : (
//                 <div className="space-y-4 overflow-y-scroll max-h-[75vh]">
//                     {orders.map((order) => (
//                         <div
//                             key={order._id}
//                             className="p-4 border-2 border-black rounded-lg shadow-2xl cursor-pointer hover:border-midblue shadow-midblue hover:bg-dark hover:text-white "
//                             onClick={() => onSelectOrder(order)}
//                         >
//                             <h3 className="text-2xl font-bold text-lightblue">Order ID: {order._id}</h3>
//                             <div className="flex justify-between text-xl font-semibold">
//                                 <p className="text-xl font-semibold">Supplier: {order.supplierId.name}</p>
//                                 <p>Amount : {order.totalAmount}
//                                 </p>
//                                 <p>Status : {order.status}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default OrderHistory;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, AlertCircle, Clock } from "lucide-react";

const OrderHistory = ({ onSelectOrder }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/v1/orders/orderhistory",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setOrders(response.data.placedOrders || []);
            } catch (err) {
                console.error("Error fetching order history:", err);
                setError("Failed to load order history. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusBadge = (status) => {
        const statusConfig = {
            Pending: "bg-yellow-100 text-yellow-800",
            Confirmed: "bg-green-100 text-green-800",
            Rejected: "bg-red-100 text-red-800",
            Completed: "bg-blue-100 text-blue-800"
        };
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[status] || "bg-gray-100 text-gray-800"}`}>
                {status}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg">
                <Clock className="w-12 h-12 text-gray-400 animate-pulse mb-4" />
                <p className="text-lg font-medium text-gray-600">Loading order history...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <p className="text-lg font-medium text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Order History
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        View and manage your past orders
                    </p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <Package className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
                        <p className="mt-1 text-sm text-gray-500">Your order history is empty.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 pb-8">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                onClick={() => onSelectOrder(order)}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-sm text-gray-500">Order ID:</span>
                                            <span className="font-medium text-gray-900">{order._id}</span>
                                        </div>
                                        {getStatusBadge(order.status)}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Supplier</p>
                                            <p className="mt-1 font-medium text-gray-900">{order.supplierId.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Amount</p>
                                            <p className="mt-1 font-medium text-gray-900">${order.totalAmount.toFixed(2)}</p>
                                        </div>
                                        <div className="text-right">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelectOrder(order);
                                                }}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;