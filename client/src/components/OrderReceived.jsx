import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderReceived = ({ onSelectOrder }) => {
  const [orders, setOrders] = useState([
    {
      _id: "order_id",
      userId: "user_id",
      supplierId: {
        name: "Supplier Name",
        lastName: "Supplier Last Name",
      },
      status: "Pending",
      orderItems: [
        { product: "product_id", quantity: 5 },
        { product: "product_id", quantity: 5 },
        { product: "product_id", quantity: 5 },
      ],
      totalCost: 1000,
      totalAmount: 1200,
      createdAt: "2024-12-22T00:00:00.000Z",
      updatedAt: "2024-12-22T00:00:00.000Z",
    },
  ]);

  const handleReject = async (order) => {
    const reject = { orderId: order._id, status: "Rejected" };
    try {
      await axios.patch(
        "https://localhost:8080/api/v1/orders/updateOrderStatus",
        reject
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
    const approve = { orderId: order._id, status: "Confirmed" };
    try {
      await axios.patch(
        "https://localhost:8080/api/v1/orders/updateOrderStatus",
        approve
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

  return (
    <div>
      <div className="p-6">
        <h1 className="mb-4 text-4xl font-bold text-center text-midblue">
          Received Orders
        </h1>
        {orders.length === 0 ? (
          <p className="text-4xl font-bold text-dark">No orders found.</p>
        ) : (
          <div className="space-y-4 overflow-y-scroll max-h-[75vh]">
            {orders.map((order) => (
              <div
                key={order._id}
                className="p-4 border-2 border-black rounded-lg shadow-2xl cursor-pointer hover:border-midblue shadow-midblue hover:bg-dark hover:text-white"
                onClick={() =>
                  order.status === "Pending" ? null : onSelectOrder(order)
                }
              >
                <h3 className="text-2xl font-bold text-lightblue">
                  Order ID: {order._id}
                </h3>
                <div className="flex justify-between text-xl font-semibold">
                  <p className="text-xl font-semibold">
                    Supplier: {order.supplierId.name}
                  </p>
                  <p>Amount: {order.totalAmount}</p>
                  {order.status === "Pending" ? (
                    <div className="flex gap-2 h-9">
                      
                      <button
                        className="px-2 text-xl font-semibold border-2 bg-midblue border-light rounded-xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectOrder(order);
                        }}
                      >
                        Detail's
                      </button>
                      <button
                        className="px-2 text-xl font-semibold bg-[#3ad622] border-2 border-light rounded-xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(order);
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="px-2 text-xl font-semibold bg-[#e31616] border-2 border-light rounded-xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(order);
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <p >Status: {order.status}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderReceived;
