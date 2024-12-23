import React, { useState} from "react";
import UserDashboard from "./UserDasdboard";
import RetailerDashboard from "./RetailerDashboard";
import WholesalerDashBoard from "./WholesalerDashBoard";
const Dashboard = () => {
    const [data, setData] = useState({
      role: "Customer",
      name: "John Doe",
      email: "johndoe@example.com",
    }); // Initialize as null
    // const getCookie = (cookieName) => {
    //   const cookies = document.cookie.split("; ");
    //   for (let cookie of cookies) {
    //     const [key, value] = cookie.split("=");
    //     if (key === cookieName) {
    //       return decodeURIComponent(value);
    //     }
    //   }
    //   return null;
    // };
    // useEffect(() => {
    //   const fetchUserData = () => {
    //     try {
    //       const token = getCookie("userAuth"); // Get token from cookies
    //       if (!token) {
    //         console.error("No token found!");
    //         return;
    //       }
  
    //       const decodedData = jwtDecode(token);
    //       setData(decodedData);
    //     } catch (error) {
    //       console.error("Error decoding token:", error);
    //     }
    //   };
  
    //   fetchUserData();
    // }, []);


  return (
   <>
   <RetailerDashboard />
   {/* {
   (data.role === "Customer" && (<UserDashboard data={data} />))
    (data.role === "Retailer" && (<RetailerDashboard data={data} />))
    (data.role === "WholeSaler"&& (<WholesalerDashBoard data={data} />))
   } */}
   </>
  );
};



export default Dashboard;
