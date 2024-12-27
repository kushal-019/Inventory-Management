import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import OrderHistory from "./OrderHistory";
import OrderDetails from "./OrderDetails"
import OrderReceived from "./OrderReceived";
import ShowInventory from "./ShowInventory";
import UpdateInventory from "./UpdateInventory";
import axios from "axios";
const WholesalerDashBoard = ({data}) => {
  const [activeComponent, setActiveComponent] = useState("Inventory");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [supId, setsupId] = useState(null);
 
 

  // Render based on active component
  const renderContent = () => {
     if (activeComponent === "addItem") {
      return  <UpdateInventory supplierId={supId}/>
    }
    else if(activeComponent === "orderReceived"){
      return selectedOrder ? (
        <OrderDetails order={selectedOrder} onBack={ ()=> setSelectedOrder(null)} />
      ) : (<>
        <OrderReceived onSelectOrder={setSelectedOrder} /></>
      );
    }
    else if (activeComponent === "Inventory"){
      return <ShowInventory supplierId={supId} />
    }
    return null
  };


  
  useEffect(() => {
    
    const fetchProtectedData = async () => {
     const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found!");
      return;
    }
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/supplier/showinventory/${data.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setsupId(data.userId);
        console.log("Protected Data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProtectedData();
    console.log(data)
  }, [data]);



  return (
    <div className="flex min-h-screen bg-lightblue">
      {/* Sidebar */}
      <div className="w-1/4 p-4 text-white bg-black">
        
          <Link to="/home">
            <BsArrowLeft className="px-2 ml-2 text-4xl font-bold text-white rounded-lg w-fit hover:bg-midblue" />
          </Link>
          <div className="flex flex-col items-center justify-center p-2 border-[#1c618f] border-b-2 h-[35%]">
        <div className="flex items-center gap-7">
         
          <div className="pt-2 pb-2 text-4xl font-bold text-center">{data.ferm}</div>
        </div>
        <p className="text-white">Email: {data.email}</p>
        <p className="text-white">GST: {data.gst}</p>
      </div>
          
        
       
          <button
              className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${
                activeComponent === "Inventory" ? "bg-midblue" : "hover:bg-lightblue"
              }`}
              onClick={() => setActiveComponent("Inventory")}
            >
              Manage Inventory
            </button>
            <button
              className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${
                activeComponent === "orderReceived" ? "bg-midblue" : "hover:bg-lightblue"
              }`}
              onClick={() => setActiveComponent("orderReceived")}
            >
             Order Received
            </button>
            <button
              className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${
                activeComponent === "addItem" ? "bg-midblue" : "hover:bg-lightblue"
              }`}
              onClick={() => setActiveComponent("addItem")}
            >
              Add Item
            </button>
            
       
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 bg-white">{renderContent()}</div>
    </div>
  );
};



export default WholesalerDashBoard
