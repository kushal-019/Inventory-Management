import React from "react";
import { Navigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    setTimeout(()=>{
      toast.warn("You must be logged in to access this page.");

    },1000);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
