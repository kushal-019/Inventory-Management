// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { BsArrowLeft } from "react-icons/bs";
// import OrderHistory from "./OrderHistory";
// import OrderDetails from "./OrderDetails"
// import OrderReceived from "./OrderReceived";
// import ShowInventory from "./ShowInventory";
// import UpdateInventory from "./UpdateInventory";
// import axios from "axios";
// const WholesalerDashBoard = ({data}) => {
//   const [activeComponent, setActiveComponent] = useState("Inventory");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [supId, setsupId] = useState(null);
 
 

//   // Render based on active component
//   const renderContent = () => {
//      if (activeComponent === "addItem") {
//       return  <UpdateInventory supplierId={supId}/>
//     }
//     else if(activeComponent === "orderReceived"){
//       return selectedOrder ? (
//         <OrderDetails order={selectedOrder} onBack={ ()=> setSelectedOrder(null)} />
//       ) : (<>
//         <OrderReceived onSelectOrder={setSelectedOrder} supplierId = {supId} /></>
//       );
//     }
//     else if (activeComponent === "Inventory"){
//       return <ShowInventory supplierId={supId} />
//     }
//     return null
//   };


  
//   useEffect(() => {
    
//     const fetchProtectedData = async () => {
//      const token = localStorage.getItem("authToken");
//     if (!token) {
//       console.error("No token found!");
//       return;
//     }
//     try {
//         // const response = await axios.get(`http://localhost:8080/api/v1/supplier/showinventory/${data.userId}`, {
//         //   headers: {
//         //     Authorization: `Bearer ${token}`,
//         //   },
//         // });
//         setsupId(data.userId);
//         // console.log("Protected Data:", response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchProtectedData();
//     console.log(data)
//   }, [data]);



//   return (
//     <div className="flex min-h-screen bg-lightblue">
//       {/* Sidebar */}
//       <div className="w-1/4 p-4 text-white bg-black">
        
//           <Link to="/home">
//             <BsArrowLeft className="px-2 ml-2 text-4xl font-bold text-white rounded-lg w-fit hover:bg-midblue" />
//           </Link>
//           <div className="flex flex-col items-center justify-center p-2 border-[#1c618f] border-b-2 h-[35%]">
//         <div className="flex items-center gap-7">
         
//           <div className="pt-2 pb-2 text-4xl font-bold text-center">{data.ferm}</div>
//         </div>
//         <p className="text-white">Email: {data.email}</p>
//         <p className="text-white">GST: {data.gst}</p>
//       </div>
          
        
       
//           <button
//               className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${
//                 activeComponent === "Inventory" ? "bg-midblue" : "hover:bg-lightblue"
//               }`}
//               onClick={() => setActiveComponent("Inventory")}
//             >
//               Manage Inventory
//             </button>
//             <button
//               className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${
//                 activeComponent === "orderReceived" ? "bg-midblue" : "hover:bg-lightblue"
//               }`}
//               onClick={() => setActiveComponent("orderReceived")}
//             >
//              Order Received
//             </button>
//             <button
//               className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${
//                 activeComponent === "addItem" ? "bg-midblue" : "hover:bg-lightblue"
//               }`}
//               onClick={() => setActiveComponent("addItem")}
//             >
//               Add Item
//             </button>
            
       
//       </div>

//       {/* Main Content */}
//       <div className="w-3/4 p-8 bg-white">{renderContent()}</div>
//     </div>
//   );
// };



// export default WholesalerDashBoard

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
      <div className="w-1/4 p-4 bg-gray-900 text-white">
        <Link to="/home" className="block mb-6">
          <ArrowLeft className="w-8 h-8 p-1 hover:bg-gray-800 rounded-lg" />
        </Link>

        {/* Profile Section */}
        <div className="py-6 border-b border-gray-700 mb-6">
          <div className="text-2xl font-bold text-center mb-2">
            {data.ferm}
          </div>
          <div className="text-gray-300 text-sm space-y-1">
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
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
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
