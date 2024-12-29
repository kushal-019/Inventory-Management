// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const Login = ({ onSwitch }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       // Construct the request payload using email and password
//       const credentials = { email, password };
//       console.log("Sending credentials:", credentials); // Debugging
  
//       const response = await axios.post(
//         "http://localhost:8080/api/v1/auth/login",
//         credentials
//       );

  
//       // Extract token from response data
//       const token = response.data.token;

  
//       // Save token to localStorage
//       localStorage.setItem("authToken", token);
  
//       toast.success("Login successful!");
//       navigate("/home");
//     } catch (error) {
//       // Log full error details for debugging
//       console.error("Login error:", error);
  
//       // Extract the backend error message (if available)
//       const errorMessage =
//         error.response && error.response.data && error.response.data.message
//           ? error.response.data.message
//           : "An unexpected error occurred";
  
//      toast.error(`Login failed: ${errorMessage}`);
//     }
//   };
  

//   return (
//     <>
//       <nav className="sticky top-0 z-50 px-6 py-4 shadow-lg text-light bg-dark">
//         <div className="text-2xl font-bold text-center">
//           <span className="text-lightblue">Invento</span> Mart
//         </div>
//       </nav>

//       <div className="flex items-center justify-center bg-gray-100 min-h-[90vh]">
//         <div className="p-8 bg-white rounded-lg shadow-lg w-96">
//           <h2 className="mb-4 text-2xl font-bold text-center text-[#08273e]">Login</h2>
//           <form onSubmit={handleLogin}>
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <input
//                 type="text"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full px-4 py-2 text-white transition bg-[#6891a6] rounded-lg hover:bg-[#347a9e]"
//             >
//               Login
//             </button>
//           </form>
//           <p className="mt-4 text-center">
//             Don't have an account?{" "}
//             <button
//               className="text-[#6891a6] hover:underline"
//               onClick={onSwitch}
//             >
//               Sign Up
//             </button>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      const response = await axios.post("http://localhost:8080/api/v1/auth/login", credentials);
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "An unexpected error occurred";
      toast.error(`Login failed: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-blue-600">Invento</span>
                <span className="text-gray-900">Mart</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white px-8 py-10 shadow-xl rounded-2xl border border-gray-100">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Login</h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={onSwitch}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
