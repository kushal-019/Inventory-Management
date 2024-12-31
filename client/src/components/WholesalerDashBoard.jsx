import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import OrderHistory from "./OrderHistory";
import OrderDetails from "./OrderDetails";
import OrderReceived from "./OrderReceived";
import ShowInventory from "./ShowInventory";
import UpdateInventory from "./UpdateInventory";

const WholesalerDashboard = ({ data }) => {
  const [activeComponent, setActiveComponent] = useState("Inventory");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [supplierId, setSupplierId] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found!");
        return;
      }
      
      try {
        setSupplierId(data.userId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProtectedData();
  }, [data]);

  const navigationItems = [
    {
      id: "Inventory",
      label: "Manage Inventory",
    },
    {
      id: "orderReceived",
      label: "Order Received",
    },
    {
      id: "addItem",
      label: "Add Item",
    },
  ];

  const renderContent = () => {
    switch (activeComponent) {
      case "addItem":
        return <UpdateInventory supplierId={supplierId} />;
      case "orderReceived":
        return selectedOrder ? (
          <OrderDetails 
            order={selectedOrder} 
            onBack={() => setSelectedOrder(null)} 
          />
        ) : (
          <OrderReceived 
            onSelectOrder={setSelectedOrder} 
            supplierId={supplierId} 
          />
        );
      case "Inventory":
        return <ShowInventory supplierId={supplierId} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 p-4 text-white bg-gray-900">
        <Link to="/home" className="block mb-6">
          <ArrowLeft className="w-8 h-8 p-1 rounded-lg hover:bg-gray-800" />
        </Link>

        {/* Profile Section */}
        <div className="py-6 mb-6 border-b border-gray-700">
          <div className="mb-2 text-2xl font-bold text-center">
            {data.ferm}
          </div>
          <div className="space-y-1 text-sm text-gray-300">
            <p>Email: {data.email}</p>
            <p>GST: {data.gst}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeComponent === item.id
                  ? "bg-midblue"
                  : "hover:bg-lightblue"
              }`}
              onClick={() => setActiveComponent(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="w-3/4 p-8 bg-white">
        {renderContent()}
      </main>
    </div>
  );
};

export default WholesalerDashboard;
