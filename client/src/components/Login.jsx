import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate=useNavigate();

    const handleLogin = async(e) => {
      e.preventDefault();
      try {
        setCredentials(email,password);
        const response = await axios.post("http://localhost:4000/login", credentials);
        const { token } = response.token;
  
        localStorage.setItem("authToken", token);
        alert("Login successful!");
        navigate("/DashBoard")
      } catch (error) {
        alert("Login failed!");
      }
    
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-[90vh]">
      <div className="p-8 bg-white rounded-lg shadow-lg w-96">
        <h2 className="mb-4 text-2xl font-bold text-center text-[#08273e]">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
             Email
            </label>
            <input
              type='text'
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>
         
          
          <button
            type="submit"
            className="w-full px-4 py-2 text-white transition bg-[#6891a6] rounded-lg hover:bg-[#347a9e]"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <button className="text-[#6891a6] hover:underline" onClick={onSwitch}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
