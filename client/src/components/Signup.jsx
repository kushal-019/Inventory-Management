import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = ({ onSwitch }) => {
  const [name, setName] = useState("");
  const [ferm, setFerm] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Customer");
  const [gst,setGst]=useState("");
  const navigate=useNavigate();


  const handleSignup = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:4000/register", {name ,email,password,role:userType,gst,ferm});
        const { token } = response.data;
  
        localStorage.setItem("authToken", token);
        alert("Signup successful!");
        navigate("/home");
      } catch (error) {
        alert("Signup failed!");
      }

    
    console.log("Signing up with:", { name, email, password });
  };

  return (<>
    <nav className="sticky top-0 z-50 px-6 py-4 shadow-lg text-light bg-dark">
    <div className="text-2xl font-bold text-center">
          <span className="text-lightblue">Invento</span> Mart
        </div>
    </nav>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-96">
        <h2 className="mb-4 text-2xl font-bold text-center text-[#08273e]">Sign Up</h2>
        <form onSubmit={handleSignup}>
        <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
               Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#a4b6c2]"
              placeholder="Enter your name"
              required
            />
          </div>
        
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#a4b6c2]"
              placeholder="Enter your email"
              required
            />
          </div>
            {(userType=='Retailer' || userType=='Wholesaler')?<>
            <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Business Name
            </label>
            <input
              type="text"
              id="ferm"
              value={ferm}
              onChange={(e) => setFerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#a4b6c2]"
              placeholder="Enter your business Name"
              required
            />
          </div>
            <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            GST No:
            </label>
            <input
              type="text"
              id=""gst
              value={gst}
              onChange={(e) => setGst(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#a4b6c2]"
              placeholder="Enter your GST Number"
              required
            />
          </div></> : <div className="none"></div>
          }
          
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#a4b6c2]"
              placeholder="Create a password"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
              Select User Type
            </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="Customer">Customer</option>
              <option value="Retailer">Retailer</option>
              <option value="Wholesaler">Wholesaler</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white transition bg-[#6891a6] rounded-lg hover:bg-[#3289b5]"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <button className="text-[#3289b5] hover:underline" onClick={onSwitch}>
            Login
          </button>
        </p>
      </div>
      
    </div></>
  );
};

export default Signup;
