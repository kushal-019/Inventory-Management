import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import About from './About';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please log in first.");
        navigate('/');
        return;
      }
    })();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Welcome to Invento Mart
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-600">
            Manage your inventory efficiently and shop with ease. Experience innovation 
            and simplicity all in one place.
          </p>
          <button className="px-8 py-3 font-medium text-white transition-colors rounded-lg bg-midblue hover:bg-lightblue">
            Explore Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Easy Inventory Management
              </h3>
              <p className="text-gray-600">
                Simplify your operations with our user-friendly tools for tracking 
                stock, sales, and orders.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Seamless E-Commerce
              </h3>
              <p className="text-gray-600">
                Enjoy a hassle-free shopping experience with smooth navigation and 
                secure transactions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Customizable Solutions
              </h3>
              <p className="text-gray-600">
                Tailor our platform to suit your business needs with versatile 
                options and integrations.
              </p>
            </div>
          </div>
        </div>
        </section>
      <About/>
    </div>
  );
};

export default Home;
