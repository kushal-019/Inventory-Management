import React, { useEffect, useState } from "react";
import axios from "axios";
import { Check, X, ChevronRight, Package } from "lucide-react";

const OrderReceived = ({ onSelectOrder, supplierId }) => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("authToken");

  const handleReject = async (order) => {
    const detail = { orderId: order._id, status: "Rejected" };
    try {
      await axios.patch(
        "https://inventory-management-mag3.onrender.com/api/v1/orders/updateOrderStatus",
        {
          detail, // The data payload
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o._id === order._id ? { ...o, status: "Rejected" } : o
        )
      );
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  const handleApprove = async (order) => {
    const detail = { orderId: order._id, status: "Confirmed" };
    try {
      await axios.patch(
        "https://inventory-management-mag3.onrender.com/api/v1/orders/updateOrderStatus",
        {
          detail, // The data payload
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o._id === order._id ? { ...o, status: "Confirmed" } : o
        )
      );
    } catch (error) {
      console.error("Error approving order:", error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.error("No token found!");
        return;
      }
      try {
        console.log(supplierId);

        const { data } = await axios.get(
          `https://inventory-management-mag3.onrender.com/api/v1/orders/orderrecieved`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Token in header
            },
          }
        );
        setOrders(data.receivedOrders);
        console.log("orders:", data);
      } catch (error) {
        console.error(error.message);
        setInventory([]); // Handle the error scenario by setting inventory to an empty array
      }
    };
    fetchOrders();
  }, [supplierId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Received Orders</h1>
          <p className="mt-2 text-sm text-gray-600">Manage and review your incoming orders</p>
        </div>

        <div className="grid gap-6">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
              <p className="mt-1 text-sm text-gray-500">No orders have been received yet.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'Confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Order placed {new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>

                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Order ID</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">#{order._id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-500">Total Amount</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">${order.totalAmount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Supplier</p>
                        <p className="text-base font-medium text-gray-900">{order.supplierName}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={() => onSelectOrder(order)}
                        >
                          Details
                          <ChevronRight className="ml-2 -mr-1 h-4 w-4" />
                        </button>
                        {order.status === 'Pending' && (
                          <>
                            <button
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              onClick={() => handleApprove(order._id)}
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Approve
                            </button>
                            <button
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              onClick={() => handleReject(order._id)}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


export default OrderReceived;
