import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Construct the request payload using email and password
      const credentials = { email, password };
      console.log("Sending credentials:", credentials); // Debugging
  
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        credentials
      );

      console.log(response)
  
      // Extract token from response data
      const token = response.data.token;

      console.log(token)
  
      // Save token to localStorage
      localStorage.setItem("authToken", token);
  
      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      // Log full error details for debugging
      console.error("Login error:", error);
  
      // Extract the backend error message (if available)
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An unexpected error occurred";
  
      alert(`Login failed: ${errorMessage}`);
    }
  };
  

  return (
    <>
      <nav className="sticky top-0 z-50 px-6 py-4 shadow-lg text-light bg-dark">
        <div className="text-2xl font-bold text-center">
          <span className="text-lightblue">Invento</span> Mart
        </div>
      </nav>

      <div className="flex items-center justify-center bg-gray-100 min-h-[90vh]">
        <div className="p-8 bg-white rounded-lg shadow-lg w-96">
          <h2 className="mb-4 text-2xl font-bold text-center text-[#08273e]">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
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
            <button
              className="text-[#6891a6] hover:underline"
              onClick={onSwitch}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
