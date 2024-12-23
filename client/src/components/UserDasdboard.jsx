import React, { useState} from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import OrderHistory from "./OrderHistory";
import OrderDetails from "./OrderDetails";
import RetailerList from "./RetailerList";
import RetailerProducts from "./RetailerProducts";

const UserDashboard = ( { data }) => {
  const [activeComponent, setActiveComponent] = useState("OrderHistory");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const renderContent = () => {
    if (activeComponent === "OrderHistory") {
      return selectedOrder ? (
        <OrderDetails order={selectedOrder} onBack={() => setSelectedOrder(null)} />
      ) : (
        <OrderHistory onSelectOrder={setSelectedOrder} />
      );
    } else if (activeComponent === "PlaceOrder") {
      return selectedRetailer ? (
        <RetailerProducts
            userId={data._id}
          retailer={selectedRetailer}
          onBack={() => setSelectedRetailer(null)}
        />
      ) : (
        <RetailerList onSelectRetailer={setSelectedRetailer} />
      );
    }
    return null;
  };

  if (!data) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="flex min-h-screen bg-lightblue">
      {/* Sidebar */}
      <div className="w-1/4 p-4 text-white bg-black">
        <Link to="/home">
          <BsArrowLeft className="px-2 ml-2 text-4xl font-bold text-white rounded-lg w-fit hover:bg-midblue" />
        </Link>
        <div className="flex flex-col items-center justify-center p-2 border-[#1c618f] border-b-2 h-[35%]">
          <div className="flex items-center gap-7">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuWgg1mjdrrer5asSh0TiJKDkdg40UEHc3uw&s"
              alt="Profile"
              className="h-16 border-black rounded-full border-1"
            />
            <div className="pt-2 pb-2 text-4xl font-bold text-center">{data.name}</div>
          </div>
          <p className="text-white">Email: {data.email}</p>
        </div>
        <button
          className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${
            activeComponent === "OrderHistory" ? "bg-midblue" : "hover:bg-lightblue"
          }`}
          onClick={() => setActiveComponent("OrderHistory")}
        >
          Order History
        </button>
        <button
          className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${
            activeComponent === "PlaceOrder" ? "bg-midblue" : "hover:bg-lightblue"
          }`}
          onClick={() => setActiveComponent("PlaceOrder")}
        >
          Place Order
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 bg-white">{renderContent()}</div>
    </div>
  );
};

export default UserDashboard;
