// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const Signup = ({ onSwitch }) => {
//   const [name, setName] = useState("");
//   const [ferm, setFerm] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userType, setUserType] = useState("Customer");
//   const [gst,setGst]=useState("");
//   const navigate=useNavigate();


//   const handleSignup = async(e) => {
//     e.preventDefault();
//     try {
//         const response = await axios.post("http://localhost:8080/api/v1/auth/register", {name ,email,password,role:userType,gst,ferm});
//         const { token } = response.data;
  
//         localStorage.setItem("authToken", token);
//         toast.success("Signup successful!");
//         navigate("/home");
//       } catch (error) {
//         toast.error("Signup failed!");
//         console.log(error);
        
//       }

    
//     console.log("Signing up with:", { name, email, password });
//   };

//   return (<>
//     <nav className="sticky top-0 z-50 px-6 py-4 shadow-lg text-light bg-dark">
//     <div className="text-2xl font-bold text-center">
//           <span className="text-lightblue">Invento</span> Mart
//         </div>
//     </nav>
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="p-8 bg-white rounded-lg shadow-lg w-96">
//         <h2 className="mb-4 text-2xl font-bold text-center text-[#08273e]">Sign Up</h2>
//         <form onSubmit={handleSignup}>
//         <div className="mb-2">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#a4b6c2]"
//               placeholder="Enter your name"
//               required
//             />
//           </div>
        
//           <div className="mb-2">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#a4b6c2]"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//             {(userType=='Retailer' || userType=='WholeSaler')?<>
//             <div className="mb-2">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Business Name
//             </label>
//             <input
//               type="text"
//               id="ferm"
//               value={ferm}
//               onChange={(e) => setFerm(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#a4b6c2]"
//               placeholder="Enter your business Name"
//               required
//             />
//           </div>
//             <div className="mb-2">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             GST No:
//             </label>
//             <input
//               type="text"
//               id=""gst
//               value={gst}
//               onChange={(e) => setGst(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#a4b6c2]"
//               placeholder="Enter your GST Number"
//               required
//             />
//           </div></> : <div className="none"></div>
//           }
          
//           <div className="mb-2">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#a4b6c2]"
//               placeholder="Create a password"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
//               Select User Type
//             </label>
//             <select
//               id="userType"
//               value={userType}
//               onChange={(e) => setUserType(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//             >
//               <option value="Customer">Customer</option>
//               <option value="Retailer">Retailer</option>
//               <option value="WholeSaler">Wholesaler</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-white transition bg-[#6891a6] rounded-lg hover:bg-[#3289b5]"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-4 text-center">
//           Already have an account?{" "}
//           <button className="text-[#3289b5] hover:underline" onClick={onSwitch}>
//             Login
//           </button>
//         </p>
//       </div>
      
//     </div></>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { Building2, Mail, Lock, User, Briefcase, Receipt } from "lucide-react";

const Signup = ({ onSwitch }) => {
  const [name, setName] = useState("");
  const [ferm, setFerm] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Customer");
  const [gst, setGst] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/register", 
        { name, email, password, role: userType, gst, ferm }
      );
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      toast.success("Signup successful!");
      navigate("/home");
    } catch (error) {
      toast.error("Signup failed!");
      console.log(error);
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
              <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Join InventoMart to manage your inventory
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Type
                </label>
                <select
                  id="userType"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Customer">Customer</option>
                  <option value="Retailer">Retailer</option>
                  <option value="WholeSaler">Wholesaler</option>
                </select>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {(userType === 'Retailer' || userType === 'WholeSaler') && (
                <>
                  <div>
                    <label htmlFor="ferm" className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="ferm"
                        type="text"
                        value={ferm}
                        onChange={(e) => setFerm(e.target.value)}
                        className="block w-full pl-10 rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Your Business Name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="gst" className="block text-sm font-medium text-gray-700 mb-1">
                      GST Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Receipt className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="gst"
                        type="text"
                        value={gst}
                        onChange={(e) => setGst(e.target.value)}
                        className="block w-full pl-10 rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="GST Number"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={onSwitch}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;