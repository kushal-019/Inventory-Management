import React, { useState ,useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [data, setData] = useState({name:"keshav",email:"Keshav1787.be22@chitkara.edu.in",role:"Costumer",ferm:"Jai Traders",gst:"1de234dcsd56e7y"});
    const role="user";
    const navigate =useNavigate();
    useEffect(() => { (async () => {
        const token = localStorage.getItem("authToken");
        if (!token ) {
          // alert("Please log in first.");
          // navigate('/');
          return;
        }
  
        try {
          const response = await axios.get("http://localhost:4000/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(response.data);
        } catch (error) {
          alert("Access denied!");
        }
      })();
    }, []);
  

  return (<>
  <div className="flex min-h-[93vh]">
  <Sidebar data={data}/>
    <div className="flex-1 p-6 bg-gray-100 ">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 bg-white border rounded"
        >
          <option value="User">User</option>
          <option value="Retailer">Retailer</option>
          <option value="Wholesaler">Wholesaler</option>
        </select>
      </header>
      {/* <div>{renderContent()}</div> */}
    </div>
   
    </div></>
  );
};

const UserDashboard = () => (
  <div className="p-4 bg-white rounded shadow">
    <h2 className="text-xl font-semibold">User Dashboard</h2>
    <p>Browse inventory and place orders.</p>
  </div>
);

const RetailerDashboard = () => (
  <div className="p-4 bg-white rounded shadow">
    <h2 className="text-xl font-semibold">Retailer Dashboard</h2>
    <p>Manage stock, sales insights, and orders.</p>
  </div>
);

const WholesalerDashboard = () => (
  <div className="p-4 bg-white rounded shadow">
    <h2 className="text-xl font-semibold">Wholesaler Dashboard</h2>
    <p>Handle bulk orders and supplier coordination.</p>
  </div>
);

export default Dashboard;
