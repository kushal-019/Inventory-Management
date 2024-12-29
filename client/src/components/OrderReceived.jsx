import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderReceived = ({ onSelectOrder, supplierId }) => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("authToken");

  const handleReject = async (order) => {
    const detail = { orderId: order._id, status: "Rejected" };
    try {
      await axios.patch(
        "http://localhost:8080/api/v1/orders/updateOrderStatus",
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
        "http://localhost:8080/api/v1/orders/updateOrderStatus",
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
          `http://localhost:8080/api/v1/orders/orderrecieved`,
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
                    Supplier: {order.userId.name}
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
