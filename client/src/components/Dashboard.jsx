import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDasdboard";
import RetailerDashboard from "./RetailerDashboard";
import WholesalerDashBoard from "./WholesalerDashBoard";

const Dashboard = () => {
  const navigate=useNavigate();
  const [data, setData] = useState({
    role: "",
    name: "",
    email: "",
  });

  useEffect(() => {
       const fetchUserData = () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found!");
          alert("Please log in first.");
          navigate("/");
          return;
        }

        const decodedData = jwtDecode(token);

        // Update the state with decoded data
        setData({
          role: decodedData.role,
          name: decodedData.name,
          email: decodedData.email,
        });

        console.log("Decoded data:", decodedData);
        console.log("data:", data);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    fetchUserData();
  }, [navigate]);


  
  return (
    <>
      {data.role === "Customer" && <UserDashboard data={data} />}
      {data.role === "Retailer" && <RetailerDashboard data={data} />}
      {data.role === "WholeSaler" && <WholesalerDashBoard data={data} />}
    </>
  );
};

export default Dashboard;