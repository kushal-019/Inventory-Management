// import React, { useState} from "react";
// import { Link } from "react-router-dom";
// import { BsArrowLeft } from "react-icons/bs";
// import OrderHistory from "./OrderHistory";
// import OrderDetails from "./OrderDetails";
// import RetailerList from "./RetailerList";
// import RetailerProducts from "./RetailerProducts";

// const UserDashboard = ( { data }) => {
//   const [activeComponent, setActiveComponent] = useState("OrderHistory");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [selectedRetailer, setSelectedRetailer] = useState(null);
//   const renderContent = () => {
//     if (activeComponent === "OrderHistory") {
//       return selectedOrder ? (
//         <OrderDetails order={selectedOrder} onBack={() => setSelectedOrder(null)} />
//       ) : (
//         <OrderHistory onSelectOrder={setSelectedOrder} />
//       );
//     } else if (activeComponent === "PlaceOrder") {
//       return selectedRetailer ? (
//         <RetailerProducts
//             userId={data._id}
//           retailer={selectedRetailer}
//           onBack={() => setSelectedRetailer(null)}
//         />
//       ) : (
//         <RetailerList onSelectRetailer={setSelectedRetailer} />
//       );
//     }
//     return null;
//   };

//   if (!data) {
//     return <div>Loading user data...</div>;
//   }

//   return (
//     <div className="flex min-h-screen bg-lightblue">
//       {/* Sidebar */}
//       <div className="w-1/4 p-4 text-white bg-black">
//         <Link to="/home">
//           <BsArrowLeft className="px-2 ml-2 text-4xl font-bold text-white rounded-lg w-fit hover:bg-midblue" />
//         </Link>
//         <div className="flex flex-col items-center justify-center p-2 border-[#1c618f] border-b-2 h-[35%]">
//           <div className="flex items-center gap-7">
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuWgg1mjdrrer5asSh0TiJKDkdg40UEHc3uw&s"
//               alt="Profile"
//               className="h-16 border-black rounded-full border-1"
//             />
//             <div className="pt-2 pb-2 text-4xl font-bold text-center">{data.name}</div>
//           </div>
//           <p className="text-white">Email: {data.email}</p>
//         </div>
//         <button
//           className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${
//             activeComponent === "OrderHistory" ? "bg-midblue" : "hover:bg-lightblue"
//           }`}
//           onClick={() => setActiveComponent("OrderHistory")}
//         >
//           Order History
//         </button>
//         <button
//           className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${
//             activeComponent === "PlaceOrder" ? "bg-midblue" : "hover:bg-lightblue"
//           }`}
//           onClick={() => setActiveComponent("PlaceOrder")}
//         >
//           Place Order
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="w-3/4 p-8 bg-white">{renderContent()}</div>
//     </div>
//   );
// };

// export default UserDashboard;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import OrderHistory from "./OrderHistory";
import OrderDetails from "./OrderDetails";
import RetailerList from "./RetailerList";
import RetailerProducts from "./RetailerProducts";

const UserDashboard = ({ data }) => {
  const [activeComponent, setActiveComponent] = useState("OrderHistory");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedRetailer, setSelectedRetailer] = useState(null);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg text-gray-600">Loading user data...</div>
      </div>
    );
  }

  const navigationItems = [
    {
      id: "OrderHistory",
      label: "Order History",
    },
    {
      id: "PlaceOrder",
      label: "Place Order",
    },
  ];

  const renderContent = () => {
    switch (activeComponent) {
      case "OrderHistory":
        return selectedOrder ? (
          <OrderDetails 
            order={selectedOrder} 
            onBack={() => setSelectedOrder(null)} 
          />
        ) : (
          <OrderHistory onSelectOrder={setSelectedOrder} />
        );
      case "PlaceOrder":
        return selectedRetailer ? (
          <RetailerProducts
            userId={data._id}
            retailer={selectedRetailer}
            onBack={() => setSelectedRetailer(null)}
          />
        ) : (
          <RetailerList onSelectRetailer={setSelectedRetailer} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 bg-gray-900 text-white">
        <Link to="/home" className="block mb-6">
          <ArrowLeft className="w-8 h-8 p-1 hover:bg-gray-800 rounded-lg transition-colors" />
        </Link>

        {/* Profile Section */}
        <div className="py-6 border-b border-gray-700 mb-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">{data.name}</h2>
            </div>
            <p className="text-sm text-gray-300">
              Email: {data.email}
            </p>
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
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-8 bg-white">
        {renderContent()}
      </main>
    </div>
  );
};

export default UserDashboard;