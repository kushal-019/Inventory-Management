import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = ({ onSelectOrder }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                  const response =await  axios.get("http://localhost:8080/api/v1/orders/orderhistory",
                  {
                    headers: {
                      Authorization: `Bearer ${token}`, // Add the token in the Authorization header
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

    if (loading) {
        return <p className="font-semibold ">Loading order history...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="p-6">
            <h1 className="mb-4 text-4xl font-bold text-center text-midblue">Order History</h1>
            {orders.length === 0 ? (
                <p className="text-4xl font-bold text-dark">No orders found.</p>
            ) : (
                <div className="space-y-4 overflow-y-scroll max-h-[75vh]">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="p-4 border-2 border-black rounded-lg shadow-2xl cursor-pointer hover:border-midblue shadow-midblue hover:bg-dark hover:text-white "
                            onClick={() => onSelectOrder(order)}
                        >
                            <h3 className="text-2xl font-bold text-lightblue">Order ID: {order._id}</h3>
                            <div className="flex justify-between text-xl font-semibold">
                                <p className="text-xl font-semibold">Supplier: {order.supplierId.name}</p>
                                <p>Amount : {order.totalAmount}
                                </p>
                                <p>Status : {order.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
